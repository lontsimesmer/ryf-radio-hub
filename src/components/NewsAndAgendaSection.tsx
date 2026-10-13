import React, { useRef, useState, useEffect, useCallback } from "react";
import { RYF_AGENDA } from "@/lib/ryf-data";
import { Calendar as CalendarIcon, Clock, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

const AUTO_STEP = 4500; // soft auto-advance delay (ms)

export const NewsAndAgendaSection: React.FC = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0); // carte centrée / focus

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
          ? (activeIndex - 1 + RYF_AGENDA.length) % RYF_AGENDA.length
          : (activeIndex + 1) % RYF_AGENDA.length;
      setActiveIndex(next);
      scrollToCard(next);
    },
    [activeIndex, scrollToCard],
  );

  const autoNext = useCallback(() => {
    const next = (activeIndex + 1) % RYF_AGENDA.length;
    setActiveIndex(next);
    scrollToCard(next);
  }, [activeIndex, scrollToCard]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(autoNext, AUTO_STEP);
    return () => clearInterval(timer);
  }, [isPaused, autoNext]);

  return (
    <section id="agenda" className="py-16 bg-slate-50 border-b border-border/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground tracking-tight uppercase">
            AGENDA <span className="text-primary">CULTUREL</span>
          </h2>
        </div>

        {/* Bannières d'agenda avec effet center focus + défilement auto */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button
            type="button"
            onClick={() => scrollByDir("left")}
            aria-label="Événement précédent"
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center bg-white border border-border shadow-lg text-primary hover:bg-primary hover:text-white transition-all rounded-full"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            ref={scrollerRef}
            onScroll={handleScroll}
            className="flex items-stretch justify-start sm:justify-center gap-4 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-6 px-4 md:px-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] text-left"
          >
            {RYF_AGENDA.map((evt, idx) => {
              const isCenter = idx === activeIndex;
              return (
                <article
                  key={evt.id}
                  data-card
                  className={`group relative bg-white border shadow-md transition-all duration-500 overflow-hidden snap-start shrink-0 w-[80vw] xs:w-[280px] sm:w-[330px] md:w-[350px] flex flex-col justify-between ${
                    isCenter
                      ? "scale-100 sm:scale-105 md:scale-110 z-20 shadow-2xl border-primary ring-2 ring-primary/40 -translate-y-1"
                      : "scale-95 sm:scale-100 z-10 shadow-md border-border/80 opacity-90 hover:opacity-100"
                  }`}
                  style={{ borderRadius: "0px" }}
                >
                  <div>
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={evt.imageUrl}
                        alt={evt.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Tag visible uniquement au survol de l'image */}
                      <span className="absolute top-3 left-3 px-2.5 py-1 bg-black/75 text-white text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {evt.tag}
                      </span>
                    </div>

                    <div className="p-4 sm:p-5">
                      <div className="flex items-center gap-2.5 sm:gap-3 text-xs font-bold text-primary mb-2">
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="w-3.5 h-3.5" />
                          {evt.date}
                        </span>
                        <span className="text-muted-foreground flex items-center gap-1 font-semibold">
                          <Clock className="w-3.5 h-3.5" />
                          {evt.time}
                        </span>
                      </div>

                      <h3 className="text-sm sm:text-base font-black text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                        {evt.title}
                      </h3>

                      <div className="mt-1 text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span className="truncate">{evt.location}</span>
                      </div>

                      <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed line-clamp-3">
                        {evt.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 pt-0">
                    <div
                      className="w-full py-2.5 border border-primary/20 text-primary font-bold text-xs flex items-center justify-center gap-1.5 bg-slate-50/60"
                      style={{ borderRadius: "0px" }}
                    >
                      <span>En savoir plus</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => scrollByDir("right")}
            aria-label="Événement suivant"
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center bg-white border border-border shadow-lg text-primary hover:bg-primary hover:text-white transition-all rounded-full"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};
