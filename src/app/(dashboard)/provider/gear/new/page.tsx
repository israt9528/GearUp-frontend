"use client";

import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Loader2,
  PlusCircle,
  Package,
  DollarSign,
  Layers,
  Tag,
  Image as ImageIcon,
  FileText,
  ArrowLeft,
} from "lucide-react";

import { gearApi } from "@/api/gear.api";
import { categoryApi } from "@/api/category.api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CreateGearForm {
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  categoryId: string;
}

export default function CreateGearPage() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<CreateGearForm>();

  const mutation = useMutation({
    mutationFn: (data: CreateGearForm) => {
      return gearApi.createGear({
        ...data,
        price: Number(data.price),
        stock: Number(data.stock),
      });
    },
    onSuccess: () => {
      toast.success("Gear listed successfully!");
      router.push("/provider/gear");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create gear");
    },
  });

  const { data: categoriesData, isPending: isCategoriesPending } = useQuery({
    queryKey: ["categories"],
    queryFn: categoryApi.getAllCategories,
  });

  const categories = categoriesData?.data || [];
  const onSubmit = (data: CreateGearForm) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-blue-950 flex items-center gap-2">
            <PlusCircle className="h-6 w-6 text-blue-950" /> List New Equipment
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Publish a new item to your store catalog for platform renters.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.back()}
          className="gap-1.5 h-9 rounded-xl border-border"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
      </div>

      <Card className="border-border shadow-sm overflow-hidden">
        <CardHeader className="bg-muted/30 border-b border-border px-6 py-0">
          <CardTitle className="text-lg text-blue-950">
            Equipment Details
          </CardTitle>
          <CardDescription>
            Provide comprehensive details, pricing, and availability stock for
            your gear.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Gear Name */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Package className="h-3.5 w-3.5 text-primary" /> Gear Name
              </label>
              <Input
                placeholder="e.g. Canon EOS R5 Cinematic Camera"
                {...register("name", { required: true })}
                className="h-11 rounded-xl bg-background/50 border-border"
              />
            </div>

            {/* Price, Stock & Category Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <DollarSign className="h-3.5 w-3.5 text-primary" /> Price per
                  Day ($)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  min="1"
                  placeholder="50"
                  {...register("price", { required: true })}
                  className="h-11 rounded-xl bg-background/50 border-border"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5 text-primary" /> Stock Quantity
                </label>
                <Input
                  type="number"
                  min="1"
                  placeholder="1"
                  defaultValue="1"
                  {...register("stock", { required: true })}
                  className="h-11 rounded-xl bg-background/50 border-border"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Tag className="h-3.5 w-3.5 text-primary" /> Category
                </label>
                <select
                  {...register("categoryId", { required: true })}
                  defaultValue=""
                  className="flex h-11 w-full rounded-xl border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all shadow-xs"
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  {isCategoriesPending ? (
                    <option disabled>Loading categories...</option>
                  ) : categories.length === 0 ? (
                    <option disabled>No categories available</option>
                  ) : (
                    categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <ImageIcon className="h-3.5 w-3.5 text-primary" /> Image URL{" "}
                <span className="font-normal lowercase text-muted-foreground/60">
                  (optional)
                </span>
              </label>
              <Input
                placeholder="https://example.com/gear-image.jpg"
                {...register("imageUrl")}
                className="h-11 rounded-xl bg-background/50 border-border"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-primary" /> Description
              </label>
              <textarea
                className="flex min-h-30 w-full rounded-xl border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all shadow-xs resize-none"
                placeholder="Describe your equipment's condition, included accessories, and core features..."
                {...register("description", { required: true })}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-11 rounded-xl border-border hover:bg-muted/50 font-medium"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-11 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-md transition-all gap-2"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Publishing...
                  </>
                ) : (
                  <>
                    <PlusCircle className="h-4 w-4" /> Publish Listing
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
