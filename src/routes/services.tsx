import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Check } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { RecoveryCTA } from "@/components/site/RecoveryCTA";
import { CallButton, GhostLink } from "@/components/site/CTAButtons";
import { ThermalSlider } from "@/components/site/ThermalSlider";
import { SERVICES } from "@/lib/site";
import roofNormal from "@/assets/roof-normal.jpg";
import roofThermal from "@/assets/roof-thermal.jpg";
import fieldNormal from "@/assets/field-normal.jpg";
import fieldThermal from "@/assets/field-thermal.jpg";
import solarNormal from "@/assets/solar-normal.jpg";
import solarThermal from "@/assets/solar-thermal.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Thermal Drone Services | Deer Recovery, Solar & Roof Inspections" },
      {
        name: "description",
        content:
          "Deer recovery, livestock tracking, herd counts, solar panel inspections, roof heat-loss scans and building thermal inspections by drone across Michigan.",
      },
      { property: "og:title", content: "Thermal Drone Services | SkyScan Thermal Solutions" },
      {
        property: "og:description",
        content:
          "Thermal drone deer recovery, wildlife and livestock tracking, solar, roofing and building inspections.",
      },
      { property: "og:url", content: "/services" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

const media: Record<string, { n: string; t: string; nAlt: string; tAlt: string }> = {
  "deer-recovery": {
    n: fieldNormal,
    t: fieldThermal,
    nAlt: "Dark field at night photographed from a drone",
    tAlt: "Thermal drone image of a field showing bright animal heat signatures",
  },
  "livestock-tracking": {
    n: fieldNormal,
    t: fieldThermal,
    nAlt: "Pasture at night photographed from a drone",
    tAlt: "Thermal drone image showing livestock heat signatures in a pasture",
  },
  "deer-herd-counts": {
    n: fieldNormal,
    t: fieldThermal,
    nAlt: "Large property at night photographed from a drone",
    tAlt: "Thermal aerial image with multiple highlighted deer heat signatures",
  },
  "solar-panel-inspections": {
    n: solarNormal,
    t: solarThermal,
    nAlt: "Solar panel array photographed from a drone",
    tAlt: "Thermal image of a solar array with a bright hot cell",
  },
  "roofing-heat-loss": {
    n: roofNormal,
    t: roofThermal,
    nAlt: "Residential roof photographed from a drone",
    tAlt: "Thermal image of a roof showing warm areas that may indicate heat loss",
  },
  "building-property-inspections": {
    n: roofNormal,
    t: roofThermal,
    nAlt: "Building photographed from a drone",
    tAlt: "Thermal image of a building envelope showing temperature differences",
  },
  "agricultural-custom": {
    n: solarNormal,
    t: solarThermal,
    nAlt: "Farmland photographed from a drone",
    tAlt: "Thermal aerial image over agricultural land",
  },
};

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Thermal Drone Services for Recovery & Inspection"
        intro="Every flight is built around one question: where is the heat, and what does it tell us? Below is what SkyScan Thermal Solutions flies for."
      />

      <div className="mx-auto max-w-[80rem] px-4 md:px-8">
        {SERVICES.map((s, i) => {
          const m = media[s.slug];
          return (
            <section
              key={s.slug}
              id={s.slug}
              className="scroll-mt-24 border-b border-border py-16 md:py-24"
            >
              <div
                className={`grid items-center gap-10 lg:grid-cols-2 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                <Reveal>
                  <span className="hud-label text-primary">
                    {String(i + 1).padStart(2, "0")} — Service
                  </span>
                  <h2 className="h-section mt-3">{s.title}</h2>
                  {s.body.map((p) => (
                    <p key={p} className="mt-4 text-muted-foreground">
                      {p}
                    </p>
                  ))}
                  <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  {s.disclaimer && (
                    <p className="mt-5 flex items-start gap-2 border-l-2 border-primary/60 bg-surface p-3 text-xs text-muted-foreground">
                      <AlertTriangle className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                      {s.disclaimer}
                    </p>
                  )}
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <CallButton label={s.cta} />
                    <GhostLink to="/contact">Request a Quote</GhostLink>
                  </div>
                </Reveal>

                <Reveal delay={80} className="group">
                  <div className="relative">
                    <div
                      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
                      aria-hidden="true"
                    >
                      <div className="anim-sweep h-1/3 w-full bg-gradient-to-b from-transparent via-primary/25 to-transparent" />
                    </div>
                    <ThermalSlider
                      normalSrc={m.n}
                      thermalSrc={m.t}
                      normalAlt={m.nAlt}
                      thermalAlt={m.tAlt}
                    />
                  </div>
                </Reveal>
              </div>
            </section>
          );
        })}
      </div>

      <RecoveryCTA />
    </>
  );
}
