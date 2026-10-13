import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { FooterAndModals } from "@/components/FooterAndModals";
import { RYF_FULL_ARTICLES, RYF_NEWS, RYF_ASSETS } from "@/lib/ryf-data";
import { Calendar, Clock, MapPin, ArrowLeft, Share2, Check, ChevronRight } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/actualites")({
  validateSearch: (search: Record<string, unknown>) => ({
    id: typeof search.id === "string" ? search.id : undefined,
  }),
  head: () => ({
    meta: [
      {
        title: "Actualités Culture & Musique | RYF Radio",
      },
      {
        name: "description",
        content:
          "Toutes les actualités culturelles, musicales et événementielles couvertes par RYF Radio au Cameroun, en Afrique et dans le monde.",
      },
      {
        property: "og:title",
        content: "Actualités Culture & Musique | RYF Radio",
      },
      {
        property: "og:description",
        content:
          "Retrouvez les articles complets, déclarations exclusives et coulisses des grands événements culturels avec RYF Radio.",
      },
      {
        property: "og:image",
        content: RYF_NEWS[0]?.imageUrl || RYF_ASSETS.heroCrowd,
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
        content: RYF_NEWS[0]?.imageUrl || RYF_ASSETS.heroCrowd,
      },
    ],
  }),
  component: ActualitesPage,
});

