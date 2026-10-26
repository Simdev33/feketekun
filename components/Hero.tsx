"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { site, delivery } from "@/lib/site";
import Embers from "./Embers";
import { ArrowIcon, ClockIcon, PhoneIcon, PinIcon, TruckIcon } from "./Icons";
import { Magnetic } from "./motion";
import { Rhombus } from "./Ornament";
import { introStart } from "@/lib/intro";

const ease = [0.22, 1, 0.36, 1] as const;
const START = introStart(); // a nyitókép után induljon

function Letters({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={`flex overflow-hidden pt-[0.18em] -mt-[0.18em] pb-[0.06em] ${className}`} aria-hidden>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "105%", rotateX: -70, opacity: 0 }}
          animate={{ y: "0%", rotateX: 0, opacity: 1 }}
          transition={{ duration: 1.1, delay: START + delay + i * 0.045, ease }}
        >
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // egérkövető dőlés a burgeren
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 90, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 90, damping: 18 });
  const gx = useSpring(useTransform(mx, [-0.5, 0.5], [-24, 24]), { stiffness: 60, damping: 20 });

  return (
    <section
      id="top"
      ref={ref}
      className="grain relative isolate flex min-h-[100svh] items-center overflow-clip pt-28 pb-16"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
      }}
    >
      {/* háttér: vörös izzás, minta, füst, parázs */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_70%_45%,rgba(156,23,27,0.55),transparent_70%),radial-gradient(50%_50%_at_10%_90%,rgba(124,17,21,0.35),transparent_70%)]" />
        <div className="pattern-bg absolute inset-0 opacity-[0.035]" />
        <motion.div
          className="absolute -left-1/4 bottom-0 h-[50vh] w-[90vw] rounded-full bg-[#3a2018]/50 blur-[90px]"
          animate={{ x: ["0%", "18%", "0%"], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-1/4 top-1/4 h-[40vh] w-[60vw] rounded-full bg-[#ff7a2a]/10 blur-[100px]"
          animate={{ x: ["0%", "-14%", "0%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <Embers density={80} />
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-ink-950 via-ink-950/70 to-transparent" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-4">
        <motion.div style={{ y: textY, opacity: fade }} className="relative z-10">
          <motion.p
            className="eyebrow flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: START, ease }}
          >
            <Rhombus className="h-5 w-5 text-gold-400" animate={false} />
            Karcag · a Nagykunság szívében
          </motion.p>

          <h1 className="mt-6 font-display font-black leading-[0.92] [perspective:800px]">
            <span className="sr-only">{site.name}</span>
            <Letters text="FEKETE" className="gold-text text-[clamp(3.4rem,10vw,8.6rem)] tracking-[0.02em]" />
            <Letters text="KUN" delay={0.25} className="gold-text text-[clamp(3.4rem,10vw,8.6rem)] tracking-[0.02em]" />
            <motion.span
              className="brush mt-3 inline-block px-6 py-2"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 1.1, delay: START + 0.75, ease: [0.65, 0, 0.35, 1] }}
              aria-hidden
            >
              <span className="block pt-[0.12em] font-display text-[clamp(1.5rem,4.2vw,3.2rem)] tracking-[0.28em] text-gold-100 drop-shadow-[0_2px_0_rgba(0,0,0,0.5)]">
                FALATOZÓ
              </span>
            </motion.span>
          </h1>

          <motion.p
            className="mt-7 max-w-md font-serif text-xl italic leading-snug text-bone/80 sm:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: START + 1.05, ease }}
          >
            Kézműves hamburgerek, kemencében sült pizza, gyros tál — {site.slogan}.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: START + 1.2, ease }}
          >
            <Magnetic>
              <a href={site.phoneHref} className="btn btn-gold text-base">
                <PhoneIcon className="h-5 w-5" />
                Rendelek: {site.phone}
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a href="#etlap" className="btn btn-ghost group text-base">
                Étlap
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Magnetic>
          </motion.div>

          <motion.ul
            className="mt-10 grid max-w-lg grid-cols-1 gap-x-6 gap-y-3 text-sm text-bone/70 sm:grid-cols-2"
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.08, delayChildren: START + 1.4 }}
          >
            {[
              { i: ClockIcon, t: "H–Szo 10:00–20:00, vasárnap zárva" },
              { i: TruckIcon, t: `Kiszállítás ${delivery.lastOrder}-ig, ${delivery.freeAbove} Ft felett ingyen` },
              { i: PinIcon, t: site.addressShort },
            ].map(({ i: I, t }) => (
              <motion.li
                key={t}
                className="flex items-center gap-2.5"
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold-400/30 text-gold-300">
                  <I className="h-4 w-4" />
                </span>
                {t}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* burger-kompozíció */}
        <motion.div style={{ y: imgY, scale: imgScale }} className="relative mx-auto aspect-square w-full max-w-[640px]">
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.6, delay: START + 0.2, ease }}
          >
            {/* forgó körfelirat */}
            <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full animate-spin-slow text-gold-400/70" aria-hidden>
              <defs>
                <path id="ring" d="M200 200m-182 0a182 182 0 1 1 364 0a182 182 0 1 1-364 0" />
              </defs>
              <circle cx="200" cy="200" r="196" fill="none" stroke="currentColor" strokeOpacity=".25" />
              <circle cx="200" cy="200" r="168" fill="none" stroke="currentColor" strokeOpacity=".15" strokeDasharray="2 6" />
              <text className="fill-current font-display text-[13px] font-bold tracking-[0.42em]">
                <textPath href="#ring">KÉZMŰVES HAMBURGER ✦ KEMENCÉS PIZZA ✦ GYROS TÁL ✦ KENTUCKY CSIRKE ✦</textPath>
              </text>
            </svg>
            <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(255,122,42,0.35),rgba(156,23,27,0.25)_45%,transparent_70%)] blur-2xl animate-flicker" />
          </motion.div>

          <motion.div className="absolute inset-[6%] [perspective:900px]" style={{ x: gx }}>
            <motion.div
              style={{ rotateX: rx, rotateY: ry }}
              className="relative h-full w-full"
              initial={{ opacity: 0, y: 80, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.4, delay: START + 0.45, ease }}
            >
              <motion.div
                className="relative h-full w-full"
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/img/hero-burger.webp"
                  alt="Kentucky BBQ csibe burger"
                  fill
                  priority
                  sizes="(min-width: 1024px) 560px, 90vw"
                  className="object-cover [mask-image:radial-gradient(closest-side,#000_62%,transparent_100%)]"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* árcímke */}
          <motion.div
            className="absolute bottom-[8%] left-[2%] z-10 sm:left-[4%]"
            initial={{ opacity: 0, scale: 0, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: -8 }}
            transition={{ type: "spring", stiffness: 160, damping: 12, delay: START + 1.5 }}
          >
            <div className="relative flex h-28 w-28 flex-col items-center justify-center rounded-full bg-gradient-to-b from-blood-500 to-blood-800 text-center shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)] ring-2 ring-gold-400/60 ring-offset-4 ring-offset-transparent sm:h-32 sm:w-32">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-200">burgerek</span>
              <span className="font-display text-3xl font-black leading-none text-gold-100 sm:text-4xl">1450</span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-gold-200">Ft-tól</span>
            </div>
          </motion.div>

          <motion.div
            className="absolute right-[4%] top-[6%] z-10 rounded-full border border-gold-400/30 bg-ink-950/70 px-4 py-2 text-xs font-semibold text-gold-200 backdrop-blur"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: START + 1.7, duration: 0.8 }}
          >
            15 dkg prémium marhahús
          </motion.div>
        </motion.div>
      </div>

      {/* görgess lefelé jelzés */}
      <motion.a
        href="#etlap"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-[0.4em] text-gold-300/70 md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: START + 2 }}
        style={{ opacity: fade }}
        aria-label="Tovább az étlapra"
      >
        Görgess
        <span className="relative h-10 w-px overflow-hidden bg-gold-400/20">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-gold-300"
            animate={{ y: [-16, 40] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
