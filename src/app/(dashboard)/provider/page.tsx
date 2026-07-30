"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { rentalApi } from "@/api/rental.api";
import { gearApi } from "@/api/gear.api";
import { useAuthStore } from "@/store/useAuthStore"; // 1. Import Auth Store
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  // 2. Get the logged-in user
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  // Fetch Orders (Still using your dedicated provider orders route)
  const { data: rentalsData, isPending: isRentalsPending } = useQuery({
    queryKey: ["provider-rentals"],
    queryFn: rentalApi.getProviderRentals,
  });

  // 3. Fetch ALL Gear from the backend
  const { data: gearData, isPending: isGearPending } = useQuery({
    queryKey: ["all-gear"],
    queryFn: gearApi.getAllGear,
  });

  // Mutations
  const updateStatusMutation = useMutation({
    mutationFn: rentalApi.updateRentalStatus,
    onSuccess: () => {
      toast.success("Order status updated successfully");
      queryClient.invalidateQueries({ queryKey: ["provider-rentals"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteGearMutation = useMutation({
    mutationFn: gearApi.deleteGear,
    onSuccess: () => {
      toast.success("Gear deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["all-gear"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  if (isRentalsPending || isGearPending) {
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const myProviderRentals = rentalsData?.data || [];

  // 4. Filter the gear array so the Provider ONLY sees their own items
  const allGear = gearData?.data || [];
  const myGear = allGear.filter((item) => item.providerId === user?.id);

  const handleStatusChange = (id: string, newStatus: RentalStatus) => {
    updateStatusMutation.mutate({ id, status: newStatus });
  };

  const handleDeleteGear = (id: string) => {
    if (
      confirm(
        "Are you sure you want to delete this gear? This cannot be undone.",
      )
    ) {
      deleteGearMutation.mutate(id);
    }
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Provider Dashboard
          </h1>
          <p className="text-gray-500 mt-2">
            Manage your gear inventory and rental requests.
          </p>
        </div>
        <Link href="/provider/gear/new">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add New Gear
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="orders">Manage Orders</TabsTrigger>
          <TabsTrigger value="gear">My Gear Inventory</TabsTrigger>
        </TabsList>

        {/* ORDERS TAB */}
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Customer Orders</CardTitle>
              <CardDescription>
                Review and update the status of customer rentals.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {myProviderRentals.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No orders have been placed yet.
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Gear</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Dates</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myProviderRentals.map((rental) => (
                      <TableRow key={rental.id}>
                        <TableCell className="font-medium">
                          {rental.gear?.name || "Unknown"}
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">
                            {rental.customer?.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {rental.customer?.email}
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
                        <TableCell className="text-right space-y-2">
                          {rental.status === "PLACED" && (
                            <div className="flex flex-col gap-2 items-end">
                              <Button
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700 w-full max-w-30"
                                onClick={() =>
                                  handleStatusChange(rental.id, "CONFIRMED")
                                }
                              >
                                Confirm
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                className="w-full max-w-30"
                                onClick={() =>
                                  handleStatusChange(rental.id, "CANCELLED")
                                }
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
                            >
                              Mark Picked Up
                            </Button>
                          )}
                          {rental.status === "PICKED_UP" && (
                            <Button
                              size="sm"
                              className="bg-gray-600 hover:bg-gray-700 text-white w-full max-w-30"
                              onClick={() =>
                                handleStatusChange(rental.id, "RETURNED")
                              }
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
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* GEAR INVENTORY TAB */}
        <TabsContent value="gear">
          <Card>
            <CardHeader>
              <CardTitle>My Listings</CardTitle>
              <CardDescription>
                Gear you currently have listed on the platform.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {myGear.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  You haven &apos t listed any gear yet.
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Price/Day</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myGear.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          {item.name}
                        </TableCell>
                        <TableCell>${item.price}</TableCell>
                        <TableCell>
                          {item.isAvailable ? (
                            <Badge className="bg-green-500">Available</Badge>
                          ) : (
                            <Badge variant="secondary">Rented/Hidden</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600"
                            onClick={() => handleDeleteGear(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
