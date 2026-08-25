import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Clock, Radar } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { RecoveryCTA } from "@/components/site/RecoveryCTA";
import { GhostLink } from "@/components/site/CTAButtons";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About SkyScan Thermal Solutions | Aerial Thermal Imaging Michigan" },
      {
        name: "description",
        content:
          "SkyScan Thermal Solutions provides aerial thermal imaging across Michigan for wildlife recovery, property, solar, roofing and livestock work. FAA Part 107 and insured.",
      },
      { property: "og:title", content: "About SkyScan Thermal Solutions" },
      {
        property: "og:description",
        content: "Thermal technology, aerial perspective, real-world results.",
      },
      { property: "og:url", content: "/about" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const blocks = [
  {
    h: "What SkyScan does",
    p: "SkyScan Thermal Solutions flies drones equipped with thermal imaging cameras for recovery and inspection work: locating heat signatures in the field, and documenting temperature patterns on roofs, buildings, solar arrays, and land.",
  },
  {
    h: "How thermal drone technology works",
    p: "A thermal sensor reads infrared energy given off by surfaces and living things. Warmer areas render bright, cooler areas render dark. Mounted under a drone, that sensor can cover acres in minutes and read heat from angles no ladder or ground search reaches.",
  },
  {
    h: "Why aerial thermal imaging is useful",
    p: "It removes the two things that limit ground searching and visual inspection: darkness and access. A heat signature in heavy cover, a warm seam along a roof edge, a single hot cell in a large array — all of it reads from the air, quickly and without walking the whole property.",
  },
  {
    h: "Wildlife recovery",
    p: "For recovery work, speed matters. Thermal drones can sweep fields, woodlines, and brush for heat signatures that are difficult or impossible to see from the ground, at any hour.",
  },
  {
    h: "Property and building inspection",
    p: "Thermal imagery can highlight potential heat loss, insulation irregularities, and building envelope anomalies that warrant a closer look by a qualified professional.",
  },
  {
    h: "Solar, roofing, livestock and large-area scanning",
    p: "Whether it's a solar array, a steep roof, a pasture, or hundreds of acres of land, the workflow is the same: fly the area, capture thermal and visual imagery, and deliver clear observations.",
  },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About SkyScan Thermal Solutions"
        title="Thermal Technology. Aerial Perspective. Real-World Results."
        intro="A Michigan thermal drone operation built for recovery calls at 2 a.m. and inspection work at 2 p.m."
      />

      <section className="mx-auto max-w-[80rem] px-4 py-16 md:px-8 md:py-24">
        <div className="grid gap-px border border-border bg-border md:grid-cols-2">
          {blocks.map((b, i) => (
            <Reveal key={b.h} delay={i * 60} className="bg-background p-6 md:p-8">
              <h2 className="h-card text-primary">{b.h}</h2>
              <p className="mt-3 text-muted-foreground">{b.p}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 grid gap-4 sm:grid-cols-3">
          {[
            { Icon: ShieldCheck, label: "FAA Part 107", sub: "Certified remote pilot operations" },
            { Icon: ShieldCheck, label: "Insured", sub: "Coverage in place for drone operations" },
            { Icon: Clock, label: "24/7 Recovery", sub: "Recovery calls answered around the clock" },
          ].map(({ Icon, label, sub }) => (
            <div key={label} className="panel flex flex-col gap-2 p-6">
              <Icon className="size-6 text-primary" aria-hidden="true" />
              <span className="font-display text-xl uppercase">{label}</span>
              <span className="text-sm text-muted-foreground">{sub}</span>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-14 flex flex-wrap items-center gap-4 border border-border bg-surface p-6 md:p-8">
          <Radar className="size-8 text-primary" aria-hidden="true" />
          <p className="min-w-60 flex-1 text-muted-foreground">
            Thermal imaging is a tool that helps identify heat patterns and areas that may warrant
            further investigation. It is not a substitute for professional structural, electrical, or
            engineering evaluation.
          </p>
          <GhostLink to="/contact">Talk to Us</GhostLink>
        </Reveal>
      </section>

      <RecoveryCTA />
    </>
  );
}
