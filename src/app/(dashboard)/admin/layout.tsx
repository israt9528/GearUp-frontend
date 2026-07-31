"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Tags,
  Users,
  Package,
  ShoppingCart,
} from "lucide-react";
import { ProtectedRoute } from "@/components/auth/protectedRoute";

const sidebarLinks = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Categories", href: "/admin/categories", icon: Tags },
  { name: "Manage Users", href: "/admin/users", icon: Users },
  { name: "System Gear", href: "/admin/gear", icon: Package },
  { name: "All Rentals", href: "/admin/rentals", icon: ShoppingCart },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* SIDEBAR */}
        <aside className="w-64 border-r bg-white shrink-0 hidden md:block">
          <div className="h-full py-6 px-4 flex flex-col">
            <div className="mb-6 px-2">
              <h2 className="text-lg font-bold tracking-tight text-gray-900">
                Admin Panel
              </h2>
            </div>

            <nav className="space-y-1.5 flex-1">
              {sidebarLinks.map((link) => {
                // Check if the current URL matches the link to highlight the active tab
                const isActive = pathname === link.href;
                const Icon = link.icon;

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 ${isActive ? "text-primary" : "text-gray-400"}`}
                    />
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 bg-gray-50/50">
          <div className="p-8 h-full">{children}</div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
