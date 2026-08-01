"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  ChevronDown,
  CreditCard,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Search,
  Settings,
  User,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/common/logo";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

const navigation: NavItem[] = [
  {
    title: "Dashboard",
    href: "/customer",
    icon: LayoutDashboard,
  },
  {
    title: "Payment History",
    href: "/customer/payments",
    icon: CreditCard,
  },
];

function Sidebar({ pathname }: { pathname: string }) {
  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-72 bg-white text-white shadow-2xl flex-col">
      {/* Logo */}

      <div className="h-20 flex items-center px-8 border-b border-slate-800">
        <Logo />
      </div>

      {/* Navigation */}

      <nav className="flex-1 px-5 py-8 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;

          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200",
                active
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white",
              )}
            >
              <Icon className="h-5 w-5" />

              <span className="font-medium">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Card */}

      <div className="p-5">
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5">
          <Avatar className="h-10 w-10 ring-2 ring-blue-500/20">
            <AvatarImage src="" />

            <AvatarFallback className="bg-white">CJ</AvatarFallback>
          </Avatar>

          <h3 className="mt-4 font-semibold">Customer</h3>

          <p className="text-sm text-slate-400">Premium Account</p>

          <Button variant="secondary" className="mt-5 w-full">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
}
function MobileSidebar() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="lg:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-72 bg-slate-950 border-slate-800 text-white p-0"
      >
        {/* Logo */}

        <div className="h-20 flex items-center px-6 border-b border-slate-800">
          <Logo />
        </div>

        {/* Navigation */}

        <nav className="px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;

            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 transition",
                  active
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                    : "text-slate-300 hover:bg-slate-900 hover:text-white",
                )}
              >
                <Icon className="h-5 w-5" />

                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}

        <div className="absolute bottom-6 left-4 right-4">
          <Button className="w-full" variant="secondary">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30">
      <div className="mx-4 mt-4 rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-xl shadow-sm dark:bg-slate-900/80 dark:border-slate-800">
        <div className="flex h-16 items-center justify-between px-5">
          {/* Left */}

          <div className="flex items-center gap-4">
            <MobileSidebar />

            <div className="hidden sm:block">
              <h1 className="text-lg font-bold">Dashboard</h1>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Welcome back 👋
              </p>
            </div>
          </div>

          {/* Center */}

          <div className="hidden lg:flex w-full max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <Input placeholder="Search..." className="pl-10 rounded-xl" />
            </div>
          </div>

          {/* Right */}

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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 px-2">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-blue-600 text-white">
                      CJ
                    </AvatarFallback>
                  </Avatar>

                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium">Customer</p>

                    <p className="text-xs text-slate-500">Premium</p>
                  </div>

                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Desktop Sidebar */}
      <Sidebar pathname={pathname} />

      {/* Main Content */}
      <div className="lg:ml-72 flex min-h-screen flex-col">
        {/* Header */}
        <DashboardHeader />

        {/* Page */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {/* Content Container */}
          <div className="mx-auto max-w-7xl">
            {/* Page Card */}
            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="p-5 md:p-8">{children}</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
