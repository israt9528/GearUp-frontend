"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import { categoryApi } from "@/api/category.api";
import { gearApi } from "@/api/gear.api";
import { GearCard } from "@/components/features/gear/gearCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GearItem } from "@/types/gear.types";
import { GearCardSkeleton } from "@/components/skeletons/gearCardSkeleton";

type GearQueryMeta = {
  page: number;
  limit: number;
  total: number;
};

type GearQueryPayload =
  | GearItem[]
  | {
      data: GearItem[];
      meta?: GearQueryMeta;
    };

export default function BrowseGearPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [availability, setAvailability] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const limit = 12;

  const filters = {
    searchTerm: searchTerm.trim(),
    categoryId: categoryId || undefined,
    isAvailable: availability === "" ? undefined : availability === "available",
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    sortBy,
    sortOrder,
    page,
    limit,
  };

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["gear", filters],
    queryFn: () => gearApi.getAllGear(filters),
  });

  const { data: categoriesData, isPending: isCategoriesPending } = useQuery({
    queryKey: ["categories"],
    queryFn: categoryApi.getAllCategories,
  });

  const categories = categoriesData?.data || [];
  const gearPayload = data?.data as unknown as GearQueryPayload | undefined;
  const gearItems = Array.isArray(gearPayload)
    ? gearPayload
    : gearPayload?.data || [];
  const gearMeta = Array.isArray(gearPayload)
    ? (data as unknown as { meta?: GearQueryMeta })?.meta
    : gearPayload?.meta;
  const totalGear = gearMeta?.total || gearItems.length;
  const totalPages = Math.max(1, Math.ceil(totalGear / limit));
  const paginationPages = Array.from(
    { length: Math.min(totalPages, 5) },
    (_, index) => {
      const startPage =
        totalPages <= 5 ? 1 : Math.min(Math.max(page - 2, 1), totalPages - 4);

      return startPage + index;
    },
  );
  const hasActiveFilters =
    Boolean(searchTerm) ||
    Boolean(categoryId) ||
    Boolean(availability) ||
    Boolean(minPrice) ||
    Boolean(maxPrice);

  const resetFilters = () => {
    setSearchTerm("");
    setCategoryId("");
    setAvailability("");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("createdAt");
    setSortOrder("desc");
    setPage(1);
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge className="mb-2 border-emerald-200 bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
              Gear Marketplace
            </Badge>
            <h1 className="text-2xl font-bold tracking-tight text-blue-950 sm:text-3xl">
              Browse Outdoor Gear
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Search, filter, and rent dependable gear for your next trip.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-sky-100 bg-white/90 px-3 py-2 shadow-sm">
            <span className="text-xs font-medium uppercase text-slate-500">
              Results
            </span>
            <span className="rounded-lg bg-sky-100 px-2.5 py-1 text-sm font-semibold text-sky-800">
              {isPending ? "..." : totalGear}
            </span>
          </div>
        </header>

        <section className="mb-5 rounded-2xl border border-emerald-100 bg-white/95 p-3 shadow-sm backdrop-blur">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
                <SlidersHorizontal className="h-4 w-4" />
              </span>
              <div>
                <h2 className="text-sm font-semibold text-slate-950">
                  Filters
                </h2>
                <p className="text-xs text-slate-500">
                  Fine tune the gear list
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={resetFilters}
              disabled={
                !hasActiveFilters &&
                sortBy === "createdAt" &&
                sortOrder === "desc"
              }
              className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-12">
            <div className="xl:col-span-4">
              <label className="mb-1 block text-xs font-medium text-slate-600">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search gear"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPage(1);
                  }}
                  className="h-9 border-slate-200 bg-white pl-9"
                />
              </div>
            </div>

            <div className="xl:col-span-2">
              <label className="mb-1 block text-xs font-medium text-slate-600">
                Category
              </label>
              <select
                value={categoryId}
                disabled={isCategoriesPending}
                onChange={(e) => {
                  setCategoryId(e.target.value);
                  setPage(1);
                }}
                className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none transition-colors focus:border-emerald-500 focus:ring-3 focus:ring-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">All categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="xl:col-span-2">
              <label className="mb-1 block text-xs font-medium text-slate-600">
                Availability
              </label>
              <select
                value={availability}
                onChange={(e) => {
                  setAvailability(e.target.value);
                  setPage(1);
                }}
                className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none transition-colors focus:border-emerald-500 focus:ring-3 focus:ring-emerald-500/20"
              >
                <option value="">Any status</option>
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>

            <div className="xl:col-span-1">
              <label className="mb-1 block text-xs font-medium text-slate-600">
                Min
              </label>
              <Input
                type="number"
                placeholder="0"
                value={minPrice}
                onChange={(e) => {
                  setMinPrice(e.target.value);
                  setPage(1);
                }}
                className="h-9 border-slate-200 bg-white"
              />
            </div>

            <div className="xl:col-span-1">
              <label className="mb-1 block text-xs font-medium text-slate-600">
                Max
              </label>
              <Input
                type="number"
                placeholder="500"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(e.target.value);
                  setPage(1);
                }}
                className="h-9 border-slate-200 bg-white"
              />
            </div>

            <div className="xl:col-span-1">
              <label className="mb-1 block text-xs font-medium text-slate-600">
                Sort
              </label>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setPage(1);
                }}
                className="h-9 w-full rounded-lg border border-slate-200 bg-white px-2 text-sm outline-none transition-colors focus:border-emerald-500 focus:ring-3 focus:ring-emerald-500/20"
              >
                <option value="createdAt">Newest</option>
                <option value="price">Price</option>
                <option value="name">Name</option>
              </select>
            </div>

            <div className="xl:col-span-1">
              <label className="mb-1 block text-xs font-medium text-slate-600">
                Order
              </label>
              <select
                value={sortOrder}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setSortOrder(e.target.value as "asc" | "desc");
                  setPage(1);
                }}
                className="h-9 w-full rounded-lg border border-slate-200 bg-white px-2 text-sm outline-none transition-colors focus:border-emerald-500 focus:ring-3 focus:ring-emerald-500/20"
              >
                <option value="desc">Desc</option>
                <option value="asc">Asc</option>
              </select>
            </div>
          </div>
        </section>

        {isPending && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* Array.from creates 8 dummy items so the screen is filled while loading */}
            {Array.from({ length: 8 }).map((_, index) => (
              <GearCardSkeleton key={index} />
            ))}
          </div>
        )}

        {isError && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
            Failed to load gear: {error.message}
          </div>
        )}

        {!isPending && !isError && gearItems.length === 0 && (
          <div className="rounded-2xl border border-sky-100 bg-white p-8 text-center shadow-sm sm:p-10">
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
              <Search className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-slate-950">
              No gear found
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
              Try changing your search, price range, category, or availability.
            </p>
            {hasActiveFilters && (
              <Button
                type="button"
                variant="outline"
                onClick={resetFilters}
                className="mt-5 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
              >
                Clear filters
              </Button>
            )}
          </div>
        )}

        {!isPending && !isError && gearItems.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {gearItems.map((item: GearItem) => (
                <GearCard key={item.id} gear={item} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-6 flex flex-col items-center justify-between gap-3 rounded-2xl border border-sky-100 bg-white px-4 py-3 shadow-sm sm:flex-row">
                <p className="text-sm text-slate-500">
                  Page{" "}
                  <span className="font-semibold text-slate-900">{page}</span>{" "}
                  of{" "}
                  <span className="font-semibold text-slate-900">
                    {totalPages}
                  </span>
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    disabled={page === 1}
                    onClick={() => setPage((currentPage) => currentPage - 1)}
                    aria-label="Previous page"
                    className="border-sky-200 text-sky-700 hover:bg-sky-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  {paginationPages.map((pageNumber) => (
                    <Button
                      key={pageNumber}
                      type="button"
                      variant={pageNumber === page ? "default" : "outline"}
                      size="icon"
                      onClick={() => setPage(pageNumber)}
                      aria-label={`Go to page ${pageNumber}`}
                      className={
                        pageNumber === page
                          ? "bg-emerald-600 text-white hover:bg-emerald-700"
                          : "border-sky-200 text-sky-700 hover:bg-sky-50"
                      }
                    >
                      {pageNumber}
                    </Button>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    disabled={page >= totalPages}
                    onClick={() => setPage((currentPage) => currentPage + 1)}
                    aria-label="Next page"
                    className="border-sky-200 text-sky-700 hover:bg-sky-50"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
