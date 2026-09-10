"use client";
import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";

// The inquiry basket. A visitor walks the shop, ticks the systems and part
// numbers they want, and sends the whole list once — instead of retyping
// model names into a message box. It lives in localStorage so it survives a
// page change and a reload; nothing leaves the browser until they submit.
//
// Two kinds of line: a catalogue product (by slug) and a part number (by pn).
// Both are looked up at render time, so the basket only stores what it has
// to and never carries stale copy.
//
// The store is external to React (a module-level array plus listeners) and
// read through useSyncExternalStore: the server snapshot is always empty, so
// server and first client render agree, and the real basket shows the moment
// hydration completes — no effect, no flash of a wrong count.

export type InquiryItem =
  | { kind: "product"; slug: string; qty: number }
  | { kind: "part"; pn: string; qty: number };

export type InquiryRef = { kind: "product"; slug: string } | { kind: "part"; pn: string };

export function itemKey(ref: InquiryRef): string {
  return ref.kind === "product" ? `product:${ref.slug}` : `part:${ref.pn}`;
}

const STORAGE_KEY = "etia-inquiry";
const EMPTY: InquiryItem[] = [];

let cache: InquiryItem[] | null = null;
const listeners = new Set<() => void>();

function read(): InquiryItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as { items?: unknown };
    if (!Array.isArray(parsed.items)) return EMPTY;
    return parsed.items.filter(
      (x): x is InquiryItem =>
        !!x &&
        typeof x === "object" &&
        ((x as InquiryItem).kind === "product" || (x as InquiryItem).kind === "part") &&
        typeof (x as InquiryItem).qty === "number"
    );
  } catch {
    return EMPTY;
  }
}

function getSnapshot(): InquiryItem[] {
  if (cache === null) cache = read();
  return cache;
}
function getServerSnapshot(): InquiryItem[] {
  return EMPTY;
}
function subscribe(fn: () => void) {
  listeners.add(fn);
  // Another tab changing the basket shows up here too.
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      cache = null;
      fn();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(fn);
    window.removeEventListener("storage", onStorage);
  };
}
function write(next: InquiryItem[]) {
  cache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ v: 1, items: next }));
  } catch {
    /* private mode or quota — the basket still works for this page view */
  }
  listeners.forEach((l) => l());
}

type Ctx = {
  items: InquiryItem[];
  count: number;
  has: (ref: InquiryRef) => boolean;
  add: (ref: InquiryRef, qty?: number) => void;
  remove: (ref: InquiryRef) => void;
  setQty: (ref: InquiryRef, qty: number) => void;
  clear: () => void;
  // False during server render and hydration, true once the client store is
  // in charge — so a count is never painted before it is known.
  ready: boolean;
};

const InquiryCtx = createContext<Ctx>({
  items: EMPTY,
  count: 0,
  has: () => false,
  add: () => {},
  remove: () => {},
  setQty: () => {},
  clear: () => {},
  ready: false,
});

export function InquiryProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ready = useSyncExternalStore(subscribe, () => true, () => false);

  const has = useCallback((ref: InquiryRef) => items.some((i) => itemKey(i) === itemKey(ref)), [items]);

  const add = useCallback((ref: InquiryRef, qty = 1) => {
    const prev = getSnapshot();
    const key = itemKey(ref);
    write(
      prev.some((i) => itemKey(i) === key)
        ? prev.map((i) => (itemKey(i) === key ? { ...i, qty: i.qty + qty } : i))
        : [...prev, { ...ref, qty } as InquiryItem]
    );
  }, []);

  const remove = useCallback((ref: InquiryRef) => {
    write(getSnapshot().filter((i) => itemKey(i) !== itemKey(ref)));
  }, []);

  const setQty = useCallback((ref: InquiryRef, qty: number) => {
    const key = itemKey(ref);
    const clamped = Math.max(1, Math.min(999, Math.round(qty) || 1));
    write(getSnapshot().map((i) => (itemKey(i) === key ? { ...i, qty: clamped } : i)));
  }, []);

  const clear = useCallback(() => write([]), []);

  const value = useMemo<Ctx>(
    () => ({ items, count: items.length, has, add, remove, setQty, clear, ready }),
    [items, has, add, remove, setQty, clear, ready]
  );

  return <InquiryCtx.Provider value={value}>{children}</InquiryCtx.Provider>;
}

export function useInquiry(): Ctx {
  return useContext(InquiryCtx);
}
