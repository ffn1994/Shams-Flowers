# 🌸 شمس فلاورز — Shams Flowers

واجهة موقع شمس فلاورز: ورد وباقات وتنسيقات وديكور مناسبات في الكويت.
هذي المرحلة الأولى — الهيكل العام، التنقل، ونظام التصميم فقط. الصفحات نفسها بتنبني بالمرحلة الجاية.

## التقنيات

| الأداة | الاستخدام |
| --- | --- |
| Vite + React (JavaScript) | أساس المشروع |
| Tailwind CSS v4 | التنسيق ونظام التصميم |
| React Router v7 | التنقل بين الصفحات |

## التشغيل

```bash
npm install
npm run dev      # بيئة التطوير
npm run build    # بناء نسخة الإنتاج
npm run preview  # معاينة نسخة الإنتاج
npm run lint     # فحص الكود
```

## هيكل المجلدات

```
src/
├── assets/          الصور والشعار
│   └── logo.svg     شعار مؤقت — استبدله بشعار المحل
├── components/      عناصر الواجهة المشتركة
│   ├── Layout.jsx       الهيكل: هيدر + محتوى + فوتر
│   ├── Header.jsx       الهيدر مع قائمة الجوال
│   ├── Footer.jsx       الفوتر مع زر الواتساب وشريط التوصيل
│   ├── Logo.jsx         الشعار والاسم
│   ├── WhatsAppButton.jsx
│   ├── ScrollToTop.jsx
│   └── PagePlaceholder.jsx
├── pages/           الصفحات (حالياً مؤقتة)
│   ├── Home.jsx         /
│   ├── Bouquets.jsx     /bouquets
│   ├── Contact.jsx      /contact
│   └── NotFound.jsx     أي مسار ثاني
├── siteConfig.js    بيانات المحل والروابط
├── index.css        نظام التصميم
├── App.jsx          المسارات
└── main.jsx         نقطة البداية
```

## نظام التصميم

كل التوكنز معرّفة في `src/index.css` داخل `@theme`، وتقدر تستخدمها مباشرة كـ Tailwind classes.

### الألوان

| المجموعة | الاستخدام | أمثلة |
| --- | --- | --- |
| `brand-50` → `brand-900` | الماجنتا/الوردي الأساسي من الشعار. الأساسي `brand-600` = `#C2185B` | `bg-brand-600` `text-brand-700` |
| `cream-50` → `cream-300` | الخلفيات الكريمية والبيضاء | `bg-cream-100` `border-cream-300` |
| `leaf-100` / `leaf-500` / `leaf-700` | لمسة خضراء للأوراق | `text-leaf-700` |
| `ink` / `ink-muted` / `ink-faint` | ألوان النصوص | `text-ink` `text-ink-muted` |

### الخطوط

- `font-sans` → **Tajawal** (الخط الأساسي للعربي).
- `font-display` → **Playfair Display** (للاسم الإنجليزي واللمسات اللاتينية).
- `text-hero` مقاس العناوين الكبيرة.

### المسافات والحواف والظلال

- `p-gutter` هامش جانبي موحّد، `py-section` ارتفاع القسم، `h-header` ارتفاع الهيدر.
- `rounded-petal` و `rounded-bloom` للحواف الناعمة.
- `shadow-soft` و `shadow-lift` للظلال الوردية الخفيفة.

### الكلاسات الجاهزة

`btn` · `btn-primary` · `btn-outline` · `btn-ghost` · `card` · `nav-link` · `nav-link-active` · `shell` · `section` · `bg-petal-gradient` · `text-brand-gradient`

مثال:

```jsx
<section className="section">
  <div className="shell">
    <button className="btn-primary">اطلب الحين</button>
  </div>
</section>
```

## قبل الإطلاق

1. استبدل `src/assets/logo.svg` و `public/favicon.svg` بشعار المحل الرسمي.
2. عدّل رقم الواتساب والهاتف وإنستغرام في `src/siteConfig.js`.
3. ملف `vercel.json` موجود عشان الروابط المباشرة مثل `/bouquets` تشتغل عند إعادة تحميل الصفحة.
