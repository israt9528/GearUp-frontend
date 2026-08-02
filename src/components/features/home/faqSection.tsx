import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How does the rental payment process work?",
    answer:
      "All payments are securely processed online via Stripe. When you book gear, funds are held safely until your rental order is confirmed or fulfilled according to our platform guidelines.",
  },
  {
    question: "What happens if equipment gets damaged during a rental?",
    answer:
      "GearUp features secure booking agreements and provider protections. We recommend inspecting gear upon pickup and communicating immediately through our support channel if any issues arise.",
  },
  {
    question: "How do I list my own equipment as a provider?",
    answer:
      "Simply create an account, switch to your provider dashboard, and click 'Add New Gear'. You can set your own daily rates, specify stock levels, upload images, and manage availability instantly.",
  },
  {
    question: "Can I extend or cancel my active rental booking?",
    answer:
      "Yes! You can view and manage your active or past orders from your Customer Dashboard. Reach out to the provider or platform support early if you need to modify your scheduled dates.",
  },
];

export function FaqSection() {
  return (
    <section className="space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <HelpCircle className="h-3.5 w-3.5" />
          <span>Got Questions?</span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-blue-950">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Everything you need to know about renting equipment and listing assets
          on GearUp.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {faqs.map((faq, index) => (
          <Card
            key={index}
            className="border-border shadow-sm hover:shadow-md transition-all duration-200 bg-card flex flex-col justify-between"
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg font-semibold text-blue-950 flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold mt-0.5">
                  {index + 1}
                </span>
                {faq.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 pb-6 pl-12 sm:pl-12">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {faq.answer}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
