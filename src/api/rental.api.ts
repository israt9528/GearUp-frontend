import { api } from "@/lib/axios";
import { ApiResponse } from "@/types/api.types";

export const rentalApi = {
  createRental: async (data: {
    gearId: string;
    startDate: string;
    endDate: string;
  }): Promise<ApiResponse<{ id: string }>> => {
    const response = await api.post("/rentals", data);
    return response.data;
  },
};
