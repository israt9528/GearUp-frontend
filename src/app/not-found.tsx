"use client";

import Link from "next/link";
import { Ghost, ArrowLeft, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4 sm:p-6">
      <Card className="w-full max-w-lg border-border/80 shadow-2xl bg-card/95 backdrop-blur-xl rounded-3xl overflow-hidden text-center p-8 sm:p-10">
        <CardContent className="p-0 space-y-6">
          {/* Animated 404 Ghost Icon Container */}
          <div className="relative mx-auto w-24 h-24 rounded-3xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-inner">
            <Ghost className="h-12 w-12 animate-pulse" />
            <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white rounded-2xl px-2.5 py-1 text-xs font-mono font-bold shadow-md">
              404
            </div>
          </div>

          {/* Heading & Description */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
              Page Not Found
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground pt-2">
              Oops! You&apos;re lost in space
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-sm mx-auto leading-relaxed">
              The page you are looking for might have been removed, had its name
              changed, or is temporarily unavailable.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link href="/" className="w-full sm:w-auto">
              <Button className="w-full h-11 px-6 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-md transition-all gap-2">
                <Home className="h-4 w-4" /> Return to Home
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="w-full sm:w-auto h-11 px-6 rounded-xl border-border hover:bg-muted/50 font-medium transition-all gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Go Back
            </Button>
          </div>

          {/* Helpful Navigation Footer */}
          <div className="pt-6 border-t border-border flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Search className="h-3.5 w-3.5 text-primary" />
            <span>
              Looking for gear? Check our{" "}
              <Link
                href="/gear"
                className="text-primary font-semibold hover:underline"
              >
                catalog
              </Link>
              .
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
