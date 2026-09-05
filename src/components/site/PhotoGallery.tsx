import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { GALLERY, type GalleryPhoto } from "@/lib/photos";

export function PhotoGallery({ limit }: { limit?: number }) {
  const [active, setActive] = useState<GalleryPhoto | null>(null);
  const photos = limit ? GALLERY.slice(0, limit) : GALLERY;

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((p, i) => (
          <Reveal as="li" key={p.id} delay={i * 50}>
            <button
              type="button"
              onClick={() => setActive(p)}
              className="group block w-full text-left"
              aria-label={`Enlarge photo: ${p.caption}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden border border-border bg-surface">
                <img
                  src={p.thumb}
                  alt={p.alt}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 right-3 font-display text-sm uppercase tracking-widest text-foreground">
                  {p.caption}
                </span>
              </div>
            </button>
          </Reveal>
        ))}
      </ul>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-h-[92dvh] max-w-5xl overflow-y-auto p-3">
          {active && (
            <figure>
              <img src={active.url} alt={active.alt} className="w-full border border-border" />
              <figcaption className="mt-3 text-sm text-muted-foreground">{active.caption}</figcaption>
            </figure>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
