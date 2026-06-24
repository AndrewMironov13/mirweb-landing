import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const liquidButtonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold text-foreground transition-transform duration-300 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 hover:scale-[1.03] active:scale-[0.99] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      size: {
        sm: "h-9 px-5 text-xs",
        default: "h-11 px-6 text-sm",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-base",
      },
    },
    defaultVariants: { size: "default" },
  }
);

/** Decorative glass layers shared by button + anchor renders. */
function GlassLayers({ glow }: { glow?: boolean }) {
  return (
    <>
      {glow && (
        <span
          aria-hidden
          className="absolute inset-0 -z-10 rounded-full bg-gradient-to-t from-primary/90 to-primary/60 shadow-[0_8px_30px_-6px_hsl(244_84%_67%/0.7)]"
        />
      )}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.45),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.5),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.35),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.35),inset_0_0_8px_4px_rgba(255,255,255,0.08),0_0_14px_rgba(120,130,255,0.18)]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[1] rounded-full bg-white/[0.04] backdrop-blur-md"
      />
    </>
  );
}

type CommonProps = VariantProps<typeof liquidButtonVariants> & {
  glow?: boolean;
  className?: string;
  children: React.ReactNode;
};

type AsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    href?: undefined;
  };

type AsAnchor = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className"> & {
    href: string;
  };

export type LiquidButtonProps = AsButton | AsAnchor;

/**
 * Apple-style "liquid glass" CTA. Renders a <button> by default, or an <a>
 * when `href` is provided (no Radix Slot — the decorative layers would break
 * Slot's single-child requirement).
 */
export function LiquidButton({
  className,
  size,
  glow,
  children,
  ...props
}: LiquidButtonProps) {
  const classes = cn(liquidButtonVariants({ size, className }));
  const content = (
    <>
      <GlassLayers glow={glow} />
      <span className="pointer-events-none relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </>
  );

  if ("href" in props && props.href !== undefined) {
    return (
      <a className={classes} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}

export { liquidButtonVariants };
