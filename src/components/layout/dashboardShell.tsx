"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  CreditCard,
  Users,
  PackageCheck,
  LucideIcon,
  Package,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/common/logo";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";

export interface NavItemConfig {
  title: string;
  href: string;
  iconName:
    | "LayoutDashboard"
    | "CreditCard"
    | "Users"
    | "PackageCheck"
    | "Package";
}

interface DashboardShellProps {
  children: React.ReactNode;
  navItems: NavItemConfig[];
  portalName: string;
}

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  CreditCard,
  Users,
  PackageCheck,
  Package,
};

const getInitials = (name?: string): string => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

function Sidebar({
  pathname,
  navItems,
}: {
  pathname: string;
  navItems: NavItemConfig[];
}) {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white shadow-sm flex-col z-40">
      <div className="h-20 flex items-center px-8 border-b border-slate-200 dark:border-slate-800">
        <Logo />
      </div>

      <nav className="flex-1 px-5 py-8 space-y-2">
        {navItems.map((item) => {
          const Icon = iconMap[item.iconName] || LayoutDashboard;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200",
                active
                  ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white",
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-5">
        <div className="rounded-2xl bg-slate-800 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4">
          {user ? (
            <h3 className="font-semibold text-white">{user.role} Portal</h3>
          ) : (
            <></>
          )}
          <p className="text-sm text-slate-50 dark:text-slate-400">
            Active Account
          </p>
          <Button
            onClick={handleLogout}
            variant="secondary"
            className="mt-5 w-full"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
}

function MobileSidebar({ navItems }: { navItems: NavItemConfig[] }) {
  const pathname = usePathname();
  const { logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="lg:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-72 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white p-0 flex flex-col"
      >
        <div className="h-20 flex items-center px-6 border-b border-slate-200 dark:border-slate-800">
          <Logo />
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = iconMap[item.iconName] || LayoutDashboard;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 transition",
                  active
                    ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white",
                )}
              >
                <Icon className="h-5 w-5" />
                {item.title}
              </Link>
            );
          })}
        </nav>
        <div className="p-5 border-t border-slate-200 dark:border-slate-800">
          <Button className="w-full" variant="secondary" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function DashboardHeader({
  portalName,
  navItems,
}: {
  portalName: string;
  navItems: NavItemConfig[];
}) {
  const { isAuthenticated, user, logout } = useAuthStore();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-30">
      <div className="mx-4 mt-4 rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-xl shadow-sm dark:bg-slate-900/80 dark:border-slate-800">
        <div className="flex h-16 items-center justify-between px-5">
          <div className="flex items-center gap-4">
            <MobileSidebar navItems={navItems} />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold">{portalName}</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Welcome back 👋
              </p>
            </div>
          </div>

          <div className="hidden lg:flex w-full max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input placeholder="Search..." className="pl-10 rounded-xl" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost">
              <Bell className="h-5 w-5" />
            </Button>
            <Link href="/">
              <Button variant="outline" className="hidden md:flex">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>

            {isMounted && isAuthenticated && user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 focus:outline-none rounded-full">
                    <Avatar className="h-9 w-9 border border-gray-200 transition-transform hover:scale-105">
                      <AvatarImage src="" alt={user.name || "User"} />
                      <AvatarFallback className="bg-blue-700 text-white font-semibold text-xs">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-gray-900 dark:text-white">
                        {user.name}
                      </p>
                      <p className="text-xs leading-none text-gray-500 truncate">
                        {user.email}
                      </p>
                      <p className="text-xs py-2 leading-none text-gray-500 uppercase font-semibold">
                        {user.role}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-red-600 focus:text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export function DashboardShell({
  children,
  navItems,
  portalName,
}: DashboardShellProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar pathname={pathname} navItems={navItems} />
      <div className="lg:ml-72 flex min-h-screen flex-col">
        <DashboardHeader portalName={portalName} navItems={navItems} />
        <main className="flex-1 p-4 md:p-6 lg:p-7">
          <div className="mx-auto max-w-7xl">
            <div className=" dark:border-slate-800 dark:bg-slate-900">
              <div className="p-5">{children}</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
