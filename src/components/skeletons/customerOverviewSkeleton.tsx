import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function CustomerOverviewSkeleton() {
  return (
    <div className="space-y-8">
      {/* ================= WELCOME BANNER SKELETON ================= */}
      <div className="relative overflow-hidden rounded-3xl bg-muted p-6 md:p-8 shadow-lg animate-pulse">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-3 w-full">
            <div className="h-8 w-64 rounded-md bg-muted-foreground/20" />
            <div className="h-4 w-3/4 max-w-xl rounded-md bg-muted-foreground/20" />
            <div className="h-4 w-1/2 max-w-xl rounded-md bg-muted-foreground/20" />
          </div>
          <div className="h-10 w-48 shrink-0 rounded-md bg-muted-foreground/20" />
        </div>
      </div>

      {/* ================= STATS GRID SKELETON ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="border-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="h-4 w-24 rounded bg-muted animate-pulse" />
              <div className="h-9 w-9 rounded-xl bg-muted animate-pulse" />
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="h-8 w-16 rounded bg-muted animate-pulse" />
              <div className="h-3 w-32 rounded bg-muted animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ================= RECENT ACTIVITY SECTION SKELETON ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Rentals List Skeleton */}
        <Card className="lg:col-span-2 border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-2">
              <div className="h-6 w-32 rounded bg-muted animate-pulse" />
              <div className="h-4 w-48 rounded bg-muted animate-pulse" />
            </div>
            <div className="h-8 w-20 rounded bg-muted animate-pulse" />
          </CardHeader>
          <CardContent className="space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/20"
              >
                <div className="space-y-2">
                  <div className="h-4 w-32 rounded bg-muted animate-pulse" />
                  <div className="h-3 w-48 rounded bg-muted animate-pulse" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-5 w-16 rounded bg-muted animate-pulse" />
                  <div className="h-6 w-20 rounded-full bg-muted animate-pulse" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Account Security Skeleton */}
        <Card className="border-border shadow-sm flex flex-col justify-between">
          <div>
            <CardHeader className="space-y-2">
              <div className="h-6 w-40 rounded bg-muted animate-pulse" />
              <div className="h-4 w-32 rounded bg-muted animate-pulse" />
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <div className="h-4 w-12 rounded bg-muted animate-pulse" />
                <div className="h-4 w-20 rounded bg-muted animate-pulse" />
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <div className="h-4 w-20 rounded bg-muted animate-pulse" />
                <div className="h-4 w-28 rounded bg-muted animate-pulse" />
              </div>
              <div className="flex justify-between items-center py-2">
                <div className="h-4 w-16 rounded bg-muted animate-pulse" />
                <div className="h-4 w-20 rounded bg-muted animate-pulse" />
              </div>
            </CardContent>
          </div>
          <div className="p-6 pt-0">
            <div className="h-9 w-full rounded-md bg-muted animate-pulse" />
          </div>
        </Card>
      </div>
    </div>
  );
}
