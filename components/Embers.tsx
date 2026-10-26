"use client";

import { useEffect, useRef } from "react";

type Spark = { x: number; y: number; vx: number; vy: number; r: number; life: number; max: number; hue: number; wob: number };

/** Felszálló parázs-szikrák vásznon. Csak akkor fut, ha látszik, és nem kér csökkentett mozgást a látogató. */
export default function Embers({ density = 70, className = "" }: { density?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d")!;
    let w = 0, h = 0, raf = 0, visible = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const sparks: Spark[] = [];

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const spawn = (anywhere = false): Spark => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : h + 10,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -(0.35 + Math.random() * 1.1),
      r: 0.6 + Math.random() * 2.1,
      life: 0,
      max: 180 + Math.random() * 260,
      hue: 18 + Math.random() * 26,
      wob: Math.random() * Math.PI * 2,
    });

    resize();
    const count = Math.round((density * Math.min(w, 1600)) / 1200);
    for (let i = 0; i < count; i++) sparks.push(spawn(true));

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < sparks.length; i++) {
        const s = sparks[i];
        s.life++;
        s.wob += 0.03;
        s.x += s.vx + Math.sin(s.wob) * 0.35;
        s.y += s.vy;
        const t = s.life / s.max;
        if (t >= 1 || s.y < -20) {
          sparks[i] = spawn();
          continue;
        }
        const a = Math.sin(Math.PI * t) * (0.55 + 0.45 * Math.sin(s.life * 0.2));
        const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 4);
        g.addColorStop(0, `hsla(${s.hue + 20}, 100%, 75%, ${a})`);
        g.addColorStop(0.4, `hsla(${s.hue}, 100%, 55%, ${a * 0.5})`);
        g.addColorStop(1, `hsla(${s.hue}, 100%, 40%, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    };
    raf = requestAnimationFrame(tick);

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
