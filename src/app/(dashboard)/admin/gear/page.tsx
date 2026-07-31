"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
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

export default function AdminGearPage() {
  const { data: gearData, isPending } = useQuery({
    queryKey: ["admin-gear"],
    queryFn: adminApi.getAllGear,
  });

  if (isPending)
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );

  const gearList = gearData?.data || [];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>System Gear</CardTitle>
          <CardDescription>
            Every piece of gear currently listed by providers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Provider ID</TableHead>
                <TableHead>Price/Day</TableHead>
                <TableHead>Availability</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gearList.map((gear) => (
                <TableRow key={gear.id}>
                  <TableCell className="font-medium">{gear.name}</TableCell>
                  <TableCell className="text-xs text-gray-500">
                    {gear.providerId.slice(-8)}...
                  </TableCell>
                  <TableCell>${gear.price}</TableCell>
                  <TableCell>
                    {gear.isAvailable ? (
                      <Badge className="bg-green-500">Available</Badge>
                    ) : (
                      <Badge variant="secondary">Rented/Unavailable</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
