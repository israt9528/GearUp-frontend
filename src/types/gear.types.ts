export interface Category {
  id: string;
  name: string;
  description: string | null;
}

export interface GearItem {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  category: string | Category;
  imageUrl?: string;
  providerId: string;
  isAvailable: boolean;
}
