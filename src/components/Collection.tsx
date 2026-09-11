import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Eye, ShieldCheck, Sparkles, Instagram } from 'lucide-react';
import { ArtifactModal, ArtifactData } from './ArtifactModal';
import { GreekKeyBorder, GreekMeanderDivider, LaurelWreath, AcanthusLeaf } from './OrnamentIcons';

// High luxury artifact imagery
import emperorRingImg from '../assets/images/emperor_ring_artifact_1789071924540.jpg';
import masterpieceCuffImg from '../assets/images/masterpiece_macro_cuff_1789071946040.jpg';
import statueImg from '../assets/images/statue_darkness_eternal_1789071956592.jpg';
import artisanImg from '../assets/images/artisan_hands_engrave_1789071934811.jpg';

interface CollectionProps {
  onSelectPieceForCommission: (pieceName: string) => void;
  onNavigateToJorgeUquillas?: () => void;
}

export function Collection({ onSelectPieceForCommission, onNavigateToJorgeUquillas }: CollectionProps) {
  const navigate = useNavigate();
  const [selectedArtifact, setSelectedArtifact] = useState<ArtifactData | null>(null);

  const slugMap: Record<string, string> = {
    'I': 'the-emperor-signet-sovereign-power',
    'II': "athenas-aegis-torque-wisdom",
    'III': 'apollonian-laurel-diadem-sun-god',
    'IV': 'oracle-of-delphi-sovereign-cuff',
  };

  const collectionItems: ArtifactData[] = [
    {
      numeral: 'I',
      name: 'THE EMPEROR',
      subname: 'Signet of Sovereign Power',
      description: 'A singular masterpiece inspired by ancient imperial iconography.',
      extendedHistory:
        'Forged in molten 18K antique gold alloyed to the exact metallurgical density of classical Roman coinage. The central seal features a hand-chiseled intaglio imperial eagle clutching an obsidian laurel branch, flanked by Corinthian volutes carved directly into the solid gold shoulders.',
      specs: {
        material: '18K Solid Antique Gold & Natural Obsidian',
        weight: '44.8 Grams',
        gems: 'Intaglio Obsidian Cabochon, 4 Brilliant Cut Cognac Diamonds',
        craftHours: '96 Hours Hand Chiseled',
        provenance: 'Rings Luxury Atelier Archive, Athens',
        edition: 'One of One • Imperial Archive',
      },
      image: emperorRingImg,
      symbolism: 'Sovereignty, Stoic command, and the eternal continuity of empire.',
    },
    {
      numeral: 'II',
      name: "ATHENA'S AEGIS",
      subname: 'Torque of Inviolable Wisdom',
      description: 'A monumental neckpiece echoing the sacred divine armor of Pallas Athena.',
      extendedHistory:
        'Constructed from twenty-four interlocking articulated 22K gold plates, evoking classical hoplite scale armor. At its crux rests a micro-sculpted Medusa gorgoneion relief, framed by subtle emerald baguettes and antique matte gold burnishing.',
      specs: {
        material: '22K Hand-Hammered Gold',
        weight: '112.5 Grams',
        gems: 'Natural Zambian Emeralds & Rose-Cut Diamonds',
        craftHours: '160 Hours Sculpted by Hand',
        provenance: 'Parthenon Sanctuary Homage',
        edition: 'One of One • Private Salon Acquisition',
      },
      image: masterpieceCuffImg,
      symbolism: 'Invincibility, divine intellect, and the shield against temporal decay.',
    },
    {
      numeral: 'III',
      name: 'APOLLONIAN LAUREL',
      subname: 'Diadem of the Sun God',
      description: 'Sculptural botanical crown celebrating the sacred plant of Delphi and eternal poetry.',
      extendedHistory:
        'Twelve distinct, organic laurel leaves individually cast in lost-wax gold, each hand-engraved with micro-veins and adorned with dew-drop diamonds. Designed to rest upon the collarbone or crown with weightless mythological grace.',
      specs: {
        material: '18K Pale Champagne Gold',
        weight: '68.2 Grams',
        gems: 'F/VVS Rose-Cut Diamond Dew Drops',
        craftHours: '110 Hours Micro-Vein Engraving',
        provenance: 'Delphic Hymn Series',
        edition: 'Strictly Unique • Masterpiece Registry',
      },
      image: statueImg,
      symbolism: 'Victory, prophetic illumination, and the sacred harmony of the Muses.',
    },
    {
      numeral: 'IV',
      name: 'THE ORACLE OF DELPHI',
      subname: 'Sovereign Cuff of Prophetic Vision',
      description: 'A baroque architectural cuff marrying classical Hellenistic cameos with heavy gold scrolls.',
      extendedHistory:
        'A towering black velvet wrist monument. Chiseled in heavy 22K gold with deep relief acanthus leaves, micro-sculpted mythological cherubs, and an ancient onyx cameo portraying the Pythia in prophetic trance.',
      specs: {
        material: '22K Antique Yellow Gold & Carved Onyx',
        weight: '138.0 Grams',
        gems: 'Hand-Carved Onyx Cameo, Ceylon Sapphires',
        craftHours: '190 Hours Master Engraving',
        provenance: 'Castalian Spring Collection',
        edition: 'One of One • Museum Displayed',
      },
      image: emperorRingImg,
      secondaryImage: artisanImg,
      symbolism: 'The whisper of eternity, secret knowledge, and destiny.',
    },
  ];

  return (
    <section
      id="collections"
      className="relative w-full py-32 md:py-44 bg-[#020202] text-[#EAE6DF] overflow-hidden"
    >
      {/* Background Subtle Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(197,160,89,0.06),rgba(2,2,2,0))]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C5A059]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-28">
          <div className="inline-flex items-center gap-2 mb-4">
            <AcanthusLeaf className="w-4 h-4 text-[#C5A059]" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#C5A059] font-medium">
              ARCHAEOLOGICAL TREASURY
            </span>
            <AcanthusLeaf className="w-4 h-4 text-[#C5A059] transform -scale-x-100" />
          </div>

          <h2 className="font-cinzel text-4xl sm:text-5xl md:text-6xl tracking-[0.16em] uppercase text-[#FBF9F5] font-light mb-4">
            THE COLLECTION
          </h2>

          <p className="font-cormorant text-xl md:text-2xl tracking-[0.2em] italic text-[#C5A059] font-light uppercase mb-6">
            MASTERPIECES CARVED IN PRECIOUS METAL
          </p>

          <p className="font-sans-luxury text-xs md:text-sm text-[#A8A296] tracking-[0.2em] uppercase max-w-xl mx-auto leading-relaxed">
            Displayed not as ornament, but as solitary relics of antiquity. Each creation exists as a singular manifestation of mythological form.
          </p>

          <GreekMeanderDivider className="mt-8 opacity-60" />
        </div>

        {/* Asymmetrical Museum Presentation Pieces */}
        <div className="space-y-40">
          {/* Piece I: THE EMPEROR - Enormous visual occupying most of viewport */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left large visual occupying 7 cols */}
            <div className="lg:col-span-8 relative group cursor-pointer" onClick={() => navigate(`/produto/${slugMap['I']}`)}>
              <div className="relative border border-[#C5A059]/30 bg-[#070707] p-3 md:p-5 shadow-[0_30px_100px_rgba(0,0,0,0.9)] transition-all duration-700 group-hover:border-[#C5A059]/60">
                {/* Thin gold architectural corners */}
                <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#C5A059]" />
                <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#C5A059]" />
                <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#C5A059]" />
                <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#C5A059]" />

                <div className="relative overflow-hidden aspect-[4/3] md:aspect-[16/10] bg-[#020202]">
                  <img
                    src={collectionItems[0].image}
                    alt={collectionItems[0].name}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover filter contrast-[1.08] brightness-95 group-hover:scale-105 transition-transform duration-[1800ms] ease-out"
                  />
                  {/* Atmospheric shadow gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-60" />
                </div>

                {/* Museum accession badge */}
                <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 px-4 py-1.5 bg-[#020202]/90 border border-[#C5A059]/30 backdrop-blur-md">
                  <span className="text-[9px] uppercase tracking-[0.35em] text-[#C5A059]">
                    CATALOGUE N° 001 • ATHENS
                  </span>
                </div>
              </div>
            </div>

            {/* Right text container occupying 4 cols */}
            <div className="lg:col-span-4 flex flex-col justify-center space-y-6">
              <div className="flex items-center gap-4">
                <span className="font-cormorant text-7xl md:text-8xl text-[#C5A059] font-light leading-none italic">
                  I
                </span>
                <div className="h-12 w-px bg-gradient-to-b from-[#C5A059] to-transparent" />
                <span className="text-[10px] uppercase tracking-[0.35em] text-[#9A7B38]">
                  IMPERIAL ICONOGRAPHY
                </span>
              </div>

              <div>
                <h3 className="font-cinzel text-3xl md:text-4xl tracking-[0.2em] uppercase text-[#FBF9F5] mb-2">
                  THE EMPEROR
                </h3>
                <p className="font-cormorant text-lg italic text-[#C5A059] tracking-wider">
                  Solid 18K Antique Gold & Intaglio Obsidian
                </p>
              </div>

              <p className="font-sans-luxury text-xs text-[#A8A296] leading-relaxed tracking-wider">
                A singular masterpiece inspired by ancient imperial iconography. The colossal signet commands the presence of Roman Caesars and Hellenistic warlords, chiseled with an eagle carrying obsidian laurel wreaths.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => navigate(`/produto/${slugMap['I']}`)}
                  className="group inline-flex items-center gap-2 px-5 py-2.5 bg-[#C5A059] hover:bg-[#E6CA85] text-[#020202] font-cinzel text-[10px] tracking-[0.25em] uppercase rounded-full transition-colors"
                >
                  <span>Ver Página</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button
                  id="discover-piece-1"
                  onClick={() => setSelectedArtifact(collectionItems[0])}
                  className="group inline-flex items-center gap-3 text-xs font-cinzel tracking-[0.3em] uppercase text-[#C5A059] hover:text-[#E6CA85] transition-colors"
                >
                  <span>DISCOVER</span>
                  <span className="w-8 h-px bg-[#C5A059] group-hover:w-12 transition-all duration-300" />
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Piece II: ATHENA'S AEGIS - Inverted layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left text container occupying 4 cols */}
            <div className="lg:col-span-4 lg:order-1 order-2 flex flex-col justify-center space-y-6">
              <div className="flex items-center gap-4">
                <span className="font-cormorant text-7xl md:text-8xl text-[#C5A059] font-light leading-none italic">
                  II
                </span>
                <div className="h-12 w-px bg-gradient-to-b from-[#C5A059] to-transparent" />
                <span className="text-[10px] uppercase tracking-[0.35em] text-[#9A7B38]">
                  SACRED DIVINE ARMOR
                </span>
              </div>

              <div>
                <h3 className="font-cinzel text-3xl md:text-4xl tracking-[0.2em] uppercase text-[#FBF9F5] mb-2">
                  ATHENA'S AEGIS
                </h3>
                <p className="font-cormorant text-lg italic text-[#C5A059] tracking-wider">
                  Hand-Forged 22K Gold Scale Collar
                </p>
              </div>

              <p className="font-sans-luxury text-xs text-[#A8A296] leading-relaxed tracking-wider">
                Echoing the invulnerable breastplate of the goddess of wisdom. Twenty-four interlocking gold scales articulated to move like silk across the wearer's neck, protecting against temporal decay.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => navigate(`/produto/${slugMap['II']}`)}
                  className="group inline-flex items-center gap-2 px-5 py-2.5 bg-[#C5A059] hover:bg-[#E6CA85] text-[#020202] font-cinzel text-[10px] tracking-[0.25em] uppercase rounded-full transition-colors"
                >
                  <span>Ver Página</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button
                  id="discover-piece-2"
                  onClick={() => setSelectedArtifact(collectionItems[1])}
                  className="group inline-flex items-center gap-3 text-xs font-cinzel tracking-[0.3em] uppercase text-[#C5A059] hover:text-[#E6CA85] transition-colors"
                >
                  <span>DISCOVER</span>
                  <span className="w-8 h-px bg-[#C5A059] group-hover:w-12 transition-all duration-300" />
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right visual occupying 8 cols */}
            <div className="lg:col-span-8 lg:order-2 order-1 relative group cursor-pointer" onClick={() => navigate(`/produto/${slugMap['II']}`)}>
              <div className="relative border border-[#C5A059]/30 bg-[#070707] p-3 md:p-5 shadow-[0_30px_100px_rgba(0,0,0,0.9)] transition-all duration-700 group-hover:border-[#C5A059]/60">
                <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#C5A059]" />
                <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#C5A059]" />
                <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#C5A059]" />
                <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#C5A059]" />

                <div className="relative overflow-hidden aspect-[4/3] md:aspect-[16/10] bg-[#020202]">
                  <img
                    src={collectionItems[1].image}
                    alt={collectionItems[1].name}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover filter contrast-[1.08] brightness-95 group-hover:scale-105 transition-transform duration-[1800ms] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-60" />
                </div>

                <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 px-4 py-1.5 bg-[#020202]/90 border border-[#C5A059]/30 backdrop-blur-md">
                  <span className="text-[9px] uppercase tracking-[0.35em] text-[#C5A059]">
                    CATALOGUE N° 002 • ATHENS
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Piece III: APOLLONIAN LAUREL & Piece IV: THE ORACLE OF DELPHI (Two complementary asymmetrical editorial columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 pt-8">
            {/* Piece III */}
            <div className="flex flex-col justify-between border-t border-[#C5A059]/20 pt-8 group">
              <div className="relative mb-8">
                <div className="relative border border-[#C5A059]/30 bg-[#070707] p-3 shadow-xl">
                  <div className="aspect-[4/3] overflow-hidden bg-[#020202]">
                    <img
                      src={collectionItems[2].image}
                      alt={collectionItems[2].name}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover filter contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-1000"
                    />
                  </div>
                  <div className="absolute top-6 left-6 px-3 py-1 bg-[#020202]/85 border border-[#C5A059]/30 text-[9px] tracking-[0.3em] uppercase text-[#E6CA85]">
                    DELPHIC HYMN
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-baseline gap-4">
                  <span className="font-cormorant text-6xl text-[#C5A059] font-light italic">
                    III
                  </span>
                  <div>
                    <h3 className="font-cinzel text-2xl tracking-[0.18em] uppercase text-[#FBF9F5]">
                      APOLLONIAN LAUREL
                    </h3>
                    <p className="font-cormorant text-base italic text-[#C5A059]">
                      Sculpted 18K Pale Gold Diadem
                    </p>
                  </div>
                </div>

                <p className="font-sans-luxury text-xs text-[#A8A296] leading-relaxed tracking-wider">
                  Twelve botanical leaves micro-cast with dew-drop diamonds celebrating the sacred victory of the god of light, music, and eternal truth.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => navigate(`/produto/${slugMap['III']}`)}
                    className="group inline-flex items-center gap-2 px-5 py-2.5 bg-[#C5A059] hover:bg-[#E6CA85] text-[#020202] font-cinzel text-[10px] tracking-[0.25em] uppercase rounded-full transition-colors"
                  >
                    <span>Ver Página</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                  <button
                    id="discover-piece-3"
                    onClick={() => setSelectedArtifact(collectionItems[2])}
                    className="group inline-flex items-center gap-3 text-xs font-cinzel tracking-[0.3em] uppercase text-[#C5A059] hover:text-[#E6CA85]"
                  >
                    <span>DISCOVER</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            {/* Piece IV */}
            <div className="flex flex-col justify-between border-t border-[#C5A059]/20 pt-8 group md:mt-16">
              <div className="relative mb-8">
                <div className="relative border border-[#C5A059]/30 bg-[#070707] p-3 shadow-xl">
                  <div className="aspect-[4/3] overflow-hidden bg-[#020202]">
                    <img
                      src={collectionItems[3].image}
                      alt={collectionItems[3].name}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover filter contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-1000"
                    />
                  </div>
                  <div className="absolute top-6 left-6 px-3 py-1 bg-[#020202]/85 border border-[#C5A059]/30 text-[9px] tracking-[0.3em] uppercase text-[#E6CA85]">
                    ORACULAR SANCTUM
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-baseline gap-4">
                  <span className="font-cormorant text-6xl text-[#C5A059] font-light italic">
                    IV
                  </span>
                  <div>
                    <h3 className="font-cinzel text-2xl tracking-[0.18em] uppercase text-[#FBF9F5]">
                      THE ORACLE OF DELPHI
                    </h3>
                    <p className="font-cormorant text-base italic text-[#C5A059]">
                      Baroque Cameo Wrist Monument
                    </p>
                  </div>
                </div>

                <p className="font-sans-luxury text-xs text-[#A8A296] leading-relaxed tracking-wider">
                  A baroque architectural cuff marrying classical Hellenistic cameos with heavy gold scrolls, sculpted from solid 22K antique gold.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => navigate(`/produto/${slugMap['IV']}`)}
                    className="group inline-flex items-center gap-2 px-5 py-2.5 bg-[#C5A059] hover:bg-[#E6CA85] text-[#020202] font-cinzel text-[10px] tracking-[0.25em] uppercase rounded-full transition-colors"
                  >
                    <span>Ver Página</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                  <button
                    id="discover-piece-4"
                    onClick={() => setSelectedArtifact(collectionItems[3])}
                    className="group inline-flex items-center gap-3 text-xs font-cinzel tracking-[0.3em] uppercase text-[#C5A059] hover:text-[#E6CA85]"
                  >
                    <span>DISCOVER</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Curated Singular Masterpiece by Jorge Uquillas */}
        {onNavigateToJorgeUquillas && (
          <div className="mt-28 border border-[#C5A059]/40 bg-[#060606] p-8 md:p-14 relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.9)] group">
            {/* Corner accents */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#C5A059]" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#C5A059]" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#C5A059]" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#C5A059]" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-2 text-[#C5A059]">
                  <Sparkles className="w-4 h-4 text-[#C5A059]" />
                  <span className="text-[10px] uppercase tracking-[0.4em] font-semibold">
                    EXPOSIÇÃO ESPECIAL • OBRA ÚNICA ARTESANAL
                  </span>
                </div>

                <h3 className="font-cinzel text-3xl sm:text-4xl tracking-[0.18em] uppercase text-[#FBF9F5]">
                  JORGE UQUILLAS: LAOCOÖN — BRONZE AND TIME
                </h3>

                <p className="font-cormorant text-xl italic text-[#C5A059]">
                  "A fluid energy frozen in still, heavy bronze. Born of molten fire and creative will."
                </p>

                <p className="font-sans-luxury text-xs text-[#A8A296] leading-relaxed tracking-wider max-w-2xl">
                  Uma rota cinematográfica interativa 360° em WebGL dedicada à monumental escultura equestre em bronze, com ondas líquidas de bronze e safira, partículas de forja e tipografia Italiana.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center gap-3">
                <button
                  id="open-jorge-uquillas-piece"
                  onClick={onNavigateToJorgeUquillas}
                  className="px-8 py-4 bg-[#C5A059] hover:bg-[#E6CA85] text-[#020202] font-cinzel text-xs font-semibold tracking-[0.35em] uppercase flex items-center gap-3 transition-all duration-300 shadow-[0_0_25px_rgba(197,160,89,0.3)] hover:scale-105 rounded-full"
                >
                  <span>Ver Obra Única</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="https://www.instagram.com/ringsluxury"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 border border-[#C5A059]/40 hover:border-[#C5A059] text-[#C5A059] hover:text-[#E6CA85] hover:bg-[#C5A059]/10 font-sans-luxury text-[11px] font-medium tracking-[0.2em] uppercase flex items-center gap-2 transition-all rounded-full"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Instagram @ringsluxury</span>
                </a>

                <span className="text-[9px] uppercase tracking-[0.25em] text-[#9A7B38] mt-1">
                  Rota Exclusiva • WebGL 360°
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Artifact Modal Dossier */}
      <ArtifactModal
        artifact={selectedArtifact}
        onClose={() => setSelectedArtifact(null)}
        onRequestAcquisition={(pieceName) => {
          setSelectedArtifact(null);
          onSelectPieceForCommission(pieceName);
        }}
      />
    </section>
  );
}
