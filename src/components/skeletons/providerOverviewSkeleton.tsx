import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function ProviderOverviewSkeleton() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* ================= WELCOME BANNER SKELETON ================= */}
      <div className="relative overflow-hidden rounded-3xl bg-muted p-6 shadow-lg animate-pulse md:p-8">
        <div className="relative z-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="w-full space-y-3">
            <div className="h-8 w-64 rounded-md bg-muted-foreground/20 md:w-80" />
            <div className="h-4 w-full max-w-xl rounded-md bg-muted-foreground/20" />
            <div className="h-4 w-3/4 max-w-xl rounded-md bg-muted-foreground/20" />
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <div className="h-10 w-36 rounded-md bg-muted-foreground/20" />
          </div>
        </div>
      </div>

      {/* ================= STATS GRID SKELETON ================= */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="border-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="h-4 w-28 animate-pulse rounded bg-muted" />
              <div className="h-9 w-9 animate-pulse rounded-xl bg-muted" />
            </CardHeader>
            <CardContent className="space-y-2.5 pt-1">
              <div className="h-7 w-20 animate-pulse rounded bg-muted" />
              <div className="h-3 w-32 animate-pulse rounded bg-muted" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ================= MAIN CONTENT SECTION SKELETON ================= */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Rentals List Skeleton */}
        <Card className="border-border shadow-sm lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div className="space-y-2">
              <div className="h-6 w-48 animate-pulse rounded bg-muted" />
              <div className="h-4 w-64 animate-pulse rounded bg-muted" />
            </div>
            <div className="h-8 w-20 animate-pulse rounded bg-muted" />
          </CardHeader>
          <CardContent className="space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl border border-border bg-muted/20 p-4"
              >
                <div className="space-y-2">
                  <div className="h-4 w-36 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-48 animate-pulse rounded bg-muted" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-5 w-16 animate-pulse rounded bg-muted" />
                  <div className="h-6 w-24 animate-pulse rounded-full bg-muted" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Management Shortcuts Skeleton */}
        <Card className="flex flex-col justify-between border-border shadow-sm">
          <CardHeader className="space-y-2">
            <div className="h-6 w-48 animate-pulse rounded bg-muted" />
            <div className="h-4 w-36 animate-pulse rounded bg-muted" />
          </CardHeader>
          <CardContent className="space-y-3 pt-3">
            <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
            <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
            <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
          </CardContent>
          <div className="p-6 pt-0">
            <div className="h-12 w-full animate-pulse rounded-xl bg-muted" />
          </div>
        </Card>
      </div>
    </div>
  );
}
