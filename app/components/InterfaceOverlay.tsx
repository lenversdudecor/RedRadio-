import { Play, Mic, Twitch, Menu as MenuIcon } from "lucide-react";
import Link from "next/link";

interface InterfaceOverlayProps {
  openMenu: () => void;
}

export default function InterfaceOverlay({openMenu}: InterfaceOverlayProps) {
  // Style commun 
  const btnClass = "fixed z-40 flex items-center gap-3 px-5 py-3 bg-black/40 backdrop-blur-md border border-white/10 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black hover:border-white transition-all duration-300 group";

  return (
    <>
      <button 
      onClick={openMenu}
      className={`${btnClass} top-6 left-6 md:top-10 md:left-10`}>
         <span>Menu</span>
         <MenuIcon size={14} className="hidden md:block"/>
      </button>
        
      {/* Haut Droite: Twitch */}
      <Link href="https://twitch.tv/votrechaine" target="_blank" className={`${btnClass} top-6 right-6 md:top-10 md:right-10`}>
        <span className="md:inline">Twitch</span>
        <Twitch size={14} className="hidden md:inline" />
      </Link>

      {/* Bas Gauche: Media Player (Lien Externe) */}
      <Link href="https://radio-lenversdudecor.com/live" target="_blank" className={`${btnClass} bottom-6 left-6 md:bottom-10 md:left-10`}>
        <Mic size={14} className="hidden md:inline"  />
        <span className=" md:inline">Le Direct</span>
      </Link>

      {/* Bas Droite: Podcasts */}
      <Link href="/podcasts" className={`${btnClass} bottom-6 right-6 md:bottom-10 md:right-10`}>
        <span className=" md:inline">Podcasts</span>
        <Play size={14} className="hidden md:inline" />
      </Link>
    </>
  );
}

