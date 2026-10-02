import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/portfolio/Nav";
import { Reveal } from "@/components/portfolio/shared";
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
    const title = `${p.name} — ${p.tagline} | Vishal Pandey`;
    return {
      meta: [
        { title },
        { name: "description", content: p.overview },
        { property: "og:title", content: title },
        { property: "og:description", content: p.overview },
        { property: "og:type", content: "article" },
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
      <h1 className="font-display text-4xl font-light text-foreground">Project not found</h1>
      <Link to="/" className="text-primary">Back to portfolio</Link>
    </div>
  );
}

function Block({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section className="grid gap-6 border-t border-border py-14 md:grid-cols-[240px_1fr] md:py-20">
        <p className="text-xs tracking-[0.2em] text-primary uppercase">
          {n} — {title}
        </p>
        <div>{children}</div>
      </section>
    </Reveal>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-4">
      {items.map((it) => (
        <li key={it} className="flex gap-4 text-lg leading-relaxed text-foreground/85">
          <span className="mt-3 h-1 w-3 shrink-0 bg-primary/70" />
          {it}
        </li>
      ))}
    </ul>
  );
}

function ProjectPage() {
  const { project: p, next } = Route.useLoaderData();
  const visual = projectAssets[p.slug];

  return (
    <div className="grain min-h-screen">
      <Nav />
      <main className="mx-auto max-w-6xl px-6 pt-32 pb-24">
        <Reveal>
          <Link to="/" hash="work" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft size={16} /> All work
          </Link>
        </Reveal>

        <header className="relative grid items-center gap-16 py-16 lg:grid-cols-[1.15fr_0.85fr] md:py-24">
          <div className="hero-glow pointer-events-none absolute -top-20 -left-20 h-80 w-[600px] rounded-full bg-primary/10 blur-[100px]" />
          <div>
          <Reveal delay={1}>
            <div className="mb-7 flex items-center gap-4">
              {visual && <img src={visual.icon} alt={`${p.name} app icon`} className="h-16 w-16 rounded-2xl border border-border object-cover shadow-2xl" />}
            <p className="relative text-xs tracking-[0.2em] text-muted-foreground uppercase">
              {p.domain} · {p.platforms.join(" · ")}
            </p>
            </div>
          </Reveal>
          <Reveal delay={2}>
            <h1 className="relative mt-6 font-display text-6xl leading-[0.95] font-light tracking-tight text-foreground md:text-9xl">
              {p.name}
              <span className="text-primary">.</span>
            </h1>
          </Reveal>
          <Reveal delay={3}>
            <p className="relative mt-6 max-w-2xl text-xl text-muted-foreground md:text-2xl">{p.tagline}</p>
            <div className="relative mt-10 flex flex-wrap gap-3">
              {p.links.map((l) => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
                >
                  View on {l.label} <ArrowUpRight size={16} />
                </a>
              ))}
            </div>
          </Reveal>
          </div>
          {visual && (
            <Reveal delay={2} className="relative min-h-[34rem]">
              <div className="absolute inset-8 rounded-full bg-primary/10 blur-[90px]" />
              <div className={`absolute right-0 top-0 overflow-hidden border border-border bg-secondary shadow-2xl ${visual.landscape ? "h-64 w-full rounded-2xl lg:top-20" : "h-[31rem] w-[15.5rem] rounded-[2.4rem] p-2"}`}>
                <img src={visual.screens[0]} alt={`${p.name} app interface`} className={`h-full w-full ${visual.landscape ? "object-cover" : "rounded-[1.9rem] object-cover object-top"}`} />
              </div>
              <div className={`absolute bottom-0 left-0 overflow-hidden border border-border bg-secondary shadow-2xl transition-transform duration-700 hover:-translate-y-2 ${visual.landscape ? "h-52 w-[82%] rounded-2xl" : "h-[25rem] w-[12.5rem] -rotate-6 rounded-[2rem] p-2"}`}>
                <img src={visual.screens[1]} alt={`${p.name} app interface detail`} className={`h-full w-full ${visual.landscape ? "object-cover" : "rounded-[1.55rem] object-cover object-top"}`} />
              </div>
            </Reveal>
          )}
        </header>

        <Block n="01" title="Overview">
          <p className="font-display text-2xl leading-snug font-light text-foreground md:text-3xl">{p.overview}</p>
        </Block>
        <Block n="02" title="The product">
          <List items={p.features} />
        </Block>
        <Block n="03" title="My role">
          <p className="text-lg text-foreground/85">{p.role}</p>
        </Block>
        <Block n="04" title="Key challenges">
          <List items={p.challenges} />
        </Block>
        <Block n="05" title="Solution">
          <List items={p.solutions} />
        </Block>
        <Block n="06" title="Technology">
          <div className="flex flex-wrap gap-2">
            {p.stack.map((t) => (
              <span key={t} className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground/85">
                {t}
              </span>
            ))}
          </div>
        </Block>
        {p.outcome && (
          <Block n="07" title="Outcome">
            <p className="font-display text-3xl leading-snug font-light text-primary md:text-4xl">{p.outcome}</p>
          </Block>
        )}
        <Block n={p.outcome ? "08" : "07"} title="Links">
          <div className="flex flex-col gap-3">
            {p.links.map((l) => (
              <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 text-lg text-foreground transition-colors hover:text-primary">
                {l.label} <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>
        </Block>

        <Reveal>
          <Link
            to="/work/$slug"
            params={{ slug: next.slug }}
            className="group mt-16 block rounded-3xl border border-border bg-card p-10 transition-colors hover:border-primary/40 md:p-14"
          >
            <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Next project</p>
            <div className="mt-4 flex items-center justify-between gap-6">
              <h2 className="font-display text-4xl font-light text-foreground md:text-6xl">{next.name}</h2>
              <ArrowRight className="text-primary transition-transform duration-300 group-hover:translate-x-2" size={32} />
            </div>
            <p className="mt-2 text-muted-foreground">{next.tagline}</p>
          </Link>
        </Reveal>
      </main>
    </div>
  );
}
