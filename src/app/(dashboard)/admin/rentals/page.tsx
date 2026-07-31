"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
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
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );

  const rentals = rentalsData?.data || [];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Master Order Log</CardTitle>
          <CardDescription>All rental activity across GearUp.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Gear</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rentals.map((rental) => (
                <TableRow key={rental.id}>
                  <TableCell className="font-mono text-xs text-gray-500">
                    {rental.id.slice(-8)}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {rental.customer?.name || "Unknown"}
                    </div>
                    <div className="text-xs text-gray-500">
                      {rental.customer?.email || rental.customerId.slice(-8)}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {rental.gear?.name || "Unknown Gear"}
                  </TableCell>
                  <TableCell className="font-bold">
                    ${rental.totalAmount}
                  </TableCell>
                  <TableCell>{getStatusBadge(rental.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
