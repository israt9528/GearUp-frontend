import { api } from "@/lib/axios";
import { ApiResponse } from "@/types/api.types";
import { Rental } from "@/types/rental.types";

export const rentalApi = {
  createRental: async (data: {
    gearId: string;
    startDate: string;
    endDate: string;
  }): Promise<ApiResponse<{ id: string }>> => {
    const response = await api.post("/rentals", data);
    return response.data;
  },

  // Gets all rentals (we will filter this on the frontend)
  getRentals: async (): Promise<ApiResponse<Rental[]>> => {
    const response = await api.get("/rentals");
    return response.data;
  },

  // Gets a specific rental order
  getRentalById: async (id: string): Promise<ApiResponse<Rental>> => {
    const response = await api.get(`/rentals/${id}`);
    return response.data;
  },
};
