import { api } from "@/lib/axios";
import { ApiResponse, User } from "@/types/api.types";

export interface AuthResponse {
  user: User;
  token: string;
}

export const authApi = {
  login: async (data: unknown): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post("/auth/login", data);
    return response.data;
  },
  register: async (data: unknown): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post("/auth/register", data);
    return response.data;
  },
};
