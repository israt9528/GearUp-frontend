"use client";

import { useRouter } from "next/navigation";
import { XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PaymentCancelPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-20 max-w-md text-center">
      <Card className="p-8 space-y-4">
        <XCircle className="h-16 w-16 text-orange-500 mx-auto" />
        <h2 className="text-2xl font-bold text-gray-900">Payment Cancelled</h2>
        <p className="text-gray-600 text-sm">
          Your payment session was cancelled. No charges were made to your card.
          You can try paying again whenever you are ready from your dashboard.
        </p>
        <Button
          className="w-full mt-4"
          onClick={() => router.push("/customer")}
        >
          Return to Dashboard
        </Button>
      </Card>
    </div>
  );
}
