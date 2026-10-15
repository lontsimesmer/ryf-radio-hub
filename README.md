<div align="center">
  <img src="https://vibe.filesafe.space/1791205471365853905/attachments/2a76cd87-a12d-4249-80ab-ccef7c12d9e2.jpg" alt="RYF Radio, Le Top du Divertissement" width="100%" />
</div>

<br/>

# 🎙️ RYF Radio · *Rythmes & Folies*

> **Le Top du Divertissement.** Web radio d'actualité culturelle, musique et divertissement, au cœur du Cameroun, de l'Afrique et au-delà.

**Domaine officiel :** [https://www.ryfradio.co](https://www.ryfradio.co)

---

## 📖 Sommaire

1. [Présentation du projet](#-présentation-du-projet)
2. [Fonctionnalités principales](#-fonctionnalités-principales)
3. [Architecture & Stack technique](#-architecture--stack-technique)
4. [Structure du code](#-structure-du-code)
5. [Pages & Routes](#-pages--routes)
6. [Sections de la page d'accueil](#-sections-de-la-page-daccueil)
7. [Système de design](#-système-de-design)
8. [Lecteur audio en direct](#-lecteur-audio-en-direct)
9. [Recherche & Navigation](#-recherche--navigation)
10. [Formulaire de contact & Suivi](#-formulaire-de-contact--suivi)
11. [SEO & Partage social](#-seo--partage-social)
12. [Développement local](#-développement-local)
13. [Déploiement](#-déploiement)
14. [Données & Contenus](#-données--contenus)
15. [Licence](#-licence)

---

## 🎯 Présentation du projet

**RYF Radio** (*Rythmes & Folies*) est une plateforme digitale de radio web dédiée à la culture, à la musique et au divertissement africain. Basée à Yaoundé (Cameroun), elle diffuse en direct 24h/24 et propose un riche contenu éditorial : actualités culturelles, interviews d'artistes, retransmissions d'événements, podcasts, vidéos et une programmation musicale variée.

### Notre mission

> Promouvoir notre culture, mettre en lumière les talents, couvrir les événements culturels et produire des contenus d'exception, accessibles au Cameroun, en Afrique et au-delà de nos frontières.

### Valeurs

- 🌍 **Rayonnement culturel.** Valoriser la culture camerounaise, africaine et mondiale
- 🎤 **Découverte des talents.** Donner la parole aux artistes et créateurs
- 📡 **Couverture & Retransmission.** Être présent sur tous les rendez-vous culturels
- 🎬 **Production de contenus.** Concevoir des formats éditoriaux et audiovisuels d'exception

---

## ✨ Fonctionnalités principales

| Fonction | Description |
|---|---|
| 🎵 **Lecteur en direct** | Barre de lecture persistante (RadioKing) qui continue de jouer même lors de la navigation entre les pages, avec titre en défilement (marquee), contrôle du volume et modal d'écoute |
| 📰 **Actualités culturelles** | Carrousel horizontal auto-scroll des dernières news (musique, culture, événements, société) avec effet *center-focus* sur l'élément du milieu et page dédiée pour les articles complets |
| 📅 **Agenda culturel** | Événements culturels à venir au Cameroun et en Afrique (Ngouon, Ngondo, École des Pluies) avec liens externes vers les sources officielles |
| 📺 **Espace publicitaire** | Carrousel multi-sponsors avec animations d'agrandissement au scroll, boutons de partage WhatsApp et CTA *Devenir annonceur* |
| 🎬 **Programmes & Grille** | Grille des émissions hebdomadaires (06H à 18H), podcasts et vidéos YouTube en continu |
| 👥 **Notre équipe** | Présentation des animateurs et collaborateurs (correspondants à l'étranger) avec alternance et portraits en cadre premium |
| 🤝 **Partenaires** | Logos des partenaires officiels avec défilement horizontal auto |
| 🏆 **Réalisations** | Couvertures, interviews, reportages et retransmissions passées |
| 💬 **Échange & Contact** | Formulaire de contact avec upload de documents (dossier de presse, brief, audio) et suivi de conversion |
| 🔍 **Recherche** | Drawer de recherche intelligent avec filtres par catégorie et suggestions contextuelles sur tout le site |
| 📱 **100 % Responsive** | Design mobile-first optimisé pour tous les écrans, y compris les très petits |

---

## 🏗️ Architecture & Stack technique

| Technologie | Rôle |
|---|---|
| **TanStack Start v1** | Framework full-stack React 19 (SSR/SSG) |
| **TanStack Router** | Routing file-based avec types auto-générés |
| **React 19** | UI library |
| **TypeScript** | Typage statique strict |
| **Vite 8** | Build tool & dev server |
| **Tailwind CSS v4** | Styling via `src/styles.css` (thème natif `@theme`, tokens `oklch`) |
| **shadcn/ui** | Composants UI accessibles (Radix UI primitives) |
| **lucide-react** | Icônes |
| **sonner** | Toast notifications |
| **RadioKing API** | Flux audio en direct & métadonnées du morceau en cours |

> ⚠️ **Note sur le runtime.** Le projet cible un environnement Edge (Cloudflare Workers). Toute la logique serveur utilise `createServerFn` (TanStack Start), jamais d'Edge Functions tierces.

---

## 📁 Structure du code

```
src/
├── routes/                      # Routes TanStack (file-based)
│   ├── __root.tsx               # Layout racine + <Outlet> + lecteur persistant
│   ├── index.tsx               # Page d'accueil ("/")
│   ├── a-propos.tsx             # Page À Propos détaillée ("/a-propos")
│   └── actualites.tsx           # Page Actualités & articles ("/actualites")
│
├── components/                  # Composants UI
│   ├── Header.tsx               # Navigation + mega-menus + recherche + menu mobile
│   ├── HeroSection.tsx          # Hero plein écran (background image desktop/mobile)
│   ├── UniversSection.tsx       # Actualités, carrousel horizontal auto-scroll
│   ├── AboutSection.tsx         # À Propos, blocs images avec hover (redirige vers /a-propos)
│   ├── NewsAndAgendaSection.tsx # Agenda culturel, carrousel + liens externes
│   ├── PubSection.tsx           # Espace publicitaire, carrousel sponsors
│   ├── ProgrammesAndMediaSection.tsx # Programmes, podcasts & vidéos YouTube
│   ├── EquipeSection.tsx        # Notre équipe, animateurs & collaborateurs alternés
│   ├── RealisationsAndCommunitySection.tsx # Réalisations + communauté RYF
│   ├── PartenairesSection.tsx   # Nos partenaires, logos auto-scroll
│   ├── FooterAndModals.tsx      # Contact, footer, modale grille hebdo
│   ├── LivePlayerBar.tsx        # Barre de lecture RadioKing persistante
│   ├── SearchDrawer.tsx         # Recherche globale avec filtres & suggestions
│   ├── WhatsAppIcon.tsx         # Icône WhatsApp réutilisable
│   └── ui/                      # Composants shadcn (60+ primitives)
│
├── lib/                         # Logique & données
│   ├── ryf-data.ts              # Toutes les données du site (news, agenda, programmes, etc.)
│   ├── team-data.ts             # Membres de l'équipe (animateurs & collaborateurs)
│   ├── player-store.ts         # Store global du lecteur (play/pause, modal, grille)
│   ├── utils.ts                 # Utilitaires (cn, formatters)
│   ├── error-capture.ts         # Capture d'erreurs
│   ├── error-page.ts           # Page d'erreur
│   └── vibe-error-reporting.ts  # Reporting d'erreurs
│
├── hooks/
│   └── use-mobile.tsx           # Hook de détection mobile
│
├── styles.css                   # Thème Tailwind v4 (tokens oklch, couleurs RYF)
├── start.ts                     # Configuration TanStack Start
├── server.ts                    # Configuration serveur
└── router.tsx                   # Router principal (routeTree généré)
```

---

## 🗺️ Pages & Routes

| Route | Fichier | Description |
|---|---|---|
| `/` | `src/routes/index.tsx` | Page d'accueil, toutes les sections |
| `/a-propos` | `src/routes/a-propos.tsx` | Page À Propos détaillée (concept, contexte, missions, offres, cibles, réalisations) |
| `/actualites` | `src/routes/actualites.tsx` | Page Actualités, liste des articles complets |

> 📌 **`routeTree.gen.ts`** est généré automatiquement par TanStack Router, ne jamais le modifier manuellement.

---

## 🏠 Sections de la page d'accueil

La page d'accueil (`/`) affiche les sections dans cet ordre précis :

1. **Hero.** Image plein écran avec slogan
2. **Actualités.** Carrousel horizontal auto-scroll (3 news) avec effet *center-focus*
3. **À Propos.** Blocs images avec description au hover, redirige vers `/a-propos`
4. **Agenda Culturel.** Carrousel d'événements avec liens externes (Ngouon, École des Pluies, Ngondo)
5. **Espace Publicitaire.** Carrousel multi-sponsors (Chouquette by Osiera)
6. **Nos Programmes.** Grille des émissions + Vidéos YouTube + Podcasts
7. **Notre Équipe.** Animateurs & collaborateurs alternés
8. **Rejoignez la Communauté.** CTA avec image background
9. **Nos Partenaires.** Logos en défilement horizontal auto
10. **Footer & Contact.** Formulaire de contact avec upload + liens

---

## 🎨 Système de design

Le thème est défini dans `src/styles.css` avec des tokens en **`oklch()`** :

### Couleurs de marque RYF

| Token | Valeur | Usage |
|---|---|---|
| `--primary` | `oklch(0.55 0.2 250)` | Bleu électrique RYF (#1e7fcb) |
| `--accent` | `oklch(0.68 0.16 230)` | Cyan (#23b2ee) |
| `--ryf-navy` | `oklch(0.2 0.07 258)` | Bleu nuit (#0d1e3d) |
| `--ryf-dark` | `oklch(0.14 0.05 260)` | Fond sombre (#071124) |

### Typographie

| Police | Usage |
|---|---|
| **Montserrat** (600 à 900) | Titres & en-têtes (display) |
| **Inter** (400 à 700) | Corps de texte (sans-serif) |

### Principes

- **Tokens sémantiques.** `--background`, `--foreground`, `--primary`, `--accent`, etc.
- **Angles droits.** La plupart des composants utilisent `rounded-none` (style brutaliste éditorial)
- **Mobile-first.** Breakpoints Tailwind (`sm`, `md`, `lg`, `xl`)
- **En-têtes uniformisés.** Même taille et centrage sur toutes les sections, 2e mot en couleur d'accent

---

## 🎵 Lecteur audio en direct

La barre de lecture (`LivePlayerBar.tsx`) est **montée une seule fois au niveau de la route racine** (`__root.tsx`) via `<LivePlayerBar />`, ce qui permet au flux de **continuer à jouer** même quand l'utilisateur navigue entre les pages.

### Caractéristiques

- **Flux RadioKing.** `https://listen.radioking.com/radio/445556/stream/500072`
- **API métadonnées.** `https://api.radioking.io/widget/radio/ryf-radio2/track/current` (titre, artiste, pochette, rafraîchi toutes les 30s)
- **Logo statique RYF.** La pochette ne change pas dynamiquement, le logo RYF reste fixe
- **Titre défilant (marquee).** Les longs titres défilent horizontalement en lecture, sur tous les écrans
- **Contrôles.** play/pause, volume (slider), mute, agrandir (modal), partager
- **Modal d'écoute.** Bouton « ÉCOUTER EN DIRECT » ouvre le lecteur RadioKing en modal sur la page
- **Store global** (`player-store.ts`). État partagé entre la barre et les autres composants (schedule, modal)
- **Responsive.** Volume masqué sur très petit écran, icônes compactées, cover adaptée

---

## 🔍 Recherche & Navigation

### Header (`Header.tsx`)

- **Barre de navigation desktop** avec 5 entrées : Accueil, À Propos, MÉDIAS (mega-menu), CULTURE (mega-menu), Contact
- **Mega-menus.** MÉDIAS (Actualités → `/actualites`, Podcasts, Vidéos) et CULTURE (Agenda, Programmes, Équipe)
- **Menu mobile.** Drawer dépliant avec sous-menus repliables
- **Bouton « Grille ».** Ouvre la grille hebdomadaire des programmes en modal
- **Top bar.** Ville (Yaoundé), téléphone, WhatsApp, réseaux sociaux (Facebook, Instagram, YouTube, TikTok)

### Recherche (`SearchDrawer.tsx`)

- **Indexation.** Tous les en-têtes de section, titres et mots de toutes les sections du site
- **Filtres par catégorie.** Actualités, Agenda, Programmes, Podcasts, Vidéos, Réalisations, Équipe, Partenaires
- **Suggestions contextuelles.** Le filtre propose les suggestions correspondant à la catégorie sélectionnée
- **Mini-dropdown horizontal.** Les filtres sont disposés horizontalement dans un menu déroulant compact

---

## 📬 Formulaire de contact & Suivi

Le formulaire (`FooterAndModals.tsx`) permet aux annonceurs, artistes et partenaires de :

- Saisir leur **nom/entreprise** et **email**
- Choisir un **objet** (Campagne pub, Partenariat, Interview, Dossier de presse, Autre)
- **Télécharger un document** (PDF, DOCX, MP3, PNG, JPG, max 50 Mo) via zone drag-and-drop

### Suivi de conversion

Les soumissions sont trackées via l'endpoint de suivi externe (`backend.leadconnectorhq.com`) avec :
- Un `trackingId` et `locationId` dédiés au projet
- Les données du formulaire (nom, email)
- Le fichier joint (envoyé en multipart/form-data)
- Métadonnées : user agent, device type, source, URL, sessionId

---

## 📊 SEO & Partage social

| Élément | Valeur |
|---|---|
| **Title** | `RYF Radio · Le Top du Divertissement !` |
| **Domaine canonique** | `https://www.ryfradio.co` |
| **og:url** | `https://www.ryfradio.co/` (root) + routes dédiées |
| **og:image** | Affiche officielle RYF Radio (1200×675) |
| **twitter:card** | `summary_large_image` |
| **Favicon** | Badge carré officiel RYF |
| **Lang** | `fr` |

Chaque route (`__root.tsx`, `index.tsx`, `a-propos.tsx`, `actualites.tsx`) possède son propre `head()` avec :
- Titre unique
- Description unique
- `og:title`, `og:description`, `og:type`, `og:url`, `og:site_name`
- `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- Lien `canonical` vers `https://www.ryfradio.co/<route>`

---

## 🚀 Développement local

### Prérequis

- **Node.js** ≥ 20
- **npm** (ou **bun**)

### Installation

```sh
git clone <repository-url>
cd <repository-name>
npm install
```

### Démarrage

```sh
npm run dev
```

Le serveur de développement démarre sur `http://localhost:8080`.

### Scripts disponibles

| Script | Description |
|---|---|
| `npm run dev` | Serveur de développement (Vite + SSR) |
| `npm run build` | Build production (client + SSR + Nitro) |
| `npm run start` | Serveur de production |
| `npm run lint` | Linting (ESLint + Prettier) |

---

## ☁️ Déploiement

Le projet est déployé sur la plateforme d'hébergement avec :

| Type | URL |
|---|---|
| **Aperçu** | `https://preview-1791205471365853905.vibepreview.app` |
| **Publié** | `https://ryf-radio-hub.vibepreview.app` |
| **Domaine personnalisé** | `https://ryfradio.co` & `https://www.ryfradio.co` |

### Build

Le build utilise **Vite 8** avec le preset **Cloudflare Module** (Nitro) :

1. **Build client.** Bundle React + composants
2. **Build SSR.** Rendu serveur
3. **Build Nitro.** Bundle Edge/Cloudflare

---

## 📦 Données & Contenus

Toutes les données du site sont centralisées dans `src/lib/ryf-data.ts` :

| Export | Type | Description |
|---|---|---|
| `RYF_ASSETS` | `object` | Tous les assets (logo, favicon, hero, photos, illustrations) |
| `RYF_CONTACTS` | `object` | Téléphones, WhatsApp, email, réseaux sociaux, URLs RadioKing |
| `RYF_NEWS` | `RYFNewsItem[]` | Actualités (3 items) |
| `RYF_FULL_ARTICLES` | `Record<id, RYFFullArticle>` | Articles complets avec paragraphes, citations, points forts |
| `RYF_AGENDA` | `RYFEventItem[]` | Événements culturels (Ngouon, École des Pluies, Ngondo) |
| `RYF_DAILY_CHRONIQUES` | `array` | Grille des chroniques (06H à 18H) |
| `RYF_PROGRAMMES` | `RYFShowItem[]` | Émissions hebdomadaires |
| `RYF_PODCASTS` | `RYFPodcastItem[]` | Podcasts (3 episodes) |
| `RYF_VIDEOS` | `RYFVideoItem[]` | Vidéos YouTube (6 videos) |
| `RYF_REALISATIONS` | `RYFRealisationItem[]` | Réalisations passées |
| `RYF_ABOUT_RUBRIQUES` | `RYFAboutRubrique[]` | Rubriques À Propos (6 sections) |

### Équipe (`src/lib/team-data.ts`)

| Export | Description |
|---|---|
| `RYF_TEAM_MEMBERS` | 8 membres en alternance : 4 animateurs (Benjamin Prevoo, DJ King Flow, Tony J, Hinda DJERIDI) + 4 collaborateurs (Léa TOUKAM, Fabrice Etoa, Jean Daniel TCHATAT, Eveline ESSOMBA) |

---

## 🔗 Liens utiles

| Ressource | URL |
|---|---|
| 🌐 Site officiel | [https://www.ryfradio.co](https://www.ryfradio.co) |
| 📺 YouTube | [https://youtube.com/@ryfradio](https://youtube.com/@ryfradio) |
| 📘 Facebook | [https://facebook.com/RYFradio](https://facebook.com/RYFradio) |
| 📸 Instagram | [https://instagram.com/ryfradio](https://instagram.com/ryfradio) |
| 🎵 TikTok | [https://tiktok.com/@ryfradio](https://tiktok.com/@ryfradio) |
| 📧 Email | `ryfradioo@gmail.com` |
| 📱 WhatsApp | `+237 675 374 430` |
| 📍 Adresse | Yaoundé, Cameroun |

---

## 📄 Licence

© 2026 RYF Radio · Rythmes & Folies. Tous droits réservés.

---

<p align="center">
  <strong>RYF Radio</strong> · <em>Le Top du Divertissement</em> 🎙️🎶
</p>