import { GearItem } from "./gear.types";

export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";

// Your updated exact backend statuses
export type RentalStatus =
  | "PLACED"
  | "CONFIRMED"
  | "PAID"
  | "PICKED_UP"
  | "RETURNED"
  | "CANCELLED";

export interface Rental {
  id: string;
  gearId: string;
  customerId: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  paymentStatus?: PaymentStatus;
  status: RentalStatus;
  createdAt: string;
  updatedAt: string;
  gear?: GearItem;
}
