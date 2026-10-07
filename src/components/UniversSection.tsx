import React, { useRef, useState, useEffect, useCallback } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { RYF_NEWS } from "@/lib/ryf-data";

const AUTO_STEP = 4200; // soft auto-advance delay (ms)

export const UniversSection: React.FC = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const featured = RYF_NEWS[0];
  const latest = RYF_NEWS.slice(1);

  const stepWidth = () => {
    const el = scrollerRef.current;
    if (!el) return 320;
    const first = el.querySelector<HTMLElement>("[data-card]");
    return first ? first.offsetWidth + 20 : el.clientWidth * 0.8;
  };

  const scrollByDir = useCallback((dir: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = stepWidth();
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  }, []);

  const autoNext = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = stepWidth();
    // loop back to start when reaching the end
    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 8) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      el.scrollBy({ left: amount, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(autoNext, AUTO_STEP);
    return () => clearInterval(timer);
  }, [isPaused, autoNext]);

  return (
    <section
      id="actualites"
      className="py-16 bg-gradient-to-b from-white via-slate-50/60 to-white border-b border-border/60 pt-[54px] pb-[54px]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground tracking-tight">
            ACTUALITÉS
          </h2>
        </div>

        {/* Horizontal auto-scrolling row — À LA UNE + DERNIÈRES PUBLICATIONS sur la même ligne */}
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
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-card border border-border shadow-lg text-primary hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Scroller */}
          <div
            ref={scrollerRef}
            className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 md:pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {/* À LA UNE — même format que les dernières publications */}
            <article
              data-card
              className="group relative bg-card rounded-2xl border border-border shadow-md hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/40 transition-all duration-500 overflow-hidden snap-start shrink-0 w-[88vw] sm:w-[290px] flex flex-col hover:-translate-y-1"
            >
              <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-extrabold uppercase tracking-widest shadow-sm">
                À LA UNE
              </span>
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={featured.imageUrl}
                  alt={featured.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-2">
                  {featured.summary}
                </p>
                <button className="mt-4 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-primary hover:gap-3 transition-all self-start">
                  <span>LIRE L’ARTICLE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>

            {/* NOS DERNIÈRES PUBLICATIONS */}
            {latest.map((article) => (
              <article
                key={article.id}
                data-card
                className="group relative bg-card rounded-2xl border border-border shadow-md hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/40 transition-all duration-500 overflow-hidden snap-start shrink-0 w-[88vw] sm:w-[290px] flex flex-col hover:-translate-y-1"
              >
                <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-secondary text-primary text-[10px] font-extrabold uppercase tracking-widest shadow-sm">
                  DERNIÈRE PUBLICATION
                </span>
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-2">
                    {article.summary}
                  </p>
                  <button className="mt-4 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-primary hover:gap-3 transition-all self-start">
                    <span>LIRE L’ARTICLE</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Next button */}
          <button
            type="button"
            onClick={() => scrollByDir("right")}
            aria-label="Actualités suivantes"
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-card border border-border shadow-lg text-primary hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};
