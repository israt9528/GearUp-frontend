"use client";

import {
  ShieldCheck,
  Headphones,
  Zap,
  RefreshCw,
  Award,
  HeartHandshake,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function WhyChooseUsSection() {
  const features = [
    {
      title: "Verified Equipment & Providers",
      description:
        "Every item and provider on our network goes through strict vetting to ensure top-tier quality and reliability.",
      icon: ShieldCheck,
      gradient: "from-blue-500/15 via-indigo-500/10 to-transparent",
      borderColor: "group-hover:border-blue-500/40",
      iconBg:
        "bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white",
    },
    {
      title: "Instant Date Calculation",
      description:
        "Seamlessly select your rental period with real-time pricing breakdowns and transparent fee structures.",
      icon: Zap,
      gradient: "from-purple-500/15 via-pink-500/10 to-transparent",
      borderColor: "group-hover:border-purple-500/40",
      iconBg:
        "bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white",
    },
    {
      title: "24/7 Creator Support",
      description:
        "Our dedicated support team is online around the clock to assist you with bookings, pickups, and technical queries.",
      icon: Headphones,
      gradient: "from-amber-500/15 via-orange-500/10 to-transparent",
      borderColor: "group-hover:border-amber-500/40",
      iconBg:
        "bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:bg-amber-600 group-hover:text-white",
    },
    {
      title: "Platform Protection Guarantee",
      description:
        "Rent with complete peace of mind knowing all bookings are backed by our comprehensive coverage safety net.",
      icon: Award,
      gradient: "from-emerald-500/15 via-teal-500/10 to-transparent",
      borderColor: "group-hover:border-emerald-500/40",
      iconBg:
        "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white",
    },
    {
      title: "Flexible Extensions",
      description:
        "Need your gear for a few extra days on set? Easily request booking modifications directly through your dashboard.",
      icon: RefreshCw,
      gradient: "from-cyan-500/15 via-blue-500/10 to-transparent",
      borderColor: "group-hover:border-cyan-500/40",
      iconBg:
        "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 group-hover:bg-cyan-600 group-hover:text-white",
    },
    {
      title: "Community-Driven Ecosystem",
      description:
        "Join thousands of independent creators, studios, and local gear owners building the future of production together.",
      icon: HeartHandshake,
      gradient: "from-rose-500/15 via-pink-500/10 to-transparent",
      borderColor: "group-hover:border-rose-500/40",
      iconBg:
        "bg-rose-500/10 text-rose-600 dark:text-rose-400 group-hover:bg-rose-600 group-hover:text-white",
    },
  ];

  return (
    <section className="space-y-12 py-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-mono font-semibold uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full inline-block border border-primary/20 shadow-xs">
          Why Choose Us
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-blue-950">
          Built Specifically for Modern Creators
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          We provide the most secure, streamlined, and reliable equipment rental
          experience on the market.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <Card
              key={idx}
              className={`relative overflow-hidden border border-border ${feature.borderColor} shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl p-8 bg-card group flex flex-col justify-between`}
            >
              {/* Subtle background color gradient overlay */}
              <div
                className={`absolute inset-0 bg-linear-to-br ${feature.gradient} opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none`}
              />

              <CardContent className="p-0 space-y-6 relative z-10">
                <div
                  className={`h-14 w-14 rounded-2xl ${feature.iconBg} transition-all duration-300 flex items-center justify-center shadow-inner group-hover:scale-110`}
                >
                  <Icon className="h-7 w-7" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
