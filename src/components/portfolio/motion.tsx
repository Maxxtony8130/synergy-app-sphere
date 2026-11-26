import { useRef, type PointerEvent } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { projectAssets, previewScreens } from "@/lib/project-assets";
import { projects } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/** Store screenshot card used by the motion pieces. */
function Shot({
  slug,
  src,
  alt,
  eager,
  className,
}: {
  slug: string;
  src: string;
  alt: string;
  eager?: boolean;
  className?: string;
}) {
  const v = projectAssets[slug];
  return (
    <div className={cn("phone", className)}>
      <img
        src={src}
        alt={alt}
        width={v?.width}
        height={v?.height}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
      />
    </div>
  );
}

/**
 * Hero: three screens of the chosen app fanned out in 3D.
 * The whole stack tilts toward the pointer; screens swap when another app is chosen.
 */
export function PhoneStack({ slug, name }: { slug: string; name: string }) {
  const reduced = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-14, 14]), {
    stiffness: 120,
    damping: 18,
  });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [10, -10]), {
    stiffness: 120,
    damping: 18,
  });
  const tint = projectAssets[slug]?.tint ?? "#2c47f5";
  const shots = previewScreens(slug, 3);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  const fan = [
    { x: "-58%", rotate: -9, z: -80, scale: 0.86, zIndex: 1 },
    { x: "0%", rotate: 0, z: 0, scale: 1, zIndex: 3 },
    { x: "58%", rotate: 9, z: -80, scale: 0.86, zIndex: 2 },
  ];
  const order = [1, 0, 2];

  return (
    <div
      className="relative flex h-[min(34rem,118vw)] w-full items-center justify-center [perspective:1400px]"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <motion.div
        aria-hidden
        className="absolute inset-[12%] -z-10 rounded-full blur-3xl"
        animate={{ backgroundColor: tint, opacity: 0.32 }}
        transition={{ duration: 0.8, ease }}
      />
      <motion.div
        className="relative h-full w-[min(15.5rem,52vw)] [transform-style:preserve-3d]"
        style={{ rotateX, rotateY }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {shots.map((src, i) => {
            const pos = fan[order[i] ?? 1]!;
            return (
              <motion.div
                key={`${slug}-${src}`}
                className="absolute inset-x-0 top-1/2"
                style={{ zIndex: pos.zIndex, y: "-50%" }}
                initial={{
                  opacity: 0,
                  x: pos.x,
                  rotate: pos.rotate,
                  scale: pos.scale * 0.92,
                  z: pos.z - 60,
                }}
                animate={{ opacity: 1, x: pos.x, rotate: pos.rotate, scale: pos.scale, z: pos.z }}
                exit={{ opacity: 0, scale: pos.scale * 0.95, z: pos.z - 40 }}
                transition={{ duration: 0.6, ease, delay: i * 0.06 }}
              >
                <Shot slug={slug} src={src} alt={i === 0 ? `${name} app screenshot` : ""} eager />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

/** A slow, endless rail of every app screen, laid on a tilted plane. */
export function ScreenRail() {
  const all = projects.flatMap((p) =>
    previewScreens(p.slug, 3).map((src) => ({ slug: p.slug, name: p.name, src })),
  );
  const row = [...all, ...all];
  return (
    <section
      aria-label="Screens from all nine apps"
      className="relative overflow-hidden py-10 md:py-16"
    >
      <div className="[perspective:1200px]">
        <div className="[transform:rotateX(18deg)_rotateZ(-4deg)] [transform-style:preserve-3d]">
          <div className="rail-track flex w-max gap-5 md:gap-7">
            {row.map((item, i) => (
              <div
                key={`${item.src}-${i}`}
                className="w-32 shrink-0 md:w-44"
                aria-hidden={i >= all.length}
              >
                <Shot
                  slug={item.slug}
                  src={item.src}
                  alt={i < all.length ? `${item.name} screen` : ""}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent md:w-48"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent md:w-48"
      />
    </section>
  );
}

/** Three screens on an app's tinted panel; each drifts at its own speed as the row scrolls past. */
export function ParallaxShots({ slug, name }: { slug: string; name: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const a = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [60, -60]);
  const b = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [130, -90]);
  const c = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [30, -30]);
  const tint = projectAssets[slug]?.tint ?? "#2c47f5";
  const shots = previewScreens(slug, 3);
  const ys = [a, b, c];

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-[1.75rem]"
      style={{
        background: `radial-gradient(120% 90% at 50% 0%, color-mix(in oklab, ${tint} 55%, transparent), transparent 70%), color-mix(in oklab, ${tint} 22%, var(--card))`,
      }}
    >
      <div className="flex items-start justify-center gap-[4%] px-[6%] pt-12 pb-4 md:pt-16">
        {shots.map((src, i) => (
          <motion.div key={src} className="w-[30%] shrink-0" style={{ y: ys[i] ?? a }}>
            <Shot slug={slug} src={src} alt={`${name} screenshot ${i + 1}`} className="phone-sm" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
