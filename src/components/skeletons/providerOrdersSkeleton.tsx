import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ProviderOrdersSkeleton() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Top Header Section Skeleton */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="space-y-2">
          <div className="h-8 w-64 animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-96 max-w-full animate-pulse rounded-md bg-muted" />
        </div>
      </div>

      {/* Main Card Skeleton */}
      <Card className="overflow-hidden border-border shadow-sm">
        <CardHeader className="border-b border-border bg-muted/30 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-6 w-48 animate-pulse rounded-md bg-muted" />
              <div className="h-4 w-72 animate-pulse rounded-md bg-muted" />
            </div>
            {/* Total Orders Badge Skeleton */}
            <div className="hidden h-8 w-36 animate-pulse rounded-lg border border-border bg-muted sm:block" />
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
                    <div className="h-4 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                  </TableHead>
                  <TableHead className="px-6 py-4">
                    <div className="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                  </TableHead>
                  <TableHead className="px-6 py-4">
                    <div className="h-4 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                  </TableHead>
                  <TableHead className="px-6 py-4 text-right">
                    <div className="ml-auto h-4 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Generate 5 dummy rows */}
                {Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index} className="border-b border-border">
                    {/* Gear Item Column Skeleton */}
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 shrink-0 animate-pulse rounded-lg bg-muted" />
                        <div className="space-y-1.5">
                          <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                          <div className="h-3 w-16 animate-pulse rounded bg-muted" />
                        </div>
                      </div>
                    </TableCell>

                    {/* Customer Details Column Skeleton */}
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-3.5 w-3.5 shrink-0 animate-pulse rounded bg-muted" />
                        <div className="space-y-1.5 w-full">
                          <div className="h-4 w-28 animate-pulse rounded bg-muted" />
                          <div className="h-3 w-36 animate-pulse rounded bg-muted" />
                        </div>
                      </div>
                    </TableCell>

                    {/* Rental Dates Column Skeleton */}
                    <TableCell className="px-6 py-4">
                      <div className="h-8 w-44 animate-pulse rounded-lg bg-muted" />
                    </TableCell>

                    {/* Status Column Skeleton */}
                    <TableCell className="px-6 py-4">
                      <div className="h-6 w-24 animate-pulse rounded-full bg-muted" />
                    </TableCell>

                    {/* Actions / Workflow Column Skeleton */}
                    <TableCell className="px-6 py-4 text-right">
                      <div className="ml-auto flex justify-end gap-2">
                        <div className="h-8 w-20 animate-pulse rounded-md bg-muted" />
                        <div className="h-8 w-20 animate-pulse rounded-md bg-muted" />
                      </div>
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
