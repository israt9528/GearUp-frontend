export type Role = "CUSTOMER" | "PROVIDER" | "ADMIN";

export interface User {
  id: string;
  email: string;
  role: Role;
  name?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errorDetails?: unknown;
}
