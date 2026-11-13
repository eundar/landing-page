export type SellerFilter = 'all' | 'most' | 'least' | 'recent';

export type Seller = {
  id: number;
  name: string;
  orders: number;
  active: string;
  avatar: string;
  description: string;
  totalSales: string;
  salesLabel: string;
};

export const sellerProfiles: Seller[] = [
  {
    id: 1,
    name: 'John Smith',
    orders: 154,
    active: '2h ago',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
    description: 'Premium merchandise and growth-focused campaigns.',
    totalSales: '$12.4K',
    salesLabel: 'Total sales',
  },
  {
    id: 2,
    name: 'Sarah Miles',
    orders: 142,
    active: '1h ago',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80',
    description: 'Strong omnichannel sales with data-backed product choices.',
    totalSales: '$10.7K',
    salesLabel: 'Total sales',
  },
  {
    id: 3,
    name: 'Aisha Chen',
    orders: 138,
    active: '5h ago',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=160&q=80',
    description: 'Specializes in mobile-first product launches and bundles.',
    totalSales: '$9.8K',
    salesLabel: 'Total sales',
  },
  {
    id: 4,
    name: 'David Johnson',
    orders: 129,
    active: '3h ago',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80',
    description: 'High-converting storefront optimization and repeat sales.',
    totalSales: '$8.9K',
    salesLabel: 'Total sales',
  },
  {
    id: 5,
    name: 'Mia Gomez',
    orders: 121,
    active: '6h ago',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=160&q=80',
    description: 'Best-in-class product storytelling and category growth.',
    totalSales: '$8.2K',
    salesLabel: 'Total sales',
  },
  {
    id: 6,
    name: 'Ali Hassan',
    orders: 118,
    active: '9h ago',
    avatar: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=160&q=80',
    description: 'Strong in seasonal promotions and conversion events.',
    totalSales: '$7.9K',
    salesLabel: 'Total sales',
  },
  {
    id: 7,
    name: 'Emma Stone',
    orders: 109,
    active: '1d ago',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80',
    description: 'Curates premium product bundles for higher-value customers.',
    totalSales: '$7.4K',
    salesLabel: 'Total sales',
  },
  {
    id: 8,
    name: 'Noah Lee',
    orders: 96,
    active: '2d ago',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
    description: 'Focused on retention strategies and branded merchandise.',
    totalSales: '$6.8K',
    salesLabel: 'Total sales',
  },
];

export function filterSellers(
  sellers: Seller[],
  filter: SellerFilter,
): Seller[] {
  const cloned = [...sellers];

  switch (filter) {
    case 'most':
      return cloned.sort((a, b) => b.orders - a.orders);
    case 'least':
      return cloned.sort((a, b) => a.orders - b.orders);
    case 'recent':
      return cloned.sort((a, b) => {
        const aValue = Number.parseInt(a.active, 10) || 0;
        const bValue = Number.parseInt(b.active, 10) || 0;
        return aValue - bValue;
      });
    default:
      return cloned;
  }
}
