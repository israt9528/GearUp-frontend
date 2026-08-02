"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ShoppingCart,
  ShieldCheck,
  Calendar,
  User,
  CheckCircle2,
  XCircle,
  Package,
} from "lucide-react";
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
import { ProviderOrdersSkeleton } from "@/components/skeletons/providerOrdersSkeleton";

export default function ProviderOrdersPage() {
  const queryClient = useQueryClient();

  const { data: rentalsData, isPending } = useQuery({
    queryKey: ["provider-rentals"],
    queryFn: rentalApi.getProviderRentals,
  });

  const updateStatusMutation = useMutation({
    mutationFn: rentalApi.updateRentalStatus,
    onSuccess: () => {
      toast.success("Order status updated successfully");
      queryClient.invalidateQueries({ queryKey: ["provider-rentals"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  if (isPending) {
    return <ProviderOrdersSkeleton />;
  }

  const myProviderRentals = rentalsData?.data || [];

  const handleStatusChange = (id: string, newStatus: RentalStatus) => {
    updateStatusMutation.mutate({ id, status: newStatus });
  };

  const getStatusBadge = (status: RentalStatus) => {
    switch (status) {
      case "PLACED":
        return (
          <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-0 shadow-none font-medium">
            Placed
          </Badge>
        );
      case "CONFIRMED":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600 text-white border-0 shadow-none font-medium">
            Confirmed
          </Badge>
        );
      case "PAID":
        return (
          <Badge className="bg-purple-500 hover:bg-purple-600 text-white border-0 shadow-none font-medium">
            Paid
          </Badge>
        );
      case "PICKED_UP":
        return (
          <Badge className="bg-green-500 hover:bg-green-600 text-white border-0 shadow-none font-medium">
            Picked Up
          </Badge>
        );
      case "RETURNED":
        return (
          <Badge className="bg-slate-500 hover:bg-slate-600 text-white border-0 shadow-none font-medium">
            Returned
          </Badge>
        );
      case "CANCELLED":
        return (
          <Badge className="bg-red-500 hover:bg-red-600 text-white border-0 shadow-none font-medium">
            Cancelled
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-blue-950 flex items-center gap-2">
            <ShoppingCart className="h-6 w-6 text-blue-950" /> Manage Customer
            Orders
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Review incoming rental requests, verify customer schedules, and
            update fulfillment statuses.
          </p>
        </div>
      </div>

      <Card className="border-border shadow-sm overflow-hidden">
        <CardHeader className="bg-muted/30 border-b border-border px-6 py-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg text-blue-950">
                Customer Rental Orders
              </CardTitle>
              <CardDescription className="mt-0.5">
                Complete log of bookings placed on your listed equipment.
              </CardDescription>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground bg-background px-3 py-1.5 rounded-lg border border-border font-medium">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>{myProviderRentals.length} Total Orders</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {myProviderRentals.length === 0 ? (
            <div className="text-center py-16 px-4 space-y-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <ShoppingCart className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-base">
                No orders have been placed yet
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                When customers book your listed gear, their rental requests will
                appear here for your review.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-indigo-100/50">
                  <TableRow>
                    <TableHead className="py-4 px-6 font-semibold text-blue-950">
                      Gear Item
                    </TableHead>
                    <TableHead className="py-4 px-6 font-semibold text-blue-950">
                      Customer Details
                    </TableHead>
                    <TableHead className="py-4 px-6 font-semibold text-blue-950">
                      Rental Dates
                    </TableHead>
                    <TableHead className="py-4 px-6 font-semibold text-blue-950">
                      Status
                    </TableHead>
                    <TableHead className="py-4 px-6 text-right font-semibold text-blue-950">
                      Actions / Workflow
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myProviderRentals.map((rental) => (
                    <TableRow
                      key={rental.id}
                      className="hover:bg-blue-100/50 transition-colors border-b border-border last:border-0"
                    >
                      {/* Gear Name */}
                      <TableCell className="py-4 px-6 font-medium text-foreground">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                            <Package className="h-4 w-4" />
                          </div>
                          <div>
                            <span className="font-semibold block">
                              {rental.gear?.name || "Unknown Gear"}
                            </span>
                            <span className="text-xs text-muted-foreground font-mono">
                              ID: #{rental.id.slice(-6)}
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      {/* Customer Details */}
                      <TableCell className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <User className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                          <div>
                            <div className="font-semibold text-foreground">
                              {rental.customer?.name || "Unknown"}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {rental.customer?.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      {/* Dates */}
                      <TableCell className="py-4 px-6">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg border border-border w-fit">
                          <Calendar className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span>
                            {new Date(rental.startDate).toLocaleDateString()}{" "}
                            &rarr;{" "}
                            {new Date(rental.endDate).toLocaleDateString()}
                          </span>
                        </div>
                      </TableCell>

                      {/* Status */}
                      <TableCell className="py-4 px-6">
                        {getStatusBadge(rental.status)}
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {rental.status === "PLACED" && (
                            <>
                              <Button
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700 text-white gap-1 text-xs shadow-sm"
                                onClick={() =>
                                  handleStatusChange(rental.id, "CONFIRMED")
                                }
                                disabled={updateStatusMutation.isPending}
                              >
                                <CheckCircle2 className="h-3.5 w-3.5" /> Confirm
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                className="gap-1 text-xs shadow-sm"
                                onClick={() =>
                                  handleStatusChange(rental.id, "CANCELLED")
                                }
                                disabled={updateStatusMutation.isPending}
                              >
                                <XCircle className="h-3.5 w-3.5" /> Reject
                              </Button>
                            </>
                          )}
                          {rental.status === "PAID" && (
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white gap-1 text-xs shadow-sm"
                              onClick={() =>
                                handleStatusChange(rental.id, "PICKED_UP")
                              }
                              disabled={updateStatusMutation.isPending}
                            >
                              <CheckCircle2 className="h-3.5 w-3.5" /> Mark
                              Picked Up
                            </Button>
                          )}
                          {rental.status === "PICKED_UP" && (
                            <Button
                              size="sm"
                              className="bg-slate-700 hover:bg-slate-800 text-white gap-1 text-xs shadow-sm"
                              onClick={() =>
                                handleStatusChange(rental.id, "RETURNED")
                              }
                              disabled={updateStatusMutation.isPending}
                            >
                              <CheckCircle2 className="h-3.5 w-3.5" /> Mark
                              Returned
                            </Button>
                          )}
                          {rental.status === "CONFIRMED" && (
                            <span className="text-xs text-muted-foreground font-medium italic bg-muted px-3 py-1.5 rounded-lg border border-border">
                              Waiting for Payment
                            </span>
                          )}
                          {rental.status === "RETURNED" && (
                            <span className="text-xs text-green-600 font-semibold flex items-center gap-1 bg-green-500/10 px-3 py-1.5 rounded-lg border border-green-500/20">
                              <CheckCircle2 className="h-3.5 w-3.5" /> Completed
                            </span>
                          )}
                          {rental.status === "CANCELLED" && (
                            <span className="text-xs text-red-600 font-semibold flex items-center gap-1 bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20">
                              <XCircle className="h-3.5 w-3.5" /> Cancelled
                            </span>
                          )}
                        </div>
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
