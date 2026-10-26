"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect } from "react";
import { useLenis } from "lenis/react";
import { CloseIcon } from "./Icons";

export type LightboxImage = { src: string; alt: string; w: number; h: number };

/** Teljes képernyős képnéző. Nyíllal lapozható, Esc zárja. */
export default function Lightbox({
  images,
  index,
  onClose,
  onIndex,
}: {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onIndex?: (i: number) => void;
}) {
  const lenis = useLenis();
  const open = index !== null;

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (!onIndex || index === null) return;
      if (e.key === "ArrowRight") onIndex((index + 1) % images.length);
      if (e.key === "ArrowLeft") onIndex((index - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, index, images.length, lenis, onClose, onIndex]);

  const img = index !== null ? images[index] : null;

  return (
    <AnimatePresence>
      {img && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-ink-950/92 p-4 backdrop-blur-md sm:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal
          aria-label={img.alt}
        >
          <motion.div
            key={img.src}
            className="relative max-h-full"
            style={{ aspectRatio: `${img.w} / ${img.h}`, width: `min(100%, calc((100vh - 5rem) * ${img.w / img.h}))` }}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={img.src} alt={img.alt} fill sizes="100vw" className="rounded-xl object-contain" />
          </motion.div>
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full border border-gold-400/40 bg-ink-900 text-gold-200 transition hover:rotate-90 hover:bg-blood-700"
            aria-label="Bezárás"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
          {onIndex && images.length > 1 && index !== null && (
            <>
              {[-1, 1].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onIndex((index + d + images.length) % images.length);
                  }}
                  className={`absolute top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold-400/40 bg-ink-900/80 text-2xl text-gold-200 transition hover:bg-blood-700 sm:flex ${d < 0 ? "left-4" : "right-4"}`}
                  aria-label={d < 0 ? "Előző kép" : "Következő kép"}
                >
                  {d < 0 ? "‹" : "›"}
                </button>
              ))}
              <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-bone/60">
                {index + 1} / {images.length}
              </p>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
