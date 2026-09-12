import { createFileRoute } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { RecoveryCTA } from "@/components/site/RecoveryCTA";
import { CallButton, GhostLink } from "@/components/site/CTAButtons";
import { SERVICE_AREAS } from "@/lib/site";

export const Route = createFileRoute("/service-areas")({
  head: () => ({
    meta: [
      { title: "Service Areas | Thermal Drone Services in Ohio" },
      {
        name: "description",
        content:
          "SkyScan Thermal Solutions operates thermal drone recovery and inspection services in Ohio. Don't see your location? Contact us to check availability.",
      },
      { property: "og:title", content: "Service Areas | SkyScan Thermal Solutions" },
      {
        property: "og:description",
        content: "Thermal drone coverage across Ohio. Check availability for your location.",
      },
      { property: "og:url", content: "/service-areas" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/service-areas" }],
  }),
  component: ServiceAreasPage,
});

function ServiceAreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Coverage"
        title="Service Areas"
        intro="SkyScan Thermal Solutions is based in and operates across Ohio. Travel for a given project depends on distance, conditions, and flight requirements."
      />

      <section className="mx-auto grid max-w-[80rem] gap-10 px-4 py-16 md:px-8 md:py-24 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal className="panel relative overflow-hidden p-4 md:p-6">
          <div className="absolute inset-0 tech-grid opacity-60" aria-hidden="true" />
          <div className="hud-label relative mb-3 text-primary">Operating Region — Ohio</div>
          <div className="relative aspect-[4/5] w-full">
            <svg
              viewBox="0 0 100 125"
              className="size-full"
              role="img"
              aria-label="Simplified map of Ohio showing SkyScan's operating region"
            >
              <defs>
                <linearGradient id="mi" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="var(--heat-cool)" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="var(--heat)" stopOpacity="0.35" />
                </linearGradient>
              </defs>
              {/* Upper Peninsula */}
              <path
                d="M6 40 L20 30 L36 28 L52 22 L64 26 L72 22 L78 28 L70 36 L56 40 L40 42 L24 46 L10 48 Z"
                fill="url(#mi)"
                stroke="var(--heat)"
                strokeWidth="0.6"
              />
              {/* Lower Peninsula */}
              <path
                d="M42 50 L52 46 L62 48 L72 54 L78 66 L80 82 L74 98 L62 110 L50 114 L44 104 L40 92 L36 78 L34 62 Z"
                fill="url(#mi)"
                stroke="var(--heat)"
                strokeWidth="0.6"
              />
              {SERVICE_AREAS.map((a) => (
                <g key={a.name}>
                  <circle cx={a.x} cy={a.y} r="2.4" fill="var(--heat)" className="anim-heat" />
                  <circle cx={a.x} cy={a.y} r="1" fill="var(--foreground)" />
                </g>
              ))}
            </svg>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <h2 className="h-section">Areas We Cover</h2>
            <p className="mt-4 text-muted-foreground">
              Specific service areas are listed below and are maintained by SkyScan. If a location
              isn&apos;t listed yet, it doesn&apos;t mean we can&apos;t fly it.
            </p>
            <ul className="mt-6 space-y-px border border-border bg-border">
              {SERVICE_AREAS.map((a) => (
                <li key={a.name} className="flex items-start gap-3 bg-background p-4">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                  <span>
                    <span className="font-display text-lg uppercase">{a.name}</span>
                    {a.note && (
                      <span className="block text-sm text-muted-foreground">{a.note}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={80} className="panel mt-8 p-6 md:p-8">
            <h3 className="h-card">Don&apos;t See Your Location?</h3>
            <p className="mt-3 text-muted-foreground">
              Contact us. We may still be able to help depending on the project and flight
              requirements.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <CallButton label="Check Availability" />
              <GhostLink to="/contact">Send a Request</GhostLink>
            </div>
          </Reveal>
        </div>
      </section>

      <RecoveryCTA />
    </>
  );
}
