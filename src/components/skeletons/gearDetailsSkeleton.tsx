"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function GearDetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column Skeleton */}
        <div className="lg:col-span-2 space-y-8">
          <Skeleton className="w-full h-96 md:h-125 rounded-3xl" />
          <div className="space-y-3">
            <Skeleton className="h-10 w-3/4 rounded-xl" />
            <div className="flex gap-4">
              <Skeleton className="h-5 w-28 rounded-md" />
              <Skeleton className="h-5 w-24 rounded-md" />
            </div>
            <Skeleton className="h-24 w-full rounded-2xl pt-4" />
          </div>
        </div>

        {/* Right Column Booking Card Skeleton */}
        <div className="lg:col-span-1">
          <Skeleton className="h-112.5 w-full rounded-3xl" />
        </div>
      </div>
    </div>
  );
}
