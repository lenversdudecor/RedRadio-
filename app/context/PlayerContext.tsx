"use client";

import { createContext, useContext, useState, useRef, useEffect, ReactNode, useCallback } from "react";
import { Podcast } from "@/lib/podcasts";

interface PlayerContextType {
  currentTrack: Podcast | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playTrack: (track: Podcast) => void;
  togglePlay: () => void;
  seek: (time: number) => void;
  setVolume: (val: number) => void;
  closePlayer: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Podcast | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.8); // Volume par défaut 80%
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 1. Initialisation unique de l'objet Audio
  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata"; // On charge les infos de base
    audioRef.current = audio;

    // Listeners natifs
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => setIsPlaying(false);
    
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  // 2. Gestion du Volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // 3. Fonction pour lancer une NOUVELLE piste
  const playTrack = useCallback((track: Podcast) => {
    if (!audioRef.current) return;

    // Si on clique sur la même piste, on toggle juste
    if (currentTrack?.id === track.id) {
      togglePlay();
      return;
    }

    // Nouvelle piste
    setCurrentTrack(track);
    setIsPlaying(true);
    
    audioRef.current.src = track.audioUrl;
    audioRef.current.load(); // Force le chargement
    
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.error("Erreur lecture auto:", error);
        setIsPlaying(false);
      });
    }
  }, [currentTrack]);

  // 4. Fonction Toggle (Pause/Play) sur la piste ACTUELLE
  const togglePlay = useCallback(() => {
    if (!audioRef.current || !currentTrack) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((e) => console.error("Erreur lecture:", e));
      }
    }
  }, [isPlaying, currentTrack]);

  // 5. Seek (Barre de progression)
  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  // 6. Fermeture
  const closePlayer = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTrack(null);
  }, []);

  const setVolume = useCallback((val: number) => {
    setVolumeState(val);
  }, []);

  return (
    <PlayerContext.Provider value={{ 
      currentTrack, 
      isPlaying, 
      currentTime, 
      duration, 
      volume,
      playTrack, 
      togglePlay, 
      seek, 
      setVolume,
      closePlayer 
    }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) throw new Error("usePlayer must be used within a PlayerProvider");
  return context;
}