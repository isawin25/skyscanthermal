import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background pb-14 pt-28 md:pb-20 md:pt-36">
      <div className="absolute inset-0 tech-grid opacity-70" aria-hidden="true" />
      <div
        className="absolute -left-32 top-0 size-[30rem] rounded-full opacity-15 blur-3xl"
        style={{ background: "var(--heat)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[80rem] px-4 md:px-8">
        <span className="hud-label text-primary">{eyebrow}</span>
        <h1 className="h-section mt-4 max-w-4xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">{intro}</p>}
        {children}
      </div>
    </section>
  );
}
