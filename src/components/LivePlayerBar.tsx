import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
  useSyncExternalStore,
} from "react";
import { RYF_ASSETS } from "@/lib/ryf-data";
import { X, Play, Pause, Loader2 } from "lucide-react";
import { playerStore } from "@/lib/player-store";

interface LivePlayerBarProps {
  onOpenSchedule?: () => void;
  isOpenModal?: boolean;
  setIsOpenModal?: (open: boolean) => void;
}

const STREAM_SRC = "https://listen.radioking.com/radio/445556/stream/500072";

export const LivePlayerBar: React.FC<LivePlayerBarProps> = () => {
  // Global store so any route can open the player modal; the <audio> lives
  // here in __root.tsx so playback continues across navigations.
  const storePlayerOpen = useSyncExternalStore(
    playerStore.subscribe,
    playerStore.getPlayerOpen,
    () => false,
  );

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [trackTitle, setTrackTitle] = useState("RYF Radio en direct");
  const [trackArtist, setTrackArtist] = useState("RYF Radio");
  const [showMarquee, setShowMarquee] = useState(false);
  const [marqueeDur, setMarqueeDur] = useState(12);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const wantPlayRef = useRef(false);
  const lastKeyRef = useRef("");
  const wrapRef = useRef<HTMLDivElement>(null);
  const titleInnerRef = useRef<HTMLSpanElement>(null);

  /* ---------- Marquee : défilement des longs titres (temps réel) ---------- */
  const measureMarquee = useCallback(() => {
    // Use rAF so layout is fully computed (esp. on mobile where media
    // queries change the available width after first paint).
    requestAnimationFrame(() => {
      const wrap = wrapRef.current;
      const span = titleInnerRef.current;
      if (!wrap || !span) {
        setShowMarquee(false);
        return;
      }
      // scrollWidth = pleine largeur du texte ; clientWidth = largeur visible
      const natural = span.scrollWidth || span.offsetWidth || 0;
      const visible = wrap.clientWidth;
      if (natural > visible && natural > 0 && visible > 0) {
        setShowMarquee(true);
        // Slower on mobile so long titles stay readable while scrolling
        const speed = visible < 200 ? 22 : 30;
        setMarqueeDur(Math.max(6, Math.round(natural / speed)));
      } else {
        setShowMarquee(false);
      }
    });
  }, []);

  useLayoutEffect(() => {
    measureMarquee();
  }, [trackTitle, measureMarquee, isPlaying]);

  useEffect(() => {
    const onResize = () => measureMarquee();
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    // ResizeObserver catches container changes (e.g. mobile layout shifts)
    let ro: ResizeObserver | null = null;
    const wrap = wrapRef.current;
    if (wrap && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => measureMarquee());
      ro.observe(wrap);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      ro?.disconnect();
    };
  }, [measureMarquee]);

  /* ---------- Lecture / pause + spinner de chargement ---------- */
  const handlePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!wantPlayRef.current) {
      wantPlayRef.current = true;
      setIsPlaying(true);
      setIsLoading(true);
      audio.volume = volume;
      audio.src = STREAM_SRC + (STREAM_SRC.indexOf("?") < 0 ? "?" : "&") + "t=" + Date.now();
      const pr = audio.play();
      if (pr && pr.catch) {
        pr.catch(() => {
          wantPlayRef.current = false;
          setIsPlaying(false);
          setIsLoading(false);
        });
      }
    } else {
      wantPlayRef.current = false;
      setIsPlaying(false);
      setIsLoading(false);
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    }
  }, [volume]);

  /* ---------- Volume / mute ---------- */
  const handleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  }, []);

  const handleVolume = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setVolume(v);
    const audio = audioRef.current;
    if (audio) {
      audio.volume = v;
      if (v === 0) {
        audio.muted = true;
        setIsMuted(true);
      } else if (audio.muted) {
        audio.muted = false;
        setIsMuted(false);
      }
    }
  }, []);

  /* ---------- Partager / popup ---------- */
  const handleShare = useCallback(() => {
    const data = {
      title: "RYF Radio",
      text: `J'écoute ${trackTitle} sur RYF Radio`,
      url: window.location.href,
    };
    if (navigator.share) {
      navigator.share(data).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
  }, [trackTitle]);

  const handlePopup = useCallback(() => {
    window.open("https://player.radioking.io/ryf-radio2/", "ryfradio", "width=470,height=300");
  }, []);

  /* ---------- Cycle de vie de l'élément audio ---------- */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlaying = () => {
      setIsLoading(false);
      measureMarquee();
    };
    const onWaiting = () => {
      if (wantPlayRef.current) setIsLoading(true);
    };
    const onStalled = () => {
      if (wantPlayRef.current) setIsLoading(true);
    };
    const onError = () => {
      if (wantPlayRef.current && audio.getAttribute("src")) {
        wantPlayRef.current = false;
        setIsPlaying(false);
        setIsLoading(false);
      }
    };
    const onEnded = () => {
      wantPlayRef.current = false;
      setIsPlaying(false);
      setIsLoading(false);
    };
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("stalled", onStalled);
    audio.addEventListener("error", onError);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("stalled", onStalled);
      audio.removeEventListener("error", onError);
      audio.removeEventListener("ended", onEnded);
    };
  }, [measureMarquee]);

  /* ---------- Titre + artiste en cours (le logo reste statique) ---------- */
  useEffect(() => {
    let active = true;
    const refresh = () => {
      fetch("https://api.radioking.io/widget/radio/ryf-radio2/track/current")
        .then((r) => r.json())
        .then((d) => {
          if (!active || !d || !d.title) return;
          const key = (d.artist || "") + "|" + d.title;
          if (key !== lastKeyRef.current) {
            lastKeyRef.current = key;
            setTrackTitle(d.title);
            setTrackArtist(d.artist || "RYF Radio");
          }
        })
        .catch(() => {});
    };
    refresh();
    const id = window.setInterval(refresh, 30000);
    return () => {
      active = false;
      window.clearInterval(id);
    };
  }, []);

  const closePlayer = () => playerStore.closePlayer();
  const openPlayer = () => playerStore.openPlayer();
  const toggleCollapse = () => setIsCollapsed((v) => !v);

  const volFill = isMuted ? 0 : Math.round(volume * 100);
  const barClass = [
    "rk-bar",
    isPlaying ? "playing" : "",
    isLoading ? "loading" : "",
    isMuted ? "muted" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      {/* Barre de lecture fixe en bas — bandeau EN DIRECT + lecteur rk-bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-ryf-navy text-white border-t border-accent/30 shadow-2xl rounded-none">
        {/* Bandeau supérieur : EN DIRECT + Grille + Réduire */}
        <div className="bg-primary/90 px-3 sm:px-4 py-1 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-white rounded-none">
          <div className="flex items-center gap-2 min-w-0">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-accent shrink-0 font-extrabold">EN DIRECT</span>
            <span className="hidden sm:inline-block opacity-70">|</span>
            <span className="hidden sm:inline-block truncate">
              RYF RADIO • LE TOP DU DIVERTISSEMENT
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={toggleCollapse}
              className="text-white hover:text-accent underline transition-colors text-[10px] sm:text-[11px]"
            >
              {isCollapsed ? "▲ AFFICHER" : "▼ RÉDUIRE"}
            </button>
          </div>
        </div>
        {/* Lecteur rk-bar */}
        <div className={`w-full ${isCollapsed ? "hidden" : ""}`}>
          <div className={barClass} id="rkBar">
            {/* Logo RYF statique — ne change pas dynamiquement */}
            <img className="rk-cover" src={RYF_ASSETS.logo} alt="RYF Radio" />

            {/* Play / pause / chargement — pas de like/dislike */}
            <div className="rk-ctrls">
              <button
                className="rk-circle rk-play"
                onClick={handlePlayPause}
                aria-label={isPlaying ? "Pause" : "Lecture"}
              >
                <svg className="i-play" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <svg className="i-pause" viewBox="0 0 24 24">
                  <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                </svg>
                <svg className="i-load" viewBox="0 0 24 24">
                  <circle
                    cx="12"
                    cy="12"
                    r="8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeDasharray="13 60"
                  />
                </svg>
              </button>
            </div>

            {/* Titre défilant + artiste */}
            <div className="rk-info">
              <span className="rk-station">RYF RADIO</span>
              <div
                className={`rk-title-wrap ${showMarquee ? "scroll" : ""}`}
                ref={wrapRef}
                style={
                  showMarquee ? ({ "--dur": `${marqueeDur}s` } as React.CSSProperties) : undefined
                }
              >
                <span className="rk-title">
                  <span className="rk-marq" ref={titleInnerRef}>
                    {trackTitle}
                  </span>
                  {showMarquee && <span className="rk-marq">{trackTitle}</span>}
                </span>
              </div>
              <span className="rk-artist">{trackArtist}</span>
            </div>

            {/* Outils : volume, partager, popup */}
            <div className="rk-tools">
              <div className="rk-vol-group">
                <button className="rk-icon" onClick={handleMute} aria-label="Couper le son">
                  <svg className="i-vol" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4z" />
                  </svg>
                  <svg className="i-off" viewBox="0 0 24 24">
                    <path d="M4 9v6h4l5 4V5L8 9H4zm12 .4 1.4-1.4 2.1 2.1 2.1-2.1L23 9.4l-2.1 2.1 2.1 2.1-1.4 1.4-2.1-2.1-2.1 2.1-1.4-1.4 2.1-2.1z" />
                  </svg>
                </button>
                <input
                  className="rk-vol"
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolume}
                  aria-label="Volume"
                  style={{ "--fill": `${volFill}%` } as React.CSSProperties}
                />
              </div>
              <button className="rk-icon rk-share" onClick={handleShare} aria-label="Partager">
                <svg viewBox="0 0 24 24">
                  <path d="M18 16a3 3 0 0 0-2.2 1l-7-4a3 3 0 0 0 0-2l7-4A3 3 0 1 0 15 5l-7 4a3 3 0 1 0 0 6l7 4A3 3 0 1 0 18 16z" />
                </svg>
              </button>
              <button
                className="rk-icon rk-popup"
                onClick={openPlayer}
                aria-label="Agrandir le lecteur"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M4 4h6v2H7.4l3.3 3.3-1.4 1.4L6 7.4V10H4V4zm10 0h6v6h-2V7.4l-3.3 3.3-1.4-1.4L16.6 6H14V4zM4 14h2v2.6l3.3-3.3 1.4 1.4L7.4 18H10v2H4v-6zm14 0h2v6h-6v-2h2.6l-3.3-3.3 1.4-1.4 3.3 3.3V14z" />
                </svg>
              </button>
            </div>

            <audio ref={audioRef} preload="none" />
          </div>
        </div>
      </div>

      {/* Modal lecteur — ouvrable depuis n'importe quelle route via le store */}
      {storePlayerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-card border border-border shadow-2xl p-4 sm:p-6 overflow-hidden rounded-none">
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-border rounded-none">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <img
                  src={RYF_ASSETS.logo}
                  alt="RYF Logo"
                  className="w-9 h-9 sm:w-10 sm:h-10 object-contain"
                />
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-foreground leading-tight">
                    RYF RADIO • LE DIRECT
                  </h3>
                  <p className="text-[11px] sm:text-xs text-primary font-semibold">
                    Flux Audio Officiel RadioKing • Le Top du Divertissement
                  </p>
                </div>
              </div>
              <button
                onClick={closePlayer}
                className="p-1.5 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors rounded-none"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="py-4 sm:py-6 flex flex-col items-center justify-center gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={RYF_ASSETS.logo}
                  alt="RYF Radio"
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain bg-white p-2 rounded-none"
                />
                <button
                  onClick={handlePlayPause}
                  aria-label={isPlaying ? "Pause" : "Lecture"}
                  className="grid place-items-center w-14 h-14 sm:w-16 sm:h-16 bg-primary text-white border-0 cursor-pointer hover:bg-primary/90 transition-colors rounded-full"
                >
                  {isLoading ? (
                    <Loader2 className="w-7 h-7 animate-spin" />
                  ) : isPlaying ? (
                    <Pause className="w-7 h-7 fill-current" />
                  ) : (
                    <Play className="w-7 h-7 fill-current ml-0.5" />
                  )}
                </button>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground">
                  Vous écoutez le flux officiel en direct de{" "}
                  <strong className="text-foreground">RYF Radio</strong>.
                </div>
                <div className="text-[11px] text-primary mt-1 font-semibold truncate max-w-[360px]">
                  {trackTitle}
                </div>
              </div>
            </div>
            <div className="pt-3 border-t border-border flex items-center justify-center gap-2 text-xs rounded-none">
              <button
                onClick={closePlayer}
                className="w-full px-3.5 py-1.5 bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/90 rounded-none"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
