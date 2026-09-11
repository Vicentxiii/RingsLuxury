import React, { useState, useEffect, useRef } from 'react';
import { Music, SkipForward } from 'lucide-react';

interface DarkTrack {
  id: string;
  name: string;
  composer: string;
  genre: string;
  src: string;
  startAt?: number;
}

const DARK_TRACKS: DarkTrack[] = [
  {
    id: 'a-hero-within',
    name: 'A Hero Within',
    composer: 'Shawn Barnes',
    genre: 'Epic • Heroic',
    src: '/audio/a-hero-within.mp3',
    startAt: 6,
  },
  {
    id: 'dark-cello',
    name: 'Cello Suite Prélude',
    composer: 'J.S. Bach',
    genre: 'Violoncelo Solo Dark',
    src: '/audio/dark-cello.mp3',
    startAt: 0,
  },
  {
    id: 'dark-cinematic',
    name: 'Darkest Child',
    composer: 'Kevin MacLeod',
    genre: 'Violoncelo & Cordas Sombrias',
    src: '/audio/dark-cinematic.mp3',
    startAt: 0,
  },
];

export function AudioAtmosphere() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef(false);
  const hasMountedRef = useRef(false);

  const currentTrack = DARK_TRACKS[trackIndex];

  // sync ref with state
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Initialize + autoplay at 00:06 + handle track transitions
  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.loop = true;
      audio.volume = 0.5;
      audio.preload = 'auto';
      audioRef.current = audio;
    }

    const audio = audioRef.current!;
    const isFirstLoad = !hasMountedRef.current;
    hasMountedRef.current = true;

    // should autoplay on first load regardless of previous state
    const shouldPlay = isFirstLoad ? true : isPlayingRef.current;

    const srcEncoded = encodeURI(currentTrack.src);
    audio.src = srcEncoded;
    audio.load();

    const startAt = currentTrack.startAt ?? 6;

    const seekAndPlay = () => {
      try {
        // ensure valid seek
        if (!isNaN(audio.duration) && audio.duration > startAt) {
          audio.currentTime = startAt;
        } else {
          audio.currentTime = startAt;
        }
      } catch {
        // ignore seek errors before metadata
      }
      if (shouldPlay) {
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn('Audio autoplay bloqueado, aguardando interação:', err);
            setIsPlaying(false);
            // fallback: primeira interação do usuário inicia em 00:06
            if (isFirstLoad) {
              const onFirstInteraction = () => {
                const a = audioRef.current;
                if (a && a.paused) {
                  try {
                    a.currentTime = startAt;
                  } catch {}
                  a.play()
                    .then(() => setIsPlaying(true))
                    .catch(() => {});
                }
              };
              window.addEventListener('click', onFirstInteraction, { once: true });
              window.addEventListener('keydown', onFirstInteraction, { once: true });
              window.addEventListener('touchstart', onFirstInteraction, { once: true });
              // também tenta após 500ms caso metadata demore
              setTimeout(onFirstInteraction, 800);
            }
          });
      }
    };

    const handleLoaded = () => {
      seekAndPlay();
    };

    if (audio.readyState >= 1) {
      // metadata already available
      handleLoaded();
    } else {
      audio.addEventListener('loadedmetadata', handleLoaded, { once: true });
      // fallback para canplay
      audio.addEventListener('canplay', handleLoaded, { once: true });
    }

    return () => {
      audio.pause();
      audio.removeEventListener('loadedmetadata', handleLoaded);
      audio.removeEventListener('canplay', handleLoaded);
    };
  }, [trackIndex]);

  // Handle play / pause toggle
  const togglePlay = () => {
    const startAt = currentTrack.startAt ?? 0;
    if (!audioRef.current) {
      const audio = new Audio(encodeURI(currentTrack.src));
      audio.loop = true;
      audio.volume = 0.5;
      audio.preload = 'auto';
      audioRef.current = audio;
      audio.src = encodeURI(currentTrack.src);
      audio.load();
      try {
        audio.currentTime = startAt;
      } catch {}
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('Audio playback error:', err);
          setIsPlaying(false);
        });
      return;
    }

    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      // se for primeira reprodução ou estiver no inicio, garante 00:06
      const needsSeek = audio.currentTime < 0.5 || audio.currentTime === 0;
      if (needsSeek && startAt > 0) {
        try {
          audio.currentTime = startAt;
        } catch {}
      }
      // se src mudou mas não recarregou
      if (audio.src !== encodeURI(currentTrack.src) && !audio.src.includes(encodeURI(currentTrack.src))) {
        audio.src = encodeURI(currentTrack.src);
        audio.load();
        const onReady = () => {
          try {
            audio.currentTime = startAt;
          } catch {}
          audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
        };
        audio.addEventListener('loadedmetadata', onReady, { once: true });
        return;
      }
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          if (needsSeek && startAt > 0) {
            try {
              audio.currentTime = startAt;
            } catch {}
          }
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
              {currentTrack.id === 'a-hero-within' ? `${currentTrack.name} • Epic` : `Violoncelo: ${currentTrack.name}`}
            </span>
            <span className="text-[#C5A059] font-medium sm:hidden">
              {currentTrack.id === 'a-hero-within' ? `Epic ON` : `Cello ON`}
            </span>
          </>
        ) : (
          <>
            <Music className="w-3.5 h-3.5 text-[#C5A059] group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">
              {currentTrack.id === 'a-hero-within' ? `Epic: ${currentTrack.name}` : `Violoncelo Dark`}
            </span>
            <span className="sm:hidden">{currentTrack.id === 'a-hero-within' ? `Epic` : `Violoncelo`}</span>
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


