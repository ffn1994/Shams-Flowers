import 'server-only';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { Order, Product } from './types';

const DATA_DIR = path.join(process.cwd(), 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(file, 'utf8');
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson(file: string, value: unknown) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(file, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

export async function getProducts(): Promise<Product[]> {
  const products = await readJson<Product[]>(PRODUCTS_FILE, []);
  return products.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getProduct(idOrSlug: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
}

export async function saveProduct(product: Product): Promise<Product> {
  const products = await readJson<Product[]>(PRODUCTS_FILE, []);
  const index = products.findIndex((p) => p.id === product.id);
  if (index >= 0) products[index] = product;
  else products.push(product);
  await writeJson(PRODUCTS_FILE, products);
  return product;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const products = await readJson<Product[]>(PRODUCTS_FILE, []);
  const next = products.filter((p) => p.id !== id);
  if (next.length === products.length) return false;
  await writeJson(PRODUCTS_FILE, next);
  return true;
}

export async function getOrders(): Promise<Order[]> {
  const orders = await readJson<Order[]>(ORDERS_FILE, []);
  return orders.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getOrder(id: string): Promise<Order | undefined> {
  const orders = await readJson<Order[]>(ORDERS_FILE, []);
  return orders.find((o) => o.id === id || o.reference === id);
}

export async function saveOrder(order: Order): Promise<Order> {
  const orders = await readJson<Order[]>(ORDERS_FILE, []);
  const index = orders.findIndex((o) => o.id === order.id);
  if (index >= 0) orders[index] = order;
  else orders.push(order);
  await writeJson(ORDERS_FILE, orders);
  return order;
}

/** Decrease stock after a confirmed order, never below zero. */
export async function decrementStock(lines: { productId: string; quantity: number }[]) {
  const products = await readJson<Product[]>(PRODUCTS_FILE, []);
  let changed = false;
  for (const line of lines) {
    const product = products.find((p) => p.id === line.productId);
    if (!product) continue;
    product.stock = Math.max(0, product.stock - line.quantity);
    changed = true;
  }
  if (changed) await writeJson(PRODUCTS_FILE, products);
}
