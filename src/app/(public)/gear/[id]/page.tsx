"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { isAxiosError } from "axios"; // FIXED: Imported to remove 'any'
import {
  Loader2,
  Star,
  ShieldCheck,
  MapPin,
  Package,
  Calendar as CalendarIcon,
} from "lucide-react";
import { toast } from "sonner";

import { gearApi } from "@/api/gear.api";
import { reviewApi } from "@/api/review.api";
import { rentalApi, CreateRentalDto } from "@/api/rental.api";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

export default function GearDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const gearId = params.id as string;

  // 1. State Hooks
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // 2. Query Hooks
  const {
    data: gearData,
    isPending: isGearPending,
    isError: isGearError,
  } = useQuery({
    queryKey: ["gear", gearId],
    queryFn: () => gearApi.getGearById(gearId),
    enabled: !!gearId,
  });

  const { data: reviewsData, isPending: isReviewsPending } = useQuery({
    queryKey: ["gear-reviews", gearId],
    queryFn: () => reviewApi.getGearReviews(gearId),
    enabled: !!gearId,
  });

  // 3. Mutation Hook
  const mutation = useMutation({
    mutationFn: (data: CreateRentalDto) => rentalApi.createRental(data),
    onSuccess: () => {
      toast.success("Rental request submitted successfully!");
      router.push("/customer");
    },
    // FIXED: Removed 'any' and strictly typed the error
    onError: (error: unknown) => {
      let msg = "Failed to submit request";
      if (isAxiosError(error) && error.response?.data?.message) {
        msg = error.response.data.message;
      } else if (error instanceof Error) {
        msg = error.message;
      }
      toast.error(msg);
    },
  });

  // FIXED: Extract variables safely BEFORE the early returns
  const gear = gearData?.data;
  const reviews = reviewsData?.data || [];

  // Use a type assertion to a standard Record to safely check for old pricePerDay if price is missing
  const dailyPrice = gear?.price || 0;

  // 4. Memo Hook (FIXED: Moved up before the 'if' statements)
  const { totalDays, totalAmount } = useMemo(() => {
    if (!startDate || !endDate || !gear)
      return { totalDays: 0, totalAmount: 0 };

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    if (days <= 0) return { totalDays: 0, totalAmount: 0 };

    return {
      totalDays: days,
      totalAmount: days * dailyPrice,
    };
  }, [startDate, endDate, gear, dailyPrice]);

  // --- EARLY RETURNS (Must be after ALL hooks) ---
  if (isGearPending) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (isGearError || !gear) {
    return (
      <div className="text-center py-20 text-red-500 text-xl font-semibold">
        Gear not found.
      </div>
    );
  }
  // -----------------------------------------------

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length
        ).toFixed(1)
      : "New";

  const handleRentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates");
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      toast.error("End date cannot be before start date");
      return;
    }

    mutation.mutate({
      gearId,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
    });
  };

  const isUnavailable =
    gear.isAvailable === false || (gear.stock !== undefined && gear.stock < 1);

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT COLUMN: Image, Details, & Reviews */}
        <div className="lg:col-span-2 space-y-8">
          <div className="w-full h-100 md:h-125 bg-gray-100 rounded-xl overflow-hidden border relative">
            {gear.imageUrl ? (
              <Image
                src={gear.imageUrl}
                alt={gear.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 absolute inset-0">
                <span className="text-lg">No Image Available</span>
              </div>
            )}
          </div>

          <div>
            <h1 className="text-3xl font-extrabold tracking-tight mb-2">
              {gear.name}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-1">
                <Star
                  className={`h-4 w-4 ${reviews.length > 0 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
                <span className="font-semibold text-gray-900">{avgRating}</span>
                <span>({reviews.length} reviews)</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Package className="h-4 w-4" />
                <span>Stock: {gear.stock || 1}</span>
              </div>
            </div>

            <Separator className="my-6" />

            <h2 className="text-xl font-bold mb-4">About this gear</h2>
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {gear.description}
            </p>
          </div>

          <Separator className="my-8" />

          {/* REVIEWS SECTION */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Customer Reviews</h2>
              <div className="text-sm font-medium text-gray-500">
                {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
              </div>
            </div>

            {isReviewsPending ? (
              <div className="flex items-center text-gray-500">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading
                reviews...
              </div>
            ) : reviews.length === 0 ? (
              <div className="bg-gray-50 border border-gray-100 p-8 rounded-lg text-center text-gray-500">
                <Star className="h-8 w-8 text-gray-300 mx-auto mb-3" />
                <p>No reviews yet. Be the first to rent this gear!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-gray-100 pb-6 last:border-0"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold text-gray-900">
                        {review.customer?.name || "Anonymous User"}
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(review.createdAt).toLocaleDateString(
                          undefined,
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Pricing & Booking Form */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24 border-2 shadow-lg">
            <CardContent className="p-6">
              <div className="mb-6">
                <span className="text-4xl font-extrabold">${dailyPrice}</span>
                <span className="text-gray-500 font-medium"> / day</span>
              </div>

              {isUnavailable ? (
                <Badge
                  variant="destructive"
                  className="w-full justify-center py-2 text-sm mb-6"
                >
                  Currently Out of Stock
                </Badge>
              ) : (
                <form onSubmit={handleRentSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Start Date</label>
                      <div className="relative">
                        <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          type="date"
                          className="pl-9"
                          value={startDate}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={(e) => setStartDate(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">End Date</label>
                      <div className="relative">
                        <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          type="date"
                          className="pl-9"
                          value={endDate}
                          min={
                            startDate || new Date().toISOString().split("T")[0]
                          }
                          onChange={(e) => setEndDate(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {totalDays > 0 && (
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2 border">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>
                          ${dailyPrice} x {totalDays}{" "}
                          {totalDays === 1 ? "day" : "days"}
                        </span>
                        <span>${totalAmount.toFixed(2)}</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${totalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-lg h-14"
                    disabled={mutation.isPending || totalDays <= 0}
                  >
                    {mutation.isPending ? "Processing..." : "Request Rental"}
                  </Button>
                </form>
              )}

              <div className="mt-6 space-y-3 pt-6 border-t">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <ShieldCheck className="h-5 w-5 text-green-600 shrink-0" />
                  <span>Platform Protection Guarantee</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <MapPin className="h-5 w-5 text-blue-600 shrink-0" />
                  <span>Local pickup verified</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
