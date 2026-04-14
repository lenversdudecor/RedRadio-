"use client";
import {useState} from "react";
import Link from "next/link";
import InterfaceOverlay from "./components/InterfaceOverlay";
import StorySlider from "./components/StorySlider";
import MenuOverlay from "./components/MenuOverlay";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="relative bg-[#050505] min-h-screen text-[#e0d5c1]">
      
      {/* 1. Background Layer */}
      <div className="noise-overlay" />
      <div className="ambient-light" />

      {/* Menu Overlay (Conditionnel) */}
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* 2. UI Layer */}
      <InterfaceOverlay openMenu={()=> setIsMenuOpen(true)} />

      {/* 3. Content Layer (Contient maintenant l'histoire ET les boutons finaux) */}
      <StorySlider />
      
      {/* 4. Petit footer discret */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 text-neutral-800 text-[10px] uppercase tracking-widest flex flex-col items-center gap-1 mix-blend-difference">
         <span className="pointer-events-none">© 2026 L'Envers du Décor</span>
         <Link href="/politique-de-confidentialite" className="pointer-events-auto hover:text-neutral-400 transition-colors">
            Politique de Confidentialité
         </Link>
      </div>

    </main>
  );
}