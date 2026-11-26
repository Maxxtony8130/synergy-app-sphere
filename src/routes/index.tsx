import { useEffect, useState } from "react";
import { MotionConfig } from "motion/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail } from "lucide-react";
import { Nav } from "@/components/portfolio/Nav";
import {
  AppIcon,
  CountUp,
  Section,
  StoreBadge,
  usePrefersReducedMotion,
} from "@/components/portfolio/shared";
import { experience, profile, projects, services, stats, techGroups } from "@/lib/portfolio-data";
import { ParallaxShots, PhoneStack, ScreenRail } from "@/components/portfolio/motion";
import { cn } from "@/lib/utils";

const TITLE = "Vishal Pandey, Senior React Native Developer";
const DESC =
  "Senior React Native developer with 5+ years building iOS and Android apps. 9 production apps shipped across fintech, SaaS, sports-tech, social, real estate and e-commerce.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/assets/profile/vishal-pandey.webp" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: profile.name,
          jobTitle: profile.title,
          email: `mailto:${profile.email}`,
          address: { "@type": "PostalAddress", addressLocality: "Noida", addressCountry: "IN" },
          sameAs: [profile.linkedin, profile.github],
          knowsAbout: [
            "React Native",
            "Expo",
            "TypeScript",
            "iOS",
            "Android",
            "Mobile App Development",
          ],
        }),
      },
    ],
  }),
  component: Index,
});

const DOCK_MS = 4500;

