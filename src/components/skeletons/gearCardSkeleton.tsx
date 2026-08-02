import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export function GearCardSkeleton() {
  return (
    <Card className="h-full gap-0 overflow-hidden rounded-2xl border border-sky-100 bg-white py-0 shadow-sm">
      {/* Image Skeleton */}
      <div className="h-44 w-full animate-pulse bg-slate-200 dark:bg-slate-800" />

      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between gap-3">
          <div className="w-full">
            {/* Title Skeleton */}
            <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            {/* Stock Icon/Text Skeleton */}
            <div className="mt-3 h-3 w-1/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          </div>

          {/* Price Box Skeleton */}
          <div className="h-12 w-16 shrink-0 animate-pulse rounded-xl bg-emerald-50 dark:bg-emerald-950/50" />
        </div>
      </CardHeader>

      <CardContent className="grow px-4 pb-4 pt-2">
        {/* Description Skeleton (2 lines) */}
        <div className="flex flex-col gap-2">
          <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        </div>
      </CardContent>

      <CardFooter className="mt-auto border-t border-sky-100 bg-sky-50/60 p-3">
        {/* Button Skeleton */}
        <div className="h-9 w-full animate-pulse rounded-md bg-slate-300 dark:bg-slate-700" />
      </CardFooter>
    </Card>
  );
}
