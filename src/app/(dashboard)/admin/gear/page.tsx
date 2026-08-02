"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Package, CheckCircle2, XCircle, ShieldCheck } from "lucide-react";
import { adminApi } from "@/api/admin.api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdminGearSkeleton } from "@/components/skeletons/adminGearSkeleton";

interface AdminGearItem {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  price: number;
  stock: number;
  isAvailable: boolean;
  createdAt?: string;
  updatedAt?: string;
  providerId: string;
  categoryId: string;
  provider?: {
    id: string;
    name: string;
    email: string;
  };
  category?:
    | {
        id: string;
        name: string;
      }
    | string;
}

export default function AdminGearPage() {
  const { data: gearData, isPending } = useQuery({
    queryKey: ["admin-gear"],
    queryFn: adminApi.getAllGear,
  });

  if (isPending) {
    return <AdminGearSkeleton />;
  }

  const gearList: AdminGearItem[] = gearData?.data || [];
  const availableCount = gearList.filter((g) => g.isAvailable).length;
  const unavailableCount = gearList.length - availableCount;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-blue-950 flex items-center gap-2">
            <Package className="h-6 w-6 text-blue-950" /> System Gear Inventory
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Monitor all equipment items currently listed across the platform by
            providers.
          </p>
        </div>

        {/* Mini Status Counters */}
        <div className="flex items-center gap-2">
          <div className="bg-background border border-border px-3.5 py-2 rounded-xl text-xs flex items-center gap-2 shadow-xs">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-muted-foreground">Available:</span>
            <span className="font-bold text-foreground">{availableCount}</span>
          </div>
          <div className="bg-background border border-border px-3.5 py-2 rounded-xl text-xs flex items-center gap-2 shadow-xs">
            <span className="h-2 w-2 rounded-full bg-slate-400" />
            <span className="text-muted-foreground">Rented/Offline:</span>
            <span className="font-bold text-foreground">
              {unavailableCount}
            </span>
          </div>
        </div>
      </div>

      <Card className="border-border shadow-sm overflow-hidden">
        <CardHeader className="bg-muted/30 border-b border-border px-6 py-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg text-blue-950">
                Platform Equipment Catalog
              </CardTitle>
              <CardDescription className="mt-0.5">
                Complete inventory list with pricing, stock levels, and live
                availability states.
              </CardDescription>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground bg-background px-3 py-1.5 rounded-lg border border-border font-medium">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              <span>{gearList.length} Total Items</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {gearList.length === 0 ? (
            <div className="text-center py-16 px-4 space-y-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <Package className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-base">No gear found</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                There are no equipment items listed by providers on the platform
                yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-indigo-100/50">
                  <TableRow>
                    <TableHead className="py-4 px-6 font-semibold text-blue-950">
                      Item Name
                    </TableHead>
                    <TableHead className="py-4 px-6 font-semibold text-blue-950">
                      Category
                    </TableHead>
                    <TableHead className="py-4 px-6 font-semibold text-blue-950">
                      Provider
                    </TableHead>
                    <TableHead className="py-4 px-6 font-semibold text-blue-950">
                      Price / Day
                    </TableHead>
                    <TableHead className="py-4 px-6 font-semibold text-blue-950">
                      Stock
                    </TableHead>
                    <TableHead className="py-4 px-6 font-semibold text-blue-950">
                      Availability Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gearList.map((gear) => (
                    <TableRow
                      key={gear.id}
                      className="hover:bg-blue-100/40 transition-colors border-b border-border last:border-0"
                    >
                      {/* Item Name & Image Thumbnail */}
                      <TableCell className="py-4 px-6 font-medium text-foreground">
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 rounded-xl bg-muted overflow-hidden shrink-0 border border-border">
                            {gear.imageUrl ? (
                              <Image
                                unoptimized
                                src={gear.imageUrl}
                                alt={gear.name}
                                fill
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
                              {gear.name}
                            </span>
                            <span className="text-xs text-muted-foreground font-mono">
                              ID: {gear.id.slice(0, 8)}...
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      {/* Category Name */}
                      <TableCell className="py-4 px-6 text-sm text-foreground font-medium">
                        {typeof gear.category === "object" &&
                        gear.category !== null
                          ? gear.category.name
                          : typeof gear.category === "string"
                            ? gear.category
                            : "Uncategorized"}
                      </TableCell>

                      {/* Provider Info */}
                      <TableCell className="py-4 px-6">
                        <div className="text-sm font-medium text-foreground">
                          {gear.provider?.name || "Unknown Provider"}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {gear.provider?.email || gear.providerId.slice(-8)}
                        </div>
                      </TableCell>

                      {/* Price / Day */}
                      <TableCell className="py-4 px-6 font-bold text-foreground">
                        ${gear.price}
                      </TableCell>

                      {/* Stock */}
                      <TableCell className="py-4 px-6 text-sm font-semibold text-foreground">
                        {gear.stock ?? 0}
                      </TableCell>

                      {/* Availability Badge */}
                      <TableCell className="py-4 px-6">
                        {gear.isAvailable ? (
                          <Badge className="bg-green-500 hover:bg-green-600 text-white gap-1.5 shadow-none border-0 font-medium">
                            <CheckCircle2 className="h-3.5 w-3.5" /> Available
                          </Badge>
                        ) : (
                          <Badge
                            variant="secondary"
                            className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 gap-1.5 shadow-none border-0 font-medium"
                          >
                            <XCircle className="h-3.5 w-3.5" />{" "}
                            Rented/Unavailable
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
