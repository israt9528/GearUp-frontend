import { api } from "@/lib/axios";
import { ApiResponse } from "@/types/api.types";
import { GearItem } from "@/types/gear.types";

export const gearApi = {
  getAllGear: async (): Promise<ApiResponse<GearItem[]>> => {
    const response = await api.get("/gear");
    return response.data;
  },
  getGearById: async (id: string): Promise<ApiResponse<GearItem>> => {
    const response = await api.get(`/gear/${id}`);
    return response.data;
  },
  getProviderGear: async (): Promise<ApiResponse<GearItem[]>> => {
    const response = await api.get("/gear/my-gear");
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
    const response = await api.patch(`/gear/${id}`, data);
    return response.data;
  },
  deleteGear: async (id: string): Promise<ApiResponse<GearItem>> => {
    const response = await api.delete(`/gear/${id}`);
    return response.data;
  },
};
