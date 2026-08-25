import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube, Radar, Mail, Phone } from "lucide-react";
import {
  COMPANY,
  EMAIL,
  NAV,
  PHONE_DISPLAY,
  PHONE_TEL,
  SERVICES,
  SOCIAL_LINKS,
  TAGLINE,
} from "@/lib/site";

const icons: Record<string, typeof Facebook> = {
  Facebook,
  Instagram,
  YouTube: Youtube,
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-[110rem] gap-10 px-4 py-14 md:grid-cols-2 md:px-8 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center border border-primary/60 bg-primary/10">
              <Radar className="size-5 text-primary" aria-hidden="true" />
            </span>
            <span className="font-display text-xl font-bold uppercase">SkyScan</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">{TAGLINE}</p>
          <a
            href={PHONE_TEL}
            className="mt-5 flex items-center gap-2 font-display text-2xl text-primary hover:brightness-110"
          >
            <Phone className="size-5" aria-hidden="true" />
            {PHONE_DISPLAY}
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="mt-2 flex items-center gap-2 break-all text-sm text-muted-foreground hover:text-foreground"
          >
            <Mail className="size-4" aria-hidden="true" />
            {EMAIL}
          </a>
          <div className="mt-5 flex gap-2">
            {SOCIAL_LINKS.filter((s) => s.href).map((s) => {
              const Icon = icons[s.label] ?? Facebook;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex size-11 items-center justify-center border border-border text-muted-foreground hover:border-primary hover:text-primary"
                >
                  <Icon className="size-5" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="hud-label">Navigation</h2>
          <ul className="mt-4 space-y-2.5">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="hud-label">Services</h2>
          <ul className="mt-4 space-y-2.5">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link
                  to="/services"
                  hash={s.slug}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="hud-label">Credentials</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li>FAA Part 107</li>
            <li>Insured</li>
            <li>24/7 Recovery Response</li>
          </ul>
          <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
            Thermal imaging is a tool that can help identify heat patterns and areas that may warrant
            further investigation. It does not replace evaluation by a qualified professional.
          </p>
        </div>
      </div>

      <div className="border-t border-border px-4 py-6 text-center text-xs text-muted-foreground md:px-8">
        © 2026 {COMPANY}. All Rights Reserved.
      </div>
    </footer>
  );
}
