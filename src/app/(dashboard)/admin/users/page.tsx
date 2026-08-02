"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Users, ShieldCheck, UserX, UserCheck } from "lucide-react";
import { toast } from "sonner";
import { adminApi } from "@/api/admin.api";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AdminUsersSkeleton } from "@/components/skeletons/adminUsersSkeleton";

const getInitials = (name?: string): string => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export default function AdminUsersPage() {
  const queryClient = useQueryClient();

  const { data: usersData, isPending } = useQuery({
    queryKey: ["admin-users"],
    queryFn: adminApi.getAllUsers,
  });

  const toggleUserStatus = useMutation({
    mutationFn: adminApi.updateUserStatus,
    onSuccess: () => {
      toast.success("User status updated successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  if (isPending) {
    return <AdminUsersSkeleton />;
  }

  const users = usersData?.data || [];
  const activeCount = users.filter((u) => !u.isSuspended).length;
  const suspendedCount = users.filter((u) => u.isSuspended).length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-blue-950 flex items-center gap-2">
            <Users className="h-6 w-6 text-blue-950" /> User Management
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Monitor registered platform users, review account roles, and manage
            access status.
          </p>
        </div>

        {/* Mini Stats Badges */}
        <div className="flex items-center gap-2">
          <div className="bg-background border border-border px-3.5 py-2 rounded-xl text-xs flex items-center gap-2 shadow-xs">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-muted-foreground">Active:</span>
            <span className="font-bold text-foreground">{activeCount}</span>
          </div>
          <div className="bg-background border border-border px-3.5 py-2 rounded-xl text-xs flex items-center gap-2 shadow-xs">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            <span className="text-muted-foreground">Suspended:</span>
            <span className="font-bold text-foreground">{suspendedCount}</span>
          </div>
        </div>
      </div>

      <Card className="border-border shadow-sm overflow-hidden">
        <CardHeader className="bg-muted/30 border-b border-border px-6 py-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg text-blue-950">
                Registered Accounts
              </CardTitle>
              <CardDescription className="mt-0.5">
                Complete directory of customers, providers, and administrators.
              </CardDescription>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground bg-background px-3 py-1.5 rounded-lg border border-border font-medium">
              <ShieldCheck className="h-4 w-4 text-indigo-600" />
              <span>{users.length} Total Users</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {users.length === 0 ? (
            <div className="text-center py-16 px-4 space-y-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-base">No users found</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                There are no registered user profiles on the platform at the
                moment.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-indigo-100/50">
                  <TableRow>
                    <TableHead className="py-4 px-6 font-semibold text-blue-950">
                      User Details
                    </TableHead>
                    <TableHead className="py-4 px-6 font-semibold text-blue-950">
                      Role
                    </TableHead>
                    <TableHead className="py-4 px-6 font-semibold text-blue-950">
                      Status
                    </TableHead>
                    <TableHead className="py-4 px-6 text-right font-semibold text-blue-950">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow
                      key={user.id}
                      className="hover:bg-blue-100/50 transition-colors border-b border-border last:border-0"
                    >
                      {/* User Info with Avatar */}
                      <TableCell className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9 border border-border">
                            <AvatarFallback className="bg-indigo-600 text-white font-semibold text-xs">
                              {getInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold text-foreground">
                              {user.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      {/* Role Badge */}
                      <TableCell className="py-4 px-6">
                        <Badge
                          variant="outline"
                          className="font-mono uppercase text-xs"
                        >
                          {user.role}
                        </Badge>
                      </TableCell>

                      {/* Status Badge */}
                      <TableCell className="py-4 px-6">
                        {user.isSuspended ? (
                          <Badge
                            variant="destructive"
                            className="gap-1 shadow-none border-0 font-medium"
                          >
                            <UserX className="h-3.5 w-3.5" /> Suspended
                          </Badge>
                        ) : (
                          <Badge className="bg-green-500 hover:bg-green-600 text-white gap-1 shadow-none border-0 font-medium">
                            <UserCheck className="h-3.5 w-3.5" /> Active
                          </Badge>
                        )}
                      </TableCell>

                      {/* Action Button */}
                      <TableCell className="py-4 px-6 text-right">
                        <Button
                          size="sm"
                          variant={user.isSuspended ? "default" : "destructive"}
                          className={`shadow-sm transition-all ${
                            user.isSuspended
                              ? "bg-blue-600 hover:bg-blue-700 text-white"
                              : "bg-red-600 hover:bg-red-700 text-white"
                          }`}
                          onClick={() =>
                            toggleUserStatus.mutate({
                              id: user.id,
                              isSuspended: !user.isSuspended,
                            })
                          }
                          disabled={toggleUserStatus.isPending}
                        >
                          {toggleUserStatus.isPending ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : user.isSuspended ? (
                            "Activate"
                          ) : (
                            "Suspend"
                          )}
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
    </div>
  );
}
