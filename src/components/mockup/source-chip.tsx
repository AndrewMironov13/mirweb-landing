import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface SourceChipProps {
  icon: LucideIcon;
  label: string;
  className?: string;
  /** which side the thin connector line points toward the screen */
  connector?: "left" | "right";
  delay?: number;
  floatOffset?: number;
}

/**
 * A floating "raw material" tag (photo / reviews / address …) that softly
 * drifts and is tied to the device with a thin gradient connector line.
 */
export function SourceChip({
  icon: Icon,
  label,
  className,
  connector = "left",
  delay = 0,
  floatOffset = 10,
}: SourceChipProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={cn("pointer-events-none absolute z-20", className)}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={reduce ? {} : { y: [0, -floatOffset, 0] }}
        transition={{
          duration: 5 + floatOffset / 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
        className="relative"
      >
        <div className="glass flex items-center gap-2 rounded-full px-3.5 py-2 shadow-lg shadow-black/30">
          <span className="grid h-6 w-6 place-content-center rounded-full bg-primary/20 text-primary">
            <Icon className="size-3.5" />
          </span>
          <span className="text-xs font-medium text-foreground/90">{label}</span>
        </div>
        {/* connector line toward the screen */}
        <span
          aria-hidden
          className={cn(
            "absolute top-1/2 h-px w-10 -translate-y-1/2 bg-gradient-to-r from-primary/60 to-transparent",
            connector === "left"
              ? "right-full mr-1 rotate-180"
              : "left-full ml-1"
          )}
        />
      </motion.div>
    </motion.div>
  );
}
