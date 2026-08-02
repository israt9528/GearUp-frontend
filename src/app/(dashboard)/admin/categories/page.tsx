"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { Loader2, Plus, Tags, FolderTree, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { categoryApi, CreateCategoryDto } from "@/api/category.api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CategoriesTableSkeleton } from "@/components/skeletons/adminCategoriesSkeleton";

export default function AdminCategoriesPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const queryClient = useQueryClient();

  // Fetch all categories
  const { data: categoriesData, isPending } = useQuery({
    queryKey: ["categories"],
    queryFn: categoryApi.getAllCategories,
  });

  // Mutation to create a category
  const mutation = useMutation({
    mutationFn: (data: CreateCategoryDto) => categoryApi.createCategory(data),
    onSuccess: () => {
      toast.success("Category created successfully!");
      setName("");
      setDescription("");
      // Refresh the table automatically
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: unknown) => {
      let msg = "Failed to create category";
      if (isAxiosError(error) && error.response?.data?.message) {
        msg = error.response.data.message;
      } else if (error instanceof Error) {
        msg = error.message;
      }
      toast.error(msg);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }
    mutation.mutate({ name, description });
  };

  const categories = categoriesData?.data || [];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-blue-950 flex items-center gap-2">
            <Tags className="h-6 w-6 text-blue-950" /> Category Management
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Create, monitor, and organize equipment categories across the rental
            platform.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create Category Form Card */}
        <div className="lg:col-span-1">
          <Card className="border-border shadow-sm sticky top-6">
            <CardHeader className="bg-muted/30 border-b border-border pb-4">
              <CardTitle className="text-lg flex items-center gap-2 text-blue-950">
                <Sparkles className="h-4 w-4 text-blue-950" /> New Category
              </CardTitle>
              <CardDescription>
                Add a new classification group for provider equipment.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Category Name
                  </label>
                  <Input
                    placeholder="e.g. Cameras & Optics"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="h-11 rounded-xl bg-background/50 border-border"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Description{" "}
                    <span className="text-muted-foreground/60 font-normal">
                      (Optional)
                    </span>
                  </label>
                  <Input
                    placeholder="e.g. DSLR, Mirrorless, and cinema lenses"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="h-11 rounded-xl bg-background/50 border-border"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-11 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-md transition-all gap-2 mt-2"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" /> Create Category
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Categories Table Section */}
        <div className="lg:col-span-2">
          <Card className="border-border shadow-sm overflow-hidden">
            <CardHeader className="bg-muted/30 border-b border-border px-6 py-5">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg text-blue-950">
                    Existing Categories
                  </CardTitle>
                  <CardDescription className="mt-0.5">
                    Active classification items currently available on the
                    platform.
                  </CardDescription>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground bg-background px-3 py-1.5 rounded-lg border border-border font-medium">
                  <FolderTree className="h-4 w-4 text-primary" />
                  <span>{categories.length} Total Categories</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {isPending ? (
                <CategoriesTableSkeleton />
              ) : categories.length === 0 ? (
                <div className="text-center py-16 px-4 space-y-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                    <FolderTree className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-base">
                    No categories found
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                    No categories have been created yet. Use the form on the
                    left to add your first platform category.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-indigo-100/50">
                      <TableRow>
                        <TableHead className="py-4 px-6 font-semibold text-blue-950">
                          Category Name
                        </TableHead>
                        <TableHead className="py-4 px-6 font-semibold text-blue-950">
                          Description
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categories.map((category) => (
                        <TableRow
                          key={category.id}
                          className="hover:bg-blue-100/50 transition-colors border-b border-border last:border-0"
                        >
                          <TableCell className="py-4 px-6 font-medium text-foreground">
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                                <Tags className="h-4 w-4" />
                              </div>
                              <span className="font-semibold">
                                {category.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="py-4 px-6 text-muted-foreground text-sm">
                            {category.description || (
                              <span className="italic text-muted-foreground/60">
                                No description provided
                              </span>
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
      </div>
    </div>
  );
}
