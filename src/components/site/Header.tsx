import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Phone, Radar } from "lucide-react";
import { NAV, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open ? "border-b border-border bg-background/95 backdrop-blur" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-[110rem] items-center justify-between gap-4 px-4 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-2.5" aria-label="SkyScan Thermal Solutions home">
          <span className="flex size-9 items-center justify-center border border-primary/60 bg-primary/10">
            <Radar className="size-5 text-primary" aria-hidden="true" />
          </span>
          <span className="leading-none">
            <span className="block font-display text-lg font-bold uppercase tracking-wide md:text-xl">
              SkyScan
            </span>
            <span className="hud-label block text-[0.55rem] md:text-[0.6rem]">Thermal Solutions</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 xl:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="px-3 py-2 font-display text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={PHONE_TEL}
            className="hidden min-h-11 items-center gap-2 bg-primary px-4 py-2 font-display text-sm uppercase tracking-widest text-primary-foreground transition hover:brightness-110 md:inline-flex"
          >
            <Phone className="size-4" aria-hidden="true" />
            Call {PHONE_DISPLAY}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex size-11 items-center justify-center border border-border text-foreground xl:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          aria-label="Mobile"
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-background px-4 pb-28 pt-2 xl:hidden"
        >
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="block border-b border-border py-4 font-display text-2xl uppercase tracking-wide text-foreground"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={PHONE_TEL}
            className="mt-6 flex min-h-12 items-center justify-center gap-2 bg-primary px-4 font-display text-lg uppercase tracking-widest text-primary-foreground"
          >
            <Phone className="size-5" aria-hidden="true" /> Call {PHONE_DISPLAY}
          </a>
        </nav>
      )}
    </header>
  );
}
