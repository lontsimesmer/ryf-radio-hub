import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { UniversSection } from "@/components/UniversSection";
import { AboutSection } from "@/components/AboutSection";
import { PartenairesSection } from "@/components/PartenairesSection";
import { NewsAndAgendaSection } from "@/components/NewsAndAgendaSection";
import { PubSection } from "@/components/PubSection";
import { ProgrammesAndMediaSection } from "@/components/ProgrammesAndMediaSection";
import { EquipeSection } from "@/components/EquipeSection";
import { RealisationsAndCommunitySection } from "@/components/RealisationsAndCommunitySection";
import { FooterAndModals } from "@/components/FooterAndModals";
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
          "Détendez-vous et profitez de la musique, vous êtes sur RYF RADIO. Écoutez en direct 24h/24 le meilleur de la musique et de la culture africaine.",
      },
      {
        property: "og:title",
        content: "RYF Radio • Le Top du Divertissement !",
      },
      {
        property: "og:description",
        content:
          "Détendez-vous et profitez de la musique, vous êtes sur RYF RADIO. Musique, culture, interviews et direct 24h/24.",
      },
      {
        property: "og:image",
        content:
          "https://vibe.filesafe.space/1791205471365853905/attachments/b31a22ea-92d2-4d2c-9c4a-cc23245d33b9.jpg",
      },
      {
        property: "og:image:width",
        content: "1200",
      },
      {
        property: "og:image:height",
        content: "675",
      },
      {
        property: "og:image:alt",
        content: "RYF Radio • Le Top du Divertissement !",
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
        name: "twitter:title",
        content: "RYF Radio • Le Top du Divertissement !",
      },
      {
        name: "twitter:description",
        content: "Détendez-vous et profitez de la musique, vous êtes sur RYF RADIO.",
      },
      {
        name: "twitter:image",
        content:
          "https://vibe.filesafe.space/1791205471365853905/attachments/b31a22ea-92d2-4d2c-9c4a-cc23245d33b9.jpg",
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
  return (
    <div className="min-h-screen max-w-full overflow-x-clip bg-background text-foreground flex flex-col selection:bg-accent/30 selection:text-foreground">
      {/* Toast notifications */}
      <Toaster position="top-right" richColors />

      {/* Main Header / Navigation */}
      <Header />

      {/* Page Content ordered strictly according to instructions */}
      <main className="flex-1 pb-20 sm:pb-28 bg-white">
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Actualités (Horizontal auto-scrolling line) */}
        <UniversSection />

        {/* 3. À Propos (Image 1 background blurry/dark, horizontal blocks: Notre concept, Nos missions, etc.) */}
        <AboutSection />

        {/* 4. Agenda Culturel (Image 3 underneath title + rotating agenda banners) */}
        <NewsAndAgendaSection />

        {/* 4.1. Espace Publicitaire Partenaire : Chouquette by Osiera */}
        <PubSection />

        {/* 5. Nos Programmes (Image 4 + Grille des chroniques 06H00-18H00) + Vidéos YouTube en continu + Podcasts */}
        <ProgrammesAndMediaSection />

        {/* 6. Notre Équipe */}
        <EquipeSection />

        {/* 7. Rejoignez la Communauté */}
        <RealisationsAndCommunitySection />

        {/* 8. Nos Partenaires */}
        <PartenairesSection />
      </main>

      {/* 9. Footer officiel (Contacts en premier avec icônes: WhatsApp, Yaoundé, email + rubriques de la barre de navigation) */}
      <FooterAndModals />

      {/* Live player is mounted once at the root route (see __root.tsx) so it
          keeps playing across navigations. */}
    </div>
  );
}
