import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  size?: "md" | "lg";
}

export const NeonButton = forwardRef<HTMLButtonElement, Props>(
  ({ className, variant = "primary", size = "md", children, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        {...rest}
        className={cn(
          "group relative inline-flex items-center justify-center font-mono uppercase tracking-[0.18em] transition-all duration-300",
          "border backdrop-blur-sm overflow-hidden",
          size === "md" ? "h-11 px-5 text-xs" : "h-14 px-8 text-sm",
          variant === "primary"
            ? "border-neon-cyan text-neon-cyan bg-[oklch(0.88_0.18_200/0.08)] hover:bg-[oklch(0.88_0.18_200/0.18)] hover:shadow-[0_0_24px_oklch(0.88_0.18_200/0.6),inset_0_0_24px_oklch(0.88_0.18_200/0.15)]"
            : "border-white/15 text-white/85 hover:border-neon-violet hover:text-white hover:shadow-[0_0_24px_oklch(0.7_0.27_305/0.5)]",
          className,
        )}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-0 group-hover:translate-x-[300%] transition-transform duration-700" />
      </button>
    );
  },
);
NeonButton.displayName = "NeonButton";
