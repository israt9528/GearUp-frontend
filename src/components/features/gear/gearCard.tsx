import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";

import { GearItem } from "@/types/gear.types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface GearCardProps {
  gear: GearItem;
}

export function GearCard({ gear }: GearCardProps) {
  const categoryName =
    typeof gear.category === "object" && gear.category !== null
      ? gear.category.name
      : gear.category;

  return (
    <Card className="group h-full gap-0 overflow-hidden rounded-2xl border border-sky-100 bg-white py-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl">
      <div className="relative h-44 w-full overflow-hidden bg-sky-50">
        <Image
          src={
            gear.imageUrl ||
            "https://images.unsplash.com/photo-1515523110800-9415d13b84a8?q=80&w=600&auto=format&fit=crop"
          }
          alt={gear.name}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
          <Badge className="bg-white/90 text-slate-700 shadow-sm backdrop-blur hover:bg-white">
            {categoryName || "Gear"}
          </Badge>
          <Badge
            className={
              gear.isAvailable
                ? "bg-emerald-600 text-white shadow-sm hover:bg-emerald-600"
                : "bg-amber-500 text-white shadow-sm hover:bg-amber-500"
            }
          >
            {gear.isAvailable ? "Available" : "Rented"}
          </Badge>
        </div>
      </div>

      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="line-clamp-1 text-base font-semibold text-slate-950">
              {gear.name}
            </CardTitle>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
              <Package className="h-3.5 w-3.5 text-sky-600" />
              <span>Stock {gear.stock || 0}</span>
            </div>
          </div>

          <div className="shrink-0 rounded-xl bg-emerald-50 px-3 py-2 text-right">
            <p className="text-lg font-bold leading-none text-emerald-700">
              ${gear.price}
            </p>
            <p className="mt-1 text-xs font-medium text-emerald-600">/ day</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="grow px-4 pb-4 pt-0">
        <p className="line-clamp-2 text-sm leading-6 text-slate-600">
          {gear.description}
        </p>
      </CardContent>

      <CardFooter className="mt-auto border-t border-sky-100 bg-sky-50/60 p-3">
        <Link href={`/gear/${gear.id}`} className="w-full">
          <Button className="h-9 w-full bg-blue-950/90 text-white hover:bg-blue-800">
            View details
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
