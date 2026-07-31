"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { isAxiosError } from "axios";

import { gearApi } from "@/api/gear.api";
import { categoryApi } from "@/api/category.api";
import { GearItem } from "@/types/gear.types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EditGearModalProps {
  isOpen: boolean;
  onClose: () => void;
  gearItem: GearItem; // STRICTLY TYPED
}

export function EditGearModal({
  isOpen,
  onClose,
  gearItem,
}: EditGearModalProps) {
  const queryClient = useQueryClient();

  // Initialize state directly from the prop (No useEffect needed because of the 'key' trick we will use in the parent)
  const [formData, setFormData] = useState({
    name: gearItem.name || "",
    description: gearItem.description || "",
    price: gearItem.price || 0,
    stock: gearItem.stock ?? 1,
    categoryId: gearItem.categoryId || "",
    imageUrl: gearItem.imageUrl || "",
    isAvailable: gearItem.isAvailable ?? true,
  });

  const { data: categoriesData, isPending: isCategoriesPending } = useQuery({
    queryKey: ["categories"],
    queryFn: categoryApi.getAllCategories,
  });

  const categories = categoriesData?.data || [];
  const updateMutation = useMutation({
    mutationFn: (data: Partial<GearItem>) =>
      gearApi.updateGear({ id: gearItem.id, data }),
    onSuccess: () => {
      toast.success("Gear updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["all-gear"] });
      onClose();
    },
    onError: (error: unknown) => {
      let msg = "Failed to update gear";
      if (isAxiosError(error) && error.response?.data?.message) {
        msg = error.response.data.message;
      } else if (error instanceof Error) {
        msg = error.message;
      }
      toast.error(msg);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === "price" || name === "stock") {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-125 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Gear</DialogTitle>
          <DialogDescription>
            Make changes to your listing and save when you are done.
          </DialogDescription>
        </DialogHeader>

        <form
          id="edit-gear-form"
          onSubmit={handleSubmit}
          className="space-y-5 py-4"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium">Gear Name</label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="" disabled>
                Select a category
              </option>
              {isCategoriesPending ? (
                <option disabled>Loading...</option>
              ) : (
                categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Price per Day ($)</label>
              <Input
                type="number"
                name="price"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Stock Quantity</label>
              <Input
                type="number"
                name="stock"
                min="0"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Image URL</label>
            <Input
              name="imageUrl"
              placeholder="https://..."
              value={formData.imageUrl}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              required
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg border">
            <input
              type="checkbox"
              id="isAvailable"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label
              htmlFor="isAvailable"
              className="text-sm font-medium leading-none"
            >
              Visible & Available for Rent
            </label>
          </div>
        </form>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={updateMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="edit-gear-form"
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
