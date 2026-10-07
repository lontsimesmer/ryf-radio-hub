import React, { useRef, useState, useEffect, useCallback } from "react";
import { RYF_AGENDA } from "@/lib/ryf-data";
import { Calendar as CalendarIcon, Clock, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

export const NewsAndAgendaSection: React.FC = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const scroll = (dir: "left" | "right") => {
    if (!scrollerRef.current) return;
    const offset = 340;
    scrollerRef.current.scrollBy({
      left: dir === "left" ? -offset : offset,
      behavior: "smooth",
    });
  };

  const autoNext = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      el.scrollBy({ left: 340, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(autoNext, 4000);
    return () => clearInterval(timer);
  }, [isPaused, autoNext]);

  return (
    <section id="agenda" className="py-16 bg-slate-50 border-b border-border/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight uppercase">
            AGENDA CULTUREL
          </h2>
        </div>

        {/* Horizontal auto-rotating banners */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Événement précédent"
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-white border border-border shadow-lg text-primary hover:bg-primary hover:text-white transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            ref={scrollerRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {RYF_AGENDA.map((evt, idx) => (
              <article
                key={`${evt.id}-${idx}`}
                className="group relative bg-white rounded-2xl border border-border shadow-md hover:shadow-xl hover:border-primary/40 transition-all duration-300 overflow-hidden snap-start shrink-0 w-[88vw] sm:w-[350px] flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={evt.imageUrl}
                      alt={evt.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/75 text-white text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-xs">
                      {evt.tag}
                    </span>
                    <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-primary text-white text-[11px] font-bold flex items-center gap-1 shadow-sm">
                      <MapPin className="w-3 h-3 text-accent" />
                      {evt.city}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs font-bold text-primary mb-2">
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="w-3.5 h-3.5" />
                        {evt.date}
                      </span>
                      <span>•</span>
                      <span className="text-muted-foreground flex items-center gap-1 font-semibold">
                        <Clock className="w-3.5 h-3.5" />
                        {evt.time}
                      </span>
                    </div>

                    <h3 className="text-base font-black text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                      {evt.title}
                    </h3>

                    <div className="mt-1 text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span className="truncate">
                        {evt.location}, {evt.city}
                      </span>
                    </div>

                    <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {evt.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button className="w-full py-2.5 rounded-xl border border-primary/20 text-primary font-bold text-xs hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-1.5">
                    <span>En savoir plus</span>
                  </button>
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Événement suivant"
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-white border border-border shadow-lg text-primary hover:bg-primary hover:text-white transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};
