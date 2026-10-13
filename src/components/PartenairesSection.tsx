import React, { useRef, useState, useEffect, useCallback } from "react";

export const PartenairesSection: React.FC = () => {
  // Logos officiels des partenaires fournis par l'utilisateur
  const partnerLogos = [
    {
      id: "p-masa",
      name: "MASA",
      logo: "https://vibe.filesafe.space/1791205471365853905/attachments/5821a5f4-97b3-4a73-aba0-59accb50c472.jpg",
    },
    {
      id: "p-chouquette",
      name: "Chouquette by Osiera",
      logo: "https://vibe.filesafe.space/1791205471365853905/attachments/857fb353-b670-43db-88c2-acf405e8e9c7.jpg",
    },
    {
      id: "p-radioking",
      name: "RadioKing",
      logo: "https://vibe.filesafe.space/1791205471365853905/attachments/e3dc9779-20f8-4460-b8ce-89a5d0c85f29.jpg",
    },
    {
      id: "p-ryf",
      name: "RYF Radio",
      logo: "https://vibe.filesafe.space/1791205471365853905/attachments/9cf1c7eb-c291-4b1c-b6e6-fbecda5c90c2.png",
    },
    {
      id: "p-vvgroup",
      name: "VV Group",
      logo: "https://vibe.filesafe.space/1791205471365853905/attachments/707ded96-2154-4c6d-b161-5649991cf71c.png",
    },
  ];

  // Duplication pour défilement continu infini
  const extendedLogos = [...partnerLogos, ...partnerLogos, ...partnerLogos];

  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Défilement automatique continu fluide
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let animId: number;
    const speed = 0.8; // px par frame

    const step = () => {
      if (!isPaused && el) {
        el.scrollLeft += speed;
        // Rebouclage invisible au tiers de la largeur totale
        if (el.scrollLeft >= el.scrollWidth / 3) {
          el.scrollLeft = 0;
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animId);
  }, [isPaused]);

  return (
    <section id="partenaires" className="py-8 bg-white overflow-hidden pb-0 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground tracking-tight uppercase">
          NOS <span className="text-primary">PARTENAIRES</span>
        </h2>
      </div>

      {/* Défilement horizontal automatique sans cadre, uniquement les logos à leur taille normale */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Dégradés latéraux doux */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent z-10" />

        <div
          ref={scrollerRef}
          className="flex items-center gap-12 sm:gap-20 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-3 px-4"
        >
          {extendedLogos.map((partner, idx) => (
            <div
              key={`${partner.id}-${idx}`}
              className="shrink-0 flex items-center justify-center transition-transform duration-300 hover:scale-105"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                loading="lazy"
                className="h-12 sm:h-16 md:h-18 w-auto max-w-[150px] sm:max-w-[190px] object-contain transition-opacity duration-300 opacity-90 hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
