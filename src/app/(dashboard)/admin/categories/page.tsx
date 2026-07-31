"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { Loader2, Plus } from "lucide-react";
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
    <div className="container mx-auto px-4 py-8 max-w-5xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Category Management
        </h1>
        <p className="text-gray-500 mt-2">
          Create and manage gear categories for providers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Create Category Form */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>New Category</CardTitle>
              <CardDescription>
                Add a new category to the platform.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    placeholder="e.g. Cameras"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Description (Optional)
                  </label>
                  <Input
                    placeholder="e.g. DSLR and Mirrorless"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Plus className="h-4 w-4 mr-2" />
                  )}
                  Create Category
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Categories Table */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Existing Categories</CardTitle>
            </CardHeader>
            <CardContent>
              {isPending ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : categories.length === 0 ? (
                <div className="text-center py-8 text-gray-500 border rounded-md bg-gray-50">
                  No categories found. Create one to get started.
                </div>
              ) : (
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categories.map((category) => (
                        <TableRow key={category.id}>
                          <TableCell className="font-medium">
                            {category.name}
                          </TableCell>
                          <TableCell className="text-gray-500">
                            {category.description || "-"}
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
