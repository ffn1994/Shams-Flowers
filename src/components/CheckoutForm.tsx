'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCart } from '@/lib/cart';
import { KUWAIT_AREAS } from '@/lib/config';
import { getDict, type Lang } from '@/lib/i18n';
import { formatKwd } from '@/lib/money';
import { deliveryFeeFor } from '@/lib/orders';
import type { Order, Product } from '@/lib/types';
import { isValidKuwaitPhone } from '@/lib/validate';

const SLOT_KEYS = ['morning', 'afternoon', 'evening'] as const;

export default function CheckoutForm({ products, lang }: { products: Product[]; lang: Lang }) {
  const t = getDict(lang);
  const router = useRouter();
  const { lines, clear, ready } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const today = new Date().toISOString().slice(0, 10);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    area: KUWAIT_AREAS[0][lang],
    block: '',
    street: '',
    house: '',
    date: today,
    slot: 'evening' as (typeof SLOT_KEYS)[number],
    cardMessage: '',
    notes: '',
    payment: 'cod' as 'cod' | 'knet',
  });

  const rows = lines
    .map((line) => ({ line, product: products.find((p) => p.id === line.productId) }))
    .filter((row): row is { line: (typeof lines)[number]; product: Product } => Boolean(row.product));

  const subtotal = rows.reduce((sum, row) => sum + row.product.price * row.line.quantity, 0);
  const deliveryFee = deliveryFeeFor(subtotal);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError('');

    if (!form.name.trim() || !form.area.trim() || !form.block.trim() || !form.street.trim()) {
      setError(t.checkout.required);
      return;
    }
    if (!isValidKuwaitPhone(form.phone)) {
      setError(t.checkout.phoneInvalid);
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: lines,
          customer: {
            name: form.name,
            phone: form.phone,
            area: form.area,
            block: form.block,
            street: form.street,
            house: form.house,
          },
          delivery: { date: form.date, slot: form.slot },
          cardMessage: form.cardMessage,
          notes: form.notes,
          payment: form.payment,
          lang,
        }),
      });
      if (!response.ok) throw new Error('request_failed');
      const order = (await response.json()) as Order;
      clear();
      router.push(`/${lang}/order/${order.id}`);
    } catch {
      setError(t.checkout.error);
      setSubmitting(false);
    }
  }

  if (!ready) return <div className="card p-8 text-center text-leaf-700">…</div>;

  if (rows.length === 0) {
    return (
      <div className="card p-10 text-center">
        <p className="text-leaf-700">{t.cart.empty}</p>
        <Link href={`/${lang}/shop`} className="btn-primary mt-5">
          {t.cart.continue}
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-3">
      <div className="card space-y-4 p-5 lg:col-span-2">
        <h2 className="text-lg font-bold">{t.checkout.contact}</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="name">
              {t.checkout.name} *
            </label>
            <input
              id="name"
              className="field"
              value={form.name}
              onChange={(event) => update('name', event.target.value)}
              required
            />
          </div>
          <div>
            <label className="label" htmlFor="phone">
              {t.checkout.phone} *
            </label>
            <input
              id="phone"
              className="field"
              dir="ltr"
              inputMode="numeric"
              placeholder="5xxxxxxx"
              value={form.phone}
              onChange={(event) => update('phone', event.target.value)}
              required
            />
          </div>
          <div>
            <label className="label" htmlFor="area">
              {t.checkout.area} *
            </label>
            <select
              id="area"
              className="field"
              value={form.area}
              onChange={(event) => update('area', event.target.value)}
            >
              {KUWAIT_AREAS.map((area) => (
                <option key={area.en} value={area[lang]}>
                  {area[lang]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="block">
              {t.checkout.block} *
            </label>
            <input
              id="block"
              className="field"
              value={form.block}
              onChange={(event) => update('block', event.target.value)}
              required
            />
          </div>
          <div>
            <label className="label" htmlFor="street">
              {t.checkout.street} *
            </label>
            <input
              id="street"
              className="field"
              value={form.street}
              onChange={(event) => update('street', event.target.value)}
              required
            />
          </div>
          <div>
            <label className="label" htmlFor="house">
              {t.checkout.house}
            </label>
            <input
              id="house"
              className="field"
              value={form.house}
              onChange={(event) => update('house', event.target.value)}
            />
          </div>
          <div>
            <label className="label" htmlFor="date">
              {t.checkout.date}
            </label>
            <input
              id="date"
              type="date"
              className="field"
              min={today}
              value={form.date}
              onChange={(event) => update('date', event.target.value)}
            />
          </div>
          <div>
            <label className="label" htmlFor="slot">
              {t.checkout.slot}
            </label>
            <select
              id="slot"
              className="field"
              value={form.slot}
              onChange={(event) => update('slot', event.target.value as (typeof SLOT_KEYS)[number])}
            >
              {SLOT_KEYS.map((slot) => (
                <option key={slot} value={slot}>
                  {t.slots[slot]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="label" htmlFor="card">
            {t.checkout.card}
          </label>
          <textarea
            id="card"
            rows={2}
            className="field"
            maxLength={300}
            value={form.cardMessage}
            onChange={(event) => update('cardMessage', event.target.value)}
          />
        </div>
        <div>
          <label className="label" htmlFor="notes">
            {t.checkout.notes}
          </label>
          <textarea
            id="notes"
            rows={2}
            className="field"
            maxLength={500}
            value={form.notes}
            onChange={(event) => update('notes', event.target.value)}
          />
        </div>

        <fieldset>
          <legend className="label">{t.checkout.payment}</legend>
          <div className="flex flex-wrap gap-3">
            {(['cod', 'knet'] as const).map((method) => (
              <label
                key={method}
                className={`cursor-pointer rounded-xl border px-4 py-2.5 text-sm font-medium ${
                  form.payment === method
                    ? 'border-blush-400 bg-blush-50 text-blush-800'
                    : 'border-sand-200 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  className="me-2"
                  checked={form.payment === method}
                  onChange={() => update('payment', method)}
                />
                {t.checkout[method]}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <aside className="card h-fit space-y-3 p-5">
        <h2 className="text-lg font-bold">{t.checkout.summary}</h2>
        <ul className="space-y-2 text-sm">
          {rows.map(({ line, product }) => (
            <li key={product.id} className="flex justify-between gap-2">
              <span>
                {product.name[lang]} × {line.quantity}
              </span>
              <span dir="ltr">{formatKwd(product.price * line.quantity, lang)}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between border-t border-sand-200 pt-3 text-sm">
          <span>{t.cart.subtotal}</span>
          <span dir="ltr">{formatKwd(subtotal, lang)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>{t.cart.delivery}</span>
          <span dir="ltr">
            {deliveryFee === 0 ? t.cart.freeDelivery : formatKwd(deliveryFee, lang)}
          </span>
        </div>
        <div className="flex justify-between border-t border-sand-200 pt-3 text-lg font-extrabold">
          <span>{t.cart.grandTotal}</span>
          <span dir="ltr">{formatKwd(subtotal + deliveryFee, lang)}</span>
        </div>

        {error && (
          <p className="rounded-xl bg-blush-50 px-3 py-2 text-sm font-medium text-blush-800">
            {error}
          </p>
        )}

        <button type="submit" className="btn-primary w-full" disabled={submitting}>
          {submitting ? t.checkout.submitting : t.checkout.submit}
        </button>
      </aside>
    </form>
  );
}
