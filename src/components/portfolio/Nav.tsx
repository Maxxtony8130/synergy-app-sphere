import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Moon, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Stack", href: "/#stack" },
  { label: "Services", href: "/#services" },
  { label: "Contact", href: "/#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-theme");
    const nextDark = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(nextDark);
    document.documentElement.classList.toggle("dark", nextDark);
  }, []);

  const toggleTheme = () => {
    const nextDark = !dark;
    setDark(nextDark);
    document.documentElement.classList.toggle("dark", nextDark);
    window.localStorage.setItem("portfolio-theme", nextDark ? "dark" : "light");
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-700",
        scrolled
          ? "border-b border-border bg-background/88 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-[100rem] items-center justify-between px-6 py-5 md:px-10 md:py-7">
        <Link
          to="/"
          className="flex items-center gap-3 text-[10px] font-semibold uppercase text-foreground"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/60 font-display text-base italic text-primary">V</span>
          Vishal Pandey
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[10px] uppercase text-muted-foreground transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-10 w-10 rounded-full border border-border text-foreground hover:border-primary hover:bg-secondary"
            aria-label={dark ? "Use light theme" : "Use dark theme"}
            title={dark ? "Use light theme" : "Use dark theme"}
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </Button>
          <a
            href="/#contact"
            className="editorial-button min-h-11 border border-border px-6 text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground"
          >
            Let's talk
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-10 w-10 rounded-full border border-border text-foreground" aria-label={dark ? "Use light theme" : "Use dark theme"}>
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full border-border text-foreground"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </nav>

      {open && (
        <div className="border-b border-border bg-background/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-border px-3 py-4 text-xs uppercase text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
