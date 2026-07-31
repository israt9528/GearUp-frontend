"use client";

import { use, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { isAxiosError } from "axios";
import { paymentApi } from "@/api/payment.api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function PaymentPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = use(params);
  const router = useRouter();

  // Fetch the Checkout Session from the backend
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["paymentIntent", orderId],
    queryFn: async () => {
      const res = await paymentApi.createPaymentIntent({
        rentalOrderId: orderId,
      });
      return res.data;
    },
    refetchOnWindowFocus: false,
    retry: false,
  });

  // Automatically redirect user to Stripe's hosted Checkout URL when it loads
  useEffect(() => {
    if (data?.paymentUrl) {
      window.location.href = data.paymentUrl;
    }
  }, [data]);

  // Extract error message safely without using 'any'
  let errorMessage = "Failed to initialize payment";
  if (isAxiosError(error)) {
    errorMessage = error.response?.data?.message || error.message;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  if (isPending) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[70vh] space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-gray-600 font-medium">
          Connecting to secure checkout...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-md text-center">
        <Card className="p-8 space-y-4">
          <h2 className="text-xl font-bold text-red-500">Payment Error</h2>
          <p className="text-sm text-gray-600">{errorMessage}</p>
          <Button
            className="w-full mt-4"
            onClick={() => router.push("/customer")}
          >
            Back to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-[70vh] space-y-4">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <p className="text-gray-600 font-medium">Redirecting to Stripe...</p>
    </div>
  );
}
