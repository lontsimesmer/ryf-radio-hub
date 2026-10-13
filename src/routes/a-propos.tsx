import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { FooterAndModals } from "@/components/FooterAndModals";
import { RYF_ABOUT_RUBRIQUES, RYF_ASSETS } from "@/lib/ryf-data";
import { ArrowLeft, CheckCircle2, Radio } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

const searchSchema = z.object({
  section: z.string().optional(),
});

export const Route = createFileRoute("/a-propos")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      {
        title: "À Propos de RYF Radio | Concept, Missions, Offres & Réalisations",
      },
      {
        name: "description",
        content:
          "Découvrez l'histoire, le concept, les missions, les offres médias et les cibles de RYF Radio. Une plateforme digitale panafricaine au cœur de la culture et du divertissement.",
      },
      {
        property: "og:title",
        content: "À Propos de RYF Radio | Le Top du Divertissement",
      },
      {
        property: "og:description",
        content:
          "Une plateforme digitale au cœur de la culture africaine : concept, missions, offres médias et rayonnement.",
      },
      {
        property: "og:image",
        content: RYF_ASSETS.aboutImg1Concept,
      },
      {
        property: "og:type",
        content: "article",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:image",
        content: RYF_ASSETS.aboutImg1Concept,
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { section: initialSection } = Route.useSearch();
  const [activeTab, setActiveTab] = useState<string>(
    initialSection && RYF_ABOUT_RUBRIQUES.some((r) => r.id === initialSection)
      ? initialSection
      : RYF_ABOUT_RUBRIQUES[0].id,
  );

  const selectedRubrique =
    RYF_ABOUT_RUBRIQUES.find((r) => r.id === activeTab) || RYF_ABOUT_RUBRIQUES[0];

  return (
    <div className="min-h-screen max-w-full overflow-x-clip bg-white text-foreground flex flex-col">
      <Header />

      <main className="flex-1 pb-24 sm:pb-32">
        {/* Hero Banner de la page À Propos */}
        <section className="relative bg-slate-950 text-white py-16 sm:py-24 border-b border-border/40 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={RYF_ASSETS.aboutImg1Concept}
              alt="RYF Radio À Propos"
              className="w-full h-full object-cover opacity-20 filter blur-xs"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour à l'accueil</span>
            </Link>

            <div className="flex items-center gap-2 text-accent font-black text-xs uppercase tracking-widest mb-3">
              <Radio className="w-4 h-4" />
              <span>RYF RADIO • PRÉSENTATION OFFICIELLE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              À PROPOS DE RYF RADIO
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
              Une plateforme digitale au cœur de la culture africaine, de la musique et du
              divertissement. Découvrez nos piliers, nos missions, nos offres et notre engagement.
            </p>

            {/* Navigation par onglets des rubriques */}
            <div className="mt-10 flex flex-wrap gap-2 sm:gap-3">
              {RYF_ABOUT_RUBRIQUES.map((rubrique) => {
                const isActive = rubrique.id === activeTab;
                return (
                  <button
                    key={rubrique.id}
                    type="button"
                    onClick={() => setActiveTab(rubrique.id)}
                    className={`px-4 py-2.5 text-xs font-black uppercase tracking-wider transition-all border ${
                      isActive
                        ? "bg-primary text-white border-primary shadow-lg scale-105"
                        : "bg-white/10 text-white/90 border-white/20 hover:bg-white/20 hover:text-white"
                    }`}
                    style={{ borderRadius: "0px" }}
                  >
                    {rubrique.title}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Détail complet de la rubrique active */}
        <section className="py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Colonne visuel officiel */}
            <div className="lg:col-span-5">
              <div
                className="relative bg-slate-900 border border-border shadow-xl overflow-hidden sticky top-28"
                style={{ borderRadius: "0px" }}
              >
                <img
                  src={selectedRubrique.bgImage}
                  alt={selectedRubrique.title}
                  className="w-full h-auto object-cover max-h-[500px]"
                  style={{ borderRadius: "0px" }}
                />
                <div className="p-4 bg-slate-900 text-white border-t border-white/10">
                  <div className="text-[11px] font-bold text-accent uppercase tracking-wider">
                    {selectedRubrique.title}
                  </div>
                  <div className="text-sm font-black uppercase text-white mt-0.5">
                    {selectedRubrique.headline}
                  </div>
                </div>
              </div>
            </div>

            {/* Colonne contenu éditorial détaillé */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-primary">
                  RUBRIQUE OFFICIELLE
                </span>
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-foreground mt-1">
                  {selectedRubrique.title}
                </h2>
                <p className="text-base font-semibold text-primary/90 mt-1">
                  {selectedRubrique.headline}
                </p>
              </div>

              {/* Paragraphes généraux */}
              <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                {selectedRubrique.fullDesc.map((para, i) => (
                  <p key={i} className="text-justify">
                    {para}
                  </p>
                ))}
              </div>

              {/* Points ou sous-éléments structurés */}
              {selectedRubrique.points && selectedRubrique.points.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border/80 space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                    Détails & Composantes
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {selectedRubrique.points.map((pt, i) => (
                      <div
                        key={i}
                        className="p-4 bg-slate-50 border border-slate-200 hover:border-primary/50 transition-colors"
                        style={{ borderRadius: "0px" }}
                      >
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-black uppercase text-foreground">
                              {pt.title}
                            </h4>
                            <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                              {pt.text}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Call-to-action de contact / interaction */}
              <div
                className="mt-6 p-6 bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4"
                style={{ borderRadius: "0px" }}
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-wider">
                    <span>Collaborez avec RYF Radio</span>
                  </div>
                  <div className="text-sm font-bold text-white mt-1">
                    Un projet, un événement ou une initiative culturelle ?
                  </div>
                </div>
                <Link
                  to="/"
                  hash="contact"
                  className="px-5 py-2.5 bg-accent text-slate-950 font-black text-xs uppercase tracking-wider hover:bg-white transition-all shrink-0"
                  style={{ borderRadius: "0px" }}
                >
                  Contactez l'équipe →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterAndModals />
    </div>
  );
}
