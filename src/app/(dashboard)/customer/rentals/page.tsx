"use client";

import { useQuery } from "@tanstack/react-query";

import Link from "next/link";

import { Loader2 } from "lucide-react";

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

import { useState } from "react";

import { ReviewModal } from "@/components/reviews/reviewModal";
import { useRouter } from "next/navigation";

export default function CustomerDashboardPage() {
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

  // Updated to match your exact UI Badge color specifications

  const getStatusBadge = (status: RentalStatus) => {
    switch (status) {
      case "PLACED":
        return (
          <Badge className="bg-orange-500 hover:bg-orange-600 text-white">
            Placed
          </Badge>
        );

      case "CONFIRMED":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600 text-white">
            Confirmed
          </Badge>
        );

      case "PAID":
        return (
          <Badge className="bg-purple-500 hover:bg-purple-600 text-white">
            Paid
          </Badge>
        );

      case "PICKED_UP":
        return (
          <Badge className="bg-green-500 hover:bg-green-600 text-white">
            Picked Up
          </Badge>
        );

      case "RETURNED":
        return (
          <Badge className="bg-gray-500 hover:bg-gray-600 text-white">
            Returned
          </Badge>
        );

      case "CANCELLED":
        return (
          <Badge className="bg-red-500 hover:bg-red-600 text-white">
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
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-8 text-center text-red-500">
        Failed to load rentals: {error.message}
      </div>
    );
  }

  const rentals = data?.data || [];

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>My Rentals</CardTitle>

          <CardDescription>
            A list of all your recent rental orders.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {rentals.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              You haven &apos t rented any gear yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Gear</TableHead>

                    <TableHead>Dates</TableHead>

                    <TableHead>Total</TableHead>

                    <TableHead>Status</TableHead>

                    <TableHead className="text-right">Actions</TableHead>
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
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                    >
                      <TableCell className="font-medium">
                        {rental.gear?.name || "Unknown Gear"}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {new Date(rental.startDate).toLocaleDateString()} -
                        </div>
                        <div className="text-sm">
                          {new Date(rental.endDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>${rental.totalAmount}</TableCell>
                      <TableCell>{getStatusBadge(rental.status)}</TableCell>
                      <TableCell
                        className="text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* e.stopPropagation() ensures clicking action buttons like 'Pay Now' doesn't trigger row navigation */}
                        {rental.status === "CONFIRMED" && (
                          <Link href={`/customer/payment/${rental.id}`}>
                            <Button
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700"
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
                          <span className="text-xs text-gray-500">
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
