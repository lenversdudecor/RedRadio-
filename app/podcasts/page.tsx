"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Clock, Calendar, Search } from "lucide-react"; // Ajout de Pause
import Image from "next/image";
import InterfaceOverlay from "@/app/components/InterfaceOverlay";
import MenuOverlay from "@/app/components/MenuOverlay";
import { PODCASTS_DATA } from "@/lib/podcasts";
import { usePlayer } from "@/app/context/PlayerContext"; // Import du hook

export default function PodcastsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  
  // Récupération du contexte
const { playTrack, togglePlay, currentTrack, isPlaying } = usePlayer();
  // Fonction utilitaire pour savoir si CETTE piste joue
const isTrackPlaying = (id: string) => isPlaying && currentTrack?.id === id;
const handlePlayClick = (podcast: any) => {
    // Si c'est la piste en cours, on pause/play
    if (currentTrack?.id === podcast.id) {
      togglePlay();
    } else {
      // Sinon on lance la nouvelle
      playTrack(podcast);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#050505] text-[#e0d5c1] selection:bg-white selection:text-black">
      
      <div className="noise-overlay" />
      <div className="ambient-light fixed inset-0 opacity-50" />

      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <InterfaceOverlay openMenu={() => setIsMenuOpen(true)} />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-32 pb-20 md:pt-40">
        
        {/* ... (Header inchangé) ... */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
             <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight mb-4">Archives</h1>
             <p className="text-neutral-500 max-w-md">Accédez à l'historique complet des transmissions.</p>
          </div>
          {/* ... Search bar inchangée ... */}
        </motion.div>

        {/* ... (En-tête Tableau inchangé) ... */}
        <div className="grid grid-cols-[auto_1fr_auto_auto] gap-4 px-4 py-2 text-xs uppercase tracking-widest text-neutral-600 border-b border-white/10 mb-4 font-bold">
           {/* ... */}
        </div>

        {/* Liste des Podcasts */}
        <div className="flex flex-col gap-1">
          {PODCASTS_DATA.map((podcast, index) => {
            const isActive = isTrackPlaying(podcast.id);
            const isCurrent = currentTrack?.id === podcast.id;

            return (
              <motion.div
                key={podcast.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredId(podcast.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => handlePlayClick(podcast)} // Le clic sur la ligne lance aussi
                className={`group relative grid grid-cols-[auto_1fr_auto_auto] items-center gap-4 px-4 py-4 rounded-lg transition-colors cursor-pointer border border-transparent 
                  ${isCurrent ? "bg-white/10 border-white/5" : "hover:bg-white/5 hover:border-white/5"}`}
              >
                {/* Colonne 1 : Play/Pause/Index */}
                <div className="w-8 text-center font-serif text-neutral-500 text-lg flex justify-center">
                  {/* Logique d'affichage de l'icône */}
                  {isActive ? (
                    <Pause size={18} className="text-[#e0d5c1] fill-current" />
                  ) : hoveredId === podcast.id ? (
                    <Play size={18} className="text-white fill-white" />
                  ) : (
                    // Si c'est la piste en cours mais en pause, on montre un égaliseur statique ou l'index
                    isCurrent ? <span className="text-[#e0d5c1] animate-pulse">❚❚</span> : 
                    <span className="text-sm md:text-base">{(index + 1).toString().padStart(2, '0')}</span>
                  )}
                </div>

                {/* Colonne 2 : Info & Cover */}
                <div className="flex items-center gap-4 overflow-hidden">
                  <div className="relative h-10 w-10 md:h-12 md:w-12 shrink-0 bg-neutral-800 rounded overflow-hidden">
                     <Image 
                       src={podcast.coverImage} 
                       alt={podcast.title} 
                       fill 
                       className={`object-cover transition-opacity ${isActive ? "opacity-100" : "opacity-80 group-hover:opacity-100"}`}
                     />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className={`font-serif text-lg md:text-xl truncate transition-colors ${isCurrent ? "text-[#e0d5c1]" : "text-neutral-200 group-hover:text-white"}`}>
                      {podcast.title}
                    </span>
                    <span className="text-xs md:text-sm text-neutral-500 truncate group-hover:text-neutral-400">
                      {podcast.description}
                    </span>
                  </div>
                </div>

                {/* Colonne 3 : Date */}
                <div className="hidden md:flex items-center gap-2 text-sm text-neutral-500">
                  <Calendar size={14} />
                  {podcast.publishedAt}
                </div>

                {/* Colonne 4 : Durée */}
                <div className="text-sm font-mono text-neutral-600 group-hover:text-neutral-300 text-right min-w-12.5">
                  {podcast.duration}
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </main>
  );
}