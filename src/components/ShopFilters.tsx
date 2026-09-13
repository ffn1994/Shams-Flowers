'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getDict, type Lang } from '@/lib/i18n';
import { OCCASION_LABELS, OCCASIONS } from '@/lib/types';

export default function ShopFilters({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');

  const occasion = searchParams.get('occasion') ?? 'all';
  const sort = searchParams.get('sort') ?? 'newest';

  function push(next: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(next)) {
      if (!value || value === 'all') params.delete(key);
      else params.set(key, value);
    }
    const search = params.toString();
    router.push(search ? `${pathname}?${search}` : pathname);
  }

  // Debounce the search box so typing doesn't fire a navigation per keystroke.
  useEffect(() => {
    const current = searchParams.get('q') ?? '';
    if (query === current) return;
    const timer = window.setTimeout(() => push({ q: query }), 350);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className="card mb-6 flex flex-col gap-3 p-4 md:flex-row md:items-end">
      <div className="flex-1">
        <label className="label" htmlFor="q">
          {t.filters.search}
        </label>
        <input
          id="q"
          className="field"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t.filters.search}
        />
      </div>
      <div className="md:w-56">
        <label className="label" htmlFor="occasion">
          {t.filters.occasion}
        </label>
        <select
          id="occasion"
          className="field"
          value={occasion}
          onChange={(event) => push({ occasion: event.target.value })}
        >
          <option value="all">{t.filters.all}</option>
          {OCCASIONS.map((value) => (
            <option key={value} value={value}>
              {OCCASION_LABELS[value][lang]}
            </option>
          ))}
        </select>
      </div>
      <div className="md:w-56">
        <label className="label" htmlFor="sort">
          {t.filters.sort}
        </label>
        <select
          id="sort"
          className="field"
          value={sort}
          onChange={(event) => push({ sort: event.target.value })}
        >
          <option value="newest">{t.filters.newest}</option>
          <option value="price-asc">{t.filters.priceLow}</option>
          <option value="price-desc">{t.filters.priceHigh}</option>
        </select>
      </div>
    </div>
  );
}
