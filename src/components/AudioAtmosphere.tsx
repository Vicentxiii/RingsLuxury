import React, { useState, useEffect, useRef } from 'react';
import { Music, SkipForward } from 'lucide-react';

interface DarkTrack {
  id: string;
  name: string;
  composer: string;
  genre: string;
  src: string;
}

const DARK_TRACKS: DarkTrack[] = [
  {
    id: 'dark-cello',
    name: 'Cello Suite Prélude',
    composer: 'J.S. Bach',
    genre: 'Violoncelo Solo Dark',
    src: '/audio/dark-cello.mp3',
  },
  {
    id: 'dark-cinematic',
    name: 'Darkest Child',
    composer: 'Kevin MacLeod',
    genre: 'Violoncelo & Cordas Sombrias',
    src: '/audio/dark-cinematic.mp3',
  },
];

export function AudioAtmosphere() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = DARK_TRACKS[trackIndex];

  // Initialize and handle track transitions
  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.loop = true;
      audio.volume = 0.5;
      audioRef.current = audio;
    }

    const audio = audioRef.current;
    const wasPlaying = isPlaying;

    audio.src = currentTrack.src;
    audio.load();

    if (wasPlaying) {
      audio.play().catch(() => {
        setIsPlaying(false);
      });
    }

    return () => {
      audio.pause();
    };
  }, [trackIndex]);

  // Handle play / pause toggle
  const togglePlay = () => {
    if (!audioRef.current) {
      const audio = new Audio(currentTrack.src);
      audio.loop = true;
      audio.volume = 0.5;
      audioRef.current = audio;
    }

    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Audio playback error:', err);
          setIsPlaying(false);
        });
    }
  };

  const nextTrack = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTrackIndex((prev) => (prev + 1) % DARK_TRACKS.length);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  return (
    <div className="flex items-center gap-2">
      <button
        id="dark-audio-toggle-btn"
        onClick={togglePlay}
        title={isPlaying ? `Pausar: ${currentTrack.name}` : `Ouvir ${currentTrack.genre}`}
        className={`group flex items-center gap-2.5 px-4 py-2 rounded-full border transition-all duration-500 backdrop-blur-md text-[10px] tracking-[0.22em] uppercase font-sans-luxury ${
          isPlaying
            ? 'border-[#C5A059] bg-[#C5A059]/15 text-[#F3EFE6] shadow-[0_0_25px_rgba(197,160,89,0.35)]'
            : 'border-[#C5A059]/30 hover:border-[#C5A059] bg-[#070707]/80 text-[#EAE6DF]/75 hover:text-[#C5A059]'
        }`}
      >
        {isPlaying ? (
          <>
            <div className="flex items-end gap-0.5 h-3.5 w-3.5 pb-0.5" aria-hidden="true">
              <span className="w-1 bg-[#C5A059] rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-3" />
              <span className="w-1 bg-[#E6CA85] rounded-full animate-[pulse_0.9s_ease-in-out_infinite_0.2s] h-4" />
              <span className="w-1 bg-[#C5A059] rounded-full animate-[pulse_0.7s_ease-in-out_infinite_0.4s] h-2" />
            </div>
            <span className="text-[#C5A059] font-medium hidden sm:inline">
              Violoncelo: {currentTrack.name}
            </span>
            <span className="text-[#C5A059] font-medium sm:hidden">
              Cello ON
            </span>
          </>
        ) : (
          <>
            <Music className="w-3.5 h-3.5 text-[#C5A059] group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Violoncelo Dark</span>
            <span className="sm:hidden">Violoncelo</span>
          </>
        )}
      </button>

      {/* Skip to Next Dark Track */}
      {isPlaying && (
        <button
          onClick={nextTrack}
          title="Próxima Faixa (Violoncelo & Cordas)"
          className="p-2 rounded-full border border-[#C5A059]/40 bg-[#070707]/80 hover:bg-[#C5A059]/20 hover:border-[#C5A059] text-[#C5A059] transition-all"
        >
          <SkipForward className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}


