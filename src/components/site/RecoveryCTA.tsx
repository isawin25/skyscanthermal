import { PHONE_DISPLAY, PHONE_SMS, PHONE_TEL } from "@/lib/site";
import { Phone, MessageSquare } from "lucide-react";
import { Reveal } from "./Reveal";

export function RecoveryCTA({ title = "Need Deer Recovery?" }: { title?: string }) {
  return (
    <section className="relative overflow-hidden border-y border-border bg-surface">
      <div className="absolute inset-0 tech-grid opacity-60" aria-hidden="true" />
      <div
        className="absolute -right-20 top-1/2 size-[28rem] -translate-y-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--heat)" }}
        aria-hidden="true"
      />
      <Reveal className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-16 text-center md:py-24">
        <span className="hud-label text-primary">24/7 Response</span>
        <h2 className="h-section">{title}</h2>
        <p className="max-w-2xl text-muted-foreground">
          Recovery calls are answered around the clock. The sooner we fly, the better the odds.
        </p>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <a
            href={PHONE_TEL}
            className="inline-flex min-h-14 items-center justify-center gap-3 bg-primary px-8 font-display text-2xl uppercase tracking-wider text-primary-foreground transition hover:brightness-110"
          >
            <Phone className="size-6" aria-hidden="true" />
            {PHONE_DISPLAY}
          </a>
          <a
            href={PHONE_SMS}
            className="inline-flex min-h-14 items-center justify-center gap-3 border border-border px-8 font-display text-2xl uppercase tracking-wider text-foreground transition hover:border-primary hover:text-primary"
          >
            <MessageSquare className="size-6" aria-hidden="true" />
            Text
          </a>
        </div>
      </Reveal>
    </section>
  );
}
