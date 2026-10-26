"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { extras, site, story } from "@/lib/site";
import Embers from "./Embers";
import { Counter, SplitLines, SplitWords } from "./motion";
import { Rhombus, WeaveBand } from "./Ornament";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Story() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);
  const rot = useTransform(scrollYProgress, [0, 1], [-20, 40]);

  return (
    <section id="rolunk" ref={ref} className="relative scroll-mt-24 overflow-clip py-24 sm:py-32">
      <WeaveBand className="absolute inset-x-0 top-0" />
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* képek */}
        <div className="relative mx-auto w-full max-w-[560px]">
          <motion.div
            className="relative aspect-[440/560] w-[78%] overflow-hidden rounded-t-[999px] rounded-b-[28px] border border-gold-400/30 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.95)]"
            initial={{ clipPath: "inset(100% 0 0 0 round 999px 999px 28px 28px)" }}
            whileInView={{ clipPath: "inset(0% 0 0 0 round 999px 999px 28px 28px)" }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
          >
            <motion.div className="absolute -inset-y-[10%] inset-x-0" style={{ y: y1 }}>
              <Image src="/img/harcos.webp" alt="Kun lovas harcos — a Fekete Kun Falatozó plakátjáról" fill sizes="(min-width:1024px) 440px, 78vw" className="object-cover [mask-image:linear-gradient(to_bottom,transparent,#000_18%)]" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-blood-900/60 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            className="absolute -bottom-10 right-0 w-[48%] overflow-hidden rounded-[24px] border-4 border-ink-950 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.95)]"
            style={{ y: y2 }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4, ease }}
          >
            <div className="relative aspect-[4/3]">
              <Image src="/img/foto-bejarat.webp" alt="A falatozó bejárata a Deák körúton" fill sizes="260px" className="object-cover" />
            </div>
            <p className="bg-ink-900 px-4 py-2.5 text-xs font-semibold text-bone/70">{site.addressShort}</p>
          </motion.div>

          <motion.div className="absolute -left-4 top-10 text-gold-400/50 sm:-left-10" style={{ rotate: rot }}>
            <Rhombus className="h-20 w-20 sm:h-28 sm:w-28" />
          </motion.div>
        </div>

        {/* szöveg */}
        <div>
          <p className="eyebrow">Rólunk</p>
          <SplitLines
            as="h2"
            className="mt-4 font-display text-[clamp(2.1rem,4.6vw,3.8rem)] font-black leading-[1.05] text-gold-100"
            lines={["A kunok asztalán", <span key="2" className="gold-text">sosem volt szűk</span>, "az adag."]}
          />
          <SplitWords text={story.lead} className="mt-7 font-serif text-xl italic leading-relaxed text-bone/85" />
          {story.body.map((b, i) => (
            <motion.p
              key={i}
              className="mt-5 leading-relaxed text-bone/65"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 * i, ease }}
            >
              {b}
            </motion.p>
          ))}

          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-gold-400/15 bg-gold-400/15 sm:grid-cols-4">
            {story.stats.map((s) => (
              <div key={s.label} className="bg-ink-950 p-4 text-center">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="font-display text-3xl font-black text-gold-200 sm:text-4xl">
                    <Counter value={s.value} />
                    {s.suffix && <span className="ml-1 font-serif text-base font-bold italic text-gold-400">{s.suffix.trim()}</span>}
                  </span>
                  <span className="mt-1 block text-[11px] font-semibold uppercase tracking-wider text-bone/50">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* három pillér */}
      <div className="mx-auto mt-28 grid max-w-7xl gap-5 px-5 sm:px-8 md:grid-cols-3">
        {story.pillars.map((p, i) => (
          <motion.div
            key={p.title}
            className="panel group relative overflow-hidden rounded-[24px] p-7 transition-transform duration-500 hover:-translate-y-2"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: i * 0.12, ease }}
          >
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blood-600/0 blur-3xl transition-colors duration-700 group-hover:bg-blood-600/40" />
            <span className="font-display text-sm font-bold text-blood-500">0{i + 1}</span>
            <h3 className="mt-3 font-display text-3xl font-black text-gold-100">{p.title}</h3>
            <p className="mt-3 leading-relaxed text-bone/65">{p.text}</p>
          </motion.div>
        ))}
      </div>

      {/* bővebb kínálat a solymász-plakáttal */}
      <div className="relative mx-auto mt-28 max-w-7xl px-5 sm:px-8">
        <div className="panel relative grid overflow-hidden rounded-[32px] md:grid-cols-[1fr_0.75fr]">
          <Embers density={30} />
          <div className="relative z-10 p-8 sm:p-12">
            <p className="eyebrow">És még…</p>
            <h3 className="mt-3 font-display text-[clamp(1.9rem,3.6vw,3rem)] font-black leading-tight text-gold-100">{extras.title}</h3>
            <p className="mt-4 max-w-md text-bone/65">{extras.lead}</p>
            <ul className="mt-8 space-y-1">
              {extras.items.map((x, i) => (
                <motion.li
                  key={x.name}
                  className="group flex items-baseline gap-4 border-b border-gold-400/10 py-3"
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.07, ease }}
                >
                  <span className="text-blood-500 transition-transform duration-300 group-hover:rotate-45">◆</span>
                  <span className="font-serif text-2xl font-bold text-bone transition-colors group-hover:text-gold-200">{x.name}</span>
                  <span className="ml-auto hidden text-right text-sm text-bone/50 sm:block">{x.text}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="relative min-h-[420px] md:min-h-0">
            <Image
              src="/img/solymasz.webp"
              alt="Solymász kun asszony díszruhában — a falatozó plakátjáról"
              fill
              sizes="(min-width:768px) 40vw, 100vw"
              className="object-cover object-top [mask-image:linear-gradient(to_right,transparent,#000_30%)] max-md:[mask-image:linear-gradient(to_bottom,transparent,#000_25%)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
