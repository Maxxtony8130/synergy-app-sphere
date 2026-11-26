import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { projectAssets } from "@/lib/project-assets";

export function usePrefersReducedMotion() {
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

/** A real store screenshot inside a phone frame, at the screenshot's own aspect ratio. */
export function Phone({
  slug,
  src,
  alt,
  small,
  eager,
  className,
  imgClassName,
}: {
  slug: string;
  src: string;
  alt: string;
  small?: boolean;
  eager?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  const v = projectAssets[slug];
  return (
    <div className={cn("phone", small && "phone-sm", className)}>
      <img
        src={src}
        alt={alt}
        width={v?.width}
        height={v?.height}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={imgClassName}
      />
    </div>
  );
}

export function AppIcon({
  slug,
  name,
  className,
}: {
  slug: string;
  name: string;
  className?: string;
}) {
  const v = projectAssets[slug];
  if (!v) return null;
  return (
    <img
      src={v.icon}
      alt={`${name} app icon`}
      width={512}
      height={512}
      loading="lazy"
      decoding="async"
      className={cn("app-icon object-cover", className)}
    />
  );
}

export function StoreBadge({ label, url }: { label: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="btn btn-ghost min-h-10 px-4 text-sm"
    >
      {label === "App Store" ? "Open in App Store" : "Open in Google Play"}
    </a>
  );
}

export function CountUp({
  value,
  suffix,
  duration = 1400,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const started = useRef(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setDisplay(0);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || started.current) return;
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          setDisplay(Math.round((1 - Math.pow(1 - progress, 3)) * value));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [value, duration]);
  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

export function Section({
  id,
  title,
  intro,
  children,
  className,
}: {
  id?: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("mx-auto max-w-[84rem] px-5 py-24 md:px-10 md:py-36", className)}>
      <div className="mb-12 grid gap-5 md:mb-16 md:grid-cols-[1fr_1fr] md:items-end">
        <h2 className="text-[clamp(2.5rem,6vw,4.75rem)] font-semibold">{title}</h2>
        {intro && <p className="max-w-[46ch] text-lg text-muted-foreground md:justify-self-end">{intro}</p>}
      </div>
      {children}
    </section>
  );
}
