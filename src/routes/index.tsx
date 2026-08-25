import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Radar,
  ShieldCheck,
  Clock,
  Search,
  Sun,
  Home,
  Cog,
  Cctv,
  PhoneCall,
  ClipboardList,
  Plane,
  FileSearch,
} from "lucide-react";
import { DroneScroll } from "@/components/site/DroneScroll";
import { Reveal } from "@/components/site/Reveal";
import { ThermalSlider } from "@/components/site/ThermalSlider";
import { RecoveryCTA } from "@/components/site/RecoveryCTA";
import { CallButton, GhostLink } from "@/components/site/CTAButtons";
import { SERVICES } from "@/lib/site";
import roofNormal from "@/assets/roof-normal.jpg";
import roofThermal from "@/assets/roof-thermal.jpg";
import fieldNormal from "@/assets/field-normal.jpg";
import fieldThermal from "@/assets/field-thermal.jpg";
import solarNormal from "@/assets/solar-normal.jpg";
import solarThermal from "@/assets/solar-thermal.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Thermal Drone Services in Michigan | SkyScan Thermal Solutions" },
      {
        name: "description",
        content:
          "Advanced aerial thermal imaging for deer recovery, wildlife and livestock tracking, solar panel, roofing and building inspections. FAA Part 107, insured, 24/7 recovery response.",
      },
      { property: "og:title", content: "Thermal Drone Services for Recovery & Inspection" },
      {
        property: "og:description",
        content:
          "See what others can't. Thermal drone recovery and inspection services across Michigan. Call or text 989-285-7977.",
      },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const serviceIcons: Record<string, typeof Search> = {
  "deer-recovery": Search,
  "livestock-tracking": Radar,
  "deer-herd-counts": Cctv,
  "solar-panel-inspections": Sun,
  "roofing-heat-loss": Home,
  "building-property-inspections": Cctv,
  "agricultural-custom": Cog,
};

const steps = [
  {
    n: "01",
    title: "Contact",
    body: "Call or text 989-285-7977, or complete the online form.",
    Icon: PhoneCall,
  },
  {
    n: "02",
    title: "Assess",
    body: "We discuss the project, location, service needed, and objectives.",
    Icon: ClipboardList,
  },
  {
    n: "03",
    title: "Fly & Scan",
    body: "SkyScan deploys the appropriate drone and thermal imaging equipment.",
    Icon: Plane,
  },
  {
    n: "04",
    title: "Find & Report",
    body: "Thermal data and observations are used to identify relevant heat signatures and provide useful information.",
    Icon: FileSearch,
  },
];

