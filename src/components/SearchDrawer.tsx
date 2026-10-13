import React, { useState, useMemo } from "react";
import {
  RYF_NEWS,
  RYF_AGENDA,
  RYF_PROGRAMMES,
  RYF_PODCASTS,
  RYF_VIDEOS,
  RYF_REALISATIONS,
  RYF_ABOUT_RUBRIQUES,
  RYF_DAILY_CHRONIQUES,
} from "@/lib/ryf-data";
import { RYF_TEAM_MEMBERS } from "@/lib/team-data";
import { Search, X, ArrowRight, Compass, SlidersHorizontal, ChevronDown } from "lucide-react";

interface SearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

type FilterId =
  | "all"
  | "programmes"
  | "actualites"
  | "agenda"
  | "podcasts"
  | "videos"
  | "realisations"
  | "equipe"
  | "apropos"
  | "chroniques"
  | "partenaires";

// Map each filter id to the result `type` it should match.
const FILTER_TYPE_MAP: Record<FilterId, string | null> = {
  all: null,
  programmes: "programme",
  actualites: "actualite",
  agenda: "agenda",
  podcasts: "podcast",
  videos: "video",
  realisations: "realisation",
  equipe: "equipe",
  apropos: "apropos",
  chroniques: "chronique",
  partenaires: "partenaire",
};

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "Tout afficher" },
  { id: "programmes", label: "Programmes" },
  { id: "actualites", label: "Actualités" },
  { id: "agenda", label: "Agenda" },
  { id: "podcasts", label: "Podcasts" },
  { id: "videos", label: "Vidéos" },
  { id: "realisations", label: "Réalisations" },
  { id: "equipe", label: "Équipe" },
  { id: "apropos", label: "À Propos" },
  { id: "chroniques", label: "Chroniques" },
  { id: "partenaires", label: "Partenaires" },
];

// Section headers — searchable as navigation targets (visible under "Tout afficher")
const SECTIONS: Array<{
  id: string;
  title: string;
  subtitle: string;
  href: string;
}> = [
  {
    id: "sec-actualites",
    title: "ACTUALITÉS",
    subtitle: "L'actualité culturelle au cœur de RYF Radio",
    href: "#actualites",
  },
  {
    id: "sec-apropos",
    title: "À PROPOS",
    subtitle: "Notre concept, missions, offres, cibles et réalisations",
    href: "#a-propos",
  },
  {
    id: "sec-agenda",
    title: "AGENDA CULTUREL",
    subtitle: "Retrouvez nos rendez-vous culturels",
    href: "#agenda",
  },
  {
    id: "sec-publicite",
    title: "ESPACE PUBLICITAIRE",
    subtitle: "Partenaire officiel RYF Radio",
    href: "#publicite-partenaire",
  },
  {
    id: "sec-programmes",
    title: "NOS PROGRAMMES",
    subtitle: "Grille des programmes et chroniques",
    href: "#programmes",
  },
  {
    id: "sec-equipe",
    title: "NOTRE ÉQUIPE",
    subtitle: "Animateurs et collaborateurs",
    href: "#equipe",
  },
  {
    id: "sec-communaute",
    title: "REJOIGNEZ LA COMMUNAUTÉ",
    subtitle: "Newsletter et communauté RYF",
    href: "#communaute",
  },
  {
    id: "sec-partenaires",
    title: "NOS PARTENAIRES",
    subtitle: "Ils nous font confiance",
    href: "#partenaires",
  },
];

// Partners (inline — logos live in PartenairesSection)
const PARTNERS: Array<{ name: string; href: string }> = [
  { name: "MASA", href: "#partenaires" },
  { name: "Chouquette by Osiera", href: "#publicite-partenaire" },
  { name: "RadioKing", href: "#partenaires" },
  { name: "RYF Radio", href: "#partenaires" },
  { name: "VV Group", href: "#partenaires" },
];

type ResultType =
  | "programme"
  | "actualite"
  | "agenda"
  | "podcast"
  | "video"
  | "realisation"
  | "equipe"
  | "apropos"
  | "chronique"
  | "partenaire"
  | "section";

