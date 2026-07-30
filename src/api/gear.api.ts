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
};
