"use client";

import { motion } from "motion/react";
import { draw } from "./motion";

/** A plakátok piros kun rombusz-díszítménye, vonalrajz-animációval. */
export function Rhombus({ className = "", animate = true }: { className?: string; animate?: boolean }) {
  const paths = [
    "M32 4 60 32 32 60 4 32z",
    "M32 16 48 32 32 48 16 32z",
    "M32 4V0M32 64v-4M4 32H0M64 32h-4",
    "M18 18l-6-6m4 0h2v2M46 18l6-6m-4 0h-2v2M18 46l-6 6m4 0h2v-2M46 46l6 6m-4 0h-2v-2",
  ];
  return (
    <motion.svg
      viewBox="0 0 64 64"
      className={className}
      initial={animate ? "hidden" : false}
      whileInView="show"
      viewport={{ once: true }}
      aria-hidden
    >
      {paths.map((d, i) => (
        <motion.path key={i} d={d} fill="none" stroke="currentColor" strokeWidth={2} variants={animate ? draw : undefined} custom={i} />
      ))}
      <motion.path
        d="M32 26l6 6-6 6-6-6z"
        className="fill-blood-500"
        initial={animate ? { scale: 0 } : false}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.9, type: "spring", stiffness: 260, damping: 14 }}
        style={{ transformOrigin: "32px 32px" }}
      />
    </motion.svg>
  );
}

/** Vízszintes díszvonal középen rombusszal — szekciócímek alá. */
export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 text-gold-400 ${className}`} aria-hidden>
      <motion.span
        className="h-px w-16 origin-right bg-gradient-to-l from-gold-400 to-transparent sm:w-24"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
      <Rhombus className="h-6 w-6" />
      <motion.span
        className="h-px w-16 origin-left bg-gradient-to-r from-gold-400 to-transparent sm:w-24"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

/** Szekciófej: kis felirat, nagy cím, díszvonal. */
export function SectionHead({
  eyebrow,
  title,
  lead,
  align = "center",
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  align?: "center" | "left";
  children?: React.ReactNode;
}) {
  const c = align === "center";
  return (
    <div className={`relative z-10 ${c ? "mx-auto text-center" : ""} max-w-3xl`}>
      <motion.p
        className="eyebrow"
        initial={{ opacity: 0, letterSpacing: "0.6em" }}
        whileInView={{ opacity: 1, letterSpacing: "0.32em" }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {eyebrow}
      </motion.p>
      {title}
      <Divider className={`mt-5 ${c ? "justify-center" : ""}`} />
      {lead && (
        <motion.p
          className={`mt-6 text-lg leading-relaxed text-bone/70 ${c ? "mx-auto max-w-2xl" : "max-w-xl"}`}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.25 }}
        >
          {lead}
        </motion.p>
      )}
      {children}
    </div>
  );
}

/** Kun szőttes-csík a szekciók határán. */
export function WeaveBand({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`weave h-7 w-full opacity-70 ${className}`} />;
}
