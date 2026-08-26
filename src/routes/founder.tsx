import { createFileRoute } from "@tanstack/react-router";
import { UserRound, Image as ImageIcon } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { RecoveryCTA } from "@/components/site/RecoveryCTA";
import { CallButton, GhostLink } from "@/components/site/CTAButtons";

export const Route = createFileRoute("/founder")({
  head: () => ({
    meta: [
      { title: "Meet the Founder — Hoyt Munro | SkyScan Thermal Solutions" },
      {
        name: "description",
        content:
          "Hoyt Munro is the founder and owner of SkyScan Thermal Solutions, a Michigan thermal drone service for recovery and inspection work.",
      },
      { property: "og:title", content: "Meet the Founder — Hoyt Munro" },
      {
        property: "og:description",
        content: "Built around technology, precision & results.",
      },
      { property: "og:url", content: "/founder" },
      { property: "og:type", content: "profile" },
    ],
    links: [{ rel: "canonical", href: "/founder" }],
  }),
  component: FounderPage,
});

/** EDITABLE: replace each placeholder with Hoyt's own words. Nothing here is invented. */
const bioBlocks = [
  { h: "Background", p: "[Add Hoyt's background here.]" },
  { h: "Why he started SkyScan", p: "[Add the story behind starting SkyScan Thermal Solutions.]" },
  { h: "Experience with drones", p: "[Add drone flying experience here.]" },
  { h: "Thermal imaging experience", p: "[Add thermal imaging experience here.]" },
  { h: "Wildlife recovery experience", p: "[Add recovery experience here.]" },
  { h: "Inspection experience", p: "[Add inspection experience here.]" },
  { h: "Personal mission", p: "[Add Hoyt's mission statement here.]" },
  { h: "Why customers should trust SkyScan", p: "[Add the trust statement here.]" },
];

/** EDITABLE: add real completed work. Empty until supplied by the owner. */
const workGallery: {
  name: string;
  date: string;
  service: string;
  location: string;
  description: string;
  outcome: string;
}[] = [];

function FounderPage() {
  return (
    <>
      <PageHero
        eyebrow="Meet the Founder"
        title="Built Around Technology, Precision & Results"
        intro="Hoyt Munro — Founder & Owner, SkyScan Thermal Solutions."
      />

      <section className="mx-auto grid max-w-[80rem] gap-10 px-4 py-16 md:px-8 md:py-24 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <div className="panel relative flex aspect-[4/5] items-center justify-center overflow-hidden">
            <div className="absolute inset-0 tech-grid opacity-60" aria-hidden="true" />
            <div className="relative flex flex-col items-center gap-3 p-8 text-center">
              <UserRound className="size-16 text-primary" aria-hidden="true" />
              <span className="font-display text-2xl uppercase">Hoyt Munro</span>
              <span className="hud-label">Portrait placeholder</span>
              <p className="max-w-xs text-xs text-muted-foreground">
                Add a professional portrait to <code className="font-mono">src/assets</code> and import
                it here to replace this placeholder.
              </p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <h2 className="h-section">Hoyt Munro</h2>
            <p className="hud-label mt-2 text-primary">Founder &amp; Owner — SkyScan Thermal Solutions</p>
            <p className="mt-5 text-muted-foreground">
              This biography is intentionally left as editable placeholders. Nothing about Hoyt&apos;s
              experience, certifications, or history has been written for him — each section below is a
              slot for his own words.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-2">
            {bioBlocks.map((b, i) => (
              <Reveal key={b.h} delay={i * 40} className="bg-background p-5">
                <h3 className="hud-label text-primary">{b.h}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CallButton />
            <GhostLink to="/contact">Send a Request</GhostLink>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border bg-surface/40">
        <div className="mx-auto max-w-[80rem] px-4 py-16 md:px-8 md:py-24">
          <Reveal>
            <span className="hud-label text-primary">Portfolio</span>
            <h2 className="h-section mt-3">The Work Behind the Technology</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Completed recovery missions, wildlife tracking, thermal imagery, solar and roof
              inspections, and field operations — added as Hoyt supplies them.
            </p>
          </Reveal>

          {workGallery.length === 0 ? (
            <Reveal className="panel mt-8 flex flex-col items-center gap-3 p-10 text-center">
              <ImageIcon className="size-10 text-primary" aria-hidden="true" />
              <h3 className="h-card">Gallery awaiting real work</h3>
              <p className="max-w-xl text-sm text-muted-foreground">
                No projects have been fabricated. Add entries to{" "}
                <code className="font-mono">workGallery</code> in{" "}
                <code className="font-mono">src/routes/founder.tsx</code> — each supports a project
                name, date, service, general location, description, images, thermal imagery, and
                outcome.
              </p>
            </Reveal>
          ) : (
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {workGallery.map((w) => (
                <Reveal as="li" key={w.name} className="panel p-6">
                  <h3 className="h-card">{w.name}</h3>
                  <p className="hud-label mt-2">
                    {w.date} · {w.service} · {w.location}
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">{w.description}</p>
                  <p className="mt-3 text-sm">{w.outcome}</p>
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </section>

      <RecoveryCTA />
    </>
  );
}
