import IconBadge from '../IconBadge';
import WhatsAppButton from '../WhatsAppButton';
import { site } from '../../siteConfig';
import { formatKwd } from '../../utils/money';

/** قسم الثقة: التوصيل + نبذة قصيرة عن المحل */
export default function TrustSection() {
  const points = [
    { icon: 'truck', label: site.deliveryNoteAr },
    { icon: 'sparkle', label: site.orderNoteAr },
    { icon: 'flower', label: `الأسعار تبدأ من ${formatKwd(site.priceFrom)}` },
  ];

  return (
    <section className="section bg-white">
      <div className="shell">
        <div className="rounded-bloom bg-petal-gradient px-6 py-10 sm:px-12 sm:py-12">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-extrabold text-brand-800 sm:text-3xl">
                {site.deliveryNoteAr}
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-muted">
                {site.nameAr} محل ورد كويتي متخصص في تنسيق استقبالات المواليد وحفلات التخرج
                والمناسبات. ننسّق الورد الطبيعي والصناعي بأحجام وألوان تختارها أنت، ونوصل
                طلبك لأي منطقة بالكويت — والطلب والتنسيق كله على الواتساب.
              </p>
              <WhatsAppButton className="mt-7" message="السلام عليكم، أبغى أستفسر عن التنسيقات 🌸" />
            </div>

            <ul className="grid gap-3">
              {points.map((point) => (
                <li
                  key={point.label}
                  className="flex items-center gap-3 rounded-petal bg-white/85 px-5 py-4 shadow-soft"
                >
                  <IconBadge name={point.icon} className="h-11 w-11 bg-brand-100 text-brand-700" />
                  <span className="text-sm font-bold text-ink">{point.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
