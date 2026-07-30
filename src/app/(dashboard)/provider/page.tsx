"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
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

export default function ProviderDashboardPage() {
  const queryClient = useQueryClient();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["provider-rentals"],
    queryFn: rentalApi.getProviderRentals,
  });

  const updateStatusMutation = useMutation({
    mutationFn: rentalApi.updateRentalStatus,
    onSuccess: () => {
      toast.success("Order status updated successfully");
      queryClient.invalidateQueries({ queryKey: ["provider-rentals"] });
    },
    onError: (err: Error) => {
      toast.error(`Failed to update status: ${err.message}`);
    },
  });

  const handleStatusChange = (id: string, newStatus: RentalStatus) => {
    updateStatusMutation.mutate({ id, status: newStatus });
  };

  const getStatusBadge = (status: RentalStatus) => {
    switch (status) {
      case "PLACED":
        return <Badge className="bg-orange-500 text-white">Placed</Badge>;
      case "CONFIRMED":
        return <Badge className="bg-blue-500 text-white">Confirmed</Badge>;
      case "PAID":
        return <Badge className="bg-purple-500 text-white">Paid</Badge>;
      case "PICKED_UP":
        return <Badge className="bg-green-500 text-white">Picked Up</Badge>;
      case "RETURNED":
        return <Badge className="bg-gray-500 text-white">Returned</Badge>;
      case "CANCELLED":
        return <Badge className="bg-red-500 text-white">Cancelled</Badge>;
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

  // No more manual filtering needed! The backend did it for us.
  const myProviderRentals = data?.data || [];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Provider Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Manage incoming rental requests for your gear.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Orders</CardTitle>
          <CardDescription>
            Review and update the status of customer rentals.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {myProviderRentals.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No orders have been placed for your gear yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Gear</TableHead>
                    <TableHead>Customer ID</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myProviderRentals.map((rental) => (
                    <TableRow key={rental.id}>
                      <TableCell className="font-medium">
                        {rental.gear?.name || "Unknown Gear"}
                      </TableCell>

                      {/* UPDATED: Show actual Customer Name and Email */}
                      <TableCell>
                        <div className="font-medium">
                          {rental.customer?.name || "Unknown Customer"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {rental.customer?.email || rental.customerId}
                        </div>
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
                      <TableCell>{getStatusBadge(rental.status)}</TableCell>

                      {/* UPDATED ACTIONS */}
                      <TableCell className="text-right space-y-2">
                        {rental.status === "PLACED" && (
                          <div className="flex flex-col gap-2 items-end">
                            <Button
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700 w-full max-w-30"
                              onClick={() =>
                                handleStatusChange(rental.id, "CONFIRMED")
                              }
                              disabled={updateStatusMutation.isPending}
                            >
                              Confirm Order
                            </Button>
                            {/* Bonus: Cancel button since your backend allows PLACED -> CANCELLED */}
                            <Button
                              size="sm"
                              variant="destructive"
                              className="w-full max-w-30"
                              onClick={() =>
                                handleStatusChange(rental.id, "CANCELLED")
                              }
                              disabled={updateStatusMutation.isPending}
                            >
                              Reject Request
                            </Button>
                          </div>
                        )}

                        {rental.status === "PAID" && (
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 w-full max-w-30"
                            onClick={() =>
                              handleStatusChange(rental.id, "PICKED_UP")
                            }
                            disabled={updateStatusMutation.isPending}
                          >
                            Mark Picked Up
                          </Button>
                        )}

                        {/* NEW: Mark Returned Button */}
                        {rental.status === "PICKED_UP" && (
                          <Button
                            size="sm"
                            className="bg-gray-600 hover:bg-gray-700 text-white w-full max-w-30"
                            onClick={() =>
                              handleStatusChange(rental.id, "RETURNED")
                            }
                            disabled={updateStatusMutation.isPending}
                          >
                            Mark Returned
                          </Button>
                        )}

                        {rental.status === "CONFIRMED" && (
                          <span className="text-xs text-gray-500 font-medium">
                            Waiting for Payment
                          </span>
                        )}

                        {rental.status === "RETURNED" && (
                          <span className="text-xs text-green-600 font-medium">
                            Completed
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