function HomePage() {
  return (
    <>
      <DroneScroll />

      {/* HERO */}
      <section className="relative min-h-[92svh] overflow-hidden border-b border-border pt-28 md:pt-36">
        <div className="absolute inset-0 tech-grid opacity-70" aria-hidden="true" />
        <div
          className="absolute inset-x-0 bottom-0 h-2/3 opacity-25"
          style={{
            background:
              "radial-gradient(60% 80% at 50% 100%, color-mix(in oklab, var(--heat) 55%, transparent), transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div className="relative z-40 mx-auto max-w-[80rem] px-4 pb-20 md:px-8">
          <div className="max-w-2xl">
            <span className="hud-label inline-flex items-center gap-2 border border-primary/40 bg-primary/10 px-3 py-1.5 text-primary">
              <span className="size-1.5 animate-pulse rounded-full bg-primary" />
              Thermal Sensor · Live Scan
            </span>

            <h1 className="h-display mt-6 hidden md:block">
              Thermal Drone Services for <span className="text-primary">Recovery</span> &amp;
              Inspection
            </h1>
            <h1 className="h-display mt-6 md:hidden">
              Thermal <span className="text-primary">Drone</span> Services
            </h1>

            <p className="mt-5 hidden max-w-xl text-lg text-muted-foreground md:block">
              Advanced aerial thermal imaging for wildlife recovery, property inspections, solar
              panels, roofing, livestock, and more.
            </p>
            <p className="mt-4 font-display text-lg uppercase tracking-widest text-muted-foreground md:hidden">
              Recovery • Inspection • Wildlife • Solar • Roofing
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CallButton className="text-lg" />
              <GhostLink to="/services">View Our Services</GhostLink>
            </div>

            <ul className="mt-10 grid max-w-lg grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { Icon: ShieldCheck, label: "FAA Part 107" },
                { Icon: ShieldCheck, label: "Insured" },
                { Icon: Clock, label: "24/7 Recovery" },
              ].map(({ Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 border border-border bg-surface/70 px-3 py-2.5 backdrop-blur"
                >
                  <Icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span className="hud-label text-foreground">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SEE WHAT OTHERS CAN'T */}
      <section className="relative overflow-hidden border-b border-border bg-surface/40">
        <div className="relative z-40 mx-auto max-w-[80rem] px-4 py-20 md:px-8 md:py-28">
          <Reveal className="max-w-3xl">
            <span className="hud-label text-primary">Thermal Imaging</span>
            <h2 className="h-section mt-4">
              See What Others <span className="text-primary">Can&apos;t.</span>
            </h2>
            <p className="mt-5 text-muted-foreground">
              A thermal camera doesn&apos;t see light — it sees heat. From the air, a warm animal in
              tall grass, a wet patch of insulation, or an overheating solar cell stands out against
              everything around it. Darkness, cover, and distance stop mattering the way they do from
              the ground.
            </p>
          </Reveal>

          <Reveal className="mt-10 grid gap-6 lg:grid-cols-2" delay={80}>
            <ThermalSlider
              normalSrc={roofNormal}
              thermalSrc={roofThermal}
              normalAlt="Aerial photo of a residential shingle roof in normal daylight view"
              thermalAlt="Aerial thermal image of the same roof showing warm areas that may indicate heat loss"
              caption="Roof heat loss and insulation irregularities — drag to compare normal and thermal views."
            />
            <ThermalSlider
              normalSrc={fieldNormal}
              thermalSrc={fieldThermal}
              normalAlt="Aerial photo of a dark field at night in normal view"
              thermalAlt="Aerial thermal image of the same field showing several bright animal heat signatures"
              caption="Wildlife and livestock heat signatures in a dark field."
            />
          </Reveal>

          <Reveal className="mt-6" delay={120}>
            <ThermalSlider
              normalSrc={solarNormal}
              thermalSrc={solarThermal}
              normalAlt="Aerial photo of a ground-mounted solar array in daylight"
              thermalAlt="Aerial thermal image of a solar array showing a bright hot cell among cooler panels"
              caption="Solar arrays: unusual temperature patterns that may warrant further investigation."
            />
          </Reveal>
        </div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section className="relative border-b border-border">
        <div className="relative z-40 mx-auto max-w-[80rem] px-4 py-20 md:px-8 md:py-28">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="hud-label text-primary">Capabilities</span>
              <h2 className="h-section mt-4">What We Fly For</h2>
            </div>
            <GhostLink to="/services">All Services</GhostLink>
          </Reveal>

          <ul className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => {
              const Icon = serviceIcons[s.slug] ?? Radar;
              return (
                <Reveal as="li" key={s.slug} delay={i * 50} className="group bg-background">
                  <Link
                    to="/services"
                    hash={s.slug}
                    className="flex h-full flex-col gap-3 p-6 transition-colors duration-300 hover:bg-surface md:p-8"
                  >
                    <Icon
                      className="size-7 text-primary transition-transform duration-300 group-hover:scale-110"
                      aria-hidden="true"
                    />
                    <h3 className="h-card">{s.title}</h3>
                    <p className="text-sm text-muted-foreground">{s.short}</p>
                    <span className="hud-label mt-auto pt-4 text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Learn more →
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative border-b border-border bg-surface/40">
        <div className="relative z-40 mx-auto max-w-[80rem] px-4 py-20 md:px-8 md:py-28">
          <Reveal>
            <span className="hud-label text-primary">Process</span>
            <h2 className="h-section mt-4">How It Works</h2>
          </Reveal>

          <ol className="relative mt-12 grid gap-8 md:grid-cols-4">
            <div
              className="absolute left-6 top-0 hidden h-px w-full md:left-0 md:top-7 md:block"
              style={{
                background:
                  "linear-gradient(to right, transparent, color-mix(in oklab, var(--heat) 60%, transparent), transparent)",
              }}
              aria-hidden="true"
            />
            {steps.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 90} className="relative">
                <div className="flex size-14 items-center justify-center border border-primary/50 bg-background">
                  <s.Icon className="size-6 text-primary" aria-hidden="true" />
                </div>
                <span className="hud-label mt-4 block text-primary">{s.n}</span>
                <h3 className="h-card mt-1">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <RecoveryCTA />
    </>
  );
}
