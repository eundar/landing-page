'use client';

import { useState } from 'react';
import Link from 'next/link';
import { catalogProducts, formatCurrency } from '@/src/features/cart';
import { useCart } from '@/src/features/cart/cart-provider';
import { PageShell } from '@/src/shared/components/page-shell';

export function StorePage() {
  const { add, items } = useCart();
  const [addedProductName, setAddedProductName] = useState<string | null>(null);

  const addToCart = (product: (typeof catalogProducts)[number]) => {
    add(product);
    setAddedProductName(product.name);
  };

  return (
    <PageShell title="Store">
      <div className="store-intro">
        <p>Thoughtful picks for your home, daily routine, and everyday adventures.</p>
        <span>{catalogProducts.length} products</span>
      </div>

      {addedProductName && (
        <div className="cart-notice" role="status">
          <span>{addedProductName} added to your cart.</span>
          <Link href="/cart">View cart</Link>
          <button type="button" onClick={() => setAddedProductName(null)} aria-label="Dismiss">
            ×
          </button>
        </div>
      )}

      <div className="store-grid">
        {catalogProducts.map((product) => {
          const quantity = items.find((item) => item.id === product.id)?.quantity ?? 0;
          return (
            <article className="store-product" key={product.id}>
              <img className="store-product__image" src={product.image} alt={product.name} />
              <div className="store-product__body">
                <span className="store-product__category">{product.category}</span>
                <div className="store-product__heading">
                  <h2>{product.name}</h2>
                  <strong>{formatCurrency(product.price)}</strong>
                </div>
                <p>{product.summary}</p>
                <button
                  type="button"
                  className="primary-button"
                  onClick={() => addToCart(product)}
                >
                  {quantity > 0 ? `Add another · ${quantity} in cart` : 'Add to cart'}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </PageShell>
  );
}
