import { ProtectedRoute } from "@/components/auth/protectedRoute";

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["PROVIDER"]}>
      <div className="min-h-[calc(100vh-64px)] bg-gray-50/50">{children}</div>
    </ProtectedRoute>
  );
}
