"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [frequency, setFrequency] = useState(87.5);
  const [message, setMessage] = useState("INITIALISATION");

  useEffect(() => {
    // 1. Bloquer le scroll pendant le chargement
    document.body.style.overflow = "hidden";

    // 2. Animation du compteur de fréquence (Visuel uniquement)
    const freqInterval = setInterval(() => {
      setFrequency((prev) => {
        // Boucle entre 87.5 et 108.0 (Bande FM)
        if (prev >= 108.0) return 87.5; 
        return +(prev + 0.4).toFixed(1);
      });
    }, 30); // Très rapide pour donner une impression de vitesse

    // 3. Rotation des messages
    const messages = ["RECHERCHE...", "SIGNAL DÉTECTÉ", "DÉCRYPTAGE", "CONNEXION..."];
    let msgIndex = 0;
    const msgInterval = setInterval(() => {
      msgIndex = (msgIndex + 1) % messages.length;
      setMessage(messages[msgIndex]);
    }, 250);

    // 4. Logique de fin de chargement (PERFORMANCE CRITIQUE)
    const handleLoad = () => {
      // On laisse un tout petit délai (200ms) pour éviter un flash désagréable si c'est trop instantané
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.overflow = "";
      }, 200);
    };

    // Vérification de l'état du document
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      // Sécurité : Si le chargement prend trop de temps (ex: script bloquant), on force l'ouverture après 1.2s max
      setTimeout(handleLoad, 1200);
    }

    return () => {
      clearInterval(freqInterval);
      clearInterval(msgInterval);
      window.removeEventListener("load", handleLoad);
      document.body.style.overflow = ""; // Sécurité nettoyage
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader"
          // Animation de sortie : Glissement vers le haut + Fade out rapide
          exit={{ 
            y: "-100%", 
            opacity: 0,
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } // Courbe "Expo" rapide
          }}
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#050505] text-[#e0d5c1] overflow-hidden"
        >
          
          {/* Contenu Central */}
          <div className="relative flex flex-col items-center z-10">
            
            {/* Fréquence */}
            <div className="relative mb-6">
              <h1 className="font-mono text-6xl md:text-8xl font-bold tracking-tighter text-white tabular-nums leading-none">
                {frequency.toFixed(1)}
              </h1>
              <span className="absolute -right-8 top-2 text-xl md:text-2xl text-neutral-600 font-mono">MHz</span>
            </div>

            {/* Message Status */}
            <div className="flex flex-col items-center gap-3 w-64">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-red-500 animate-pulse h-4 text-center">
                {message}
              </p>
              
              {/* Barre de chargement infinie */}
              <div className="w-full h-2px bg-neutral-900 overflow-hidden relative">
                 <motion.div 
                   className="absolute top-0 bottom-0 bg-white w-1/2"
                   animate={{ left: ["-50%", "100%"] }}
                   transition={{ duration: 1, ease: "linear", repeat: Infinity }}
                 />
              </div>
            </div>

          </div>

          {/* Décoration d'arrière-plan */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
             {/* Ligne de scan verticale */}
             <div className="absolute top-0 bottom-0 left-1/2 w-1px bg-white/20" />
             {/* Ligne de scan horizontale */}
             <div className="absolute left-0 right-0 top-1/2 h-1px bg-white/20" />
             {/* Bruit statique (si classe noise-overlay dispo, sinon div simple) */}
             <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10" />
          </div>

          {/* Footer technique */}
          <div className="absolute bottom-8 left-0 right-0 text-center">
            <p className="text-[9px] text-neutral-600 font-mono uppercase tracking-widest">
              System Boot sequence v2.4
            </p>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}