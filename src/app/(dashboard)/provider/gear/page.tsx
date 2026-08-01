"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Loader2,
  Edit,
  Trash2,
  Plus,
  Package,
  ShieldCheck,
  Tag,
} from "lucide-react";
import Link from "next/link";
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

export default function ProviderGearPage() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  // State for the modal
  const [selectedGear, setSelectedGear] = useState<GearItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data: gearData, isPending } = useQuery({
    queryKey: ["all-gear"],
    queryFn: () => gearApi.getAllGear(),
  });

  const deleteGearMutation = useMutation({
    mutationFn: gearApi.deleteGear,
    onSuccess: () => {
      toast.success("Gear deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["all-gear"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const allGear = gearData?.data || [];
  const myGear = allGear.filter((item) => item.providerId === user?.id);

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
              <span>{myGear.length} Active Records</span>
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
                          <div className="h-9 w-9 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                            <Package className="h-4 w-4" />
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
