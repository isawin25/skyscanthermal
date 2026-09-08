import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { RecoveryCTA } from "@/components/site/RecoveryCTA";
import { PhotoGallery } from "@/components/site/PhotoGallery";

export const Route = createFileRoute("/our-work")({
  head: () => ({
    meta: [
      { title: "Our Work | Thermal Drone Photos | SkyScan Thermal Solutions" },
      {
        name: "description",
        content:
          "Photos from real thermal drone flights across Michigan — deer recovery, wildlife, property and aerial survey work by SkyScan Thermal Solutions.",
      },
      { property: "og:title", content: "Our Work | SkyScan Thermal Solutions" },
      {
        property: "og:description",
        content: "Photos from real thermal drone recovery and inspection flights across Michigan.",
      },
      { property: "og:url", content: "/our-work" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/our-work" }],
  }),
  component: OurWorkPage,
});

function OurWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Our Work"
        intro="Photos from completed flights across Michigan."
      />

      <section className="mx-auto max-w-[80rem] px-4 py-14 md:px-8 md:py-20">
        <Reveal>
          <span className="hud-label text-primary">Field Gallery</span>
          <h2 className="h-section mt-4">From The Field</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Photos from real flights across Michigan — tap any image to enlarge.
          </p>
        </Reveal>
        <div className="mt-10">
          <PhotoGallery />
        </div>
      </section>

      <RecoveryCTA />
    </>
  );
}
