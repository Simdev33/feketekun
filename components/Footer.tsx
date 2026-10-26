"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { nav, site } from "@/lib/site";
import { FacebookIcon, PhoneIcon } from "./Icons";
import { WeaveBand } from "./Ornament";

export default function Footer() {
  return (
    <footer className="relative overflow-clip bg-ink-950 pb-28 pt-0 md:pb-10">
      <WeaveBand />
      {/* óriás felirat */}
      <div className="pointer-events-none select-none overflow-hidden" aria-hidden>
        <motion.p
          className="whitespace-nowrap pt-10 text-center font-display text-[13.5vw] font-black leading-none text-transparent [-webkit-text-stroke:1px_rgba(217,169,91,0.22)]"
          initial={{ y: "40%", opacity: 0 }}
          whileInView={{ y: "0%", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          FEKETE KUN
        </motion.p>
      </div>

      <div className="mx-auto mt-10 grid max-w-7xl gap-10 px-5 sm:px-8 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="flex items-start gap-4">
          <Image src="/img/logo.png" alt="Fekete Kun Falatozó logó" width={72} height={72} className="rounded-full" />
          <div>
            <p className="font-display text-xl font-bold text-gold-100">{site.name}</p>
            <p className="mt-1 font-serif italic text-bone/60">{site.pillars.join(" · ")}</p>
            <p className="mt-3 text-sm text-bone/50">{site.address}</p>
          </div>
        </div>
        <nav aria-label="Lábléc navigáció" className="grid grid-cols-2 gap-2 text-sm">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="text-bone/60 transition-colors hover:text-gold-200">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="space-y-3 text-sm">
          <a href={site.phoneHref} className="flex items-center gap-2 font-semibold text-gold-200 hover:text-gold-100">
            <PhoneIcon className="h-4 w-4" /> {site.phone}
          </a>
          <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-bone/60 hover:text-gold-200">
            <FacebookIcon className="h-4 w-4" /> Facebook
          </a>
          <p className="text-bone/40">H–Szo 10:00–20:00 · Vasárnap zárva</p>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl flex-wrap justify-between gap-3 border-t border-gold-400/10 px-5 pt-6 text-xs text-bone/35 sm:px-8">
        <p>© {new Date().getFullYear()} {site.name}. Minden jog fenntartva.</p>
        <p>Az ételfotók saját fotóink — nem illusztrációk.</p>
      </div>
    </footer>
  );
}
