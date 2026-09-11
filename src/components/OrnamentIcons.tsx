import React from 'react';

// Subtle antique gold SVG ornaments and Greek architectural motifs

export function GreekKeyBorder({ className = "w-full h-3" }: { className?: string }) {
  return (
    <div className={`overflow-hidden flex items-center opacity-70 ${className}`}>
      <svg className="w-full h-full text-[#C5A059]" fill="none" viewBox="0 0 400 12" preserveAspectRatio="repeat-x">
        <pattern id="greek-key" width="32" height="12" patternUnits="userSpaceOnUse">
          <path
            d="M0 10 H14 V2 H6 V6 H10 V4 H8 M16 2 H30 V10 H22 V6 H26 V8 H24"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeLinecap="square"
          />
        </pattern>
        <rect width="100%" height="12" fill="url(#greek-key)" />
      </svg>
    </div>
  );
}

export function GreekMeanderDivider({ className = "my-8" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <div className="h-px bg-gradient-to-r from-transparent via-[#C5A059]/40 to-[#C5A059]/10 w-24 md:w-36" />
      <svg className="w-6 h-6 text-[#C5A059]/80" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path
          d="M3 12h3v-4h6v6h-4v-2h2 M15 12h3v4h-6v-6h4v2h-2"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="1.5" fill="#C5A059" fillOpacity="0.8" />
      </svg>
      <div className="h-px bg-gradient-to-l from-transparent via-[#C5A059]/40 to-[#C5A059]/10 w-24 md:w-36" />
    </div>
  );
}

export function LaurelWreath({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={`text-[#C5A059] ${className}`} viewBox="0 0 64 64" fill="currentColor">
      {/* Left branch */}
      <path
        d="M26 50 C20 44 14 36 14 26 C14 18 18 10 24 6 C20 12 18 18 19 24 C16 22 13 18 14 14 C12 18 13 24 16 28 C13 28 10 25 9 22 C9 27 12 32 16 35 C13 36 10 34 8 32 C9 38 13 43 19 46 C16 48 13 47 11 46 C14 52 20 54 26 50 Z"
        opacity="0.85"
      />
      {/* Right branch */}
      <path
        d="M38 50 C44 44 50 36 50 26 C50 18 46 10 40 6 C44 12 46 18 45 24 C48 22 51 18 50 14 C52 18 51 24 48 28 C51 28 54 25 55 22 C55 27 52 32 48 35 C51 36 54 34 56 32 C55 38 51 43 45 46 C48 48 51 47 53 46 C50 52 44 54 38 50 Z"
        opacity="0.85"
      />
      {/* Ribbon bottom */}
      <path
        d="M30 52 C31 54 33 54 34 52 C35 55 37 57 39 59 C37 58 35 58 32 60 C29 58 27 58 25 59 C27 57 29 55 30 52 Z"
        opacity="0.9"
      />
    </svg>
  );
}

export function AcanthusLeaf({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={`text-[#C5A059] ${className}`} viewBox="0 0 40 40" fill="currentColor">
      <path
        d="M20 38 C20 34 22 28 26 22 C22 24 19 22 18 19 C22 19 24 15 28 13 C23 14 20 11 20 7 C21 12 25 10 30 8 C27 12 31 16 33 19 C30 19 27 23 27 27 C31 24 35 27 34 31 C31 30 28 32 26 35 C24 37 22 38 20 38 Z"
        opacity="0.75"
      />
      <path
        d="M20 38 C20 34 18 28 14 22 C18 24 21 22 22 19 C18 19 16 15 12 13 C17 14 20 11 20 7 C19 12 15 10 10 8 C13 12 9 16 7 19 C10 19 13 23 13 27 C9 24 5 27 6 31 C9 30 12 32 14 35 C16 37 18 38 20 38 Z"
        opacity="0.75"
      />
    </svg>
  );
}

