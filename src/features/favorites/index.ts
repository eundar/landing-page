export type FavoriteType = 'article' | 'product';

export type FavoriteItem = {
  id: string;
  type: FavoriteType;
  name: string;
  description?: string;
};

export const FAVORITES_STORAGE_KEY = 'ishadeed-favorites';
