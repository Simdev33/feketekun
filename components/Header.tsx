"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { nav, site } from "@/lib/site";
import { PhoneIcon } from "./Icons";
import OpenStatus from "./OpenStatus";

export default function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 600 && y > prev && !open);
  });

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: hidden ? -110 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={`mx-auto mt-3 flex max-w-7xl items-center gap-4 rounded-full px-3 py-2 transition-all duration-500 sm:mx-4 lg:mx-auto ${
            scrolled ? "mx-3 border border-gold-400/20 bg-ink-950/75 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl" : "mx-3 border border-transparent"
          }`}
        >
          <a href="#top" className="group flex items-center gap-3" aria-label={`${site.name} – kezdőlap`}>
            <span className="relative block h-11 w-11 shrink-0 transition-transform duration-700 group-hover:rotate-[360deg]">
              <Image src="/img/logo.png" alt="" fill sizes="44px" className="rounded-full" priority />
            </span>
            <span className="block font-display text-[13px] font-bold leading-none tracking-[0.1em] text-gold-200 sm:text-[15px] sm:tracking-[0.12em]">
              FEKETE KUN
              <span className="mt-1 block text-[9px] tracking-[0.38em] text-bone/55 sm:text-[10px] sm:tracking-[0.42em]">FALATOZÓ</span>
            </span>
          </a>

          <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="Fő navigáció">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="group relative rounded-full px-3.5 py-2 text-sm font-semibold text-bone/75 transition-colors hover:text-gold-100"
              >
                {n.label}
                <span className="absolute inset-x-3.5 bottom-1 h-px origin-left scale-x-0 bg-gold-400 transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <span className="ml-auto hidden md:inline-flex lg:ml-2">
            <OpenStatus />
          </span>

          <a href={site.phoneHref} className="btn btn-gold ml-auto !px-4 !py-2.5 text-sm md:ml-0">
            <PhoneIcon className="h-4 w-4" />
            <span className="hidden sm:inline">{site.phone}</span>
            <span className="sm:hidden">Hívás</span>
          </a>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-gold-400/30 lg:hidden"
            aria-label={open ? "Menü bezárása" : "Menü megnyitása"}
            aria-expanded={open}
          >
            <span className={`absolute h-0.5 w-5 bg-gold-200 transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-1.5"}`} />
            <span className={`absolute h-0.5 w-5 bg-gold-200 transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`absolute h-0.5 w-5 bg-gold-200 transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-1.5"}`} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-ink-950/95 px-6 pt-28 backdrop-blur-xl lg:hidden"
            initial={{ clipPath: "circle(0% at 92% 6%)" }}
            animate={{ clipPath: "circle(150% at 92% 6%)" }}
            exit={{ clipPath: "circle(0% at 92% 6%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="pattern-bg pointer-events-none absolute inset-0 opacity-[0.04]" />
            <nav className="relative flex flex-col" aria-label="Mobil navigáció">
              {nav.map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 border-b border-gold-400/10 py-4 font-display text-3xl font-bold text-bone"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, ease: [0.22, 1, 0.36, 1], duration: 0.6 }}
                >
                  <span className="font-sans text-xs font-bold text-blood-500">0{i + 1}</span>
                  {n.label}
                </motion.a>
              ))}
            </nav>
            <motion.div className="relative mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              <OpenStatus />
              <p className="mt-4 text-sm text-bone/60">{site.address}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
