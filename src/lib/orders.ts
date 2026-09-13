import { shopConfig } from './config';

export function deliveryFeeFor(subtotal: number): number {
  return subtotal >= shopConfig.freeDeliveryThreshold ? 0 : shopConfig.deliveryFee;
}

export function makeReference(date = new Date()): string {
  const stamp = `${String(date.getDate()).padStart(2, '0')}${String(date.getMonth() + 1).padStart(2, '0')}`;
  const random = Math.floor(Math.random() * 9000 + 1000);
  return `SF-${stamp}-${random}`;
}
