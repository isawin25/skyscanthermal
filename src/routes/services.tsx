import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Check } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { RecoveryCTA } from "@/components/site/RecoveryCTA";
import { CallButton, GhostLink } from "@/components/site/CTAButtons";
import { ThermalSlider } from "@/components/site/ThermalSlider";
import { SERVICES } from "@/lib/site";
import fieldNormal from "@/assets/field-normal.jpg";
import fieldThermal from "@/assets/field-thermal.jpg";

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

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Thermal Drone Services for Recovery & Inspection"
        intro="Every flight is built around one question: where is the heat, and what does it tell us?"
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-14 md:px-8 md:py-20">
          <Reveal>
            <div className="relative">
              <div
                className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
                aria-hidden="true"
              >
                <div className="anim-sweep h-1/3 w-full bg-gradient-to-b from-transparent via-primary/25 to-transparent" />
              </div>
              <ThermalSlider
                normalSrc={fieldNormal}
                thermalSrc={fieldThermal}
                normalAlt="Dark field at night photographed from a drone"
                thermalAlt="Thermal drone image of a field showing bright animal heat signatures"
                caption="Drag to compare a normal night view with the thermal view."
              />
            </div>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-[80rem] px-4 md:px-8">
        {SERVICES.map((s, i) => (
          <section
            key={s.slug}
            id={s.slug}
            className="scroll-mt-24 border-b border-border py-14 md:py-20"
          >
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <Reveal>
                <span className="hud-label text-primary">
                  {String(i + 1).padStart(2, "0")} — Service
                </span>
                <h2 className="h-section mt-3">{s.title}</h2>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <CallButton label={s.cta} />
                  <GhostLink to="/contact">Request a Quote</GhostLink>
                </div>
              </Reveal>

              <Reveal delay={60}>
                {s.body.map((p) => (
                  <p key={p} className="mt-0 mb-4 text-muted-foreground">
                    {p}
                  </p>
                ))}
                <ul className="grid gap-2 sm:grid-cols-2">
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
              </Reveal>
            </div>
          </section>
        ))}
      </div>

      <RecoveryCTA />
    </>
  );
}

