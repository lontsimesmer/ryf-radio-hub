import React, { useEffect, useRef, useState } from "react";
import { Phone, Info, X, ChevronLeft, ChevronRight } from "lucide-react";

interface SponsorSlide {
  id: string;
  image: string;
  brand: string;
  tagline: string;
  description: string;
  details?: React.ReactNode;
  contact: string;
}

const SPONSORS: SponsorSlide[] = [
  {
    id: "chouquette",
    image:
      "https://vibe.filesafe.space/1791205471365853905/attachments/c31d5566-6f11-418f-a8df-dc176b331e7f.jpg",
    brand: "Chouquette by Osiera",
    tagline: "Votre parfum, votre signature ! 🌸",
    description:
      "Envie de laisser derrière vous une fragrance douce, élégante et inoubliable ? Découvrez Chouquette Eau de Parfum, une création Made in Cameroon 🇨🇲, disponible en deux senteurs pour accompagner chaque personnalité.",
    details: (
      <ul className="mt-3 text-xs sm:text-sm text-white/95 leading-relaxed space-y-1">
        <li>🌺 Bloom, pour une touche florale et raffinée.</li>
        <li>🍦 Vanille, pour une fragrance douce, chaleureuse et gourmande.</li>
      </ul>
    ),
    contact: "+237 690 91 88 68 / 695 29 28 90 / 6 57 46 19 75",
  },
];

export const PubSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Reset reveal when switching sponsor
  const goTo = (i: number) => {
    const next = (i + SPONSORS.length) % SPONSORS.length;
    setRevealed(false);
    setActive(next);
  };

  const current = SPONSORS[active];

  return (
    <section
      id="publicite-partenaire"
      ref={sectionRef}
      className="relative py-10 sm:py-12 overflow-hidden bg-white border-b border-border/70"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* En-tête */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-foreground">
            ESPACE <span className="text-primary">PUBLICITAIRE</span>
          </h2>
        </div>

        {/* Carrousel multi-sponsors */}
        <div className="flex justify-center">
          <div
            className={`relative w-full max-w-[520px] overflow-hidden border border-border shadow-lg cursor-pointer group ${
              inView ? "pub-zoom-in" : "opacity-0"
            }`}
            onClick={() => setRevealed(!revealed)}
            role="button"
            tabIndex={0}
            aria-label="Cliquez pour découvrir le message publicitaire"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setRevealed(!revealed);
              }
            }}
          >
            <img
              src={current.image}
              alt={`${current.brand} - ${current.tagline}`}
              loading="lazy"
              className={`w-full h-auto object-cover transition-all duration-700 ${
                revealed ? "brightness-[0.35] blur-[1px]" : "brightness-100"
              }`}
            />

            {/* Indice "Cliquez pour découvrir" tant que non révélé */}
            {!revealed && (
              <div className="absolute inset-0 flex items-end justify-center pb-5 pointer-events-none">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-ryf-navy/85 text-white text-xs font-black uppercase tracking-wider rounded-none backdrop-blur-sm">
                  <Info className="w-4 h-4 text-accent" />
                  <span>Cliquez pour découvrir</span>
                </div>
              </div>
            )}

            {/* Bouton fermer quand révélé */}
            {revealed && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setRevealed(false);
                }}
                className="absolute top-3 right-3 z-10 grid place-items-center w-8 h-8 bg-white/90 text-foreground hover:bg-white rounded-none transition-colors"
                aria-label="Masquer le message"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Texte publicitaire qui apparaît au clic */}
            {revealed && (
              <div className="absolute inset-0 z-[5] flex flex-col justify-center items-center text-center px-6 py-8 animate-in fade-in zoom-in-95 duration-500">
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                  {current.brand}
                </h3>
                <p className="mt-2 text-sm sm:text-base text-ryf-navy font-black bg-accent/95 px-3 py-1 rounded-none inline-block">
                  {current.tagline}
                </p>
                <p className="mt-3 text-xs sm:text-sm text-white/95 leading-relaxed max-w-md">
                  {current.description}
                </p>
                {current.details}
                <p className="mt-3 text-[11px] text-white/80">
                  Disponible à DOVV Messamendongo et DOVV Mendong.
                </p>
                <div className="mt-3 flex items-center gap-2 text-sm font-bold text-white bg-ryf-navy/90 px-4 py-2 rounded-none">
                  <Phone className="w-4 h-4 text-accent shrink-0" />
                  <span>{current.contact}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation carrousel */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goTo(active - 1);
              }}
              className="grid place-items-center w-9 h-9 border border-border bg-card text-foreground hover:bg-secondary hover:text-primary transition-colors rounded-none"
              aria-label="Sponsor précédent"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-muted-foreground tabular-nums">
              {active + 1} / {SPONSORS.length}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goTo(active + 1);
              }}
              className="grid place-items-center w-9 h-9 border border-border bg-card text-foreground hover:bg-secondary hover:text-primary transition-colors rounded-none"
              aria-label="Sponsor suivant"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
