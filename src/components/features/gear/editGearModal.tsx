"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Loader2,
  Save,
  Sparkles,
  Tag,
  DollarSign,
  Layers,
  Image as ImageIcon,
  FileText,
  CheckCircle2,
  Package,
} from "lucide-react";
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
  gearItem: GearItem;
}

export function EditGearModal({
  isOpen,
  onClose,
  gearItem,
}: EditGearModalProps) {
  const queryClient = useQueryClient();

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
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto border-border/80 shadow-2xl rounded-3xl p-6 sm:p-8">
        <DialogHeader className="space-y-1.5 pb-2 border-b border-border">
          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="h-5 w-5" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider">
              Equipment Management
            </span>
          </div>
          <DialogTitle className="text-2xl font-bold tracking-tight">
            Edit Gear Listing
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Update specifications, pricing, and availability status for this
            equipment.
          </DialogDescription>
        </DialogHeader>

        <form
          id="edit-gear-form"
          onSubmit={handleSubmit}
          className="space-y-5 py-4"
        >
          {/* Gear Name */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Package className="h-3.5 w-3.5 text-primary" /> Gear Name
            </label>
            <Input
              name="name"
              placeholder="e.g. Professional Cinematic Camera"
              value={formData.name}
              onChange={handleChange}
              required
              className="h-11 rounded-xl bg-background/50 border-border"
            />
          </div>

          {/* Category Selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Tag className="h-3.5 w-3.5 text-primary" /> Category
            </label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
              className="flex h-11 w-full rounded-xl border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all shadow-xs"
            >
              <option value="" disabled>
                Select equipment category
              </option>
              {isCategoriesPending ? (
                <option disabled>Loading categories...</option>
              ) : (
                categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Price & Stock Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <DollarSign className="h-3.5 w-3.5 text-primary" /> Price per
                Day ($)
              </label>
              <Input
                type="number"
                name="price"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
                className="h-11 rounded-xl bg-background/50 border-border"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-primary" /> Stock Quantity
              </label>
              <Input
                type="number"
                name="stock"
                min="0"
                value={formData.stock}
                onChange={handleChange}
                required
                className="h-11 rounded-xl bg-background/50 border-border"
              />
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
              name="imageUrl"
              placeholder="https://example.com/gear.jpg"
              value={formData.imageUrl}
              onChange={handleChange}
              className="h-11 rounded-xl bg-background/50 border-border"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-primary" /> Description
            </label>
            <textarea
              name="description"
              rows={3}
              placeholder="Describe the condition, specifications, and features of the gear..."
              value={formData.description}
              onChange={handleChange}
              required
              className="flex w-full rounded-xl border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all shadow-xs resize-none"
            />
          </div>

          {/* Availability Checkbox Card */}
          <div className="flex items-center space-x-3 bg-muted/40 p-4 rounded-2xl border border-border transition-colors hover:bg-muted/60">
            <input
              type="checkbox"
              id="isAvailable"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleChange}
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary accent-primary cursor-pointer"
            />
            <label
              htmlFor="isAvailable"
              className="text-sm font-medium leading-none cursor-pointer flex items-center gap-2 text-foreground"
            >
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span>Visible & Available for immediate rent</span>
            </label>
          </div>
        </form>

        <DialogFooter className="pt-4 border-t border-border flex flex-col sm:flex-row gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={updateMutation.isPending}
            className="w-full sm:w-auto h-11 rounded-xl border-border hover:bg-muted/50 font-medium"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="edit-gear-form"
            disabled={updateMutation.isPending}
            className="w-full sm:w-auto h-11 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-md transition-all gap-2"
          >
            {updateMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
