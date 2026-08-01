"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import {
  Package,
  Clock,
  CheckCircle2,
  DollarSign,
  ArrowUpRight,
  Loader2,
  ShoppingBag,
  CreditCard,
  ShieldCheck,
} from "lucide-react";
import { rentalApi } from "@/api/rental.api";
import { paymentApi } from "@/api/payment.api";
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

interface PaymentItem {
  id: string;
  amount: number;
  status: string;
}

export default function CustomerOverviewPage() {
  const { user } = useAuthStore();

  // Fetch rentals
  const { data: rentalsData, isPending: rentalsLoading } = useQuery({
    queryKey: ["my-rentals"],
    queryFn: rentalApi.getMyRentals,
  });

  // Fetch payments
  const { data: paymentsData, isPending: paymentsLoading } = useQuery({
    queryKey: ["customer-payments"],
    queryFn: paymentApi.getMyPayments,
  });

  // Exact Badge Color Mapping based on your specification
  const getStatusBadge = (status: RentalStatus) => {
    switch (status) {
      case "PLACED":
        return (
          <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-0">
            Placed
          </Badge>
        );
      case "CONFIRMED":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600 text-white border-0">
            Confirmed
          </Badge>
        );
      case "PAID":
        return (
          <Badge className="bg-purple-500 hover:bg-purple-600 text-white border-0">
            Paid
          </Badge>
        );
      case "PICKED_UP":
        return (
          <Badge className="bg-green-500 hover:bg-green-600 text-white border-0">
            Picked Up
          </Badge>
        );
      case "RETURNED":
        return (
          <Badge className="bg-gray-500 hover:bg-gray-600 text-white border-0">
            Returned
          </Badge>
        );
      case "CANCELLED":
        return (
          <Badge className="bg-red-500 hover:bg-red-600 text-white border-0">
            Cancelled
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (rentalsLoading || paymentsLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const rentals: RentalItem[] = rentalsData?.data || [];
  const payments: PaymentItem[] = paymentsData?.data || [];

  // Calculate Stats
  const totalRentals = rentals.length;
  const activeRentals = rentals.filter(
    (r) =>
      r.status === "PICKED_UP" ||
      r.status === "CONFIRMED" ||
      r.status === "PAID",
  ).length;
  const completedRentals = rentals.filter(
    (r) => r.status === "RETURNED",
  ).length;

  const totalSpent = payments
    .filter((p) => p.status === "COMPLETED")
    .reduce((sum, p) => sum + p.amount, 0);

  const recentRentals = rentals.slice(0, 3); // Show top 3 recent items

  return (
    <div className="space-y-8">
      {/* ================= WELCOME BANNER ================= */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-blue-700 to-indigo-600 p-6 md:p-8 text-white shadow-lg">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Welcome back, {user?.name || "Customer"}! 👋
            </h1>
            <p className="text-blue-100 mt-1 max-w-xl text-sm md:text-base">
              Here is what is happening with your gear rentals today. Track your
              orders, process payments, and manage your equipment history.
            </p>
          </div>
          <Link href="/gear">
            <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold shadow-sm gap-2">
              <ShoppingBag className="h-4 w-4" /> Browse Gear Catalog
            </Button>
          </Link>
        </div>
        {/* Abstract background glow */}
        <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* ================= STATS GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Rentals */}
        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Rentals
            </CardTitle>
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600">
              <Package className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRentals}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Lifetime orders placed
            </p>
          </CardContent>
        </Card>

        {/* Active Rentals */}
        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Rentals
            </CardTitle>
            <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-600">
              <Clock className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeRentals}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently ongoing or pending
            </p>
          </CardContent>
        </Card>

        {/* Completed Rentals */}
        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed
            </CardTitle>
            <div className="p-2.5 rounded-xl bg-green-500/10 text-green-600">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedRentals}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Successfully returned
            </p>
          </CardContent>
        </Card>

        {/* Total Spent */}
        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Spent
            </CardTitle>
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600">
              <DollarSign className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSpent}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Total completed payments
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ================= RECENT ACTIVITY SECTION ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Rentals List */}
        <Card className="lg:col-span-2 border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Rentals</CardTitle>
              <CardDescription>
                Your latest gear rental bookings
              </CardDescription>
            </div>
            <Link href="/customer/rentals">
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                View All <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {recentRentals.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No recent rental orders found.
              </div>
            ) : (
              <div className="space-y-3">
                {recentRentals.map((rental) => (
                  <div
                    key={rental.id}
                    className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/20 hover:bg-muted/40 transition-colors"
                  >
                    <div className="space-y-1">
                      <p className="font-semibold text-sm">
                        {rental.gear?.name || "Gear Item"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(rental.startDate).toLocaleDateString()} &rarr;{" "}
                        {new Date(rental.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-sm">
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

        {/* Quick Help / Account Status */}
        <Card className="border-border shadow-sm flex flex-col justify-between">
          <div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" /> Account
                Security
              </CardTitle>
              <CardDescription>Your customer profile status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">Role</span>
                <span className="font-semibold uppercase">
                  {user?.role || "CUSTOMER"}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">Verification</span>
                <span className="font-semibold text-green-600">
                  Verified Account
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground">Support</span>
                <span className="font-semibold text-primary">24/7 Active</span>
              </div>
            </CardContent>
          </div>
          <div className="p-6 pt-0">
            <Link href="/customer/payments">
              <Button variant="outline" className="w-full gap-2 text-xs">
                <CreditCard className="h-4 w-4" /> View Payment History
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
