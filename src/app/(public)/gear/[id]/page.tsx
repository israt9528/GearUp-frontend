"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { Loader2, ArrowLeft } from "lucide-react";
import { gearApi } from "@/api/gear.api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// 2. Type params as a Promise
export default function GearDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 3. Unwrap the params Promise using React.use()
  const { id } = use(params);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["gear", id],
    queryFn: () => gearApi.getGearById(id),
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Item not found</h2>
        <p className="text-gray-600 mb-6">
          {error?.message || "The gear you are looking for does not exist."}
        </p>
        <Link href="/gear">
          <Button>Back to Browse</Button>
        </Link>
      </div>
    );
  }

  const gear = data.data;
  const categoryName =
    typeof gear.category === "object" && gear.category !== null
      ? gear.category.name
      : gear.category;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Link
        href="/gear"
        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to all gear
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div className="relative aspect-square md:aspect-4/3 w-full rounded-xl overflow-hidden bg-gray-100 border shadow-sm">
          <Image
            src={
              gear.imageUrl ||
              "https://images.unsplash.com/photo-1515523110800-9415d13b84a8?q=80&w=800&auto=format&fit=crop"
            }
            alt={gear.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="flex flex-col">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="secondary">{categoryName}</Badge>
              <Badge variant={gear.isAvailable ? "default" : "destructive"}>
                {gear.isAvailable ? "Available Now" : "Currently Rented"}
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
              {gear.name}
            </h1>

            <div className="text-3xl font-bold text-primary mb-6">
              ${gear.price}{" "}
              <span className="text-lg text-gray-500 font-normal">/ day</span>
            </div>

            <div className="prose prose-sm sm:prose-base text-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Description
              </h3>
              <p className="whitespace-pre-line leading-relaxed">
                {gear.description}
              </p>
            </div>
          </div>

          <div className="mt-auto pt-6 border-t">
            {gear.isAvailable ? (
              <Link
                href={`/customer/checkout/${gear.id}`}
                className="block w-full"
              >
                <Button size="lg" className="w-full text-lg h-14">
                  Select Dates & Rent
                </Button>
              </Link>
            ) : (
              <Button size="lg" className="w-full text-lg h-14" disabled>
                Not Available
              </Button>
            )}
            <p className="text-center text-sm text-gray-500 mt-3">
              You will not be charged yet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
