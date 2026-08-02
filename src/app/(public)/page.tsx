"use client";

import { CategoriesSection } from "@/components/features/home/categoriesSection";
import { FaqSection } from "@/components/features/home/faqSection";
import { FeaturedGearSection } from "@/components/features/home/featuredGearSection";
import { HeroSection } from "@/components/features/home/heroSection";
import { HowItWorksSection } from "@/components/features/home/howItWorksSection";
import { ProviderCtaSection } from "@/components/features/home/providerCtaSection";
import { TestimonialsSection } from "@/components/features/home/testimonialsSection";
import { WhyChooseUsSection } from "@/components/features/home/whyChooseUsSection";

export default function HomePage() {
  return (
    <div className="space-y-20 pb-16 max-w-7xl mx-auto px-4 sm:px-6 pt-6">
      <HeroSection />
      <CategoriesSection />
      <FeaturedGearSection />
      <HowItWorksSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <ProviderCtaSection />
      <FaqSection />
    </div>
  );
}
