'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart';
import { getDict, type Lang } from '@/lib/i18n';

export default function AddToCartButton({
  productId,
  lang,
  disabled,
  className = 'btn-primary w-full',
}: {
  productId: string;
  lang: Lang;
  disabled?: boolean;
  className?: string;
}) {
  const t = getDict(lang);
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  if (disabled) {
    return (
      <button type="button" className={`${className} opacity-60`} disabled>
        {t.product.outOfStock}
      </button>
    );
  }

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        add(productId);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1600);
      }}
    >
      {added ? `✓ ${t.product.added}` : t.product.addToCart}
    </button>
  );
}
