import { useEffect, useRef, useState } from "react";
import droneImg from "@/assets/drone.png";

type Frame = { p: number; x: number; y: number; s: number; r: number };

// x / y are percentages of viewport width / height (centre of the drone).
const DESKTOP: Frame[] = [
  { p: 0.0, x: 50, y: 34, s: 1.35, r: 0 },
  { p: 0.18, x: 62, y: 27, s: 1.0, r: -3 },
  { p: 0.45, x: 74, y: 21, s: 0.66, r: 3 },
  { p: 1.0, x: 87, y: 17, s: 0.4, r: 0 },
];

const MOBILE: Frame[] = [
  { p: 0.0, x: 50, y: 31, s: 1.0, r: 0 },
  { p: 0.2, x: 62, y: 25, s: 0.72, r: -3 },
  { p: 1.0, x: 76, y: 20, s: 0.48, r: 0 },
];


const STATUS = [
  { p: 0.0, text: "AIRBORNE · GPS LOCK" },
  { p: 0.2, text: "THERMAL SENSOR · LIVE SCAN" },
  { p: 0.5, text: "SURFACE SCAN · TEMP DELTA" },
  { p: 0.85, text: "SCAN COMPLETE" },
];


function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function sample(frames: Frame[], p: number): Frame {
  const first = frames[0]!;
  if (p <= first.p) return first;
  for (let i = 1; i < frames.length; i++) {
    const a = frames[i - 1]!;
    const b = frames[i]!;
    if (p <= b.p) {
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
  return frames[frames.length - 1]!;
}

export function DroneScroll() {
  const droneRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState(STATUS[0]!.text);
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
        el.style.opacity = String(1 - Math.min(0.35, p * 0.5));
      }
      const beam = beamRef.current;
      if (beam) {
        beam.style.opacity = String(Math.max(0, 0.9 - p * 4));
      }


      let next = STATUS[0]!.text;
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
      <div className="pointer-events-none absolute inset-x-0 top-24 z-30 flex justify-center" aria-hidden="true">
        <img
          src={droneImg}
          alt=""
          width={1024}
          height={768}
          className="w-[62vw] max-w-[420px] opacity-90 drop-shadow-2xl"
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
            className="absolute left-1/2 top-[62%] h-[36vh] w-[26vw] max-w-[340px] -translate-x-1/2 opacity-0"
            style={{
              background:
                "linear-gradient(to bottom, color-mix(in oklab, var(--heat) 26%, transparent), transparent 72%)",
              clipPath: "polygon(44% 0%, 56% 0%, 100% 100%, 0% 100%)",
            }}
          />
          <img
            src={droneImg}
            alt=""
            width={1024}
            height={768}
            className="relative w-[46vw] max-w-[420px] min-w-[150px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] md:w-[30vw]"
          />
        </div>
      </div>

      <div className="absolute bottom-24 right-4 hidden items-center gap-2 border border-border bg-background/70 px-3 py-2 backdrop-blur md:flex">
        <span className="size-2 animate-pulse rounded-full bg-primary" />
        <span className="hud-label text-foreground">{status}</span>
      </div>
    </div>
  );

}