interface SearchResult {
  id: string;
  type: ResultType;
  typeLabel: string;
  title: string;
  subtitle: string;
  meta?: string;
  href: string;
  imageUrl?: string;
  bgImage?: string;
}

// Contextual suggestions per active filter
function getSuggestions(filter: FilterId): string[] {
  switch (filter) {
    case "programmes":
      return RYF_PROGRAMMES.map((p) => p.title);
    case "actualites":
      return ["Sergeo Polo", "Écrans Noirs", "MASA", "Conférence de presse", "Festival", "Abidjan"];
    case "agenda":
      return ["Ngouon", "Ngondo", "École des Pluies", "Foumban", "Douala", "Yaoundé"];
    case "podcasts":
      return RYF_PODCASTS.map((p) => p.host).filter((v, i, a) => a.indexOf(v) === i);
    case "videos":
      return RYF_VIDEOS.map((v) => v.category).filter((v, i, a) => a.indexOf(v) === i);
    case "realisations":
      return RYF_REALISATIONS.map((r) => r.category);
    case "equipe":
      return RYF_TEAM_MEMBERS.map((m) => m.name);
    case "apropos":
      return RYF_ABOUT_RUBRIQUES.map((r) => r.title);
    case "chroniques":
      return RYF_DAILY_CHRONIQUES.map((c) => c.title);
    case "partenaires":
      return PARTNERS.map((p) => p.name);
    default:
      return [
        "Rythmes & Folies",
        "Makossa",
        "Festival",
        "Concert",
        "Carlos",
        "Interview",
        "Sergeo Polo",
        "Ngouon",
        "Benjamin Prevoo",
        "DJ King Flow",
      ];
  }
}

