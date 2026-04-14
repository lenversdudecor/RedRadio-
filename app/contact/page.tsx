"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react"; // Ajout de AlertCircle
import InterfaceOverlay from "@/app/components/InterfaceOverlay";
import MenuOverlay from "@/app/components/MenuOverlay";

export default function ContactPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // États du formulaire
  const [formState, setFormState] = useState<"idle" | "transmitting" | "sent" | "error">("idle");
  const [signalStrength, setSignalStrength] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  // --- 1. ETATS POUR LES CHAMPS ---
  const [formData, setFormData] = useState({
    identifiant: "",
    email: "",
    message: ""
  });

  // Gestion des changements dans les inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Simulation de fluctuation du signal
  useEffect(() => {
    const interval = setInterval(() => {
      setSignalStrength(Math.random() * 100);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // --- 2. ENVOI VERS PHP ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("transmitting");

    try {
      // Remplacez l'URL ci-dessous par l'URL réelle de votre fichier PHP sur votre hébergement
      // Exemple : "https://mon-site-radio.com/send-mail.php"
const response = await fetch("/send-mail.php", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.sent) {
        setFormState("sent");
        // Reset du formulaire
        setFormData({ identifiant: "", email: "", message: "" });
      } else {
        setFormState("error");
        setErrorMessage(result.message || "Erreur inconnue du serveur.");
      }

    } catch (error) {
      setFormState("error");
      setErrorMessage("Échec de la connexion au relais SMTP.");
      console.error(error);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#050505] text-[#e0d5c1] selection:bg-red-900 selection:text-white font-sans overflow-hidden">
      
      <div className="noise-overlay" />
      <div className="ambient-light fixed inset-0 opacity-20 pointer-events-none" />
      
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <InterfaceOverlay openMenu={() => setIsMenuOpen(true)} />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 md:p-12">
        
        <div className="w-full max-w-2xl mb-12 text-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 border border-red-900/50 bg-red-900/10 rounded-full mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
            <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest">Canal Ouvert</span>
          </motion.div>

          <h1 className="font-serif text-4xl md:text-6xl text-white mb-4">Transmission</h1>
          <p className="font-mono text-xs md:text-sm text-neutral-500 uppercase tracking-widest">
            Envoyez vos rapports, sons ou anomalies.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 p-8 md:p-12 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/5 to-transparent h-2px w-full translate-y-100% group-hover:animate-scan" />

          <AnimatePresence mode="wait">
            
            {/* ETAT 1 : FORMULAIRE */}
            {(formState === "idle" || formState === "error") && (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-8"
              >
                {/* Champ: Identifiant */}
                <div className="relative group/input">
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-neutral-500 mb-2 group-focus-within/input:text-red-500 transition-colors">
                    01 — Identifiant
                  </label>
                  <div className="flex items-center gap-4 border-b border-white/10 group-focus-within/input:border-red-500 transition-colors py-2">
                    <span className="text-neutral-600 font-mono">{">"}</span>
                    <input 
                      required
                      name="identifiant" // Important pour le state
                      value={formData.identifiant} // Liaison state
                      onChange={handleChange} // Liaison event
                      type="text" 
                      placeholder="Votre Nom de Code" 
                      className="bg-transparent w-full outline-none font-serif text-xl text-white placeholder:text-neutral-700"
                    />
                  </div>
                </div>

                {/* Champ: Fréquence (Email) */}
                <div className="relative group/input">
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-neutral-500 mb-2 group-focus-within/input:text-red-500 transition-colors">
                    02 — Fréquence de Retour
                  </label>
                  <div className="flex items-center gap-4 border-b border-white/10 group-focus-within/input:border-red-500 transition-colors py-2">
                    <span className="text-neutral-600 font-mono">{">"}</span>
                    <input 
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email" 
                      placeholder="contact@exemple.com" 
                      className="bg-transparent w-full outline-none font-serif text-xl text-white placeholder:text-neutral-700"
                    />
                  </div>
                </div>

                {/* Champ: Message */}
                <div className="relative group/input">
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-neutral-500 mb-2 group-focus-within/input:text-red-500 transition-colors">
                    03 — Données Cryptées
                  </label>
                  <div className="flex items-start gap-4 border-b border-white/10 group-focus-within/input:border-red-500 transition-colors py-2">
                    <span className="text-neutral-600 font-mono mt-1">{">"}</span>
                    <textarea 
                      required
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Contenu du signal..." 
                      className="bg-transparent w-full outline-none font-serif text-xl text-white placeholder:text-neutral-700 resize-none"
                    />
                  </div>
                </div>

                {/* Affichage Erreur si besoin */}
                {formState === "error" && (
                    <div className="flex items-center gap-2 text-red-500 text-xs font-mono uppercase tracking-widest border border-red-500/20 bg-red-900/10 p-3">
                        <AlertCircle size={14} />
                        <span>Erreur: {errorMessage}</span>
                    </div>
                )}

                {/* Bouton d'envoi */}
                <div className="pt-6 flex justify-end">
                  <button 
                    type="submit"
                    className="group/btn relative flex items-center gap-4 px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white transition-all overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/5 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                    <span className="font-mono text-xs uppercase tracking-[0.2em] z-10">Initialiser l'envoi</span>
                    <Send size={14} className="z-10 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.form>
            )}

            {/* ETAT 2 : EN COURS */}
            {formState === "transmitting" && (
              <motion.div 
                key="transmitting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20 gap-8"
              >
                <div className="flex items-end gap-1 h-12">
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        height: [10, Math.random() * 40 + 10, 10],
                        backgroundColor: ["#333", "#fff", "#333"]
                      }}
                      transition={{ 
                        duration: 0.5, 
                        repeat: Infinity, 
                        delay: i * 0.1,
                        ease: "easeInOut" 
                      }}
                      className="w-1 bg-neutral-700"
                    />
                  ))}
                </div>
                <p className="font-mono text-xs uppercase tracking-widest animate-pulse text-red-500">
                  Uplink en cours... {Math.floor(signalStrength)}%
                </p>
              </motion.div>
            )}

            {/* ETAT 3 : SUCCÈS */}
            {formState === "sent" && (
              <motion.div 
                key="sent"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 gap-6 text-center"
              >
                <div className="w-16 h-16 border border-green-500/30 rounded-full flex items-center justify-center text-green-500">
                  <CheckCircle2 size={32} />
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-white mb-2">Signal Reçu</h3>
                  <p className="text-neutral-400 font-sans max-w-xs mx-auto">
                    Vos données ont été cryptées et archivées. Nous vous contacterons si la fréquence le permet.
                  </p>
                </div>
                <button 
                  onClick={() => setFormState("idle")}
                  className="mt-6 text-[10px] font-mono uppercase tracking-widest text-neutral-500 hover:text-white border-b border-transparent hover:border-white transition-all pb-1"
                >
                  Nouvelle transmission
                </button>
              </motion.div>
            )}

          </AnimatePresence>

          <div className="absolute bottom-4 left-6 right-6 flex justify-between text-[8px] font-mono text-neutral-700 uppercase tracking-widest pointer-events-none">
             <span>SECURE PROTOCOL: TLS 1.3</span>
             <span>LATENCY: 24ms</span>
          </div>
        </motion.div>

      </div>

    </main>
  );
}