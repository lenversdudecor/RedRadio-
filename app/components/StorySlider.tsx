"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Twitch, Mouse, Send } from "lucide-react";
import slides from "../content/slidesContent";

// --- DONNÉES ---

export default function StorySlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Style des boutons (J'ai retiré 'pointer-events-auto' d'ici pour le gérer dynamiquement)
  const ctaClass = "group relative flex items-center gap-4 px-8 py-4 border border-neutral-800 bg-black/50 backdrop-blur-sm hover:bg-neutral-900 transition-all duration-500 overflow-hidden min-w-[240px] justify-center cursor-pointer";
  const textClass = "font-serif text-xl text-[#e0d5c1] group-hover:text-white transition-colors z-10";
  const iconClass = "text-neutral-500 group-hover:text-white transition-colors z-10";

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="relative h-[700vh]"> 
      
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {slides.map((slide, index) => {
          const start = index / slides.length;
          const end = (index + 1) / slides.length;
          const range = end - start;

          const isFirst = index === 0;
          const isLast = index === slides.length - 1;
          const imgLast = index === slides.length - 1;
          
          // --- LOGIQUE D'OPACITÉ ---
          const opacityStart = isFirst ? 1 : 0;
          const opacityRange = isLast 
            ? [start, start + range * 0.2, end - 0.05, end] 
            : [start, start + range * 0.2, end - range * 0.2, end];
          const opacityOutput = isLast ? [0, 1, 1, 1] : [opacityStart, 1, 1, 0];

          // --- LOGIQUE IMAGE ---
          const imgOpacityRange = imgLast 
            ? [start, start + range * 0.2, end - 0.05, end] 
            : [start, start + range * 0.2, end - range * 0.2, end];
          const imgOpacityOutput = imgLast ? [0, 1, 1, 1] : [opacityStart, 1, 1, 0];

          const opacity = useTransform(scrollYProgress, opacityRange, opacityOutput);
          const y = useTransform(scrollYProgress, [start, end], [30, -30]);
          const blur = useTransform(
             scrollYProgress,
             [start, start + range * 0.1, end - range * 0.1, end], 
             ["8px", "0px", "0px", "8px"]
          );
          
          const imgOpacity = useTransform(scrollYProgress, imgOpacityRange, imgOpacityOutput);
          const imgScale = useTransform(scrollYProgress, [start, end], [1.15, 1]);

          // --- LOGIQUE POINTER-EVENTS (LA CORRECTION) ---
          // Si le scroll est dans la zone du slide, on active les clics ('auto').
          // Sinon, on les désactive ('none').
          const pointerEvents = useTransform(
            scrollYProgress,
            (val) => (val >= start && val < end + 0.01) || (isLast && val >= start) ? "auto" : "none"
          );

          return (
            <motion.div
              key={slide.id}
              className="absolute inset-0 flex items-center justify-center"
              style={{ 
                  zIndex: isLast ? 20 : 10,
                  pointerEvents: "none" // Le wrapper global bloque les clics par défaut
              }} 
            >
              {/* IMAGE DE FOND */}
              <motion.div 
                className="absolute inset-0 z-0"
                style={{ opacity: imgOpacity, scale: imgScale }}
              >
               <Image 
                src={slide.img}
                alt="Ambiance"
                fill
                className="object-cover grayscale brightness-[0.4] contrast-125"
                priority={index === 0} 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                quality={85} 
               />
               <div className="absolute inset-0 bg-radial-gradient-to-t from-black via-transparent to-black opacity-70"></div>
              </motion.div>

              {/* CONTENU (Texte ou Boutons) */}
              <motion.div
                // On applique ici le pointerEvents dynamique
                style={{ opacity, y, filter: blur, pointerEvents }}
                className="relative z-10 max-w-6xl px-8 text-center flex flex-col items-center"
              >
                {slide.type === 'cta' ? (
                  // --- SLIDE BOUTONS ---
                  <div className="flex flex-col items-center gap-8">
                      <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-4 animate-pulse">
                        Transmission prête
                      </p>
                      
                      <div className="flex flex-col items-center gap-6">
                        {/* LIGNE DU HAUT */}
                        <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                            <Link href="https://radio-lenversdudecor.com/live" target="_blank" className={ctaClass}>
                              <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                              <Play size={24} className={iconClass} />
                              <span className={textClass}>Lancer le Direct</span>
                            </Link>

                            <Link href="https://twitch.tv" target="_blank" className={ctaClass}>
                              <div className="absolute inset-0 bg-[#6441a5]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                              <Twitch size={24} className={iconClass} />
                              <span className={textClass}>Live Twitch</span>
                            </Link>
                        </div>

                        {/* LIGNE DU BAS */}
                        <div className="flex justify-center w-full">
                            <Link href="/contact" className={ctaClass}>
                              <div className="absolute inset-0 bg-red-900/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                              <Send size={24} className={iconClass} />
                              <span className={textClass}>Prenez Contact</span>
                            </Link>
                        </div>
                      </div>
                  </div>
                ) : (
                  // --- SLIDE TEXTE ---
                  <>
                    <p className="font-serif text-2xl md:text-5xl lg:text-4xl leading-relaxed text-[#e0d5c1] drop-shadow-2xl">
                      {slide.text}
                    </p>
                    <div className="mt-10 flex justify-center opacity-60">
                      <span className="text-xs uppercase tracking-[0.3em] font-sans text-[#a89f8e] bg-black/30 px-4 py-2 backdrop-blur-sm rounded-full border border-white/10">
                          — {slide.sub} —
                      </span>
                    </div>

                    {isFirst && (
                       <motion.div 
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: 1.5, duration: 1 }}
                         className="mt-16 flex flex-col items-center gap-2 text-neutral-500"
                       >
                         <Mouse size={24} className="animate-bounce" />
                         <span className="text-[10px] font-mono uppercase tracking-widest opacity-70">
                           Scrollez pour entrer
                         </span>
                       </motion.div>
                    )}
                  </>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}