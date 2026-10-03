import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, type MouseEvent } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { Nav } from "@/components/portfolio/Nav";
import { Reveal, CountUp, SectionHeading } from "@/components/portfolio/shared";
import {
  profile,
  stats,
  projects,
  experience,
  techGroups,
  services,
} from "@/lib/portfolio-data";
import { projectAssets } from "@/lib/project-assets";

const TITLE = "Vishal Pandey — Senior React Native Developer";
const DESC =
  "Senior React Native Developer with 5+ years building high-performance iOS and Android apps. 9 production apps shipped across fintech, SaaS, sports-tech and more.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
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
          knowsAbout: ["React Native", "Expo", "TypeScript", "iOS", "Android", "Mobile App Development"],
        }),
      },
    ],
  }),
  component: Index,
});

function MagneticButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.25}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  const base =
    "inline-flex items-center gap-3 border px-6 py-3.5 text-xs font-medium uppercase tracking-[0.16em] transition-[transform,background-color,color,border-color] duration-300 ease-out";
  const styles =
    variant === "primary"
      ? "border-primary bg-primary text-primary-foreground hover:bg-primary/85"
      : "border-border bg-background/30 text-foreground backdrop-blur hover:border-primary/60 hover:bg-secondary";
  return (
    <a ref={ref} href={href} onMouseMove={onMove} onMouseLeave={onLeave} className={`${base} ${styles}`}>
      {children}
    </a>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-[96vh] items-center justify-center overflow-hidden border-b border-border pt-24">
      <div className="absolute inset-x-0 top-0 z-10 flex justify-between px-6 pt-24 text-[9px] font-medium uppercase tracking-[0.24em] text-muted-foreground md:px-10">
        <span>Portfolio / 2026</span>
        <span className="flex items-center gap-2"><i className="soft-pulse h-1.5 w-1.5 rounded-full bg-primary" /> Available for projects</span>
      </div>

      <div className="cinematic-mask pointer-events-none absolute inset-y-10 left-1/2 w-[min(74vw,42rem)] -translate-x-1/2 opacity-75">
        <img
          src="/assets/profile/vishal-pandey.webp"
          alt="Vishal Pandey, Senior React Native Developer"
          width={720}
          height={900}
          className="portrait-breathe h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-background/25" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </div>

      <div className="relative z-20 mx-auto flex w-full max-w-[90rem] flex-col items-center px-6 text-center">
        <Reveal>
          <p className="mb-7 text-[10px] font-medium uppercase tracking-[0.35em] text-primary">{profile.title}</p>
        </Reveal>
        <Reveal delay={1}>
          <h1 className="font-display text-[clamp(4.25rem,13vw,12rem)] leading-[0.72] font-normal text-foreground">
            Vishal <span className="italic text-foreground/72">Pandey</span>
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <div className="copper-line mx-auto mt-9 h-px w-48" />
          <p className="mx-auto mt-8 max-w-lg text-sm leading-7 text-muted-foreground md:text-base">
            Building high-performance mobile products for iOS and Android. <span className="text-foreground">5+ years. 9 apps in production.</span>
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <MagneticButton href="#work">Explore work <ArrowRight size={15} /></MagneticButton>
            <MagneticButton href="#contact" variant="ghost">Start a project</MagneticButton>
          </div>
        </Reveal>
      </div>

      <div className="absolute inset-x-6 bottom-6 z-20 flex items-end justify-between md:inset-x-10 md:bottom-8">
        <div className="flex items-center gap-4 text-muted-foreground">
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-primary"><Linkedin size={17} /></a>
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="transition-colors hover:text-primary"><Github size={17} /></a>
          <a href={`mailto:${profile.email}`} aria-label="Email" className="transition-colors hover:text-primary"><Mail size={17} /></a>
        </div>
        <a href="#about" className="group flex flex-col items-center gap-2 text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
          <span className="relative h-12 w-px overflow-hidden bg-border"><i className="scroll-line absolute inset-x-0 top-0 h-1/2 bg-primary" /></span>
          Scroll
        </a>
        <span className="hidden text-[9px] uppercase tracking-[0.18em] text-muted-foreground md:block">{profile.location}</span>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-28 md:py-44">
      <Reveal>
        <p className="font-display text-3xl leading-[1.25] font-light text-muted-foreground md:text-5xl">
          I turn product ideas into{" "}
          <span className="italic text-primary">production mobile apps</span> — owning architecture,
          real-time and offline-first data, payments, authentication, and{" "}
          <span className="text-foreground">the road to the App Store and Google Play.</span>
        </p>
      </Reveal>
      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {[
          ["End-to-end ownership", "Multiple apps shipped as sole developer or technical lead — from first commit to store release."],
          ["Built for real conditions", "Offline-first storage, background uploads, retry logic, and low-connectivity handling."],
          ["Performance at scale", "State, sync, and rendering optimized to support 5,000+ concurrent users."],
        ].map(([t, d], i) => (
          <Reveal key={t} delay={(i + 1) as 1 | 2 | 3}>
            <div className="border-t border-border pt-6">
              <h3 className="text-base font-medium text-foreground">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Proof() {
  return (
    <section className="border-y border-border bg-card/40">
      <div className="mx-auto grid max-w-6xl grid-cols-2 px-6 md:grid-cols-3">
        {stats.map((s, i) => (
          <Reveal
            key={s.label}
            delay={((i % 3) + 1) as 1 | 2 | 3}
            className="border-border px-2 py-12 md:px-8 md:py-16 [&:not(:nth-child(2n))]:border-r md:[&:not(:nth-child(2n))]:border-r-0 md:[&:not(:nth-child(3n))]:border-r"
          >
            <div className="font-display text-4xl font-light tracking-tight text-foreground md:text-6xl">
              <CountUp value={s.value} suffix={s.suffix} />
            </div>
            <p className="mt-3 text-xs text-muted-foreground md:text-sm">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="mx-auto max-w-[90rem] scroll-mt-20 px-6 py-28 md:px-10 md:py-44">
      <SectionHeading kicker="Selected work" title="Nine products, live in the stores." />
      <div className="grid gap-px bg-border">
        {projects.map((p, i) => {
          const visual = projectAssets[p.slug];
          return (
          <Reveal key={p.slug} delay={1}>
            <Link
              to="/work/$slug"
              params={{ slug: p.slug }}
              className="group relative grid min-h-[34rem] overflow-hidden bg-background transition-colors duration-700 hover:bg-card md:grid-cols-2"
            >
              {visual && (
                <div className={`relative min-h-[24rem] overflow-hidden bg-secondary ${i % 2 ? "md:order-2" : ""}`}>
                  <img
                    src={visual.screens[0]}
                    alt={`${p.name} app screen`}
                    loading="lazy"
                    className={`absolute inset-0 h-full w-full transition duration-1000 group-hover:scale-[1.035] group-hover:grayscale-0 ${visual.landscape ? "object-cover grayscale-[35%]" : "object-cover object-top grayscale-[35%]"}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/65 via-transparent to-background/10" />
                </div>
              )}
              <div className={`relative z-10 flex min-h-[30rem] flex-col justify-between p-8 md:p-14 ${i % 2 ? "md:order-1" : ""}`}>
                <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="flex items-center gap-4">
                    {visual && <img src={visual.icon} alt={`${p.name} icon`} className="h-12 w-12 border border-border object-cover" />}
                    <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                      {String(i + 1).padStart(2, "0")} — {p.domain}
                    </p>
                  </div>
                  <h3 className="mt-8 font-display text-5xl font-normal text-foreground md:text-7xl">{p.name}</h3>
                  <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">{p.tagline}</p>
                </div>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-border text-foreground transition-all duration-500 group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  <ArrowUpRight size={18} />
                </span>
                </div>
                <div>
                  {p.outcome && <p className="max-w-lg border-l border-primary py-1 pl-4 text-sm leading-6 text-foreground/80">{p.outcome}</p>}
                  <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                    {[...p.platforms, ...p.stack.slice(0, 3)].map((tag) => (
                      <span key={tag} className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>
        )})}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-28 md:py-40">
      <SectionHeading kicker="Experience" title="Six years of shipping." />
      <ol className="relative border-l border-border md:ml-4">
        {experience.map((e) => (
          <li key={e.company} className="relative pb-16 pl-8 last:pb-0 md:pl-14">
            <span className="absolute top-2 -left-[5px] h-[9px] w-[9px] rounded-full bg-primary ring-4 ring-background" />
            <Reveal>
              <div className="grid gap-6 md:grid-cols-[220px_1fr]">
                <div>
                  <p className="text-sm text-primary">{e.period}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{e.location}</p>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-light text-foreground md:text-3xl">{e.role}</h3>
                  <p className="mt-1 text-muted-foreground">{e.company}</p>
                  <ul className="mt-6 space-y-3">
                    {e.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-sm leading-relaxed text-foreground/80">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {e.tech.map((t) => (
                      <span key={t} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Stack() {
  return (
    <section id="stack" className="scroll-mt-20 border-y border-border bg-card/40 py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading kicker="Toolkit" title="The stack behind the products." />
        <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {techGroups.map((g, i) => (
            <Reveal key={g.name} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} className="group bg-background p-7 transition-colors duration-500 hover:bg-card">
              <h3 className="text-xs tracking-[0.2em] text-primary uppercase">{g.name}</h3>
              <ul className="mt-5 space-y-2">
                {g.items.map((it) => (
                  <li key={it} className="text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                    {it}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-28 md:py-40">
      <SectionHeading kicker="Working with me" title="Where I can help." />
      <div className="grid gap-x-12 md:grid-cols-2">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={((i % 2) + 1) as 1 | 2}>
            <div className="group flex gap-6 border-t border-border py-8">
              <span className="font-display text-sm text-muted-foreground transition-colors group-hover:text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-lg font-medium text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden border-t border-border">
      <div className="relative mx-auto max-w-5xl px-6 py-32 text-center md:py-52">
        <Reveal>
          <p className="mb-8 text-[10px] uppercase tracking-[0.3em] text-primary">The next chapter</p>
          <h2 className="font-display text-6xl leading-[0.9] font-normal text-foreground md:text-9xl">
            Have a product <span className="italic text-primary">in mind?</span>
          </h2>
        </Reveal>
        <Reveal delay={1}>
          <p className="mx-auto mt-8 max-w-lg text-lg text-muted-foreground">
            Let's turn your idea into a production-ready mobile experience.
          </p>
        </Reveal>
        <Reveal delay={2}>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <MagneticButton href={`mailto:${profile.email}`}>
              Start a Conversation <ArrowRight size={16} />
            </MagneticButton>
            <MagneticButton href={profile.linkedin} variant="ghost">
              <Linkedin size={16} /> View LinkedIn
            </MagneticButton>
            <MagneticButton href={profile.github} variant="ghost">
              <Github size={16} /> View GitHub
            </MagneticButton>
          </div>
          <p className="mt-10 text-sm text-muted-foreground">
            {profile.email} · {profile.phone}
          </p>
        </Reveal>
      </div>
      <footer className="relative border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-8 text-xs text-muted-foreground md:flex-row">
          <span>© {new Date().getFullYear()} Vishal Pandey</span>
          <span>Senior React Native Developer · Noida, India</span>
        </div>
      </footer>
    </section>
  );
}

function Index() {
  return (
    <div className="grain min-h-screen">
      <Nav />
      <main>
        <Hero />
        <About />
        <Proof />
        <Work />
        <Experience />
        <Stack />
        <Services />
        <Contact />
      </main>
    </div>
  );
}
