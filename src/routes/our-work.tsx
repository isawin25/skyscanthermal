import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Camera, MapPin, CalendarDays, Tag } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { RecoveryCTA } from "@/components/site/RecoveryCTA";
import { ThermalSlider } from "@/components/site/ThermalSlider";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PROJECTS, PROJECT_CATEGORIES, type Project } from "@/lib/site";
import fieldNormal from "@/assets/field-normal.jpg";
import fieldThermal from "@/assets/field-thermal.jpg";

export const Route = createFileRoute("/our-work")({
  head: () => ({
    meta: [
      { title: "Our Work | Thermal Drone Case Studies | SkyScan Thermal Solutions" },
      {
        name: "description",
        content:
          "Thermal drone project gallery: deer recovery, wildlife, livestock, solar, roofing and building inspections. Compare normal and thermal imagery side by side.",
      },
      { property: "og:title", content: "Our Work | SkyScan Thermal Solutions" },
      {
        property: "og:description",
        content: "A growing portfolio of thermal drone recovery and inspection flights.",
      },
      { property: "og:url", content: "/our-work" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/our-work" }],
  }),
  component: OurWorkPage,
});

function fallbackMedia(_p: Project) {
  return { n: fieldNormal, t: fieldThermal };
}

function OurWorkPage() {
  const [filter, setFilter] = useState<string>("All");
  const [active, setActive] = useState<Project | null>(null);

  const visible = PROJECTS.filter((p) => filter === "All" || p.category === filter);

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Our Work"
        intro="Completed flights, thermal imagery, and outcomes. Project slots below are placeholders until real project details and imagery are added."
      />

      <section className="mx-auto max-w-[80rem] px-4 py-14 md:px-8 md:py-20">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
          {PROJECT_CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
              className={`min-h-11 border px-4 font-display text-sm uppercase tracking-widest transition ${
                filter === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => {
            const m = fallbackMedia(p);
            return (
              <Reveal as="li" key={p.id} delay={i * 60}>
                <button
                  type="button"
                  onClick={() => setActive(p)}
                  className="group block w-full text-left"
                >
                  <div className="relative aspect-[4/3] overflow-hidden border border-border bg-surface">
                    <img
                      src={p.thermalImage ?? m.t}
                      alt={`${p.title} — thermal drone imagery`}
                      loading="lazy"
                      className="size-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 scan-lines opacity-30" aria-hidden="true" />
                    <span className="hud-label absolute left-3 top-3 bg-background/80 px-2 py-1 text-primary">
                      {p.category}
                    </span>
                    {p.placeholder && (
                      <span className="hud-label absolute bottom-3 left-3 bg-background/80 px-2 py-1">
                        Placeholder
                      </span>
                    )}
                  </div>
                  <h2 className="h-card mt-4 transition-colors group-hover:text-primary">
                    {p.title}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {p.date} · {p.location}
                  </p>
                </button>
              </Reveal>
            );
          })}
        </ul>

        <p className="mt-10 border-l-2 border-primary/60 bg-surface p-4 text-sm text-muted-foreground">
          <Camera className="mr-2 inline size-4 text-primary" aria-hidden="true" />
          Owner note: projects are stored in <code className="font-mono">src/lib/site.ts</code> — add a
          title, date, general location, service, description, outcome and image paths to publish a new
          case study.
        </p>
      </section>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-h-[90dvh] max-w-3xl overflow-y-auto">
          {active && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl uppercase">{active.title}</DialogTitle>
              </DialogHeader>
              <dl className="grid grid-cols-2 gap-4 border-y border-border py-4 text-sm sm:grid-cols-3">
                <div>
                  <dt className="hud-label flex items-center gap-1">
                    <CalendarDays className="size-3" aria-hidden="true" /> Date
                  </dt>
                  <dd className="mt-1">{active.date}</dd>
                </div>
                <div>
                  <dt className="hud-label flex items-center gap-1">
                    <MapPin className="size-3" aria-hidden="true" /> Location
                  </dt>
                  <dd className="mt-1">{active.location}</dd>
                </div>
                <div>
                  <dt className="hud-label flex items-center gap-1">
                    <Tag className="size-3" aria-hidden="true" /> Service
                  </dt>
                  <dd className="mt-1">{active.service}</dd>
                </div>
              </dl>
              <p className="text-muted-foreground">{active.description}</p>
              <ThermalSlider
                normalSrc={active.normalImage ?? fallbackMedia(active).n}
                thermalSrc={active.thermalImage ?? fallbackMedia(active).t}
                normalAlt={`${active.title} — standard aerial view`}
                thermalAlt={`${active.title} — thermal aerial view`}
                caption="Drag to compare the normal and thermal views."
              />
              <div>
                <h3 className="hud-label text-primary">Outcome</h3>
                <p className="mt-2 text-muted-foreground">{active.outcome}</p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <RecoveryCTA />
    </>
  );
}
