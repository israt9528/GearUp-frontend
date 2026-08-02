"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { LayoutDashboard, LogOut, Compass, Info, Mail } from "lucide-react";
import { Logo } from "../common/logo";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);

  // FIX 1: Remove the setTimeout. Just set to true immediately on mount.

  useEffect(() => {
    // Defer the state update to the next tick to prevent synchronous cascading renders
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/login");
  };

  const getDashboardLink = () => {
    if (!user) return "/";
    switch (user.role) {
      case "ADMIN":
        return "/admin";
      case "PROVIDER":
        return "/provider";
      case "CUSTOMER":
        return "/customer";
      default:
        return "/";
    }
  };

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      <div className="container mx-auto w-full max-w-7xl px-5 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Logo />

        {/* Navigation Links with Active CSS */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={`flex items-center gap-1.5 text-sm text-blue-950 font-medium transition-colors ${
              pathname === "/"
                ? "font-bold border-b-2 border-blue-950 pb-0.5"
                : "hover:border-b-2 border-blue-950"
            }`}
          >
            <Compass className="h-4 w-4" />
            Home
          </Link>
          <Link
            href="/gear"
            className={`flex items-center gap-1.5 text-sm text-blue-950 font-medium transition-colors ${
              pathname === "/gear"
                ? "font-bold border-b-2 border-blue-950 pb-0.5"
                : "hover:border-b-2 border-blue-950"
            }`}
          >
            <Compass className="h-4 w-4" />
            Browse Gear
          </Link>
          <Link
            href="/about"
            className={`flex items-center gap-1.5 text-sm text-blue-950 font-medium transition-colors ${
              pathname === "/about"
                ? "font-bold border-b-2 border-blue-950 pb-0.5"
                : "hover:border-b-2 border-blue-950"
            }`}
          >
            <Info className="h-4 w-4" />
            About Us
          </Link>
          <Link
            href="/contact"
            className={`flex items-center gap-1.5 text-sm text-blue-950 font-medium transition-colors ${
              pathname === "/contact"
                ? "font-bold border-b-2 border-blue-950 pb-0.5"
                : "hover:border-b-2 border-blue-950"
            }`}
          >
            <Mail className="h-4 w-4" />
            Contact Us
          </Link>
        </div>

        {/* Right Side Actions / User Profile */}
        <div className="flex items-center gap-4">
          <div className="flex md:hidden items-center gap-3">
            <Link
              href="/"
              className={`text-xs text-blue-950 font-medium transition-colors ${
                pathname === "/"
                  ? "font-bold border-b border-blue-950 pb-0.5"
                  : "hover:border-b-2 border-blue-950"
              }`}
            >
              Home
            </Link>
            <Link
              href="/gear"
              className={`text-xs text-blue-950 font-medium transition-colors ${
                pathname === "/gear"
                  ? "font-bold border-b border-blue-950 pb-0.5"
                  : "hover:border-b-2 border-blue-950"
              }`}
            >
              Browse
            </Link>
            <Link
              href="/about"
              className={`text-xs text-blue-950 font-medium transition-colors ${
                pathname === "/about"
                  ? "font-bold border-b border-blue-950 pb-0.5"
                  : "hover:border-b-2 border-blue-950"
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`text-xs text-blue-950 font-medium transition-colors ${
                pathname === "/contact"
                  ? "font-bold border-b border-blue-950 pb-0.5"
                  : "hover:border-b-2 border-blue-950"
              }`}
            >
              Contact
            </Link>
          </div>

          {/* FIX 2: Stable Wrapper with a Skeleton Fallback for Auth State */}
          <div className="flex items-center justify-end min-w-32.5">
            {!isMounted ? (
              // Skeleton shown during SSR and initial hydration to prevent layout shift
              <div className="flex gap-2">
                <div className="h-9 w-16 rounded-md bg-slate-100 dark:bg-slate-800 animate-pulse" />
                <div className="h-9 w-20 rounded-md bg-slate-100 dark:bg-slate-800 animate-pulse" />
              </div>
            ) : isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 focus:outline-none rounded-full ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <Avatar className="h-9 w-9 border border-border transition-transform hover:scale-105">
                      <AvatarImage src={""} alt={user.name || "User"} />
                      <AvatarFallback className="bg-indigo-600 text-white font-semibold text-xs">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-foreground">
                        {user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link
                        href={getDashboardLink()}
                        className="cursor-pointer flex w-full items-center"
                      >
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/50"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="font-medium">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    size="sm"
                    className="font-medium bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-sm"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
