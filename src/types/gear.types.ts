export interface Category {
  id: string;
  name: string;
}

export interface GearItem {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string | Category;
  imageUrl?: string;
  providerId: string;
  isAvailable: boolean;
}
