export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  imageUrl: string;
  type: "animateur" | "collaborateur";
  emission?: string;
  schedule?: string;
  cropPosition?: string;
}

// Images fournies par l'utilisateur
export const RYF_TEAM_IMAGES = {
  // Animateurs
  benjaminPrevoo:
    "https://vibe.filesafe.space/1791205471365853905/attachments/0ce0300f-cca2-4209-bf64-66c9c07593e7.jpg",
  djKingFlow:
    "https://vibe.filesafe.space/1791205471365853905/attachments/955dcab1-831a-42c5-bb61-2d413b8549ee.jpg",
  tonyJ:
    "https://vibe.filesafe.space/1791205471365853905/attachments/35e004f4-b1df-409b-856a-b1b103941777.png",
  hindaDjeridi:
    "https://vibe.filesafe.space/1791205471365853905/attachments/680c71c2-05d3-4ee7-ac68-3126591811f3.jpg",

  // 4 Collaborateurs / Correspondants fournis
  leaToukam:
    "https://vibe.filesafe.space/1791205471365853905/attachments/e4553293-6f58-4b21-a33e-d08505d1e9fb.jpg",
  fabriceEtoa:
    "https://vibe.filesafe.space/1791205471365853905/attachments/f691989a-3c2e-4684-81c3-b72a4c1b5869.png",
  jeanDanielTchatat:
    "https://vibe.filesafe.space/1791205471365853905/attachments/9bc88274-68ba-4870-b87c-55957c852fad.png",
  evelineEssomba:
    "https://vibe.filesafe.space/1791205471365853905/attachments/1cf6e5dc-59e5-491b-81a0-48b80f031800.png",
};

// Alternance demandée : Collaborateur puis Animateur
export const RYF_TEAM_MEMBERS: TeamMember[] = [
  // 1. Collaborateur : Léa TOUKAM
  {
    id: "collab-lea",
    name: "Léa TOUKAM",
    role: "Correspondante en Allemagne",
    type: "collaborateur",
    imageUrl: RYF_TEAM_IMAGES.leaToukam,
    cropPosition: "center 20%",
  },

  // 2. Animateur : Benjamin Prevoo
  {
    id: "anim-benjamin",
    name: "Benjamin Prevoo",
    role: "Animateur • So French, So Good",
    type: "animateur",
    emission: "So French, So Good",
    schedule: "Mercredis 10H-12H · Vendredis 18H-20H · Dimanches 15H-17H · Lundis 22H-00H",
    bio: "Une présentation de Benjamin Prevoo. Votre émission culturelle tous les Mercredis 10H-12H, Vendredis 18H-20H, Dimanches 15H-17H et Lundis 22H-00H.",
    imageUrl: RYF_TEAM_IMAGES.benjaminPrevoo,
    cropPosition: "center 25%",
  },

  // 3. Collaborateur : Fabrice Etoa
  {
    id: "collab-fabrice",
    name: "Fabrice Etoa",
    role: "Infographe & Créatif Visuel",
    type: "collaborateur",
    imageUrl: RYF_TEAM_IMAGES.fabriceEtoa,
    cropPosition: "center 20%",
  },

  // 4. Animateur : DJ King Flow
  {
    id: "anim-king-flow",
    name: "DJ King Flow",
    role: "Animateur & DJ • Addict Show-Mixtape",
    type: "animateur",
    emission: "Addict Show-Mixtape",
    schedule: "Tous les mercredis entre 18H et 19H",
    bio: "Présenté par DJ King Flow. Le Rap Français est à l'honneur sur RYF Radio tous les mercredis entre 18H-19H avec des mixes et exclusivités inédits.",
    imageUrl: RYF_TEAM_IMAGES.djKingFlow,
    cropPosition: "center 20%",
  },

  // 5. Collaborateur : Jean Daniel TCHATAT
  {
    id: "collab-jean-daniel",
    name: "Jean Daniel TCHATAT",
    role: "Correspondant en Belgique",
    type: "collaborateur",
    imageUrl: RYF_TEAM_IMAGES.jeanDanielTchatat,
    cropPosition: "center 15%",
  },

  // 6. Animateur : Tony J
  {
    id: "anim-tony-j",
    name: "Tony J",
    role: "Animateur & DJ • Weekend French Touch",
    type: "animateur",
    emission: "Weekend French Touch",
    schedule: "Tous les samedis à partir de 20H",
    bio: "Animé par Tony J. Tous les samedis à partir de 20H, retrouvez Tony J pour un cocktail de Mix explosif et festif sur RYF Radio.",
    imageUrl: RYF_TEAM_IMAGES.tonyJ,
    cropPosition: "center 20%",
  },

  // 7. Collaborateur : Eveline ESSOMBA
  {
    id: "collab-eveline",
    name: "Eveline ESSOMBA",
    role: "Correspondante Douala",
    type: "collaborateur",
    imageUrl: RYF_TEAM_IMAGES.evelineEssomba,
    cropPosition: "center 20%",
  },

  // 8. Animateur : Hinda DJERIDI
  {
    id: "anim-hinda",
    name: "Hinda DJERIDI",
    role: "Productrice, Animatrice & Naturopathe • La Minute d'Hinda",
    type: "animateur",
    emission: "La Minute d'Hinda",
    schedule: "Mardis, Jeudis et Samedis à 07H30, 10H30, 14H30 et 19H30",
    bio: "Productrice, animatrice radio et naturopathe. Retrouvez La Minute d'Hinda tous les mardis, jeudis et samedis à 07H30, 10H30, 14H30 et 19H30.",
    imageUrl: RYF_TEAM_IMAGES.hindaDjeridi,
    cropPosition: "center 20%",
  },
];
