import Link from "next/link";
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
import Image from "next/image";

interface GearCardProps {
  gear: GearItem;
}

export function GearCard({ gear }: GearCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-shadow hover:shadow-lg">
      <div className="relative h-48 w-full bg-gray-100">
        <Image
          src={
            gear.imageUrl ||
            "https://images.unsplash.com/photo-1515523110800-9415d13b84a8?q=80&w=600&auto=format&fit=crop"
          }
          alt={gear.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge variant={gear.isAvailable ? "default" : "secondary"}>
            {gear.isAvailable ? "Available" : "Rented"}
          </Badge>
        </div>
      </div>

      <CardHeader className="p-4 flex-none">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="line-clamp-1 text-lg">{gear.name}</CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              {typeof gear.category === "object" && gear.category !== null
                ? gear.category.name
                : gear.category}
            </p>
          </div>
          <div className="text-right">
            <span className="font-bold text-lg">${gear.pricePerDay}</span>
            <span className="text-sm text-gray-500">/day</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0 grow">
        <p className="text-sm text-gray-600 line-clamp-2">{gear.description}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0 mt-auto">
        <Link href={`/gear/${gear.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
