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
    <Reveal variant="title">
      <section className="grid gap-8 border-t border-border py-16 md:grid-cols-[260px_1fr] md:py-24">
        <p className="text-[10px] font-semibold text-primary uppercase">
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
        <li key={it} className="flex gap-4 text-base leading-7 text-foreground/85 md:text-lg">
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
      <main className="mx-auto max-w-[94rem] px-6 pt-32 pb-24 md:px-10">
        <Reveal>
          <Link to="/" hash="work" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft size={16} /> All work
          </Link>
        </Reveal>

        <header className="relative grid min-h-[82vh] items-center gap-16 border-b border-border py-16 lg:grid-cols-[0.78fr_1.22fr] md:py-24">
          <div className="relative z-10">
          <Reveal variant="label" delay={1}>
            <div className="mb-7 flex items-center gap-4">
              {visual && <img src={visual.icon} alt={`${p.name} app icon`} className="h-14 w-14 border border-border object-cover shadow-2xl" />}
            <p className="relative text-[10px] uppercase text-muted-foreground">
              {p.domain} · {p.platforms.join(" · ")}
            </p>
            </div>
          </Reveal>
          <Reveal variant="title" delay={2}>
            <h1 className="relative mt-6 font-display text-7xl leading-[0.78] font-normal text-foreground md:text-[9rem]">
              {p.name}<span className="text-primary">.</span>
            </h1>
          </Reveal>
          <Reveal delay={3}>
            <p className="relative mt-8 max-w-xl text-lg leading-8 text-muted-foreground md:text-xl">{p.tagline}</p>
            <div className="relative mt-10 flex flex-wrap gap-3">
              {p.links.map((l) => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-primary bg-primary px-6 py-3 text-xs font-medium uppercase text-primary-foreground transition-transform hover:scale-[1.03]"
                >
                  View on {l.label} <ArrowUpRight size={16} />
                </a>
              ))}
            </div>
          </Reveal>
          </div>
          {visual && (
            <Reveal variant="media" delay={2} className="project-stage relative min-h-[38rem] overflow-hidden bg-card/30">
              <div className={`screen-drift absolute right-[7%] top-0 overflow-hidden bg-secondary shadow-2xl ${visual.landscape ? "top-24 h-72 w-full" : "h-[35rem] w-[17.5rem] p-2"}`}>
                <img src={visual.screens[0]} alt={`${p.name} app interface`} className={`h-full w-full ${visual.landscape ? "object-cover" : "object-cover object-top"}`} />
              </div>
              <div className={`absolute bottom-0 left-[4%] overflow-hidden bg-secondary shadow-2xl transition-transform duration-700 hover:-translate-y-2 ${visual.landscape ? "h-56 w-[76%]" : "h-[27rem] w-[13.5rem] -rotate-6 p-2"}`}>
                <img src={visual.screens[1]} alt={`${p.name} app interface detail`} className={`h-full w-full ${visual.landscape ? "object-cover" : "object-cover object-top"}`} />
              </div>
            </Reveal>
          )}
        </header>

        <Block n="01" title="Overview">
            <p className="font-display text-3xl leading-snug font-normal text-foreground md:text-5xl">{p.overview}</p>
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
              <span key={t} className="border border-border bg-card px-4 py-2 text-xs uppercase text-foreground/85">
                {t}
              </span>
            ))}
          </div>
        </Block>
        {p.outcome && (
          <Block n="07" title="Outcome">
            <p className="font-display text-4xl leading-snug font-normal italic text-primary md:text-6xl">{p.outcome}</p>
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
            className="group mt-16 block border-t border-border py-12 transition-colors md:py-16"
          >
            <p className="text-[10px] text-muted-foreground uppercase">Next project</p>
            <div className="mt-4 flex items-center justify-between gap-6">
              <h2 className="font-display text-5xl font-normal text-foreground transition-colors group-hover:text-primary md:text-8xl">{next.name}</h2>
              <ArrowRight className="text-primary transition-transform duration-300 group-hover:translate-x-2" size={32} />
            </div>
            <p className="mt-2 text-muted-foreground">{next.tagline}</p>
          </Link>
        </Reveal>
      </main>
    </div>
  );
}
