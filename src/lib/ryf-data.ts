export interface RYFNewsItem {
  id: string;
  title: string;
  category: "Musique" | "Culture" | "Artistes" | "Événements" | "Société" | "Divertissement";
  date: string;
  readTime: string;
  summary: string;
  imageUrl: string;
  author: string;
}

export interface RYFEventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  city: string;
  imageUrl: string;
  description: string;
  tag: string;
}

export interface RYFShowItem {
  id: string;
  title: string;
  host: string;
  time: string;
  days: string;
  description: string;
  imageUrl: string;
  category: string;
}

export interface RYFPodcastItem {
  id: string;
  title: string;
  host: string;
  category: string;
  duration: string;
  date: string;
  imageUrl: string;
  audioPreviewUrl?: string;
  description: string;
}

export interface RYFVideoItem {
  id: string;
  title: string;
  youtubeId: string;
  youtubeUrl: string;
  views: string;
  duration: string;
  publishedAt: string;
  thumbnailUrl: string;
  category: string;
}

export interface RYFRealisationItem {
  id: string;
  title: string;
  category:
    | "Couverture événementielle"
    | "Interview"
    | "Reportage"
    | "Retransmission"
    | "Partenariat"
    | "Projet culturel";
  date: string;
  location: string;
  summary: string;
  imageUrl: string;
}

// User-provided official assets
export const RYF_ASSETS = {
  // Provided favicon (square official RYF badge)
  favicon:
    "https://vibe.filesafe.space/1791205471365853905/attachments/77a2de3e-41ad-4c87-b8ca-19a8cc32e055.png",
  // Provided user images:
  // Image 2 is the official logo (PNG)
  logo: "https://vibe.filesafe.space/1791205471365853905/attachments/7f1a6769-a44d-4398-b0c6-53c2435bfe8f.png",
  // Presenters & real assets provided in user uploads:
  morningShow:
    "https://vibe.filesafe.space/1791205471365853905/attachments/23f645b7-71dd-4070-bc72-f73916e4c692.jpg",
  host1:
    "https://images.leadconnectorhq.com/image/f_webp/q_80/r_160/u_https://vibe.filesafe.space/1791205471365853905/attachments/23f645b7-71dd-4070-bc72-f73916e4c692.jpg",
  host2:
    "https://vibe.filesafe.space/1791205471365853905/attachments/db6afd31-d34d-40f2-8a76-1e6ac17c6fbb.jpg",
  host3:
    "https://vibe.filesafe.space/1791205471365853905/attachments/cdc90069-c749-4659-906f-9b2c3a432d72.jpg",
  host4:
    "https://vibe.filesafe.space/1791205471365853905/attachments/f2aa11e7-2e5e-4909-b242-9c1045db55fd.jpg",
  // Hero background official RYF visual (Desktop & Mobile)
  heroBg:
    "https://vibe.filesafe.space/1791205471365853905/attachments/2a76cd87-a12d-4249-80ab-ccef7c12d9e2.jpg",
  heroBgMobile:
    "https://vibe.filesafe.space/1791205471365853905/attachments/72ba2fcb-823f-40a3-bbff-3de1f0673cf0.jpg",
  // High quality African cultural concert / performance generated covers
  heroCrowd:
    "https://vibe.filesafe.space/1791205471365853905/assets/03f28e72-b7b9-4841-aaec-66d2b40da7bc.png",
  concertStage:
    "https://vibe.filesafe.space/1791205471365853905/attachments/db6afd31-d34d-40f2-8a76-1e6ac17c6fbb.jpg",
  culturalFestival:
    "https://vibe.filesafe.space/1791205471365853905/assets/5b13efc5-b75a-49ea-921a-1dde4f333eaf.png",
  aboutPromo:
    "https://vibe.filesafe.space/1791205471365853905/attachments/441d2aee-b8d2-4734-a3e6-7074cd09b7c7.jpg",
  // Nouvelles images fournies par l'utilisateur:
  img1HeroComm:
    "https://vibe.filesafe.space/1791205471365853905/attachments/37f41af8-4540-4b13-b6cf-70aaa4b2c881.jpg",
  img2Rfi:
    "https://vibe.filesafe.space/1791205471365853905/attachments/ba8d0fac-fffd-4c30-82b5-0d2f62bc00ea.png",
  img3MomentsMagiques:
    "https://vibe.filesafe.space/1791205471365853905/attachments/65331d7a-2401-4da5-af94-bad999392ad3.png",
  img4TopDivertissement:
    "https://vibe.filesafe.space/1791205471365853905/attachments/213496be-8df7-4f68-8728-5979a839aa98.jpg",
  img5Ceo:
    "https://vibe.filesafe.space/1791205471365853905/attachments/e7dd16c7-de3a-4fc7-a521-e343a17877be.jpg",
  // New team members uploaded by user
  teamMember1:
    "https://vibe.filesafe.space/1791205471365853905/attachments/680c71c2-05d3-4ee7-ac68-3126591811f3.jpg",
  teamMember2:
    "https://vibe.filesafe.space/1791205471365853905/attachments/955dcab1-831a-42c5-bb61-2d413b8549ee.jpg",
  teamMember3:
    "https://vibe.filesafe.space/1791205471365853905/attachments/0ce0300f-cca2-4209-bf64-66c9c07593e7.jpg",
  teamMember4:
    "https://vibe.filesafe.space/1791205471365853905/attachments/35e004f4-b1df-409b-856a-b1b103941777.png",
  livePerformance:
    "https://vibe.filesafe.space/1791205471365853905/assets/e6474e09-4538-4422-8052-6d208022ce40.png",
  hostPortrait:
    "https://vibe.filesafe.space/1791205471365853905/assets/91302a77-94b6-43a6-bc0c-f02779ab31b4.png",
  // Community of radio journalists, background for "Rejoignez la communauté RYF"
  communityBg:
    "https://vibe.filesafe.space/1791205471365853905/assets/8d87db72-f847-4ab8-8282-bb48d6b8ac4a.png",
};

