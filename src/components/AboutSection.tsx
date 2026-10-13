import React, { useRef, useState, useEffect, useCallback } from "react";
import { RYF_ABOUT_RUBRIQUES, RYF_ASSETS } from "@/lib/ryf-data";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const AboutSection: React.FC = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const scroll = (direction: "left" | "right") => {
    if (!scrollerRef.current) return;
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const offset = isMobile ? window.innerWidth * 0.9 : 340;
    scrollerRef.current.scrollBy({
      left: direction === "left" ? -offset : offset,
      behavior: "smooth",
    });
  };

  const autoScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const offset = isMobile ? window.innerWidth * 0.9 : 340;
    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      el.scrollBy({ left: offset, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(autoScroll, 4500);
    return () => clearInterval(interval);
  }, [isPaused, autoScroll]);

  return (
    <section id="a-propos" className="relative py-16 sm:py-20 overflow-hidden text-white">
      {/* Background with user official visual: subtle dark gradient overlay for optimal readability */}
      <div className="absolute inset-0 z-0">
        <img
          src={RYF_ASSETS.img1HeroComm}
          alt="À propos de RYF Radio"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-slate-950/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-slate-950/65 to-slate-950/85" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight uppercase drop-shadow-lg">
            À <span className="text-primary">PROPOS</span>
          </h2>
        </div>

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
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center bg-slate-900/80 border border-white/20 text-white hover:bg-primary hover:border-primary transition-all shadow-xl backdrop-blur-md cursor-pointer"
            style={{ borderRadius: "50px" }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            ref={scrollerRef}
            className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 pb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {RYF_ABOUT_RUBRIQUES.map((card) => {
              return (
                <Link
                  key={card.id}
                  to="/a-propos"
                  search={{ section: card.id }}
                  className="group relative shrink-0 w-[88vw] sm:w-[320px] md:w-[340px] h-[400px] overflow-hidden cursor-pointer snap-center sm:snap-start transition-all duration-500 border border-white/20 hover:border-accent hover:shadow-2xl hover:-translate-y-1.5 flex flex-col justify-end"
                  style={{ borderRadius: "0px" }}
                >
                  {/* Card Background image */}
                  <img
                    src={card.bgImage}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ borderRadius: "0px" }}
                  />

                  {/* Dark overlays: default and on hover */}
                  <div className="absolute inset-0 bg-slate-950/50 group-hover:bg-slate-950/75 transition-colors duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  {/* Redirection indicator (top right) - pops on hover */}
                  <div className="absolute top-4 right-4 z-20 w-9 h-9 bg-white/10 group-hover:bg-accent group-hover:text-slate-950 text-white flex items-center justify-center transition-all duration-300 shadow-md">
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>

                  {/* Card Content:
                      - Le titre est d'abord visible
                      - Lorsqu'on place le curseur (hover), la petite description apparaît
                      - Redirection avec l'icône
                  */}
                  <div className="relative z-10 p-6 flex flex-col justify-end">
                    {/* Titre : toujours visible en bas */}
                    <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight group-hover:text-accent transition-colors duration-300 leading-snug drop-shadow-md">
                      {card.title}
                    </h3>

                    {/* Petite description : apparaît au hover (sur mobile visible ou au tap) */}
                    <div className="max-h-0 opacity-0 group-hover:max-h-36 group-hover:opacity-100 group-focus:max-h-36 group-focus:opacity-100 transition-all duration-500 ease-in-out overflow-hidden">
                      <p className="mt-3 text-xs sm:text-sm text-white/95 leading-relaxed border-t border-white/20 pt-3 line-clamp-3">
                        {card.shortHover}
                      </p>

                      <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-accent group-hover:underline">
                        <span>Découvrir</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Faire défiler vers la droite"
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center bg-slate-900/80 border border-white/20 text-white hover:bg-primary hover:border-primary transition-all shadow-xl backdrop-blur-md cursor-pointer"
            style={{ borderRadius: "50px" }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};
