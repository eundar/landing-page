export type CartProduct = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  summary: string;
  quantity: number;
};

export const catalogProducts: Omit<CartProduct, 'quantity'>[] = [
  {
    id: 'skipper-bottle',
    name: 'Skipper Bottle',
    category: 'Accessories',
    price: 39,
    image:
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
    summary: 'Waterproof bottle with matte finish and carry loop.',
  },
  {
    id: 'atelier-lamp',
    name: 'Atelier Lamp',
    category: 'Home',
    price: 128,
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    summary: 'Warm ambient lamp for modern workspaces and living rooms.',
  },
  {
    id: 'urban-sneaker',
    name: 'Urban Sneaker',
    category: 'Footwear',
    price: 96,
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    summary: 'Lightweight everyday sneaker built for comfort and movement.',
  },
];

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

export function calculateCartTotals(items: CartProduct[]) {
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 12 : 0;
  const total = subtotal + shipping;

  return { subtotal, shipping, total };
}

export function addProductToCart(
  cart: CartProduct[],
  product: Omit<CartProduct, 'quantity'>,
): CartProduct[] {
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    return cart.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
    );
  }

  return [...cart, { ...product, quantity: 1 }];
}
