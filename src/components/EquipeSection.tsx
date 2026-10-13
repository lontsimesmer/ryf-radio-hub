import React, { useState, useEffect } from "react";
import { RYF_ASSETS } from "@/lib/ryf-data";
import { RYF_TEAM_MEMBERS } from "@/lib/team-data";
import { ChevronRight, ChevronLeft, Mic, UserCheck, Calendar } from "lucide-react";

export const EquipeSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isFading, setIsFading] = useState(false);

  // Transition automatique fluide avec anticipation transparente
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 4000);

    const switchTimer = setTimeout(() => {
      setActiveIdx((prev) => (prev + 1) % RYF_TEAM_MEMBERS.length);
      setIsFading(false);
    }, 5000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(switchTimer);
    };
  }, [activeIdx]);

  const nextMember = () => {
    setIsFading(false);
    setActiveIdx((prev) => (prev + 1) % RYF_TEAM_MEMBERS.length);
  };

  const prevMember = () => {
    setIsFading(false);
    setActiveIdx((prev) => (prev - 1 + RYF_TEAM_MEMBERS.length) % RYF_TEAM_MEMBERS.length);
  };

  const currentMember = RYF_TEAM_MEMBERS[activeIdx];
  const nextPreview = RYF_TEAM_MEMBERS[(activeIdx + 1) % RYF_TEAM_MEMBERS.length];

  if (!currentMember) return null;

  return (
    <section
      id="equipe"
      className="py-10 sm:py-14 bg-white text-foreground border-b border-border/70 relative"
      style={{ borderRadius: "0px" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground tracking-tight uppercase">
            NOTRE <span className="text-primary">ÉQUIPE</span>
          </h2>
        </div>

        {/* CEO Spotlight - Cadre royal haut de gamme avec découpe au-dessus des chaussettes */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-14 mb-10 sm:mb-12">
          {/* Portrait Image with royal luxury frame */}
          <div className="relative group shrink-0">
            {/* Cadre or royal & platine : bordures superposées, angles droits */}
            <div
              className="relative p-2.5 sm:p-3 bg-gradient-to-tr from-amber-600/40 via-slate-100 to-amber-500/40 shadow-2xl border-2 border-amber-600/60"
              style={{ borderRadius: "0px" }}
            >
              {/* Filet doré intérieur royal */}
              <div
                className="p-1.5 border border-amber-500/50 bg-slate-950 shadow-inner"
                style={{ borderRadius: "0px" }}
              >
                {/* Conteneur image : taille rognée nette au-dessus des chaussettes */}
                <div
                  className="relative overflow-hidden w-[280px] sm:w-[320px] md:w-[340px] h-[390px] sm:h-[440px] md:h-[460px] bg-slate-950"
                  style={{ borderRadius: "0px" }}
                >
                  <img
                    src={RYF_ASSETS.img5Ceo}
                    alt="Eric TCHATAT - CEO & Founder RYF Radio"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    style={{
                      borderRadius: "0px",
                      objectPosition: "center 15%",
                    }}
                  />

                  {/* Dégradé discret pour sublimer le costume */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-amber-950/10 pointer-events-none" />
                </div>
              </div>

              {/* Nouveau SVG Diplôme officiel en haut à droite */}
              <div
                aria-hidden="true"
                className="absolute -top-4 -right-4 z-20 w-11 h-11 flex items-center justify-center bg-white shadow-xl border-2 border-amber-600/80 backdrop-blur-xs p-1.5"
                style={{ borderRadius: "0px" }}
                title="Diplôme et distinction"
              >
                <img
                  src="https://vibe.filesafe.space/1791205471365853905/attachments/f2405c21-2670-4b47-a8ac-9252ffeeacb7.png"
                  alt="Diplôme"
                  className="w-full h-full object-contain filter drop-shadow-sm brightness-90 hover:brightness-100 transition-all"
                />
              </div>

              {/* Médaille royale en bas à gauche */}
              <div
                aria-hidden="true"
                className="absolute -bottom-4 -left-4 z-20 w-11 h-11 flex items-center justify-center bg-white shadow-xl border-2 border-amber-600/80 backdrop-blur-xs text-amber-600 p-2"
                style={{ borderRadius: "0px" }}
                title="Mérite et distinction royale"
              >
                <svg
                  className="w-full h-full filter drop-shadow-xs"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <circle cx="12" cy="8" r="6" fill="#d97706" />
                  <circle cx="12" cy="8" r="4" fill="#fbbf24" />
                  <path d="M15.477 12.89 18 22l-6-3-6 3 2.523-9.11" fill="#b45309" />
                </svg>
              </div>

              {/* Coins d'ornement royaux dorés */}
              <div className="pointer-events-none absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-amber-500" />
              <div className="pointer-events-none absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-amber-500" />
              <div className="pointer-events-none absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-amber-500" />
              <div className="pointer-events-none absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-amber-500" />
            </div>
          </div>

          {/* CEO Details */}
          <div className="text-center sm:text-left space-y-2">
            <h3
              className="text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-wide"
              style={{
                fontFamily: "Georgia, 'Times New Roman', 'Playfair Display', serif",
                fontStyle: "italic",
              }}
            >
              Eric TCHATAT
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-primary tracking-widest uppercase">
              CEO-FOUNDER
            </p>
          </div>
        </div>

        {/* Mini-page interactive : alternance Collaborateurs & Animateurs (taille de conteneur réduite et soignée) */}
        <div
          className="max-w-3xl mx-auto pt-6 border-t border-border/70"
          style={{ borderRadius: "0px" }}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-primary flex items-center gap-1.5">
                <span>COLLABORATEURS & ANIMATEURS</span>
              </h4>
              <p className="text-xs sm:text-sm font-bold text-foreground">
                Découvrez les visages et les voix de RYF Radio
              </p>
            </div>
            {/* Boutons de navigation */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={prevMember}
                aria-label="Membre précédent"
                className="w-8 h-8 border border-border bg-card hover:bg-secondary flex items-center justify-center text-foreground transition-all shadow-xs"
                style={{ borderRadius: "0px" }}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextMember}
                aria-label="Membre suivant"
                className="w-8 h-8 border border-border bg-card hover:bg-secondary flex items-center justify-center text-foreground transition-all shadow-xs"
                style={{ borderRadius: "0px" }}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mini-page container : plus compact, cliquable avec aperçu en transparence */}
          <div
            onClick={nextMember}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") nextMember();
            }}
            aria-label="Cliquer pour afficher le membre suivant"
            className="group relative cursor-pointer bg-slate-50 hover:bg-slate-100/90 border border-border/80 p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-700 overflow-hidden"
            style={{ borderRadius: "0px" }}
          >
            {/* Compteur dynamique en position fixe haute, hors de la transition */}
            <span className="absolute top-2 right-3 z-30 text-[10px] font-semibold text-muted-foreground tabular-nums">
              {activeIdx + 1} / {RYF_TEAM_MEMBERS.length}
            </span>
            {/* Aperçu en fond du membre suivant */}
            <div className="absolute top-0 right-0 bottom-0 w-1/4 opacity-10 pointer-events-none overflow-hidden blur-[1px]">
              <img
                src={nextPreview?.imageUrl}
                alt=""
                className="w-full h-full object-cover"
                style={{
                  objectPosition: nextPreview?.cropPosition || "center",
                }}
              />
            </div>

            {/* Contenu principal de la mini-page */}
            <div
              className={`grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-5 items-start transition-opacity duration-700 ${
                isFading ? "opacity-50" : "opacity-100"
              }`}
            >
              {/* Photo rognée avec conteneur compact */}
              <div className="sm:col-span-4 flex justify-start sm:justify-end">
                <div
                  className="relative w-32 sm:w-36 md:w-40 h-40 sm:h-44 md:h-48 overflow-hidden shadow-sm border border-border bg-white shrink-0"
                  style={{ borderRadius: "0px" }}
                >
                  <img
                    src={currentMember.imageUrl}
                    alt={currentMember.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{
                      borderRadius: "0px",
                      objectPosition: currentMember.cropPosition || "center 20%",
                    }}
                  />
                  {/* Badge type : Collaborateur ou Animateur */}
                  <span
                    className={`absolute bottom-0 left-0 right-0 py-0.5 text-center text-[9px] font-black uppercase tracking-wider text-white ${
                      currentMember.type === "animateur" ? "bg-primary" : "bg-ryf-navy"
                    }`}
                  >
                    {currentMember.type === "animateur" ? "Animateur Radio" : "Collaborateur"}
                  </span>
                </div>
              </div>

              {/* Infos : Rôle, émission, horaires et bio */}
              <div className="sm:col-span-8 space-y-1.5 text-left min-h-[210px] self-end">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase text-primary tracking-wider">
                    {currentMember.type === "animateur" ? (
                      <>
                        <Mic className="w-3 h-3 text-primary" />
                        <span>Antenne & Émission</span>
                      </>
                    ) : (
                      <>
                        <UserCheck className="w-3 h-3 text-ryf-navy" />
                        <span>Réseau & Correspondance</span>
                      </>
                    )}
                  </span>
                </div>

                <h5 className="text-lg sm:text-xl font-black text-foreground">
                  {currentMember.name}
                </h5>

                <p className="text-xs sm:text-sm font-bold text-primary">{currentMember.role}</p>

                {/* Si émission et grille horaire */}
                {currentMember.schedule && (
                  <div className="flex items-start gap-1.5 text-[11px] font-semibold text-ryf-navy bg-white/80 border border-border px-2 py-1">
                    <Calendar className="w-3.5 h-3.5 shrink-0 mt-0.5 text-primary" />
                    <span>{currentMember.schedule}</span>
                  </div>
                )}

                {currentMember.bio && (
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {currentMember.bio}
                  </p>
                )}

                {/* Dots indicator compact */}
                <div className="pt-2 flex items-center gap-1">
                  {RYF_TEAM_MEMBERS.map((m, idx) => (
                    <span
                      key={m.id}
                      className={`h-1 transition-all duration-300 ${
                        idx === activeIdx ? "w-5 bg-primary" : "w-1 bg-border"
                      }`}
                      style={{ borderRadius: "0px" }}
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
