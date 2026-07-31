"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { isAxiosError } from "axios";
import { paymentApi } from "@/api/payment.api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");

  const confirmMutation = useMutation({
    mutationFn: (transactionId: string) =>
      paymentApi.confirmPayment({ transactionId }),
  });

  useEffect(() => {
    if (sessionId && confirmMutation.isIdle) {
      confirmMutation.mutate(sessionId);
    }
  }, [sessionId, confirmMutation]);

  // Extract error message safely without using 'any'
  let errorMessage = "Failed to confirm payment";
  if (isAxiosError(confirmMutation.error)) {
    errorMessage =
      confirmMutation.error.response?.data?.message ||
      confirmMutation.error.message;
  } else if (confirmMutation.error instanceof Error) {
    errorMessage = confirmMutation.error.message;
  }

  return (
    <div className="container mx-auto px-4 py-20 max-w-md text-center">
      <Card className="p-6">
        {/* Loading State */}
        {(!sessionId || confirmMutation.isPending) && (
          <div className="space-y-4 py-8">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
            <h2 className="text-xl font-semibold">Verifying your payment...</h2>
            <p className="text-gray-500 text-sm">
              Please wait while we confirm your transaction with Stripe.
            </p>
          </div>
        )}

        {/* Success State */}
        {confirmMutation.isSuccess && (
          <div className="space-y-4 py-6">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
            <h2 className="text-2xl font-bold text-gray-900">
              Payment Successful!
            </h2>
            <p className="text-gray-600 text-sm">
              Your order has been successfully paid and updated. The provider
              will review your pickup details soon.
            </p>
            <Button
              className="w-full mt-4"
              onClick={() => router.push("/customer")}
            >
              Go to My Rentals
            </Button>
          </div>
        )}

        {/* Error State */}
        {(confirmMutation.isError ||
          (!sessionId && !confirmMutation.isPending)) && (
          <div className="space-y-4 py-6">
            <XCircle className="h-16 w-16 text-red-500 mx-auto" />
            <h2 className="text-2xl font-bold text-gray-900">
              Payment Verification Failed
            </h2>
            <p className="text-red-500 text-sm">
              {sessionId ? errorMessage : "No session ID found in the URL."}
            </p>
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => router.push("/customer")}
            >
              Back to Dashboard
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-primary" />
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
