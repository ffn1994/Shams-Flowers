/** Storefront settings. Override with environment variables in .env.local */
export const shopConfig = {
  phone: process.env.NEXT_PUBLIC_SHOP_PHONE ?? '+96566000000',
  whatsapp: process.env.NEXT_PUBLIC_SHOP_WHATSAPP ?? '96566000000',
  instagram: process.env.NEXT_PUBLIC_SHOP_INSTAGRAM ?? 'shamsflowers',
  address: {
    ar: 'السالمية - شارع سالم المبارك',
    en: 'Salmiya - Salem Al Mubarak St.',
  },
  /** Delivery fee in fils. */
  deliveryFee: Number(process.env.NEXT_PUBLIC_DELIVERY_FEE ?? 1500),
  /** Orders at or above this subtotal (fils) ship free. */
  freeDeliveryThreshold: Number(process.env.NEXT_PUBLIC_FREE_DELIVERY_THRESHOLD ?? 25000),
};

export const KUWAIT_AREAS = [
  { ar: 'السالمية', en: 'Salmiya' },
  { ar: 'حولي', en: 'Hawally' },
  { ar: 'الجابرية', en: 'Jabriya' },
  { ar: 'مدينة الكويت', en: 'Kuwait City' },
  { ar: 'الشويخ', en: 'Shuwaikh' },
  { ar: 'الفروانية', en: 'Farwaniya' },
  { ar: 'الجهراء', en: 'Jahra' },
  { ar: 'الأحمدي', en: 'Ahmadi' },
  { ar: 'الفنطاس', en: 'Fintas' },
  { ar: 'المنقف', en: 'Mangaf' },
  { ar: 'صباح السالم', en: 'Sabah Al Salem' },
  { ar: 'مشرف', en: 'Mishref' },
  { ar: 'بيان', en: 'Bayan' },
  { ar: 'السرة', en: 'Surra' },
  { ar: 'الرميثية', en: 'Rumaithiya' },
];
