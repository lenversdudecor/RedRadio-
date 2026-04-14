"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function ScrollSection({ children, className = "", delay = 0 }: ScrollSectionProps) {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: 40, 
        filter: "blur(12px)" // Le flou initial simule l'apparition "bruitée"
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        filter: "blur(0px)" 
      }}
      viewport={{ once: true, margin: "-15%" }} // Déclenche un peu avant le centre
      transition={{ 
        duration: 0.9, 
        ease: [0.22, 1, 0.36, 1], // Courbe "easeOutQuint" très douce
        delay: delay 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}