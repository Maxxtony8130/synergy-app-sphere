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
    <section className="relative min-h-screen overflow-hidden px-6 pb-20 pt-32 md:px-10 md:pb-14 md:pt-40">
      <div className="mx-auto flex min-h-[calc(100vh-12rem)] max-w-[100rem] flex-col justify-between">
        <div className="flex items-center justify-between text-[10px] font-medium uppercase text-muted-foreground">
          <span>Portfolio / 2026 edition</span>
          <span className="flex items-center gap-3"><i className="soft-pulse h-1.5 w-1.5 rounded-full bg-primary" /> Available for projects</span>
        </div>
        <div className="relative grid items-end gap-12 py-14 lg:grid-cols-12 lg:py-8">
          <div className="relative z-20 lg:col-span-9">
            <Reveal variant="label"><p className="section-label"><span />{profile.title}</p></Reveal>
            <Reveal variant="title" delay={1}>
              <h1 className="mt-8 font-display text-[clamp(4.5rem,11vw,10.5rem)] leading-[0.78] font-normal text-foreground">
                Building mobile<br /><em className="text-primary">experiences</em> that<br />perform.
              </h1>
            </Reveal>
          </div>
          <Reveal variant="media" delay={2} className="relative lg:col-span-3 lg:-ml-24">
            <div className="portrait-frame relative mx-auto aspect-[4/5] max-w-sm overflow-hidden bg-secondary lg:mb-5">
              <img src="/assets/profile/vishal-pandey.webp" alt="Vishal Pandey, Senior React Native Developer" width={720} height={900} className="portrait-breathe h-full w-full object-cover object-top grayscale" />
              <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-background/80 to-transparent" />
              <p className="absolute bottom-5 left-5 text-[10px] font-semibold uppercase text-foreground">Vishal Pandey · Noida</p>
            </div>
          </Reveal>
          <Reveal delay={3} className="lg:col-start-9 lg:col-span-4">
            <p className="max-w-lg text-base leading-8 text-muted-foreground md:text-lg">{profile.positioning}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#work" className="editorial-button bg-foreground text-background">Explore work <ArrowRight size={15} /></a>
              <a href="#contact" className="editorial-button border border-border text-foreground">Start a project</a>
            </div>
          </Reveal>
        </div>
        <div className="flex items-end justify-between border-t border-border pt-5">
        <div className="flex items-center gap-5 text-muted-foreground">
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-primary"><Linkedin size={16} /></a>
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="transition-colors hover:text-primary"><Github size={16} /></a>
          <a href={`mailto:${profile.email}`} aria-label="Email" className="transition-colors hover:text-primary"><Mail size={16} /></a>
        </div>
        <a href="#about" className="flex items-center gap-3 text-[9px] font-semibold uppercase text-muted-foreground"><span className="relative h-px w-12 overflow-hidden bg-border"><i className="scroll-line-horizontal absolute inset-y-0 left-0 w-1/2 bg-primary" /></span>Scroll</a>
        <span className="hidden text-[9px] uppercase text-muted-foreground md:block">{profile.location}</span>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-[100rem] scroll-mt-24 px-6 py-28 md:px-10 md:py-48">
      <div className="grid gap-12 lg:grid-cols-[0.32fr_0.68fr]">
        <Reveal variant="label"><p className="section-label"><span />Portfolio perspective</p></Reveal>
        <Reveal variant="title">
          <p className="font-display text-4xl leading-[1.12] text-muted-foreground md:text-6xl">
            I turn product ideas into <em className="text-primary">production mobile apps</em> — owning architecture, real-time and offline-first data, payments, authentication, and <span className="text-foreground">the road to both stores.</span>
          </p>
        </Reveal>
      </div>
      <div className="mt-24 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
        {[
          ["End-to-end ownership", "Multiple apps shipped as sole developer or technical lead — from first commit to store release."],
          ["Built for real conditions", "Offline-first storage, background uploads, retry logic, and low-connectivity handling."],
          ["Performance at scale", "State, sync, and rendering optimized to support 5,000+ concurrent users."],
        ].map(([title, copy], index) => (
          <Reveal key={title} delay={(index + 1) as 1 | 2 | 3}>
            <article className="group h-full bg-background p-8 transition-colors duration-500 hover:bg-secondary md:p-10">
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
    <section className="theme-inverse py-24 text-background md:py-32">
      <div className="mx-auto grid max-w-[100rem] grid-cols-2 gap-px px-6 md:grid-cols-3 md:px-10">
        {stats.map((stat, index) => (
          <Reveal key={stat.label} delay={((index % 3) + 1) as 1 | 2 | 3}>
            <div className="border-l border-background/20 px-5 py-6 md:px-10">
              <div className="font-display text-5xl md:text-8xl"><CountUp value={stat.value} suffix={stat.suffix} /></div>
              <p className="mt-3 max-w-[12rem] text-xs text-background/65">{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Work() {
  const workLayout = [
    "md:col-span-8",
    "md:col-span-4 md:mt-24",
    "md:col-span-4",
    "md:col-span-8 md:mt-24",
    "md:col-span-8",
    "md:col-span-4 md:mt-24",
    "md:col-span-4",
    "md:col-span-8 md:mt-24",
    "md:col-span-12",
  ];

  return (
    <section id="work" className="mx-auto max-w-[94rem] scroll-mt-20 px-6 py-28 md:px-10 md:py-48">
      <SectionHeading kicker="Selected work" title="Digital craftsmanship." aside="Nine products · live in the stores" />
      <div className="grid gap-x-8 gap-y-24 md:grid-cols-12">
        {projects.map((project, index) => {
          const visual = projectAssets[project.slug];
          const layout = workLayout[index] ?? "md:col-span-6";
          return (
            <Reveal key={project.slug} variant="media" className={layout}>
              <article className="group w-full">
                <Link to="/work/$slug" params={{ slug: project.slug }} className={`project-stage relative block overflow-hidden bg-secondary ${layout.includes("col-span-12") ? "aspect-[16/7]" : layout.includes("col-span-8") ? "aspect-[16/10]" : "aspect-[4/5]"}`}>
                  {visual && (
                    <div className="absolute inset-0 flex items-center justify-center gap-5 p-10 md:p-16">
                       <div className={`device-frame project-screen project-shadow relative z-10 overflow-hidden bg-background ${visual.landscape ? "w-[88%]" : "h-[80%] w-[43%] -rotate-3"}`}>
                        <img src={visual.screens[0]} alt={`${project.name} app interface`} loading="lazy" className={`h-full w-full ${visual.landscape ? "object-cover" : "object-cover object-top"}`} />
                      </div>
                       {!visual.landscape && <div className="device-frame project-screen relative mt-20 h-[68%] w-[35%] rotate-6 overflow-hidden bg-background opacity-60"><img src={visual.screens[1]} alt={`${project.name} app interface detail`} loading="lazy" className="h-full w-full object-cover object-top" /></div>}
                    </div>
                  )}
                  <span className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center border border-foreground/15 bg-background/40 text-foreground backdrop-blur-md transition-all duration-500 group-hover:rotate-45 group-hover:bg-primary group-hover:text-primary-foreground"><ArrowUpRight size={17} /></span>
                </Link>
                <div className="mt-7">
                  <div className="flex items-center gap-5">
                    {visual && <img src={visual.icon} alt={`${project.name} icon`} className="h-14 w-14 border border-border object-cover" />}
                    <div><p className="text-[10px] uppercase text-primary">{String(index + 1).padStart(2, "0")} — {project.domain}</p><p className="mt-1 text-[10px] uppercase text-muted-foreground">{project.tagline}</p></div>
                  </div>
                   <h3 className="mt-7 font-display text-4xl leading-none text-foreground transition-colors duration-500 group-hover:text-primary md:text-6xl">{project.name}.</h3>
                   <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">{project.overview}</p>
                   {project.outcome && <p className="mt-5 max-w-2xl font-display text-lg italic leading-7 text-primary">{project.outcome}</p>}
                  <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">{[...project.platforms, ...project.stack.slice(0, 3)].map((tag) => <span key={tag} className="text-[10px] uppercase text-muted-foreground">{tag}</span>)}</div>
                   <Link to="/work/$slug" params={{ slug: project.slug }} className="mt-7 inline-flex items-center gap-4 text-xs font-semibold uppercase text-foreground transition-colors hover:text-primary">Case study <ArrowUpRight size={15} /></Link>
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
    <section id="experience" className="bg-secondary py-28 md:py-44">
      <div className="mx-auto max-w-[100rem] px-6 md:px-10">
        <SectionHeading kicker="Experience" title="Six years of shipping." />
        <div className="relative experience-line">{experience.map((item, index) => <Reveal key={item.company}><article className="group relative grid gap-6 border-t border-border py-10 md:grid-cols-[80px_220px_1fr] md:py-14"><span className="relative z-10 font-display text-xl italic text-primary">0{index + 1}</span><div><p className="text-sm text-foreground">{item.period}</p><p className="mt-2 text-xs text-muted-foreground">{item.location}</p></div><div><h3 className="font-display text-3xl text-foreground transition-colors group-hover:text-primary md:text-4xl">{item.role}</h3><p className="mt-2 text-muted-foreground">{item.company}</p><ul className="mt-6 max-w-3xl space-y-3">{item.points.map((point) => <li key={point} className="text-sm leading-7 text-foreground/75">{point}</li>)}</ul></div></article></Reveal>)}</div>
      </div>
    </section>
  );
}

function StackAndServices() {
  return (
    <>
      <section id="stack" className="mx-auto max-w-[100rem] scroll-mt-20 px-6 py-28 md:px-10 md:py-44">
        <SectionHeading kicker="Toolkit" title="The stack behind the products." />
        <div className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 lg:grid-cols-4">{techGroups.map((group, index) => <Reveal key={group.name} delay={((index % 4) + 1) as 1 | 2 | 3 | 4}><article className="h-full bg-background p-8 transition-colors hover:bg-secondary"><p className="text-[10px] font-semibold uppercase text-primary">0{index + 1} · {group.name}</p><ul className="mt-8 space-y-2">{group.items.map((item) => <li key={item} className="text-sm text-muted-foreground">{item}</li>)}</ul></article></Reveal>)}</div>
      </section>
      <section id="services" className="mx-auto max-w-[100rem] scroll-mt-20 px-6 pb-28 md:px-10 md:pb-44">
        <SectionHeading kicker="Working with me" title="Where I can help." />
        <div>{services.map((service, index) => <Reveal key={service.title}><article className="group grid gap-5 border-t border-border py-8 transition-colors md:grid-cols-[80px_0.8fr_1.2fr] md:items-center"><span className="font-display text-lg italic text-primary">{String(index + 1).padStart(2, "0")}</span><h3 className="font-display text-3xl text-foreground transition-transform duration-500 group-hover:translate-x-2 md:text-4xl">{service.title}</h3><p className="max-w-xl text-sm leading-7 text-muted-foreground">{service.description}</p></article></Reveal>)}</div>
      </section>
    </>
  );
}

function Contact() {
  return (
    <section id="contact" className="theme-inverse relative scroll-mt-20 overflow-hidden text-background">
      <div className="mx-auto max-w-[100rem] px-6 py-32 md:px-10 md:py-52">
        <Reveal variant="label"><p className="text-[10px] uppercase text-primary">The next chapter</p></Reveal>
        <Reveal variant="title" delay={1}><h2 className="mt-8 max-w-6xl font-display text-6xl leading-[0.86] md:text-9xl">Have a product <em className="text-primary">in mind?</em></h2></Reveal>
        <Reveal delay={2}><div className="mt-12 flex flex-col justify-between gap-8 md:flex-row md:items-end"><p className="max-w-lg text-lg text-background/65">Let's turn your idea into a production-ready mobile experience.</p><a href={`mailto:${profile.email}`} className="editorial-button bg-primary text-primary-foreground">Start a conversation <ArrowRight size={16} /></a></div></Reveal>
      </div>
      <footer className="border-t border-background/20"><div className="mx-auto flex max-w-[100rem] flex-col items-center justify-between gap-5 px-6 py-10 text-xs text-background/65 md:flex-row md:px-10"><div className="flex gap-6"><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a><a href={`mailto:${profile.email}`}>Email</a></div><span>{profile.location}</span><a href="#" aria-label="Back to top" className="flex h-10 w-10 items-center justify-center rounded-full border border-background/20"><ArrowDown className="rotate-180" size={15} /></a></div></footer>
    </section>
  );
}

function Index() {
  return <div className="grain min-h-screen"><Nav /><main><Hero /><About /><Proof /><Work /><Experience /><StackAndServices /><Contact /></main></div>;
}