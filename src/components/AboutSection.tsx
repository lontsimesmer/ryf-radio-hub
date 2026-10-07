import React, { useState, useRef, useEffect, useCallback } from "react";
import { RYF_ASSETS } from "@/lib/ryf-data";
import { ChevronLeft, ChevronRight, X, Info, Sparkles } from "lucide-react";

interface ConceptCard {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  bgImage: string;
}

const CARDS: ConceptCard[] = [
  {
    id: "concept",
    title: "NOTRE CONCEPT",
    shortDesc: "Une Radio Web moderne ouverte sur le monde et connectée à la culture africaine.",
    fullDesc:
      "RYF Radio (Rythmes & Folies) est une plateforme digitale pensée pour l'ère numérique. Nous combinons divertissement interactif, promotion des richesses culturelles et musique 24h/24. Plus qu'une radio, une véritable communauté d'écoute et de partage.",
    bgImage: RYF_ASSETS.img2Rfi,
  },
  {
    id: "missions",
    title: "NOS MISSIONS",
    shortDesc: "Valoriser la diversité culturelle, informer et divertir les générations.",
    fullDesc:
      "Notre mission est de donner une voix aux talents émergents, de préserver et célébrer le patrimoine musical et artistique africain, tout en offrant une expérience sonore de très haute qualité accessible partout dans le monde.",
    bgImage: RYF_ASSETS.culturalFestival,
  },
  {
    id: "offres",
    title: "NOS OFFRES",
    shortDesc: "Programmes en streaming direct, podcasts exclusifs et solutions médias 360°.",
    fullDesc:
      "Diffusion en flux continu HD, chroniques quotidiennes, productions de podcasts originaux, captations vidéo d'événements, interviews exclusives et campagnes promotionnelles ciblées pour nos partenaires et annonceurs.",
    bgImage: RYF_ASSETS.concertStage,
  },
  {
    id: "cibles",
    title: "NOS CIBLES",
    shortDesc: "La jeunesse connectée, les passionnés de culture et la diaspora africaine.",
    fullDesc:
      "Nous nous adressons à un public dynamique et curieux au Cameroun, en Afrique centrale et dans le monde entier, avide de découvertes musicales, de tendances actuelles et de moments de divertissement authentiques.",
    bgImage: RYF_ASSETS.heroCrowd,
  },
  {
    id: "realisations",
    title: "NOS RÉALISATIONS",
    shortDesc: "Couvertures médiatiques, immersions en festivals et partenariats d'envergure.",
    fullDesc:
      "RYF Radio est activement déployée sur le terrain : reportages au cœur des plus grands festivals, retransmissions en direct, micro-trottoirs et collaborations fructueuses avec les acteurs culturels majeurs de la scène africaine.",
    bgImage: RYF_ASSETS.livePerformance,
  },
];

export const AboutSection: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<ConceptCard | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const scroll = (direction: "left" | "right") => {
    if (!scrollerRef.current) return;
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const offset = isMobile ? window.innerWidth * 0.9 : 320;
    scrollerRef.current.scrollBy({
      left: direction === "left" ? -offset : offset,
      behavior: "smooth",
    });
  };

  const autoScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el || selectedCard) return;
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const offset = isMobile ? window.innerWidth * 0.9 : 320;
    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      el.scrollBy({ left: offset, behavior: "smooth" });
    }
  }, [selectedCard]);

  useEffect(() => {
    if (isPaused || selectedCard) return;
    const interval = setInterval(autoScroll, 4500);
    return () => clearInterval(interval);
  }, [isPaused, autoScroll, selectedCard]);

  return (
    <section id="a-propos" className="relative py-20 overflow-hidden text-white">
      {/* Background with user official visual: subtle dark gradient overlay for optimal readability */}
      <div className="absolute inset-0 z-0">
        <img
          src={RYF_ASSETS.img1HeroComm}
          alt="À propos de RYF Radio"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-slate-950/65" />
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-slate-950/60 to-slate-950/85" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Carousel container */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Controls */}
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Faire défiler vers la gauche"
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-slate-900/80 border border-white/20 text-white hover:bg-primary hover:border-primary transition-all shadow-xl backdrop-blur-md"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            ref={scrollerRef}
            className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {CARDS.map((card) => {
              const isSelected = selectedCard?.id === card.id;
              return (
                <div
                  key={card.id}
                  onClick={() => setSelectedCard(isSelected ? null : card)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSelectedCard(isSelected ? null : card);
                    }
                  }}
                  className={`group relative shrink-0 w-[88vw] sm:w-[320px] h-[380px] rounded-2xl overflow-hidden cursor-pointer snap-center sm:snap-start transition-all duration-500 border ${
                    isSelected
                      ? "border-accent ring-2 ring-accent shadow-2xl scale-[1.02]"
                      : "border-white/20 hover:border-white/50 hover:shadow-2xl hover:-translate-y-1.5"
                  }`}
                >
                  {/* Card Background image with smooth dark gradient */}
                  <img
                    src={card.bgImage}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-slate-950/70 group-hover:bg-slate-950/60 transition-colors" />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/50 to-transparent" />

                  {/* Card Content */}
                  <div className="relative z-10 h-full p-6 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-primary/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider">
                        RYF RADIO
                      </span>
                      <span className="w-7 h-7 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white/90 group-hover:bg-accent group-hover:text-slate-950 transition-colors">
                        <Info className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-black text-white uppercase tracking-tight group-hover:text-accent transition-colors">
                        {card.title}
                      </h3>
                      <p className="mt-2 text-xs text-white/80 line-clamp-2 leading-relaxed">
                        {card.shortDesc}
                      </p>
                      <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs font-bold text-accent">
                        <span>{isSelected ? "Fermer les détails" : "En savoir plus"}</span>
                        <span>{isSelected ? "−" : "+"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Faire défiler vers la droite"
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-slate-900/80 border border-white/20 text-white hover:bg-primary hover:border-primary transition-all shadow-xl backdrop-blur-md"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Selected Card Modal / Slide-down Preview */}
        {selectedCard && (
          <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-accent/40 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-black uppercase text-accent tracking-widest">
                  Détail de la rubrique
                </span>
                <h3 className="text-2xl font-black text-white mt-1 uppercase">
                  {selectedCard.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCard(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="mt-4 text-sm sm:text-base text-white/90 leading-relaxed max-w-3xl">
              {selectedCard.fullDesc}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
