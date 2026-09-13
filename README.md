# 🌸 Shams Flowers — شمس فلاورز

متجر ورد إلكتروني ثنائي اللغة (عربي RTL / إنجليزي LTR) مبني على Next.js، مع سلة شراء، صفحة طلب وتوصيل داخل الكويت، ولوحة تحكم للمنتجات والطلبات.

---

## بالعربي

### المميزات

- **واجهة ثنائية اللغة**: مسارات `/ar` و `/en` مع تبديل فوري، والاتجاه يتغير تلقائياً بين RTL و LTR.
- **كتالوج الباقات**: بحث، فلترة حسب المناسبة، وترتيب حسب السعر أو الأحدث.
- **صفحة منتج كاملة**: الوصف، المحتويات، الحجم، ومنتجات مقترحة من نفس المناسبة.
- **سلة شراء**: محفوظة في المتصفح وتبقى بعد إغلاق الصفحة، ومتزامنة بين التبويبات.
- **إتمام الطلب**: بيانات المستلم، المنطقة (قائمة مناطق الكويت)، القطعة والشارع، تاريخ ووقت التوصيل، كلمة إهداء، والدفع عند الاستلام أو كي نت.
- **رسوم توصيل ذكية**: توصيل مجاني فوق حد معيّن يُضبط من متغيرات البيئة.
- **صفحة تأكيد الطلب**: رقم طلب مختصر وزر يرسل تفاصيل الطلب على الواتساب.
- **لوحة تحكم** على `/ar/admin`: إضافة وتعديل وحذف المنتجات، ومتابعة الطلبات وتغيير حالتها.
- **الأسعار بالدينار الكويتي** بثلاث خانات عشرية دائماً (مثال: `32.500 د.ك`)، ومخزّنة داخلياً بالفلس كأرقام صحيحة حتى لا يحصل خطأ تقريب.

### التشغيل محلياً

```bash
npm install
cp .env.example .env.local   # وغيّر كلمة مرور لوحة التحكم
npm run dev
```

ثم افتح `http://localhost:3000` — سيتم تحويلك تلقائياً إلى `/ar`.

لوحة التحكم على `http://localhost:3000/ar/admin`، وكلمة المرور الافتراضية `shams2026` (غيّرها من `.env.local`).

### الأوامر

| الأمر | الوظيفة |
| --- | --- |
| `npm run dev` | تشغيل بيئة التطوير |
| `npm run build` | بناء نسخة الإنتاج |
| `npm start` | تشغيل نسخة الإنتاج |
| `npm run lint` | فحص الكود |
| `npm run typecheck` | فحص الأنواع |

### أين تعدّل المحتوى

- **بيانات المحل** (الهاتف، الواتساب، إنستغرام، رسوم التوصيل): `src/lib/config.ts` أو متغيرات البيئة.
- **نصوص الواجهة** بالعربي والإنجليزي: `src/lib/i18n.ts`.
- **المنتجات**: من لوحة التحكم، أو مباشرة في `data/products.json`.
- **المناسبات**: `src/lib/types.ts`.
- **الألوان والخطوط**: `tailwind.config.ts`.

### ملاحظة مهمة عن التخزين

المنتجات والطلبات مخزّنة حالياً في ملفات JSON داخل مجلد `data/`. هذا يشتغل ممتاز على سيرفر عادي أو VPS، لكن على منصات serverless مثل Vercel نظام الملفات مؤقت — أي طلب جديد أو تعديل من لوحة التحكم ممكن يضيع عند إعادة التشغيل.

قبل النشر على Vercel، بدّل الدوال الموجودة في `src/lib/store.ts` إلى قاعدة بيانات (Supabase مثلاً). كل التعامل مع البيانات يمر عبر هذا الملف فقط، فالتبديل يتم من مكان واحد دون تغيير باقي التطبيق.

---

## In English

A bilingual (Arabic RTL / English LTR) flower shop built with Next.js 16, React 19, TypeScript and Tailwind CSS.

### Features

- Locale-routed storefront (`/ar`, `/en`) with automatic direction switching.
- Catalog with search, occasion filter and price sorting.
- Product pages with related items.
- Persistent cart backed by `localStorage`, synced across tabs via `useSyncExternalStore`.
- Checkout with Kuwait areas, block/street address, delivery date and slot, gift message, COD or KNET.
- Automatic free delivery above a configurable threshold.
- Order confirmation page with a prefilled WhatsApp message.
- Password-protected admin dashboard for product CRUD and order status.
- KWD amounts always rendered with three decimals; stored internally as integer fils.

### Getting started

```bash
npm install
cp .env.example .env.local   # set your own ADMIN_PASSWORD
npm run dev
```

### Project layout

```
src/app/[lang]/        storefront pages (home, shop, product, cart, checkout, order, admin)
src/app/api/           REST routes for products, orders and admin auth
src/components/        UI components (header, cards, cart, checkout form, dashboard)
src/lib/               i18n dictionary, money helpers, data store, validation, cart store
data/                  JSON seed data (products.json, orders.json)
public/products/       placeholder bouquet artwork (SVG)
middleware.ts          redirects `/` to the visitor's preferred locale
```

### Swapping the data layer

Every read and write goes through `src/lib/store.ts`. Replace the functions there with Supabase (or any database) calls to make the app serverless-ready — nothing else in the app touches storage directly.
