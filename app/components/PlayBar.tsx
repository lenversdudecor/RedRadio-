"use client";

import { usePlayer } from "../context/PlayerContext";
import { Play, Pause, X, Volume2, Volume1, VolumeX } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function PlayerBar() {
  const { currentTrack, isPlaying, togglePlay, closePlayer, currentTime, duration, seek, volume, setVolume } = usePlayer();
  
  // État local pour la fluidité de la barre de progression
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Synchronise la barre avec l'audio SEULEMENT si l'utilisateur ne touche pas à la barre
  useEffect(() => {
    if (!isDragging) {
      setProgress(currentTime);
    }
  }, [currentTime, isDragging]);

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgress(Number(e.target.value));
  };

  const handleSeekStart = () => setIsDragging(true);
  
  const handleSeekEnd = (e: React.MouseEvent<HTMLInputElement> | React.TouchEvent<HTMLInputElement>) => {
    setIsDragging(false);
    seek(Number(e.currentTarget.value));
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const VolumeIcon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <AnimatePresence>
      {currentTrack && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-0 left-0 right-0 z-60 border-t border-white/10 bg-[#0a0a0a] px-4 py-3 md:px-8 md:py-4 shadow-2xl"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 h-full">
            
            {/* 1. INFO TRACK */}
            <div className="flex items-center gap-4 w-1/3 min-w-0">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded bg-neutral-800 border border-white/10">
                <Image
                  src={currentTrack.coverImage}
                  alt={currentTrack.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="truncate font-serif text-xl font-bold text-white">
                  {currentTrack.title}
                </span>
                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                    <span className="truncate text-sm uppercase tracking-wider text-white/60">
                    En lecture
                    </span>
                </div>
              </div>
            </div>

            {/* 2. CONTROLS CENTRAUX */}
            <div className="flex w-1/3 flex-col items-center justify-center gap-1 md:gap-2">
              <button
                onClick={togglePlay}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black hover:scale-105 transition-transform active:scale-95"
              >
                {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
              </button>
              
              <div className="flex w-full max-w-md items-center gap-3 text-sm font-mono text-white/60">
                <span className="w-10 text-right">{formatTime(progress)}</span>
                
                {/* Barre de Progression Custom */}
                <div className="relative flex-1 group h-6 flex items-center cursor-pointer">
                   <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    value={progress}
                    onChange={handleSeekChange}
                    onMouseDown={handleSeekStart}
                    onTouchStart={handleSeekStart}
                    onMouseUp={handleSeekEnd}
                    onTouchEnd={handleSeekEnd}
                    className="absolute inset-0 z-20 w-full opacity-0 cursor-pointer"
                  />
                  {/* Background Track */}
                  <div className="relative w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                    {/* Active Track */}
                    <div 
                        className="absolute left-0 top-0 h-full bg-white transition-all duration-75 ease-out"
                        style={{ width: `${(progress / (duration || 1)) * 100}%` }}
                    />
                  </div>
                  {/* Thumb (visible au hover) */}
                  <div 
                     className="absolute h-4 w-4 bg-white rounded-full shadow pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                     style={{ left: `${(progress / (duration || 1)) * 100}%`, transform: 'translateX(-50%)' }}
                  />
                </div>

                <span className="w-10">{formatTime(duration)}</span>
              </div>
            </div>

            {/* 3. VOLUME & CLOSE */}
            <div className="flex w-1/3 justify-end items-center gap-4 md:gap-8">
              {/* Contrôle de Volume */}
              <div className=" md:flex items-center gap-3 group">
                <button onClick={() => setVolume(volume === 0 ? 0.8 : 0)} className="text-white/70 hover:text-white transition-colors flex flex-col">
                    <VolumeIcon size={22} />
                </button>
                <div className="w-24 h-1.5 bg-neutral-800 rounded-full relative overflow-hidden group-hover:w-32 transition-all duration-300">
                    <div 
                        className="absolute left-0 top-0 h-full bg-white transition-colors"
                        style={{ width: `${volume * 100}%` }}
                    />
                    <input 
                        type="range"
                        min={0} max={1} step={0.01}
                        value={volume}
                        onChange={(e) => setVolume(Number(e.target.value))}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                </div>
              </div>
              
              <button 
                onClick={closePlayer}
                className="text-white/70 hover:text-white hover:bg-white/10 p-3 rounded-full transition-all"
              >
                <X size={24} />
              </button>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}