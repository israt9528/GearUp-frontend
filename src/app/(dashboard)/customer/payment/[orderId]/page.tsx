"use client";

import { use, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { paymentApi } from "@/api/payment.api";
import { Card } from "@/components/ui/card";
import { CheckoutForm } from "@/components/features/payment/checkoutForm";

// Initialize Stripe outside of component to avoid recreating the object on every render
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

export default function PaymentPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = use(params);
  const [clientSecret, setClientSecret] = useState("");

  // Fetch the Payment Intent from the backend
  const { isPending, isError, error } = useQuery({
    queryKey: ["paymentIntent", orderId],
    queryFn: async () => {
      const res = await paymentApi.createPaymentIntent({
        rentalOrderId: orderId,
      });
      setClientSecret(res.data?.clientSecret || "");
      return res;
    },
    // Prevent refetching which would create multiple payment intents
    refetchOnWindowFocus: false,
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Initializing secure payment...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-red-500">
        <p>Failed to initialize payment: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-xl">
      <Card className="p-6 sm:p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Complete Payment
        </h1>

        {clientSecret && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: { theme: "stripe" },
            }}
          >
            <CheckoutForm />
          </Elements>
        )}
      </Card>
    </div>
  );
}
