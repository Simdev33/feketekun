import { marquee } from "@/lib/site";
import { Rhombus } from "./Ornament";

/** Enyhén ferde, lassan futó piros szalag. A szélesebb sáv takarja a ferdítés miatti sarkokat. */
export default function Marquee() {
  const row = [...marquee, ...marquee];

  return (
    <div className="relative z-10 -my-6 overflow-hidden py-10" aria-hidden>
      <div className="-mx-[5vw] -rotate-2 border-y border-gold-400/30 bg-blood-700 py-4 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.9)]">
        <div className="flex w-max animate-marquee items-center gap-8 [animation-duration:90s]">
          {[...row, ...row].map((t, i) => (
            <span key={i} className="flex items-center gap-8 font-display text-2xl font-bold tracking-wider text-gold-100 sm:text-3xl">
              {t}
              <Rhombus className="h-6 w-6 text-gold-300" animate={false} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
