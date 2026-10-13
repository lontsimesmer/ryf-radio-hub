import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { RYF_ASSETS, RYF_CONTACTS } from "@/lib/ryf-data";
import { playerStore } from "@/lib/player-store";
import {
  Phone,
  Radio,
  Menu,
  X,
  Search,
  MapPin,
  Calendar,
  ChevronDown,
  Newspaper,
  Mic,
  PlayCircle,
  CalendarDays,
  Users,
  type LucideIcon,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { SearchDrawer } from "@/components/SearchDrawer";

interface HeaderProps {
  onOpenSchedule?: () => void;
}

interface NavSubItem {
  label: string;
  href?: string;
  to?: string;
  description: string;
  icon: LucideIcon;
}
interface NavLinkItem {
  type: "link";
  label: string;
  href?: string;
  to?: string;
}
interface NavMegaItem {
  type: "mega";
  label: string;
  items: NavSubItem[];
}
type NavEntry = NavLinkItem | NavMegaItem;

// Navigation adaptée aux sections réelles de la page.
// Les sections disposant d'une page dédiée (À Propos, Actualités) naviguent
// via une route TanStack ; les autres restent des ancres (#) de la page d'accueil.
const navConfig: NavEntry[] = [
  { type: "link", label: "ACCUEIL", href: "#hero" },
  { type: "link", label: "À PROPOS", to: "/a-propos" },
  {
    type: "mega",
    label: "MÉDIAS",
    items: [
      {
        label: "ACTUALITÉS",
        to: "/actualites",
        description: "L'actualité culturelle, musicale & de société",
        icon: Newspaper,
      },
      {
        label: "PODCASTS",
        href: "#podcasts",
        description: "Réécoutez nos émissions en replay",
        icon: Mic,
      },
      {
        label: "VIDÉOS",
        href: "#videos",
        description: "Nos lives & reportages exclusifs",
        icon: PlayCircle,
      },
    ],
  },
  {
    type: "mega",
    label: "CULTURE",
    items: [
      {
        label: "AGENDA CULTUREL",
        href: "#agenda",
        description: "Événements culturels au Cameroun & en Afrique",
        icon: CalendarDays,
      },
      {
        label: "PROGRAMMES",
        href: "#programmes",
        description: "La grille des émissions de la semaine",
        icon: Radio,
      },
      {
        label: "ÉQUIPE",
        href: "#equipe",
        description: "Les voix & visages de RYF Radio",
        icon: Users,
      },
    ],
  },
  { type: "link", label: "CONTACT", href: "#contact" },
];

export const Header: React.FC<HeaderProps> = ({ onOpenSchedule }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const openSchedule = onOpenSchedule ?? (() => playerStore.openSchedule());

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md shadow-xs border-b border-border/70 transition-all">
      {/* Top bar info */}
      <div className="bg-primary text-primary-foreground text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          {/* Left: slogan & city */}
          <div className="flex items-center gap-3 font-medium">
            <span className="flex items-center gap-1 opacity-90">
              <MapPin className="w-3.5 h-3.5 text-accent" />
              Yaoundé - Cameroun
            </span>
            <span className="hidden md:inline-block opacity-40">•</span>
            <span className="hidden md:inline-block tracking-wide font-semibold text-accent">
              Rythme &amp; Folie Radio
            </span>
          </div>

          {/* Right: phone, whatsapp & socials */}
          <div className="flex items-center gap-4">
            <a
              href="tel:+237656736000"
              className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
            >
              <Phone className="w-3 h-3 text-accent" />
              <span>+237 675 374 430</span>
            </a>
            <span className="opacity-40">|</span>
            <a
              href={RYF_CONTACTS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 hover:text-accent transition-colors text-white font-medium"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-accent" />
              <span>+237 656 73 60 00</span>
            </a>

            {/* Quick social links */}
            <div className="flex items-center gap-2.5 pl-2">
              <a
                href={RYF_CONTACTS.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook RYF"
                className="hover:scale-110 transition-transform opacity-90 hover:opacity-100"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.326V1.326C24 .597 23.405 0 22.675 0z" />
                </svg>
              </a>
              <a
                href={RYF_CONTACTS.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram RYF"
                className="hover:scale-110 transition-transform opacity-90 hover:opacity-100"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={RYF_CONTACTS.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube RYF"
                className="hover:scale-110 transition-transform opacity-90 hover:opacity-100"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href={RYF_CONTACTS.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok RYF"
                className="hover:scale-110 transition-transform opacity-90 hover:opacity-100"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.02 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-2.5 group shrink-0">
          <img
            src={RYF_ASSETS.logo}
            alt="RYF Radio - Rythmes & Folies"
            className="h-10 md:h-12 w-auto object-contain drop-shadow-xs transition-transform group-hover:scale-105"
          />
          <div className="hidden sm:flex flex-col">
            <span className="font-extrabold text-base md:text-lg tracking-tight text-foreground leading-none">
              RYF <span className="text-primary font-black">RADIO</span>
            </span>
            <span className="text-[8px] uppercase font-bold tracking-widest text-muted-foreground mt-0.5">
              Le Top du Divertissement
            </span>
          </div>
        </a>

        {/* Desktop Nav Items (reduced + mega-menus) */}
        <nav className="hidden xl:flex items-center gap-0.5 font-semibold text-xs text-foreground/80">
          {navConfig.map((entry) =>
            entry.type === "link" ? (
              entry.to ? (
                <Link
                  key={entry.label}
                  to={entry.to}
                  className="group/nav relative inline-flex items-center px-2.5 py-1.5 rounded-md text-foreground/80 hover:text-primary transition-colors"
                >
                  <span>{entry.label}</span>
                  <span className="pointer-events-none absolute left-2.5 right-2.5 -bottom-0.5 h-[3px] scale-x-0 origin-left rounded-full bg-accent transition-transform duration-300 ease-out group-hover/nav:scale-x-100" />
                </Link>
              ) : (
                <a
                  key={entry.label}
                  href={entry.href}
                  className="group/nav relative inline-flex items-center px-2.5 py-1.5 rounded-md text-foreground/80 hover:text-primary transition-colors"
                >
                  <span>{entry.label}</span>
                  <span className="pointer-events-none absolute left-2.5 right-2.5 -bottom-0.5 h-[3px] scale-x-0 origin-left rounded-full bg-accent transition-transform duration-300 ease-out group-hover/nav:scale-x-100" />
                </a>
              )
            ) : (
              <div key={entry.label} className="group/mega relative">
                <button
                  type="button"
                  className="group/nav relative inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-foreground/80 hover:text-primary transition-colors"
                >
                  <span>{entry.label}</span>
                  <ChevronDown className="w-3 h-3 text-foreground/50 transition-transform duration-300 group-hover/mega:rotate-180" />
                  <span className="pointer-events-none absolute left-2.5 right-2.5 -bottom-0.5 h-[3px] scale-x-0 origin-left rounded-full bg-accent transition-transform duration-300 ease-out group-hover/mega:scale-x-100" />
                </button>

                {/* Mega panel */}
                <div className="invisible absolute left-1/2 top-full z-50 w-[22rem] -translate-x-1/2 translate-y-1 pt-2 opacity-0 transition-all duration-200 group-hover/mega:visible group-hover/mega:translate-y-0 group-hover/mega:opacity-100">
                  <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
                    <div className="flex items-center gap-2 bg-primary px-4 py-2.5">
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary-foreground">
                        {entry.label}
                      </span>
                      <span className="text-[10px] font-medium text-primary-foreground/70">
                        • Explorez l'univers RYF
                      </span>
                    </div>
                    <div className="p-2">
                      {entry.items.map((sub) => {
                        const Icon = sub.icon;
                        const inner = (
                          <span className="group/sub flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-secondary">
                            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover/sub:bg-primary group-hover/sub:text-primary-foreground">
                              <Icon className="h-4 w-4" />
                            </span>
                            <span className="flex flex-col">
                              <span className="text-sm font-bold text-foreground">{sub.label}</span>
                              <span className="text-xs text-muted-foreground">
                                {sub.description}
                              </span>
                            </span>
                          </span>
                        );
                        return sub.to ? (
                          <Link key={sub.label} to={sub.to}>
                            {inner}
                          </Link>
                        ) : (
                          <a key={sub.label} href={sub.href}>
                            {inner}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ),
          )}
        </nav>

        {/* Action button & Mobile Trigger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Schedule button */}
          <button
            onClick={openSchedule}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-foreground text-xs font-semibold hover:bg-secondary transition-colors shadow-2xs"
            title="Consulter la grille des programmes"
          >
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <span>Grille</span>
          </button>

          {/* Search Trigger */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 rounded-lg text-foreground hover:bg-secondary hover:text-primary transition-colors"
            aria-label="Recherche sur le site"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-foreground hover:bg-secondary focus:outline-hidden"
            aria-label="Ouvrir le menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Search Drawer across entire site */}
      <SearchDrawer isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-border bg-card px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-0.5 text-sm font-semibold">
            {navConfig.map((entry) =>
              entry.type === "link" ? (
                entry.to ? (
                  <Link
                    key={entry.label}
                    to={entry.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-foreground hover:bg-secondary hover:text-primary transition-colors"
                  >
                    {entry.label}
                  </Link>
                ) : (
                  <a
                    key={entry.label}
                    href={entry.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-foreground hover:bg-secondary hover:text-primary transition-colors"
                  >
                    {entry.label}
                  </a>
                )
              ) : (
                <div key={entry.label} className="flex flex-col">
                  <div className="flex items-center gap-2 px-3 pt-3 pb-1 text-[11px] font-black uppercase tracking-widest text-primary">
                    <ChevronDown className="w-3.5 h-3.5 rotate-[-90deg]" />
                    {entry.label}
                  </div>
                  <div className="flex flex-col gap-0.5 pl-2">
                    {entry.items.map((sub) => {
                      const Icon = sub.icon;
                      const inner = (
                        <span className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground/90 hover:bg-secondary hover:text-primary transition-colors">
                          <Icon className="h-4 w-4 text-primary" />
                          {sub.label}
                        </span>
                      );
                      return sub.to ? (
                        <Link key={sub.label} to={sub.to} onClick={() => setMobileMenuOpen(false)}>
                          {inner}
                        </Link>
                      ) : (
                        <a key={sub.label} href={sub.href} onClick={() => setMobileMenuOpen(false)}>
                          {inner}
                        </a>
                      );
                    })}
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      )}
    </header>
  );
};
