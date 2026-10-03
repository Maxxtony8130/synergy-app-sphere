import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-700",
        scrolled
          ? "border-b border-border bg-background/88 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-[90rem] items-center justify-between px-6 py-5 md:px-10">
        <Link
          to="/"
          className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.32em] text-foreground"
        >
          <span className="flex h-6 w-6 items-center justify-center border border-border font-display text-sm text-primary">V</span>
          Vishal Pandey
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/#contact"
            className="border border-primary/60 px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Let's talk
          </a>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center border border-border text-foreground md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-b border-border bg-background/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-border px-3 py-4 text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
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
