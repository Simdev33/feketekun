type P = { className?: string };

const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const PhoneIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
    <path d="M5 3h3l2 5-2.5 1.5a11 11 0 0 0 7 7L16 14l5 2v3a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2" />
  </svg>
);
export const ClockIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);
export const PinIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
    <path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);
export const TruckIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
    <path d="M2 6h11v10H2zM13 9h4l4 4v3h-8z" />
    <circle cx="6" cy="17.5" r="1.8" />
    <circle cx="17" cy="17.5" r="1.8" />
  </svg>
);
export const ForkIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
    <path d="M7 3v8a2 2 0 0 0 2 2v8M5 3v5M9 3v5M17 3c-2 2-3 5-3 8h3v10" />
  </svg>
);
export const BagIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
    <path d="M5 8h14l-1 13H6zM9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
);
export const ArrowIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const FacebookIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21z" />
  </svg>
);
export const CloseIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const FlameIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
    <path d="M12 22a7 7 0 0 0 7-7c0-4-3-6-4-10-2 2-3 4-3 6-1-1-2-2-2-4-2 2-5 5-5 8a7 7 0 0 0 7 7z" />
  </svg>
);
