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
  link: string;
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
  // Nouvelles images À Propos fournies par l'utilisateur:
  aboutImg1Concept:
    "https://vibe.filesafe.space/1791205471365853905/attachments/5674a7b8-0220-4bd0-b6aa-a379c0a8c503.png",
  aboutImg2Missions:
    "https://vibe.filesafe.space/1791205471365853905/attachments/9b6f98a0-44bd-4432-8994-d3437035cb6c.jpg",
  aboutImg3Offres:
    "https://vibe.filesafe.space/1791205471365853905/attachments/0876337d-25de-442c-8e8c-8dd1b97cced1.png",
  aboutImg4Cibles:
    "https://vibe.filesafe.space/1791205471365853905/attachments/77342052-63cb-4632-8e8c-28adfb071186.png",
  aboutImg5Realisations:
    "https://vibe.filesafe.space/1791205471365853905/attachments/90a50808-ff1b-4144-b0b3-380a83519537.png",
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
    "https://vibe.filesafe.space/1791205471365853905/attachments/8aa4eff3-b46a-4b4d-a6d4-ebdce1a52e7b.png",
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
  // Community background image uploaded by user
  communityBg:
    "https://vibe.filesafe.space/1791205471365853905/attachments/1dac1fe4-3f1c-45a6-8af9-9b74a44c0148.png",
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
  // Mobile bottom bar — horizontal layout rendered at native mobile width so
  // play, like, volume & scrolling title icons stay full-size and visible.
  radioKingIframe:
    "https://player.radioking.io/ryf-radio2/?c=%231e7fcb&c2=%23ffffff&f=h&i=0&p=0&s=1&alb=NaN&li=1&popup=1&plc=0&h=60&l=380&v=2",
  // Desktop bottom bar — wider native width so the full horizontal control row stays crisp.
  radioKingIframeDesktop:
    "https://player.radioking.io/ryf-radio2/?c=%231e7fcb&c2=%23ffffff&f=h&i=0&p=0&s=1&alb=NaN&li=1&popup=1&plc=0&h=80&l=1280&v=2",
  // Modal popup — original standard embed
  radioKingIframeModal:
    "https://player.radioking.io/ryf-radio2/?c=%231e7fcb&c2=%23ffffff&f=h&i=0&p=0&s=1&alb=NaN&li=1&popup=1&plc=0&h=145&l=470&v=2",
};

export const RYF_NEWS: RYFNewsItem[] = [
  {
    id: "news-sergeo-polo",
    title: "🎤 UNE CONFÉRENCE DE PRESSE RÉUSSIE ! 🇨🇲🎶",
    category: "Musique",
    date: "29 Septembre 2026",
    readTime: "3 min de lecture",
    summary:
      "L'artiste musicien Camerounais, Sergeo Polo a animé un point de presse à Douala pour présenter son MAXI SINGLE « APPARENCES ».",
    imageUrl:
      "https://vibe.filesafe.space/1791205471365853905/attachments/2d8a6dda-130e-4900-834e-64f255a19c62.jpg",
    author: "Rédaction Culture & Musique RYF",
  },
  {
    id: "news-ecrans-noirs",
    title: "Festival Écrans Noirs 2026",
    category: "Événements",
    date: "21 au 28 Novembre 2026",
    readTime: "4 min de lecture",
    summary:
      "La 30e édition anniversaire du Festival Écrans Noirs à Yaoundé, placée sous le signe de l'hommage à son fondateur Bassek Ba Kobhio.",
    imageUrl:
      "https://vibe.filesafe.space/1791205471365853905/attachments/14a59922-3717-4316-b600-07bfdec77440.jpg",
    author: "Cinéma & Arts RYF",
  },
  {
    id: "news-masa-2026",
    title: "Déjeuner de presse à la Maison du MASA",
    category: "Culture",
    date: "06 Octobre 2026",
    readTime: "4 min de lecture",
    summary:
      "La Direction Générale du MASA a reçu la presse ivoirienne à Abidjan pour échanger sur l'actualité et les perspectives du marché panafricain des arts.",
    imageUrl:
      "https://vibe.filesafe.space/1791205471365853905/attachments/55127344-59d4-4387-adc5-932d372bac61.jpg",
    author: "Actualités Panafricaines RYF",
  },
];

export interface RYFFullArticle {
  id: string;
  title: string;
  subtitle: string;
  category: "Musique" | "Culture" | "Artistes" | "Événements" | "Société" | "Divertissement";
  date: string;
  readTime: string;
  location: string;
  imageUrl: string;
  author: string;
  paragraphs: string[];
  quote?: {
    text: string;
    author: string;
  };
  highlights?: string[];
}

