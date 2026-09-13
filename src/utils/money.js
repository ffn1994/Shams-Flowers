/**
 * الدينار الكويتي يُكتب دائماً بثلاث خانات عشرية: 25.000 د.ك
 * KWD is always formatted with exactly three decimals.
 */
export function formatKwd(amount) {
  const value = Number(amount);
  if (!Number.isFinite(value)) return '';
  return `${value.toFixed(3)} د.ك`;
}
