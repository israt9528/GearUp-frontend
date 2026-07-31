import { api } from "@/lib/axios";

export const paymentApi = {
  createPaymentIntent: async (data: { rentalOrderId: string }) => {
    const response = await api.post("/payments/create", data);
    return response.data;
  },
  confirmPayment: async (data: { transactionId: string }) => {
    const response = await api.post("/payments/confirm", data);
    return response.data;
  },
  getMyPayments: async () => {
    const response = await api.get("/payments");
    return response.data;
  },
  getPaymentById: async (id: string) => {
    const response = await api.get(`/payments/${id}`);
    return response.data;
  },
};
