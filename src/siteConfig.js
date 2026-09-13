/**
 * بيانات المحل — عدّلها من هنا وتنعكس على كل الموقع
 * Business details used across the shell.
 */
export const site = {
  nameAr: 'شمس فلاورز',
  nameEn: 'Shams Flowers',
  taglineAr: 'ورد وهدايا وديكور مناسبات',
  // رقم الواتساب بصيغة دولية بدون علامة +
  whatsapp: '96566000000',
  phoneDisplay: '+965 6600 0000',
  instagram: 'shamsflowers',
  deliveryNoteAr: 'توصيل لجميع مناطق الكويت',
  hoursAr: 'يومياً ٩ صباحاً – ١٠ مساءً',
};

/** رسالة الواتساب الجاهزة */
export const whatsappUrl = (message = 'السلام عليكم، أبغى أستفسر عن الباقات 🌸') =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

/** روابط التنقل الرئيسية */
export const navLinks = [
  { to: '/', label: 'الرئيسية' },
  { to: '/bouquets', label: 'الباقات' },
  { to: '/contact', label: 'تواصل معنا' },
];
