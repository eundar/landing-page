'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useCart } from '@/src/features/cart/cart-provider';

const navItems = [
  { href: '/', label: 'Home', icon: 'home' },
  { href: '/store', label: 'Store', icon: 'store' },
  { href: '/cart', label: 'Cart', icon: 'cart' },
  { href: '/coupons', label: 'Coupons', icon: 'tag' },
  { href: '/favorites', label: 'Favorite Items', icon: 'star' },
  { href: '/settings', label: 'Settings', icon: 'gear' },
] as const;

function Icon({ type }: { type: string }) {
  const common = { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

  switch (type) {
    case 'home':
      return (
        <svg {...common}>
          <path d="M3 11.5 12 4l9 7.5" />
          <path d="M5 10.5V20h14v-9.5" />
          <path d="M10 20v-6h4v6" />
        </svg>
      );
    case 'cart':
      return (
        <svg {...common}>
          <circle cx="9" cy="18" r="1.5" />
          <circle cx="17" cy="18" r="1.5" />
          <path d="M3 4h2l2.3 9.5a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L19 7H7" />
        </svg>
      );
    case 'store':
      return (
        <svg {...common}>
          <path d="M4 8.5h16l-1 12H5l-1-12Z" />
          <path d="M8 9V6a4 4 0 0 1 8 0v3" />
        </svg>
      );
    case 'tag':
      return (
        <svg {...common}>
          <path d="M20 11 12 3H4v8l8 8 8-8Z" />
          <circle cx="8.5" cy="8.5" r="1.2" />
        </svg>
      );
    case 'star':
      return (
        <svg {...common}>
          <path d="m12 2.6 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.2l6.2-.9L12 2.6Z" />
        </svg>
      );
    case 'gear':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3.2" />
          <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V19a2 2 0 0 1-4 0v-.2a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a2 2 0 0 1-2.8-2.8l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a2 2 0 0 1 0-4h.2a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a2 2 0 0 1 2.8-2.8l.1.1a1 1 0 0 0 1.1.2 1 1 0 0 0 .6-.9V4a2 2 0 0 1 4 0v.2a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a2 2 0 0 1 2.8 2.8l-.1.1a1 1 0 0 0-.2 1.1 1 1 0 0 0 .9.6H20a2 2 0 0 1 0 4h-.2a1 1 0 0 0-.9.6Z" />
        </svg>
      );
    default:
      return null;
  }
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [profileOpen, setProfileOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar__brand">iShadeed Store</div>

        <nav className="topbar__nav" aria-label="Main navigation">
          <Link href="/" onClick={() => setProfileOpen(false)} className={pathname === '/' ? 'active' : ''}>Home</Link>
          <Link href="/about" onClick={() => setProfileOpen(false)} className={pathname === '/about' ? 'active' : ''}>About</Link>
          <Link href="/works" onClick={() => setProfileOpen(false)} className={pathname === '/works' ? 'active' : ''}>Works</Link>
        </nav>

        <div className="topbar__divider" aria-hidden="true" />

        <div className="profile-menu">
          <button
            type="button"
            className="profile-menu__trigger"
            onClick={() => setProfileOpen((current) => !current)}
            aria-expanded={profileOpen}
            aria-label="Open profile menu"
          >
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=180&q=80"
              alt="Ahmad Shadeed"
            />
            <span>Ahmad Shadeed</span>
          </button>

          {profileOpen && (
            <div className="profile-menu__dropdown" role="menu">
              <Link href="/profile" onClick={() => setProfileOpen(false)} role="menuitem">My Profile</Link>
              <Link href="/settings" onClick={() => setProfileOpen(false)} role="menuitem">Account Settings</Link>
              <button type="button" role="menuitem" onClick={() => setProfileOpen(false)}>Logout</button>
            </div>
          )}
        </div>
      </header>

      <div className="dashboard-layout">
        <aside className="sidebar-card" aria-label="Sidebar navigation">
          <nav className="sidebar-nav">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setProfileOpen(false)}
                  className={['sidebar-nav__item', active ? 'is-active' : ''].join(' ')}
                >
                  <span className="sidebar-nav__icon">
                    <Icon type={item.icon} />
                  </span>
                  <span className="sidebar-nav__label">{item.label}</span>
                  {item.href === '/cart' && itemCount > 0 && (
                    <span className="sidebar-nav__count" aria-label={`${itemCount} items in cart`}>
                      {itemCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="sidebar-footer">
            <div>iShadeed © 2019</div>
            <div>
              <Link href="/about">Privacy Policy</Link>
              <span> • </span>
              <Link href="/about">Terms and Conditions</Link>
            </div>
          </div>
        </aside>

        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}
