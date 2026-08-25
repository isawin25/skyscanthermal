import { useCallback, useEffect, useRef, useState } from "react";

export function ThermalSlider({
  normalSrc,
  thermalSrc,
  normalAlt,
  thermalAlt,
  caption,
}: {
  normalSrc: string;
  thermalSrc: string;
  normalAlt: string;
  thermalAlt: string;
  caption?: string;
}) {
  const [pos, setPos] = useState(50);
  const wrapRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  }, []);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (!dragging.current) return;
      setFromClientX(e.clientX);
    };
    const up = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [setFromClientX]);

  return (
    <figure className="w-full">
      <div
        ref={wrapRef}
        className="relative aspect-[3/2] w-full touch-pan-y select-none overflow-hidden border border-border bg-surface"
        onPointerDown={(e) => {
          dragging.current = true;
          setFromClientX(e.clientX);
        }}
      >
        <img
          src={normalSrc}
          alt={normalAlt}
          loading="lazy"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
          <img
            src={thermalSrc}
            alt={thermalAlt}
            loading="lazy"
            className="absolute inset-0 size-full object-cover"
          />
        </div>

        <span className="hud-label absolute left-3 top-3 bg-background/70 px-2 py-1">Normal</span>
        <span className="hud-label absolute right-3 top-3 bg-background/70 px-2 py-1 text-primary">
          Thermal
        </span>

        <div
          className="pointer-events-none absolute inset-y-0 w-px bg-primary"
          style={{ left: `${pos}%` }}
          aria-hidden="true"
        >
          <span className="absolute left-1/2 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary bg-background/90 font-mono text-xs text-primary">
            ⇆
          </span>
        </div>

        <label className="sr-only" htmlFor={`slider-${normalSrc}`}>
          Reveal thermal view
        </label>
        <input
          id={`slider-${normalSrc}`}
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="absolute inset-x-0 bottom-0 h-11 w-full cursor-ew-resize opacity-0"
          aria-label="Reveal thermal view"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-muted-foreground">{caption}</figcaption>
      )}
    </figure>
  );
}
