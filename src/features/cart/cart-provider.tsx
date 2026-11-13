'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { addProductToCart, type CartProduct } from '@/src/features/cart';

const CART_STORAGE_KEY = 'ishadeed-cart';
const EMPTY_CART: CartProduct[] = [];

let cartSnapshot = EMPTY_CART;
let hasLoadedCart = false;
const listeners = new Set<() => void>();

function getSnapshot() {
  if (typeof window === 'undefined' || hasLoadedCart) return cartSnapshot;
  hasLoadedCart = true;

  try {
    const savedCart = window.localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      const parsedCart: unknown = JSON.parse(savedCart);
      if (Array.isArray(parsedCart)) {
        cartSnapshot = parsedCart as CartProduct[];
      }
    }
  } catch (error) {
    console.error('Unable to load the saved cart.', error);
  }

  return cartSnapshot;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function publishCart(nextCart: CartProduct[]) {
  cartSnapshot = nextCart;
  hasLoadedCart = true;

  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(nextCart));
  } catch (error) {
    console.error('Unable to save the cart.', error);
  }

  listeners.forEach((listener) => listener());
}

function add(product: Omit<CartProduct, 'quantity'>) {
  publishCart(addProductToCart(getSnapshot(), product));
}

function remove(id: string) {
  publishCart(getSnapshot().filter((item) => item.id !== id));
}

function setQuantity(id: string, quantity: number) {
  publishCart(
    getSnapshot().map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item,
    ),
  );
}

type CartActions = {
  add: typeof add;
  remove: typeof remove;
  setQuantity: typeof setQuantity;
};

const CartActionsContext = createContext<CartActions>({ add, remove, setQuantity });

export function CartProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const syncCart = (event: StorageEvent) => {
      if (event.key !== CART_STORAGE_KEY) return;

      try {
        const nextCart: unknown = event.newValue ? JSON.parse(event.newValue) : [];
        if (Array.isArray(nextCart)) {
          cartSnapshot = nextCart as CartProduct[];
          hasLoadedCart = true;
          listeners.forEach((listener) => listener());
        }
      } catch (error) {
        console.error('Unable to sync the saved cart.', error);
      }
    };

    window.addEventListener('storage', syncCart);
    return () => window.removeEventListener('storage', syncCart);
  }, []);

  return (
    <CartActionsContext.Provider value={{ add, remove, setQuantity }}>
      {children}
    </CartActionsContext.Provider>
  );
}

export function useCart() {
  const actions = useContext(CartActionsContext);
  const items = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY_CART);

  return useMemo(
    () => ({
      ...actions,
      items,
      itemCount: items.reduce((total, item) => total + item.quantity, 0),
    }),
    [actions, items],
  );
}
