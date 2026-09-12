import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Clock } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { RecoveryCTA } from "@/components/site/RecoveryCTA";
import { CallButton, GhostLink } from "@/components/site/CTAButtons";
import portrait from "@/assets/photos/hoyt-portrait.jpg.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About SkyScan Thermal Solutions | Hoyt Munro, Ohio" },
      {
        name: "description",
        content:
          "Meet Hoyt Munro, founder of SkyScan Thermal Solutions — aerial thermal imaging across Ohio for deer recovery, property, solar, roofing and livestock work. FAA Part 107 and insured.",
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

const bioBlocks = [
  {
    h: "Why I started SkyScan",
    p: "I've always been big into hunting, the outdoors, and drones. Once I saw what thermal drone technology was capable of, I realized I could use it to help people in ways that weren't possible from the ground.",
  },
  {
    h: "Deer recovery",
    p: "Deer recovery is a big part of what I do, and as a hunter myself, I know how much time and effort can go into one deer. When someone calls me after a shot, I treat that search like it was my own.",
  },
  {
    h: "More than deer recovery",
    p: "Whether I'm helping find a lost pet, providing thermal inspections, or using aerial technology to help a property owner or business, my goal is the same — use the equipment and experience I have to help people and get them the answers they need.",
  },
  {
    h: "Why it's worth doing",
    p: "I genuinely enjoy what I do, and I take pride in every job. Whether it ends with \"I found him,\" bringing someone's pet home, or solving a problem from the air, that's what makes it worth doing.",
  },
];

const howBlocks = [
  {
    h: "How thermal drone technology works",
    p: "A thermal sensor reads infrared energy given off by surfaces and living things. Warmer areas render bright, cooler areas render dark. Mounted under a drone, that sensor can cover acres in minutes and read heat from angles no ladder or ground search reaches.",
  },
  {
    h: "Why it's useful",
    p: "It removes the two things that limit ground searching and visual inspection: darkness and access. A heat signature in heavy cover, a warm seam along a roof edge, a single hot cell in a large array — all of it reads from the air.",
  },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Thermal Technology. Aerial Perspective. Real-World Results."
        intro="A Ohio thermal drone operation built for recovery calls at 2 a.m. and inspection work at 2 p.m."
      />

      <section className="mx-auto grid max-w-[80rem] gap-10 px-4 py-16 md:px-8 md:py-24 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <figure className="panel relative aspect-[4/5] overflow-hidden">
            <img
              src={portrait.url}
              alt="Hoyt Munro, founder and owner of SkyScan Thermal Solutions, in the field"
              loading="lazy"
              className="size-full object-cover"
            />
            <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-4">
              <span className="hud-label block text-primary">Founder &amp; Owner</span>
            </figcaption>
          </figure>
        </Reveal>

        <div>
          <Reveal>
            <h2 className="h-section">Hoyt Munro</h2>
            <p className="mt-5 text-muted-foreground">
              Owner of SkyScan Thermal Solutions.
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
          <div className="grid gap-px border border-border bg-border md:grid-cols-2">
            {howBlocks.map((b, i) => (
              <Reveal key={b.h} delay={i * 60} className="bg-background p-6 md:p-8">
                <h2 className="h-card text-primary">{b.h}</h2>
                <p className="mt-3 text-muted-foreground">{b.p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10 grid gap-4 sm:grid-cols-3">
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

          <Reveal className="mt-10 border border-border bg-surface p-6 text-sm text-muted-foreground md:p-8">
            Thermal imaging helps identify heat patterns and areas that may warrant further
            investigation. It is not a substitute for professional structural, electrical, or
            engineering evaluation.
          </Reveal>
        </div>
      </section>

      <RecoveryCTA />
    </>
  );
}
