"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  Loader2,
  ArrowLeft,
  CheckCircle2,
  Clock,
  CreditCard,
  Receipt,
  Calendar,
  Package,
  ShieldCheck,
  Hash,
  FileText,
} from "lucide-react";
import { paymentApi } from "@/api/payment.api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PaymentDetailsParams {
  paymentId: string;
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

interface RentalOrderDetails {
  id: string;
  startDate: string;
  endDate: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  customerId: string;
  gearId: string;
  gear?: GearItem;
}

interface PaymentDetailsResponse {
  id: string;
  transactionId: string;
  amount: number;
  method: string;
  status: string;
  paidAt: string;
  createdAt: string;
  updatedAt: string;
  rentalOrderId: string;
  rentalOrder?: RentalOrderDetails;
}

export default function PaymentDetailsPage({
  params,
}: {
  params: Promise<PaymentDetailsParams>;
}) {
  const { paymentId } = use(params);
  const router = useRouter();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["payment-details", paymentId],
    queryFn: () => paymentApi.getPaymentById(paymentId),
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return (
          <Badge className="bg-green-500 hover:bg-green-600 text-white gap-1.5 py-1 px-3 border-0">
            <CheckCircle2 className="h-4 w-4" /> Completed
          </Badge>
        );
      case "PENDING":
        return (
          <Badge className="bg-orange-500 hover:bg-orange-600 text-white gap-1.5 py-1 px-3 border-0">
            <Clock className="h-4 w-4" /> Pending
          </Badge>
        );
      case "FAILED":
        return (
          <Badge className="bg-red-500 hover:bg-red-600 text-white gap-1.5 py-1 px-3 border-0">
            Failed
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center text-red-500 bg-red-50 dark:bg-red-950/20 rounded-2xl border border-red-200 dark:border-red-900">
        <p className="font-semibold">Failed to load payment details</p>
        <p className="text-sm mt-1 text-muted-foreground">
          {error instanceof Error ? error.message : "Unknown error"}
        </p>
      </div>
    );
  }

  const rawResponse = data?.data;
  const payment: PaymentDetailsResponse | undefined = rawResponse as unknown as
    | PaymentDetailsResponse
    | undefined;

  if (!payment) {
    return (
      <div className="max-w-2xl mx-auto p-12 text-center space-y-4">
        <h2 className="text-xl font-semibold">Payment not found</h2>
        <Button
          onClick={() => router.push("/customer/payments")}
          variant="outline"
        >
          Back to Payment History
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Top Back Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          className="gap-2 text-muted-foreground hover:text-foreground pl-0"
          onClick={() => router.push("/customer/payments")}
        >
          <ArrowLeft className="h-4 w-4" /> Back to Payment History
        </Button>
        <div className="text-xs text-muted-foreground">
          Created: {new Date(payment.createdAt).toLocaleDateString()}
        </div>
      </div>

      <Card className="border-border shadow-sm overflow-hidden">
        {/* Receipt Header Banner */}
        <CardHeader className="bg-muted/30 border-b border-border px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-muted-foreground bg-background px-2.5 py-0.5 rounded border border-border">
                Payment ID: {payment.id}
              </span>
            </div>
            <CardTitle className="text-xl text-blue-950 font-bold flex items-center gap-2">
              <Receipt className="h-5 w-5 text-blue-950" /> Transaction Receipt
            </CardTitle>
            <CardDescription>
              Comprehensive breakdown of financial processing and gear
              allocation
            </CardDescription>
          </div>
          <div>{getStatusBadge(payment.status)}</div>
        </CardHeader>

        <CardContent className="p-6 md:p-8 space-y-8">
          {/* Main Transaction Key-Value Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-border bg-background p-5 rounded-2xl space-y-1 shadow-xs">
              <span className="text-xs text-muted-foreground flex items-center gap-1.5 font-semibold uppercase tracking-wider">
                <CreditCard className="h-4 w-4 text-indigo-600" /> Payment
                Method
              </span>
              <p className="font-bold text-lg text-indigo-600 dark:text-indigo-400 uppercase pt-1">
                {payment.method}
              </p>
            </div>

            <div className="border border-border bg-background p-5 rounded-2xl space-y-1 shadow-xs">
              <span className="text-xs text-muted-foreground flex items-center gap-1.5 font-semibold uppercase tracking-wider">
                <FileText className="h-4 w-4 text-blue-600" /> Total Paid Amount
              </span>
              <p className="font-bold text-2xl text-blue-600 dark:text-blue-400 pt-1">
                ${payment.amount}
              </p>
            </div>

            <div className="border border-border bg-background p-5 rounded-2xl space-y-1 shadow-xs sm:col-span-2">
              <span className="text-xs text-muted-foreground flex items-center gap-1.5 font-semibold uppercase tracking-wider">
                <Hash className="h-4 w-4 text-purple-600" /> Stripe / Gateway
                Transaction ID
              </span>
              <p className="font-mono text-xs text-foreground bg-muted/40 p-2.5 rounded-lg border border-border/60 break-all mt-1">
                {payment.transactionId || "N/A"}
              </p>
            </div>

            <div className="border border-border bg-background p-5 rounded-2xl space-y-1 shadow-xs">
              <span className="text-xs text-muted-foreground flex items-center gap-1.5 font-semibold uppercase tracking-wider">
                <Clock className="h-4 w-4 text-emerald-600" /> Paid Timestamp
              </span>
              <p className="font-semibold text-sm text-foreground pt-1">
                {payment.paidAt
                  ? new Date(payment.paidAt).toLocaleString()
                  : "Pending"}
              </p>
            </div>

            <div className="border border-border bg-background p-5 rounded-2xl space-y-1 shadow-xs">
              <span className="text-xs text-muted-foreground flex items-center gap-1.5 font-semibold uppercase tracking-wider">
                <Clock className="h-4 w-4 text-slate-600" /> Last System Update
              </span>
              <p className="font-semibold text-sm text-foreground pt-1">
                {new Date(payment.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Associated Rental Order Section */}
          {payment.rentalOrder && (
            <div className="border border-border bg-muted/10 p-6 rounded-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <h3 className="font-semibold text-base flex items-center gap-2 text-foreground">
                  <Package className="h-5 w-5 text-primary" /> Associated Rental
                  Order
                </h3>
                <Badge
                  variant="outline"
                  className="font-mono text-xs bg-background"
                >
                  Order ID: {payment.rentalOrderId.slice(0, 8)}...
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-3">
                  <div>
                    <span className="text-xs text-muted-foreground block">
                      Gear Equipment Name
                    </span>
                    <span className="font-semibold text-base text-blue-600 dark:text-blue-400">
                      {payment.rentalOrder.gear?.name || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">
                      Gear Description
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {payment.rentalOrder.gear?.description ||
                        "No description provided."}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 bg-background p-4 rounded-xl border border-border">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-primary" /> Start
                      Date
                    </span>
                    <span className="font-semibold text-foreground">
                      {new Date(
                        payment.rentalOrder.startDate,
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-primary" /> End Date
                    </span>
                    <span className="font-semibold text-foreground">
                      {new Date(
                        payment.rentalOrder.endDate,
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs pt-2 border-t border-border">
                    <span className="text-muted-foreground">Order Status</span>
                    <Badge
                      variant="secondary"
                      className="capitalize font-semibold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50"
                    >
                      {payment.rentalOrder.status.toLowerCase()}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer Security Badge */}
          <div className="border-t border-border pt-6 flex justify-end">
            <span className="flex items-center gap-1.5 text-xs text-green-600 font-medium bg-green-500/10 px-3 py-1.5 rounded-full">
              <ShieldCheck className="h-4 w-4" /> Fully Verified Payment Receipt
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
