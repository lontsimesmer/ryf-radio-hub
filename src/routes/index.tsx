import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { UniversSection } from "@/components/UniversSection";
import { AboutSection } from "@/components/AboutSection";
import { PartenairesSection } from "@/components/PartenairesSection";
import { NewsAndAgendaSection } from "@/components/NewsAndAgendaSection";
import { ProgrammesAndMediaSection } from "@/components/ProgrammesAndMediaSection";
import { EquipeSection } from "@/components/EquipeSection";
import { RealisationsAndCommunitySection } from "@/components/RealisationsAndCommunitySection";
import { FooterAndModals } from "@/components/FooterAndModals";
import { LivePlayerBar } from "@/components/LivePlayerBar";
import { Toaster } from "@/components/ui/sonner";
import { RYF_ASSETS } from "@/lib/ryf-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "RYF Radio, Le Top du Divertissement | Musique & Culture",
      },
      {
        name: "description",
        content:
          "RYF Radio (Rythmes & Folies) : La radio digitale du divertissement, de la musique camerounaise et africaine, de la culture et des événements en direct.",
      },
      {
        property: "og:title",
        content: "RYF Radio, Le Top du Divertissement | Musique & Culture",
      },
      {
        property: "og:description",
        content:
          "« Plus qu'une radio, une communauté ! » Écoutez en direct 24h/24 le meilleur de la musique et de la culture camerounaise et africaine.",
      },
      {
        property: "og:image",
        content: RYF_ASSETS.heroCrowd,
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:image",
        content: RYF_ASSETS.heroCrowd,
      },
    ],
    links: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "any",
        href: RYF_ASSETS.favicon,
      },
      {
        rel: "shortcut icon",
        type: "image/png",
        sizes: "any",
        href: RYF_ASSETS.favicon,
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: RYF_ASSETS.favicon,
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [playerModalOpen, setPlayerModalOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);

  return (
    <div className="min-h-screen max-w-full overflow-x-clip bg-background text-foreground flex flex-col selection:bg-accent/30 selection:text-foreground">
      {/* Toast notifications */}
      <Toaster position="top-right" richColors />

      {/* Main Header / Navigation */}
      <Header
        onOpenPlayer={() => setPlayerModalOpen(true)}
        onOpenSchedule={() => setScheduleModalOpen(true)}
      />

      {/* Page Content ordered strictly according to instructions */}
      <main className="flex-1 pb-20 sm:pb-28 bg-white">
        {/* 1. Hero */}
        <HeroSection
          onOpenPlayer={() => setPlayerModalOpen(true)}
          onOpenSchedule={() => setScheduleModalOpen(true)}
        />

        {/* 2. Actualités (Horizontal auto-scrolling line) */}
        <UniversSection />

        {/* 3. À Propos (Image 1 background blurry/dark, horizontal blocks: Notre concept, Nos missions, etc.) */}
        <AboutSection />

        {/* 4. Agenda Culturel (Image 3 underneath title + rotating agenda banners) */}
        <NewsAndAgendaSection />

        {/* 5. Nos Programmes (Image 4 + Grille des chroniques 06H00-18H00) + Vidéos YouTube en continu + Podcasts */}
        <ProgrammesAndMediaSection
          onOpenPlayer={() => setPlayerModalOpen(true)}
          onOpenSchedule={() => setScheduleModalOpen(true)}
        />

        {/* 6. Notre Équipe */}
        <EquipeSection />

        {/* 7. Rejoignez la Communauté */}
        <RealisationsAndCommunitySection />

        {/* 8. Nos Partenaires */}
        <PartenairesSection />
      </main>

      {/* 9. Footer officiel (Contacts en premier avec icônes: WhatsApp, Yaoundé, email + rubriques de la barre de navigation) */}
      <FooterAndModals
        scheduleOpen={scheduleModalOpen}
        setScheduleOpen={setScheduleModalOpen}
        onOpenPlayer={() => setPlayerModalOpen(true)}
      />

      {/* Sticky Bottom Broadcast Player Deck */}
      <LivePlayerBar
        onOpenSchedule={() => setScheduleModalOpen(true)}
        isOpenModal={playerModalOpen}
        setIsOpenModal={setPlayerModalOpen}
      />
    </div>
  );
}
