import Link from 'next/link';
import { shopConfig } from '@/lib/config';
import { getDict, type Lang } from '@/lib/i18n';

export default function Footer({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  return (
    <footer className="mt-16 border-t border-sand-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <div className="mb-2 text-lg font-extrabold text-blush-700">{t.brand}</div>
          <p className="text-sm text-leaf-700">{t.tagline}</p>
          <p className="mt-3 text-sm text-leaf-700">{shopConfig.address[lang]}</p>
        </div>
        <div>
          <div className="mb-2 font-semibold">{t.nav.shop}</div>
          <ul className="space-y-1.5 text-sm text-leaf-700">
            <li>
              <Link className="hover:text-blush-700" href={`/${lang}/shop`}>
                {t.sections.all}
              </Link>
            </li>
            <li>
              <Link className="hover:text-blush-700" href={`/${lang}/about`}>
                {t.nav.about}
              </Link>
            </li>
            <li>
              <Link className="hover:text-blush-700" href={`/${lang}/contact`}>
                {t.nav.contact}
              </Link>
            </li>
            <li>
              <Link className="hover:text-blush-700" href={`/${lang}/admin`}>
                {t.nav.admin}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="mb-2 font-semibold">{t.footer.follow}</div>
          <ul className="space-y-1.5 text-sm text-leaf-700">
            <li dir="ltr" className="text-start">
              {shopConfig.phone}
            </li>
            <li>
              <a
                className="hover:text-blush-700"
                href={`https://instagram.com/${shopConfig.instagram}`}
                target="_blank"
                rel="noreferrer"
              >
                @{shopConfig.instagram}
              </a>
            </li>
            <li>{t.footer.hours}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-sand-200 py-4 text-center text-xs text-leaf-700">
        © {new Date().getFullYear()} {t.brand} — {t.footer.rights}
      </div>
    </footer>
  );
}
