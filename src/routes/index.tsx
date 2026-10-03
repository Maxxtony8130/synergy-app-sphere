import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { Nav } from "@/components/portfolio/Nav";
import { CountUp, Reveal, SectionHeading } from "@/components/portfolio/shared";
import { experience, profile, projects, services, stats, techGroups } from "@/lib/portfolio-data";
import { projectAssets } from "@/lib/project-assets";

const TITLE = "Vishal Pandey — Senior React Native Developer";
const DESC = "Senior React Native Developer with 5+ years building high-performance iOS and Android apps. 9 production apps shipped across fintech, SaaS, sports-tech and more.";

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
    scripts: [{
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
    }],
  }),
  component: Index,
});

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-24 pt-32">
      <div className="absolute inset-x-6 top-28 z-10 hidden items-center justify-between text-[10px] uppercase text-muted-foreground lg:flex">
        <span>Portfolio / 2026 edition</span>
        <span className="flex items-center gap-3"><i className="soft-pulse h-1.5 w-1.5 rounded-full bg-primary" /> Available for projects</span>
      </div>

      <div className="cinematic-mask pointer-events-none absolute inset-y-16 left-1/2 w-[min(76vw,32rem)] -translate-x-1/2 opacity-55 md:w-[min(46vw,34rem)]">
        <img src="/assets/profile/vishal-pandey.webp" alt="Vishal Pandey, Senior React Native Developer" width={720} height={900} className="portrait-breathe h-full w-full object-cover object-top grayscale" />
        <div className="absolute inset-0 bg-background/25" />
      </div>

      <div className="relative z-20 mx-auto flex w-full max-w-[100rem] flex-col items-center text-center">
        <Reveal variant="label"><p className="mb-7 text-[10px] font-semibold uppercase text-primary">{profile.title}</p></Reveal>
        <Reveal variant="title" delay={1}>
          <h1 className="font-display text-[clamp(4.5rem,12vw,11.5rem)] leading-[0.76] font-normal text-foreground">
            Vishal <span className="italic text-foreground/70">Pandey</span>
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <p className="mx-auto mt-16 max-w-xl text-base leading-7 text-muted-foreground md:text-xl">
            Building high-performance mobile products for iOS and Android.
            <span className="mt-2 block font-display text-2xl italic text-primary">5+ years. 9 products shipped.</span>
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="#work" className="editorial-button bg-primary text-primary-foreground">Explore projects <ArrowRight size={15} /></a>
            <a href="#contact" className="editorial-button border border-border bg-background/35 text-foreground backdrop-blur-sm">Start a project</a>
          </div>
        </Reveal>
      </div>

      <div className="absolute inset-x-6 bottom-7 z-20 flex items-end justify-between md:inset-x-10">
        <div className="flex items-center gap-5 text-muted-foreground">
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-primary"><Linkedin size={16} /></a>
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="transition-colors hover:text-primary"><Github size={16} /></a>
          <a href={`mailto:${profile.email}`} aria-label="Email" className="transition-colors hover:text-primary"><Mail size={16} /></a>
        </div>
        <a href="#about" className="flex flex-col items-center gap-2 text-[9px] uppercase text-muted-foreground"><span className="relative h-12 w-px overflow-hidden bg-border"><i className="scroll-line absolute inset-x-0 top-0 h-1/2 bg-primary" /></span>Scroll</a>
        <span className="hidden text-[9px] uppercase text-muted-foreground md:block">{profile.location}</span>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-28 md:px-10 md:py-48">
      <div className="grid gap-12 lg:grid-cols-[0.32fr_0.68fr]">
        <Reveal variant="label"><p className="section-label"><span />Portfolio perspective</p></Reveal>
        <Reveal variant="title">
          <p className="font-display text-4xl leading-[1.12] text-muted-foreground md:text-6xl">
            I turn product ideas into <em className="text-primary">production mobile apps</em> — owning architecture, real-time and offline-first data, payments, authentication, and <span className="text-foreground">the road to both stores.</span>
          </p>
        </Reveal>
      </div>
      <div className="mt-24 grid gap-12 md:grid-cols-3">
        {[
          ["End-to-end ownership", "Multiple apps shipped as sole developer or technical lead — from first commit to store release."],
          ["Built for real conditions", "Offline-first storage, background uploads, retry logic, and low-connectivity handling."],
          ["Performance at scale", "State, sync, and rendering optimized to support 5,000+ concurrent users."],
        ].map(([title, copy], index) => (
          <Reveal key={title} delay={(index + 1) as 1 | 2 | 3}>
            <article className="group border-t border-border pt-7">
              <span className="font-display text-xl italic text-primary">0{index + 1}</span>
              <h3 className="mt-8 text-lg font-medium text-foreground">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{copy}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Proof() {
  return (
    <section className="bg-card/35 py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-14 px-6 md:grid-cols-3 md:px-10">
        {stats.map((stat, index) => (
          <Reveal key={stat.label} delay={((index % 3) + 1) as 1 | 2 | 3}>
            <div className="text-center md:text-left">
              <div className="font-display text-5xl text-foreground md:text-7xl"><CountUp value={stat.value} suffix={stat.suffix} /></div>
              <p className="mt-3 text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="mx-auto max-w-[94rem] scroll-mt-20 px-6 py-28 md:px-10 md:py-48">
      <SectionHeading kicker="Selected work" title="Digital craftsmanship." aside="Nine products · live in the stores" />
      <div className="space-y-28 md:space-y-44">
        {projects.map((project, index) => {
          const visual = projectAssets[project.slug];
          const reverse = index % 2 === 1;
          return (
            <Reveal key={project.slug} variant="media">
              <article className="group grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
                <Link to="/work/$slug" params={{ slug: project.slug }} className={`project-stage relative min-h-[34rem] overflow-hidden bg-secondary lg:col-span-7 ${reverse ? "lg:order-2" : ""}`}>
                  {visual && (
                    <div className="absolute inset-0 flex items-center justify-center gap-5 p-10 md:p-16">
                      <div className={`project-screen project-shadow relative z-10 overflow-hidden bg-background ${visual.landscape ? "w-[88%]" : "h-[80%] w-[43%] -rotate-3"}`}>
                        <img src={visual.screens[0]} alt={`${project.name} app interface`} loading="lazy" className={`h-full w-full ${visual.landscape ? "object-cover" : "object-cover object-top"}`} />
                      </div>
                      {!visual.landscape && <div className="project-screen relative mt-20 h-[68%] w-[35%] rotate-6 overflow-hidden bg-background opacity-55"><img src={visual.screens[1]} alt={`${project.name} app interface detail`} loading="lazy" className="h-full w-full object-cover object-top" /></div>}
                    </div>
                  )}
                  <span className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center border border-foreground/15 bg-background/40 text-foreground backdrop-blur-md transition-all duration-500 group-hover:rotate-45 group-hover:bg-primary group-hover:text-primary-foreground"><ArrowUpRight size={17} /></span>
                </Link>
                <div className={`lg:col-span-5 ${reverse ? "lg:order-1" : ""}`}>
                  <div className="flex items-center gap-5">
                    {visual && <img src={visual.icon} alt={`${project.name} icon`} className="h-14 w-14 border border-border object-cover" />}
                    <div><p className="text-[10px] uppercase text-primary">{String(index + 1).padStart(2, "0")} — {project.domain}</p><p className="mt-1 text-[10px] uppercase text-muted-foreground">{project.tagline}</p></div>
                  </div>
                  <h3 className="mt-10 font-display text-6xl leading-none text-foreground transition-colors duration-500 group-hover:text-primary md:text-8xl">{project.name}.</h3>
                  <p className="mt-8 text-base leading-8 text-muted-foreground">{project.overview}</p>
                  {project.outcome && <p className="mt-8 border-l border-primary pl-6 font-display text-xl italic leading-8 text-foreground">{project.outcome}</p>}
                  <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">{[...project.platforms, ...project.stack.slice(0, 3)].map((tag) => <span key={tag} className="text-[10px] uppercase text-muted-foreground">{tag}</span>)}</div>
                  <Link to="/work/$slug" params={{ slug: project.slug }} className="mt-10 inline-flex items-center gap-5 text-xs font-semibold uppercase text-foreground transition-colors hover:text-primary">Case study <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border"><ArrowUpRight size={15} /></span></Link>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="bg-card/30 py-28 md:py-44">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading kicker="Experience" title="Six years of shipping." />
        <div>{experience.map((item, index) => <Reveal key={item.company}><article className="grid gap-6 border-t border-border py-10 md:grid-cols-[80px_220px_1fr]"><span className="font-display text-xl italic text-primary">0{index + 1}</span><div><p className="text-sm text-foreground">{item.period}</p><p className="mt-2 text-xs text-muted-foreground">{item.location}</p></div><div><h3 className="font-display text-3xl text-foreground">{item.role}</h3><p className="mt-2 text-muted-foreground">{item.company}</p><ul className="mt-6 max-w-3xl space-y-3">{item.points.map((point) => <li key={point} className="text-sm leading-7 text-foreground/75">{point}</li>)}</ul></div></article></Reveal>)}</div>
      </div>
    </section>
  );
}

function StackAndServices() {
  return (
    <>
      <section id="stack" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-28 md:px-10 md:py-44">
        <SectionHeading kicker="Toolkit" title="The stack behind the products." />
        <div className="grid gap-x-16 md:grid-cols-2 lg:grid-cols-4">{techGroups.map((group, index) => <Reveal key={group.name} delay={((index % 4) + 1) as 1 | 2 | 3 | 4}><article className="border-t border-border py-7"><p className="text-[10px] uppercase text-primary">{group.name}</p><ul className="mt-6 space-y-2">{group.items.map((item) => <li key={item} className="text-sm text-muted-foreground">{item}</li>)}</ul></article></Reveal>)}</div>
      </section>
      <section id="services" className="mx-auto max-w-7xl scroll-mt-20 px-6 pb-28 md:px-10 md:pb-44">
        <SectionHeading kicker="Working with me" title="Where I can help." />
        <div className="grid gap-x-16 md:grid-cols-2">{services.map((service, index) => <Reveal key={service.title}><article className="group flex gap-6 border-t border-border py-8"><span className="font-display text-lg italic text-primary">{String(index + 1).padStart(2, "0")}</span><div><h3 className="text-lg text-foreground">{service.title}</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">{service.description}</p></div></article></Reveal>)}</div>
      </section>
    </>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-32 text-center md:py-52">
        <Reveal variant="label"><p className="text-[10px] uppercase text-primary">The next chapter</p></Reveal>
        <Reveal variant="title" delay={1}><h2 className="mt-8 font-display text-6xl leading-[0.86] text-foreground md:text-9xl">Have a product <em className="text-primary">in mind?</em></h2></Reveal>
        <Reveal delay={2}><p className="mx-auto mt-8 max-w-lg text-lg text-muted-foreground">Let's turn your idea into a production-ready mobile experience.</p><a href={`mailto:${profile.email}`} className="editorial-button mt-10 bg-primary text-primary-foreground">Start a conversation <ArrowRight size={16} /></a></Reveal>
      </div>
      <footer className="border-t border-border"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 py-10 text-xs text-muted-foreground md:flex-row md:px-10"><div className="flex gap-6"><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a><a href={`mailto:${profile.email}`}>Email</a></div><span>{profile.location}</span><a href="#" aria-label="Back to top" className="flex h-10 w-10 items-center justify-center border border-border"><ArrowDown className="rotate-180" size={15} /></a></div></footer>
    </section>
  );
}

function Index() {
  return <div className="grain min-h-screen"><Nav /><main><Hero /><About /><Proof /><Work /><Experience /><StackAndServices /><Contact /></main></div>;
}