export const SearchDrawer: React.FC<SearchDrawerProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const searchResults = useMemo<SearchResult[]>(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];

    const results: SearchResult[] = [];

    // --- Sections (headers / titles) ---
    SECTIONS.forEach((sec) => {
      if (sec.title.toLowerCase().includes(q) || sec.subtitle.toLowerCase().includes(q)) {
        results.push({
          id: sec.id,
          type: "section",
          typeLabel: "Section",
          title: sec.title,
          subtitle: sec.subtitle,
          href: sec.href,
        });
      }
    });

    // --- Programmes ---
    RYF_PROGRAMMES.forEach((prog) => {
      if (
        prog.title.toLowerCase().includes(q) ||
        prog.host.toLowerCase().includes(q) ||
        prog.description.toLowerCase().includes(q) ||
        prog.category.toLowerCase().includes(q) ||
        prog.days.toLowerCase().includes(q)
      ) {
        results.push({
          id: `prog-${prog.id}`,
          type: "programme",
          typeLabel: "Programme",
          title: prog.title,
          subtitle: `${prog.host} | ${prog.days}`,
          meta: prog.time,
          href: "#programmes",
          imageUrl: prog.imageUrl,
        });
      }
    });

    // --- Actualités ---
    RYF_NEWS.forEach((news) => {
      if (
        news.title.toLowerCase().includes(q) ||
        news.summary.toLowerCase().includes(q) ||
        news.category.toLowerCase().includes(q) ||
        news.author.toLowerCase().includes(q)
      ) {
        results.push({
          id: `news-${news.id}`,
          type: "actualite",
          typeLabel: `Actu • ${news.category}`,
          title: news.title,
          subtitle: news.summary,
          meta: news.date,
          href: "#actualites",
          imageUrl: news.imageUrl,
        });
      }
    });

    // --- Agenda ---
    RYF_AGENDA.forEach((event) => {
      const city = (event as { city?: string }).city ?? "";
      if (
        event.title.toLowerCase().includes(q) ||
        event.location.toLowerCase().includes(q) ||
        city.toLowerCase().includes(q) ||
        event.description.toLowerCase().includes(q) ||
        event.tag.toLowerCase().includes(q)
      ) {
        results.push({
          id: `agenda-${event.id}`,
          type: "agenda",
          typeLabel: `Agenda • ${event.tag}`,
          title: event.title,
          subtitle: city ? `${event.location}, ${city}` : event.location,
          meta: event.date,
          href: "#agenda",
          imageUrl: event.imageUrl,
        });
      }
    });

    // --- Podcasts ---
    RYF_PODCASTS.forEach((pod) => {
      if (
        pod.title.toLowerCase().includes(q) ||
        pod.host.toLowerCase().includes(q) ||
        pod.description.toLowerCase().includes(q) ||
        pod.category.toLowerCase().includes(q)
      ) {
        results.push({
          id: `pod-${pod.id}`,
          type: "podcast",
          typeLabel: `Podcast • ${pod.category}`,
          title: pod.title,
          subtitle: `${pod.host} | ${pod.description}`,
          meta: pod.duration,
          href: "#podcasts",
          imageUrl: pod.imageUrl,
        });
      }
    });

    // --- Vidéos ---
    RYF_VIDEOS.forEach((vid) => {
      if (vid.title.toLowerCase().includes(q) || vid.category.toLowerCase().includes(q)) {
        results.push({
          id: `vid-${vid.id}`,
          type: "video",
          typeLabel: `Vidéo • ${vid.category}`,
          title: vid.title,
          subtitle: vid.views,
          meta: vid.duration,
          href: "#videos",
          imageUrl: vid.thumbnailUrl,
        });
      }
    });

    // --- Réalisations ---
    RYF_REALISATIONS.forEach((real) => {
      if (
        real.title.toLowerCase().includes(q) ||
        real.category.toLowerCase().includes(q) ||
        real.summary.toLowerCase().includes(q) ||
        real.location.toLowerCase().includes(q)
      ) {
        results.push({
          id: `real-${real.id}`,
          type: "realisation",
          typeLabel: `Réalisation • ${real.category}`,
          title: real.title,
          subtitle: real.summary,
          meta: `${real.date} | ${real.location}`,
          href: "#realisations",
          imageUrl: real.imageUrl,
        });
      }
    });

    // --- Équipe (animateurs & collaborateurs) ---
    RYF_TEAM_MEMBERS.forEach((member) => {
      if (
        member.name.toLowerCase().includes(q) ||
        member.role.toLowerCase().includes(q) ||
        (member.emission ?? "").toLowerCase().includes(q) ||
        (member.bio ?? "").toLowerCase().includes(q)
      ) {
        results.push({
          id: `team-${member.id}`,
          type: "equipe",
          typeLabel: member.type === "animateur" ? "Animateur" : "Collaborateur",
          title: member.name,
          subtitle: member.role,
          meta: member.emission ?? undefined,
          href: "#equipe",
          imageUrl: member.imageUrl,
        });
      }
    });

    // --- À Propos (rubriques) ---
    RYF_ABOUT_RUBRIQUES.forEach((rub) => {
      if (
        rub.title.toLowerCase().includes(q) ||
        rub.headline.toLowerCase().includes(q) ||
        rub.shortHover.toLowerCase().includes(q) ||
        rub.fullDesc.join(" ").toLowerCase().includes(q) ||
        (rub.points ?? []).some(
          (pt) => pt.title.toLowerCase().includes(q) || pt.text.toLowerCase().includes(q),
        )
      ) {
        results.push({
          id: `about-${rub.id}`,
          type: "apropos",
          typeLabel: "À Propos",
          title: rub.title,
          subtitle: rub.headline,
          href: "#a-propos",
          imageUrl: rub.bgImage,
        });
      }
    });

    // --- Chroniques quotidiennes ---
    RYF_DAILY_CHRONIQUES.forEach((chr) => {
      if (chr.title.toLowerCase().includes(q) || chr.type.toLowerCase().includes(q)) {
        results.push({
          id: `chr-${chr.time}-${chr.title}`,
          type: "chronique",
          typeLabel: `Chronique • ${chr.type}`,
          title: chr.title,
          subtitle: chr.type,
          meta: chr.time,
          href: "#programmes",
        });
      }
    });

    // --- Partenaires ---
    PARTNERS.forEach((p) => {
      if (p.name.toLowerCase().includes(q)) {
        results.push({
          id: `partner-${p.name}`,
          type: "partenaire",
          typeLabel: "Partenaire",
          title: p.name,
          subtitle: "Partenaire officiel RYF Radio",
          href: p.href,
        });
      }
    });

    return results;
  }, [searchQuery]);

  const filteredResults = useMemo(() => {
    const targetType = FILTER_TYPE_MAP[activeFilter];
    if (targetType === null) return searchResults;
    return searchResults.filter((r) => r.type === targetType);
  }, [searchResults, activeFilter]);

  const activeFilterLabel = FILTERS.find((f) => f.id === activeFilter)?.label ?? "Filtres";
  const suggestions = useMemo(() => getSuggestions(activeFilter), [activeFilter]);

  if (!isOpen) return null;

  return (
    <div className="border-t border-border bg-card shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
        {/* Search Bar Input */}
        <div className="flex items-center gap-3 bg-secondary/50 rounded-xl px-4 py-3 border border-border focus-within:border-primary transition-all">
          <Search className="w-5 h-5 text-primary shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher sur tout le site : émissions, actualités, podcasts, agenda, équipe, vidéos..."
            className="w-full bg-transparent border-0 text-sm sm:text-base font-medium focus:outline-hidden text-foreground placeholder:text-muted-foreground"
            autoFocus
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="px-2 py-1 text-xs font-semibold text-muted-foreground hover:text-foreground bg-card rounded-md border border-border"
            >
              Effacer
            </button>
          )}
          <button
            onClick={() => {
              onClose();
              setSearchQuery("");
              setFiltersOpen(false);
            }}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
            title="Fermer la recherche"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters — mini dropdown horizontal */}
        <div className="relative mt-3">
          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
              activeFilter !== "all"
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-card text-foreground hover:bg-secondary"
            }`}
            aria-expanded={filtersOpen}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="uppercase tracking-wide">Filtres</span>
            <span className="opacity-60">·</span>
            <span>{activeFilterLabel}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                filtersOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {filtersOpen && (
            <div className="absolute left-0 z-50 mt-1.5 w-full max-w-md rounded-xl border border-border bg-card p-2 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
              <div className="flex flex-wrap items-center gap-1.5">
                {FILTERS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => {
                      setActiveFilter(f.id);
                      setFiltersOpen(false);
                    }}
                    className={`px-3 py-1 rounded-full font-bold transition-all text-xs ${
                      activeFilter === f.id
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "bg-secondary text-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
                {activeFilter !== "all" && (
                  <button
                    onClick={() => setActiveFilter("all")}
                    className="ml-auto text-[11px] font-semibold text-primary hover:underline"
                  >
                    Réinitialiser
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {searchQuery.trim().length > 0 ? (
          <div className="mt-4 pt-3 border-t border-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-3 font-semibold">
              <span>
                {filteredResults.length} résultat{filteredResults.length > 1 ? "s" : ""} trouvé
                {filteredResults.length > 1 ? "s" : ""} pour «{" "}
                <span className="text-foreground font-bold">{searchQuery}</span> »
                {activeFilter !== "all" && (
                  <span className="text-primary"> · {activeFilterLabel}</span>
                )}
              </span>
            </div>

            {filteredResults.length > 0 ? (
              <div className="max-h-80 overflow-y-auto space-y-2 pr-1 divide-y divide-border/40">
                {filteredResults.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={() => {
                      onClose();
                      setSearchQuery("");
                    }}
                    className="group flex items-center justify-between gap-3 p-2.5 rounded-xl hover:bg-secondary transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt=""
                          className="w-12 h-12 rounded-lg object-cover shrink-0 bg-muted border border-border"
                        />
                      )}
                      <div className="min-w-0">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-primary/10 text-primary mb-1">
                          {item.typeLabel}
                        </span>
                        <h4 className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {item.meta && (
                        <span className="text-[11px] font-medium text-muted-foreground hidden sm:inline-block">
                          {item.meta}
                        </span>
                      )}
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-sm font-bold text-foreground">
                  Aucun résultat correspondant à votre recherche.
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Essayez des termes plus généraux ou changez de filtre.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-4 pt-3 border-t border-border flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold text-muted-foreground flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-accent" />
              {activeFilter !== "all" ? `Suggestions · ${activeFilterLabel}` : "Suggestions :"}
            </span>
            {suggestions.map((term) => (
              <button
                key={term}
                onClick={() => setSearchQuery(term)}
                className="px-2.5 py-1 rounded-md bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground font-semibold transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
