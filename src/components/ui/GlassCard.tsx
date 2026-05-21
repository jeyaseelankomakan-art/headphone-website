import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function GlassCard({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={cn(
        "glass relative rounded-xl p-6 overflow-hidden",
        "before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[oklch(0.88_0.18_200/0.6)] before:to-transparent",
        className,
      )}
    >
      {/* corner brackets */}
      <span className="pointer-events-none absolute top-2 left-2 h-3 w-3 border-t border-l border-neon-cyan/60" />
      <span className="pointer-events-none absolute top-2 right-2 h-3 w-3 border-t border-r border-neon-cyan/60" />
      <span className="pointer-events-none absolute bottom-2 left-2 h-3 w-3 border-b border-l border-neon-cyan/60" />
      <span className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b border-r border-neon-cyan/60" />
      {children}
    </div>
  );
}
