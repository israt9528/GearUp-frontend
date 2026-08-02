"use client";

import Link from "next/link";
import { Camera, Mic, SunMedium, Plane, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function CategoriesSection() {
  const categories = [
    {
      name: "Cameras & Lenses",
      count: "450+ items",
      icon: Camera,
      href: "/gear",
      gradient: "from-blue-500/15 via-indigo-500/10 to-transparent",
      borderColor: "group-hover:border-blue-500/40",
      iconBg:
        "bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white",
      badgeColor: "text-blue-600 dark:text-blue-400",
    },
    {
      name: "Audio & Microphones",
      count: "230+ items",
      icon: Mic,
      href: "/gear",
      gradient: "from-purple-500/15 via-pink-500/10 to-transparent",
      borderColor: "group-hover:border-purple-500/40",
      iconBg:
        "bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white",
      badgeColor: "text-purple-600 dark:text-purple-400",
    },
    {
      name: "Lighting & Studio",
      count: "310+ items",
      icon: SunMedium,
      href: "/gear",
      gradient: "from-amber-500/15 via-orange-500/10 to-transparent",
      borderColor: "group-hover:border-amber-500/40",
      iconBg:
        "bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:bg-amber-600 group-hover:text-white",
      badgeColor: "text-amber-600 dark:text-amber-400",
    },
    {
      name: "Drones & Aerial",
      count: "120+ items",
      icon: Plane,
      href: "/gear",
      gradient: "from-emerald-500/15 via-teal-500/10 to-transparent",
      borderColor: "group-hover:border-emerald-500/40",
      iconBg:
        "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white",
      badgeColor: "text-emerald-600 dark:text-emerald-400",
    },
  ];

  return (
    <section className="space-y-10">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-mono font-semibold uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full inline-block border border-primary/20 shadow-xs">
          Explore Categories
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-blue-950">
          Find Gear by Equipment Type
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Jump straight into specialized professional equipment categories that
          match your exact creative production workflow.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <Link key={idx} href={cat.href}>
              <Card
                className={`relative overflow-hidden border border-border ${cat.borderColor} shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl p-6 group bg-card cursor-pointer flex flex-col justify-between h-full`}
              >
                {/* Subtle colored background gradient effect */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${cat.gradient} opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none`}
                />

                <CardContent className="p-0 space-y-6 relative z-10 flex flex-col justify-between h-full">
                  <div className="flex items-center justify-between">
                    <div
                      className={`h-14 w-14 rounded-2xl ${cat.iconBg} transition-all duration-300 flex items-center justify-center shadow-inner group-hover:scale-110`}
                    >
                      <Icon className="h-7 w-7" />
                    </div>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-xs border border-border/60 ${cat.badgeColor}`}
                    >
                      {cat.count}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="font-bold text-foreground text-xl group-hover:text-primary transition-colors tracking-tight">
                      {cat.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors pt-1">
                      <span>Explore collection</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
