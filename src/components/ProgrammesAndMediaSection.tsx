import React, { useState, useRef, useEffect, useCallback } from "react";
import { RYF_VIDEOS, RYF_PODCASTS, RYF_DAILY_CHRONIQUES, RYF_ASSETS } from "@/lib/ryf-data";
import {
  Play,
  Tv,
  Headphones,
  ArrowRight,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface ProgrammesAndMediaProps {
  onOpenPlayer: () => void;
  onOpenSchedule: () => void;
}

/* ------------------------------------------------------------------ */
/*  Chronique card — reveals & straightens as it scrolls into view     */
/*  (the "unrolling parchment" effect)                                 */
/* ------------------------------------------------------------------ */
const ChroniqueReveal: React.FC<{
  chr: { time: string; title: string; type: string };
  index: number;
}> = ({ chr, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative transition-all duration-700 ease-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      } ${
        /* Alternating left and right columns around a center spine (all viewports) */
        isEven ? "w-[48%] pr-2.5 mr-auto text-right" : "w-[48%] pl-2.5 ml-auto text-left"
      }`}
    >
      {/* Node on the spine: centered on all viewports */}
      <span
        className={`absolute top-2.5 z-10 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border-2 border-primary shadow-md transition-all duration-500 -translate-x-1/2 ${
          isEven ? "right-[-5px] translate-x-1/2" : "left-[-5px]"
        } ${inView ? "scale-100 bg-primary" : "scale-75 bg-white"}`}
      />
      <div className="group rounded-lg sm:rounded-xl border border-border bg-card/95 backdrop-blur-sm px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300">
        <div
          className={`flex items-center gap-1.5 sm:gap-2.5 min-w-0 ${
            isEven ? "justify-end sm:justify-start" : "justify-start"
          }`}
        >
          {isEven ? (
            <>
              <span className="text-[11px] sm:text-xs font-bold text-foreground group-hover:text-primary transition-colors truncate">
                {chr.title}
              </span>
              <span className="shrink-0 px-1.5 py-0.5 rounded sm:rounded-md bg-primary text-primary-foreground text-[9px] sm:text-[11px] font-black tabular-nums tracking-tight">
                {chr.time}
              </span>
            </>
          ) : (
            <>
              <span className="shrink-0 px-1.5 py-0.5 rounded sm:rounded-md bg-primary text-primary-foreground text-[9px] sm:text-[11px] font-black tabular-nums tracking-tight">
                {chr.time}
              </span>
              <span className="text-[11px] sm:text-xs font-bold text-foreground group-hover:text-primary transition-colors truncate">
                {chr.title}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const ProgrammesAndMediaSection: React.FC<ProgrammesAndMediaProps> = ({
  onOpenPlayer,
  onOpenSchedule,
}) => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [playingPodcast, setPlayingPodcast] = useState<string | null>(null);

  // Auto-scroll ref for videos
  const videoScrollerRef = useRef<HTMLDivElement>(null);
  const [videoPaused, setVideoPaused] = useState(false);

  // Podcast carousel ref + scroll position tracking
  const podcastScrollerRef = useRef<HTMLDivElement>(null);
  const [podcastAtStart, setPodcastAtStart] = useState(true);
  const [podcastAtEnd, setPodcastAtEnd] = useState(false);
  const [podcastPaused, setPodcastPaused] = useState(false);

  // Scroll progress for the unrolling spine
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const passed = vh - rect.top;
      const p = Math.min(1, Math.max(0, passed / total));
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollVideos = (dir: "left" | "right") => {
    if (!videoScrollerRef.current) return;
    const offset = 320;
    videoScrollerRef.current.scrollBy({
      left: dir === "left" ? -offset : offset,
      behavior: "smooth",
    });
  };

  const autoNextVideo = useCallback(() => {
    const el = videoScrollerRef.current;
    if (!el || activeVideo) return;
    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      el.scrollBy({ left: 320, behavior: "smooth" });
    }
  }, [activeVideo]);

  useEffect(() => {
    if (videoPaused || activeVideo) return;
    const timer = setInterval(autoNextVideo, 3800);
    return () => clearInterval(timer);
  }, [videoPaused, autoNextVideo, activeVideo]);

  // ---- Podcast carousel logic ----
  const updatePodcastPosition = useCallback(() => {
    const el = podcastScrollerRef.current;
    if (!el) return;
    setPodcastAtStart(el.scrollLeft <= 8);
    setPodcastAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 10);
  }, []);

  const scrollPodcasts = (dir: "left" | "right") => {
    if (!podcastScrollerRef.current) return;
    const offset = 360;
    podcastScrollerRef.current.scrollBy({
      left: dir === "left" ? -offset : offset,
      behavior: "smooth",
    });
    setTimeout(updatePodcastPosition, 400);
  };

  useEffect(() => {
    updatePodcastPosition();
  }, [updatePodcastPosition]);

  // Auto-scroll doux des podcasts (boucle infinie)
  const autoNextPodcast = useCallback(() => {
    const el = podcastScrollerRef.current;
    if (!el) return;
    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      el.scrollBy({ left: 360, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (podcastPaused) return;
    const timer = setInterval(autoNextPodcast, 4200);
    return () => clearInterval(timer);
  }, [podcastPaused, autoNextPodcast]);

  return (
    <>
      {/* ================= SECTION: NOS PROGRAMMES (image gauche / parchemin droit) ================= */}
      <section
        id="programmes"
        ref={sectionRef}
        className="relative py-10 sm:py-14 border-b border-border/70 overflow-hidden bg-white"
      >
        {/* Image en plein arrière-plan sur tous les viewports avec overlay sombre */}
        <div className="absolute inset-0">
          <img
            src={RYF_ASSETS.img4TopDivertissement}
            alt="Le top du divertissement au quotidien"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-slate-950/80" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight uppercase">
              NOS PROGRAMMES
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-white/85">
              Nous vous accompagnons à travers des programmes qui donnent une place centrale à la
              musique, à la culture, au divertissement et à l’actualité.
            </p>
          </div>

          {/* Parchemin compact — à droite sur desktop, pleine largeur sur mobile avec alternance gauche/droite */}
          <div className="relative max-w-xl mx-auto pb-2">
            {/* Spine track: centered on all viewports */}
            <div className="absolute left-1/2 top-1 bottom-1 w-[2px] sm:w-[3px] -translate-x-1/2 rounded-full bg-linear-to-b from-primary/10 via-primary/25 to-primary/10" />
            {/* Spine fill — grows as the section scrolls (the unrolling effect) */}
            <div
              className="absolute left-1/2 top-1 -translate-x-1/2 w-[2px] sm:w-[3px] rounded-full bg-linear-to-b from-primary to-accent transition-[height] duration-150 ease-out"
              style={{ height: `calc(${progress} * (100% - 0.5rem))` }}
            />
            {/* Top cap */}
            <div className="absolute left-1/2 -top-0.5 -translate-x-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-primary shadow-lg ring-2 sm:ring-4 ring-primary/15" />

            <div className="space-y-1.5 sm:space-y-2.5 pt-3 pb-2">
              {RYF_DAILY_CHRONIQUES.map((chr, idx) => (
                <ChroniqueReveal key={idx} chr={chr} index={idx} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION: VIDÉOS (VIENT AVANT PODCASTS) ================= */}
      <section id="videos" className="py-16 bg-slate-50 border-b border-border/70 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight uppercase">
              VIDÉOS
            </h2>
          </div>

          {/* Horizontal Auto-Rotating Videos */}
          <div
            className="relative"
            onMouseEnter={() => setVideoPaused(true)}
            onMouseLeave={() => setVideoPaused(false)}
          >
            <button
              type="button"
              onClick={() => scrollVideos("left")}
              aria-label="Vidéos précédentes"
              className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-white border border-border shadow-lg text-primary hover:bg-primary hover:text-white transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div
              ref={videoScrollerRef}
              className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {RYF_VIDEOS.map((video) => (
                <div
                  key={video.id}
                  className="group rounded-2xl border border-border bg-white overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between shrink-0 w-[88vw] sm:w-[320px] snap-start"
                >
                  <div>
                    <div
                      className="relative aspect-video bg-black overflow-hidden cursor-pointer"
                      onClick={() => setActiveVideo(video.youtubeId)}
                    >
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
                      />
                      <div className="absolute inset-0 bg-black/25 flex items-center justify-center transition-colors group-hover:bg-black/10">
                        <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                          <Play className="w-6 h-6 fill-current ml-0.5" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-white text-[11px] font-bold">
                        {video.duration}
                      </div>
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-primary text-white text-[10px] font-bold uppercase">
                        {video.category}
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-1.5">
                        <span className="font-semibold text-primary">{video.views}</span>
                        <span>•</span>
                        <span>{video.publishedAt}</span>
                      </div>
                      <h3 className="text-sm font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        {video.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-4 pt-0 flex items-center justify-between gap-2 border-t border-border mt-2">
                    <button
                      onClick={() => setActiveVideo(video.youtubeId)}
                      className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Regarder</span>
                    </button>
                    <a
                      href={video.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                    >
                      <span>YouTube</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => scrollVideos("right")}
              aria-label="Vidéos suivantes"
              className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-white border border-border shadow-lg text-primary hover:bg-primary hover:text-white transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* ================= SECTION: PODCASTS ================= */}
      <section id="podcasts" className="py-16 bg-white border-b border-border/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight uppercase">
                PODCASTS <span className="text-primary">RYF</span>
              </h2>
              <p className="text-sm text-muted-foreground mt-1 max-w-xl">
                Revivez vos chroniques, débats culturels et entretiens d'artistes à tout moment.
              </p>
            </div>

            {/* Direction arrows — text-link style, shown/hidden by scroll position */}
            <div className="flex items-center gap-5 self-start md:self-end">
              <button
                type="button"
                onClick={() => scrollPodcasts("left")}
                aria-label="Podcasts précédents"
                className={`text-2xl font-bold leading-none text-primary hover:text-primary/70 transition-all duration-300 ${
                  podcastAtStart ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => scrollPodcasts("right")}
                aria-label="Podcasts suivants"
                className={`text-2xl font-bold leading-none text-primary hover:text-primary/70 transition-all duration-300 ${
                  podcastAtEnd ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              >
                →
              </button>
            </div>
          </div>

          <div
            className="relative"
            onMouseEnter={() => setPodcastPaused(true)}
            onMouseLeave={() => setPodcastPaused(false)}
          >
            <div
              ref={podcastScrollerRef}
              onScroll={updatePodcastPosition}
              className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {RYF_PODCASTS.map((pod, idx) => (
                <div
                  key={`${pod.id}-${idx}`}
                  className="group rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-xs hover:shadow-xl hover:border-primary/40 transition-all flex flex-col justify-between shrink-0 w-[88vw] sm:w-[340px] snap-start"
                >
                  <div>
                    <div className="flex gap-4 items-start">
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-muted">
                        <img
                          src={pod.imageUrl}
                          alt={pod.title}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() =>
                            setPlayingPodcast(playingPodcast === pod.id ? null : pod.id)
                          }
                          className="absolute inset-0 bg-black/40 flex items-center justify-center text-white hover:bg-primary/80 transition-colors"
                          aria-label="Écouter le podcast"
                        >
                          <Play className="w-6 h-6 fill-current" />
                        </button>
                      </div>

                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-extrabold text-primary uppercase tracking-wider">
                          {pod.category}
                        </span>
                        <h4 className="text-sm font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2 mt-0.5">
                          {pod.title}
                        </h4>
                        <div className="text-[11px] text-muted-foreground mt-1 flex items-center gap-2">
                          <span>{pod.duration}</span>
                          <span>•</span>
                          <span>{pod.date}</span>
                        </div>
                      </div>
                    </div>

                    <p className="mt-3 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {pod.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-primary">
                    <button
                      onClick={() => setPlayingPodcast(playingPodcast === pod.id ? null : pod.id)}
                      className="inline-flex items-center gap-1.5 hover:underline"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>
                        {playingPodcast === pod.id ? "En lecture (Aperçu)" : "Écouter l'épisode"}
                      </span>
                    </button>
                    <span className="text-muted-foreground text-[11px]">RYF Audio</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs">
          <div className="relative w-full max-w-3xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/20">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              ✕
            </button>
            <div className="relative aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                title="RYF Video YouTube"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
