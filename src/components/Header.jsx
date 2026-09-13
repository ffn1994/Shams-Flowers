import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import WhatsAppButton from './WhatsAppButton';
import { navLinks } from '../siteConfig';

function MenuIcon({ open }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      className="h-5 w-5"
    >
      {open ? (
        <>
          <path d="M6 6l12 12" />
          <path d="M18 6L6 18" />
        </>
      ) : (
        <>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </>
      )}
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const linkClass = ({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`;

  return (
    <header className="sticky top-0 z-50 border-b border-cream-300/70 bg-cream-50/85 backdrop-blur-md">
      <div className="shell flex h-header items-center gap-4">
        <Logo onClick={close} />

        {/* التنقل — سطح المكتب */}
        <nav aria-label="التنقل الرئيسي" className="mx-auto hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-2 md:ms-0">
          <WhatsAppButton className="hidden sm:inline-flex" variant="outline">
            واتساب
          </WhatsAppButton>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
            className="grid h-10 w-10 place-items-center rounded-full border border-cream-300 bg-white text-brand-700 transition hover:bg-brand-50 md:hidden"
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      {/* التنقل — الجوال */}
      <nav
        id="mobile-nav"
        aria-label="التنقل للجوال"
        hidden={!open}
        className="border-t border-cream-300/70 bg-white md:hidden"
      >
        <div className="shell flex flex-col gap-1 py-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={close}
              className={({ isActive }) =>
                `rounded-petal px-4 py-3 text-base font-bold transition ${
                  isActive ? 'bg-brand-100 text-brand-800' : 'text-ink-muted hover:bg-brand-50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <WhatsAppButton className="mt-2 w-full" />
        </div>
      </nav>
    </header>
  );
}
