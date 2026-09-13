/**
 * بيانات المحل — عدّلها من هنا وتنعكس على كل الموقع
 * Business details used across the site.
 * المصدر: حساب إنستغرام @shamsflowerskw
 */
export const site = {
  nameAr: 'شمس فلاورز',
  nameEn: 'Shams Flowers',
  taglineAr: 'تنسيق استقبالات مواليد وتخرج وحفلات',
  // رقم الواتساب بصيغة دولية بدون علامة +
  whatsapp: '96566203815',
  phoneDisplay: '+965 6620 3815',
  instagram: 'shamsflowerskw',
  deliveryNoteAr: 'توصيل لجميع مناطق الكويت',
  orderNoteAr: 'الطلب والتنسيق على الواتساب',
  // أقل سعر معروض (بالدينار)
  priceFrom: 10,
};

/** رسالة الواتساب الجاهزة */
export const whatsappUrl = (message = 'السلام عليكم، أبغى أستفسر عن التنسيقات 🌸') =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

/** روابط التنقل الرئيسية */
export const navLinks = [
  { to: '/', label: 'الرئيسية' },
  { to: '/bouquets', label: 'الباقات' },
  { to: '/contact', label: 'تواصل معنا' },
];