export function CorinthianCapitalIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={`text-[#C5A059] ${className}`} viewBox="0 0 48 48" fill="none" stroke="currentColor">
      {/* Abacus */}
      <path d="M4 10h40v3H4z" strokeWidth="1.2" />
      <path d="M7 13c3 2 7 2 10 0 4 2 10 2 14 0 3 2 7 2 10 0" strokeWidth="1" />
      {/* Volutes */}
      <path d="M9 15c-3 1-4 4-2 6 2 2 5 0 5-3" strokeWidth="1" />
      <path d="M39 15c3 1 4 4 2 6-2 2-5 0-5-3" strokeWidth="1" />
      {/* Acanthus scrolls */}
      <path d="M16 22c-2 4-1 9 0 13 M32 22c2 4 1 9 0 13 M24 20v15" strokeWidth="1" />
      {/* Astragal & Column neck */}
      <path d="M12 37h24v2H12z" strokeWidth="1.2" />
      <path d="M14 39v5h20v-5" strokeWidth="1.2" />
    </svg>
  );
}

export function AncientCoinMedallion({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center rounded-full border border-[#C5A059]/40 bg-[#0d0d0c] p-1.5 shadow-[0_0_15px_rgba(197,160,89,0.12)] ${className}`}>
      <svg className="w-full h-full text-[#C5A059]" viewBox="0 0 32 32" fill="none" stroke="currentColor">
        <circle cx="16" cy="16" r="14" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
        <circle cx="16" cy="16" r="11.5" strokeWidth="0.5" />
        {/* Ancient Greek Athenian Owl or Classical Profile Silhouette */}
        <path
          d="M16 8c-2.5 0-4 1.8-4 4.5 0 2.2 1.3 4 3 5v2.5h2V17.5c1.7-1 3-2.8 3-5 0-2.7-1.5-4.5-4-4.5z"
          strokeWidth="0.9"
        />
        <circle cx="14.5" cy="11.5" r="0.8" fill="currentColor" />
        <circle cx="17.5" cy="11.5" r="0.8" fill="currentColor" />
        <path d="M16 13.5l-1 1.5h2l-1-1.5z" fill="currentColor" />
        <path d="M11 22h10 M13 24h6" strokeWidth="0.8" />
      </svg>
    </div>
  );
}

export function ClassicalFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative p-3 border border-[#C5A059]/25 bg-[#050505] ${className}`}>
      {/* Subtle corner accents */}
      <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t border-l border-[#C5A059]" />
      <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t border-r border-[#C5A059]" />
      <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b border-l border-[#C5A059]" />
      <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b border-r border-[#C5A059]" />
      {children}
    </div>
  );
}

// Ornate Baroque-Futuristic Arabesque Corner Flourish
export function ArabesqueCorner({ className = "w-20 h-20 text-[#C5A059]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none ${className}`}
    >
      <defs>
        <linearGradient id="arabesqueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2D6" />
          <stop offset="35%" stopColor="#E6CA85" />
          <stop offset="70%" stopColor="#C5A059" />
          <stop offset="100%" stopColor="#8C6D2C" />
        </linearGradient>
      </defs>
      {/* Outer framing futuristic quarter-circle glow */}
      <path
        d="M2 98 A96 96 0 0 0 98 2"
        stroke="url(#arabesqueGrad)"
        strokeWidth="0.8"
        strokeDasharray="2 3"
        opacity="0.6"
      />
      <path
        d="M6 94 A88 88 0 0 0 94 6"
        stroke="url(#arabesqueGrad)"
        strokeWidth="0.5"
        opacity="0.4"
      />
      {/* Futuristic Corner Tech Bracket */}
      <path
        d="M2 40 L2 14 Q2 2 14 2 L40 2"
        stroke="url(#arabesqueGrad)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="2" cy="40" r="2.5" fill="url(#arabesqueGrad)" />
      <circle cx="40" cy="2" r="2.5" fill="url(#arabesqueGrad)" />

      {/* Main Arabesque Vine Scroll & Acanthus Spirals */}
      <path
        d="M12 12 C18 4 32 6 36 16 C38 22 34 28 27 28 C21 28 17 23 19 17 C21 12 28 11 31 14"
        stroke="url(#arabesqueGrad)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M16 36 C24 38 28 48 24 56 C20 62 13 60 11 53 C10 47 15 42 21 44"
        stroke="url(#arabesqueGrad)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M36 16 C48 18 56 26 56 38 C56 48 46 56 36 56 C24 56 16 46 16 34"
        stroke="url(#arabesqueGrad)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.85"
      />
      {/* Secondary Outer Arabesque Tendrils */}
      <path
        d="M56 12 C64 16 70 24 70 34 C70 42 64 48 58 48 C52 48 48 42 50 36 C52 32 58 32 60 36"
        stroke="url(#arabesqueGrad)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M12 56 C16 64 24 70 34 70 C42 70 48 64 48 58 C48 52 42 48 36 50 C32 52 32 58 36 60"
        stroke="url(#arabesqueGrad)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Delicate Filigree Leaf Palmettes */}
      <path
        d="M36 36 C42 30 52 32 54 40 C46 44 38 42 36 36 Z"
        fill="url(#arabesqueGrad)"
        opacity="0.4"
      />
      <path
        d="M36 36 C30 42 32 52 40 54 C44 46 42 38 36 36 Z"
        fill="url(#arabesqueGrad)"
        opacity="0.4"
      />
      {/* Central Star Diamond Accent */}
      <g transform="translate(24, 24)">
        <polygon points="0,-4 1.5,-1 4,0 1.5,1 0,4 -1.5,1 -4,0 -1.5,-1" fill="#FFFFFF" />
        <circle cx="0" cy="0" r="1.2" fill="#E6CA85" />
      </g>
    </svg>
  );
}

// Ornate Symmetrical Imperial Arabesque Crest
export function ArabesqueCrest({ className = "w-48 h-10 text-[#C5A059]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none ${className}`}
    >
      <defs>
        <linearGradient id="crestGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C5A059" stopOpacity="0.2" />
          <stop offset="30%" stopColor="#E6CA85" />
          <stop offset="50%" stopColor="#FFF7E6" />
          <stop offset="70%" stopColor="#E6CA85" />
          <stop offset="100%" stopColor="#C5A059" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {/* Horizontal filigree balance lines */}
      <path d="M10 20 H65 M135 20 H190" stroke="url(#crestGrad)" strokeWidth="0.8" />
      <circle cx="10" cy="20" r="1.5" fill="#C5A059" />
      <circle cx="190" cy="20" r="1.5" fill="#C5A059" />

      {/* Left Arabesque Vine Scroll */}
      <path
        d="M65 20 C75 20 82 12 88 12 C93 12 96 16 94 20 C92 23 88 23 86 20 C85 18 87 16 89 17"
        stroke="url(#crestGrad)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M72 20 C76 26 84 28 88 24 C90 22 89 19 86 19 C84 19 83 21 84 23"
        stroke="url(#crestGrad)"
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* Right Arabesque Vine Scroll (Mirror) */}
      <path
        d="M135 20 C125 20 118 12 112 12 C107 12 104 16 106 20 C108 23 112 23 114 20 C115 18 113 16 111 17"
        stroke="url(#crestGrad)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M128 20 C124 26 116 28 112 24 C110 22 111 19 114 19 C116 19 117 21 116 23"
        stroke="url(#crestGrad)"
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* Central Royal Palmette / Solitaire Crown */}
      <path
        d="M100 6 C96 12 95 18 97 22 C99 20 100 16 100 12 C100 16 101 20 103 22 C105 18 104 12 100 6 Z"
        fill="url(#crestGrad)"
      />
      <g transform="translate(100, 26)">
        <polygon points="0,-4 1.5,-1 4,0 1.5,1 0,4 -1.5,1 -4,0 -1.5,-1" fill="#FFFFFF" />
        <circle cx="0" cy="0" r="1.5" fill="#E6CA85" />
      </g>
    </svg>
  );
}

