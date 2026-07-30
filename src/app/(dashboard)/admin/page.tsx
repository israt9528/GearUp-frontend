"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, DollarSign, Activity, Users, Package } from "lucide-react";
import { toast } from "sonner";
import { adminApi } from "@/api/admin.api";
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

export default function AdminDashboardPage() {
  const queryClient = useQueryClient();

  // 1. Fetch All Users
  const { data: usersData, isPending: isUsersPending } = useQuery({
    queryKey: ["admin-users"],
    queryFn: adminApi.getAllUsers,
  });

  // 2. Fetch All Gear
  const { data: gearData, isPending: isGearPending } = useQuery({
    queryKey: ["admin-gear"],
    queryFn: adminApi.getAllGear,
  });

  // 3. Fetch All Rentals
  const { data: rentalsData, isPending: isRentalsPending } = useQuery({
    queryKey: ["admin-rentals"],
    queryFn: adminApi.getAllRentals,
  });

  // 4. Update User Status Mutation
  const toggleUserStatus = useMutation({
    mutationFn: adminApi.updateUserStatus,
    onSuccess: () => {
      toast.success("User status updated successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const isLoading = isUsersPending || isGearPending || isRentalsPending;

  if (isLoading) {
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const users = usersData?.data || [];
  const gearList = gearData?.data || [];
  const rentals = rentalsData?.data || [];

  // Calculate Platform KPIs
  const totalRevenue = rentals
    .filter((r) => ["PAID", "PICKED_UP", "RETURNED"].includes(r.status))
    .reduce((sum, rental) => sum + rental.totalAmount, 0);
  const activeRentals = rentals.filter((r) => r.status === "PICKED_UP").length;

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
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Admin Overview</h1>
        <p className="text-gray-500 mt-2">
          Complete platform management and monitoring.
        </p>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Platform Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalRevenue.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Gear Listed
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{gearList.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Rentals
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeRentals}</div>
          </CardContent>
        </Card>
      </div>

      {/* TABS FOR DATA MANAGEMENT */}
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="users">Manage Users</TabsTrigger>
          <TabsTrigger value="gear">System Gear</TabsTrigger>
          <TabsTrigger value="rentals">All Rentals</TabsTrigger>
        </TabsList>

        {/* USERS TAB */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                View all registered users and manage account access.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-gray-500">
                          {user.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.role}</Badge>
                      </TableCell>
                      <TableCell>
                        {user.isSuspended ? (
                          <Badge variant="destructive">Suspended</Badge>
                        ) : (
                          <Badge className="bg-green-500 hover:bg-green-600">
                            Active
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant={user.isSuspended ? "default" : "destructive"}
                          onClick={() =>
                            toggleUserStatus.mutate({
                              id: user.id,
                              isSuspended: !user.isSuspended,
                            })
                          }
                          disabled={toggleUserStatus.isPending}
                        >
                          {user.isSuspended ? "Activate" : "Suspend"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* GEAR TAB */}
        <TabsContent value="gear">
          <Card>
            <CardHeader>
              <CardTitle>System Gear</CardTitle>
              <CardDescription>
                Every piece of gear currently listed by providers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Provider ID</TableHead>
                    <TableHead>Price/Day</TableHead>
                    <TableHead>Availability</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gearList.map((gear) => (
                    <TableRow key={gear.id}>
                      <TableCell className="font-medium">{gear.name}</TableCell>
                      <TableCell className="text-xs text-gray-500">
                        {gear.providerId.slice(-8)}...
                      </TableCell>
                      <TableCell>${gear.price}</TableCell>
                      <TableCell>
                        {gear.isAvailable ? (
                          <Badge className="bg-green-500">Available</Badge>
                        ) : (
                          <Badge variant="secondary">Rented/Unavailable</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* RENTALS TAB */}
        <TabsContent value="rentals">
          <Card>
            <CardHeader>
              <CardTitle>Master Order Log</CardTitle>
              <CardDescription>
                All rental activity across GearUp.
              </CardDescription>
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
                          {rental.customer?.email ||
                            rental.customerId.slice(-8)}
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
