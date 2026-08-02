"use client";

import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  ShieldCheck,
  Package,
  Sparkles,
  Tag,
  Layers,
} from "lucide-react";
import { gearApi } from "@/api/gear.api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function FeaturedGearSection() {
  const { data: gearData, isPending } = useQuery({
    queryKey: ["home-featured-gear"],
    queryFn: () => gearApi.getAllGear(),
  });

  const allGear = gearData?.data || [];
  const featuredGear = allGear.filter((g) => g.isAvailable).slice(0, 6);

  return (
    <section className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/60 pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Curated Collection</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-blue-950">
            Featured Equipment
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl">
            Explore high-performance, professional-grade gear ready for your
            next project or adventure.
          </p>
        </div>
        <Link href="/gear">
          <Button
            variant="outline"
            className="gap-2 rounded-2xl border-border hover:bg-primary/5 hover:text-primary transition-colors"
          >
            View All Catalog <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      {isPending ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-96 w-full animate-pulse rounded-3xl bg-muted"
            />
          ))}
        </div>
      ) : featuredGear.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground bg-muted/20 rounded-3xl border border-dashed border-border">
          <Package className="h-10 w-10 mx-auto opacity-40 mb-2" />
          <p className="font-medium">No featured items available right now.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredGear.map((gear) => (
            <Card
              key={gear.id}
              className="border-border/80 shadow-xs hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden flex flex-col justify-between group bg-card relative"
            >
              <div>
                {/* Image Container */}
                <div className="relative h-56 w-full bg-muted overflow-hidden">
                  {gear.imageUrl ? (
                    <Image
                      src={gear.imageUrl}
                      alt={gear.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-blue-500/5 text-blue-600">
                      <Package className="h-12 w-12 opacity-40" />
                    </div>
                  )}

                  {/* Gradient Overlay for modern contrast */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-60" />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                    <Badge className="bg-white/90 dark:bg-slate-900/90 text-foreground backdrop-blur-md border-0 shadow-xs gap-1.5 font-medium px-3 py-1">
                      <Tag className="h-3 w-3 text-indigo-600" />
                      {typeof gear.category === "object" &&
                      gear.category !== null
                        ? gear.category.name
                        : "Equipment"}
                    </Badge>
                    <Badge className="bg-emerald-500/90 text-white backdrop-blur-md border-0 shadow-xs font-medium px-2.5 py-1">
                      Available
                    </Badge>
                  </div>
                </div>

                {/* Card Body */}
                <CardHeader className="space-y-3 pt-5 px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                      <Layers className="h-3.5 w-3.5 text-muted-foreground/70" />
                      <span>Stock: {gear.stock ?? 1} units</span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-extrabold tracking-tight text-primary font-mono">
                        ${gear.price}
                      </span>
                      <span className="text-xs text-muted-foreground ml-1">
                        / day
                      </span>
                    </div>
                  </div>

                  <CardTitle className="text-xl font-bold tracking-tight text-blue-950 group-hover:text-primary transition-colors line-clamp-1">
                    {gear.name}
                  </CardTitle>

                  <CardDescription className="line-clamp-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {gear.description ||
                      "Professional-grade hardware curated and verified for your exact workflow requirements."}
                  </CardDescription>
                </CardHeader>
              </div>

              {/* Card Footer */}
              <CardFooter className="pt-4 pb-5 px-6 border-t border-border/50 bg-muted/10 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span className="font-medium">Verified Partner</span>
                </div>
                <Link href={`/gear/${gear.id}`}>
                  <Button
                    size="sm"
                    className="rounded-xl gap-1.5 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xs font-medium px-4"
                  >
                    Details <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