function ActualitesPage() {
  const { id } = Route.useSearch();
  const [selectedId, setSelectedId] = useState<string>(
    id && RYF_FULL_ARTICLES[id] ? id : "news-sergeo-polo",
  );
  const [copied, setCopied] = useState(false);

  const article = RYF_FULL_ARTICLES[selectedId] || RYF_FULL_ARTICLES["news-sergeo-polo"];

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Lien copié dans le presse-papier !");
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen max-w-full overflow-x-clip bg-background text-foreground flex flex-col selection:bg-accent/30 selection:text-foreground">
      {/* Header */}
      <Header />

      <main className="flex-1 pb-24 bg-white relative">
        {/* Stickers / Emojis d'actualité flottants en arrière-plan */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.06] select-none text-4xl sm:text-6xl flex flex-wrap gap-20 p-8 justify-around items-center">
          <span>📰</span>
          <span>🎤</span>
          <span>🎬</span>
          <span>📻</span>
          <span>⚡</span>
          <span>🔥</span>
          <span>🎶</span>
          <span>📢</span>
          <span>🌍</span>
          <span>✨</span>
          <span>📽️</span>
          <span>🏆</span>
          <span>🎙️</span>
          <span>🎷</span>
        </div>

        {/* Fil d'Ariane & Retour */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-4 relative z-10">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-border/60 pb-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour à l'accueil</span>
            </Link>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Actualités</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="font-bold text-foreground truncate max-w-[220px]">
                {article.title}
              </span>
            </div>
          </div>
        </div>

        {/* Sélecteur rapide d'articles / Onglets carrés */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {RYF_NEWS.map((item) => {
              const isCurrent = item.id === article.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  className={`text-left p-3.5 transition-all duration-200 border ${
                    isCurrent
                      ? "bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-primary"
                      : "bg-slate-50 hover:bg-slate-100 border-border text-foreground"
                  }`}
                  style={{ borderRadius: "0px" }}
                >
                  <div className="flex items-center gap-2 text-[10px] uppercase font-extrabold tracking-widest text-primary mb-1">
                    <span>{item.category}</span>
                    <span>•</span>
                    <span className={isCurrent ? "text-slate-300" : "text-muted-foreground"}>
                      {item.date}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold leading-snug line-clamp-2">{item.title}</h4>
                </button>
              );
            })}
          </div>
        </div>

        {/* Corps de l'article complet */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 relative z-10">
          {/* Méta et titre */}
          <header className="mb-6">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span
                className="px-3 py-1 bg-primary text-primary-foreground text-xs font-black uppercase tracking-widest"
                style={{ borderRadius: "0px" }}
              >
                {article.category}
              </span>
              <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                {article.date}
              </span>
              <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-primary" />
                {article.readTime}
              </span>
              <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                {article.location}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground tracking-tight leading-tight uppercase">
              {article.title}
            </h1>

            {article.subtitle && (
              <p className="mt-3 text-base sm:text-lg text-muted-foreground font-medium leading-relaxed">
                {article.subtitle}
              </p>
            )}

            <div className="mt-4 pt-4 border-t border-border/70 flex items-center justify-between flex-wrap gap-3">
              <span className="text-xs font-bold text-foreground">
                Par : <span className="text-primary">{article.author}</span>
              </span>
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-foreground text-xs font-bold tracking-wider uppercase transition-colors"
                style={{ borderRadius: "0px" }}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-600" />
                    <span>Lien copié</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-primary" />
                    <span>Partager l'article</span>
                  </>
                )}
              </button>
            </div>
          </header>

          {/* Grande Image carrée / nette sans border-radius */}
          <div
            className="relative overflow-hidden mb-8 border border-border shadow-md bg-slate-100"
            style={{ borderRadius: "0px" }}
          >
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full max-h-[520px] object-contain sm:object-cover mx-auto bg-slate-900"
            />
            <div className="p-2.5 bg-slate-900 text-white text-[11px] font-medium flex items-center justify-between">
              <span>Image exclusive RYF Radio</span>
              <span className="text-primary font-bold">Couverture Rédaction</span>
            </div>
          </div>

          {/* Citation mise en avant (si disponible) */}
          {article.quote && (
            <div
              className="my-8 p-6 bg-slate-50 border-l-4 border-primary shadow-xs"
              style={{ borderRadius: "0px" }}
            >
              <div className="flex items-start gap-3">
                <div>
                  <blockquote className="text-base sm:text-lg font-serif italic text-foreground leading-relaxed">
                    « {article.quote.text} »
                  </blockquote>
                  <cite className="block mt-2 text-xs font-bold text-primary uppercase tracking-wider not-italic">
                    — {article.quote.author}
                  </cite>
                </div>
              </div>
            </div>
          )}

          {/* Paragraphes de l'article */}
          <div className="space-y-4 text-base text-foreground/90 leading-relaxed font-normal">
            {article.paragraphs.map((p, idx) => (
              <p key={idx} className="text-justify sm:text-left">
                {p}
              </p>
            ))}
          </div>

          {/* Points clés / Faits marquants */}
          {article.highlights && article.highlights.length > 0 && (
            <div
              className="mt-8 p-6 bg-slate-900 text-white border border-slate-800"
              style={{ borderRadius: "0px" }}
            >
              <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-3">
                À RETENIR • RYF ACTUALITÉS
              </h3>
              <ul className="space-y-2">
                {article.highlights.map((h, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200"
                  >
                    <span className="text-primary font-bold">▪</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Navigation bas de page vers les autres articles */}
          <div className="mt-12 pt-8 border-t border-border/80 flex items-center justify-between flex-wrap gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-foreground font-bold text-xs uppercase tracking-wider transition-colors"
              style={{ borderRadius: "0px" }}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour à l'antenne</span>
            </Link>

            <div className="flex items-center gap-2">
              {RYF_NEWS.filter((n) => n.id !== article.id).map((other) => (
                <button
                  key={other.id}
                  type="button"
                  onClick={() => {
                    setSelectedId(other.id);
                    if (typeof window !== "undefined") {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className="px-3.5 py-2 border border-border text-foreground hover:border-primary hover:text-primary text-xs font-bold uppercase tracking-wider transition-colors"
                  style={{ borderRadius: "0px" }}
                >
                  Lire : {other.title.slice(0, 18)}...
                </button>
              ))}
            </div>
          </div>
        </article>
      </main>

      {/* Footer & Live Player (mounted at root) */}
      <FooterAndModals />
    </div>
  );
}
