import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { site } from '../siteConfig';

/**
 * شعار مؤقت — استبدل ملف src/assets/logo.svg بشعار المحل الرسمي
 * Logo placeholder: swap src/assets/logo.svg for the real brand mark.
 */
export default function Logo({ to = '/', onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="group flex items-center gap-3"
      aria-label={site.nameAr}
    >
      <img
        src={logo}
        alt=""
        className="h-11 w-11 shrink-0 transition-transform duration-300 ease-soft group-hover:rotate-12 sm:h-12 sm:w-12"
      />
      <span className="flex flex-col leading-tight">
        <span className="text-lg font-extrabold text-brand-700 sm:text-xl">{site.nameAr}</span>
        <span className="ltr font-display text-[0.7rem] tracking-[0.18em] text-ink-faint uppercase">
          {site.nameEn}
        </span>
      </span>
    </Link>
  );
}
