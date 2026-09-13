'use client';

import { useCallback, useEffect, useState } from 'react';
import { getDict, type Lang } from '@/lib/i18n';
import { filsToKwd, formatKwd, kwdToFils } from '@/lib/money';
import {
  OCCASION_LABELS,
  OCCASIONS,
  type Order,
  type OrderStatus,
  type Product,
} from '@/lib/types';

type Draft = {
  id?: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  descAr: string;
  descEn: string;
  includesAr: string;
  includesEn: string;
  sizeAr: string;
  sizeEn: string;
  priceKwd: string;
  image: string;
  occasion: string;
  stock: string;
  featured: boolean;
};

const emptyDraft: Draft = {
  slug: '',
  nameAr: '',
  nameEn: '',
  descAr: '',
  descEn: '',
  includesAr: '',
  includesEn: '',
  sizeAr: '',
  sizeEn: '',
  priceKwd: '',
  image: '/products/roses-red.svg',
  occasion: 'love',
  stock: '0',
  featured: false,
};

function toDraft(product: Product): Draft {
  return {
    id: product.id,
    slug: product.slug,
    nameAr: product.name.ar,
    nameEn: product.name.en,
    descAr: product.description.ar,
    descEn: product.description.en,
    includesAr: product.includes.ar,
    includesEn: product.includes.en,
    sizeAr: product.size.ar,
    sizeEn: product.size.en,
    priceKwd: filsToKwd(product.price).toFixed(3),
    image: product.image,
    occasion: product.occasion,
    stock: String(product.stock),
    featured: product.featured,
  };
}

const STATUSES: OrderStatus[] = ['new', 'confirmed', 'delivered', 'cancelled'];

