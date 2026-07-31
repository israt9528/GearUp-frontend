"use client";

import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { gearApi } from "@/api/gear.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categoryApi } from "@/api/category.api";

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
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">List New Gear</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Gear Name
              </label>
              <Input
                placeholder="e.g., Canon EOS R5"
                {...register("name", { required: true })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                className="flex min-h-25 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Describe your gear's condition and features..."
                {...register("description", { required: true })}
              />
            </div>

            {/* Changed to a 3-column grid to comfortably fit the stock input */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Price per Day ($)
                </label>
                <Input
                  type="float"
                  min="1"
                  placeholder="50"
                  {...register("price", { required: true })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Stock</label>
                <Input
                  type="number"
                  min="1"
                  placeholder="1"
                  defaultValue="1"
                  {...register("stock", { required: true })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select
                  {...register("categoryId", { required: true })}
                  defaultValue=""
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {isCategoriesPending ? (
                    <option disabled>Loading categories...</option>
                  ) : categories.length === 0 ? (
                    <option disabled>
                      No categories available (Contact Admin)
                    </option>
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

            <div>
              <label className="block text-sm font-medium mb-1">
                Image URL
              </label>
              <Input
                placeholder="https://example.com/image.jpg"
                {...register("imageUrl")}
              />
            </div>

            <div className="flex  gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                // disabled={mutation.isPending}
              >
                {mutation.isPending ? "Publishing..." : "Publish Listing"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
