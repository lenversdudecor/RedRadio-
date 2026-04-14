"use client";

import dynamic from "next/dynamic";

// On importe ici le vrai PlayerBar avec ssr: false
// Note : Vérifiez bien si votre fichier s'appelle "PlayerBar" ou "PlayBar" (selon votre erreur)
const PlayerBar = dynamic(() => import("@/app/components/PlayBar"), { 
  ssr: false, 
});

export default function PlayerBarClient() {
  return <PlayerBar />;
}