import React from 'react';
import { Music } from 'lucide-react';
import { useAudio } from '../context/AudioProvider';
import { useLanguage } from '../i18n/LanguageContext';

export function AudioAtmosphere() {
  const { t } = useLanguage();
  // Faixa única épica: o botão pausa e retoma do ponto onde parou.
  const { isPlaying, currentTrack, togglePlay } = useAudio();

  return (
    <div className="flex items-center gap-2">
      <button
        id="dark-audio-toggle-btn"
        onClick={togglePlay}
        title={isPlaying ? `${t.home.auPausePrefix}${currentTrack.name}` : `${t.home.auListenPrefix}${currentTrack.genre}`}
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
              {`${currentTrack.name} • ${t.home.auEpic}`}
            </span>
            <span className="text-[#C5A059] font-medium sm:hidden">
              {t.home.auEpicOn}
            </span>
          </>
        ) : (
          <>
            <Music className="w-3.5 h-3.5 text-[#C5A059] group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">
              {`${t.home.auEpicPrefix}${currentTrack.name}`}
            </span>
            <span className="sm:hidden">{t.home.auEpic}</span>
          </>
        )}
      </button>
    </div>
  );
}
