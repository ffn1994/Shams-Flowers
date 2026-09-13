import WhatsAppButton from '../WhatsAppButton';
import { ChatIcon } from '../Icons';
import { site } from '../../siteConfig';

function PhoneIcon({ className = 'h-6 w-6' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M6.5 3.5h3l1.4 3.6-2 1.4a11 11 0 0 0 4.6 4.6l1.4-2 3.6 1.4v3c0 .9-.8 1.6-1.7 1.5A14.6 14.6 0 0 1 5 5.2c-.1-.9.6-1.7 1.5-1.7Z" />
    </svg>
  );
}

function InstagramIcon({ className = 'h-6 w-6' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M14 9V7.2c0-.8.2-1.2 1.4-1.2H17V3.2C16.6 3.1 15.7 3 14.7 3 12.3 3 11 4.3 11 6.8V9H8.6v3H11v9h3v-9h2.4l.4-3H14Z" />
    </svg>
  );
}

/** قنوات التواصل: واتساب، اتصال، إنستغرام، وفيسبوك إذا كان الرابط موجود */
export default function ContactChannels() {
  const channels = [
    {
      id: 'phone',
      Icon: PhoneIcon,
      title: 'اتصال',
      value: site.phoneDisplay,
      href: `tel:${site.phoneDisplay.replace(/\s/g, '')}`,
      body: 'كلمنا مباشرة إذا تفضل المكالمة.',
    },
    {
      id: 'instagram',
      Icon: InstagramIcon,
      title: 'إنستغرام',
      value: `@${site.instagram}`,
      href: `https://instagram.com/${site.instagram}`,
      body: 'شوف آخر التنسيقات والأعمال على حسابنا.',
    },
    // يظهر فقط إذا انحط رابط الفيسبوك في siteConfig
    site.facebook && {
      id: 'facebook',
      Icon: FacebookIcon,
      title: 'فيسبوك',
      value: site.nameEn,
      href: site.facebook,
      body: 'تابعنا على صفحتنا في فيسبوك.',
    },
  ].filter(Boolean);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {/* الواتساب هو القناة الأساسية */}
      <article className="card flex flex-col gap-3 border-brand-200 bg-brand-50 p-6">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-600 text-white">
          <ChatIcon />
        </span>
        <h2 className="text-lg font-extrabold text-ink">واتساب</h2>
        <p className="text-sm leading-relaxed text-ink-muted">
          أسرع طريقة للطلب — نتفق على المناسبة والألوان والحجم ووقت التوصيل.
        </p>
        <span className="ltr inline-block text-sm font-bold text-brand-700">
          +{site.whatsapp}
        </span>
        <WhatsAppButton className="mt-auto w-full" />
      </article>

      {channels.map(({ id, Icon, title, value, href, body }) => (
        <article key={id} className="card flex flex-col gap-3 p-6">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-100 text-brand-700">
            <Icon />
          </span>
          <h2 className="text-lg font-extrabold text-ink">{title}</h2>
          <p className="text-sm leading-relaxed text-ink-muted">{body}</p>
          <a
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            className="btn-outline mt-auto w-full"
          >
            <span className="ltr">{value}</span>
          </a>
        </article>
      ))}
    </div>
  );
}
