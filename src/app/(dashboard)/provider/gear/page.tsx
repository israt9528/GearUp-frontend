"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Edit,
  Trash2,
  Plus,
  Package,
  ShieldCheck,
  Tag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import Swal from "sweetalert2";

import { gearApi } from "@/api/gear.api";
import { useAuthStore } from "@/store/useAuthStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditGearModal } from "@/components/features/gear/editGearModal";
import { GearItem } from "@/types/gear.types";
import { ProviderGearSkeleton } from "@/components/skeletons/providerGearSkeleton";

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

export default function ProviderGearPage() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  // State for modal and backend pagination
  const [selectedGear, setSelectedGear] = useState<GearItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 8;

  const filters = {
    providerId: user?.id,
    page,
    limit,
  };

  const { data: gearData, isPending } = useQuery({
    queryKey: ["provider-gear", filters],
    queryFn: () => gearApi.getAllGear(filters),
    enabled: !!user?.id,
  });

  const deleteGearMutation = useMutation({
    mutationFn: gearApi.deleteGear,
    onSuccess: () => {
      toast.success("Gear deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["provider-gear"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  if (isPending) {
    return <ProviderGearSkeleton />;
  }

  const gearPayload = gearData?.data as unknown as GearQueryPayload | undefined;
  const allGearItems = Array.isArray(gearPayload)
    ? gearPayload
    : gearPayload?.data || [];

  // Fallback client-side filtering if API returns all gear items without providerId filter
  const myGear = allGearItems.filter((item) => item.providerId === user?.id);

  const gearMeta = Array.isArray(gearPayload)
    ? (gearData as unknown as { meta?: GearQueryMeta })?.meta
    : gearPayload?.meta;

  const totalGear = gearMeta?.total || myGear.length;
  const totalPages = Math.max(1, Math.ceil(totalGear / limit));

  const paginationPages = Array.from(
    { length: Math.min(totalPages, 5) },
    (_, index) => {
      const startPage =
        totalPages <= 5 ? 1 : Math.min(Math.max(page - 2, 1), totalPages - 4);
      return startPage + index;
    },
  );

  const handleDeleteGear = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete it!",
      background: "#fff",
      color: "hsl(var(--foreground))",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteGearMutation.mutate(id);
      }
    });
  };

  const handleEditClick = (item: GearItem) => {
    setSelectedGear(item);
    setIsEditModalOpen(true);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-blue-950 flex items-center gap-2">
            <Package className="h-6 w-6 text-blue-950" /> My Gear Inventory
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage all the equipment you currently have listed on the rental
            platform.
          </p>
        </div>
        <Link href="/provider/gear/new">
          <Button className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-sm gap-2">
            <Plus className="h-4 w-4" /> Add New Gear
          </Button>
        </Link>
      </div>

      <Card className="border-border shadow-sm overflow-hidden">
        <CardHeader className="bg-muted/30 border-b border-border px-6 py-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg text-blue-950">
                My Listings
              </CardTitle>
              <CardDescription className="mt-0.5">
                Gear items currently available or rented on the platform.
              </CardDescription>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground bg-background px-3 py-1.5 rounded-lg border border-border font-medium">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>{totalGear} Active Records</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {myGear.length === 0 ? (
            <div className="text-center py-16 px-4 space-y-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <Package className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-base">
                You haven&apos;t listed any gear yet
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Start adding items to your store catalog so customers can
                discover and rent your equipment.
              </p>
              <Link href="/provider/gear/new" className="inline-block pt-2">
                <Button size="sm" className="gap-1.5">
                  <Plus className="h-4 w-4" /> Add Gear
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-indigo-100/50">
                    <TableRow>
                      <TableHead className="py-4 px-6 font-semibold text-blue-950">
                        Gear Name
                      </TableHead>
                      <TableHead className="py-4 px-6 font-semibold text-blue-950">
                        Category
                      </TableHead>
                      <TableHead className="py-4 px-6 font-semibold text-blue-950">
                        Stock
                      </TableHead>
                      <TableHead className="py-4 px-6 font-semibold text-blue-950">
                        Price / Day
                      </TableHead>
                      <TableHead className="py-4 px-6 font-semibold text-blue-950">
                        Availability
                      </TableHead>
                      <TableHead className="py-4 px-6 text-right font-semibold text-blue-950">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myGear.map((item) => (
                      <TableRow
                        key={item.id}
                        className="hover:bg-blue-100/50 transition-colors border-b border-border last:border-0"
                      >
                        <TableCell className="py-4 px-6 font-medium text-foreground">
                          <div className="flex items-center gap-3">
                            {/* Item Thumbnail Image */}
                            <div className="relative h-10 w-10 rounded-xl bg-muted overflow-hidden shrink-0 border border-border">
                              {item.imageUrl ? (
                                <Image
                                  src={item.imageUrl}
                                  alt={item.name}
                                  fill
                                  unoptimized
                                  sizes="(max-width: 768px) 40px, 40px"
                                  className="object-cover"
                                />
                              ) : (
                                <div className="h-full w-full flex items-center justify-center text-blue-600 bg-blue-500/10">
                                  <Package className="h-4 w-4" />
                                </div>
                              )}
                            </div>
                            <div>
                              <span className="font-semibold block">
                                {item.name}
                              </span>
                              <span className="text-xs text-muted-foreground font-mono">
                                ID: {item.id.slice(0, 8)}...
                              </span>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell className="py-4 px-6">
                          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-md border border-border">
                            <Tag className="h-3 w-3 text-primary" />
                            <span>
                              {typeof item.category === "object" &&
                              item.category !== null
                                ? item.category.name
                                : "Uncategorized"}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell className="py-4 px-6 font-semibold">
                          {item.stock} units
                        </TableCell>

                        <TableCell className="py-4 px-6 font-bold text-foreground">
                          ${item.price}
                        </TableCell>

                        <TableCell className="py-4 px-6">
                          {item.isAvailable ? (
                            <Badge className="bg-green-500 hover:bg-green-600 text-white border-0 shadow-none font-medium">
                              Available
                            </Badge>
                          ) : (
                            <Badge
                              variant="secondary"
                              className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-0 shadow-none font-medium"
                            >
                              Rented / Hidden
                            </Badge>
                          )}
                        </TableCell>

                        <TableCell className="py-4 px-6 text-right space-x-1">
                          <Button
                            variant="ghost"
                            size="lg"
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/40"
                            onClick={() => handleEditClick(item)}
                            title="Edit Gear"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="lg"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40"
                            onClick={() => handleDeleteGear(item.id)}
                            title="Delete Gear"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination Footer Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-muted/20">
                  <p className="text-xs text-muted-foreground">
                    Page{" "}
                    <span className="font-semibold text-foreground">
                      {page}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-foreground">
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
                      className="h-8 w-8 border-sky-200 text-sky-700 hover:bg-sky-50"
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
                        className={`h-8 w-8 ${
                          pageNumber === page
                            ? "bg-blue-800 text-white hover:bg-blue-900"
                            : "border-sky-200 text-sky-700 hover:bg-sky-50"
                        }`}
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
                      className="h-8 w-8 border-sky-200 text-sky-700 hover:bg-sky-50"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Render the Modal at the bottom */}
      {isEditModalOpen && selectedGear && (
        <EditGearModal
          key={selectedGear.id}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedGear(null);
          }}
          gearItem={selectedGear}
        />
      )}
    </div>
  );
}
