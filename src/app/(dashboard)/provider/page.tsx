"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import {
  Package,
  DollarSign,
  ShoppingCart,
  Plus,
  ArrowUpRight,
  Loader2,
  ShieldCheck,
  TrendingUp,
  Clock,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { gearApi } from "@/api/gear.api";
import { useAuthStore } from "@/store/useAuthStore";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RentalStatus } from "@/types/rental.types";
import { rentalApi } from "@/api/rental.api";

interface GearItem {
  id: string;
  name: string;
  price: number;
  stock: number;
  isAvailable: boolean;
  providerId: string;
}

interface RentalItem {
  id: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  status: RentalStatus;
  gear?: {
    name: string;
  };
}

export default function ProviderOverviewPage() {
  const { user } = useAuthStore();

  // Fetch all gear and filter client-side for the current provider
  const { data: gearData, isPending: gearLoading } = useQuery({
    queryKey: ["provider-gear-list"],
    queryFn: () => gearApi.getAllGear(),
  });

  // Fetch provider rentals/orders using providerApi
  const { data: rentalsData, isPending: rentalsLoading } = useQuery({
    queryKey: ["provider-rentals"],
    queryFn: rentalApi.getProviderRentals,
  });

  const getStatusBadge = (status: RentalStatus) => {
    switch (status) {
      case "PLACED":
        return (
          <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-0 font-medium shadow-none">
            Placed
          </Badge>
        );
      case "CONFIRMED":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600 text-white border-0 font-medium shadow-none">
            Confirmed
          </Badge>
        );
      case "PAID":
        return (
          <Badge className="bg-purple-500 hover:bg-purple-600 text-white border-0 font-medium shadow-none">
            Paid
          </Badge>
        );
      case "PICKED_UP":
        return (
          <Badge className="bg-green-500 hover:bg-green-600 text-white border-0 font-medium shadow-none">
            Picked Up
          </Badge>
        );
      case "RETURNED":
        return (
          <Badge className="bg-slate-500 hover:bg-slate-600 text-white border-0 font-medium shadow-none">
            Returned
          </Badge>
        );
      case "CANCELLED":
        return (
          <Badge className="bg-red-500 hover:bg-red-600 text-white border-0 font-medium shadow-none">
            Cancelled
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (gearLoading || rentalsLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const allGear: GearItem[] = gearData?.data || [];
  const providerGear = allGear.filter((gear) => gear.providerId === user?.id);
  const rentals: RentalItem[] = rentalsData?.data || [];

  // Calculate Provider Stats
  const totalGear = providerGear.length;
  const activeRentals = rentals.filter(
    (r) =>
      r.status === "PICKED_UP" ||
      r.status === "CONFIRMED" ||
      r.status === "PAID",
  ).length;

  const pendingRentals = rentals.filter((r) => r.status === "PLACED");

  const totalEarnings = rentals
    .filter((r) => ["PAID", "PICKED_UP", "RETURNED"].includes(r.status))
    .reduce((sum, r) => sum + r.totalAmount, 0);

  const recentRentals = rentals.slice(0, 4);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ================= WELCOME BANNER ================= */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-blue-600 to-indigo-600 p-6 md:p-8 text-white shadow-lg">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Welcome back, {user?.name || "Provider"}! 👋
            </h1>
            <p className="text-blue-100 mt-1 max-w-xl text-sm md:text-base">
              Monitor your equipment catalog, review incoming customer rental
              orders, and track your provider earnings.
            </p>
          </div>
          <Link href="/provider/gear/new">
            <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold shadow-sm gap-2">
              <Plus className="h-4 w-4" /> Add New Gear
            </Button>
          </Link>
        </div>
        {/* Abstract background glow */}
        <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* ================= STATS GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Earnings */}
        <Card className="border-border shadow-sm hover:shadow-md transition-all duration-200 group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Earnings
            </CardTitle>
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <DollarSign className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight text-foreground">
              ${totalEarnings.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5 text-green-600" /> Verified
              completed revenue
            </p>
          </CardContent>
        </Card>

        {/* Pending Rentals Card */}
        <Card className="border-border shadow-sm hover:shadow-md transition-all duration-200 group border-orange-500/40 bg-orange-500/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-orange-600 dark:text-orange-400">
              Pending Rentals
            </CardTitle>
            <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
              <Clock className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight text-foreground">
              {pendingRentals.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Awaiting your confirmation
            </p>
          </CardContent>
        </Card>

        {/* Active Bookings */}
        <Card className="border-border shadow-sm hover:shadow-md transition-all duration-200 group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Bookings
            </CardTitle>
            <div className="p-2.5 rounded-xl bg-green-500/10 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
              <ShoppingCart className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight text-foreground">
              {activeRentals}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently ongoing orders
            </p>
          </CardContent>
        </Card>

        {/* Gear Inventory */}
        <Card className="border-border shadow-sm hover:shadow-md transition-all duration-200 group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Gear Inventory
            </CardTitle>
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Package className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight text-foreground">
              {totalGear}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Total items listed by you
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ================= MAIN CONTENT SECTION ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Rentals List */}
        <Card className="lg:col-span-2 border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-lg text-blue-950">
                Recent Rental Orders
              </CardTitle>
              <CardDescription>
                Latest customer activity on your equipment
              </CardDescription>
            </div>
            <Link href="/provider/rentals">
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                View All <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {recentRentals.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground text-sm">
                No rental orders found for your inventory yet.
              </div>
            ) : (
              <div className="space-y-3">
                {recentRentals.map((rental) => (
                  <div
                    key={rental.id}
                    className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/20 hover:bg-muted/40 transition-colors"
                  >
                    <div className="space-y-1">
                      <p className="font-semibold text-sm text-foreground flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        {rental.gear?.name || "Gear Item"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(rental.startDate).toLocaleDateString()} &rarr;{" "}
                        {new Date(rental.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-sm text-foreground">
                        ${rental.totalAmount}
                      </span>
                      {getStatusBadge(rental.status)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Management Shortcuts */}
        <Card className="border-border shadow-sm flex flex-col justify-between">
          <div>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-blue-950">
                <Sparkles className="h-5 w-5 text-blue-950" /> Provider Quick
                Actions
              </CardTitle>
              <CardDescription>
                Shortcuts to your inventory & orders
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 mt-3">
              <Link href="/provider/gear" className="block">
                <Button
                  variant="outline"
                  className="w-full justify-between font-normal hover:bg-primary/5 hover:text-primary transition-colors"
                >
                  <span>Manage Gear Catalog</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/provider/rentals" className="block">
                <Button
                  variant="outline"
                  className="w-full justify-between font-normal hover:bg-primary/5 hover:text-primary transition-colors"
                >
                  <span>Review All Rentals</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/provider/gear/new" className="block">
                <Button
                  variant="outline"
                  className="w-full justify-between font-normal hover:bg-primary/5 hover:text-primary transition-colors"
                >
                  <span>Add New Equipment</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </div>
          <div className="p-6 pt-0">
            <div className="bg-muted/50 border border-border p-3.5 rounded-xl flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-green-600 shrink-0" />
              <span>Verified Provider Status Active</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
