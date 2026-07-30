import { api } from "@/lib/axios";
import { ApiResponse } from "@/types/api.types";

export interface CreateReviewDto {
  gearId: string;
  rating: number;
  comment: string;
}

// Perfectly aligns with your Prisma backend response structure
export interface Review {
  id: string;
  customerId: string;
  gearId: string;
  rating: number;
  comment: string;
  createdAt: string;
  customer: {
    name: string;
  };
}

export const reviewApi = {
  // Uses strict <Review> type instead of <any>
  createReview: async (data: CreateReviewDto): Promise<ApiResponse<Review>> => {
    const response = await api.post("/reviews", data);
    return response.data;
  },

  getGearReviews: async (gearId: string): Promise<ApiResponse<Review[]>> => {
    const response = await api.get(`/reviews/gear/${gearId}`);
    return response.data;
  },
};
