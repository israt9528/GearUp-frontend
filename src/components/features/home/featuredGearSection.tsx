"use client";

import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, ShieldCheck, Package, Star } from "lucide-react";
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
    <section className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1.5 rounded-full inline-block mb-2">
            Trending Catalog
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-blue-950">
            Featured Equipment
          </h2>
          <p className="text-sm text-muted-foreground">
            Handpicked professional gear available for immediate rental booking.
          </p>
        </div>
        <Link href="/gear">
          <Button variant="outline" className="gap-2 rounded-xl">
            View All Gear <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      {isPending ? (
        <div className="text-center py-16 text-muted-foreground">
          Loading featured equipment...
        </div>
      ) : featuredGear.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          No featured items available right now.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredGear.map((gear) => (
            <Card
              key={gear.id}
              className="border-border shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden flex flex-col justify-between group bg-card"
            >
              <div>
                <div className="relative h-48 w-full bg-muted overflow-hidden">
                  {gear.imageUrl ? (
                    <Image
                      src={gear.imageUrl}
                      alt={gear.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-blue-500/5 text-blue-600">
                      <Package className="h-12 w-12 opacity-50" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-amber-500 text-white border-0 shadow-md gap-1 font-medium">
                      <Star className="h-3 w-3 fill-white" /> Featured
                    </Badge>
                  </div>
                </div>

                <CardHeader className="space-y-2 pt-5">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-medium">
                      {typeof gear.category === "object" &&
                      gear.category !== null
                        ? gear.category.name
                        : "Equipment"}
                    </span>
                    <span className="font-bold text-primary font-mono text-sm">
                      ${gear.price} / day
                    </span>
                  </div>
                  <CardTitle className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {gear.name}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 text-sm text-muted-foreground leading-relaxed">
                    {gear.description ||
                      "Professional-grade gear ready for your next project."}
                  </CardDescription>
                </CardHeader>
              </div>

              <CardFooter className="pt-4 pb-6 px-6 border-t border-border/60 bg-muted/20 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-green-600" />
                  <span>Verified Provider</span>
                </div>
                <Link href={`/gear/${gear.id}`}>
                  <Button
                    size="sm"
                    className="rounded-xl gap-1.5 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 text-white shadow-sm"
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
