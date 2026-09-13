import type { Lang } from './i18n';

/** 1 KWD = 1000 fils. Prices are stored as integer fils to avoid float drift. */
export const FILS_PER_KWD = 1000;

export function filsToKwd(fils: number): number {
  return fils / FILS_PER_KWD;
}

export function kwdToFils(kwd: number | string): number {
  const value = typeof kwd === 'string' ? Number(kwd) : kwd;
  if (!Number.isFinite(value)) return 0;
  return Math.round(value * FILS_PER_KWD);
}

/** Kuwaiti Dinar is always shown with exactly 3 decimals: 12.500 KWD */
export function formatKwd(fils: number, lang: Lang): string {
  const amount = filsToKwd(fils).toFixed(3);
  return lang === 'ar' ? `${amount} د.ك` : `${amount} KWD`;
}