export const RYF_CONTACTS = {
  phone1: "+237 656 736 000",
  phone2: "+237 675 374 430",
  whatsapp: "+237 675 374 430",
  whatsappUrl:
    "https://wa.me/237675374430?text=Bonjour%20RYF%20Radio%2C%20je%20souhaite%20vous%20contacter",
  email: "ryfradioo@gmail.com",
  socials: {
    facebook: "https://www.facebook.com/RYFradio?mibextid=ZbWKwL",
    instagram: "https://www.instagram.com/ryfradio?igsh=MTlvNWc0NWN1c2UzNQ==",
    youtube: "https://youtube.com/@ryfradio?si=MADDkRVbJqS4_6D8",
    tiktok:
      "https://www.tiktok.com/@ryfradio?_r=1&_d=ebhedm7ek4ik0h&sec_uid=MS4wLjABAAAAv4gF8tJkY7ySjOChDc_T_QGMW0GEIRi_cudBzXd8Yy3QcVVAyDE9k89g_pxHzklN&share_author_id=7239322804791804934&sharer_language=fr&source=h5_m&u_code=e87jm496b622d7&timestamp=1710352691&user_id=7239322804791804934&sec_user_id=MS4wLjABAAAAv4gF8tJkY7ySjOChDc_T_QGMW0GEIRi_cudBzXd8Yy3QcVVAyDE9k89g_pxHzklN&utm_source=copy&utm_campaign=client_share&utm_medium=android&share_iid=7343692676673586950&share_link_id=7fa83240-5e21-419c-ac0c-aca661c89b9e&share_app_id=1233&ugbiz_name=ACCOUNT&ug_btm=b8727%2Cb0229&social_share_type=5&enable_checksum=1",
    x: "https://twitter.com/ryfradio",
  },
  // Mobile bottom bar — compact layout (already good on phones)
  radioKingIframe:
    "https://player.radioking.io/ryf-radio2/?c=%231e7fcb&c2=%23ffffff&f=h&i=0&p=0&s=1&alb=NaN&li=1&popup=1&plc=0&h=56&l=1200&v=2",
  // Desktop bottom bar — taller layout so play icon, volume & scrolling title stay visible
  radioKingIframeDesktop:
    "https://player.radioking.io/ryf-radio2/?c=%231e7fcb&c2=%23ffffff&f=h&i=0&p=0&s=1&alb=NaN&li=1&popup=1&plc=0&h=80&l=1200&v=2",
  // Modal popup — original standard embed
  radioKingIframeModal:
    "https://player.radioking.io/ryf-radio2/?c=%231e7fcb&c2=%23ffffff&f=h&i=0&p=0&s=1&alb=NaN&li=1&popup=1&plc=0&h=145&l=470&v=2",
};

