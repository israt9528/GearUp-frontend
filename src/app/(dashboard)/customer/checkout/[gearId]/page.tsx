"use client";

import { use } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, useWatch } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { gearApi } from "@/api/gear.api";
import { rentalApi } from "@/api/rental.api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface CheckoutForm {
  startDate: string;
  endDate: string;
}

export default function CheckoutPage({
  params,
}: {
  params: Promise<{ gearId: string }>;
}) {
  const { gearId } = use(params);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { register, handleSubmit, control } = useForm<CheckoutForm>();
  const startDate = useWatch({ control, name: "startDate" });
  const endDate = useWatch({ control, name: "endDate" });

  // Fetch Gear Details
  const { data: gearData, isPending } = useQuery({
    queryKey: ["gear", gearId],
    queryFn: () => gearApi.getGearById(gearId),
  });

  // Calculate Price
  let totalDays = 0;
  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  const gear = gearData?.data;
  const totalPrice = gear && totalDays > 0 ? gear.price * totalDays : 0;

  // Submit Mutation
  const mutation = useMutation({
    mutationFn: rentalApi.createRental,
    onSuccess: (response) => {
      toast.success("Order placed! Waiting for provider confirmation.");

      queryClient.invalidateQueries({ queryKey: ["my-rentals"] });

      const orderId = response.data?.id;
      if (orderId) {
        router.push("/customer");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: CheckoutForm) => {
    if (totalDays <= 0) {
      return toast.error("End date must be after start date");
    }

    // Convert 'YYYY-MM-DD' into a strict ISO datetime string for the backend
    const isoStartDate = new Date(data.startDate).toISOString();
    const isoEndDate = new Date(data.endDate).toISOString();

    mutation.mutate({
      gearId,
      startDate: isoStartDate,
      endDate: isoEndDate,
    });
  };

  if (isPending)
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="animate-spin" />
      </div>
    );
  if (!gear)
    return <div className="p-12 text-center text-red-500">Gear not found</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Complete Your Rental</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gear Summary */}
        <Card className="p-6 h-fit">
          <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">{gear.name}</span>
            <span>${gear.price}/day</span>
          </div>
          <div className="border-t my-4"></div>
          <div className="flex justify-between font-bold text-lg">
            <span>
              Total ({totalDays > 0 ? `${totalDays} days` : "0 days"})
            </span>
            <span>${totalPrice}</span>
          </div>
        </Card>

        {/* Date Form */}
        <Card className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Pickup Date
              </label>
              <Input
                type="date"
                {...register("startDate", { required: true })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Return Date
              </label>
              <Input type="date" {...register("endDate", { required: true })} />
            </div>

            <Button
              type="submit"
              className="w-full mt-4"
              disabled={mutation.isPending || totalDays <= 0}
            >
              {mutation.isPending ? "Processing..." : "Proceed to Payment"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
