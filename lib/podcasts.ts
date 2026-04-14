export interface Podcast {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  audioUrl: string;
  publishedAt: string;
  duration: string;
}

export const PODCASTS_DATA: Podcast[] = [
  {
    id: "ep-004",
    title: "La Fréquence Fantôme",
    description: "Interférences inexpliquées lors du direct de 3h du matin.",
    // Image : Micro vintage
    coverImage: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=200",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", 
    publishedAt: "2025-12-28",
    duration: "45:12"
  },
  {
    id: "ep-003",
    title: "Echoes from the Void",
    description: "Discussion sur l'architecture brutaliste et le son.",
    // Image : Abstrait sombre
    coverImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=200",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    publishedAt: "2025-12-15",
    duration: "1:12:05"
  },
  {
    id: "ep-002",
    title: "Analog Nightmares",
    description: "Session ambient improvisée avec synthétiseurs modulaires.",
    // Image : Vinyle / Platine
    coverImage: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?auto=format&fit=crop&q=80&w=200",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    publishedAt: "2025-11-30",
    duration: "58:30"
  },
  {
    id: "ep-001",
    title: "Pilote : L'Origine",
    description: "Première transmission. Test des équipements.",
    // Image : Station radio floue
    coverImage: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=200",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    publishedAt: "2025-11-01",
    duration: "24:00"
  }
];