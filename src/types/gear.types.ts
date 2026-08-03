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
  category: Category | string;
  imageUrl?: string;
  providerId: string;
  isAvailable: boolean;
}

export interface GearFilters {
  searchTerm?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export interface CategoryDetail {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProviderDetail {
  id: string;
  name: string;
  email: string;
}

export interface GearDetail {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  stock: number;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  providerId: string;
  categoryId: string;
  category: CategoryDetail;
  provider: ProviderDetail;
}
