import { useState } from 'react';
import { site } from '../../siteConfig';
import { categories, packages } from '../../data/packages';

const EMPTY = {
  name: '',
  occasion: '',
  packageId: '',
  area: '',
  date: '',
  notes: '',
};

/**
 * نموذج طلب — ما فيه سيرفر ولا قاعدة بيانات.
 * يجمّع البيانات ويحوّلها رسالة واتساب جاهزة، والزر رابط عادي عشان
 * ما يعتمد على جافاسكربت ولا يوقفه حاجب النوافذ المنبثقة.
 */
export default function OrderForm() {
  const [form, setForm] = useState(EMPTY);

  const matching = form.occasion
    ? packages.filter((item) => item.category === form.occasion)
    : packages;

  function update(key, value) {
    setForm((current) => {
      const next = { ...current, [key]: value };
      // إذا تغيّرت المناسبة، نلغي التنسيقة اللي ما تتبعها
      if (key === 'occasion') {
        const stillValid = packages.some(
          (item) => item.id === current.packageId && (!value || item.category === value),
        );
        if (!stillValid) next.packageId = '';
      }
      return next;
    });
  }

  const selected = packages.find((item) => item.id === form.packageId);
  const occasionLabel = categories.find((category) => category.id === form.occasion)?.label;
  const ready = form.name.trim() !== '' && form.area.trim() !== '';

  const message = [
    `السلام عليكم ${site.nameAr} 🌸`,
    `الاسم: ${form.name.trim()}`,
    occasionLabel && `المناسبة: ${occasionLabel}`,
    selected && `التنسيقة: ${selected.name}`,
    `المنطقة: ${form.area.trim()}`,
    form.date && `التاريخ: ${form.date}`,
    form.notes.trim() && `ملاحظات: ${form.notes.trim()}`,
  ]
    .filter(Boolean)
    .join('\n');

  const href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <form className="card space-y-5 p-6 sm:p-8" onSubmit={(event) => event.preventDefault()}>
      <div>
        <h2 className="text-xl font-extrabold text-ink">اطلب تنسيقتك</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          عبّي التفاصيل وبنحوّلها رسالة واتساب جاهزة — تراجعها وترسلها بضغطة.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="name">
            الاسم <span className="text-brand-600">*</span>
          </label>
          <input
            id="name"
            className="field"
            value={form.name}
            onChange={(event) => update('name', event.target.value)}
            placeholder="اسمك الكريم"
          />
        </div>

        <div>
          <label className="label" htmlFor="area">
            المنطقة <span className="text-brand-600">*</span>
          </label>
          <input
            id="area"
            className="field"
            value={form.area}
            onChange={(event) => update('area', event.target.value)}
            placeholder="مثال: السالمية"
          />
        </div>

        <div>
          <label className="label" htmlFor="occasion">
            المناسبة
          </label>
          <select
            id="occasion"
            className="field"
            value={form.occasion}
            onChange={(event) => update('occasion', event.target.value)}
          >
            <option value="">اختر المناسبة</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label" htmlFor="packageId">
            التنسيقة
          </label>
          <select
            id="packageId"
            className="field"
            value={form.packageId}
            onChange={(event) => update('packageId', event.target.value)}
          >
            <option value="">بدون تحديد</option>
            {matching.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label" htmlFor="date">
            تاريخ المناسبة
          </label>
          <input
            id="date"
            type="date"
            className="field"
            value={form.date}
            onChange={(event) => update('date', event.target.value)}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="label" htmlFor="notes">
            ملاحظات
          </label>
          <textarea
            id="notes"
            rows={3}
            className="field"
            maxLength={500}
            value={form.notes}
            onChange={(event) => update('notes', event.target.value)}
            placeholder="الألوان المفضلة، الحجم، كلمة الإهداء، الميزانية…"
          />
        </div>
      </div>

      {/* معاينة الرسالة قبل الإرسال */}
      <div>
        <span className="label">الرسالة اللي بتنرسل</span>
        <pre className="max-h-44 overflow-auto whitespace-pre-wrap rounded-petal bg-cream-100 px-4 py-3 font-sans text-sm leading-relaxed text-ink-muted">
          {message}
        </pre>
      </div>

      {ready ? (
        <a href={href} target="_blank" rel="noreferrer" className="btn-primary w-full">
          أرسل الطلب على الواتساب
        </a>
      ) : (
        <p className="rounded-petal bg-brand-50 px-4 py-3 text-center text-sm font-bold text-brand-800">
          عبّي الاسم والمنطقة عشان يفتح زر الإرسال
        </p>
      )}
    </form>
  );
}
