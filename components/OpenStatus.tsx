"use client";

import { useEffect, useState } from "react";
import { hours, lastOrder } from "@/lib/site";

type Status = { open: boolean; label: string; today: number };

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

/** Budapesti idő szerinti nyitvatartási állapot. */
export function getStatus(now = new Date()): Status {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Budapest",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const wd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(parts.find((p) => p.type === "weekday")!.value);
  const min = Number(parts.find((p) => p.type === "hour")!.value) * 60 + Number(parts.find((p) => p.type === "minute")!.value);
  const d = hours[wd];
  if (d.open && d.close && min >= toMin(d.open) && min < toMin(d.close)) {
    if (min >= toMin(lastOrder)) return { open: true, label: `Nyitva ${d.close}-ig · rendelés már nem`, today: wd };
    return { open: true, label: `Most nyitva · rendelés ${lastOrder}-ig`, today: wd };
  }
  // következő nyitás
  for (let i = 0; i < 7; i++) {
    const idx = (wd + i) % 7;
    const n = hours[idx];
    if (!n.open) continue;
    if (i === 0 && min >= toMin(n.open)) continue;
    const when = i === 0 ? "ma" : i === 1 ? "holnap" : n.day.toLowerCase();
    return { open: false, label: `Zárva · nyitunk ${when} ${n.open}-kor`, today: wd };
  }
  return { open: false, label: "Zárva", today: wd };
}

export function useStatus() {
  const [s, setS] = useState<Status | null>(null);
  useEffect(() => {
    const up = () => setS(getStatus());
    up();
    const t = setInterval(up, 30_000);
    return () => clearInterval(t);
  }, []);
  return s;
}

export default function OpenStatus({ className = "" }: { className?: string }) {
  const s = useStatus();
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-gold-400/25 bg-ink-900/60 px-3 py-1.5 text-xs font-semibold text-bone/85 backdrop-blur transition-opacity duration-500 ${s ? "opacity-100" : "opacity-0"} ${className}`}
    >
      <span className="relative flex h-2 w-2">
        {s?.open && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${s?.open ? "bg-emerald-400" : "bg-blood-500"}`} />
      </span>
      {s?.label ?? "…"}
    </span>
  );
}
