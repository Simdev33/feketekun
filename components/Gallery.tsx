"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { gallery } from "@/lib/site";
import Lightbox from "./Lightbox";
import { SplitLines } from "./motion";
import { SectionHead } from "./Ornament";

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="galeria" className="relative scroll-mt-24 bg-ink-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          eyebrow="Galéria"
          title={
            <SplitLines
              as="h2"
              className="mt-4 font-display text-[clamp(2.4rem,6vw,4.6rem)] font-black leading-[1.02] text-gold-100"
              lines={["Nem illusztráció.", <span key="2" className="gold-text">Ez a mi konyhánk.</span>]}
            />
          }
          lead="A plakátjaink festettek — ezek a fotók viszont a valódi tálalást mutatják, ahogy a rendelésed megérkezik."
        />

        <div className="mt-16 grid auto-rows-[220px] grid-cols-2 gap-3 sm:auto-rows-[260px] sm:gap-4 lg:grid-cols-4">
          {gallery.map((g, i) => (
            <motion.button
              key={g.src}
              type="button"
              onClick={() => setOpen(i)}
              className={`group relative overflow-hidden rounded-2xl border border-gold-400/10 ${g.span === "wide" ? "col-span-2 row-span-2" : g.span === "flat" ? "col-span-2" : ""}`}
              initial={{ opacity: 0, y: 50, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{ duration: 0.9, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              aria-label={`Kép megnyitása: ${g.alt}`}
            >
              <Image
                src={g.src}
                alt={g.alt}
                fill
                sizes={g.span === "wide" ? "(min-width:1024px) 50vw, 100vw" : "(min-width:1024px) 25vw, 50vw"}
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute inset-x-4 bottom-4 translate-y-4 text-left text-sm font-semibold text-gold-100 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {g.alt}
              </span>
              <span className="absolute right-3 top-3 flex h-9 w-9 scale-50 items-center justify-center rounded-full bg-gold-300 text-lg font-bold text-ink-950 opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
                +
              </span>
            </motion.button>
          ))}
        </div>
      </div>
      <Lightbox images={gallery} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </section>
  );
}
