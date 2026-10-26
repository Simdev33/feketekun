"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { INTRO_KEY as KEY } from "@/lib/intro";

const ease = [0.76, 0, 0.24, 1] as const;

// Nyitókép: a sisakos jelvény kigyúl, körülötte forog a felirat, aztán két kapuszárny nyílik szét.
// Munkamenetenként egyszer.
export default function Preloader() {
  const [show, setShow] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
      sessionStorage.setItem(KEY, "1");
    } catch {}
    const t = setTimeout(() => setShow(false), seen || reduce ? 0 : 2100);
    return () => clearTimeout(t);
  }, [reduce]);

  useEffect(() => {
    document.documentElement.style.overflow = show ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div key="gate" data-preloader className="fixed inset-0 z-[100]" aria-hidden exit={{ transition: { duration: 1 } }}>
          {/* két kapuszárny */}
          {[0, 1].map((i) => (
            <motion.div
              key={i}
              className={`absolute top-0 h-full w-1/2 bg-ink-950 ${i === 0 ? "left-0 border-r" : "right-0 border-l"} border-gold-500/30`}
              exit={{ x: i === 0 ? "-100%" : "100%", transition: { duration: 1, ease } }}
            >
              <div className="pattern-bg absolute inset-0 opacity-[0.05]" />
            </motion.div>
          ))}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            exit={{ opacity: 0, scale: 1.15, filter: "blur(10px)", transition: { duration: 0.5 } }}
          >
            <div className="absolute h-[60vmin] w-[60vmin] rounded-full bg-blood-700/40 blur-3xl" />
            <motion.div
              className="relative h-44 w-44 sm:h-56 sm:w-56"
              initial={{ opacity: 0, scale: 0.6, rotate: -25 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="absolute -inset-4 rounded-full border border-dashed border-gold-400/50"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              <Image src="/img/logo.png" alt="" fill sizes="224px" priority className="rounded-full shadow-[0_0_60px_rgba(217,169,91,0.35)]" />
            </motion.div>
            <div className="mt-10 h-px w-40 overflow-hidden bg-gold-500/20">
              <motion.div
                className="h-full w-full origin-left bg-gradient-to-r from-blood-500 via-gold-300 to-blood-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.7, ease: [0.65, 0, 0.35, 1] }}
              />
            </div>
            <motion.p
              className="mt-5 font-display text-xs font-bold tracking-[0.5em] text-gold-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              HAGYOMÁNY · ÍZEK · ERŐ
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
