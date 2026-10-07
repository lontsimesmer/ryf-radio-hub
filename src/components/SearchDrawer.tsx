import React, { useState, useMemo } from "react";
import {
  RYF_NEWS,
  RYF_AGENDA,
  RYF_PROGRAMMES,
  RYF_PODCASTS,
  RYF_VIDEOS,
  RYF_REALISATIONS,
} from "@/lib/ryf-data";
import { Search, X, ArrowRight, Compass } from "lucide-react";

interface SearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchDrawer: React.FC<SearchDrawerProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<
    "all" | "programmes" | "actualites" | "agenda" | "podcasts" | "videos" | "realisations"
  >("all");

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];

    const results: Array<{
      id: string;
      type: "programme" | "actualite" | "agenda" | "podcast" | "video" | "realisation";
      typeLabel: string;
      title: string;
      subtitle: string;
      meta?: string;
      href: string;
      imageUrl?: string;
    }> = [];

    RYF_PROGRAMMES.forEach((prog) => {
      if (
        prog.title.toLowerCase().includes(q) ||
        prog.host.toLowerCase().includes(q) ||
        prog.description.toLowerCase().includes(q) ||
        prog.category.toLowerCase().includes(q)
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

    RYF_AGENDA.forEach((event) => {
      if (
        event.title.toLowerCase().includes(q) ||
        event.location.toLowerCase().includes(q) ||
        event.city.toLowerCase().includes(q) ||
        event.description.toLowerCase().includes(q) ||
        event.tag.toLowerCase().includes(q)
      ) {
        results.push({
          id: `agenda-${event.id}`,
          type: "agenda",
          typeLabel: `Agenda • ${event.tag}`,
          title: event.title,
          subtitle: `${event.location}, ${event.city}`,
          meta: event.date,
          href: "#agenda",
          imageUrl: event.imageUrl,
        });
      }
    });

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

    return results;
  }, [searchQuery]);

  const filteredResults = useMemo(() => {
    if (activeFilter === "all") return searchResults;
    const filterMap: Record<string, string> = {
      programmes: "programme",
      actualites: "actualite",
      agenda: "agenda",
      podcasts: "podcast",
      videos: "video",
      realisations: "realisation",
    };
    const targetType = filterMap[activeFilter];
    return searchResults.filter((r) => r.type === targetType);
  }, [searchResults, activeFilter]);

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
            placeholder="Rechercher sur tout le site : émissions, actualités, podcasts, agenda, vidéos..."
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
            }}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
            title="Fermer la recherche"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1.5 mt-3 overflow-x-auto pb-1 text-xs no-scrollbar">
          <span className="text-[11px] font-bold text-muted-foreground uppercase mr-1 shrink-0">
            Filtres :
          </span>
          {[
            { id: "all", label: "Tout afficher" },
            { id: "programmes", label: "Programmes" },
            { id: "actualites", label: "Actualités" },
            { id: "agenda", label: "Agenda" },
            { id: "podcasts", label: "Podcasts" },
            { id: "videos", label: "Vidéos" },
            { id: "realisations", label: "Réalisations" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id as typeof activeFilter)}
              className={`px-3 py-1 rounded-full font-bold transition-all shrink-0 ${
                activeFilter === f.id
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Results */}
        {searchQuery.trim().length > 0 ? (
          <div className="mt-4 pt-3 border-t border-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-3 font-semibold">
              <span>
                {filteredResults.length} résultat{filteredResults.length > 1 ? "s" : ""} trouvé
                {filteredResults.length > 1 ? "s" : ""} pour «{" "}
                <span className="text-foreground font-bold">{searchQuery}</span> »
              </span>
              {activeFilter !== "all" && (
                <button
                  onClick={() => setActiveFilter("all")}
                  className="text-primary hover:underline font-medium"
                >
                  Réinitialiser les filtres
                </button>
              )}
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
                  Essayez des termes plus généraux comme « musique », « concert », « morning » ou «
                  interview ».
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-4 pt-3 border-t border-border flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold text-muted-foreground flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-accent" />
              Suggestions :
            </span>
            {["Rythmes & Folies", "Makossa", "Festival", "Concert", "Carlos", "Interview"].map(
              (term) => (
                <button
                  key={term}
                  onClick={() => setSearchQuery(term)}
                  className="px-2.5 py-1 rounded-md bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground font-semibold transition-colors"
                >
                  {term}
                </button>
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
};
