"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Loader2, CreditCard } from "lucide-react";
import { paymentApi } from "@/api/payment.api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
          <Badge className="bg-green-500 hover:bg-green-600 text-white">
            Completed
          </Badge>
        );
      case "PENDING":
        return (
          <Badge className="bg-orange-500 hover:bg-orange-600 text-white">
            Pending
          </Badge>
        );
      case "FAILED":
        return (
          <Badge className="bg-red-500 hover:bg-red-600 text-white">
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
      <div className="container mx-auto p-8 text-center text-red-500">
        Failed to load payment history:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

  const payments: PaymentItem[] = data?.data || [];

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="mb-8 flex items-center gap-3">
        <CreditCard className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payment History</h1>
          <p className="text-gray-500 mt-1">
            View all your past transactions and receipts.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
          <CardDescription>
            Click on any row to view full payment details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {payments.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No payment transactions found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Gear Item</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow
                      key={payment.id}
                      onClick={() =>
                        router.push(`/customer/payments/${payment.id}`)
                      }
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                    >
                      <TableCell className="font-medium">
                        {payment.rentalOrder?.gear?.name || "Unknown Gear"}
                      </TableCell>
                      <TableCell>${payment.amount}</TableCell>
                      <TableCell className="uppercase text-xs font-semibold">
                        {payment.method}
                      </TableCell>
                      <TableCell>
                        {getPaymentStatusBadge(payment.status)}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
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
