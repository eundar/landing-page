'use client';

import { useState } from 'react';
import { couponList } from '@/src/features/coupons';
import { PageShell } from '@/src/shared/components/page-shell';

export default function CouponsPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyCoupon = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(code);
      window.setTimeout(() => setCopied(null), 1200);
    } catch {
      setCopied(null);
    }
  };

  return (
    <PageShell title="Coupons">
      <div className="coupon-list">
        {couponList.map((coupon) => (
          <div key={coupon.id} className="coupon-card">
            <div>
              <div className="coupon-card__code">{coupon.code}</div>
              <p>{coupon.description}</p>
            </div>
            <div className="coupon-card__meta">
              <span>{coupon.discount}</span>
              <small>Expires {coupon.expiresAt}</small>
            </div>
            <button type="button" onClick={() => copyCoupon(coupon.code)}>
              {copied === coupon.code ? 'Copied' : 'Copy'}
            </button>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