export const RYF_FULL_ARTICLES: Record<string, RYFFullArticle> = {
  "news-sergeo-polo": {
    id: "news-sergeo-polo",
    title: "🎤 UNE CONFÉRENCE DE PRESSE RÉUSSIE ! 🇨🇲🎶",
    subtitle: "Sergeo Polo présente son nouveau MAXI SINGLE « APPARENCES » à Douala",
    category: "Musique",
    date: "29 Septembre 2026",
    readTime: "3 min de lecture",
    location: "Douala, Cameroun",
    imageUrl:
      "https://vibe.filesafe.space/1791205471365853905/attachments/2d8a6dda-130e-4900-834e-64f255a19c62.jpg",
    author: "Rédaction Culture & Musique RYF",
    paragraphs: [
      "L'artiste musicien Camerounais, Sergeo Polo a animé, un point de presse, le mercredi 29 Septembre 2026 à Douala.",
      "Au cours de cet échange avec la presse, le chanteur de charme a présenté son MAXI SINGLE « APPARENCES », disponible sur toutes les plateformes de téléchargement.",
      "Entouré de ses collaborateurs, de professionnels des médias et de nombreux admirateurs, l'artiste a partagé les inspirations musicales, les thématiques profondes abordées dans cet opus et les étapes de sa production soignée.",
      "Le projet « APPARENCES » confirme une fois encore l'immense talent vocal et la sensibilité artistique de Sergeo Polo, figure emblématique du makossa d'amour et de la variété camerounaise.",
    ],
    quote: {
      text: "Je rends grâce à Dieu le Père, qui a permis que cette Conférence de Presse consacrée à la présentation de mon MAXI SINGLE « APPARENCES » se tienne et se déroule dans de très bonnes conditions.",
      author: "Sergeo Polo, Artiste Musicien",
    },
    highlights: [
      "MAXI SINGLE « APPARENCES » disponible dès maintenant sur toutes les plateformes de streaming et téléchargement.",
      "Une rencontre chaleureuse et très suivie avec les journalistes culturels nationaux et internationaux à Douala.",
      "RYF Radio partenaire de la diffusion des nouveaux titres de Sergeo Polo sur ses ondes digitales.",
    ],
  },
  "news-ecrans-noirs": {
    id: "news-ecrans-noirs",
    title: "Festival Écrans Noirs 2026",
    subtitle: "30e Édition Anniversaire : Hommage à Bassek Ba Kobhio",
    category: "Événements",
    date: "21 au 28 Novembre 2026",
    readTime: "4 min de lecture",
    location: "Yaoundé, Cameroun",
    imageUrl:
      "https://vibe.filesafe.space/1791205471365853905/attachments/14a59922-3717-4316-b600-07bfdec77440.jpg",
    author: "Cinéma & Arts RYF",
    paragraphs: [
      "La 30e édition du Festival Écrans Noirs se tiendra du 21 au 28 novembre 2026 à Yaoundé (Cameroun).",
      "Édition anniversaire symbolique marquant trois décennies de rayonnement du 7e art africain, elle est placée sous le signe vibrant de l'hommage, après le décès en mai 2026 de son illustre fondateur et délégué général, Bassek Ba Kobhio.",
      "Sous le thème « Écrans Noirs, 30 ans : le cinéma, notre arme de paix », le festival déploiera projections, compétitions officielles, rétrospectives et colloques au Palais des Congrès de Yaoundé, à l'Institut Français et au Village du Festival à l'Hôtel de Ville.",
      "Cinéma, formation, rencontres professionnelles : les Écrans Noirs 2026 réuniront réalisateurs, producteurs et passionnés du monde entier pour célébrer la mémoire et l'héritage d'un pionnier inoubliable.",
    ],
    highlights: [
      "Dates officielles : Du 21 au 28 novembre 2026 à Yaoundé.",
      "Thème officiel : « Écrans Noirs, 30 ans : le cinéma, notre arme de paix ».",
      "Lieux majeurs : Palais des Congrès, Institut Français, Salle de la CNPS, Hôtel de Ville de Yaoundé.",
    ],
  },
  "news-masa-2026": {
    id: "news-masa-2026",
    title: "Déjeuner de presse à la Maison du MASA",
    subtitle: "Échanges stratégiques entre la Direction Générale et les médias à Abidjan",
    category: "Culture",
    date: "06 Octobre 2026",
    readTime: "4 min de lecture",
    location: "Maison du MASA, Abidjan (Côte d'Ivoire)",
    imageUrl:
      "https://vibe.filesafe.space/1791205471365853905/attachments/55127344-59d4-4387-adc5-932d372bac61.jpg",
    author: "Actualités Panafricaines RYF",
    paragraphs: [
      "Le mardi 6 octobre 2026, la Direction Générale du MASA (Marché des Arts du Spectacle d'Abidjan) a reçu les professionnels des médias ivoiriens pour un déjeuner de presse convivial à la Maison du MASA, à Abidjan.",
      "Autour du Directeur Général, M. Abdramane Kamaté, journalistes et rédacteurs en chef ont échangé sur l'actualité du MASA, ses nouveaux projets et ses perspectives à venir.",
      "Un moment d'échange précieux pour renforcer les liens entre le MASA et la presse nationale, partenaire essentiel du rayonnement de cette grande vitrine panafricaine des arts du spectacle vivant.",
      "Cette rencontre confirme la volonté de structuration et de visibilité internationale portée par l'équipe dirigeante en amont des prochaines échéances majeures.",
    ],
    highlights: [
      "Rencontre conviviale tenue le mardi 6 octobre 2026 à Abidjan.",
      "Échanges menés par M. Abdramane Kamaté, Directeur Général du MASA.",
      "Focus sur le hub de la structuration du spectacle vivant africain et la collaboration médias.",
    ],
  },
};

