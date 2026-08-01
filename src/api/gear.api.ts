import { api } from "@/lib/axios";
import { ApiResponse } from "@/types/api.types";
import { GearFilters, GearItem } from "@/types/gear.types";

export const gearApi = {
  getAllGear: async (
    filters?: GearFilters,
  ): Promise<ApiResponse<GearItem[]>> => {
    const response = await api.get("/gear", { params: filters });
    return response.data;
  },
  getGearById: async (id: string): Promise<ApiResponse<GearItem>> => {
    const response = await api.get(`/gear/${id}`);
    return response.data;
  },

  createGear: async (
    data: Partial<GearItem>,
  ): Promise<ApiResponse<GearItem>> => {
    const response = await api.post("/gear", data);
    return response.data;
  },
  updateGear: async ({
    id,
    data,
  }: {
    id: string;
    data: Partial<GearItem>;
  }): Promise<ApiResponse<GearItem>> => {
    const response = await api.put(`/gear/${id}`, data);
    return response.data;
  },
  deleteGear: async (id: string): Promise<ApiResponse<GearItem>> => {
    const response = await api.delete(`/gear/${id}`);
    return response.data;
  },
};
