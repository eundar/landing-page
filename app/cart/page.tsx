'use client';

import Link from 'next/link';
import { PageShell } from '@/src/shared/components/page-shell';
import { calculateCartTotals, catalogProducts, formatCurrency } from '@/src/features/cart';
import { useCart } from '@/src/features/cart/cart-provider';

export default function CartPage() {
  const { items: cart, itemCount, remove, setQuantity, add } = useCart();

  const updateQuantity = (id: string, delta: number) => {
    const item = cart.find((entry) => entry.id === id);
    if (item) setQuantity(id, item.quantity + delta);
  };

  const totals = calculateCartTotals(cart);
  const recommendedProducts = catalogProducts.filter(
    (product) => !cart.some((item) => item.id === product.id),
  );

  return (
    <PageShell title="Cart">
      {cart.length === 0 ? (
        <div className="empty-state empty-state--center">
          <p>Your cart is empty.</p>
          <Link href="/store">Explore the store</Link>
        </div>
      ) : (
        <>
          <div className="cart-heading">
            <p>{itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart</p>
            <Link href="/store">Continue shopping</Link>
          </div>
          <div className="cart-layout">
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item__details">
                    <div>
                      <h3>{item.name}</h3>
                      <p>{item.category}</p>
                    </div>
                    <div className="cart-item__meta">
                      <span>{formatCurrency(item.price)}</span>
                      <div className="quantity-controls" aria-label={`Quantity controls for ${item.name}`}>
                        <button type="button" onClick={() => updateQuantity(item.id, -1)} aria-label={`Decrease quantity of ${item.name}`}>
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button type="button" onClick={() => updateQuantity(item.id, 1)} aria-label={`Increase quantity of ${item.name}`}>
                          +
                        </button>
                      </div>
                      <button type="button" className="text-button" onClick={() => remove(item.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="cart-item__subtotal">{formatCurrency(item.price * item.quantity)}</div>
                </div>
              ))}
            </div>

            <aside className="summary-card">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <strong>{formatCurrency(totals.subtotal)}</strong>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <strong>{formatCurrency(totals.shipping)}</strong>
              </div>
              <div className="summary-row summary-row--total">
                <span>Total</span>
                <strong>{formatCurrency(totals.total)}</strong>
              </div>
              <button type="button" className="primary-button">Checkout</button>
            </aside>
          </div>
          {recommendedProducts.length > 0 && (
            <section className="cart-recommendations">
              <h2>Explore more products</h2>
              <div className="cart-recommendation-list">
                {recommendedProducts.map((product) => (
                  <div className="cart-recommendation" key={product.id}>
                    <img src={product.image} alt="" />
                    <div>
                      <strong>{product.name}</strong>
                      <span>{formatCurrency(product.price)}</span>
                    </div>
                    <button type="button" onClick={() => add(product)}>Add</button>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </PageShell>
  );
}
