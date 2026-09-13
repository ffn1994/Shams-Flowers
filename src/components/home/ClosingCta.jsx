import WhatsAppButton from '../WhatsAppButton';
import { site } from '../../siteConfig';

export default function ClosingCta() {
  return (
    <section className="section">
      <div className="shell">
        <div className="relative overflow-hidden rounded-bloom bg-brand-700 px-6 py-12 text-center text-white sm:px-12">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-16 -end-10 h-56 w-56 rounded-full bg-brand-500/40 blur-3xl"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -start-10 h-64 w-64 rounded-full bg-brand-600/50 blur-3xl"
          />

          <div className="relative mx-auto max-w-xl">
            <h2 className="text-2xl font-extrabold sm:text-3xl">عندك مناسبة قريبة؟</h2>
            <p className="mt-3 text-base leading-relaxed text-brand-100">
              كلمنا وخبرنا عن المناسبة والميزانية، ونرتب لك باقة أو ديكور يليق فيها.
              {' '}
              {site.deliveryNoteAr}.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <WhatsAppButton variant="light" message="السلام عليكم، عندي مناسبة وأبغى أستشيركم 🌸">
                كلمنا واتساب
              </WhatsAppButton>
              <a href={`tel:${site.phoneDisplay.replace(/\s/g, '')}`} className="btn border border-white/40 text-white hover:bg-white/10">
                <span className="ltr">{site.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
