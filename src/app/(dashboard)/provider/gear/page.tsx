"use client";

import { useState } from "react"; // Added useState
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Edit, Trash2, Plus } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

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
    queryFn: gearApi.getAllGear,
  });

  const deleteGearMutation = useMutation({
    mutationFn: gearApi.deleteGear,
    onSuccess: () => {
      toast.success("Gear deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["all-gear"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  if (isPending)
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );

  const allGear = gearData?.data || [];
  const myGear = allGear.filter((item) => item.providerId === user?.id);

  const handleDeleteGear = (id: string) => {
    if (
      confirm(
        "Are you sure you want to delete this gear? This cannot be undone.",
      )
    ) {
      deleteGearMutation.mutate(id);
    }
  };

  const handleEditClick = (item: GearItem) => {
    setSelectedGear(item);
    setIsEditModalOpen(true);
  };

  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            My Gear Inventory
          </h1>
          <p className="text-gray-500 mt-2">
            Manage all the gear you currently have listed.
          </p>
        </div>
        <Link href="/provider/gear/new">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add New Gear
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Listings</CardTitle>
          <CardDescription>Gear available on the platform.</CardDescription>
        </CardHeader>
        <CardContent>
          {myGear.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              You haven &apos t listed any gear yet.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Price/Day</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myGear.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>${item.price}</TableCell>
                    <TableCell>
                      {item.isAvailable ? (
                        <Badge className="bg-green-500">Available</Badge>
                      ) : (
                        <Badge variant="secondary">Rented/Hidden</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {/* Updated Edit Button to trigger Modal */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600"
                        onClick={() => handleEditClick(item)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600"
                        onClick={() => handleDeleteGear(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Render the Modal at the bottom */}
      {isEditModalOpen && selectedGear && (
        <EditGearModal
          key={selectedGear.id} // <--- THIS IS THE MAGIC FIX
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
