import {motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";
import MenuLinks from "../Links/MenuLinks"; 

interface MenuOverlayProps{
  isOpen: boolean;
  onClose: () => void;
} 

export default function MenuOverlay ({isOpen, onClose} : MenuOverlayProps){
  return(
    <AnimatePresence>
      {isOpen &&(
        <motion.div 
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        transition={{duration:0.5}}
        className="fixed inset-0 z-100 flex items-center justify-center bg-[#050505]/95 backdrop-blur-xl text-[#e0d5c1]"
        >
          <button 
          onClick={onClose}
          className="absolute top-6 left-6 md:top-12 md:left-12 flex items-center gap-3 text-xs uppercase tracking-[0.2em] group hover:text-white transition-colors duration-5"
          >
            <div className="p-2 border border-white/20 rounded-full group-hover:border-white transition-colors">
              <X size={16} />
            </div>
            <span>Fermer</span>
          </button>
          {/* Animation d'affichage des liens */}
          <nav className="flex flex-col items-start gap-8 md:gap-12 p-8"> 
            {MenuLinks.map((link,index)=>(
              <motion.div
                key={link.id}
                initial={{opacity:0, x:-50}}
                animate={{opacity:1, x:0}}
                exit={{opacity:0, x:-50}}
                transition={{delay:0.1 + index*0.1, duration:0.5, ease:"easeOut"}}
              >
                <Link href={link.href}
                target={link.external ? "_blank": undefined}
                onClick={onClose}
                className="group flex items-baseline gap-6 font-serif text-4xl md:text-6xl lg:text-7xl hover:text-white transition-colors">
                  <span className="font-sans text-xs md:text-sm text-neutral-600 font-bold tracking-widest -translate-y-4 group-hover:text-neutral-400 transition-colors">
                    {link.id}
                  </span>
                  
                  <span className="relative overflow-hidden block">
                    <span className="block group-hover:-translate-y-full transition-transform duration-500 ease-[0.22,1,0.36,1]">
                      {link.label}
                    </span>
                    <span className="absolute top-0 left-0 block translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1] text-neutral-400 italic">
                      {link.label}
                    </span>
                  </span>
                  <ArrowRight size ={24} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-neutral-500"/>
                </Link>
              </motion.div>
            ))}
          </nav>
          <div className="absolute inset-0 pointer-events-none z-[-1] opacity-10">
             <div className="absolute top-1/2 left-0 w-full h-px bg-white" />
             <div className="absolute top-0 left-1/2 w-px h-full bg-white" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}