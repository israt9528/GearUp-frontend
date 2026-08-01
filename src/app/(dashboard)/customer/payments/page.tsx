"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  Loader2,
  CreditCard,
  ReceiptText,
  ArrowUpRight,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { paymentApi } from "@/api/payment.api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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

interface PaymentItem {
  id: string;
  amount: number;
  method: string;
  status: string;
  createdAt: string;
  rentalOrder?: {
    gear?: {
      name: string;
    };
  };
}

export default function CustomerPaymentHistoryPage() {
  const router = useRouter();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["customer-payments"],
    queryFn: paymentApi.getMyPayments,
  });

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return (
          <Badge className="bg-green-500 hover:bg-green-600 text-white border-0 font-medium shadow-none">
            Completed
          </Badge>
        );
      case "PENDING":
        return (
          <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-0 font-medium shadow-none">
            Pending
          </Badge>
        );
      case "FAILED":
        return (
          <Badge className="bg-red-500 hover:bg-red-600 text-white border-0 font-medium shadow-none">
            Failed
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

  if (isError) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center text-red-500 bg-red-50 dark:bg-red-950/20 rounded-2xl border border-red-200 dark:border-red-900">
        <p className="font-semibold">Failed to load payment history</p>
        <p className="text-sm mt-1 text-muted-foreground">
          {error instanceof Error ? error.message : "Unknown error"}
        </p>
      </div>
    );
  }

  const payments: PaymentItem[] = data?.data || [];
  const totalSpent = payments
    .filter((p) => p.status === "COMPLETED")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-blue-950 flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-blue-950" /> Payment History
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            View all your past financial transactions, payment receipts, and
            billing references.
          </p>
        </div>

        {/* Mini Summary Badge Card */}
        <div className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 rounded-2xl shadow-sm">
          <div className="p-2 bg-white/10 rounded-xl">
            <Wallet className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-xs text-blue-100 font-medium">
              Total Lifetime Outlay
            </p>
            <p className="text-lg font-bold">${totalSpent.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <Card className="border-border shadow-sm overflow-hidden">
        <CardHeader className="bg-muted/30 border-b border-border px-6 py-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg text-blue-950">
                Transaction Ledger
              </CardTitle>
              <CardDescription className="mt-0.5">
                Click on any transaction row to inspect complete receipt
                verification details.
              </CardDescription>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground bg-background px-3 py-1.5 rounded-lg border border-border font-medium">
              <ShieldCheck className="h-4 w-4 text-green-600" />
              <span>{payments.length} Recorded Transactions</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {payments.length === 0 ? (
            <div className="text-center py-16 px-4 space-y-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <ReceiptText className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-base">No transactions found</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                You haven&apos;t completed any rental payments yet. Your
                transaction receipts will appear here once processed.
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
                      Amount
                    </TableHead>
                    <TableHead className="py-4 px-6 font-semibold text-blue-950">
                      Method
                    </TableHead>
                    <TableHead className="py-4 px-6 font-semibold text-blue-950">
                      Status
                    </TableHead>
                    <TableHead className="py-4 px-6 text-right font-semibold text-blue-950">
                      Date
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow
                      key={payment.id}
                      onClick={() =>
                        router.push(`/customer/payments/${payment.id}`)
                      }
                      className="cursor-pointer hover:bg-blue-100/50 transition-colors border-b border-border last:border-0"
                    >
                      <TableCell className="py-4 px-6 font-medium text-foreground">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                            <ReceiptText className="h-4 w-4" />
                          </div>
                          <div>
                            <span className="font-semibold block">
                              {payment.rentalOrder?.gear?.name ||
                                "Unknown Gear"}
                            </span>
                            <span className="text-xs text-muted-foreground font-mono">
                              REF: {payment.id.slice(0, 8)}...
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-6 font-bold text-foreground">
                        ${payment.amount}
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <span className="inline-block px-2.5 py-1 bg-muted rounded-md text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          {payment.method}
                        </span>
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        {getPaymentStatusBadge(payment.status)}
                      </TableCell>
                      <TableCell className="py-4 px-6 text-right text-muted-foreground text-sm font-medium">
                        {new Date(payment.createdAt).toLocaleDateString()}
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
