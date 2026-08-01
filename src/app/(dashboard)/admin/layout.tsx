import { ProtectedRoute } from "@/components/auth/protectedRoute";
import {
  DashboardShell,
  NavItemConfig,
} from "@/components/layout/dashboardShell";

const adminNav: NavItemConfig[] = [
  { title: "Overview", href: "/admin", iconName: "LayoutDashboard" },
  { title: "Categories", href: "/admin/categories", iconName: "Tags" },
  { title: "Manage Users", href: "/admin/users", iconName: "Users" },
  { title: "System Gear", href: "/admin/gear", iconName: "Package" },
  { title: "All Rentals", href: "/admin/rentals", iconName: "ShoppingCart" },
];
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <DashboardShell navItems={adminNav} portalName="Admin Dashboard">
        {children}
      </DashboardShell>
    </ProtectedRoute>
  );
}
