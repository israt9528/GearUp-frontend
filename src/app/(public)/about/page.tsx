"use client";

import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  Users,
  Package,
  Award,
  ArrowRight,
  HeartHandshake,
  Globe2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  const stats = [
    { label: "Active Equipment", value: "2,500+", icon: Package },
    { label: "Verified Providers", value: "450+", icon: ShieldCheck },
    { label: "Successful Rentals", value: "12,000+", icon: Award },
    { label: "Community Members", value: "8,500+", icon: Users },
  ];

  const values = [
    {
      title: "Quality Guaranteed",
      description:
        "Every piece of equipment listed on our platform is vetted and maintained by professional providers.",
      icon: ShieldCheck,
    },
    {
      title: "Community Driven",
      description:
        "We connect creators, studios, and independent artists directly with trusted gear owners in their area.",
      icon: HeartHandshake,
    },
    {
      title: "Seamless Experience",
      description:
        "From instant booking and secure payments to real-time status tracking, we make renting effortless.",
      icon: Globe2,
    },
  ];

  return (
    <div className="space-y-16 max-w-7xl mx-auto py-8 px-4 sm:px-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-blue-700 via-indigo-600 to-purple-600 p-3 sm:p-16 text-white shadow-xl text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-medium border border-white/20 mx-auto">
          <Sparkles className="h-4 w-4 text-amber-300" />
          <span>Empowering Creators Worldwide</span>
        </div>
        <h1 className="text-3xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight my-3">
          Redefining Equipment Rental for Modern Creators
        </h1>
        <p className="text-blue-100 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          We bridge the gap between gear owners and passionate creators. Access
          professional-grade equipment whenever you need it, without the burden
          of ownership.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/gear">
            <Button className="h-12 px-8 rounded-xl bg-white text-blue-600 hover:bg-blue-50 font-semibold shadow-md gap-2">
              Explore Catalog <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              variant="outline"
              className="h-12 px-8 rounded-xl border-white/30 text-blue-950 hover:bg-white/10 font-medium"
            >
              Get in Touch
            </Button>
          </Link>
        </div>
        {/* Abstract background glow */}
        {/* <div className="absolute right-0 top-0 translate-x-1/3 -translate-y-1/3 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" /> */}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card
              key={idx}
              className="border-border shadow-sm hover:shadow-md transition-all rounded-3xl bg-card text-center p-6"
            >
              <CardContent className="p-0 space-y-3">
                <div className="h-12 w-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center mx-auto">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold tracking-tight text-foreground">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Mission & Story Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1.5 rounded-full">
            Our Mission
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Making professional gear accessible to everyone.
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Whether you&apos;re an independent filmmaker shooting your first
            feature, a photographer capturing a milestone event, or a studio
            expanding your toolkit for a project, we believe high-end gear
            shouldn&apos;t be a barrier to creativity.
          </p>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Our platform provides secure transactions, verified user profiles,
            and comprehensive management tools so equipment providers can
            monetize their idle assets safely while creators bring their visions
            to life.
          </p>
        </div>
        <div className="relative h-72 sm:h-96 rounded-3xl overflow-hidden bg-linear-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-border flex items-center justify-center p-8">
          <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] bg-size-[16px_16px] opacity-20" />
          <div className="relative z-10 text-center space-y-4 max-w-md">
            <div className="h-16 w-16 rounded-3xl bg-primary text-white flex items-center justify-center mx-auto shadow-lg">
              <Sparkles className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-foreground">
              Built by Creators, for Creators
            </h3>
            <p className="text-sm text-muted-foreground">
              Empowering thousands of productions globally through trust,
              reliability, and cutting-edge technology.
            </p>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Why Choose Our Platform
          </h2>
          <p className="text-sm text-muted-foreground">
            We are committed to delivering a secure, reliable, and frictionless
            rental experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((value, idx) => {
            const Icon = value.icon;
            return (
              <Card
                key={idx}
                className="border-border shadow-sm hover:shadow-xl transition-all rounded-3xl p-6 sm:p-8 flex flex-col justify-between group bg-card"
              >
                <CardContent className="p-0 space-y-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors flex items-center justify-center shadow-inner">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Call to Action Banner */}
      <div className="rounded-3xl bg-muted/40 border border-border p-8 sm:p-12 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Ready to start your next project?
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
          Browse our extensive catalog of verified equipment or list your own
          gear to start earning today.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/gear">
            <Button className="h-11 px-8 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-md">
              Browse Catalog
            </Button>
          </Link>
          <Link href="/register">
            <Button
              variant="outline"
              className="h-11 px-8 rounded-xl border-border hover:bg-muted/50 font-medium"
            >
              Join as Provider
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
