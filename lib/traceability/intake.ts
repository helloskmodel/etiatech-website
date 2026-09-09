// 入库 —— 给整箱到货的灯泡/设备发号、建档、记事件。
//
// 这是第 1 期的核心动作。灯泡包装盒上只有型号和**手写**批次，没有唯一序列号，
// 所以入库时由 ETIA 自己发号并打印二维码标签（TRACEABILITY.md §2.3）。
//
// 流程刻意设计成「每箱录一次手写批次，按数量批量发号」，而不是每支录一次 ——
// 手写转抄是这条链上最容易出错的一步，能少录一次就少一次。

import type { PoolClient } from "pg";

import { MAX_SEQ, makeSerial, type SiteLetter } from "./serial.ts";

export type ScanSource = "usb_scanner" | "wecom_scan" | "manual" | "import";

export type IntakeInput = {
  /** 站点编码，如 CN-HQ。 */
  siteCode: string;
  /** 物料编码：灯泡的 Part Number（012-64000R）或设备型号（S2000-XLA）。 */
  itemCode: string;
  /** 本箱数量。 */
  qty: number;
  /**
   * 包装盒上手写的批次号，**原样照抄**，不要做任何清洗。
   * 批次格式的解读规则尚未向原厂确认，保留原文才能事后重新解析。
   */
  oemLotRaw?: string;
  poNo?: string;
  /** 操作人 app_user.id。 */
  receivedBy?: number;
  /**
   * 原厂序列号，按顺序对应发出的每一个号。
   * 设备有（如 S2000-XL-A-1560），灯泡没有 —— 长度不足的部分留空。
   */
  oemSerials?: (string | null)[];
  scanSource?: ScanSource;
  note?: string;
};

export type IntakeUnit = { id: number; serial: string; oemSerial: string | null };

export type IntakeResult = {
  batchId: number;
  units: IntakeUnit[];
};

/**
 * 收一箱货：建批次 → 批量发号 → 建单品 → 每支记一条 received 事件。
 *
 * 调用方负责开/提交事务 —— 这几步必须同生共死：号发了但单品没建出来，
 * 那个号就永远漏掉了，而序列号是要印在实物上的，漏号会造成对不上账。
 */
export async function receiveIntake(
  client: PoolClient,
  input: IntakeInput
): Promise<IntakeResult> {
  const qty = input.qty;
  if (!Number.isInteger(qty) || qty <= 0) {
    throw new Error(`入库数量必须是正整数，收到 ${input.qty}`);
  }

  const site = await client.query<{ id: number; serial_letter: SiteLetter; timezone: string }>(
    `select id, serial_letter, timezone from site where code = $1`,
    [input.siteCode]
  );
  if (site.rowCount === 0) throw new Error(`站点不存在: ${input.siteCode}`);
  const { id: siteId, serial_letter: letter, timezone } = site.rows[0];

  const item = await client.query<{ id: number }>(`select id from item where code = $1`, [
    input.itemCode,
  ]);
  if (item.rowCount === 0) throw new Error(`物料不存在: ${input.itemCode}`);
  const itemId = item.rows[0].id;

  // 年份取**站点当地**年份，不是 UTC 年。跨年那几个小时里，上海已经是新的一年，
  // UTC 还停在旧年 —— 用 UTC 会让 1 月 1 日凌晨入库的货带上去年的号。
  const yearRow = await client.query<{ year: number }>(
    `select extract(year from (now() at time zone $1))::int as year`,
    [timezone]
  );
  const year = yearRow.rows[0].year;

  // 一次性把这一箱要用的号段占掉。用 INSERT ... ON CONFLICT DO UPDATE 而不是
  // 先查再改：并发入库时前者由数据库保证原子性，后者会发出重号。
  const counter = await client.query<{ next_seq: number }>(
    `insert into serial_counter (site_id, year, next_seq)
       values ($1, $2, $3)
     on conflict (site_id, year)
       do update set next_seq = serial_counter.next_seq + $3
     returning next_seq`,
    [siteId, year, qty]
  );
  const nextSeq = counter.rows[0].next_seq;
  const firstSeq = nextSeq - qty; // 号段是 [firstSeq, nextSeq - 1]
  if (nextSeq - 1 > MAX_SEQ) {
    throw new Error(`站点 ${input.siteCode} 在 ${year} 年的号段已用尽`);
  }

  const batch = await client.query<{ id: number }>(
    `insert into intake_batch
       (site_id, item_id, oem_lot_raw, qty, po_no, received_at, received_by, note)
     values ($1, $2, $3, $4, $5, now(), $6, $7)
     returning id`,
    [
      siteId,
      itemId,
      input.oemLotRaw ?? null,
      qty,
      input.poNo ?? null,
      input.receivedBy ?? null,
      input.note ?? null,
    ]
  );
  const batchId = batch.rows[0].id;

  const serials = Array.from({ length: qty }, (_, i) =>
    makeSerial({ year, site: letter, seq: firstSeq + i })
  );
  const oemSerials = serials.map((_, i) => input.oemSerials?.[i] || null);

  const inserted = await client.query<{ id: number; serial: string; oem_serial: string | null }>(
    `insert into unit (serial, item_id, site_id, intake_batch_id, oem_serial)
     select s, $2, $3, $4, nullif(o, '')
       from unnest($1::text[], $5::text[]) as t(s, o)
     returning id, serial, oem_serial`,
    [serials, itemId, siteId, batchId, oemSerials]
  );

  // 每支一条 received 事件。seq 从 1 起 —— 这是它在系统里的第一个事件。
  await client.query(
    `insert into unit_event
       (unit_id, seq, event_type, occurred_at, site_id, actor_id, ref_type, ref_id, scan_source)
     select id, 1, 'received', now(), $2, $3, 'po', $4, $5 from unnest($1::bigint[]) as t(id)`,
    [
      inserted.rows.map((r) => r.id),
      siteId,
      input.receivedBy ?? null,
      input.poNo ?? null,
      input.scanSource ?? "manual",
    ]
  );

  return {
    batchId,
    units: inserted.rows.map((r) => ({
      id: r.id,
      serial: r.serial,
      oemSerial: r.oem_serial,
    })),
  };
}
