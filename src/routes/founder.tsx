import { createFileRoute } from "@tanstack/react-router";
import { Image as ImageIcon } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { RecoveryCTA } from "@/components/site/RecoveryCTA";
import { CallButton, GhostLink } from "@/components/site/CTAButtons";
import portrait from "@/assets/photos/hoyt-portrait.jpg.asset.json";


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
  {
    h: "Why I started SkyScan",
    p: "I started SkyScan because I've always been big into hunting, the outdoors, and drones. Once I saw what thermal drone technology was capable of, I realized I could use it to help people in ways that weren't possible from the ground.",
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
          <figure className="panel relative aspect-[4/5] overflow-hidden">
            <img
              src={portrait.url}
              alt="Hoyt Munro, founder and owner of SkyScan Thermal Solutions, in the field"
              loading="lazy"
              className="size-full object-cover"
            />
            <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-4">
              <span className="font-display text-xl uppercase">Hoyt Munro</span>
              <span className="hud-label block text-primary">Founder &amp; Owner</span>
            </figcaption>
          </figure>
        </Reveal>

        <div>
          <Reveal>
            <h2 className="h-section">Hoyt Munro</h2>
            <p className="hud-label mt-2 text-primary">Founder &amp; Owner — SkyScan Thermal Solutions</p>
            <p className="mt-5 text-muted-foreground">
              My name is Hoyt Munro, and I&apos;m the owner of SkyScan Thermal Solutions.
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
