import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

export interface DarkTrack {
  id: string;
  name: string;
  composer: string;
  genre: string;
  src: string;
  startAt?: number;
}

export const DARK_TRACKS: DarkTrack[] = [
  {
    id: 'a-hero-within',
    name: 'A Hero Within',
    composer: 'Shawn Barnes',
    genre: 'Epic • Heroic',
    src: '/audio/a-hero-within.mp3',
    startAt: 6,
  },
];

interface AudioContextValue {
  isPlaying: boolean;
  trackIndex: number;
  currentTrack: DarkTrack;
  togglePlay: () => void;
}

const AudioCtx = createContext<AudioContextValue | null>(null);

export function useAudio(): AudioContextValue {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error('useAudio must be used within AudioProvider');
  return ctx;
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef(false);
  const trackIndexRef = useRef(0);
  const hasInitializedRef = useRef(false);
  const isFirstRenderRef = useRef(true);

  // sync refs
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    trackIndexRef.current = trackIndex;
  }, [trackIndex]);

  // Cria o elemento de áudio, mas NÃO define src nem chama load().
  // preload="none" + src vazio = zero bytes de áudio na primeira visita.
  // O arquivo só é baixado quando o visitante clica no botão de som.
  useEffect(() => {
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;

    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0.5;
    audio.preload = 'none';
    audioRef.current = audio;

    // Restaura apenas a faixa escolhida; o play continua exigindo clique.
    let initialTrack = 0;
    try {
      const savedTrack = sessionStorage.getItem('rl-audio-track');
      if (savedTrack !== null) initialTrack = parseInt(savedTrack, 10) || 0;
    } catch {}

    if (initialTrack < 0 || initialTrack >= DARK_TRACKS.length || isNaN(initialTrack)) {
      initialTrack = 0;
    }
    if (initialTrack !== 0) {
      setTrackIndex(initialTrack);
      trackIndexRef.current = initialTrack;
    }

    const onTimeUpdate = () => {
      try {
        // throttle heavy writes: only each ~1s, but timeupdate fires ~4Hz so ok to just set
        sessionStorage.setItem('rl-audio-time', String(audio.currentTime));
      } catch {}
    };

    const onPlay = () => {
      setIsPlaying(true);
      try {
        sessionStorage.setItem('rl-audio-playing', 'true');
      } catch {}
    };

    const onPause = () => {
      // só atualiza se não for pause de troca de faixa (nesse caso isPlayingRef ainda true mas vamos trocar src)
      // de qualquer forma, grava estado
      setIsPlaying(false);
      try {
        sessionStorage.setItem('rl-audio-playing', 'false');
      } catch {}
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    const onBeforeUnload = () => {
      try {
        sessionStorage.setItem('rl-audio-time', String(audio.currentTime));
        sessionStorage.setItem('rl-audio-track', String(trackIndexRef.current));
        sessionStorage.setItem('rl-audio-playing', String(isPlayingRef.current));
      } catch {}
    };
    window.addEventListener('beforeunload', onBeforeUnload);

    // Salva periodicamente também via interval (caso timeupdate não dispare quando pausado)
    const saveInterval = window.setInterval(() => {
      try {
        if (audioRef.current && !audioRef.current.paused) {
          sessionStorage.setItem('rl-audio-time', String(audioRef.current.currentTime));
          sessionStorage.setItem('rl-audio-track', String(trackIndexRef.current));
        }
      } catch {}
    }, 1000);

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
      window.clearInterval(saveInterval);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      // IMPORTANT: não destruir o audio no unmount do StrictMode dev - mas em produção provider nunca desmonta.
      // Se realmente desmontando (hot reload), persiste estado
      try {
        sessionStorage.setItem('rl-audio-time', String(audio.currentTime));
        sessionStorage.setItem('rl-audio-track', String(trackIndexRef.current));
        sessionStorage.setItem('rl-audio-playing', String(isPlayingRef.current));
      } catch {}
    };
  }, []);

  // Handle track change - preserva continuidade de reprodução
  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }
    const audio = audioRef.current;
    if (!audio) return;
    const track = DARK_TRACKS[trackIndex];
    if (!track) return;
    const startAt = track.startAt ?? 6;
    const shouldPlay = isPlayingRef.current;

    try {
      sessionStorage.setItem('rl-audio-track', String(trackIndex));
    } catch {}

    const newSrc = encodeURI(track.src);
    // evita recarregar se mesmo src (decode comparison)
    const currentSrc = audio.src;
    if (currentSrc.includes(newSrc) || currentSrc === newSrc || decodeURI(currentSrc).includes(decodeURI(newSrc))) {
      return;
    }

    const wasPlaying = shouldPlay;

    // remover listeners antigos de canplay/loadedmetadata é automático por once:true
    audio.src = newSrc;
    audio.load();

    const handleLoaded = () => {
      try {
        audio.currentTime = startAt;
      } catch {}
      try {
        sessionStorage.setItem('rl-audio-time', String(startAt));
      } catch {}
      if (wasPlaying) {
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    };

    if (audio.readyState >= 1) {
      handleLoaded();
    } else {
      audio.addEventListener('loadedmetadata', handleLoaded, { once: true });
      audio.addEventListener('canplay', handleLoaded, { once: true });
      // fallback timeout para garantir play mesmo se metadata não disparar
      setTimeout(() => {
        if (audio.src.includes(newSrc) && audio.paused && wasPlaying) {
          handleLoaded();
        }
      }, 500);
    }
  }, [trackIndex]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    const currentIdx = trackIndexRef.current;
    const track = DARK_TRACKS[currentIdx];
    if (!audio || !track) return;
    const startAt = track.startAt ?? 0;

    if (isPlayingRef.current) {
      audio.pause();
      setIsPlaying(false);
      try {
        sessionStorage.setItem('rl-audio-playing', 'false');
        sessionStorage.setItem('rl-audio-time', String(audio.currentTime));
      } catch {}
    } else {
      // se está no início, garante startAt
      const needsSeek = audio.currentTime < 0.5 || audio.currentTime === 0;
      const expectedSrc = encodeURI(track.src);
      const srcMatches = audio.src.includes(expectedSrc) || decodeURI(audio.src).includes(decodeURI(expectedSrc));

      if (!srcMatches) {
        audio.src = expectedSrc;
        audio.load();
        const onReady = () => {
          try {
            audio.currentTime = startAt;
          } catch {}
          audio
            .play()
            .then(() => {
              setIsPlaying(true);
              try {
                sessionStorage.setItem('rl-audio-playing', 'true');
              } catch {}
            })
            .catch(() => setIsPlaying(false));
        };
        audio.addEventListener('loadedmetadata', onReady, { once: true });
        audio.addEventListener('canplay', onReady, { once: true });
        return;
      }

      if (needsSeek && startAt > 0) {
        try {
          audio.currentTime = startAt;
        } catch {}
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
          try {
            sessionStorage.setItem('rl-audio-playing', 'true');
          } catch {}
        })
        .catch((err) => {
          console.warn('Audio playback error:', err);
          setIsPlaying(false);
        });
    }
  }, []);

  const value: AudioContextValue = {
    isPlaying,
    trackIndex,
    currentTrack: DARK_TRACKS[trackIndex],
    togglePlay,
  };

  return <AudioCtx.Provider value={value}>{children}</AudioCtx.Provider>;
}
