import React, { useRef, useState, useEffect, useCallback } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { RYF_NEWS } from "@/lib/ryf-data";
import { Link } from "@tanstack/react-router";

const AUTO_STEP = 4200; // soft auto-advance delay (ms)

export const UniversSection: React.FC = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0); // card at center/focus
  const [clickedCardId, setClickedCardId] = useState<string | null>(null);

  // Détection de l'élément le plus proche du centre au défilement
  const handleScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>("[data-card]");
    if (!cards.length) return;

    const containerCenter = el.getBoundingClientRect().left + el.clientWidth / 2;
    let closestIdx = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = idx;
      }
    });

    setActiveIndex(closestIdx);
  };

  const scrollToCard = useCallback((index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>("[data-card]");
    const target = cards[index];
    if (target) {
      const left = target.offsetLeft - (el.clientWidth / 2 - target.offsetWidth / 2);
      el.scrollTo({ left, behavior: "smooth" });
    }
  }, []);

  const scrollByDir = useCallback(
    (dir: "left" | "right") => {
      const next =
        dir === "left"
          ? (activeIndex - 1 + RYF_NEWS.length) % RYF_NEWS.length
          : (activeIndex + 1) % RYF_NEWS.length;
      setActiveIndex(next);
      scrollToCard(next);
    },
    [activeIndex, scrollToCard],
  );

  const autoNext = useCallback(() => {
    const next = (activeIndex + 1) % RYF_NEWS.length;
    setActiveIndex(next);
    scrollToCard(next);
  }, [activeIndex, scrollToCard]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(autoNext, AUTO_STEP);
    return () => clearInterval(timer);
  }, [isPaused, autoNext]);

  return (
    <section
      id="actualites"
      className="relative py-16 bg-white border-b border-border/60 pt-[54px] pb-[54px] overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground tracking-tight uppercase">
            ACTUALITÉS
          </h2>
        </div>

        {/* Horizontal auto-scrolling row avec effet center focus */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Previous button */}
          <button
            type="button"
            onClick={() => scrollByDir("left")}
            aria-label="Actualités précédentes"
            className="hidden md:flex absolute -left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 items-center justify-center bg-white border border-border shadow-lg text-primary hover:bg-primary hover:text-white transition-all"
            style={{ borderRadius: "50px" }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Scroller */}
          <div
            ref={scrollerRef}
            onScroll={handleScroll}
            className="flex items-center justify-start sm:justify-center gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-6 px-[10vw] sm:px-4 md:px-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] text-left"
          >
            {RYF_NEWS.map((article, idx) => {
              const isCenter = idx === activeIndex;
              const isRevealed = clickedCardId === article.id;

              return (
                <article
                  key={article.id}
                  data-card
                  onClick={() => {
                    // Clic sur la carte : révèle la mention À LA UNE et centre l'élément
                    setClickedCardId((prev) => (prev === article.id ? null : article.id));
                    setActiveIndex(idx);
                    scrollToCard(idx);
                  }}
                  className={`group relative bg-white border cursor-pointer snap-center shrink-0 w-[80vw] sm:w-[300px] md:w-[330px] flex flex-col transition-all duration-500 ${
                    isCenter
                      ? "scale-100 sm:scale-105 z-20 shadow-2xl border-primary ring-2 ring-primary/40 -translate-y-1"
                      : "scale-90 sm:scale-95 z-10 shadow-md border-border/80 opacity-90 hover:opacity-100"
                  }`}
                  style={{ borderRadius: "0px" }}
                >
                  {/* Mention À LA UNE : juste le texte visible (pas dans un span/badge pill) */}
                  <div className="px-4 pt-3 pb-1 flex items-center justify-between text-xs font-black uppercase tracking-wider">
                    {/* Apparaît lorsqu'on clique sur l'image / carte ou si au centre */}
                    <span
                      className={`text-red-600 transition-opacity duration-300 ${
                        isRevealed || isCenter ? "opacity-100 font-extrabold" : "opacity-0"
                      }`}
                    >
                      À LA UNE
                    </span>
                    <span className="text-[11px] font-semibold text-muted-foreground">
                      {article.category}
                    </span>
                  </div>

                  {/* Image carrée (bordures droites), nette, avec zoom au survol */}
                  <div
                    className="relative aspect-video overflow-hidden bg-slate-900 border-y border-border/40"
                    style={{ borderRadius: "0px" }}
                  >
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ borderRadius: "0px" }}
                    />
                    {/* Petit rappel indicatif au clic */}
                    {!isRevealed && !isCenter && (
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                    )}
                  </div>

                  {/* Contenu bref : titre et description courte */}
                  <div className="p-4 sm:p-5 flex flex-col flex-1">
                    <h3 className="text-sm font-black text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2 uppercase mb-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed flex-1 line-clamp-2">
                      {article.summary}
                    </p>

                    {/* Redirection vers la page dédiée d'actualités */}
                    <Link
                      to="/actualites"
                      search={{ id: article.id }}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="mt-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-primary hover:text-primary/80 hover:gap-3 transition-all self-start border-b border-primary/40 pb-0.5"
                    >
                      <span>LIRE L’ARTICLE</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Next button */}
          <button
            type="button"
            onClick={() => scrollByDir("right")}
            aria-label="Actualités suivantes"
            className="hidden md:flex absolute -right-3 lg:-right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 items-center justify-center bg-white border border-border shadow-lg text-primary hover:bg-primary hover:text-white transition-all"
            style={{ borderRadius: "50px" }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};
