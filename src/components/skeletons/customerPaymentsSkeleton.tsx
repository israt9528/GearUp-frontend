import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function CustomerPaymentsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Top Header Section Skeleton */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <div className="h-8 w-56 animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-72 animate-pulse rounded-md bg-muted" />
        </div>

        {/* Mini Summary Badge Card Skeleton */}
        <div className="flex h-19 w-55 items-center gap-3 rounded-2xl bg-muted px-5 py-3 shadow-sm animate-pulse">
          <div className="h-9 w-9 shrink-0 rounded-xl bg-muted-foreground/20" />
          <div className="space-y-1.5 w-full">
            <div className="h-3 w-24 rounded bg-muted-foreground/20" />
            <div className="h-5 w-16 rounded bg-muted-foreground/20" />
          </div>
        </div>
      </div>

      <Card className="overflow-hidden border-border shadow-sm">
        {/* Card Header Skeleton */}
        <CardHeader className="border-b border-border bg-muted/30 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-6 w-40 animate-pulse rounded-md bg-muted" />
              <div className="h-4 w-64 animate-pulse rounded-md bg-muted" />
            </div>
            {/* Record Count Badge Skeleton */}
            <div className="hidden h-8 w-40 animate-pulse rounded-lg border border-border bg-muted sm:block" />
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-indigo-100/50">
                <TableRow>
                  <TableHead className="px-6 py-4">
                    <div className="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                  </TableHead>
                  <TableHead className="px-6 py-4">
                    <div className="h-4 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                  </TableHead>
                  <TableHead className="px-6 py-4">
                    <div className="h-4 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                  </TableHead>
                  <TableHead className="px-6 py-4">
                    <div className="h-4 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                  </TableHead>
                  <TableHead className="px-6 py-4">
                    <div className="ml-auto h-4 w-12 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Generate 5 dummy rows */}
                {Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index} className="border-b border-border">
                    {/* Gear Item Column */}
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 shrink-0 animate-pulse rounded-lg bg-muted" />
                        <div className="space-y-1.5">
                          <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                          <div className="h-3 w-20 animate-pulse rounded bg-muted" />
                        </div>
                      </div>
                    </TableCell>

                    {/* Amount Column */}
                    <TableCell className="px-6 py-4">
                      <div className="h-5 w-16 animate-pulse rounded bg-muted" />
                    </TableCell>

                    {/* Method Column */}
                    <TableCell className="px-6 py-4">
                      <div className="h-6 w-16 animate-pulse rounded-md bg-muted" />
                    </TableCell>

                    {/* Status Column */}
                    <TableCell className="px-6 py-4">
                      <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
                    </TableCell>

                    {/* Date Column */}
                    <TableCell className="px-6 py-4 text-right">
                      <div className="ml-auto h-4 w-24 animate-pulse rounded bg-muted" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
