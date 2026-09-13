'use client';

import { useCallback, useMemo, useSyncExternalStore } from 'react';
import type { CartLine } from './types';

const STORAGE_KEY = 'shams-cart-v1';
const EMPTY: CartLine[] = [];

/**
 * The cart lives in localStorage, which is an external store — so it is read
 * through useSyncExternalStore instead of being mirrored into React state.
 */
const listeners = new Set<() => void>();
let cache: CartLine[] | null = null;

function parse(raw: string | null): CartLine[] {
  if (!raw) return EMPTY;
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY;
    return parsed
      .filter((line) => line && typeof line.productId === 'string')
      .map((line) => ({
        productId: line.productId as string,
        quantity: Math.max(1, Math.min(99, Number(line.quantity) || 1)),
      }));
  } catch {
    return EMPTY;
  }
}

function read(): CartLine[] {
  try {
    return parse(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    // Storage can be unavailable (private mode, blocked cookies).
    return EMPTY;
  }
}

function emit() {
  for (const listener of listeners) listener();
}

function getSnapshot(): CartLine[] {
  if (cache === null) cache = read();
  return cache;
}

function getServerSnapshot(): CartLine[] {
  return EMPTY;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key !== null && event.key !== STORAGE_KEY) return;
    cache = read();
    emit();
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}

function write(next: CartLine[]) {
  cache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Ignore quota / disabled storage — the in-memory cache still works.
  }
  emit();
}

export function useCart() {
  const lines = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  // False during SSR and the hydration pass, true once the browser store is live.
  const ready = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const add = useCallback((productId: string, quantity = 1) => {
    const current = getSnapshot();
    const existing = current.find((line) => line.productId === productId);
    write(
      existing
        ? current.map((line) =>
            line.productId === productId
              ? { ...line, quantity: Math.min(99, line.quantity + quantity) }
              : line,
          )
        : [...current, { productId, quantity }],
    );
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    const current = getSnapshot();
    write(
      quantity <= 0
        ? current.filter((line) => line.productId !== productId)
        : current.map((line) =>
            line.productId === productId ? { ...line, quantity: Math.min(99, quantity) } : line,
          ),
    );
  }, []);

  const remove = useCallback((productId: string) => {
    write(getSnapshot().filter((line) => line.productId !== productId));
  }, []);

  const clear = useCallback(() => write(EMPTY), []);

  const count = useMemo(() => lines.reduce((sum, line) => sum + line.quantity, 0), [lines]);

  return { lines, count, ready, add, setQuantity, remove, clear };
}
