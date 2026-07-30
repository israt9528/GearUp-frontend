import { ProtectedRoute } from "@/components/auth/protectedRoute";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <div className="min-h-[calc(100vh-64px)] bg-gray-50/50">{children}</div>
    </ProtectedRoute>
  );
}
