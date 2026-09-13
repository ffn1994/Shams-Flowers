import SectionHeading from '../SectionHeading';
import WhatsAppButton from '../WhatsAppButton';
import { steps } from '../../data/home';

export default function HowToOrder() {
  return (
    <section className="section bg-white">
      <div className="shell">
        <SectionHeading
          eyebrow="بثلاث خطوات"
          title="كيف تطلب من شمس فلاورز"
          body="ما يحتاج حساب ولا تسجيل — كلمنا وخلّنا نرتب لك الباقي."
        />

        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((step) => (
            <li key={step.id} className="card relative p-6 pt-8">
              <span className="absolute -top-5 start-6 grid h-11 w-11 place-items-center rounded-full bg-brand-600 text-lg font-extrabold text-white shadow-soft">
                {step.id}
              </span>
              <h3 className="font-extrabold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 text-center">
          <WhatsAppButton message="السلام عليكم، أبغى أطلب باقة 🌸" />
        </div>
      </div>
    </section>
  );
}