export const RYF_NEWS: RYFNewsItem[] = [
  {
    id: "news-1",
    title: "Vibrations Urbaines : L'essor fulgurant de la nouvelle vague musicale camerounaise",
    category: "Musique",
    date: "Aujourd'hui",
    readTime: "4 min de lecture",
    summary:
      "Entre Afrobeats rythmés, Makossa revisité et sonorités urbaines émergentes, la scène musicale camerounaise rayonne sur les plateformes internationales.",
    imageUrl: RYF_ASSETS.concertStage,
    author: "Équipe Rédaction RYF",
  },
  {
    id: "news-2",
    title: "Festival des Arts et Traditions : Quand la jeunesse célèbre ses racines culturelles",
    category: "Culture",
    date: "Hier",
    readTime: "5 min de lecture",
    summary:
      "Plongée au cœur des danses patrimoniales, des contes et des créations contemporaines qui unissent les communautés à travers le pays.",
    imageUrl:
      "https://vibe.filesafe.space/1791205471365853905/attachments/cdc90069-c749-4659-906f-9b2c3a432d72.jpg",
    author: "Rubrique Culture RYF",
  },
  {
    id: "news-3",
    title: "Le Top Divertissement en direct : Les coulisses de vos émissions favorites",
    category: "Événements",
    date: "Il y a 2 jours",
    readTime: "3 min de lecture",
    summary:
      "Découvrez les animateurs passionnés qui font battre le tempo de RYF Radio au quotidien avec énergie, sourires et exclusivités musicales.",
    imageUrl:
      "https://vibe.filesafe.space/1791205471365853905/attachments/f2aa11e7-2e5e-4909-b242-9c1045db55fd.jpg",
    author: "Animation RYF",
  },
  {
    id: "news-4",
    title:
      "Tendances Digitales en Afrique : Comment les créateurs de contenus redéfinissent la scène",
    category: "Société",
    date: "Il y a 3 jours",
    readTime: "6 min de lecture",
    summary:
      "De Douala à Yaoundé, les jeunes créateurs conquièrent TikTok et YouTube avec des productions d'un calibre remarquable.",
    imageUrl:
      "https://vibe.filesafe.space/1791205471365853905/attachments/53e0541a-9318-4b06-8a92-ae2c5bec7781.jpg",
    author: "Chronique Digitale RYF",
  },
  {
    id: "news-5",
    title: "Rencontre avec les voix montantes : portrait d'artistes qui façonnent demain",
    category: "Artistes",
    date: "Il y a 4 jours",
    readTime: "5 min de lecture",
    summary:
      "Entretiens intimes avec les chanteurs, instrumentistes et slameurs qui portent haut les couleurs de la création africaine.",
    imageUrl:
      "https://vibe.filesafe.space/1791205471365853905/attachments/ba8d0fac-fffd-4c30-82b5-0d2f62bc00ea.png",
    author: "Rubrique Artistes RYF",
  },
  {
    id: "news-6",
    title: "Divertissement & Buzz : les moments qui ont fait vibrer la communauté RYF",
    category: "Divertissement",
    date: "Il y a 5 jours",
    readTime: "4 min de lecture",
    summary:
      "Jeux, défis, anecdotes et instants culte : revivez les meilleurs temps forts de l'antenne et des réseaux sociaux RYF.",
    imageUrl: RYF_ASSETS.morningShow,
    author: "Rédaction Divertissement RYF",
  },
];

export const RYF_AGENDA: RYFEventItem[] = [
  {
    id: "event-1",
    title: "Concert Géant Nuit des Étoiles Urbaines",
    date: "18 OCTOBRE 2026",
    time: "19h00",
    location: "Palais des Sports",
    city: "Yaoundé",
    imageUrl: RYF_ASSETS.concertStage,
    description:
      "Une célébration musicale unique réunissant les têtes d'affiche de la scène Afropop et Mboa urbaine.",
    tag: "Concert Live",
  },
  {
    id: "event-2",
    title: "Rencontres Théâtrales & Patrimoine Vivant",
    date: "25 OCTOBRE 2026",
    time: "15h30",
    location: "Centre Culturel Français",
    city: "Douala",
    imageUrl: RYF_ASSETS.culturalFestival,
    description:
      "Spectacles de contes, pièces théâtrales et performances artistiques rendant hommage aux légendes orales.",
    tag: "Spectacle & Théâtre",
  },
  {
    id: "event-3",
    title: "Festival International de Danses Traditionnelles",
    date: "07 NOVEMBRE 2026",
    time: "14h00",
    location: "Esplanade de l'Hôtel de Ville",
    city: "Yaoundé",
    imageUrl: RYF_ASSETS.livePerformance,
    description:
      "Rassemblement de troupes traditionnelles venues des dix régions du Cameroun et d'Afrique centrale.",
    tag: "Festival Culturel",
  },
];

