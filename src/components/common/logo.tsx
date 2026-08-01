import Link from "next/link";
import { Package } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  showText?: boolean;
}

export function Logo({
  className,
  iconClassName,
  textClassName,
  showText = true,
}: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2.5 font-bold tracking-tight transition-opacity hover:opacity-90",
        className,
      )}
    >
      {/* Icon Container with subtle background accent */}
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-900 text-primary-foreground shadow-sm">
        <Package className={cn("h-5 w-5", iconClassName)} />
      </div>

      {/* Brand Text */}
      {showText && (
        <span
          className={cn(
            "text-2xl font-bold text-blue-950 font-serif",
            textClassName,
          )}
        >
          Gear<span className="text-blue-800">Up</span>
        </span>
      )}
    </Link>
  );
}
