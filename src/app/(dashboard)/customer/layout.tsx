"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProtectedRoute } from "@/components/auth/protectedRoute";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const sidebarLinks = [
    {
      name: "My Rentals",
      href: "/customer",
      icon: LayoutDashboard,
    },
    {
      name: "Payment History",
      href: "/customer/payments",
      icon: CreditCard,
    },
  ];

  return (
    <ProtectedRoute allowedRoles={["CUSTOMER"]}>
      <div className="flex min-h-screen bg-muted/40">
        {/* Sidebar */}
        <aside className="hidden w-64 flex-col border-r bg-background p-6 md:flex">
          <div className="flex items-center gap-2 mb-8 px-2">
            <span className="font-bold text-xl tracking-tight">
              Customer Portal
            </span>
          </div>
          <nav className="space-y-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
