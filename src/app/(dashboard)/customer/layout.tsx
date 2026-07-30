import { ProtectedRoute } from "@/components/auth/protectedRoute";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["CUSTOMER"]}>
      <div className="min-h-[calc(100vh-64px)] bg-gray-50/50">{children}</div>
    </ProtectedRoute>
  );
}
