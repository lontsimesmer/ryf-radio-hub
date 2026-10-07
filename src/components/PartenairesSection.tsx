import React from "react";

export const PartenairesSection: React.FC = () => {
  // Logos officiels des partenaires fournis par l'utilisateur
  const partnerLogos = [
    {
      id: "p3",
      name: "RYF Radio",
      logo: "https://vibe.filesafe.space/1791205471365853905/attachments/9cf1c7eb-c291-4b1c-b6e6-fbecda5c90c2.png",
    },
    {
      id: "p4",
      name: "VV Group",
      logo: "https://vibe.filesafe.space/1791205471365853905/attachments/d0f55d4b-c56a-45d8-a7ba-d136a8c7253d.png",
    },
  ];

  return (
    <section id="partenaires" className="py-8 bg-white overflow-hidden pb-0 pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6 text-center">
        <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight uppercase">
          NOS PARTENAIRES
        </h2>
      </div>

      {/* Logos affichés statiquement, centrés */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-12 sm:gap-24 py-4 pt-0 pb-0">
          {partnerLogos.map((partner) => (
            <div
              key={partner.id}
              className="group relative flex items-center justify-center p-5 sm:p-7 rounded-2xl bg-slate-50/70 border border-border/60 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1 hover:bg-white"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src={partner.logo}
                alt={partner.name}
                loading="lazy"
                className="relative max-h-20 sm:max-h-28 w-auto object-contain transition-transform duration-500 group-hover:scale-115 drop-shadow-sm"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
