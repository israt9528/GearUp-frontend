import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "GearUp made it so easy to rent professional photography equipment for our weekend shoot. The pickup process was seamless!",
    author: "Sarah Jenkins",
    role: "Freelance Photographer",
    rating: 5,
  },
  {
    quote:
      "As a provider, renting out my underutilized water sports gear brings in solid extra monthly revenue. The platform handles everything.",
    author: "Marcus Vance",
    role: "Verified Equipment Provider",
    rating: 5,
  },
  {
    quote:
      "The interface is lightning fast, payments are secure via Stripe, and support is top-notch. My go-to platform for project gear.",
    author: "David Ross",
    role: "Videographer & Creator",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight text-blue-950">
          Trusted by Creators & Providers
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          See what community members are saying about their renting and lending
          experience on GearUp.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((item, index) => (
          <Card
            key={index}
            className="border-border shadow-sm hover:shadow-md transition-all duration-200 relative flex flex-col justify-between"
          >
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-primary/10" />
              </div>
              <p className="text-sm text-foreground/80 italic leading-relaxed">
                &ldquo;{item.quote}&rdquo;
              </p>
            </CardContent>
            <div className="p-6 pt-0 border-t border-border/55 mt-4 flex items-center justify-between bg-muted/20 rounded-b-xl">
              <div>
                <p className="font-semibold text-sm text-foreground">
                  {item.author}
                </p>
                <p className="text-xs text-muted-foreground">{item.role}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
