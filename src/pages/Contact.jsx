import ContactChannels from '../components/contact/ContactChannels';
import OrderForm from '../components/contact/OrderForm';
import IconBadge from '../components/IconBadge';
import SectionHeading from '../components/SectionHeading';
import { site } from '../siteConfig';
import { formatKwd } from '../utils/money';

export default function Contact() {
  const facts = [
    { icon: 'truck', label: site.deliveryNoteAr },
    { icon: 'sparkle', label: site.orderNoteAr },
    { icon: 'flower', label: `الأسعار تبدأ من ${formatKwd(site.priceFrom)}` },
  ];

  return (
    <>
      <section className="bg-petal-gradient">
        <div className="shell py-12 text-center md:py-16">
          <SectionHeading
            eyebrow={site.deliveryNoteAr}
            title="تواصل معنا"
            body="حياكم الله — كلمنا على الواتساب أو عبّي النموذج وبنرد عليك بأسرع وقت."
          />
        </div>
      </section>

      <section className="section">
        <div className="shell space-y-10">
          <ContactChannels />

          <ul className="grid gap-3 sm:grid-cols-3">
            {facts.map((fact) => (
              <li
                key={fact.label}
                className="flex items-center gap-3 rounded-petal border border-cream-300/70 bg-white px-5 py-4"
              >
                <IconBadge name={fact.icon} className="h-11 w-11 bg-brand-100 text-brand-700" />
                <span className="text-sm font-bold text-ink">{fact.label}</span>
              </li>
            ))}
          </ul>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-start">
            <OrderForm />

            <aside className="card space-y-5 p-6 sm:p-8">
              <div>
                <h2 className="text-lg font-extrabold text-ink">قبل ما تطلب</h2>
                <ul className="mt-3 space-y-3 text-sm leading-relaxed text-ink-muted">
                  <li>
                    <span className="font-bold text-ink">المناسبة والألوان:</span> خبرنا عن
                    المناسبة والألوان اللي تفضلها ونرشح لك المناسب.
                  </li>
                  <li>
                    <span className="font-bold text-ink">الحجم والميزانية:</span> عندنا تنسيقات
                    من {formatKwd(site.priceFrom)} لين التنسيقات الكبيرة حسب الطلب.
                  </li>
                  <li>
                    <span className="font-bold text-ink">وقت التوصيل:</span> حدد لنا اليوم
                    والمنطقة ونرتب التوصيل.
                  </li>
                  <li>
                    <span className="font-bold text-ink">كلمة الإهداء:</span> نكتبها لك على كرت
                    مع التنسيقة.
                  </li>
                </ul>
              </div>

              <div className="rounded-petal bg-cream-100 p-4 text-sm leading-relaxed text-ink-muted">
                للاستفسار عن أوقات الدوام أو موقع المحل، كلمنا على الواتساب وبنرد عليك.
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
