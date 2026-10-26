"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { burgerMenu, ft, menu, site } from "@/lib/site";
import { ArrowIcon, PhoneIcon } from "./Icons";
import Lightbox from "./Lightbox";
import { SplitLines } from "./motion";
import { Rhombus, SectionHead } from "./Ornament";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Menu() {
  const [active, setActive] = useState(menu[0].id);
  const [poster, setPoster] = useState<number | null>(null);
  const cat = menu.find((c) => c.id === active)!;

  return (
    <section id="etlap" className="relative scroll-mt-24 py-24 sm:py-32">
      <div aria-hidden className="pattern-bg absolute inset-0 opacity-[0.025] [mask-image:linear-gradient(to_bottom,transparent,#000_20%,#000_80%,transparent)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          eyebrow="Étlap"
          title={
            <SplitLines
              as="h2"
              className="mt-4 font-display text-[clamp(2.4rem,6vw,4.6rem)] font-black leading-[1.02] text-gold-100"
              lines={["Mit sütünk ma", <span key="2" className="gold-text">a kán asztalára?</span>]}
            />
          }
          lead="Valódi árak, valódi adagok — egyenesen az étlapunkról. Minden burger menüben is kérhető."
        />

        {/* kategóriafülek */}
        <div className="no-scrollbar -mx-5 mt-14 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          <div role="tablist" aria-label="Étlap kategóriák" className="mx-auto flex w-max gap-1 rounded-2xl border border-[#b8592c]/30 bg-ink-900/70 p-1.5 backdrop-blur">
            {menu.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={active === c.id}
                onClick={() => setActive(c.id)}
                className={`relative px-4 py-3 font-display text-[13px] font-black uppercase tracking-[0.08em] transition-colors sm:px-6 ${active === c.id ? "text-[#2a0a05]" : "text-[#e9a77c]/75 hover:text-[#f6b083]"}`}
              >
                {active === c.id && (
                  <motion.span
                    layoutId="menu-pill"
                    className="parchment absolute -inset-x-1.5 -inset-y-0.5"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative drop-shadow-[0_1px_0_rgba(255,200,160,0.35)]">{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          {/* kategória kép */}
          <div className="relative lg:sticky lg:top-28 lg:self-start">
            <div className="panel relative aspect-[4/3] overflow-hidden rounded-[28px]">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={cat.image}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.15, clipPath: "inset(0 0 100% 0)" }}
                  animate={{ opacity: 1, scale: 1, clipPath: "inset(0 0 0% 0)" }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.9, ease }}
                >
                  <Image src={cat.image} alt={cat.imageAlt} fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
                </motion.div>
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  <motion.div key={cat.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45 }}>
                    <p className="eyebrow">{cat.items.length} tétel</p>
                    <h3 className="mt-2 font-display text-3xl font-black text-gold-100 sm:text-4xl">{cat.title}</h3>
                    {cat.note && <p className="mt-2 max-w-sm text-sm text-bone/70">{cat.note}</p>}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setPoster(0)}
              className="group mt-4 flex w-full items-center justify-between rounded-2xl border border-gold-400/20 bg-ink-900/60 px-5 py-4 text-left transition hover:border-gold-400/50 hover:bg-blood-900/40"
            >
              <span>
                <span className="block text-sm font-bold text-gold-100">Az eredeti étlap-plakát</span>
                <span className="text-xs text-bone/55">Nagyítható kép — ahogy a pultnál is látod</span>
              </span>
              <ArrowIcon className="h-5 w-5 text-gold-300 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* tételek */}
          <div>
            <AnimatePresence mode="wait">
              <motion.ul
                key={cat.id}
                className="divide-y divide-gold-400/10"
                initial="hidden"
                animate="show"
                exit="exit"
                variants={{ show: { transition: { staggerChildren: 0.06 } }, exit: { opacity: 0, transition: { duration: 0.2 } } }}
              >
                {cat.items.map((it) => (
                  <motion.li
                    key={it.name}
                    className="group relative py-5 first:pt-0"
                    variants={{ hidden: { opacity: 0, x: 30, filter: "blur(6px)" }, show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.6, ease } } }}
                  >
                    <span aria-hidden className="absolute -left-4 top-1/2 hidden h-0 w-0.5 -translate-y-1/2 bg-blood-500 transition-all duration-300 group-hover:h-2/3 lg:block" />
                    <div className="flex items-baseline gap-3">
                      <h4 className="font-serif text-2xl font-bold text-bone transition-colors group-hover:text-gold-200">
                        {it.name}
                        {it.unit && <span className="ml-2 font-sans text-sm font-semibold text-bone/50">{it.unit}</span>}
                      </h4>
                      {it.tag && (
                        <span className="hidden rounded-full bg-blood-700/70 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-200 sm:inline">
                          {it.tag}
                        </span>
                      )}
                      <span className="dotted-leader" />
                      <span className="whitespace-nowrap rounded-lg border border-gold-400/30 bg-ink-900 px-3 py-1 font-display text-lg font-bold text-gold-200 shadow-[inset_0_1px_0_rgba(251,240,214,0.08)] transition group-hover:border-gold-300 group-hover:bg-blood-800">
                        {it.priceLabel ?? ft(it.price)}
                      </span>
                    </div>
                    {it.desc && <p className="mt-1.5 max-w-xl text-[15px] leading-relaxed text-bone/60">{it.desc}</p>}
                    {it.extra && <p className="mt-1.5 font-serif text-sm italic text-gold-400">{it.extra}</p>}
                    {it.menu && <p className="mt-1.5 font-serif text-sm italic text-gold-400">menüben {it.menu} Ft</p>}
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>

            {/* burger menü doboz */}
            <motion.div
              className="panel mt-10 overflow-hidden rounded-[24px] p-6 sm:p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease }}
            >
              <Rhombus className="absolute -right-6 -top-6 h-32 w-32 text-gold-400/15" />
              <div className="relative flex flex-wrap items-end justify-between gap-6">
                <div>
                  <p className="eyebrow">Burger menü</p>
                  <p className="mt-2 font-display text-3xl font-black text-gold-100">
                    + {burgerMenu.price} Ft <span className="font-serif text-lg font-normal italic text-bone/60">felár</span>
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {burgerMenu.includes.map((x) => (
                      <li key={x} className="rounded-full border border-gold-400/25 px-3 py-1 text-sm text-bone/80">
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
                <a href={site.phoneHref} className="btn btn-gold">
                  <PhoneIcon className="h-4 w-4" />
                  Megrendelem
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Lightbox
        images={[{ src: "/img/etlap.webp", alt: "A Fekete Kun Falatozó étlapja", w: 1024, h: 1536 }]}
        index={poster}
        onClose={() => setPoster(null)}
      />
    </section>
  );
}
