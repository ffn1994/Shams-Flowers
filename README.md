# 🌸 شمس فلاورز — Shams Flowers

واجهة موقع شمس فلاورز: ورد وباقات وتنسيقات وديكور مناسبات في الكويت.
المنجز حالياً: الهيكل العام والتنقل ونظام التصميم، والصفحة الرئيسية كاملة.
الباقي: صفحة الباقات وصفحة التواصل.

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
│   ├── logo.svg     شعار مؤقت — استبدله بشعار المحل
│   └── bouquets/    رسومات ورد مؤقتة — استبدلها بصور حقيقية
├── components/      عناصر الواجهة المشتركة
│   ├── Layout.jsx       الهيكل: هيدر + محتوى + فوتر
│   ├── Header.jsx       الهيدر مع قائمة الجوال
│   ├── Footer.jsx       الفوتر مع زر الواتساب وشريط التوصيل
│   ├── Logo.jsx         الشعار والاسم
│   ├── WhatsAppButton.jsx
│   ├── ScrollToTop.jsx
│   └── PagePlaceholder.jsx
│   ├── Icons.jsx        أيقونات مرسومة بالكود
│   ├── IconBadge.jsx    دائرة الأيقونة
│   ├── SectionHeading.jsx
│   ├── BouquetCard.jsx  بطاقة الباقة
│   └── home/            أقسام الصفحة الرئيسية
│       ├── Hero.jsx
│       ├── FeatureStrip.jsx
│       ├── Occasions.jsx
│       ├── FeaturedBouquets.jsx
│       ├── HowToOrder.jsx
│       └── ClosingCta.jsx
├── pages/
│   ├── Home.jsx         / — جاهزة
│   ├── Bouquets.jsx     /bouquets — مؤقتة
│   ├── Contact.jsx      /contact — مؤقتة
│   └── NotFound.jsx     أي مسار ثاني
├── data/home.js     محتوى الصفحة الرئيسية (مميزات، مناسبات، باقات، خطوات)
├── utils/money.js   تنسيق السعر بالدينار الكويتي بثلاث خانات
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

- `font-sans` → **IBM Plex Sans Arabic** (الخط الأساسي للعربي).
- `font-display` → **Playfair Display** (للاسم الإنجليزي واللمسات اللاتينية).
- الخط ما عنده وزن ٨٠٠، فـ `--font-weight-extrabold` مضبوط على ٧٠٠ عشان المتصفح ما يزوّر الوزن.
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

## الصفحة الرئيسية

أقسامها بالترتيب:

1. **الهيرو** — العنوان، وصف مختصر، زر تصفح الباقات وزر واتساب، وثلاث نقاط عن التوصيل.
2. **المميزات** — أربع بطاقات: التوصيل، الورد الطازج، التنسيق حسب الطلب، ديكور المناسبات.
3. **المناسبات** — مواليد، تخرج، أعياد ميلاد، استقبالات وأعراس.
4. **باقات مختارة** — استاند مواليد، استاند متر ونص، باقة تخرج، وتوزيعات — كل وحدة بسعرها وزر طلب مباشر على الواتساب.
5. **كيف تطلب** — ثلاث خطوات.
6. **دعوة أخيرة** — بانر واتساب واتصال.

كل النصوص والباقات في `src/data/home.js` — عدّل الملف وتتحدث الصفحة، ما يحتاج تلمس الكومبوننتات.

## قبل الإطلاق

1. **الشعار تقريبي** — `src/assets/logo.svg` و `public/favicon.svg` رسم قريب من شعار المحل، بدّلهم بالملف الرسمي.
2. **رسومات الورد في `src/assets/bouquets/` مؤقتة** — بدّلها بصور المنتجات الحقيقية.
3. **راجع الأسعار في `src/data/home.js`** — مأخوذة من منشورات إنستغرام (١٢ / ١٥ / ٢٠ د.ك، والتوزيعات ٧٥٠ فلس) وتحتاج تأكيد.
4. بيانات التواصل في `src/siteConfig.js` مأخوذة من الحساب: واتساب `96566203815` وإنستغرام `@shamsflowerskw`.
5. ملف `vercel.json` موجود عشان الروابط المباشرة مثل `/bouquets` تشتغل عند إعادة تحميل الصفحة.
