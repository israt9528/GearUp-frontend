"use client";

import { Search, CalendarDays, Rocket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Browse & Discover",
      description:
        "Explore our extensive catalog of professional-grade equipment, lenses, and gear from trusted local providers.",
      icon: Search,
      gradient: "from-blue-500/15 via-indigo-500/10 to-transparent",
      borderColor: "group-hover:border-blue-500/40",
      iconBg:
        "bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white",
      stepColor: "text-blue-500/30",
    },
    {
      step: "02",
      title: "Select Dates & Book",
      description:
        "Choose your exact rental duration, review transparent instant pricing calculations, and submit your booking request.",
      icon: CalendarDays,
      gradient: "from-purple-500/15 via-indigo-500/10 to-transparent",
      borderColor: "group-hover:border-purple-500/40",
      iconBg:
        "bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white",
      stepColor: "text-purple-500/30",
    },
    {
      step: "03",
      title: "Create & Return",
      description:
        "Pick up your gear, bring your creative vision to life on set or in the studio, and return it hassle-free.",
      icon: Rocket,
      gradient: "from-amber-500/15 via-orange-500/10 to-transparent",
      borderColor: "group-hover:border-amber-500/40",
      iconBg:
        "bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:bg-amber-600 group-hover:text-white",
      stepColor: "text-amber-500/30",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-muted/50 via-muted/30 to-background border-y border-border py-20 px-4 sm:px-6 rounded-3xl shadow-xs">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full inline-block border border-primary/20 shadow-xs">
            Simple Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-blue-950">
            How Rental Works
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Get your hands on professional equipment and start creating in three
            straightforward, secure steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <Card
                key={idx}
                className={`relative overflow-hidden border border-border ${s.borderColor} shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl p-8 bg-card group flex flex-col justify-between`}
              >
                {/* Background color gradient overlay */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${s.gradient} opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none`}
                />

                <CardContent className="p-0 space-y-6 relative z-10">
                  <div className="flex items-center justify-between">
                    <div
                      className={`h-14 w-14 rounded-2xl ${s.iconBg} transition-all duration-300 flex items-center justify-center shadow-inner group-hover:scale-110`}
                    >
                      <Icon className="h-7 w-7" />
                    </div>
                    <span
                      className={`text-4xl font-extrabold font-mono ${s.stepColor} group-hover:text-primary/40 transition-colors`}
                    >
                      {s.step}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
