// Mennyit várjon a hero-animáció: első látogatáskor a nyitókép (Preloader) végéig.
export const INTRO_KEY = "feketekun-intro";

export function introStart(): number {
  if (typeof window === "undefined") return 2.2;
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return 0;
    return sessionStorage.getItem(INTRO_KEY) === "1" ? 0.15 : 2.2;
  } catch {
    return 0.15;
  }
}
