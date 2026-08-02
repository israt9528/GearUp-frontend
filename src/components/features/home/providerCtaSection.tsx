import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Sparkles, Wallet } from "lucide-react";

export function ProviderCtaSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-linear-to-r from-blue-900 via-blue-800 to-indigo-900 p-8 sm:p-12 text-white shadow-xl">
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-blue-300" />
            <span>Monetize Your Assets</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
            Got gear sitting idle? Turn it into a reliable income stream.
          </h2>
          <p className="text-blue-100 text-sm sm:text-base max-w-lg leading-relaxed">
            Join hundreds of trusted equipment owners on GearUp. Set your own
            daily rates, manage availability effortlessly, and get paid
            securely.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href="/gear">
              <Button
                size="lg"
                className="bg-white text-blue-900 hover:bg-blue-50 font-semibold shadow-sm gap-2"
              >
                Start Explore Gear <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-md border border-white/10 space-y-2">
            <div className="h-9 w-9 rounded-xl bg-white/20 flex items-center justify-center text-white">
              <Wallet className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-base">Zero Upfront Fees</h3>
            <p className="text-xs text-blue-200">
              List completely free and keep the majority of your rental
              earnings.
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-md border border-white/10 space-y-2">
            <div className="h-9 w-9 rounded-xl bg-white/20 flex items-center justify-center text-white">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-base">Secure Bookings</h3>
            <p className="text-xs text-blue-200">
              Protected workflows, verified profile checks, and direct payouts.
            </p>
          </div>
        </div>
      </div>

      {/* Decorative background aura */}
      <div className="absolute right-0 bottom-0 translate-x-1/3 translate-y-1/3 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
