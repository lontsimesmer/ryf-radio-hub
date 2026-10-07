import React, { useState, useEffect } from "react";
import { RYF_ASSETS } from "@/lib/ryf-data";
import { ChevronRight, ChevronLeft, Sparkles } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

const OTHER_MEMBERS: TeamMember[] = [
  {
    id: "member-1",
    name: "Dr. Nadia B.",
    role: "Chronique Santé & Bien-être",
    bio: "Spécialiste du bien-être et de la santé naturelle, elle anime des chroniques inspirantes consacrées à l'équilibre et au mode de vie au quotidien.",
    imageUrl: RYF_ASSETS.teamMember1,
  },
  {
    id: "member-2",
    name: "Alexandre V.",
    role: "Animateur Talk & Culture Urbaine",
    bio: "Voix dynamique de l'antenne, il décrypte les tendances émergentes, les hits afrobeats et les cultures urbaines avec passion et franchise.",
    imageUrl: RYF_ASSETS.teamMember2,
  },
  {
    id: "member-3",
    name: "Brice Laurent",
    role: "Journaliste & Production Antenne",
    bio: "Journaliste de terrain et producteur, il coordonne les flashs infos, les reportages culturels et les grands rendez-vous de direct.",
    imageUrl: RYF_ASSETS.teamMember3,
  },
  {
    id: "member-4",
    name: "DJ Fox & Mix Master",
    role: "Directeur Musical & Sets Live",
    bio: "Virtuose des platines, créateur des playlists exclusives RYF Radio et maestro des nuits afro-electro et rythmes d'Afrique.",
    imageUrl: RYF_ASSETS.teamMember4,
  },
];

export const EquipeSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isFading, setIsFading] = useState(false);

  // Auto transition with subtle transparency anticipation
  useEffect(() => {
    // Anticipate transition by making slightly transparent after 3.2s
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 3400);

    // Switch to next slide at 4.5s
    const switchTimer = setTimeout(() => {
      setActiveIdx((prev) => (prev + 1) % OTHER_MEMBERS.length);
      setIsFading(false);
    }, 4500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(switchTimer);
    };
  }, [activeIdx]);

  const nextMember = () => {
    setIsFading(false);
    setActiveIdx((prev) => (prev + 1) % OTHER_MEMBERS.length);
  };

  const prevMember = () => {
    setIsFading(false);
    setActiveIdx((prev) => (prev - 1 + OTHER_MEMBERS.length) % OTHER_MEMBERS.length);
  };

  const currentMember = OTHER_MEMBERS[activeIdx];
  const nextPreview = OTHER_MEMBERS[(activeIdx + 1) % OTHER_MEMBERS.length];

  return (
    <section
      id="equipe"
      className="py-16 sm:py-20 bg-white text-foreground border-b border-border/70 relative pt-[54px] pb-[54px]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight uppercase">
            NOTRE ÉQUIPE
          </h2>
        </div>

        {/* CEO Spotlight - Clean, unbordered, no dark card/pill/tags */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 sm:mb-20">
          {/* CEO Photo (left) */}
          <div className="md:col-span-5 flex justify-center md:justify-start">
            <img
              src={RYF_ASSETS.img5Ceo}
              alt="Eric TCHATAT - CEO & Founder RYF Radio"
              className="w-full max-w-[340px] sm:max-w-[380px] h-auto object-cover rounded-2xl shadow-xl"
            />
          </div>

          {/* CEO Details (right) */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tight">
                Eric TCHATAT
              </h3>
              <p className="text-base sm:text-lg font-bold text-primary mt-1 tracking-wider uppercase">
                CEO-FOUNDER
              </p>
            </div>
          </div>
        </div>

        {/* Mini-page interactive des autres membres de l'équipe */}
        <div className="max-w-4xl mx-auto pt-8 border-t border-border/70">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-primary">
                COLLABORATEURS & ANIMATEURS
              </h4>
              <p className="text-sm font-bold text-foreground">
                Découvrez les autres visages et voix qui font vivre RYF Radio
              </p>
            </div>
            {/* Direct navigation buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevMember}
                aria-label="Membre précédent"
                className="w-9 h-9 rounded-full border border-border bg-card hover:bg-secondary flex items-center justify-center text-foreground transition-all shadow-xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextMember}
                aria-label="Membre suivant"
                className="w-9 h-9 rounded-full border border-border bg-card hover:bg-secondary flex items-center justify-center text-foreground transition-all shadow-xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mini-page container with click to advance and subtle auto-transparency */}
          <div
            onClick={nextMember}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") nextMember();
            }}
            aria-label="Cliquer pour afficher le membre suivant de l'équipe"
            className="group relative cursor-pointer bg-slate-50 hover:bg-slate-100/90 rounded-2xl border border-border/80 p-5 sm:p-7 shadow-md hover:shadow-xl transition-all duration-700 overflow-hidden"
          >
            {/* Background peek of the next member for the layered mini-page effect */}
            <div className="absolute top-0 right-0 bottom-0 w-1/3 opacity-10 pointer-events-none overflow-hidden blur-[1px]">
              <img
                src={nextPreview.imageUrl}
                alt=""
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Current mini-page content with transparency transition */}
            <div
              className={`grid grid-cols-1 sm:grid-cols-12 gap-6 items-center transition-opacity duration-700 ${
                isFading ? "opacity-50" : "opacity-100"
              }`}
            >
              {/* Photo */}
              <div className="sm:col-span-4 flex justify-center sm:justify-start">
                <div className="relative w-40 sm:w-full aspect-square sm:aspect-[4/5] rounded-xl overflow-hidden shadow-lg border border-border bg-white">
                  <img
                    src={currentMember.imageUrl}
                    alt={currentMember.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Bio & Role */}
              <div className="sm:col-span-8 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-primary tracking-wider">
                    ÉQUIPE RYF RADIO
                  </span>
                  <span className="text-[11px] font-semibold text-muted-foreground">
                    {activeIdx + 1} / {OTHER_MEMBERS.length} • Cliquez pour défiler →
                  </span>
                </div>
                <h5 className="text-xl sm:text-2xl font-black text-foreground">
                  {currentMember.name}
                </h5>
                <p className="text-xs sm:text-sm font-bold text-primary">{currentMember.role}</p>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {currentMember.bio}
                </p>

                {/* Dots indicator */}
                <div className="pt-3 flex items-center gap-1.5">
                  {OTHER_MEMBERS.map((m, idx) => (
                    <span
                      key={m.id}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === activeIdx ? "w-6 bg-primary" : "w-1.5 bg-border"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
