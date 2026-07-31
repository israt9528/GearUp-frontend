"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader2, DollarSign, Activity, Users, Package } from "lucide-react";
import { adminApi } from "@/api/admin.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboardPage() {
  // Fetch data just for the KPI calculations
  const { data: usersData, isPending: isUsersPending } = useQuery({
    queryKey: ["admin-users"],
    queryFn: adminApi.getAllUsers,
  });
  const { data: gearData, isPending: isGearPending } = useQuery({
    queryKey: ["admin-gear"],
    queryFn: adminApi.getAllGear,
  });
  const { data: rentalsData, isPending: isRentalsPending } = useQuery({
    queryKey: ["admin-rentals"],
    queryFn: adminApi.getAllRentals,
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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Overview</h1>
        <p className="text-gray-500 mt-2">
          Complete platform management and monitoring.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
    </div>
  );
}
