import { Link } from 'react-router-dom';
import WhatsAppButton from '../WhatsAppButton';
import { TruckIcon } from '../Icons';
import { site } from '../../siteConfig';
import heroArrangement from '../../assets/bouquets/hero-arrangement.svg';

export default function Hero() {
  return (
    <section className="bg-petal-gradient relative overflow-hidden">
      {/* دوائر زخرفية خفيفة بالخلفية */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -start-24 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -end-16 h-80 w-80 rounded-full bg-brand-100/70 blur-3xl"
      />

      <div className="shell relative grid items-center gap-10 py-14 md:grid-cols-2 md:py-20">
        <div className="text-center md:text-start">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-1.5 text-xs font-bold text-brand-700 shadow-soft">
            <TruckIcon className="h-4 w-4" />
            {site.deliveryNoteAr}
          </span>

          <h1 className="mt-5 text-hero font-extrabold text-ink sm:text-5xl">
            ورد يعبّر عنك
            <span className="block text-brand-gradient">بكل مناسبة</span>
          </h1>

          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-ink-muted md:mx-0 md:text-lg">
            باقات وتنسيقات وديكور مناسبات — من بوكيه تخرج لين تجهيز استقبال كامل.
            نختار الورد الطازج ونجهزه بنفس اليوم ونوصله لك.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
            <Link to="/bouquets" className="btn-primary">
              تصفح الباقات
            </Link>
            <WhatsAppButton variant="light">استفسر واتساب</WhatsAppButton>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 text-center md:mx-0 md:text-start">
            {[
              { value: 'نفس اليوم', label: 'وقت التوصيل' },
              { value: '٧ أيام', label: 'نستقبل طلباتكم' },
              { value: 'كل الكويت', label: 'مناطق التوصيل' },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="text-base font-extrabold text-brand-700 sm:text-lg">{stat.value}</dt>
                <dd className="mt-1 text-xs text-ink-muted">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-sm md:max-w-none">
          <img
            src={heroArrangement}
            alt="تنسيقة ورد من شمس فلاورز"
            className="w-full rounded-bloom shadow-lift"
          />
          <div className="card absolute -bottom-5 start-4 flex items-center gap-3 px-4 py-3 sm:start-8">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-100 text-brand-700">
              <TruckIcon className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <div className="text-sm font-extrabold text-ink">توصيل بنفس اليوم</div>
              <div className="text-xs text-ink-muted">للطلبات قبل ٦ المساء</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
