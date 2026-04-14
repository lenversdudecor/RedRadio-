"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Vérifier si le consentement a déjà été donné
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      // Afficher avec un léger délai pour l'esthétique
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "accepted");
    // Procédure: initialiser ici les scripts d'analyse (ex: Google Analytics) si besoin.
    setShow(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookie_consent", "declined");
    // Procédure: s'assurer qu'aucun cookie non-essentiel n'est créé.
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 pointer-events-none"
        >
          <div className="max-w-5xl mx-auto bg-black/80 backdrop-blur-xl border border-neutral-800 p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center justify-between shadow-[0_0_40px_rgba(0,0,0,0.5)] pointer-events-auto">
            <div className="flex-1">
              <h3 className="font-serif text-xl md:text-2xl text-white mb-2">Transmission sécurisée / Cookies</h3>
              <p className="text-neutral-400 text-xs md:text-sm leading-relaxed max-w-2xl">
                Nous utilisons des cookies essentiels pour le fonctionnement du player radio, ainsi que des cookies analytiques visant à mesurer l'audience de nos fréquences. 
                <Link href="/politique-de-confidentialite" className="ml-2 inline-flex border-b border-orange-800/50 text-orange-400 hover:text-orange-300 hover:border-orange-400 transition-all">
                  En savoir plus
                </Link>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              <button 
                onClick={declineCookies}
                className="px-6 py-3 border border-neutral-700 hover:border-orange-500/50 hover:bg-orange-500/10 text-neutral-300 hover:text-white font-mono text-xs uppercase tracking-widest transition-all w-full sm:w-auto text-center"
              >
                Refuser
              </button>
              <button 
                onClick={acceptCookies}
                className="px-6 py-3 bg-neutral-200 hover:bg-white text-black font-mono text-xs uppercase tracking-widest transition-colors w-full sm:w-auto text-center shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              >
                Accepter
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
