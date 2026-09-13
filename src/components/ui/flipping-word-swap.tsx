"use client";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
import gsap from "gsap";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState, useMemo } from "react";

const graphemeSegmenter =
  typeof Intl.Segmenter === "function"
    ? new Intl.Segmenter(undefined, { granularity: "grapheme" })
    : null;

function segmentCharacters(text: string) {
  if (!graphemeSegmenter) return Array.from(text);
  return Array.from(graphemeSegmenter.segment(text), ({ segment }) => segment);
}

export interface FlippingWordSwapProps {
  word1: string;
  word2: string;
  duration?: number;
  stagger?: number;
  className?: string;
  toClassName?: string;
  style?: CSSProperties;
  toStyle?: CSSProperties;
}

export function FlippingWordSwap({
  word1,
  word2,
  duration = 400,
  stagger = 44,
  className,
  toClassName,
  style,
  toStyle,
}: FlippingWordSwapProps) {
  const containerRef = useRef<HTMLButtonElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const swappedRef = useRef(false);
  const [isSwapped, setIsSwapped] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const resolvedDuration = prefersReducedMotion
      ? 0
      : Math.max(180, duration) / 1000;
    const resolvedStagger = prefersReducedMotion
      ? 0
      : Math.max(0, stagger) / 1000;

    const context = gsap.context(() => {
      const firstWord = gsap.utils.toArray<HTMLElement>(
        '[data-flip-word="first"]',
      );
      const secondWord = gsap.utils.toArray<HTMLElement>(
        '[data-flip-word="second"]',
      );

      gsap.set(firstWord, {
        rotationX: 0,
        opacity: 1,
        transformOrigin: "center top",
      });
      gsap.set(secondWord, {
        rotationX: -82,
        opacity: 0,
        transformOrigin: "center bottom",
      });

      const timeline = gsap.timeline({ paused: true });
      timeline
        .to(firstWord, {
          rotationX: 82,
          opacity: 0,
          duration: resolvedDuration,
          stagger: resolvedStagger,
          ease: "power2.in",
        })
        .to(
          secondWord,
          {
            rotationX: 0,
            opacity: 1,
            duration: resolvedDuration,
            stagger: resolvedStagger,
            ease: "power2.out",
          },
          `<${resolvedDuration * 0.62}`,
        );

      if (swappedRef.current) timeline.progress(1);
      timelineRef.current = timeline;
    }, containerRef);

    return () => {
      timelineRef.current = null;
      context.revert();
    };
  }, [duration, stagger, word1, word2]);

  const updateSwap = useCallback((next: boolean) => {
    swappedRef.current = next;
    setIsSwapped(next);
    if (next) {
      timelineRef.current?.play();
    } else {
      timelineRef.current?.reverse();
    }
  }, []);

  const renderCharacters = (text: string, layer: "first" | "second") =>
    segmentCharacters(text).map((character, index) => (
      <span
        key={`${layer}-${index}-${character}`}
        data-flip-word={layer}
        className="inline-block whitespace-pre [backface-visibility:hidden] [will-change:transform,opacity]"
      >
        {character === " " ? "\u00a0" : character}
      </span>
    ));

  return (
    <button
      ref={containerRef}
      type="button"
      className={cn(
        "relative inline-grid cursor-pointer select-none border-0 bg-transparent p-0 align-baseline font-[inherit] leading-[inherit] tracking-[inherit] text-[inherit]",
        "rounded-[0.08em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current/30 focus-visible:ring-offset-2",
        className,
      )}
      aria-label={isSwapped ? word2 : word1}
      aria-pressed={isSwapped}
      style={style}
      onMouseEnter={() => updateSwap(true)}
      onMouseLeave={() => updateSwap(false)}
      onPointerUp={(event) => {
        if (event.pointerType !== "mouse") updateSwap(!swappedRef.current);
      }}
      onFocus={(event) => {
        if (event.currentTarget.matches(":focus-visible")) updateSwap(true);
      }}
      onBlur={() => updateSwap(false)}
    >
      <span className="col-start-1 row-start-1 inline-grid overflow-hidden [perspective:800px]">
        <span
          className="col-start-1 row-start-1 inline-flex items-baseline justify-center gap-[0.012em] whitespace-pre"
          aria-hidden="true"
        >
          {renderCharacters(word1, "first")}
        </span>
        <span
          className={cn(
            "col-start-1 row-start-1 inline-flex items-baseline justify-center gap-[0.012em] whitespace-pre",
            toClassName,
          )}
          aria-hidden="true"
          style={toStyle}
        >
          {renderCharacters(word2, "second")}
        </span>
      </span>
    </button>
  );
}

