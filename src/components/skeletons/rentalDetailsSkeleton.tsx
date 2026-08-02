import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function RentalDetailsSkeleton() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Top Action Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-9 w-32 animate-pulse rounded-md bg-muted" />
        <div className="h-4 w-32 animate-pulse rounded-md bg-muted" />
      </div>

      <Card className="overflow-hidden border-border shadow-sm">
        {/* Header Banner Section Skeleton */}
        <CardHeader className="flex flex-col items-start justify-between gap-4 border-b border-border bg-muted/30 px-6 py-6 sm:flex-row sm:items-center">
          <div className="space-y-3 w-full">
            <div className="h-5 w-24 animate-pulse rounded bg-muted" />
            <div className="h-7 w-48 animate-pulse rounded bg-muted" />
            <div className="h-4 w-64 animate-pulse rounded bg-muted" />
          </div>
          {/* Status Badge Skeleton */}
          <div className="h-6 w-20 shrink-0 animate-pulse rounded-full bg-muted" />
        </CardHeader>

        <CardContent className="space-y-8 p-6 md:p-8">
          {/* Gear Information Showcase Skeleton */}
          <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-indigo-50 dark:bg-indigo-950/20 p-5 md:flex-row md:items-center">
            <div className="flex w-full items-start gap-4">
              <div className="mt-1 h-12 w-12 shrink-0 animate-pulse rounded-xl bg-muted" />
              <div className="w-full space-y-2">
                <div className="h-6 w-1/3 animate-pulse rounded bg-muted" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
              </div>
            </div>
            {/* Price Box Skeleton */}
            <div className="flex h-18 w-30 shrink-0 animate-pulse flex-col justify-center rounded-xl border border-border bg-background px-4 py-3 md:w-35" />
          </div>

          {/* Rental Duration & Financial Grid Skeleton */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Schedule Skeleton */}
            <div className="space-y-4 rounded-2xl border border-border bg-blue-50 dark:bg-blue-950/20 p-5 shadow-xs">
              <div className="h-4 w-32 animate-pulse rounded bg-muted" />
              <div className="flex items-center justify-between pt-1">
                <div className="space-y-1">
                  <div className="h-3 w-16 animate-pulse rounded bg-muted" />
                  <div className="h-5 w-24 animate-pulse rounded bg-muted" />
                </div>
                <div className="h-4 w-4 animate-pulse rounded bg-muted" />
                <div className="space-y-1 text-right flex flex-col items-end">
                  <div className="h-3 w-16 animate-pulse rounded bg-muted" />
                  <div className="h-5 w-24 animate-pulse rounded bg-muted" />
                </div>
              </div>
            </div>

            {/* Financials Skeleton */}
            <div className="space-y-4 rounded-2xl border border-border bg-blue-50 dark:bg-blue-950/20 p-5 shadow-xs">
              <div className="h-4 w-40 animate-pulse rounded bg-muted" />
              <div className="flex items-center justify-between pt-1">
                <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                <div className="h-7 w-24 animate-pulse rounded bg-muted" />
              </div>
            </div>
          </div>

          {/* Payment Information Skeleton */}
          <div className="space-y-4 rounded-2xl border border-border bg-muted/10 p-6">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="h-5 w-40 animate-pulse rounded bg-muted" />
              <div className="h-5 w-16 animate-pulse rounded bg-muted" />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="space-y-1.5">
                <div className="h-3 w-24 animate-pulse rounded bg-muted" />
                <div className="h-4 w-20 animate-pulse rounded bg-muted" />
              </div>
              <div className="space-y-1.5">
                <div className="h-3 w-28 animate-pulse rounded bg-muted" />
                <div className="h-4 w-32 animate-pulse rounded bg-muted" />
              </div>
              <div className="space-y-1.5">
                <div className="h-3 w-20 animate-pulse rounded bg-muted" />
                <div className="h-4 w-40 animate-pulse rounded bg-muted" />
              </div>
            </div>
          </div>

          {/* Footer Security Note Skeleton */}
          <div className="flex flex-col items-center justify-between gap-2 border-t border-border pt-6 sm:flex-row">
            <div className="h-3 w-48 animate-pulse rounded bg-muted" />
            <div className="h-6 w-40 animate-pulse rounded-full bg-muted" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
