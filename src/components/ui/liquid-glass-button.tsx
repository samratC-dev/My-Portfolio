"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "light" | "dark";
}

export const LiquidButton = React.forwardRef<HTMLButtonElement, LiquidButtonProps>(
  ({ className, children, variant = "light", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "group relative inline-flex h-12 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full px-7 text-sm font-medium transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]",
          variant === "light"
            ? "bg-white/10 text-white ring-1 ring-inset ring-white/20 backdrop-blur-xl"
            : "bg-white text-black ring-1 ring-inset ring-white/40",
          className,
        )}
        {...props}
      >
        {/* glass sheen */}
        <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/30 via-white/5 to-transparent opacity-60" />
        {/* moving star */}
        <span
          className="pointer-events-none absolute -inset-px rounded-full opacity-70"
          style={{
            background:
              "conic-gradient(from var(--a,0deg), transparent 70%, rgba(255,255,255,0.9) 85%, transparent 100%)",
            mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "1px",
            animation: "liquid-spin 4s linear infinite",
          }}
        />
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
        <style>{`@keyframes liquid-spin { to { --a: 360deg; } } @property --a { syntax: "<angle>"; inherits: false; initial-value: 0deg; }`}</style>
      </button>
    );
  },
);
LiquidButton.displayName = "LiquidButton";
