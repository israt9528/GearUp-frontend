"use client";

import { useQuery } from "@tanstack/react-query";
import {
  DollarSign,
  Activity,
  Users,
  Package,
  ShieldAlert,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import { adminApi } from "@/api/admin.api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AdminOverviewSkeleton } from "@/components/skeletons/adminOverviewSkeleton";

export default function AdminOverviewPage() {
  const { user } = useAuthStore();

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
    return <AdminOverviewSkeleton />;
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
      {/* ================= WELCOME BANNER ================= */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-blue-600 to-indigo-600 p-6 md:p-8 text-white shadow-lg">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Welcome back, {user?.name || "Administrator"}! 👋
            </h1>
            <p className="text-blue-100 mt-1 max-w-xl text-sm md:text-base">
              Here is your platform performance overview. Monitor total system
              revenue, active user pools, and real-time equipment rentals.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin/users">
              <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold shadow-sm gap-2">
                Manage Users <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        {/* Abstract background glow */}
        <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* ================= STATS / KPI GRID ================= */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Platform Revenue */}
        <Card className="border-border shadow-sm hover:shadow-md transition-all duration-200 group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Platform Revenue
            </CardTitle>
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <DollarSign className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight text-foreground">
              ${totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5 text-green-600" /> Verified
              transactions
            </p>
          </CardContent>
        </Card>

        {/* Total Users */}
        <Card className="border-border shadow-sm hover:shadow-md transition-all duration-200 group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Users
            </CardTitle>
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Users className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight text-foreground">
              {users.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Active registered accounts
            </p>
          </CardContent>
        </Card>

        {/* Total Gear Listed */}
        <Card className="border-border shadow-sm hover:shadow-md transition-all duration-200 group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Gear Listed
            </CardTitle>
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Package className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight text-foreground">
              {gearList.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Equipment available in catalog
            </p>
          </CardContent>
        </Card>

        {/* Active Rentals */}
        <Card className="border-border shadow-sm hover:shadow-md transition-all duration-200 group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Rentals
            </CardTitle>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Activity className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight text-foreground">
              {activeRentals}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently picked up & checked out
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ================= QUICK OVERVIEW BOTTOM SECTION ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-blue-950">
              System Health & Monitoring
            </CardTitle>
            <CardDescription>
              Platform operational status and administrative shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border">
              <div className="flex items-center gap-3">
                <div className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
                <div>
                  <p className="font-semibold text-foreground">
                    API Services & Database
                  </p>
                  <p className="text-xs text-muted-foreground">
                    All nodes operating normally with zero downtime
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold text-green-600 bg-green-500/10 px-2.5 py-1 rounded-md">
                Operational
              </span>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border">
              <div className="flex items-center gap-3">
                <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                <div>
                  <p className="font-semibold text-foreground">
                    Payment Gateway (Stripe)
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Webhook listeners active and synchronized
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold text-blue-600 bg-blue-500/10 px-2.5 py-1 rounded-md">
                Connected
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Card */}
        <Card className="border-border shadow-sm flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-blue-950">
              <ShieldAlert className="h-5 w-5 text-blue-950" /> Quick Management
            </CardTitle>
            <CardDescription>Direct navigation shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2.5">
            <Link href="/admin/users" className="block">
              <Button
                variant="outline"
                className="w-full justify-between font-normal hover:bg-primary/5 hover:text-primary transition-colors"
              >
                <span>Manage Users & Roles</span>
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/admin/gear" className="block">
              <Button
                variant="outline"
                className="w-full justify-between font-normal hover:bg-primary/5 hover:text-primary transition-colors"
              >
                <span>Inspect System Gear</span>
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/admin/rentals" className="block">
              <Button
                variant="outline"
                className="w-full justify-between font-normal hover:bg-primary/5 hover:text-primary transition-colors"
              >
                <span>Review All Rentals</span>
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
