import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Moon, Sun, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { profile } from "@/lib/portfolio-data";

const links = [
  { label: "Apps", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Stack", href: "/#stack" },
  { label: "Services", href: "/#services" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem("portfolio-theme");
    } catch {
      saved = null;
    }
    const nextDark = saved
      ? saved === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(nextDark);
    document.documentElement.classList.toggle("dark", nextDark);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const toggleTheme = () => {
    const nextDark = !dark;
    setDark(nextDark);
    document.documentElement.classList.toggle("dark", nextDark);
    try {
      window.localStorage.setItem("portfolio-theme", nextDark ? "dark" : "light");
    } catch {
      /* storage unavailable */
    }
  };

  const themeLabel = dark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color] duration-300",
        scrolled || open
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-[84rem] items-center justify-between px-5 md:h-20 md:px-10">
        <Link to="/" className="font-display text-lg font-semibold tracking-tight text-foreground">
          Vishal Pandey
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[0.95rem] text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-input text-foreground transition-colors hover:border-foreground"
            aria-label={themeLabel}
            title={themeLabel}
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a href={`mailto:${profile.email}`} className="btn btn-solid min-h-10 px-5 text-sm">
            Email me
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-input text-foreground"
            aria-label={themeLabel}
          >
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-input text-foreground"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="h-[calc(100dvh-4rem)] bg-background px-5 pt-6 md:hidden">
          <ul className="flex flex-col">
            {[...links, { label: "Contact", href: "/#contact" }].map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-border py-5 font-display text-4xl font-semibold text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={`mailto:${profile.email}`} className="btn btn-solid mt-8 w-full">
            Email me
          </a>
        </div>
      )}
    </header>
  );
}
