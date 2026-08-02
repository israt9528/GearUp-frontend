"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  PackageOpen,
  ArrowRight,
  ShieldCheck,
  CalendarRange,
} from "lucide-react";
import { rentalApi } from "@/api/rental.api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RentalStatus } from "@/types/rental.types";
import { ReviewModal } from "@/components/reviews/reviewModal";
import { CustomerRentalSkeleton } from "@/components/skeletons/customerRentalSkeleton";

export default function CustomerRentalPage() {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const router = useRouter();
  const [selectedGearForReview, setSelectedGearForReview] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["my-rentals"],
    queryFn: rentalApi.getMyRentals,
  });

  const getStatusBadge = (status: RentalStatus) => {
    switch (status) {
      case "PLACED":
        return (
          <Badge className="bg-orange-500 hover:bg-orange-600 text-white shadow-none border-0 font-medium">
            Placed
          </Badge>
        );
      case "CONFIRMED":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600 text-white shadow-none border-0 font-medium">
            Confirmed
          </Badge>
        );
      case "PAID":
        return (
          <Badge className="bg-purple-500 hover:bg-purple-600 text-white shadow-none border-0 font-medium">
            Paid
          </Badge>
        );
      case "PICKED_UP":
        return (
          <Badge className="bg-green-500 hover:bg-green-600 text-white shadow-none border-0 font-medium">
            Picked Up
          </Badge>
        );
      case "RETURNED":
        return (
          <Badge className="bg-slate-500 hover:bg-slate-600 text-white shadow-none border-0 font-medium">
            Returned
          </Badge>
        );
      case "CANCELLED":
        return (
          <Badge className="bg-red-500 hover:bg-red-600 text-white shadow-none border-0 font-medium">
            Cancelled
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const openReviewModal = (gearId: string, gearName: string) => {
    setSelectedGearForReview({ id: gearId, name: gearName });
    setIsReviewModalOpen(true);
  };

  if (isPending) {
    return <CustomerRentalSkeleton />;
  }

  if (isError) {
    return (
      <div className="container mx-auto p-8 text-center text-red-500 bg-red-50 dark:bg-red-950/20 rounded-2xl border border-red-200 dark:border-red-900">
        <p className="font-semibold">Failed to load rentals</p>
        <p className="text-sm mt-1 text-muted-foreground">{error.message}</p>
      </div>
    );
  }

  const rentals = data?.data || [];

  return (
    <div className="space-y-4">
      {/* Page Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-0">
        <div>
          <h1 className="text-2xl text-blue-950 font-bold tracking-tight">
            Rental Management
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            View your active bookings, review rental statuses, and manage your
            equipment history.
          </p>
        </div>
        <Link href="/gear">
          <Button className="gap-2 shadow-sm">
            Browse More Gear <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <Card className="border-border shadow-sm overflow-hidden">
        <CardHeader className="bg-muted/30 border-b border-border px-6 py-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg text-blue-950">
                My Rentals List
              </CardTitle>
              <CardDescription className="mt-0.5">
                A complete chronological record of all your gear rental orders.
              </CardDescription>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground bg-background px-3 py-1.5 rounded-lg border border-border">
              <CalendarRange className="h-4 w-4 text-primary" />
              <span>{rentals.length} Total Orders</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {rentals.length === 0 ? (
            <div className="text-center py-16 px-4 space-y-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <PackageOpen className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-base">No rentals found</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                You haven&apos;t rented any gear yet. Explore our catalog to
                place your first booking!
              </p>
              <Link href="/gear" className="inline-block pt-2">
                <Button size="sm">Explore Catalog</Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-indigo-100">
                  <TableRow>
                    <TableHead className="py-4 px-6 font-semibold text-blue-950">
                      Gear Item
                    </TableHead>
                    <TableHead className="py-4 px-6 font-semibold text-blue-950">
                      Rental Dates
                    </TableHead>
                    <TableHead className="py-4 px-6 font-semibold text-blue-950">
                      Total Amount
                    </TableHead>
                    <TableHead className="py-4 px-6 font-semibold text-blue-950">
                      Status
                    </TableHead>
                    <TableHead className="py-4 px-6 text-right font-semibold text-blue-950">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rentals.map((rental) => (
                    <TableRow
                      key={rental.id}
                      onClick={() => {
                        if (rental.id) {
                          router.push(`/customer/rentals/${rental.id}`);
                        }
                      }}
                      className="cursor-pointer hover:bg-indigo-100/40 transition-colors border-b border-border last:border-0"
                    >
                      <TableCell className="py-4 px-6 font-medium">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            <ShieldCheck className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">
                              {rental.gear?.name || "Unknown Gear"}
                            </p>
                            <p className="text-xs text-muted-foreground font-mono">
                              ID: {rental.id.slice(0, 8)}...
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <div className="text-xs font-medium text-foreground">
                          {new Date(rental.startDate).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          &rarr; {new Date(rental.endDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-6 font-semibold text-foreground">
                        ${rental.totalAmount}
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        {getStatusBadge(rental.status)}
                      </TableCell>
                      <TableCell
                        className="py-4 px-6 text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {rental.status === "CONFIRMED" && (
                          <Link href={`/customer/payment/${rental.id}`}>
                            <Button
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                            >
                              Pay Now
                            </Button>
                          </Link>
                        )}
                        {rental.status === "RETURNED" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              openReviewModal(
                                rental.gearId,
                                rental.gear?.name || "Unknown Gear",
                              )
                            }
                          >
                            Leave Review
                          </Button>
                        )}
                        {rental.status === "PLACED" && (
                          <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-md">
                            Waiting for Provider
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedGearForReview && (
        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          gearId={selectedGearForReview.id}
          gearName={selectedGearForReview.name}
        />
      )}
    </div>
  );
}
