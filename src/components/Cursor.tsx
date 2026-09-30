import { useEffect, useRef } from "react";

/** A dot that sticks to the pointer and a ring that follows it; the ring opens over anything clickable. */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches) return;
    document.documentElement.classList.add("has-cursor");
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, raf = 0;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const hot = (e.target as Element | null)?.closest("a, button, [data-hot]");
      ring.current?.classList.toggle("is-hot", !!hot);
    };
    const down = () => ring.current?.classList.add("is-down");
    const up = () => ring.current?.classList.remove("is-down");
    const leave = () => document.documentElement.classList.add("cursor-away");
    const enter = () => document.documentElement.classList.remove("cursor-away");

    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    addEventListener("pointermove", move, { passive: true });
    addEventListener("pointerdown", down);
    addEventListener("pointerup", up);
    document.addEventListener("pointerleave", leave);
    document.addEventListener("pointerenter", enter);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", move);
      removeEventListener("pointerdown", down);
      removeEventListener("pointerup", up);
      document.removeEventListener("pointerleave", leave);
      document.removeEventListener("pointerenter", enter);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
