"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  Calendar,
  ShieldCheck,
  DollarSign,
  CreditCard,
  Package,
} from "lucide-react";
import { rentalApi } from "@/api/rental.api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RentalDetailsSkeleton } from "@/components/skeletons/rentalDetailsSkeleton";

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PLACED":
        return (
          <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-0">
            Placed
          </Badge>
        );
      case "CONFIRMED":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600 text-white border-0">
            Confirmed
          </Badge>
        );
      case "PAID":
        return (
          <Badge className="bg-purple-500 hover:bg-purple-600 text-white border-0">
            Paid
          </Badge>
        );
      case "PICKED_UP":
        return (
          <Badge className="bg-green-500 hover:bg-green-600 text-white border-0">
            Picked Up
          </Badge>
        );
      case "RETURNED":
        return (
          <Badge className="bg-slate-500 hover:bg-slate-600 text-white border-0">
            Returned
          </Badge>
        );
      case "CANCELLED":
        return (
          <Badge className="bg-red-500 hover:bg-red-600 text-white border-0">
            Cancelled
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (isPending) {
    return <RentalDetailsSkeleton />;
  }

  if (isError) {
    return (
      <div className="container mx-auto max-w-3xl p-8 text-center text-red-500 bg-red-50 dark:bg-red-950/20 rounded-2xl border border-red-200 dark:border-red-900">
        <p className="font-semibold">Failed to load rental details</p>
        <p className="text-sm mt-1 text-muted-foreground">
          {error instanceof Error ? error.message : "Unknown error"}
        </p>
      </div>
    );
  }

  const rawResponse = data?.data;
  const rental: RentalOrderResponse | undefined = rawResponse as unknown as
    | RentalOrderResponse
    | undefined;

  if (!rental) {
    return (
      <div className="container mx-auto max-w-3xl p-12 text-center space-y-4">
        <h2 className="text-xl font-semibold">Rental order not found</h2>
        <Button
          onClick={() => router.push("/customer/rentals")}
          variant="outline"
        >
          Back to My Rentals
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Action Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          className="gap-2 text-muted-foreground hover:text-foreground pl-0"
          onClick={() => router.push("/customer")}
        >
          <ArrowLeft className="h-4 w-4" /> Back to My Rentals
        </Button>
        <div className="text-xs text-muted-foreground">
          Created: {new Date(rental.createdAt).toLocaleDateString()}
        </div>
      </div>

      <Card className="border-border shadow-sm overflow-hidden">
        {/* Header Banner Section */}
        <CardHeader className="bg-muted/30 border-b border-border px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-muted-foreground bg-background px-2 py-0.5 rounded border border-border">
                ID: {rental.id}
              </span>
            </div>
            <CardTitle className="text-xl font-bold text-blue-950">
              Rental Order Receipt
            </CardTitle>
            <CardDescription>
              Complete invoice and schedule overview for your booked gear
            </CardDescription>
          </div>
          <div>{getStatusBadge(rental.status)}</div>
        </CardHeader>

        <CardContent className="p-6 md:p-8 space-y-8">
          {/* Gear Information Showcase */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-indigo-100/50 border border-border p-5 rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-1">
                <Package className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-lg text-foreground">
                  {rental.gear.name}
                </h3>
                <p className="text-sm text-muted-foreground max-w-xl">
                  {rental.gear.description}
                </p>
              </div>
            </div>
            <div className="text-right bg-background px-4 py-3 rounded-xl border border-border shrink-0 self-stretch md:self-auto flex flex-col justify-center">
              <span className="text-xs text-muted-foreground">Daily Rate</span>
              <span className="font-bold text-primary text-base">
                ${rental.gear.price}{" "}
                <span className="text-xs text-muted-foreground font-normal">
                  / day
                </span>
              </span>
            </div>
          </div>

          {/* Rental Duration & Financial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-border bg-blue-100/50 p-5 rounded-2xl space-y-2 shadow-xs">
              <span className="text-muted-foreground flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
                <Calendar className="h-4 w-4 text-primary" /> Rental Schedule
              </span>
              <div className="pt-1 flex justify-between items-center text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Start Date</p>
                  <p className="font-semibold text-foreground mt-0.5">
                    {new Date(rental.startDate).toLocaleDateString()}
                  </p>
                </div>
                <span className="text-muted-foreground">&rarr;</span>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">End Date</p>
                  <p className="font-semibold text-foreground mt-0.5">
                    {new Date(rental.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-border bg-blue-100/50 p-5 rounded-2xl space-y-2 shadow-xs">
              <span className="text-muted-foreground flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
                <DollarSign className="h-4 w-4 text-primary" /> Total Financial
                Breakdown
              </span>
              <div className="pt-1 flex justify-between items-center">
                <p className="text-sm text-muted-foreground">Grand Total</p>
                <p className="font-bold text-xl text-primary">
                  ${rental.totalAmount}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Information Card */}
          {rental.payment && (
            <div className="border border-border bg-muted/10 p-6 rounded-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-primary" /> Transaction
                  Details
                </h4>
                <Badge
                  variant="outline"
                  className="text-xs font-mono uppercase bg-background"
                >
                  {rental.payment.method}
                </Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-muted-foreground block">
                    Transaction Status
                  </span>
                  <span className="font-semibold text-green-600 text-sm mt-0.5 inline-block">
                    {rental.payment.status}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block">
                    Payment Timestamp
                  </span>
                  <span className="font-medium text-foreground text-sm mt-0.5 inline-block">
                    {new Date(rental.payment.paidAt).toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block">
                    Reference ID
                  </span>
                  <span className="font-mono text-muted-foreground truncate block mt-0.5">
                    {rental.payment.transactionId}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Footer Security Note */}
          <div className="border-t border-border pt-6 text-xs text-muted-foreground flex flex-col sm:flex-row justify-between items-center gap-2">
            <span>
              Last Updated: {new Date(rental.updatedAt).toLocaleString()}
            </span>
            <span className="flex items-center gap-1.5 text-green-600 font-medium bg-green-500/10 px-3 py-1 rounded-full">
              <ShieldCheck className="h-4 w-4" /> Verified Secure Agreement
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
