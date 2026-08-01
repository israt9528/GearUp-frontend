import {
  DashboardShell,
  NavItemConfig,
} from "@/components/layout/dashboardShell";

const customerNav: NavItemConfig[] = [
  { title: "Overview", href: "/customer", iconName: "LayoutDashboard" },
  { title: "My Rentals", href: "/customer/rentals", iconName: "Package" },
  {
    title: "Payment History",
    href: "/customer/payments",
    iconName: "CreditCard",
  },
];

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell navItems={customerNav} portalName="Customer Dashboard">
      {children}
    </DashboardShell>
  );
}
