import React, { useState, useEffect } from "react";
import { RYF_CONTACTS, RYF_ASSETS } from "@/lib/ryf-data";
import { X, Calendar } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

interface LivePlayerBarProps {
  onOpenSchedule: () => void;
  isOpenModal: boolean;
  setIsOpenModal: (open: boolean) => void;
}

export const LivePlayerBar: React.FC<LivePlayerBarProps> = ({
  onOpenSchedule,
  isOpenModal,
  setIsOpenModal,
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Pick the right RadioKing source so elements stay visible on every screen.
  // Mobile keeps the compact layout (already good); desktop uses a taller one
  // so the play icon, volume and scrolling title are all readable.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const playerSrc = isDesktop ? RYF_CONTACTS.radioKingIframeDesktop : RYF_CONTACTS.radioKingIframe;

  return (
    <>
      {/* Sticky Bottom Player Bar (Modern Broadcast Deck) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-ryf-navy text-white border-t border-accent/30 shadow-2xl">
        {/* Toggle Minimize Handle — always visible */}
        <div className="bg-primary/90 px-4 py-1 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-white">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-accent">EN DIRECT</span>
            <span className="hidden sm:inline-block opacity-70">|</span>
            <span className="hidden sm:inline-block">RYF RADIO • LE TOP DU DIVERTISSEMENT</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSchedule}
              className="text-white hover:text-accent flex items-center gap-1 transition-colors"
            >
              <Calendar className="w-3 h-3 text-accent" />
              <span className="hidden xs:inline">Grille</span>
            </button>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:text-accent underline transition-colors"
            >
              {isMinimized ? "▲ AFFICHER LE LECTEUR" : "▼ RÉDUIRE"}
            </button>
          </div>
        </div>

        {/* RadioKing Official Player Embed
            The iframe stays mounted when minimized so the audio keeps streaming;
            only its height collapses to 0 so the player is fully hidden and only
            the handle bar remains. */}
        <div
          className={`w-full overflow-hidden transition-all duration-300 ${
            isMinimized ? "max-h-0" : "max-h-32"
          }`}
        >
          <div className="h-14 sm:h-20 w-full">
            <iframe
              src={playerSrc}
              title="RYF Radio Player RadioKing"
              className="w-full h-full"
              style={{ borderRadius: "0", display: "block" }}
              frameBorder="0"
            />
          </div>
        </div>
      </div>

      {/* RadioKing Player Modal with official iframe */}
      {isOpenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-card rounded-2xl border border-border shadow-2xl p-6 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <img src={RYF_ASSETS.logo} alt="RYF Logo" className="w-10 h-10 object-contain" />
                <div>
                  <h3 className="font-extrabold text-base text-foreground leading-tight">
                    RYF RADIO • LE DIRECT
                  </h3>
                  <p className="text-xs text-primary font-semibold">
                    Flux Audio Officiel RadioKing • Le Top du Divertissement
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpenModal(false)}
                className="p-1.5 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* RadioKing Official Player Embed */}
            <div className="py-6 flex flex-col items-center justify-center">
              <div className="w-full max-w-[470px] bg-slate-900 p-2 shadow-inner border border-accent/20 flex justify-center">
                <iframe
                  src={RYF_CONTACTS.radioKingIframeModal}
                  title="RYF Radio Player RadioKing"
                  style={{
                    width: "100%",
                    maxWidth: "470px",
                    height: "145px",
                    borderRadius: "0",
                  }}
                  frameBorder="0"
                />
              </div>

              <div className="mt-4 text-center">
                <p className="text-xs text-muted-foreground">
                  Vous écoutez le flux officiel en direct de{" "}
                  <strong className="text-foreground">RYF Radio</strong>.
                </p>
                <p className="text-[11px] text-primary mt-1 font-semibold">
                  « Plus qu'une radio, une communauté ! La culture nous rassemble ! »
                </p>
              </div>
            </div>

            {/* Footer with actions */}
            <div className="pt-3 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
              <span className="text-muted-foreground inline-flex items-center gap-1.5">
                <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-600" />
                WhatsApp Studio :{" "}
                <a
                  href={RYF_CONTACTS.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-bold hover:underline"
                >
                  {RYF_CONTACTS.whatsapp}
                </a>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsOpenModal(false);
                    onOpenSchedule();
                  }}
                  className="px-3 py-1.5 rounded-md border border-border text-foreground hover:bg-secondary text-xs font-semibold"
                >
                  Consulter la grille
                </button>
                <button
                  onClick={() => setIsOpenModal(false)}
                  className="px-3.5 py-1.5 rounded-md bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/90"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
