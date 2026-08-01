"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Loader2,
  ShoppingCart,
  ShieldCheck,
  DollarSign,
  CalendarRange,
} from "lucide-react";
import { adminApi } from "@/api/admin.api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RentalStatus } from "@/types/rental.types";

export default function AdminRentalsPage() {
  const { data: rentalsData, isPending } = useQuery({
    queryKey: ["admin-rentals"],
    queryFn: adminApi.getAllRentals,
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

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const rentals = rentalsData?.data || [];
  const totalVolume = rentals.reduce((sum, r) => sum + r.totalAmount, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-blue-950 flex items-center gap-2">
            <ShoppingCart className="h-6 w-6 text-blue-950" /> Master Order Log
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Real-time tracking of all rental orders, customer bookings, and
            platform revenue.
          </p>
        </div>

        {/* Mini Financial Summary Badge */}
        <div className="flex items-center gap-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 rounded-2xl shadow-sm">
          <div className="p-2 bg-white/10 rounded-xl">
            <DollarSign className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-xs text-blue-100 font-medium">
              Master Order Volume
            </p>
            <p className="text-lg font-bold">${totalVolume.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <Card className="border-border shadow-sm overflow-hidden">
        <CardHeader className="bg-muted/30 border-b border-border px-6 py-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg text-blue-950">
                All Rental Activity
              </CardTitle>
              <CardDescription className="mt-0.5">
                Complete chronological log of equipment bookings across GearUp.
              </CardDescription>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground bg-background px-3 py-1.5 rounded-lg border border-border font-medium">
              <CalendarRange className="h-4 w-4 text-primary" />
              <span>{rentals.length} Total Bookings</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {rentals.length === 0 ? (
            <div className="text-center py-16 px-4 space-y-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <ShoppingCart className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-base">
                No rental orders found
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                There are no orders registered on the platform at the moment.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-indigo-100/50">
                  <TableRow>
                    <TableHead className="py-4 px-6 font-semibold text-blue-950">
                      Order ID
                    </TableHead>
                    <TableHead className="py-4 px-6 font-semibold text-blue-950">
                      Customer
                    </TableHead>
                    <TableHead className="py-4 px-6 font-semibold text-blue-950">
                      Gear Item
                    </TableHead>
                    <TableHead className="py-4 px-6 font-semibold text-blue-950">
                      Amount
                    </TableHead>
                    <TableHead className="py-4 px-6 font-semibold text-blue-950">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rentals.map((rental) => (
                    <TableRow
                      key={rental.id}
                      className="hover:bg-blue-100/50 transition-colors border-b border-border last:border-0"
                    >
                      {/* Order ID */}
                      <TableCell className="py-4 px-6 font-mono text-xs text-muted-foreground">
                        #{rental.id.slice(-8)}
                      </TableCell>

                      {/* Customer Info */}
                      <TableCell className="py-4 px-6">
                        <div className="font-semibold text-foreground">
                          {rental.customer?.name || "Unknown"}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {rental.customer?.email ||
                            rental.customerId.slice(-8)}
                        </div>
                      </TableCell>

                      {/* Gear Name */}
                      <TableCell className="py-4 px-6 font-medium text-foreground">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                          <span>{rental.gear?.name || "Unknown Gear"}</span>
                        </div>
                      </TableCell>

                      {/* Amount */}
                      <TableCell className="py-4 px-6 font-bold text-foreground">
                        ${rental.totalAmount}
                      </TableCell>

                      {/* Status Badge */}
                      <TableCell className="py-4 px-6">
                        {getStatusBadge(rental.status)}
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
