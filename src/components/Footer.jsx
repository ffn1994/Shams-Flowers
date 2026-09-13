import { Link } from 'react-router-dom';
import WhatsAppButton from './WhatsAppButton';
import { navLinks, site } from '../siteConfig';
import logo from '../assets/logo.svg';

function TruckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d="M3 7h10v9H3z" />
      <path d="M13 10h4l3 3v3h-7z" />
      <circle cx="7" cy="18" r="1.8" />
      <circle cx="17" cy="18" r="1.8" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-cream-300/70 bg-white">
      {/* شريط التوصيل */}
      <div className="bg-petal-gradient border-b border-cream-300/70">
        <div className="shell flex items-center justify-center gap-2 py-3 text-center text-sm font-bold text-brand-800">
          <TruckIcon />
          <span>{site.deliveryNoteAr}</span>
        </div>
      </div>

      <div className="shell grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo} alt="" className="h-10 w-10" />
            <div className="leading-tight">
              <div className="font-extrabold text-brand-700">{site.nameAr}</div>
              <div className="ltr font-display text-[0.7rem] tracking-[0.18em] text-ink-faint uppercase">
                {site.nameEn}
              </div>
            </div>
          </div>
          <p className="mt-3 max-w-xs text-sm text-ink-muted">{site.taglineAr}</p>
        </div>

        <nav aria-label="روابط سريعة">
          <h2 className="mb-3 text-sm font-extrabold text-ink">روابط سريعة</h2>
          <ul className="space-y-2 text-sm text-ink-muted">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="transition hover:text-brand-700">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-3 text-sm font-extrabold text-ink">تواصل معنا</h2>
          <ul className="space-y-2 text-sm text-ink-muted">
            <li className="ltr text-start">{site.phoneDisplay}</li>
            <li>
              <a
                href={`https://instagram.com/${site.instagram}`}
                target="_blank"
                rel="noreferrer"
                className="ltr inline-block transition hover:text-brand-700"
              >
                @{site.instagram}
              </a>
            </li>
            {site.facebook && (
              <li>
                <a
                  href={site.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block transition hover:text-brand-700"
                >
                  فيسبوك
                </a>
              </li>
            )}
            <li>{site.orderNoteAr}</li>
          </ul>
          <WhatsAppButton className="mt-4 w-full sm:w-auto" />
        </div>
      </div>

      <div className="border-t border-cream-300/70 py-4 text-center text-xs text-ink-faint">
        © {new Date().getFullYear()} {site.nameAr} — جميع الحقوق محفوظة
      </div>
    </footer>
  );
}