// Auto-cycling version for 3+ words — reuses same flip animation but cycles automatically
export interface AutoFlippingWordsProps {
  words: string[];
  duration?: number;
  stagger?: number;
  interval?: number;
  className?: string;
  toClassName?: string;
  style?: CSSProperties;
  toStyle?: CSSProperties;
}

export function AutoFlippingWords({
  words,
  duration = 400,
  stagger = 44,
  interval = 2600,
  className,
  toClassName,
  style,
  toStyle,
}: AutoFlippingWordsProps) {
  const filtered = useMemo(() => words.filter((w) => w.trim().length > 0), [words]);
  const safeWords = filtered.length > 0 ? filtered : ["ETERNITY", "POWER", "STATUS"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const timersRef = useRef<number[]>([]);

  const nextIndex = (currentIndex + 1) % safeWords.length;
  const word1 = safeWords[currentIndex]!;
  const word2 = safeWords[nextIndex]!;

  // Build GSAP timeline for current pair
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const resolvedDuration = prefersReducedMotion ? 0 : Math.max(180, duration) / 1000;
    const resolvedStagger = prefersReducedMotion ? 0 : Math.max(0, stagger) / 1000;

    const ctx = gsap.context(() => {
      const first = gsap.utils.toArray<HTMLElement>('[data-flip-cycle="first"]');
      const second = gsap.utils.toArray<HTMLElement>('[data-flip-cycle="second"]');
      gsap.set(first, { rotationX: 0, opacity: 1, transformOrigin: "center top" });
      gsap.set(second, { rotationX: -82, opacity: 0, transformOrigin: "center bottom" });
      const tl = gsap.timeline({ paused: true });
      tl.to(first, {
        rotationX: 82,
        opacity: 0,
        duration: resolvedDuration,
        stagger: resolvedStagger,
        ease: "power2.in",
      }).to(
        second,
        {
          rotationX: 0,
          opacity: 1,
          duration: resolvedDuration,
          stagger: resolvedStagger,
          ease: "power2.out",
        },
        `<${resolvedDuration * 0.62}`,
      );
      timelineRef.current = tl;
    }, containerRef);

    return () => {
      timelineRef.current = null;
      ctx.revert();
    };
  }, [word1, word2, duration, stagger]);

  // Auto cycle
  useEffect(() => {
    if (safeWords.length < 2) return;
    const maxChars = Math.max(segmentCharacters(word1).length, segmentCharacters(word2).length);
    const flipTotalMs = Math.max(180, duration) + stagger * maxChars + 80;

    const hold = window.setTimeout(() => {
      timelineRef.current?.play();
      const advance = window.setTimeout(() => {
        setCurrentIndex(nextIndex);
      }, flipTotalMs);
      timersRef.current.push(advance);
    }, Math.max(400, interval));

    timersRef.current.push(hold);
    return () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
      timersRef.current = [];
    };
  }, [currentIndex, word1, word2, duration, stagger, interval, nextIndex, safeWords.length]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const renderChars = (text: string, layer: "first" | "second") =>
    segmentCharacters(text).map((ch, i) => (
      <span
        key={`${layer}-${i}-${ch}`}
        data-flip-cycle={layer}
        className="inline-block whitespace-pre [backface-visibility:hidden] [will-change:transform,opacity]"
      >
        {ch === " " ? "\u00a0" : ch}
      </span>
    ));

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative inline-grid select-none align-baseline font-[inherit] leading-[inherit] tracking-[inherit] text-[inherit]",
        className,
      )}
      style={style}
      aria-label={word1}
      aria-live="off"
    >
      <span className="col-start-1 row-start-1 inline-grid overflow-visible [perspective:800px]">
        <span
          className="col-start-1 row-start-1 inline-flex items-baseline justify-center gap-[0.012em] whitespace-pre"
          aria-hidden="true"
        >
          {renderChars(word1, "first")}
        </span>
        <span
          className={cn(
            "col-start-1 row-start-1 inline-flex items-baseline justify-center gap-[0.012em] whitespace-pre",
            toClassName,
          )}
          aria-hidden="true"
          style={toStyle}
        >
          {renderChars(word2, "second")}
        </span>
      </span>
    </div>
  );
}

export default FlippingWordSwap;
