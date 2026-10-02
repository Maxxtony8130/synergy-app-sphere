import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, type MouseEvent } from "react";
import { ArrowRight, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
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
    "inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-[transform,background-color,color] duration-300 ease-out";
  const styles =
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:bg-primary/90"
      : "border border-border bg-secondary/40 text-foreground backdrop-blur hover:bg-secondary";
  return (
    <a ref={ref} href={href} onMouseMove={onMove} onMouseLeave={onLeave} className={`${base} ${styles}`}>
      {children}
    </a>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16">
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="hero-glow absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
          }}
        />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-6 md:grid-cols-[1.4fr_1fr]">
        <div>
          <Reveal>
            <p className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-border bg-secondary/40 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur">
              <span className="soft-pulse h-1.5 w-1.5 rounded-full bg-primary" />
              Available for new projects
            </p>
          </Reveal>
          <Reveal delay={1}>
            <h1 className="font-display text-5xl leading-[0.98] font-light tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
              Vishal
              <br />
              Pandey<span className="text-primary">.</span>
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-6 text-sm font-medium tracking-[0.2em] text-primary uppercase">
              {profile.title}
            </p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Building high-performance mobile products for iOS and Android.{" "}
              <span className="text-foreground">5+ years. 9 apps in production.</span>
            </p>
          </Reveal>
          <Reveal delay={3}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <MagneticButton href="#work">
                View My Work <ArrowRight size={16} />
              </MagneticButton>
              <MagneticButton href="#contact" variant="ghost">
                Let's Work Together
              </MagneticButton>
            </div>
            <div className="mt-10 flex items-center gap-5 text-muted-foreground">
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-foreground">
                <Linkedin size={20} />
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="transition-colors hover:text-foreground">
                <Github size={20} />
              </a>
              <a href={`mailto:${profile.email}`} aria-label="Email" className="transition-colors hover:text-foreground">
                <Mail size={20} />
              </a>
              <span className="h-px w-10 bg-border" />
              <span className="text-xs">{profile.location}</span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={2} className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/25 via-transparent to-transparent blur-2xl" />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-2xl">
            <img
              src="/assets/profile/vishal-pandey.webp"
              alt="Vishal Pandey, Senior React Native Developer"
              width={480}
              height={480}
              className="aspect-[4/5] w-full object-cover grayscale-[15%]"
            />
            <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-border bg-background/70 p-4 backdrop-blur-xl">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Shipping since</span>
                <span className="font-medium text-foreground">2020</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Platforms</span>
                <span className="font-medium text-foreground">iOS · Android</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-28 md:py-40">
      <Reveal>
        <p className="font-display text-3xl leading-[1.25] font-light text-muted-foreground md:text-5xl">
          I turn product ideas into{" "}
          <span className="text-foreground">production mobile apps</span> — owning architecture,
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
    <section id="work" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-28 md:py-40">
      <SectionHeading kicker="Selected work" title="Nine products, live in the stores." />
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p, i) => {
          const visual = projectAssets[p.slug];
          return (
          <Reveal key={p.slug} delay={((i % 2) + 1) as 1 | 2} className={i === 0 ? "md:col-span-2" : ""}>
            <Link
              to="/work/$slug"
              params={{ slug: p.slug }}
              className={`group relative block min-h-[30rem] overflow-hidden rounded-3xl border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 ${i === 0 ? "md:min-h-[36rem]" : ""}`}
            >
              {visual && (
                <div className="absolute inset-x-0 bottom-0 h-[58%] overflow-hidden bg-secondary">
                  <img
                    src={visual.screens[0]}
                    alt={`${p.name} app screen`}
                    loading="lazy"
                    className={`h-full w-full transition duration-700 group-hover:scale-[1.03] ${visual.landscape ? "object-cover" : "object-cover object-top"}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-card via-card/15 to-card/90" />
                </div>
              )}
              <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/0 blur-3xl transition-colors duration-700 group-hover:bg-primary/15" />
              <div className="relative z-10 flex items-start justify-between gap-6 p-8 md:p-10">
                <div>
                  <div className="flex items-center gap-4">
                    {visual && <img src={visual.icon} alt="" className="h-14 w-14 rounded-2xl border border-border object-cover shadow-xl" />}
                    <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                      {String(i + 1).padStart(2, "0")} — {p.domain}
                    </p>
                  </div>
                  <h3 className={`mt-5 font-display font-light tracking-tight text-foreground ${i === 0 ? "text-5xl md:text-7xl" : "text-4xl md:text-5xl"}`}>{p.name}</h3>
                  <p className="mt-2 text-muted-foreground">{p.tagline}</p>
                </div>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-all duration-500 group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  <ArrowUpRight size={18} />
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 z-10 p-8 md:p-10">
              {p.outcome && <p className="max-w-xl border-l-2 border-primary/60 bg-background/55 py-2 pr-3 pl-4 text-sm text-foreground backdrop-blur-md">{p.outcome}</p>}
              <div className="mt-5 flex flex-wrap gap-2">
                {p.platforms.map((pl) => (
                  <span key={pl} className="rounded-full bg-background/75 px-3 py-1 text-xs text-primary backdrop-blur-md">
                    {pl}
                  </span>
                ))}
                {p.stack.slice(0, 3).map((t) => (
                  <span key={t} className="rounded-full border border-border bg-background/75 px-3 py-1 text-xs text-foreground/80 backdrop-blur-md">
                    {t}
                  </span>
                ))}
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
      <div className="hero-glow pointer-events-none absolute bottom-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 translate-y-1/2 rounded-full bg-primary/15 blur-[120px]" />
      <div className="relative mx-auto max-w-4xl px-6 py-32 text-center md:py-48">
        <Reveal>
          <h2 className="font-display text-5xl leading-[1.02] font-light tracking-tight text-foreground md:text-8xl">
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
