import { useCallback, useEffect, useRef, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Nav } from "@/components/portfolio/Nav";
import { AppIcon, Phone, StoreBadge } from "@/components/portfolio/shared";
import { projects } from "@/lib/portfolio-data";
import { projectAssets } from "@/lib/project-assets";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const index = projects.findIndex((p) => p.slug === params.slug);
    const project = projects[index];
    const next = projects[(index + 1) % projects.length];
    if (!project || !next) throw notFound();
    return { project, next };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Project not found" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.project;
    const title = `${p.name}, ${p.tagline} | Vishal Pandey`;
    const cover = projectAssets[p.slug]?.cover;
    return {
      meta: [
        { title },
        { name: "description", content: p.overview },
        { property: "og:title", content: title },
        { property: "og:description", content: p.overview },
        { property: "og:type", content: "article" },
        ...(cover ? [{ property: "og:image", content: cover }] : []),
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: ProjectNotFound,
  component: ProjectPage,
});

function ProjectNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-5xl font-semibold">This app isn't in the portfolio</h1>
      <Link to="/" hash="work" className="btn btn-solid">
        See all apps
      </Link>
    </div>
  );
}

function Gallery({ slug, name, screens }: { slug: string; name: string; screens: string[] }) {
  const rail = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const step = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + screens.length) % screens.length)),
    [screens.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, step]);

  return (
    <section aria-label={`${name} screenshots`} className="py-16 md:py-24">
      <div className="mx-auto flex max-w-[84rem] items-end justify-between gap-6 px-5 md:px-10">
        <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold">Screens from the store</h2>
        <div className="hidden gap-2 md:flex">
          <button type="button" onClick={() => scrollBy(-1)} aria-label="Previous screenshots" className="flex h-11 w-11 items-center justify-center rounded-full border border-input hover:border-foreground">
            <ChevronLeft size={18} />
          </button>
          <button type="button" onClick={() => scrollBy(1)} aria-label="Next screenshots" className="flex h-11 w-11 items-center justify-center rounded-full border border-input hover:border-foreground">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <div
        ref={rail}
        className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-10 md:gap-8 md:px-10 xl:px-[max(2.5rem,calc((100vw-84rem)/2+2.5rem))]"
      >
        {screens.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`Open screenshot ${i + 1} of ${screens.length} full size`}
            className="w-[62vw] shrink-0 snap-start rounded-[1.6rem] transition-transform duration-300 hover:-translate-y-1.5 sm:w-[15rem] md:w-[17rem]"
          >
            <Phone slug={slug} src={src} alt={`${name} screenshot ${i + 1}`} eager={i < 3} />
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${name} screenshot ${open + 1} of ${screens.length}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setOpen(null)}
        >
          <img
            src={screens[open]}
            alt={`${name} screenshot ${open + 1}`}
            className="max-h-[90dvh] w-auto max-w-full rounded-[1.75rem]"
            onClick={(e) => e.stopPropagation()}
          />
          <button type="button" onClick={() => setOpen(null)} aria-label="Close" className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20">
            <X size={20} />
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous screenshot" className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 md:left-8">
            <ChevronLeft size={22} />
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next screenshot" className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 md:right-8">
            <ChevronRight size={22} />
          </button>
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm text-white/70 tabular-nums">
            {open + 1} / {screens.length}
          </p>
        </div>
      )}
    </section>
  );
}

