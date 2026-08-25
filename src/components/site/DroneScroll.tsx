import { useEffect, useRef, useState } from "react";
import droneImg from "@/assets/drone.png";

type Frame = { p: number; x: number; y: number; s: number; r: number };

// x / y are percentages of viewport width / height (centre of the drone).
const DESKTOP: Frame[] = [
  { p: 0.0, x: 68, y: 46, s: 1.0, r: -4 },
  { p: 0.14, x: 30, y: 58, s: 0.82, r: 5 },
  { p: 0.3, x: 72, y: 40, s: 0.7, r: -6 },
  { p: 0.46, x: 28, y: 34, s: 0.62, r: 4 },
  { p: 0.62, x: 70, y: 56, s: 0.72, r: -3 },
  { p: 0.8, x: 38, y: 42, s: 0.66, r: 6 },
  { p: 1.0, x: 55, y: 30, s: 0.9, r: 0 },
];

const MOBILE: Frame[] = [
  { p: 0.0, x: 62, y: 40, s: 0.72, r: -4 },
  { p: 0.2, x: 30, y: 62, s: 0.55, r: 5 },
  { p: 0.4, x: 70, y: 30, s: 0.5, r: -5 },
  { p: 0.6, x: 28, y: 66, s: 0.5, r: 4 },
  { p: 0.8, x: 68, y: 34, s: 0.52, r: -3 },
  { p: 1.0, x: 50, y: 24, s: 0.62, r: 0 },
];

const STATUS = [
  { p: 0.0, text: "AIRBORNE · GPS LOCK" },
  { p: 0.14, text: "THERMAL SENSOR · LIVE SCAN" },
  { p: 0.32, text: "HEAT SIGNATURE DETECTED" },
  { p: 0.5, text: "SURFACE SCAN · ROOFLINE" },
  { p: 0.66, text: "ARRAY SWEEP · TEMP DELTA" },
  { p: 0.82, text: "MULTIPLE SIGNATURES · FIELD" },
  { p: 0.94, text: "SCAN COMPLETE" },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function sample(frames: Frame[], p: number): Frame {
  if (p <= frames[0].p) return frames[0];
  for (let i = 1; i < frames.length; i++) {
    if (p <= frames[i].p) {
      const a = frames[i - 1];
      const b = frames[i];
      const raw = (p - a.p) / (b.p - a.p);
      const t = raw * raw * (3 - 2 * raw); // smoothstep
      return {
        p,
        x: lerp(a.x, b.x, t),
        y: lerp(a.y, b.y, t),
        s: lerp(a.s, b.s, t),
        r: lerp(a.r, b.r, t),
      };
    }
  }
  return frames[frames.length - 1];
}

export function DroneScroll() {
  const droneRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState(STATUS[0].text);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    let lastStatus = "";

    const apply = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const mobile = window.innerWidth < 768;
      const f = sample(mobile ? MOBILE : DESKTOP, p);

      const el = droneRef.current;
      if (el) {
        const px = (f.x / 100) * window.innerWidth;
        const py = (f.y / 100) * window.innerHeight;
        el.style.transform = `translate3d(${px}px, ${py}px, 0) translate(-50%, -50%) rotate(${f.r}deg) scale(${f.s})`;
      }
      const beam = beamRef.current;
      if (beam) {
        beam.style.opacity = p > 0.08 ? "1" : "0";
      }

      let next = STATUS[0].text;
      for (const s of STATUS) if (p >= s.p) next = s.text;
      if (next !== lastStatus) {
        lastStatus = next;
        setStatus(next);
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  if (reduced) {
    return (
      <div className="pointer-events-none fixed inset-0 z-30 hidden md:block" aria-hidden="true">
        <img
          src={droneImg}
          alt=""
          width={1024}
          height={768}
          className="absolute right-[6%] top-1/3 w-[26vw] max-w-[420px] opacity-90 drop-shadow-2xl"
        />
      </div>
    );
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden="true">
      <div ref={droneRef} className="absolute left-0 top-0 will-change-transform">
        <div className="relative anim-bob">
          <div
            ref={beamRef}
            className="absolute left-1/2 top-[62%] h-[70vh] w-[36vw] max-w-[520px] -translate-x-1/2 opacity-0 transition-opacity duration-500"
            style={{
              background:
                "linear-gradient(to bottom, color-mix(in oklab, var(--heat) 30%, transparent), transparent 70%)",
              clipPath: "polygon(44% 0%, 56% 0%, 100% 100%, 0% 100%)",
            }}
          />
          <div className="absolute left-1/2 top-[62%] h-[70vh] w-[36vw] max-w-[520px] -translate-x-1/2 scan-lines opacity-40" />
          <img
            src={droneImg}
            alt=""
            width={1024}
            height={768}
            className="relative w-[34vw] max-w-[440px] min-w-[180px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
          />
        </div>
      </div>

      <div className="absolute bottom-24 left-4 hidden items-center gap-2 border border-border bg-background/70 px-3 py-2 backdrop-blur md:flex">
        <span className="size-2 animate-pulse rounded-full bg-primary" />
        <span className="hud-label text-foreground">{status}</span>
      </div>
    </div>
  );
}
