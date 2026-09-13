import 'server-only';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

export const ADMIN_COOKIE = 'sf_admin';

function adminPassword() {
  return process.env.ADMIN_PASSWORD ?? 'shams2026';
}

function secret() {
  return process.env.ADMIN_SECRET ?? `${adminPassword()}::shams-flowers`;
}

export function adminToken(): string {
  return createHmac('sha256', secret()).update('admin').digest('hex');
}

export function checkPassword(input: string): boolean {
  const expected = Buffer.from(adminPassword());
  const given = Buffer.from(input ?? '');
  if (expected.length !== given.length) return false;
  return timingSafeEqual(expected, given);
}

export async function isAdmin(): Promise<boolean> {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!token) return false;
  const expected = Buffer.from(adminToken());
  const given = Buffer.from(token);
  if (expected.length !== given.length) return false;
  return timingSafeEqual(expected, given);
}
