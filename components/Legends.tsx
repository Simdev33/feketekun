"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { ft, legends, type Legend } from "@/lib/site";
import { Rhombus } from "./Ornament";

/**
 * Bal oldalt a szöveg, jobbra az oldalra húzható kártyasor: ujjal, egérrel (fogd és húzd)
 * vagy a nyilakkal lapozható. Nem igazodik be elengedéskor, és a függőleges görgetést sem fogja meg.
 */
export default function Legends() {
  const row = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });
  const progress = useMotionValue(0);
  const bar = useSpring(progress, { stiffness: 160, damping: 26 });

  useEffect(() => {
    const el = row.current!;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      progress.set(max > 0 ? el.scrollLeft / max : 0);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [progress]);

  const step = (dir: number) => {
    const el = row.current!;
    const card = el.querySelector<HTMLElement>("[data-card]");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 400) + 24), behavior: "smooth" });
  };

  const endDrag = () => {
    const d = drag.current;
    if (!d.down) return;
    d.down = false;
    if (d.moved) setTimeout(() => (d.moved = false), 0);
  };

  return (
    <section id="legendak" className="relative scroll-mt-24 overflow-clip py-24 sm:py-32">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(50%_60%_at_80%_50%,rgba(156,23,27,0.3),transparent_70%)]" />

      <div className="relative lg:flex lg:items-center">
        <div className="px-5 sm:px-8 lg:w-[34vw] lg:max-w-[520px] lg:shrink-0 lg:pl-[6vw] lg:pr-10">
          <p className="eyebrow">A konyha legendái</p>
          <h2 className="mt-4 font-display text-[clamp(2.4rem,4.6vw,4.4rem)] font-black leading-[1.02] text-gold-100">
            Ropogós
            <br />
            <span className="gold-text">csirkés</span>
            <br />
            kedvencek
          </h2>
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-bone/65">
            Kentucky fűszeres panír, szezámmagos buci, csónakburgonya és választható szósz. Húzd oldalra, és nézd végig a sort.
          </p>
          <div className="mt-8 flex items-center gap-5">
            <div className="flex items-center gap-3 text-gold-400">
              <Rhombus className="h-8 w-8" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-bone/50">{legends.length} kedvenc</span>
            </div>
            <div className="ml-auto flex gap-3 lg:ml-0">
              {[-1, 1].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => step(d)}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-400/40 text-xl text-gold-200 transition hover:border-gold-300 hover:bg-blood-700"
                  aria-label={d < 0 ? "Előző étel" : "Következő étel"}
                >
                  {d < 0 ? "←" : "→"}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-8 h-px max-w-sm bg-gold-400/15">
            <motion.div className="h-px origin-left bg-gradient-to-r from-blood-500 to-gold-300" style={{ scaleX: bar }} />
          </div>
        </div>

        <div
          ref={row}
          className="no-scrollbar relative mt-12 flex min-w-0 flex-1 cursor-grab gap-6 overflow-x-auto overflow-y-hidden overscroll-x-contain px-5 pb-4 select-none active:cursor-grabbing sm:px-8 lg:mt-0 lg:pl-2 lg:pr-[6vw] lg:[mask-image:linear-gradient(to_right,transparent,#000_3%)]"
          onPointerDown={(e) => {
            if (e.pointerType !== "mouse") return;
            drag.current = { down: true, x: e.clientX, left: row.current!.scrollLeft, moved: false };
          }}
          onPointerMove={(e) => {
            const d = drag.current;
            if (!d.down) return;
            const dx = e.clientX - d.x;
            if (Math.abs(dx) > 4) d.moved = true;
            if (d.moved) row.current!.scrollLeft = d.left - dx;
          }}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onClickCapture={(e) => {
            if (drag.current.moved) e.preventDefault();
          }}
          onDragStart={(e) => e.preventDefault()}
        >
          {legends.map((l, i) => (
            <div key={l.name} data-card className="w-[82vw] max-w-[440px] shrink-0 lg:w-[30vw] lg:max-w-[460px]">
              <Card l={l} i={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ l, i }: { l: Legend; i: number }) {
  return (
    <motion.article
      className="panel group relative flex h-full flex-col overflow-hidden rounded-[28px]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative aspect-[16/11] overflow-hidden">
        <Image
          src={l.image}
          alt={l.name}
          fill
          draggable={false}
          sizes="(min-width:1024px) 460px, 85vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-transparent" />
        <span className="absolute left-5 top-5 font-display text-6xl font-black text-gold-100/15">0{i + 1}</span>
        <span className="absolute right-5 top-5 rounded-full bg-blood-700/90 px-4 py-1.5 font-display text-lg font-bold text-gold-100 ring-1 ring-gold-400/50">
          {ft(l.price)}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="font-serif text-2xl font-bold text-gold-100">{l.name}</h3>
        <p className="mt-2 text-bone/65">{l.lead}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {l.ingredients.map((x) => (
            <li key={x} className="rounded-full border border-gold-400/20 bg-ink-950/50 px-3 py-1 text-xs text-bone/75">
              {x}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}
