import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { CartProvider } from '@/src/features/cart/cart-provider';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'iShadeed Store',
  description: 'Modern dashboard for articles, sellers, and commerce.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
