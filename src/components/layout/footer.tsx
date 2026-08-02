"use client";

import Link from "next/link";
import { Compass, Info, Mail, Heart, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-200 border-t border-slate-800/85 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-5 space-y-12">
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo />
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              The premier equipment rental ecosystem connecting professional
              creators, studios, and independent artists directly with trusted
              local gear providers.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full font-medium">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                Platform Online & Secure
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link
                  href="/gear"
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <Compass className="h-4 w-4" /> Browse Gear
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <Info className="h-4 w-4" /> About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <Mail className="h-4 w-4" /> Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Policies */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Support & Legal
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link
                  href="/terms"
                  className="hover:text-primary transition-colors flex items-center gap-1"
                >
                  Terms of Service{" "}
                  <ArrowUpRight className="h-3 w-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-primary transition-colors flex items-center gap-1"
                >
                  Privacy Policy <ArrowUpRight className="h-3 w-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-primary transition-colors"
                >
                  Rental FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Stay Updated
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Subscribe to get special equipment drops, rental deals, and
              platform updates.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-10 bg-slate-900 border-slate-800 text-white placeholder:text-slate-500 rounded-xl focus-visible:ring-primary"
              />
              <Button
                type="submit"
                size="sm"
                className="w-full rounded-xl bg-primary hover:bg-primary/90 text-white font-medium"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {currentYear} GearRental Platform. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with{" "}
            <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" /> for
            modern creators.
          </p>
        </div>
      </div>
    </footer>
  );
}
