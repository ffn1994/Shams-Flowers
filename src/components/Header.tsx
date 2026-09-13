'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useCart } from '@/lib/cart';
import { getDict, otherLang, type Lang } from '@/lib/i18n';

function swapLang(pathname: string, lang: Lang) {
  const segments = pathname.split('/');
  segments[1] = lang;
  return segments.join('/') || `/${lang}`;
}

export default function Header({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  const pathname = usePathname() || `/${lang}`;
  const { count, ready } = useCart();
  const [open, setOpen] = useState(false);

  const links = [
    { href: `/${lang}`, label: t.nav.home },
    { href: `/${lang}/shop`, label: t.nav.shop },
    { href: `/${lang}/about`, label: t.nav.about },
    { href: `/${lang}/contact`, label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-sand-200 bg-sand-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link href={`/${lang}`} className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-blush-600 text-lg text-white">
            ✿
          </span>
          <span className="text-lg font-extrabold text-blush-700">{t.brand}</span>
        </Link>

        <nav className="mx-auto hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active ? 'bg-blush-100 text-blush-800' : 'text-leaf-700 hover:bg-blush-50'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="ms-auto flex items-center gap-2 md:ms-0">
          <Link
            href={swapLang(pathname, otherLang(lang))}
            className="rounded-full border border-sand-200 px-3 py-1.5 text-xs font-semibold text-leaf-700 hover:bg-white"
          >
            {t.langSwitch}
          </Link>
          <Link
            href={`/${lang}/cart`}
            className="relative rounded-full border border-blush-200 bg-white px-4 py-1.5 text-sm font-semibold text-blush-700 hover:bg-blush-50"
          >
            {t.nav.cart}
            {ready && count > 0 && (
              <span className="absolute -top-2 -end-2 grid h-5 min-w-5 place-items-center rounded-full bg-blush-600 px-1 text-xs font-bold text-white">
                {count}
              </span>
            )}
          </Link>
          <button
            type="button"
            aria-label="menu"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="grid h-9 w-9 place-items-center rounded-full border border-sand-200 bg-white md:hidden"
          >
            <span className="text-lg leading-none">{open ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-sand-200 bg-white px-4 py-2 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-leaf-700 hover:bg-blush-50"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
