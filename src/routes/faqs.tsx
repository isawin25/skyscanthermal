import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { RecoveryCTA } from "@/components/site/RecoveryCTA";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/lib/site";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "Thermal Drone FAQs | SkyScan Thermal Solutions" },
      {
        name: "description",
        content:
          "Answers about thermal drone imaging: what thermal cameras detect, finding deer at night, 24/7 recovery availability, solar and roof inspections, pricing and service areas.",
      },
      { property: "og:title", content: "Frequently Asked Questions | SkyScan Thermal Solutions" },
      {
        property: "og:description",
        content: "How thermal drone imaging works, what it can detect, and how to book a flight.",
      },
      { property: "og:url", content: "/faqs" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/faqs" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Support"
        title="Frequently Asked Questions"
        intro="Straight answers about thermal drone work — what it can do, what it can't, and how to get a flight scheduled."
      />

      <section className="mx-auto max-w-4xl px-4 py-16 md:px-8 md:py-24">
        <Reveal>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="py-5 text-left font-display text-lg uppercase tracking-wide hover:text-primary">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-base text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </section>

      <RecoveryCTA title="Still Have a Question?" />
    </>
  );
}
