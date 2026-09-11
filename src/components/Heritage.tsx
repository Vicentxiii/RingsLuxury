import React from 'react';
import { GreekKeyBorder, GreekMeanderDivider, LaurelWreath, CorinthianCapitalIcon, AncientCoinMedallion } from './OrnamentIcons';
import heroStatueImg from '../assets/images/hero_statue_temple_1789071913515.jpg';

export function Heritage() {
  const deities = [
    {
      name: 'ATHENA',
      title: 'PALLAS ATHENA • WISDOM & METALLURGY',
      symbol: 'The Aegis, The Owl & Olive Branch',
      attribute: 'Chased Armor & Inviolable Intellect',
      quote: 'Goddess of craft, divine strategy, and the sacred forge of beauty.',
      description:
        'In classical antiquity, Athena was revered as Ergane—the patroness of artisans, sculptors, and master goldsmiths. Every jewel bearing her emblem balances formidable structural geometry with poetic subtlety.',
    },
    {
      name: 'APOLLO',
      title: 'PHOEBUS APOLLO • HARMONY & THE SUN',
      symbol: 'The Laurel Wreath & Golden Lyre',
      attribute: 'Divine Proportion (Phi 1.618)',
      quote: 'Bringer of light, music, and eternal mathematical truth.',
      description:
        'The god of Delphi consecrated the pure yellow radiance of gold as frozen sunlight. Our proportions adhere to the harmonic intervals discovered at Apollo’s temple, echoing the music of the spheres.',
    },
    {
      name: 'ZEUS',
      title: 'ZEUS OLYMPIOS • SOVEREIGN MAJESTY',
      symbol: 'The Thunderbolt & Royal Eagle',
      attribute: 'Chryselephantine Majesty',
      quote: 'The supreme architect of cosmic order and dynastic legacy.',
      description:
        'Phidias’ colossal ivory and gold statue of Zeus at Olympia stood as one of the Seven Wonders of the Ancient World. We carry forward that imperial scale into wearable sculptural monuments.',
    },
  ];

  return (
    <section
      id="heritage"
      className="relative w-full py-32 md:py-44 bg-[#050505] text-[#EAE6DF] overflow-hidden"
    >
      {/* Black Marble Background */}
      <div className="absolute inset-0 bg-black-marble opacity-70" />

      {/* Atmospheric Silhouette of Monumental Columns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(197,160,89,0.08)_0%,_transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <div className="inline-flex items-center gap-3 mb-4">
            <CorinthianCapitalIcon className="w-6 h-6 text-[#C5A059]" />
            <span className="text-[10px] uppercase tracking-[0.45em] text-[#C5A059] font-medium">
              HELLENIC ROOTS • MMXXVI
            </span>
            <CorinthianCapitalIcon className="w-6 h-6 text-[#C5A059] transform -scale-x-100" />
          </div>

          <h2
            id="heritage-heading"
            className="font-cinzel text-4xl sm:text-5xl md:text-6xl tracking-[0.2em] uppercase text-[#FBF9F5] font-light leading-tight mb-4"
          >
            BORN FROM
            <br />
            <span className="font-decorative text-3xl sm:text-4xl md:text-5xl text-[#C5A059] italic">
              ANCIENT BEAUTY
            </span>
          </h2>

          <p className="font-cormorant text-xl md:text-2xl tracking-[0.18em] italic text-[#C5A059] font-light uppercase mb-6">
            THE ARCHITECTURE OF IMMORTAL GODS
          </p>

          <p className="font-sans-luxury text-xs md:text-sm text-[#A8A296] tracking-[0.2em] uppercase max-w-2xl mx-auto leading-relaxed">
            Our atelier does not merely replicate antiquity—we inhabit its philosophical soul. Classical Greece perceived jewelry not as vanity, but as talismans of divine order, geometric harmony, and heroic legacy.
          </p>

          <GreekMeanderDivider className="mt-8 opacity-60" />
        </div>

        {/* The Deities Triad Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {deities.map((item) => (
            <div
              key={item.name}
              className="relative p-8 bg-[#080808] border border-[#C5A059]/30 hover:border-[#C5A059]/65 transition-all duration-500 group flex flex-col justify-between"
            >
              {/* Corner Accents */}
              <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-[#C5A059]" />
              <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-[#C5A059]" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-[#C5A059]" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-[#C5A059]" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-cinzel text-2xl tracking-[0.2em] text-[#FBF9F5]">
                    {item.name}
                  </span>
                  <LaurelWreath className="w-5 h-5 text-[#C5A059] opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>

                <p className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium mb-3">
                  {item.title}
                </p>

                <p className="font-cormorant text-base italic text-[#D8D2C4] mb-4">
                  "{item.quote}"
                </p>

                <p className="font-sans-luxury text-xs text-[#A8A296] leading-relaxed tracking-wider">
                  {item.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#C5A059]/20 flex items-center justify-between text-[9px] uppercase tracking-[0.25em] text-[#9A7B38]">
                <span>{item.symbol}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Monumental Classical Proportions Banner */}
        <div className="border border-[#C5A059]/35 bg-[#030303] p-8 md:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-[#C5A059]">
                <AncientCoinMedallion className="w-8 h-8" />
                <span className="text-[10px] uppercase tracking-[0.35em] font-semibold">
                  MATHEMATICA AUREA • Φ 1.618
                </span>
              </div>

              <h3 className="font-cinzel text-2xl md:text-3xl tracking-[0.16em] uppercase text-[#FBF9F5]">
                THE CANON OF POLICLITUS & SACRED PROPORTIONS
              </h3>

              <p className="font-sans-luxury text-xs text-[#A8A296] leading-relaxed tracking-wider max-w-2xl">
                Just as Ictinus and Callicrates applied optical corrections to the Parthenon columns to prevent perceptual curvature, every ring shank, necklace curvature, and bezel height in our atelier undergoes optical micro-calibration so that metal breathes in balance with the human form.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 border border-[#C5A059]/25 bg-[#070707] text-center">
              <span className="font-cormorant text-5xl md:text-6xl text-[#C5A059] font-light italic leading-none mb-2">
                Φ
              </span>
              <span className="text-xs uppercase tracking-[0.3em] text-[#F3EFE6] font-cinzel">
                THE GOLDEN RATIO
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#9A7B38] mt-1">
                1 : 1.61803398875
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-24 opacity-25">
        <GreekKeyBorder className="w-full h-1" />
      </div>
    </section>
  );
}