export const RYF_DAILY_CHRONIQUES = [
  { time: "06H00", title: "Horoscope", type: "Chroniques" },
  { time: "07H00", title: "Éphéméride", type: "Chroniques" },
  { time: "08H00", title: "Flash Info Sport", type: "Chroniques" },
  { time: "11H00", title: "Insolite du jour", type: "Chroniques" },
  { time: "12H00", title: "Journal des people", type: "Chroniques" },
  { time: "13H00", title: "Une date dans l'Histoire", type: "Chroniques" },
  { time: "14H00", title: "Buzz du jour", type: "Chroniques" },
  { time: "15H00", title: "Sorties Cinéma", type: "Chroniques" },
  { time: "16H00", title: "Carton rouge du jour", type: "Chroniques" },
  { time: "17H00", title: "Journal des people", type: "Chroniques" },
  { time: "18H00", title: "Flash Info", type: "Chroniques" },
];

export const RYF_PROGRAMMES: RYFShowItem[] = [
  {
    id: "prog-1",
    title: "Rythmes & Folies Matin",
    host: "Valérie & Brice",
    time: "06h30 - 09h30",
    days: "Lundi au Vendredi",
    description:
      "Le grand réveil dynamique ! Énergie contagieuse, revue de presse culturelle, nouveautés Afrobeats et bonne humeur pour bien démarrer.",
    imageUrl: RYF_ASSETS.host1,
    category: "Morning Show",
  },
  {
    id: "prog-2",
    title: "Le Top Divertissement",
    host: "Carlos M.",
    time: "12h00 - 14h00",
    days: "Lundi au Vendredi",
    description:
      "L'émission culte au cœur des buzz, des hits du moment, des dédicaces d'auditeurs et des jeux interactifs.",
    imageUrl: RYF_ASSETS.host2,
    category: "Divertissement",
  },
  {
    id: "prog-3",
    title: "La Culture Nous Rassemble",
    host: "Nadège K.",
    time: "16h00 - 18h00",
    days: "Mercredi & Samedi",
    description:
      "Voyage au cœur de nos traditions, valorisation des artistes patrimoniaux, découvertes littéraires et dialogue intergénérationnel.",
    imageUrl: RYF_ASSETS.host3,
    category: "Culture & Racines",
  },
  {
    id: "prog-4",
    title: "Urban Groove & Afro Mix",
    host: "DJ Steve & Invités",
    time: "20h00 - 23h00",
    days: "Vendredi & Samedi",
    description:
      "Le rendez-vous clubbing du week-end : sets exclusifs, pépites underground et interviews des plus grands DJs du continent.",
    imageUrl: RYF_ASSETS.host4,
    category: "Musique & Clubbing",
  },
];

export const RYF_PODCASTS: RYFPodcastItem[] = [
  {
    id: "pod-1",
    title: "Épisode 24 : Quand le Makossa inspire les producteurs mondiaux",
    host: "Nadège K.",
    category: "Histoire & Rythmes",
    duration: "28 min",
    date: "Il y a 3 jours",
    imageUrl: RYF_ASSETS.host3,
    description:
      "Comment les lignes de basse légendaires camerounaises continuent de forger les plus grands hits internationaux.",
  },
  {
    id: "pod-2",
    title: "Épisode 23 : Dans les coulisses de la production d'un festival urbain",
    host: "Carlos M.",
    category: "Événements",
    duration: "34 min",
    date: "La semaine passée",
    imageUrl: RYF_ASSETS.host2,
    description:
      "Rencontre avec les directeurs techniques et programmateurs qui font vivre les plus gros rassemblements culturels.",
  },
  {
    id: "pod-3",
    title: "Épisode 22 : Génération Créateurs : Vivre de son art au Cameroun",
    host: "Valérie & Brice",
    category: "Société & Talents",
    duration: "41 min",
    date: "Il y a 2 semaines",
    imageUrl: RYF_ASSETS.host1,
    description:
      "Témoignages sans filtre de photographes, danseurs et graphistes qui s'imposent dans les industries créatives.",
  },
];

