"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { PhoneIcon } from "./Icons";

/** Arany görgetésjelző csík az oldal tetején. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 140, damping: 26 });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-blood-500 via-gold-300 to-ember"
      style={{ scaleX: x }}
    />
  );
}

/** Mobilon alul ragadó hívás-gomb, a hero után jelenik meg. */
export function MobileCallBar() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 500));
  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={site.phoneHref}
          className="btn btn-gold fixed inset-x-4 bottom-4 z-40 !py-4 text-base md:hidden"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
        >
          <PhoneIcon className="h-5 w-5" />
          Rendelés: {site.phone}
        </motion.a>
      )}
    </AnimatePresence>
  );
}

/** Lágy parázsfény, ami követi az egeret. */
export function CursorGlow() {
  const x = useSpring(-400, { stiffness: 120, damping: 22 });
  const y = useSpring(-400, { stiffness: 120, damping: 22 });
  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[1] -ml-[210px] -mt-[210px] hidden h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,122,42,0.09),transparent_65%)] md:block"
      style={{ x, y }}
    />
  );
}
