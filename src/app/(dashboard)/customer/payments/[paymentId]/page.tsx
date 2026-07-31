"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Loader2, ArrowLeft, CheckCircle2, Clock } from "lucide-react";
import { paymentApi } from "@/api/payment.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PaymentDetailsParams {
  paymentId: string;
}

interface PaymentDetailsResponse {
  id: string;
  amount: number;
  method: string;
  status: string;
  transactionId?: string;
  paidAt?: string;
  rentalOrder?: {
    startDate: string;
    endDate: string;
    status: string;
    gear?: {
      name: string;
    };
  };
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
        Failed to load payment details:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

  const payment: PaymentDetailsResponse | undefined = data?.data;
  if (!payment) return <div className="p-8 text-center">Payment not found</div>;

  return (
    <div className="container mx-auto max-w-2xl">
      <Button
        variant="ghost"
        className="mb-6 gap-2"
        onClick={() => router.push("/customer/payments")}
      >
        <ArrowLeft className="h-4 w-4" /> Back to Payment History
      </Button>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
          <div>
            <CardTitle className="text-xl">Payment Receipt</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              ID: {payment.id}
            </p>
          </div>
          <div>
            {payment.status === "COMPLETED" ? (
              <Badge className="bg-green-500 text-white gap-1 py-1 px-3">
                <CheckCircle2 className="h-3.5 w-3.5" /> Paid
              </Badge>
            ) : (
              <Badge className="bg-orange-500 text-white gap-1 py-1 px-3">
                <Clock className="h-3.5 w-3.5" /> {payment.status}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground block">
                Transaction Method
              </span>
              <span className="font-semibold uppercase">{payment.method}</span>
            </div>
            <div>
              <span className="text-muted-foreground block">Paid Amount</span>
              <span className="font-semibold text-lg text-primary">
                ${payment.amount}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground block">
                Transaction ID
              </span>
              <span className="font-mono text-xs">
                {payment.transactionId || "N/A"}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground block">
                Date Processed
              </span>
              <span>
                {payment.paidAt
                  ? new Date(payment.paidAt).toLocaleString()
                  : "Pending"}
              </span>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Associated Rental Order</h3>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Gear Item:</span>
                <span className="font-medium">
                  {payment.rentalOrder?.gear?.name || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rental Duration:</span>
                <span>
                  {payment.rentalOrder?.startDate
                    ? new Date(
                        payment.rentalOrder.startDate,
                      ).toLocaleDateString()
                    : ""}
                  {" → "}
                  {payment.rentalOrder?.endDate
                    ? new Date(payment.rentalOrder.endDate).toLocaleDateString()
                    : ""}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order Status:</span>
                <span className="font-semibold">
                  {payment.rentalOrder?.status}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
