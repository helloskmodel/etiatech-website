// 内部系统的数据库连接。**只在国内腾讯云那份部署上使用**（DEPLOY_ROLE=internal）——
// 境外 Vercel 那份既没有 DATABASE_URL，/ops 路由也被 proxy.ts 挡成 404。

import { Pool } from "pg";

// serverless / 长驻进程都可能反复引入本模块，连接池必须复用，否则每次热更新
// 都会再开一池连接，很快把数据库的连接数吃光。
const globalForDb = globalThis as unknown as { etiaPool?: Pool };

export function getPool(): Pool {
  if (!globalForDb.etiaPool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL 未配置 —— 内部系统需要连接腾讯云 Postgres");
    }
    globalForDb.etiaPool = new Pool({
      connectionString,
      max: 10,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 8_000,
    });
  }
  return globalForDb.etiaPool;
}

/**
 * 在一个事务里跑一段逻辑。入库发号必须整体成功或整体回滚：
 * 号发了但单品没建出来，那个号就永远漏掉了，而序列号是要印在实物上的。
 */
export async function withTransaction<T>(
  fn: (client: import("pg").PoolClient) => Promise<T>
): Promise<T> {
  const client = await getPool().connect();
  try {
    await client.query("begin");
    const out = await fn(client);
    await client.query("commit");
    return out;
  } catch (err) {
    await client.query("rollback").catch(() => {});
    throw err;
  } finally {
    client.release();
  }
}
