"use client";

import { motion } from "motion/react";
import { delivery, hours, site, steps } from "@/lib/site";
import Embers from "./Embers";
import { BagIcon, ClockIcon, ForkIcon, PhoneIcon, PinIcon, TruckIcon } from "./Icons";
import { Magnetic, SplitLines } from "./motion";
import { useStatus } from "./OpenStatus";
import OpenStatus from "./OpenStatus";
import { Rhombus } from "./Ornament";

const ease = [0.22, 1, 0.36, 1] as const;
const modeIcons = [ForkIcon, BagIcon, TruckIcon];
// hétfővel kezdődő sorrend a táblázathoz
const week = [1, 2, 3, 4, 5, 6, 0];

export default function Order() {
  const status = useStatus();

  return (
    <section id="rendeles" className="relative scroll-mt-24 overflow-clip py-24 sm:py-32">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_100%,rgba(156,23,27,0.45),transparent_70%)]" />
      <Embers density={40} />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* nagy hívás-blokk */}
        <div className="text-center">
          <p className="eyebrow">Rendelés</p>
          <SplitLines
            as="h2"
            className="mt-4 font-display text-[clamp(2.4rem,6vw,4.8rem)] font-black leading-[1.02] text-gold-100"
            lines={["Éhes vagy?", <span key="2" className="gold-text">Egy hívás, és visszük.</span>]}
          />
          <motion.div
            className="mt-10 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
          >
            <Magnetic strength={0.15}>
              <a
                href={site.phoneHref}
                className="group relative inline-flex items-center gap-4 rounded-full border border-gold-400/40 bg-ink-950/70 py-3 pl-3 pr-8 backdrop-blur transition hover:border-gold-300 sm:gap-6"
              >
                <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-b from-gold-200 to-gold-500 text-ink-950 sm:h-20 sm:w-20">
                  <span className="absolute inset-0 animate-ping rounded-full bg-gold-300/40 [animation-duration:2.2s]" />
                  <PhoneIcon className="relative h-7 w-7 transition-transform group-hover:rotate-12 sm:h-8 sm:w-8" />
                </span>
                <span className="text-left">
                  <span className="block text-xs font-bold uppercase tracking-[0.3em] text-bone/55">Rendelésfelvétel</span>
                  <span className="block font-display text-[clamp(1.7rem,5vw,3.2rem)] font-black leading-tight text-gold-100">{site.phone}</span>
                </span>
              </a>
            </Magnetic>
          </motion.div>
          <div className="mt-6 flex justify-center">
            <OpenStatus />
          </div>
        </div>

        {/* lépések */}
        <ol className="relative mt-20 grid gap-5 md:grid-cols-3">
          <motion.span
            aria-hidden
            className="absolute left-[16%] right-[16%] top-10 hidden h-px origin-left bg-gradient-to-r from-gold-400/0 via-gold-400/50 to-gold-400/0 md:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease }}
          />
          {steps.map((s, i) => (
            <motion.li
              key={s.n}
              className="relative text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.15, ease }}
            >
              <span className="relative mx-auto flex h-20 w-20 items-center justify-center">
                <Rhombus className="absolute inset-0 h-full w-full text-gold-400/60" />
                <span className="relative font-display text-lg font-black text-gold-100">{s.n}</span>
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold text-gold-100">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-bone/60">{s.text}</p>
            </motion.li>
          ))}
        </ol>

        {/* infó-kártyák */}
        <div className="mt-20 grid gap-5 lg:grid-cols-3">
          <motion.div
            className="panel rounded-[24px] p-7"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            <div className="flex items-center gap-3 text-gold-300">
              <ClockIcon className="h-6 w-6" />
              <h3 className="font-display text-xl font-bold text-gold-100">Nyitvatartás</h3>
            </div>
            <table className="mt-5 w-full text-[15px]">
              <tbody>
                {week.map((d) => {
                  const h = hours[d];
                  const today = status?.today === d;
                  return (
                    <tr key={d} className={`border-b border-gold-400/10 last:border-0 ${today ? "text-gold-200" : "text-bone/70"}`}>
                      <td className="py-2 font-semibold">
                        {h.day}
                        {today && <span className="ml-2 rounded-full bg-blood-700 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-100">ma</span>}
                      </td>
                      <td className="py-2 text-right tabular-nums">{h.open ? `${h.open} – ${h.close}` : <span className="text-blood-500">zárva</span>}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p className="mt-4 text-sm text-bone/50">Rendelésfelvétel minden nyitvatartási napon {delivery.lastOrder}-ig.</p>
          </motion.div>

          <motion.div
            className="panel rounded-[24px] p-7"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            <div className="flex items-center gap-3 text-gold-300">
              <TruckIcon className="h-6 w-6" />
              <h3 className="font-display text-xl font-bold text-gold-100">Házhozszállítás</h3>
            </div>
            <div className="mt-6 flex items-end gap-4">
              <p className="font-display text-6xl font-black leading-none text-gold-200">{delivery.fee}</p>
              <p className="pb-1 text-bone/60">Ft kiszállítási díj</p>
            </div>
            <div className="mt-5 rounded-2xl border border-gold-400/30 bg-blood-900/50 p-4">
              <p className="font-display text-lg font-bold text-gold-100">{delivery.freeAbove} Ft felett ingyenes!</p>
              <p className="mt-1 text-sm text-bone/60">Kiszállítás {delivery.lastOrder}-ig.</p>
            </div>
            <ul className="mt-6 space-y-3">
              {delivery.modes.map((m, i) => {
                const I = modeIcons[i];
                return (
                  <li key={m} className="flex items-center gap-3 text-bone/80">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-400/25 text-gold-300">
                      <I className="h-4 w-4" />
                    </span>
                    {m}
                  </li>
                );
              })}
            </ul>
          </motion.div>

          <motion.div
            className="panel flex flex-col overflow-hidden rounded-[24px]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
          >
            <div className="p-7 pb-5">
              <div className="flex items-center gap-3 text-gold-300">
                <PinIcon className="h-6 w-6" />
                <h3 className="font-display text-xl font-bold text-gold-100">Itt találsz</h3>
              </div>
              <p className="mt-3 text-lg text-bone/85">{site.address}</p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapsQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm font-semibold text-gold-300 underline-offset-4 hover:underline"
              >
                Útvonaltervezés →
              </a>
            </div>
            <div className="relative min-h-[240px] flex-1">
              <iframe
                title="Térkép — Fekete Kun Falatozó, Karcag"
                src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&z=16&output=embed`}
                className="absolute inset-0 h-full w-full border-0 [filter:invert(0.9)_hue-rotate(180deg)_saturate(0.6)_brightness(0.9)]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
