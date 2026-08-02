"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-16 px-10 rounded-3xl shadow-2xl border border-white/10 group">
      {/* Background Image with Dark Professional Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=2000')`,
        }}
      >
        {/* Multi-layered gradient overlay for premium depth & text contrast */}
        <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-900/80 to-blue-950/70 backdrop-blur-[2px]" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <div className="space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-blue-200 border border-white/20 shadow-sm mx-auto lg:mx-0">
            <Sparkles className="h-4 w-4 text-amber-300" />
            <span>The Ultimate Creator Rental Ecosystem</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
            Professional Gear, <br />
            <span className="bg-linear-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Without the Price Tag.
            </span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Connect directly with verified local equipment providers. Rent
            cameras, cinema lighting, audio gear, and more instantly for your
            next big project.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <Link href="/gear">
              <Button className="h-12 px-8 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg gap-2 w-full sm:w-auto transition-all">
                Browse Catalog <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                variant="outline"
                className="h-12 px-8 rounded-xl border-white/30 hover:text-blue-800 bg-white font-medium w-full sm:w-auto backdrop-blur-sm transition-all"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Glassmorphism Card Showcase */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none h-72 sm:h-96 rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-white/5 backdrop-blur-md flex items-center justify-center p-8 group-hover:border-white/40 transition-all">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-size-[16px_16px] opacity-10" />
          <div className="relative z-10 text-center space-y-4">
            <div className="h-20 w-20 rounded-3xl bg-white/15 backdrop-blur-md text-amber-300 flex items-center justify-center mx-auto shadow-inner border border-white/30">
              <Package className="h-10 w-10 animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Over 2,500+ Active Listings
            </h3>
            <p className="text-sm text-slate-200 max-w-xs mx-auto leading-relaxed">
              Verified providers, secure booking guarantees, and instant
              fulfillment tracking.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