export const RYF_VIDEOS: RYFVideoItem[] = [
  {
    id: "vid-1",
    title: "RYF Radio En Direct : Ambiance et interviews exclusives avec nos invités",
    youtubeId: "nXAA3rJU8ak",
    youtubeUrl: "https://youtu.be/nXAA3rJU8ak",
    views: "12.4K vues",
    duration: "14:20",
    publishedAt: "Récemment",
    thumbnailUrl: "https://img.youtube.com/vi/nXAA3rJU8ak/hqdefault.jpg",
    category: "Émission Spéciale",
  },
  {
    id: "vid-2",
    title: "Moments forts au cœur de l'ambiance culturelle avec l'équipe RYF",
    youtubeId: "ljIwNzzWnFs",
    youtubeUrl: "https://youtu.be/ljIwNzzWnFs",
    views: "8.9K vues",
    duration: "08:45",
    publishedAt: "Ce mois-ci",
    thumbnailUrl: "https://img.youtube.com/vi/ljIwNzzWnFs/hqdefault.jpg",
    category: "Reportage Terrains",
  },
  {
    id: "vid-3",
    title: "Célébration festive : Musique, danses et divertissement non-stop",
    youtubeId: "HYjscT-XgsY",
    youtubeUrl: "https://youtu.be/HYjscT-XgsY",
    views: "15.1K vues",
    duration: "11:10",
    publishedAt: "Populaire",
    thumbnailUrl: "https://img.youtube.com/vi/HYjscT-XgsY/hqdefault.jpg",
    category: "Live Session",
  },
  {
    id: "vid-4",
    title: "Session Live Studio : Talents émergents et voix d'Afrique",
    youtubeId: "nXAA3rJU8ak",
    youtubeUrl: "https://youtu.be/nXAA3rJU8ak",
    views: "9.3K vues",
    duration: "18:05",
    publishedAt: "En continu",
    thumbnailUrl: "https://img.youtube.com/vi/nXAA3rJU8ak/hqdefault.jpg",
    category: "Découverte",
  },
  {
    id: "vid-5",
    title: "Coulisses du Direct : Immersion totale dans l'antenne RYF",
    youtubeId: "ljIwNzzWnFs",
    youtubeUrl: "https://youtu.be/ljIwNzzWnFs",
    views: "11.7K vues",
    duration: "10:30",
    publishedAt: "Exclusif",
    thumbnailUrl: "https://img.youtube.com/vi/ljIwNzzWnFs/hqdefault.jpg",
    category: "Backstage",
  },
  {
    id: "vid-6",
    title: "Festival Vibes : RYF Radio au contact de son public",
    youtubeId: "HYjscT-XgsY",
    youtubeUrl: "https://youtu.be/HYjscT-XgsY",
    views: "16.8K vues",
    duration: "13:45",
    publishedAt: "Tendance",
    thumbnailUrl: "https://img.youtube.com/vi/HYjscT-XgsY/hqdefault.jpg",
    category: "Événement",
  },
];

export const RYF_REALISATIONS: RYFRealisationItem[] = [
  {
    id: "real-1",
    title: "Couverture Médicale & Digitale du Festival des Musiques Urbaines",
    category: "Couverture événementielle",
    date: "Septembre 2026",
    location: "Douala & Yaoundé",
    summary:
      "Déploiement digital complet de RYF Radio : micro-trottoirs, relais sur nos réseaux sociaux et capsules vidéos en direct.",
    imageUrl: RYF_ASSETS.concertStage,
  },
  {
    id: "real-2",
    title: "Série d'interviews exclusives de jeunes prodiges de la scène afro-fusion",
    category: "Interview",
    date: "Août 2026",
    location: "Yaoundé",
    summary:
      "Entretiens vidéo et podcasts avec les voix montantes qui façonnent la nouvelle esthétique musicale africaine.",
    imageUrl: RYF_ASSETS.hostPortrait,
  },
  {
    id: "real-3",
    title: "Retransmission culturelle en direct des festivités patrimoniales régionales",
    category: "Retransmission",
    date: "Juillet 2026",
    location: "Ouest & Centre Cameroun",
    summary:
      "Immersion sonore totale au plus près des danses, des instruments traditionnels et des chefferies.",
    imageUrl: RYF_ASSETS.culturalFestival,
  },
  {
    id: "real-4",
    title: "Partenariat média pour la promotion des jeunes talents créateurs",
    category: "Partenariat",
    date: "Juin 2026",
    location: "Plateformes Digitales RYF",
    summary:
      "Accompagnement médiatique et diffusion sur nos ondes et canaux digitaux avec plus de 50 000 auditeurs touchés.",
    imageUrl: RYF_ASSETS.livePerformance,
  },
];
