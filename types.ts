export enum ItemCategory {
  iOS = 'iOS',
  Android = 'Android',
}

export type DisplayCategory = ItemCategory | 'All';

export interface Item {
  id: string;
  name: string;
  description: string;
  priceARS: number; // Price in Argentine Pesos
  priceUSD: number; // Price in US Dollars
  stock: number;
  category: ItemCategory;
  imageUrl: string;
}

export type ToastMessage = {
  id: string;
  message: string;
  type: 'success' | 'error';
} | null;