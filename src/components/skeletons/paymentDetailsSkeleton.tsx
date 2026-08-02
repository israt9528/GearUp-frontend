import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function PaymentDetailsSkeleton() {
  return (
    <div className="mx-auto max-w-3xl space-y-5">
      {/* Top Back Navigation Skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-9 w-48 animate-pulse rounded-md bg-muted" />
        <div className="h-4 w-32 animate-pulse rounded-md bg-muted" />
      </div>

      <Card className="overflow-hidden border-border shadow-sm">
        {/* Receipt Header Banner Skeleton */}
        <CardHeader className="flex flex-col items-start justify-between gap-4 border-b border-border bg-muted/30 px-6 py-6 sm:flex-row sm:items-center">
          <div className="w-full space-y-3">
            <div className="h-5 w-32 animate-pulse rounded bg-muted" />
            <div className="h-7 w-56 animate-pulse rounded bg-muted" />
            <div className="h-4 w-64 animate-pulse rounded bg-muted" />
          </div>
          {/* Status Badge Skeleton */}
          <div className="h-7 w-24 shrink-0 animate-pulse rounded-full bg-muted" />
        </CardHeader>

        <CardContent className="space-y-8 p-6 md:p-8">
          {/* Main Transaction Key-Value Grid Skeleton */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Payment Method */}
            <div className="space-y-3 rounded-2xl border border-border bg-background p-5 shadow-xs">
              <div className="h-4 w-32 animate-pulse rounded bg-muted" />
              <div className="h-7 w-24 animate-pulse rounded bg-muted" />
            </div>

            {/* Total Paid Amount */}
            <div className="space-y-3 rounded-2xl border border-border bg-background p-5 shadow-xs">
              <div className="h-4 w-36 animate-pulse rounded bg-muted" />
              <div className="h-8 w-28 animate-pulse rounded bg-muted" />
            </div>

            {/* Stripe / Gateway Transaction ID */}
            <div className="space-y-3 rounded-2xl border border-border bg-background p-5 shadow-xs sm:col-span-2">
              <div className="h-4 w-48 animate-pulse rounded bg-muted" />
              <div className="h-10 w-full animate-pulse rounded-lg bg-muted/50" />
            </div>

            {/* Paid Timestamp */}
            <div className="space-y-3 rounded-2xl border border-border bg-background p-5 shadow-xs">
              <div className="h-4 w-32 animate-pulse rounded bg-muted" />
              <div className="h-5 w-40 animate-pulse rounded bg-muted" />
            </div>

            {/* Last System Update */}
            <div className="space-y-3 rounded-2xl border border-border bg-background p-5 shadow-xs">
              <div className="h-4 w-36 animate-pulse rounded bg-muted" />
              <div className="h-5 w-40 animate-pulse rounded bg-muted" />
            </div>
          </div>

          {/* Associated Rental Order Section Skeleton */}
          <div className="space-y-4 rounded-2xl border border-border bg-muted/10 p-6">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="h-6 w-48 animate-pulse rounded bg-muted" />
              <div className="h-5 w-32 animate-pulse rounded bg-muted" />
            </div>

            <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
              <div className="space-y-4 pt-1">
                <div className="space-y-2">
                  <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                  <div className="h-6 w-48 animate-pulse rounded bg-muted" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-28 animate-pulse rounded bg-muted" />
                  <div className="h-12 w-full animate-pulse rounded bg-muted" />
                </div>
              </div>

              <div className="space-y-4 rounded-xl border border-border bg-background p-4">
                <div className="flex items-center justify-between">
                  <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                </div>
                <div className="flex items-center justify-between border-t border-border pt-3">
                  <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                  <div className="h-6 w-24 animate-pulse rounded-full bg-muted" />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Security Badge Skeleton */}
          <div className="flex justify-end border-t border-border pt-6">
            <div className="h-8 w-56 animate-pulse rounded-full bg-muted" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
