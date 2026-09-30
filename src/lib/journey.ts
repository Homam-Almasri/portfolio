import Lenis from "lenis";

/**
 * The whole page is one request travelling through the system.
 * Each section is a station on the route; the 3D camera sits at a station's
 * point on the curve while that section is centred on screen, and travels
 * between stations as the reader scrolls from one section to the next.
 */
export const STATIONS = [
  { id: "hero", route: "/", method: "GET", t: 0.0, color: "#4de2ff" },
  { id: "about", route: "/about", method: "GET", t: 0.17, color: "#8b7bff" },
  { id: "experience", route: "/experience", method: "GET", t: 0.36, color: "#ffb547" },
  { id: "projects", route: "/work", method: "GET", t: 0.56, color: "#3dffa2" },
  { id: "skills", route: "/stack", method: "GET", t: 0.76, color: "#ff5fa2" },
  { id: "contact", route: "/contact", method: "POST", t: 0.95, color: "#3dffa2" },
] as const;

/** Mutable state read every frame by the 3D scene (no React re-renders). */
export const journey = {
  /** 0..1 along the route curve, eased so the camera slows at stations */
  t: 0,
  /** raw scroll progress 0..1 */
  progress: 0,
  /** index of the station nearest the centre of the screen */
  station: 0,
  /** how settled the camera is at that station (1 = parked) */
  dwell: 1,
  /** scroll velocity, px per frame, from Lenis */
  velocity: 0,
  pointerX: 0,
  pointerY: 0,
};

type Listener = (station: number) => void;
const listeners = new Set<Listener>();
export function onStation(fn: Listener) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function webglAvailable() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

let lenis: Lenis | null = null;

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.6 });
  else el.scrollIntoView({ behavior: "smooth" });
}

const smooth = (x: number) => x * x * (3 - 2 * x);

/** Scroll position at which each section's centre sits at the screen's centre. */
function anchors(): number[] {
  const vh = window.innerHeight;
  const max = document.documentElement.scrollHeight - vh;
  return STATIONS.map((s, i) => {
    const el = document.getElementById(s.id);
    if (!el) return 0;
    const top = el.getBoundingClientRect().top + window.scrollY;
    if (i === 0) return 0;
    if (i === STATIONS.length - 1) return max;
    return Math.min(max, Math.max(0, top + Math.min(el.offsetHeight, vh) / 2 - vh / 2));
  });
}

export function startJourney(reducedMotion: boolean) {
  let marks = anchors();
  const remeasure = () => (marks = anchors());
  const ro = new ResizeObserver(remeasure);
  ro.observe(document.body);
  window.addEventListener("resize", remeasure);

  if (!reducedMotion) {
    lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, smoothWheel: true });
  }

  let last = -1;
  const update = (y: number) => {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    journey.progress = Math.min(1, Math.max(0, y / max));

    let i = 0;
    while (i < marks.length - 2 && y > marks[i + 1]) i++;
    const a = marks[i];
    const b = marks[i + 1] ?? a;
    const local = b > a ? Math.min(1, Math.max(0, (y - a) / (b - a))) : 0;
    const eased = smooth(local);
    journey.t = STATIONS[i].t + (STATIONS[i + 1].t - STATIONS[i].t) * eased;
    const nearest = local < 0.5 ? i : i + 1;
    journey.dwell = 1 - Math.min(1, Math.abs(local - (nearest === i ? 0 : 1)) * 2.2);
    journey.station = nearest;
    if (nearest !== last) {
      last = nearest;
      listeners.forEach((fn) => fn(nearest));
    }
  };

  let raf = 0;
  const loop = (time: number) => {
    if (lenis) {
      lenis.raf(time);
      journey.velocity = lenis.velocity;
    }
    update(window.scrollY);
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);

  const onPointer = (e: PointerEvent) => {
    journey.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
    journey.pointerY = (e.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener("pointermove", onPointer, { passive: true });

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    window.removeEventListener("resize", remeasure);
    window.removeEventListener("pointermove", onPointer);
    lenis?.destroy();
    lenis = null;
  };
}
