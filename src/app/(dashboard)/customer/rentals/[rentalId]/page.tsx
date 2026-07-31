"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  Loader2,
  ArrowLeft,
  Calendar,
  ShieldCheck,
  DollarSign,
  CreditCard,
} from "lucide-react";
import { rentalApi } from "@/api/rental.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface RentalDetailsParams {
  rentalId: string;
}

interface GearItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  stock: number;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  providerId: string;
  categoryId: string;
}

interface PaymentRecord {
  id: string;
  transactionId: string;
  amount: number;
  method: string;
  status: string;
  paidAt: string;
  createdAt: string;
  updatedAt: string;
  rentalOrderId: string;
}

interface RentalOrderResponse {
  id: string;
  startDate: string;
  endDate: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  customerId: string;
  gearId: string;
  gear: GearItem;
  payment?: PaymentRecord;
}

export default function RentalDetailsPage({
  params,
}: {
  params: Promise<RentalDetailsParams>;
}) {
  const { rentalId } = use(params);
  const router = useRouter();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["rental-details", rentalId],
    queryFn: () => rentalApi.getRentalById(rentalId),
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-8 text-center text-red-500">
        Failed to load rental details:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

  const rawResponse = data?.data;
  const rental: RentalOrderResponse | undefined = rawResponse as unknown as
    | RentalOrderResponse
    | undefined;
  if (!rental)
    return <div className="p-8 text-center">Rental order not found</div>;
  return (
    <div className="container mx-auto max-w-3xl py-6">
      <Button
        variant="ghost"
        className="mb-6 gap-2"
        onClick={() => router.push("/customer")}
      >
        <ArrowLeft className="h-4 w-4" /> Back to My Rentals
      </Button>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
          <div>
            <CardTitle className="text-xl">Rental Order Details</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Order ID: {rental.id}
            </p>
          </div>
          <div>
            <Badge className="capitalize px-3 py-1 text-sm">
              {rental.status}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          {/* Gear Information */}
          <div className="flex flex-col sm:flex-row gap-4 items-start bg-muted/40 p-4 rounded-lg">
            <div className="flex-1 space-y-1">
              <h3 className="font-semibold text-lg">{rental.gear.name}</h3>
              <p className="text-sm text-muted-foreground">
                {rental.gear.description}
              </p>
              <div className="text-sm font-medium text-primary pt-2">
                ${rental.gear.price} / day
              </div>
            </div>
          </div>

          {/* Rental Duration & Financials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="border p-4 rounded-lg space-y-1">
              <span className="text-muted-foreground flex items-center gap-1.5">
                <Calendar className="h-4 w-4" /> Rental Period
              </span>
              <p className="font-medium">
                {new Date(rental.startDate).toLocaleDateString()} &rarr;{" "}
                {new Date(rental.endDate).toLocaleDateString()}
              </p>
            </div>

            <div className="border p-4 rounded-lg space-y-1">
              <span className="text-muted-foreground flex items-center gap-1.5">
                <DollarSign className="h-4 w-4" /> Total Amount Paid
              </span>
              <p className="font-semibold text-lg text-primary">
                ${rental.totalAmount}
              </p>
            </div>
          </div>

          {/* Payment Information */}
          {rental.payment && (
            <div className="border p-4 rounded-lg space-y-3">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-primary" /> Payment
                Information
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div>
                  <span>Method: </span>
                  <span className="font-semibold uppercase text-foreground">
                    {rental.payment.method}
                  </span>
                </div>
                <div>
                  <span>Status: </span>
                  <span className="font-semibold text-green-600">
                    {rental.payment.status}
                  </span>
                </div>
                <div className="col-span-2">
                  <span>Paid At: </span>
                  <span className="text-foreground">
                    {new Date(rental.payment.paidAt).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="border-t pt-4 text-xs text-muted-foreground flex justify-between">
            <span>
              Order Placed: {new Date(rental.createdAt).toLocaleString()}
            </span>
            <span className="flex items-center gap-1 text-green-600 font-medium">
              <ShieldCheck className="h-4 w-4" /> Verified Rental Agreement
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
