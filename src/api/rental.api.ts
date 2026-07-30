import { api } from "@/lib/axios";
import { ApiResponse } from "@/types/api.types";
import { Rental, RentalStatus } from "@/types/rental.types";

export interface CreateRentalDto {
  gearId: string;
  startDate: string;
  endDate: string;
}

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
  getMyRentals: async (): Promise<ApiResponse<Rental[]>> => {
    const response = await api.get("/rentals");
    return response.data;
  },

  // Gets a specific rental order
  getRentalById: async (id: string): Promise<ApiResponse<Rental>> => {
    const response = await api.get(`/rentals/${id}`);
    return response.data;
  },
  getProviderRentals: async (): Promise<ApiResponse<Rental[]>> => {
    const response = await api.get("/provider/orders");
    return response.data;
  },

  updateRentalStatus: async ({
    id,
    status,
  }: {
    id: string;
    status: RentalStatus;
  }): Promise<ApiResponse<Rental>> => {
    const response = await api.patch(`/provider/orders/${id}`, { status });
    return response.data;
  },
};
