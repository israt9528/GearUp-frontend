"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { isAxiosError } from "axios";
import {
  Star,
  ShieldCheck,
  MapPin,
  Package,
  Calendar as CalendarIcon,
  Sparkles,
  Tag,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Loader2,
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
import { GearDetailsSkeleton } from "@/components/skeletons/gearDetailsSkeleton";

export default function GearDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const gearId = params.id as string;

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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

  const mutation = useMutation({
    mutationFn: (data: CreateRentalDto) => rentalApi.createRental(data),
    onSuccess: () => {
      toast.success("Rental request submitted successfully!");
      router.push("/customer");
    },
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

  const gear = gearData?.data;
  const reviews = reviewsData?.data || [];
  const dailyPrice = gear?.price || 0;

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

  if (isGearPending) {
    return <GearDetailsSkeleton />;
  }

  if (isGearError || !gear) {
    return (
      <div className="text-center py-28 space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Gear Not Found</h2>
        <p className="text-muted-foreground text-sm">
          The equipment you are looking for might have been removed.
        </p>
        <Button onClick={() => router.push("/gear")} className="rounded-xl">
          Back to Catalog
        </Button>
      </div>
    );
  }

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
    <div className="container mx-auto px-4 py-8 max-w-7xl space-y-8">
      {/* Back Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => router.back()}
        className="gap-1.5 rounded-xl border-border h-9"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Browse
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT COLUMN: Image, Details, & Reviews */}
        <div className="lg:col-span-2 space-y-8">
          {/* Image Showcase */}
          <div className="w-full h-80 sm:h-112.5 bg-muted rounded-3xl overflow-hidden border border-border relative shadow-sm">
            {gear.imageUrl ? (
              <Image
                src={gear.imageUrl}
                alt={gear.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground bg-blue-500/5 gap-2">
                <Package className="h-12 w-12 opacity-40" />
                <span className="text-sm font-medium">No Image Available</span>
              </div>
            )}
            <div className="absolute top-4 left-4">
              <Badge className="bg-linear-to-r from-blue-600 to-indigo-600 text-white border-0 shadow-md font-medium px-3 py-1">
                Verified Equipment
              </Badge>
            </div>
          </div>

          {/* Core Info */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
                <Tag className="h-3 w-3" />
                {typeof gear.category === "object" && gear.category !== null
                  ? gear.category.name
                  : "Equipment"}
              </span>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 px-3 py-1 rounded-full font-medium">
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  <span>{avgRating}</span>
                  <span className="text-xs">({reviews.length} reviews)</span>
                </div>
                <div className="flex items-center gap-1 bg-muted px-3 py-1 rounded-full font-medium text-foreground">
                  <Package className="h-4 w-4 text-primary" />
                  <span>Stock: {gear.stock || 1} units</span>
                </div>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              {gear.name}
            </h1>

            <Separator className="my-6" />

            <div className="space-y-3">
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                About this equipment
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base whitespace-pre-wrap leading-relaxed bg-muted/30 p-6 rounded-2xl border border-border">
                {gear.description || "No description provided for this item."}
              </p>
            </div>
          </div>

          <Separator className="my-8" />

          {/* REVIEWS SECTION */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" /> Customer Reviews
              </h2>
              <span className="text-xs font-medium text-muted-foreground bg-muted px-3 py-1.5 rounded-lg border border-border">
                {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
              </span>
            </div>

            {isReviewsPending ? (
              <div className="flex items-center justify-center py-12 text-muted-foreground">
                <Loader2 className="mr-2 h-5 w-5 animate-spin text-primary" />{" "}
                Loading reviews...
              </div>
            ) : reviews.length === 0 ? (
              <div className="bg-card border border-border p-10 rounded-3xl text-center text-muted-foreground space-y-2 shadow-sm">
                <Star className="h-8 w-8 text-muted-foreground/40 mx-auto" />
                <p className="font-medium text-foreground">No reviews yet</p>
                <p className="text-xs">
                  Be the first customer to rent and review this equipment!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-6 rounded-2xl border border-border bg-card shadow-xs space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-foreground text-sm">
                        {review.customer?.name || "Verified Customer"}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(review.createdAt).toLocaleDateString(
                          undefined,
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </div>
                    </div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${star <= review.rating ? "fill-amber-400 text-amber-400" : "text-muted"}`}
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
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
          <Card className="sticky top-24 border-border shadow-xl rounded-3xl bg-card overflow-hidden">
            <div className="bg-blue-800 p-6 text-white">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold">
                  ${dailyPrice}
                </span>
                <span className="text-blue-100 font-medium text-sm">/ day</span>
              </div>
              <p className="text-xs text-blue-100 mt-1">
                Secure your booking with instant date calculation.
              </p>
            </div>

            <CardContent className="p-6 space-y-6">
              {isUnavailable ? (
                <div className="py-6 text-center space-y-3">
                  <Badge
                    variant="destructive"
                    className="w-full justify-center py-2.5 text-sm font-semibold rounded-xl"
                  >
                    Currently Out of Stock
                  </Badge>
                  <p className="text-xs text-muted-foreground">
                    This item is currently rented out or marked unavailable by
                    the provider.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRentSubmit} className="space-y-5">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Start Date
                      </label>
                      <div className="relative">
                        <CalendarIcon className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="date"
                          className="pl-10 h-11 rounded-xl bg-background/50 border-border"
                          value={startDate}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={(e) => setStartDate(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        End Date
                      </label>
                      <div className="relative">
                        <CalendarIcon className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="date"
                          className="pl-10 h-11 rounded-xl bg-background/50 border-border"
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
                    <div className="bg-muted/40 p-4 rounded-2xl space-y-2.5 border border-border">
                      <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
                        <span>
                          ${dailyPrice} &times; {totalDays}{" "}
                          {totalDays === 1 ? "day" : "days"}
                        </span>
                        <span className="font-semibold text-foreground">
                          ${totalAmount.toFixed(2)}
                        </span>
                      </div>
                      <Separator className="my-1" />
                      <div className="flex justify-between font-bold text-base sm:text-lg text-foreground">
                        <span>Total Amount</span>
                        <span className="text-primary">
                          ${totalAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-base font-semibold h-12 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md transition-all gap-2"
                    disabled={mutation.isPending || totalDays <= 0}
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" /> Processing
                        Request...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-5 w-5" /> Request Rental
                        Booking
                      </>
                    )}
                  </Button>
                </form>
              )}

              <div className="space-y-3 pt-4 border-t border-border text-xs text-muted-foreground">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-green-600 shrink-0" />
                  <span>Platform Protection Guarantee included</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 text-blue-600 shrink-0" />
                  <span>Verified local pickup & return location</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="h-4 w-4 text-indigo-600 shrink-0" />
                  <span>Quick response confirmation from provider</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
