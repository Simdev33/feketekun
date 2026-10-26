"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { ft, promos, site } from "@/lib/site";
import { FacebookIcon } from "./Icons";
import Lightbox from "./Lightbox";
import { SplitLines, TiltCard } from "./motion";
import { SectionHead } from "./Ornament";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Promos() {
  const [open, setOpen] = useState<number | null>(null);
  const images = promos.map((p) => ({ src: p.poster, alt: `${p.title} plakát`, w: 1024, h: 1280 }));

  return (
    <section id="akciok" className="relative scroll-mt-24 overflow-clip bg-ink-900 py-24 sm:py-32">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(156,23,27,0.35),transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          eyebrow="Akciók & ajánlatok"
          title={
            <SplitLines
              as="h2"
              className="mt-4 font-display text-[clamp(2.4rem,6vw,4.6rem)] font-black leading-[1.02] text-gold-100"
              lines={["Kettő jobb,", <span key="2" className="gold-text">mint egy.</span>]}
            />
          }
          lead="Hétvégente és ünnepnapokon akcióval kedveskedünk. Az aktuális ajánlatokat mindig a Facebook-oldalunkon jelentjük be."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3 md:gap-8">
          {promos.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 60, rotate: i === 1 ? 0 : i === 0 ? -3 : 3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1, delay: i * 0.12, ease }}
              className={i === 1 ? "h-full md:-translate-y-8" : "h-full"}
            >
              <TiltCard className="group h-full rounded-[26px]" max={6}>
                <div className="panel flex h-full flex-col overflow-hidden rounded-[26px]">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(min-width:768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-ink-950/30" />
                    <span className="absolute left-4 top-4 rounded-full bg-ink-950/75 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-200 backdrop-blur">
                      Akció
                    </span>
                  </div>
                  <div className="relative flex flex-1 flex-col p-6 pt-5">
                    <motion.div
                      className="absolute -top-12 right-5 flex h-24 w-24 flex-col items-center justify-center rounded-full bg-gradient-to-b from-blood-500 to-blood-800 text-center shadow-[0_12px_30px_-8px_rgba(0,0,0,0.9)] ring-2 ring-gold-400/60"
                      initial={{ scale: 0, rotate: -40 }}
                      whileInView={{ scale: 1, rotate: 10 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 180, damping: 11, delay: 0.5 + i * 0.12 }}
                    >
                      {p.was && <span className="text-[11px] font-bold text-gold-200/70 line-through">{ft(p.was)}</span>}
                      <span className="font-display text-2xl font-black leading-none text-gold-100">{p.price}</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gold-200">Ft</span>
                    </motion.div>
                    <p className="pr-24 font-serif text-sm italic text-gold-300">{p.kicker}</p>
                    <h3 className="mt-1 pr-24 font-display text-2xl font-black leading-tight text-gold-100">{p.title}</h3>
                    <ul className="mt-4 space-y-1.5 text-sm text-bone/75">
                      {p.lines.map((l) => (
                        <li key={l} className="flex gap-2">
                          <span className="text-blood-500">✦</span>
                          {l}
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => setOpen(i)}
                      className="mt-auto flex items-center gap-2 self-start pt-6 text-sm font-semibold text-gold-300 transition-colors hover:text-gold-100"
                    >
                      <span className="relative h-9 w-7 overflow-hidden rounded border border-gold-400/40">
                        <Image src={p.poster} alt="" fill sizes="28px" className="object-cover" />
                      </span>
                      Plakát megtekintése →
                    </button>
                  </div>
                </div>
              </TiltCard>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="mt-14 flex flex-col items-center gap-4 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-bone/55">Az akciók időszakosak, a feltételekről rendeléskor tájékoztatunk.</p>
          <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            <FacebookIcon className="h-5 w-5" />
            Kövess minket — {site.followers} követő már itt van
          </a>
        </motion.div>
      </div>

      <Lightbox images={images} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </section>
  );
}
