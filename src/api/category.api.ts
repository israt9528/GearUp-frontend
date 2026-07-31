import { api } from "@/lib/axios";
import { ApiResponse } from "@/types/api.types";

export interface CreateCategoryDto {
  name: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export const categoryApi = {
  createCategory: async (
    data: CreateCategoryDto,
  ): Promise<ApiResponse<Category>> => {
    const response = await api.post("/categories", data);
    return response.data;
  },

  getAllCategories: async (): Promise<ApiResponse<Category[]>> => {
    const response = await api.get("/categories");
    return response.data;
  },
};
