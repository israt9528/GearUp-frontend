import { api } from "@/lib/axios";
import { ApiResponse } from "@/types/api.types";
import { Rental } from "@/types/rental.types";
import { GearItem } from "@/types/gear.types";

// Assuming you have a User type, if not, this inline definition works
export interface AdminUserView {
  id: string;
  name: string;
  email: string;
  role: string;
  isSuspended: boolean;
  createdAt: string;
}

export const adminApi = {
  getAllUsers: async (): Promise<ApiResponse<AdminUserView[]>> => {
    const response = await api.get("/admin/users");
    return response.data;
  },

  updateUserStatus: async ({
    id,
    isSuspended,
  }: {
    id: string;
    isSuspended: boolean;
  }): Promise<ApiResponse<AdminUserView>> => {
    const response = await api.patch(`/admin/users/${id}`, { isSuspended });
    return response.data;
  },

  getAllGear: async (): Promise<ApiResponse<GearItem[]>> => {
    const response = await api.get("/admin/gear");
    return response.data;
  },

  getAllRentals: async (): Promise<ApiResponse<Rental[]>> => {
    const response = await api.get("/admin/rentals");
    return response.data;
  },
};
