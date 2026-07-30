"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { rentalApi } from "@/api/rental.api";
import { useAuthStore } from "@/store/useAuthStore";
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

export default function CustomerDashboardPage() {
  // 1. Get the logged-in user from our Zustand store
  const { user } = useAuthStore();

  // 2. Fetch ALL rentals from the backend
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["rentals"],
    queryFn: rentalApi.getRentals,
  });

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

  if (isPending)
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  if (isError)
    return (
      <div className="p-12 text-center text-red-500">
        Failed to load rentals: {error.message}
      </div>
    );

  // 3. Filter the rentals so the customer ONLY sees their own orders
  const allRentals = data?.data || [];
  const myRentals = allRentals.filter(
    (rental) => rental.customerId === user?.id,
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Customer Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Manage your gear rentals and view your history.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Rentals</CardTitle>
          <CardDescription>
            A list of all your recent rental orders.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {myRentals.length === 0 ? (
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
                  {myRentals.map((rental) => (
                    <TableRow key={rental.id}>
                      <TableCell className="font-medium">
                        {rental.gear?.name || "Unknown Gear"}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {new Date(rental.startDate).toLocaleDateString()}{" "}
                          -{" "}
                        </div>
                        <div className="text-sm">
                          {new Date(rental.endDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>${rental.totalAmount}</TableCell>
                      <TableCell>{getStatusBadge(rental.status)}</TableCell>
                      <TableCell className="text-right">
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
                          <Button size="sm" variant="outline">
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
    </div>
  );
}
