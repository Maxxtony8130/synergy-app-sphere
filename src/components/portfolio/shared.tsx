import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({ children, className, delay, variant = "default" }: { children: ReactNode; className?: string; delay?: 1 | 2 | 3 | 4; variant?: "default" | "title" | "media" | "label" }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry?.isIntersecting) { setVisible(true); observer.disconnect(); } }, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={cn("reveal", `reveal-${variant}`, visible && "is-visible", delay && `reveal-delay-${delay}`, className)}>{children}</div>;
}

export function CountUp({ value, suffix, duration = 1600 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting || started.current) return;
      started.current = true;
      if (reduced) { setDisplay(value); return; }
      const start = performance.now();
      const tick = (now: number) => { const progress = Math.min((now - start) / duration, 1); setDisplay(Math.round((1 - Math.pow(1 - progress, 3)) * value)); if (progress < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [value, duration]);
  return <span ref={ref}>{display.toLocaleString("en-US")}{suffix}</span>;
}

export function SectionHeading({ kicker, title, aside, className }: { kicker: string; title: string; aside?: string; className?: string }) {
  return <Reveal variant="title" className={cn("mb-20 md:mb-28", className)}><div className="flex flex-col justify-between gap-8 border-b border-border pb-12 md:flex-row md:items-end"><div><p className="section-label"><span />{kicker}</p><h2 className="mt-6 max-w-5xl font-display text-5xl leading-[0.94] text-foreground md:text-8xl">{title}</h2></div>{aside && <p className="text-[10px] uppercase text-muted-foreground">{aside}</p>}</div></Reveal>;
}