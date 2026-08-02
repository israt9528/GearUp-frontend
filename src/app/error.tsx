"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service if needed
    console.error("Application Error Boundary caught:", error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md border-border shadow-lg text-center overflow-hidden">
        <CardHeader className="space-y-3 pb-4 bg-muted/30 border-b border-border">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-600 dark:bg-red-950/40">
            <AlertTriangle className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold tracking-tight text-blue-950">
              Something went wrong!
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              An unexpected error occurred while loading this page.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          {/* Optional: Display error message in development */}
          {error.message && (
            <div className="rounded-xl bg-muted/50 border border-border p-3 text-left font-mono text-xs text-muted-foreground break-all max-h-28 overflow-y-auto">
              <span className="font-semibold text-foreground block mb-1">
                Error Details:
              </span>
              {error.message}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              onClick={() => reset()}
              className="w-full sm:w-auto bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white gap-2 shadow-sm font-medium"
            >
              <RotateCcw className="h-4 w-4" /> Try Again
            </Button>

            <Link href="/" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full gap-2 font-medium">
                <Home className="h-4 w-4" /> Go Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
