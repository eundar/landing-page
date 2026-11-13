export type Coupon = {
  id: string;
  code: string;
  description: string;
  discount: string;
  expiresAt: string;
};

export const couponList: Coupon[] = [
  {
    id: 'SPRING10',
    code: 'SPRING10',
    description: '10% off selected seasonal products.',
    discount: '10%',
    expiresAt: '2025-12-31',
  },
  {
    id: 'BUNDLE15',
    code: 'BUNDLE15',
    description: '15% off bundle orders over $150.',
    discount: '15%',
    expiresAt: '2025-11-30',
  },
  {
    id: 'FREESHIP',
    code: 'FREESHIP',
    description: 'Free delivery on orders above $75.',
    discount: 'Free Shipping',
    expiresAt: '2025-10-25',
  },
];
