"use client";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export interface TextMorphProps {
  words?: string[];
  interval?: number;
  morphDuration?: number;
  className?: string;
}

const DEFAULT_WORDS = ["ETERNITY", "POWER", "STATUS"];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}

export function TextMorph({
  words = DEFAULT_WORDS,
  interval = 2600,
  morphDuration = 680,
  className,
}: TextMorphProps) {
  const values = useMemo(() => {
    const filtered = words.filter((w) => w.trim().length > 0);
    return filtered.length > 0 ? filtered : DEFAULT_WORDS;
  }, [words]);

  const [index, setIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (values.length < 2) return;
    const id = window.setTimeout(() => {
      setIndex((i) => (i + 1) % values.length);
    }, Math.max(400, interval));
    return () => window.clearTimeout(id);
  }, [index, interval, values.length]);

  const current = values[index % values.length]!;

  return (
    <span
      className={cn(
        "relative inline-block overflow-visible align-baseline text-center",
        className,
      )}
      aria-label={current}
      aria-live="off"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={current}
          initial={
            reducedMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 10, filter: "blur(8px)" }
          }
          animate={
            reducedMotion
              ? { opacity: 1 }
              : { opacity: 1, y: 0, filter: "blur(0px)" }
          }
          exit={
            reducedMotion
              ? { opacity: 0 }
              : { opacity: 0, y: -10, filter: "blur(8px)" }
          }
          transition={{
            duration: reducedMotion ? 0.15 : morphDuration / 1000,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block whitespace-nowrap will-change-[opacity,transform,filter]"
        >
          {current}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default TextMorph;