function Hero() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const project = projects[active]!;
  useEffect(() => {
    if (!auto || reduced) return;
    const t = window.setTimeout(() => setActive((i) => (i + 1) % projects.length), DOCK_MS);
    return () => window.clearTimeout(t);
  }, [active, auto, reduced]);

  const choose = (i: number) => {
    setAuto(false);
    setActive(i);
  };

  return (
    <section className="relative overflow-hidden px-5 pt-28 pb-16 md:px-10 md:pt-36 md:pb-24">
      <div className="mx-auto grid max-w-[84rem] items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        <div>
          <div className="rise flex items-center gap-4">
            <img
              src="/assets/profile/vishal-pandey.webp"
              alt="Vishal Pandey"
              width={928}
              height={1152}
              className="h-14 w-14 rounded-full object-cover object-top ring-2 ring-background shadow-lg"
            />
            <div className="text-[0.95rem] leading-snug">
              <p className="font-medium text-foreground">Vishal Pandey</p>
              <p className="flex items-center gap-2 text-muted-foreground">
                <span className="soft-pulse h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
                React Native developer in Noida, available for projects
              </p>
            </div>
          </div>
          <h1
            className="rise mt-7 text-[clamp(3.1rem,8.4vw,7.6rem)] font-bold leading-[0.92]"
            style={{ animationDelay: "80ms" }}
          >
            Nine apps live in the stores. I built them.
          </h1>
          <p
            className="rise mt-8 max-w-[52ch] text-lg leading-relaxed text-muted-foreground md:text-xl"
            style={{ animationDelay: "160ms" }}
          >
            {profile.summary}
          </p>
          <div
            className="rise mt-10 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "240ms" }}
          >
            <a href="#work" className="btn btn-solid">
              See the apps
            </a>
            <a href={`mailto:${profile.email}`} className="btn btn-ghost">
              Email me
            </a>
            <div className="ml-2 flex items-center gap-1 text-muted-foreground">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full hover:text-foreground"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-full hover:text-foreground"
              >
                <Github size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* The live phone: the one memorable element on the page */}
        <div className="rise flex flex-col items-center" style={{ animationDelay: "200ms" }}>
          <PhoneStack slug={project.slug} name={project.name} />
          <div
            className="mt-2 flex min-h-[3.5rem] w-full max-w-sm items-center gap-4"
            aria-live="polite"
          >
            <AppIcon slug={project.slug} name={project.name} className="h-12 w-12 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-xl font-semibold">{project.name}</p>
              <p className="truncate text-sm text-muted-foreground">{project.tagline}</p>
            </div>
            <Link
              to="/work/$slug"
              params={{ slug: project.slug }}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-input transition-colors hover:border-foreground"
              aria-label={`Read the ${project.name} case study`}
            >
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* Dock: pick an app to put it on the phone */}
      <div className="mx-auto mt-14 max-w-[84rem] md:mt-20">
        <div
          role="group"
          aria-label="Choose an app to preview"
          className="no-scrollbar mx-auto flex w-fit max-w-full gap-3 overflow-x-auto rounded-[1.75rem] border border-border bg-card/70 p-3 backdrop-blur-xl md:gap-4 md:p-4"
          onMouseEnter={() => setAuto(false)}
        >
          {projects.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => choose(i)}
              aria-pressed={i === active}
              aria-label={`Show ${p.name}`}
              title={p.name}
              className={cn(
                "relative shrink-0 rounded-[24%] transition-transform duration-200 hover:-translate-y-1",
                i === active
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-card"
                  : "opacity-80 hover:opacity-100",
              )}
            >
              <AppIcon slug={p.slug} name={p.name} className="h-12 w-12 md:h-14 md:w-14" />
              {i === active && auto && !reduced && (
                <span className="absolute inset-x-2 -bottom-2 h-0.5 overflow-hidden rounded-full bg-border">
                  <span
                    key={active}
                    className="dock-progress block h-full bg-primary"
                    style={{ ["--dock-duration" as string]: `${DOCK_MS}ms` }}
                  />
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Numbers() {
  return (
    <section aria-label="Track record" className="border-y border-border bg-card">
      <dl className="mx-auto grid max-w-[84rem] grid-cols-2 md:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="border-border px-5 py-8 odd:border-r md:border-r md:px-10 md:py-12 md:[&:nth-child(3n)]:border-r-0 [&:nth-child(n+3)]:border-t md:[&:nth-child(n+3)]:border-t-0 md:[&:nth-child(n+4)]:border-t"
          >
            <dt className="text-sm text-muted-foreground">{stat.label}</dt>
            <dd className="mt-2 font-display text-[clamp(2.4rem,5vw,4rem)] font-semibold leading-none tracking-tight">
              <CountUp value={stat.value} suffix={stat.suffix} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Principles() {
  const items = [
    [
      "End-to-end ownership",
      "Multiple apps shipped as sole developer or technical lead, from first commit to store release.",
    ],
    [
      "Built for real conditions",
      "Offline-first storage, background uploads, retry logic and low-connectivity handling.",
    ],
    ["Performance at scale", "State, sync and rendering tuned to support 5,000+ concurrent users."],
  ];
  return (
    <section className="mx-auto max-w-[84rem] px-5 pt-24 md:px-10 md:pt-36">
      <div className="grid items-end gap-10 md:grid-cols-[minmax(0,15rem)_1fr] md:gap-14">
        <img
          src="/assets/profile/vishal-pandey.webp"
          alt="Portrait of Vishal Pandey"
          width={928}
          height={1152}
          loading="lazy"
          className="w-40 rounded-3xl object-cover grayscale transition duration-500 hover:grayscale-0 md:w-full"
        />
        <p className="max-w-[24ch] font-display text-[clamp(1.9rem,4vw,3.4rem)] font-medium leading-[1.08] tracking-tight">
          I take product ideas to production: architecture, offline and real-time data, payments,
          sign-in, and the release to both stores.
        </p>
      </div>
      <div className="mt-14 grid gap-10 md:grid-cols-3">
        {items.map(([title, copy]) => (
          <div key={title} className="border-t border-foreground pt-5">
            <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
            <p className="mt-3 max-w-[38ch] text-muted-foreground">{copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Work() {
  return (
    <Section
      id="work"
      title="The apps"
      intro="Every screen below is the app's own App Store or Google Play screenshot. Open any app for the full case study."
    >
      <ul className="border-t border-border">
        {projects.map((project) => {
          return (
            <li key={project.slug} className="group border-b border-border py-12 md:py-16">
              <article className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
                <div className="flex flex-col">
                  <div className="flex items-center gap-5">
                    <AppIcon
                      slug={project.slug}
                      name={project.name}
                      className="h-16 w-16 md:h-20 md:w-20"
                    />
                    <div>
                      <h3 className="text-[clamp(2rem,4vw,3.25rem)] font-semibold">
                        {project.name}
                      </h3>
                      <p className="mt-1 text-muted-foreground">{project.tagline}</p>
                    </div>
                  </div>

                  <dl className="mt-8 grid grid-cols-[7rem_1fr] gap-x-4 gap-y-2 text-[0.95rem]">
                    <dt className="text-muted-foreground">Industry</dt>
                    <dd>{project.domain}</dd>
                    <dt className="text-muted-foreground">Platforms</dt>
                    <dd>{project.platforms.join(" and ")}</dd>
                    <dt className="text-muted-foreground">My role</dt>
                    <dd>{project.role}</dd>
                  </dl>

                  {project.outcome && (
                    <p className="mt-7 rounded-xl bg-primary/10 px-5 py-4 font-medium text-foreground">
                      <span className="text-primary">Result: </span>
                      {project.outcome}
                    </p>
                  )}

                  <ul className="mt-7 flex flex-wrap gap-2" aria-label="Technology">
                    {project.stack.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-input px-3 py-1 text-sm text-muted-foreground"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      to="/work/$slug"
                      params={{ slug: project.slug }}
                      className="btn btn-solid min-h-10 px-5 text-sm"
                    >
                      Read the case study
                    </Link>
                    {project.links.map((l) => (
                      <StoreBadge key={l.url} label={l.label} url={l.url} />
                    ))}
                  </div>
                </div>

                <Link
                  to="/work/$slug"
                  params={{ slug: project.slug }}
                  aria-label={`${project.name} case study`}
                  tabIndex={-1}
                  className="block -mx-5 md:mx-0"
                >
                  <ParallaxShots slug={project.slug} name={project.name} />
                </Link>
              </article>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

function Experience() {
  return (
    <div className="bg-card">
      <Section
        id="experience"
        title="Where I've worked"
        intro="Four teams, from web front ends to owning mobile architecture end to end."
      >
        <ol className="relative border-l border-border md:ml-[11rem]">
          {experience.map((item) => (
            <li key={item.company} className="relative pb-14 pl-8 last:pb-0 md:pl-12">
              <span
                aria-hidden
                className="absolute -left-[5px] top-2 h-[9px] w-[9px] rounded-full bg-primary"
              />
              <p className="text-sm text-muted-foreground md:absolute md:-left-[11rem] md:top-1 md:w-[9.5rem] md:text-right">
                {item.period}
              </p>
              <h3 className="mt-1 text-2xl font-semibold md:mt-0 md:text-3xl">{item.role}</h3>
              <p className="mt-2 text-muted-foreground">
                {item.company}, {item.location}
              </p>
              <ul className="mt-5 max-w-[70ch] list-disc space-y-2 pl-5 marker:text-muted-foreground">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-muted-foreground">{item.tech.join(", ")}</p>
            </li>
          ))}
        </ol>
      </Section>
    </div>
  );
}

function Stack() {
  return (
    <Section id="stack" title="What I work with">
      <dl className="grid gap-x-16 md:grid-cols-2">
        {techGroups.map((group) => (
          <div
            key={group.name}
            className="grid grid-cols-1 gap-2 border-t border-border py-6 sm:grid-cols-[11rem_1fr]"
          >
            <dt className="font-semibold">{group.name}</dt>
            <dd className="text-muted-foreground">{group.items.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

function Services() {
  return (
    <div className="bg-card">
      <Section
        id="services"
        title="How I can help"
        intro="Hire me to start a new app, take over a live one, or fix what is slowing it down."
      >
        <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div key={service.title} className="bg-background p-7 md:p-8">
              <h3 className="text-xl font-semibold tracking-tight">{service.title}</h3>
              <p className="mt-3 text-[0.95rem] text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="bg-foreground text-background">
      <div className="mx-auto max-w-[84rem] px-5 py-24 md:px-10 md:py-36">
        <h2 className="max-w-[14ch] text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.95]">
          Have an app to build? Let's talk.
        </h2>
        <p className="mt-8 max-w-[50ch] text-lg text-background/70">
          Tell me what you're making and where it stands.
        </p>
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="break-all font-display text-[clamp(1.5rem,4vw,3rem)] font-semibold underline decoration-background/30 decoration-2 underline-offset-[0.18em] transition-colors hover:decoration-background"
          >
            {profile.email}
          </a>
          <button
            type="button"
            onClick={copy}
            className="btn min-h-10 border border-background/30 px-4 text-sm text-background hover:border-background"
            aria-live="polite"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copied" : "Copy email"}
          </button>
        </div>
      </div>
      <footer className="border-t border-background/15">
        <div className="mx-auto flex max-w-[84rem] flex-col gap-5 px-5 py-8 text-sm text-background/70 md:flex-row md:items-center md:justify-between md:px-10">
          <p>
            {profile.name}, {profile.location}. {new Date().getFullYear()}.
          </p>
          <div className="flex gap-6">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-background"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-background"
            >
              <Github size={16} /> GitHub
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2 hover:text-background"
            >
              <Mail size={16} /> Email
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}

function Index() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen">
        <Nav />
        <main>
          <Hero />
          <Numbers />
          <ScreenRail />
          <Principles />
          <Work />
          <Experience />
          <Stack />
          <Services />
          <Contact />
        </main>
      </div>
    </MotionConfig>
  );
}
