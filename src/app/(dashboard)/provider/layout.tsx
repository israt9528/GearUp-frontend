import { ProtectedRoute } from "@/components/auth/protectedRoute";
import {
  DashboardShell,
  NavItemConfig,
} from "@/components/layout/dashboardShell";

const providerNav: NavItemConfig[] = [
  { title: "Overview", href: "/provider", iconName: "LayoutDashboard" },
  { title: "My Gear Inventory", href: "/provider/gear", iconName: "Package" },
  {
    title: "Manage Orders",
    href: "/provider/orders",
    iconName: "ShoppingCart",
  },
  { title: "Add New Gear", href: "/provider/gear/new", iconName: "PlusCircle" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["PROVIDER"]}>
      <DashboardShell navItems={providerNav} portalName="Provider Dashboard">
        {children}
      </DashboardShell>
    </ProtectedRoute>
  );
}