function ProjectPage() {
  const { project: p, next } = Route.useLoaderData();
  const visual = projectAssets[p.slug];
  const nextVisual = projectAssets[next.slug];

  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <header className="mx-auto max-w-[84rem] px-5 pt-24 md:px-10 md:pt-32">
          <Link to="/" hash="work" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft size={16} /> All apps
          </Link>
          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <AppIcon slug={p.slug} name={p.name} className="rise h-20 w-20 md:h-24 md:w-24" />
              <h1 className="rise mt-8 text-[clamp(3.5rem,10vw,8.5rem)] font-bold leading-[0.9]" style={{ animationDelay: "80ms" }}>
                {p.name}
              </h1>
              <p className="rise mt-5 text-xl text-muted-foreground md:text-2xl" style={{ animationDelay: "140ms" }}>
                {p.tagline}
              </p>
              <dl className="rise mt-10 grid max-w-xl grid-cols-[7rem_1fr] gap-x-4 gap-y-2" style={{ animationDelay: "200ms" }}>
                <dt className="text-muted-foreground">Industry</dt>
                <dd>{p.domain}</dd>
                <dt className="text-muted-foreground">Platforms</dt>
                <dd>{p.platforms.join(" and ")}</dd>
                <dt className="text-muted-foreground">My role</dt>
                <dd>{p.role}</dd>
              </dl>
              <div className="rise mt-10 flex flex-wrap gap-3" style={{ animationDelay: "260ms" }}>
                {p.links.map((l) => (
                  <StoreBadge key={l.url} label={l.label} url={l.url} />
                ))}
              </div>
            </div>
            {visual && (
              <div className="rise relative mx-auto w-[min(17rem,64vw)]" style={{ animationDelay: "160ms" }}>
                <div aria-hidden className="absolute -inset-x-14 top-10 -z-10 h-[70%] rounded-full bg-primary/15 blur-3xl" />
                <Phone slug={p.slug} src={visual.cover} alt={`${p.name} app screenshot`} eager />
              </div>
            )}
          </div>
        </header>

        {visual && <Gallery slug={p.slug} name={p.name} screens={visual.screens} />}

        <div className="mx-auto max-w-[84rem] px-5 md:px-10">
          <section className="grid gap-6 border-t border-border py-14 md:grid-cols-[14rem_1fr] md:py-20">
            <h2 className="text-2xl font-semibold">What it is</h2>
            <p className="max-w-[32ch] font-display text-[clamp(1.75rem,3.4vw,2.75rem)] font-medium leading-[1.15] tracking-tight">
              {p.overview}
            </p>
          </section>

          {p.outcome && (
            <section className="rounded-3xl bg-primary px-7 py-12 text-primary-foreground md:px-14 md:py-16">
              <h2 className="text-lg font-medium opacity-80">The result</h2>
              <p className="mt-4 max-w-[28ch] font-display text-[clamp(2rem,4.4vw,3.75rem)] font-semibold leading-[1.05]">
                {p.outcome}
              </p>
            </section>
          )}

          <section className="py-14 md:py-20">
            <div className="grid overflow-hidden rounded-3xl border border-border md:grid-cols-2">
              <div className="p-7 md:p-10">
                <h2 className="text-2xl font-semibold">The problem</h2>
                <ul className="mt-6 space-y-4">
                  {p.challenges.map((c) => (
                    <li key={c} className="flex gap-3 text-muted-foreground">
                      <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-border bg-card p-7 md:border-l md:border-t-0 md:p-10">
                <h2 className="text-2xl font-semibold">What I built</h2>
                <ul className="mt-6 space-y-4">
                  {p.solutions.map((s) => (
                    <li key={s} className="flex gap-3">
                      <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="grid gap-6 border-t border-border py-14 md:grid-cols-[14rem_1fr] md:py-20">
            <h2 className="text-2xl font-semibold">Features</h2>
            <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
              {p.features.map((f) => (
                <li key={f} className="border-t border-border pt-4">
                  {f}
                </li>
              ))}
            </ul>
          </section>

          <section className="grid gap-6 border-t border-border py-14 md:grid-cols-[14rem_1fr] md:py-20">
            <h2 className="text-2xl font-semibold">Built with</h2>
            <ul className="flex flex-wrap gap-2">
              {p.stack.map((t) => (
                <li key={t} className="rounded-full border border-input px-4 py-1.5">
                  {t}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <Link
          to="/work/$slug"
          params={{ slug: next.slug }}
          className="group block bg-foreground text-background"
        >
          <div className="mx-auto flex max-w-[84rem] items-center justify-between gap-8 overflow-hidden px-5 py-16 md:px-10 md:py-20">
            <div className="flex items-center gap-6">
              <AppIcon slug={next.slug} name={next.name} className="h-16 w-16 md:h-20 md:w-20" />
              <div>
                <p className="text-background/70">Next app</p>
                <p className="mt-1 font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-none tracking-tight">
                  {next.name}
                </p>
                <p className="mt-2 text-background/70">{next.tagline}</p>
              </div>
            </div>
            <div className="flex items-center gap-8">
              {nextVisual && (
                <Phone
                  slug={next.slug}
                  src={nextVisual.cover}
                  alt=""
                  small
                  className="hidden w-28 translate-y-10 transition-transform duration-500 group-hover:translate-y-4 md:block"
                />
              )}
              <ArrowRight size={32} className="shrink-0 transition-transform duration-300 group-hover:translate-x-2" />
            </div>
          </div>
        </Link>
      </main>
    </div>
  );
}