export default function AdminDashboard({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [tab, setTab] = useState<'products' | 'orders'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const [productsResponse, ordersResponse] = await Promise.all([
      fetch('/api/products', { cache: 'no-store' }),
      fetch('/api/orders', { cache: 'no-store' }),
    ]);
    if (ordersResponse.status === 401) {
      setAuthed(false);
      return;
    }
    setProducts(await productsResponse.json());
    setOrders(await ordersResponse.json());
    setAuthed(true);
  }, []);

  useEffect(() => {
    // Initial fetch on mount; every setState here happens after an await.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, [load]);

  async function login(event: React.FormEvent) {
    event.preventDefault();
    setLoginError('');
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (!response.ok) {
      setLoginError(t.admin.wrong);
      return;
    }
    setPassword('');
    await load();
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    setAuthed(false);
    setOrders([]);
  }

  async function saveDraft(event: React.FormEvent) {
    event.preventDefault();
    if (!draft) return;
    setSaving(true);
    const payload = {
      slug: draft.slug,
      nameAr: draft.nameAr,
      nameEn: draft.nameEn,
      descAr: draft.descAr,
      descEn: draft.descEn,
      includesAr: draft.includesAr,
      includesEn: draft.includesEn,
      sizeAr: draft.sizeAr,
      sizeEn: draft.sizeEn,
      price: kwdToFils(draft.priceKwd),
      image: draft.image,
      occasion: draft.occasion,
      stock: Number(draft.stock) || 0,
      featured: draft.featured,
    };
    const response = await fetch(draft.id ? `/api/products/${draft.id}` : '/api/products', {
      method: draft.id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (response.ok) {
      setDraft(null);
      await load();
    }
  }

  async function removeProduct(id: string) {
    if (!window.confirm(t.admin.confirmDelete)) return;
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    await load();
  }

  async function setStatus(order: Order, status: OrderStatus) {
    await fetch(`/api/orders/${order.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    await load();
  }

  if (authed === null) return <div className="card p-8 text-center text-leaf-700">…</div>;

  if (!authed) {
    return (
      <form onSubmit={login} className="card mx-auto max-w-sm space-y-4 p-6">
        <h2 className="text-lg font-bold">{t.admin.login}</h2>
        <div>
          <label className="label" htmlFor="password">
            {t.admin.password}
          </label>
          <input
            id="password"
            type="password"
            className="field"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        {loginError && <p className="text-sm font-medium text-blush-700">{loginError}</p>}
        <button type="submit" className="btn-primary w-full">
          {t.admin.login}
        </button>
      </form>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setTab('products')}
          className={tab === 'products' ? 'btn-primary' : 'btn-ghost'}
        >
          {t.admin.products} ({products.length})
        </button>
        <button
          type="button"
          onClick={() => setTab('orders')}
          className={tab === 'orders' ? 'btn-primary' : 'btn-ghost'}
        >
          {t.admin.orders} ({orders.length})
        </button>
        <button type="button" onClick={logout} className="btn-ghost ms-auto">
          {t.admin.logout}
        </button>
      </div>

      {tab === 'products' && (
        <div className="space-y-4">
          {!draft && (
            <button type="button" className="btn-primary" onClick={() => setDraft(emptyDraft)}>
              + {t.admin.addProduct}
            </button>
          )}

          {draft && (
            <form onSubmit={saveDraft} className="card space-y-4 p-5">
              <h3 className="text-lg font-bold">
                {draft.id ? t.admin.editProduct : t.admin.addProduct}
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {(
                  [
                    ['nameAr', t.admin.nameAr],
                    ['nameEn', t.admin.nameEn],
                    ['descAr', t.admin.descAr],
                    ['descEn', t.admin.descEn],
                    ['includesAr', `${t.product.includes} (AR)`],
                    ['includesEn', `${t.product.includes} (EN)`],
                    ['sizeAr', `${t.product.size} (AR)`],
                    ['sizeEn', `${t.product.size} (EN)`],
                    ['image', t.admin.image],
                    ['slug', 'slug'],
                  ] as const
                ).map(([key, label]) => (
                  <div key={key}>
                    <label className="label" htmlFor={key}>
                      {label}
                    </label>
                    <input
                      id={key}
                      className="field"
                      value={draft[key]}
                      onChange={(event) => setDraft({ ...draft, [key]: event.target.value })}
                    />
                  </div>
                ))}
                <div>
                  <label className="label" htmlFor="priceKwd">
                    {t.admin.priceKwd}
                  </label>
                  <input
                    id="priceKwd"
                    className="field"
                    dir="ltr"
                    inputMode="decimal"
                    placeholder="25.000"
                    value={draft.priceKwd}
                    onChange={(event) => setDraft({ ...draft, priceKwd: event.target.value })}
                  />
                </div>
                <div>
                  <label className="label" htmlFor="stock">
                    {t.admin.stock}
                  </label>
                  <input
                    id="stock"
                    className="field"
                    dir="ltr"
                    inputMode="numeric"
                    value={draft.stock}
                    onChange={(event) => setDraft({ ...draft, stock: event.target.value })}
                  />
                </div>
                <div>
                  <label className="label" htmlFor="occasion">
                    {t.admin.occasion}
                  </label>
                  <select
                    id="occasion"
                    className="field"
                    value={draft.occasion}
                    onChange={(event) => setDraft({ ...draft, occasion: event.target.value })}
                  >
                    {OCCASIONS.map((occasion) => (
                      <option key={occasion} value={occasion}>
                        {OCCASION_LABELS[occasion][lang]}
                      </option>
                    ))}
                  </select>
                </div>
                <label className="flex items-end gap-2 pb-2 text-sm font-medium">
                  <input
                    type="checkbox"
                    checked={draft.featured}
                    onChange={(event) => setDraft({ ...draft, featured: event.target.checked })}
                  />
                  {t.admin.featured}
                </label>
              </div>
              <div className="flex gap-2">
                <button type="submit" className="btn-primary" disabled={saving}>
                  {t.admin.save}
                </button>
                <button type="button" className="btn-ghost" onClick={() => setDraft(null)}>
                  {t.admin.cancel}
                </button>
              </div>
            </form>
          )}

          <div className="grid gap-3">
            {products.map((product) => (
              <div key={product.id} className="card flex flex-wrap items-center gap-4 p-4">
                <img
                  src={product.image}
                  alt=""
                  className="h-14 w-14 rounded-xl bg-sand-100 object-cover"
                />
                <div className="min-w-40 flex-1">
                  <div className="font-bold">{product.name[lang]}</div>
                  <div className="text-sm text-leaf-700">
                    {OCCASION_LABELS[product.occasion][lang]} · {t.admin.stock}: {product.stock}
                  </div>
                </div>
                <div className="font-extrabold text-blush-700" dir="ltr">
                  {formatKwd(product.price, lang)}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="btn-ghost"
                    onClick={() => setDraft(toDraft(product))}
                  >
                    {t.admin.editProduct}
                  </button>
                  <button
                    type="button"
                    className="btn-ghost"
                    onClick={() => removeProduct(product.id)}
                  >
                    {t.admin.delete}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'orders' && (
        <div className="space-y-3">
          {orders.length === 0 && <p className="card p-8 text-center">{t.admin.noOrders}</p>}
          {orders.map((order) => (
            <div key={order.id} className="card space-y-2 p-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-extrabold" dir="ltr">
                  {order.reference}
                </span>
                <span className="text-sm text-leaf-700">
                  {new Date(order.createdAt).toLocaleString(lang === 'ar' ? 'ar-KW' : 'en-GB')}
                </span>
                <span className="ms-auto font-extrabold text-blush-700" dir="ltr">
                  {formatKwd(order.total, lang)}
                </span>
              </div>
              <div className="text-sm text-leaf-700">
                {order.customer.name} · <span dir="ltr">{order.customer.phone}</span> ·{' '}
                {order.customer.area} - {order.customer.block} - {order.customer.street}
              </div>
              <div className="text-sm text-leaf-700">
                {order.delivery.date} ({t.slots[order.delivery.slot]}) · {t.checkout[order.payment]}
              </div>
              <ul className="text-sm">
                {order.items.map((item) => (
                  <li key={item.productId}>
                    • {item.name[lang]} × {item.quantity}
                  </li>
                ))}
              </ul>
              {order.cardMessage && (
                <p className="rounded-xl bg-sand-100 px-3 py-2 text-sm">“{order.cardMessage}”</p>
              )}
              <div className="flex flex-wrap gap-2 pt-1">
                {STATUSES.map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setStatus(order, status)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                      order.status === status
                        ? 'bg-blush-600 text-white'
                        : 'border border-sand-200 bg-white text-leaf-700'
                    }`}
                  >
                    {t.status[status]}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