export const RYF_AGENDA: RYFEventItem[] = [
  {
    id: "event-nguon-2026",
    title: "🇨🇲 NGUON 2026",
    date: "04 AU 13 DÉCEMBRE 2026",
    time: "Toute la journée",
    location: "Foumban et localités environnantes",
    imageUrl:
      "https://vibe.filesafe.space/1791205471365853905/attachments/bc7c5ee0-841a-488c-a14d-218151ac16b0.jpg",
    description:
      "Le Ngouon 2026 se tiendra du 04 au 13 décembre 2026 sous le thème : « IBRAHIM MBOMBO NJOYA, ROI BÂTISSEUR ET FIGURE PLURIELLE : MÉMOIRE ET HÉRITAGES »",
    tag: "Patrimoine UNESCO",
    link: "https://www.nguonevents.com/",
  },
  {
    id: "event-ecole-des-pluies",
    title: "L'École des Pluies (Festival de la radio et de l'écoute)",
    date: "DU 12 AU 17 OCTOBRE 2026",
    time: "Ateliers & Émissions",
    location: "Yaoundé et Douala",
    imageUrl:
      "https://vibe.filesafe.space/1791205471365853905/attachments/ab92fba9-2a40-45db-b100-8709a141d8d8.jpg",
    description:
      "Ateliers, masterclass et émissions en direct autour de la radio, du podcast et des métiers du son (ouvert au public et gratuit).",
    tag: "Festival Radio & Son",
    link: "https://loeildusahara.com/cameroun-douala-la-djoss-radio-lance-une-nouvelle-session-de-lecole-des-pluies-de-la-radio-et-du-podcast/",
  },
  {
    id: "fete-du-ngondo",
    title: "Fête du Ngondo",
    date: "Dimanche 06 Décembre 2026",
    time: "Toute la journée",
    location: "Douala",
    imageUrl:
      "https://vibe.filesafe.space/1791205471365853905/attachments/a9fcd971-a5e3-45e1-a7ab-f048de0fb8e6.jpg",
    description:
      "Célébration culturelle et traditionnelle du peuple Sawa sur les berges du Wouri à Douala, apogée et point culminant de l'assemblée traditionnelle Sawa.",
    tag: "Festival Ngondo",
    link: "https://mairiedouala1.cm/le-ngondo-une-celebration-mystique-et-culturelle-des-peuples-sawa/",
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

export interface RYFAboutRubrique {
  id: string;
  title: string;
  headline: string;
  shortHover: string;
  fullDesc: string[];
  points?: { title: string; text: string }[];
  bgImage: string;
}

export const RYF_ABOUT_RUBRIQUES: RYFAboutRubrique[] = [
  {
    id: "concept",
    title: "NOTRE CONCEPT",
    headline: "Une plateforme au cœur de la culture africaine",
    shortHover:
      "Plateforme digitale dédiée à la culture, à la musique et au divertissement, mettant en lumière les talents africains.",
    fullDesc: [
      "Nous sommes une plateforme digitale dédiée à la culture, à la musique et au divertissement.",
      "À travers nos programmes, nos contenus, nos couvertures et nos retransmissions, nous mettons en lumière les talents africains et valorisons les initiatives qui font vivre notre culture.",
      "Notre ambition : créer un espace de découverte, d’expression et de partage, accessible au Cameroun, en Afrique et au-delà de nos frontières.",
    ],
    bgImage: RYF_ASSETS.aboutImg1Concept,
  },
  {
    id: "contexte",
    title: "CONTEXTE",
    headline: "Une radio pensée pour l’ère numérique",
    shortHover:
      "Une Radio Web ouverte sur le monde et proche des nouvelles tendances, rapprochant l'audience des acteurs culturels.",
    fullDesc: [
      "Le numérique transforme notre manière de découvrir, de partager et de vivre la culture. C’est dans cet environnement en constante évolution que nous avons choisi de développer RYF Radio, une Radio Web ouverte sur le monde et proche des nouvelles tendances.",
      "Nous créons des contenus qui rapprochent notre audience des artistes, des acteurs culturels, des événements et des initiatives qui font bouger la scène africaine.",
    ],
    bgImage: RYF_ASSETS.aboutImg2Missions,
  },
  {
    id: "missions",
    title: "NOS MISSIONS",
    headline: "Promouvoir la culture, les talents et les événements",
    shortHover:
      "Valoriser notre culture, donner la parole aux artistes, couvrir les rendez-vous et produire des contenus d'exception.",
    fullDesc: [
      "Nous œuvrons quotidiennement pour faire rayonner la richesse, la diversité et la créativité des cultures africaines et mondiales.",
    ],
    points: [
      {
        title: "Promouvoir notre culture",
        text: "Nous contribuons au rayonnement de la culture camerounaise, africaine et mondiale en mettant en avant sa richesse, sa diversité et sa créativité.",
      },
      {
        title: "Mettre en lumière les talents",
        text: "Nous donnons la parole aux artistes, créateurs et acteurs culturels afin de faire découvrir leurs parcours, leurs univers et leurs projets.",
      },
      {
        title: "Couvrir les événements culturels",
        text: "Nous assurons la couverture et la retransmission de différents rendez-vous culturels : festivals, concerts, spectacles, conférences et autres événements.",
      },
      {
        title: "Produire et diffuser des contenus",
        text: "Nous concevons et diffusons des contenus culturels et médiatiques, en collaboration avec des acteurs et médias nationaux et internationaux.",
      },
    ],
    bgImage: RYF_ASSETS.aboutImg3Offres,
  },
  {
    id: "offres",
    title: "NOS OFFRES",
    headline: "Des solutions média au service de vos projets",
    shortHover:
      "Couverture médiatique, retransmission direct, interviews, production de contenus et partenariats stratégiques.",
    fullDesc: [
      "RYF Radio propose une gamme complète de services médias et de diffusion pour booster la portée et l'impact de vos initiatives artistiques et culturelles.",
    ],
    points: [
      {
        title: "Couverture médiatique",
        text: "Nous accompagnons vos événements et vos initiatives à travers une couverture adaptée à vos objectifs de visibilité.",
      },
      {
        title: "Retransmission en direct",
        text: "Nous permettons à votre événement de toucher une audience plus large grâce à la retransmission en direct.",
      },
      {
        title: "Interviews & émissions",
        text: "Nous créons des espaces d’expression pour présenter vos actualités, vos projets, vos parcours et vos univers.",
      },
      {
        title: "Production de contenus",
        text: "Nous concevons des contenus éditoriaux et audiovisuels adaptés à votre identité et à votre communication.",
      },
      {
        title: "Promotion artistique et culturelle",
        text: "Nous contribuons à donner de la visibilité aux talents, projets et initiatives qui participent au dynamisme culturel.",
      },
      {
        title: "Partenariats médias",
        text: "Nous développons des collaborations avec les marques, institutions, médias et acteurs culturels autour de projets communs.",
      },
    ],
    bgImage: RYF_ASSETS.aboutImg4Cibles,
  },
  {
    id: "cibles",
    title: "NOS CIBLES",
    headline: "Une communauté au cœur de notre vision",
    shortHover:
      "Grand public, jeunesse, diaspora, opérateurs culturels, artistes et institutions partenaires.",
    fullDesc: [
      "Notre rayonnement touche un écosystème interconnecté, de l'auditeur mélomane aux institutions culturelles internationales.",
    ],
    points: [
      {
        title: "Le grand public",
        text: "Jeunes, adultes et diaspora à la recherche de musique, de culture, de divertissement et de découvertes.",
      },
      {
        title: "Notre cœur de cible",
        text: "Les opérateurs culturels et les acteurs qui contribuent au développement de notre écosystème culturel.",
      },
      {
        title: "Nos cibles secondaires",
        text: "Artistes, créateurs, médias, entreprises, institutions, organisations internationales et professionnels de la culture.",
      },
    ],
    bgImage: RYF_ASSETS.aboutImg5Realisations,
  },
  {
    id: "realisations",
    title: "NOS RÉALISATIONS",
    headline: "Des moments vécus ensemble sur le terrain",
    shortHover:
      "Couvertures, interviews, reportages et retransmissions en direct au cœur des plus grands événements.",
    fullDesc: [
      "Des moments que nous avons vécus avec vous à travers nos couvertures, interviews, reportages et retransmissions, nous accompagnons les initiatives et les événements qui font vivre notre scène culturelle.",
      "Découvrez les projets et événements que nous avons réellement couverts ou réalisés avec passion.",
    ],
    bgImage:
      "https://vibe.filesafe.space/1791205471365853905/attachments/479d3f70-f3e3-4b53-908f-8387c930d660.png",
  },
];
