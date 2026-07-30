"use client";

import { useQuery } from "@tanstack/react-query";
import { gearApi } from "@/api/gear.api";
import { Loader2 } from "lucide-react";
import { GearCard } from "@/components/features/gear/gearCard";

export default function BrowseGearPage() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["gear"],
    queryFn: gearApi.getAllGear,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Browse Gear</h1>
        <p className="text-gray-500 mt-2">
          Find the perfect equipment for your next adventure.
        </p>
      </div>

      {isPending && (
        <div className="flex justify-center items-center min-h-[40vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {isError && (
        <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg">
          Failed to load gear: {error.message}
        </div>
      )}

      {!isPending && !isError && data?.data && data.data.length === 0 && (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No gear available at the moment.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.data?.map((item) => (
          <GearCard key={item.id} gear={item} />
        ))}
      </div>
    </div>
  );
}
