import { api } from "@/lib/axios";
import { ApiResponse } from "@/types/api.types";

export const paymentApi = {
  createPaymentIntent: async (data: {
    rentalOrderId: string;
  }): Promise<ApiResponse<{ clientSecret: string }>> => {
    const response = await api.post("/payments/create", data);
    return response.data;
  },
};
