import emperorRingImg from '../assets/images/emperor_ring_artifact_1789071924540.jpg';
import masterpieceCuffImg from '../assets/images/masterpiece_macro_cuff_1789071946040.jpg';
import statueImg from '../assets/images/statue_darkness_eternal_1789071956592.jpg';
import artisanImg from '../assets/images/artisan_hands_engrave_1789071934811.jpg';
import heroStatueImg from '../assets/images/hero_statue_temple_1789071913515.jpg';

export interface ProductSpecs {
  material: string;
  weight: string;
  gems: string;
  craftHours: string;
  provenance: string;
  edition: string;
  dimensions?: string;
  hallmark?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subname: string;
  category: string;
  categorySlug: string;
  price: string;
  priceNumber: number;
  description: string;
  extendedHistory: string;
  symbolism: string;
  specs: ProductSpecs;
  images: string[];
  sku: string;
  inStock: boolean;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: '001',
    slug: 'the-emperor-signet-sovereign-power',
    name: 'THE EMPEROR',
    subname: 'Signet of Sovereign Power',
    category: 'Luxury Rings',
    categorySlug: 'luxury-rings',
    price: '$ 8,500.00',
    priceNumber: 8500,
    description: 'A singular masterpiece inspired by ancient imperial iconography. The colossal signet commands the presence of Roman Caesars.',
    extendedHistory: 'Forged in molten 18K antique gold alloyed to the exact metallurgical density of classical Roman coinage. The central seal features a hand-chiseled intaglio imperial eagle clutching an obsidian laurel branch, flanked by Corinthian volutes carved directly into the solid gold shoulders. Each stroke of the graver follows the lost-wax tradition of Hellenistic goldsmiths.',
    symbolism: 'Sovereignty, Stoic command, and the eternal continuity of empire.',
    specs: {
      material: '18K Solid Antique Gold & Natural Obsidian',
      weight: '44.8 Grams',
      gems: 'Intaglio Obsidian Cabochon, 4 Brilliant Cut Cognac Diamonds',
      craftHours: '96 Hours Hand Chiseled',
      provenance: 'Rings Luxury Atelier Archive, Athens',
      edition: 'One of One • Imperial Archive',
      dimensions: 'US 7 - 12 (sob medida)',
      hallmark: 'Owl of Athena • 750 • J.Uquillas',
    },
    images: [emperorRingImg, masterpieceCuffImg, heroStatueImg, artisanImg],
    sku: 'RL-EMP-001',
    inStock: true,
    featured: true,
  },
  {
    id: '002',
    slug: 'athenas-aegis-torque-wisdom',
    name: "ATHENA'S AEGIS",
    subname: 'Torque of Inviolable Wisdom',
    category: 'Necklaces',
    categorySlug: 'necklaces',
    price: '$ 12,800.00',
    priceNumber: 12800,
    description: 'A monumental neckpiece echoing the sacred divine armor of Pallas Athena.',
    extendedHistory: 'Constructed from twenty-four interlocking articulated 22K gold plates, evoking classical hoplite scale armor. At its crux rests a micro-sculpted Medusa gorgoneion relief, framed by subtle emerald baguettes and antique matte gold burnishing. Articulation allows fluid movement like silk.',
    symbolism: 'Invincibility, divine intellect, and the shield against temporal decay.',
    specs: {
      material: '22K Hand-Hammered Gold',
      weight: '112.5 Grams',
      gems: 'Natural Zambian Emeralds & Rose-Cut Diamonds',
      craftHours: '160 Hours Sculpted by Hand',
      provenance: 'Parthenon Sanctuary Homage',
      edition: 'One of One • Private Salon Acquisition',
      dimensions: 'Comprimento 42cm • Ajustável',
      hallmark: 'Owl of Athena • 916 • J.Uquillas',
    },
    images: [masterpieceCuffImg, emperorRingImg, statueImg, heroStatueImg],
    sku: 'RL-ATH-002',
    inStock: true,
    featured: true,
  },
  {
    id: '003',
    slug: 'apollonian-laurel-diadem-sun-god',
    name: 'APOLLONIAN LAUREL',
    subname: 'Diadem of the Sun God',
    category: 'Special Editions',
    categorySlug: 'special-editions',
    price: '$ 9,200.00',
    priceNumber: 9200,
    description: 'Sculptural botanical crown celebrating the sacred plant of Delphi and eternal poetry.',
    extendedHistory: 'Twelve distinct, organic laurel leaves individually cast in lost-wax gold, each hand-engraved with micro-veins and adorned with dew-drop diamonds. Designed to rest upon the collarbone or crown with weightless mythological grace. The matte champagne gold whispers ancient sunlight.',
    symbolism: 'Victory, prophetic illumination, and the sacred harmony of the Muses.',
    specs: {
      material: '18K Pale Champagne Gold',
      weight: '68.2 Grams',
      gems: 'F/VVS Rose-Cut Diamond Dew Drops',
      craftHours: '110 Hours Micro-Vein Engraving',
      provenance: 'Delphic Hymn Series',
      edition: 'Strictly Unique • Masterpiece Registry',
      dimensions: 'Diâmetro 17cm • Ajustável',
      hallmark: 'Owl of Athena • 750 • J.Uquillas',
    },
    images: [statueImg, artisanImg, heroStatueImg, emperorRingImg],
    sku: 'RL-APO-003',
    inStock: true,
  },
  {
    id: '004',
    slug: 'oracle-of-delphi-sovereign-cuff',
    name: 'THE ORACLE OF DELPHI',
    subname: 'Sovereign Cuff of Prophetic Vision',
    category: 'Gold & Silver Rings',
    categorySlug: 'gold-silver-rings',
    price: '$ 15,500.00',
    priceNumber: 15500,
    description: 'A baroque architectural cuff marrying classical Hellenistic cameos with heavy gold scrolls.',
    extendedHistory: 'A towering black velvet wrist monument. Chiseled in heavy 22K gold with deep relief acanthus leaves, micro-sculpted mythological cherubs, and an ancient onyx cameo portraying the Pythia in prophetic trance. Weighs like a temple fragment from Delphi itself.',
    symbolism: 'The whisper of eternity, secret knowledge, and destiny.',
    specs: {
      material: '22K Antique Yellow Gold & Carved Onyx',
      weight: '138.0 Grams',
      gems: 'Hand-Carved Onyx Cameo, Ceylon Sapphires',
      craftHours: '190 Hours Master Engraving',
      provenance: 'Castalian Spring Collection',
      edition: 'One of One • Museum Displayed',
      dimensions: 'Largura 58mm • Punho 62mm',
      hallmark: 'Owl of Athena • 916 • J.Uquillas',
    },
    images: [heroStatueImg, statueImg, emperorRingImg, masterpieceCuffImg],
    sku: 'RL-ORA-004',
    inStock: true,
  },
  {
    id: '005',
    slug: 'sovereign-of-luxury-heritage',
    name: 'OLYMPOS HERITAGE',
    subname: 'Heritage Signet of Olympus',
    category: 'Luxury Rings',
    categorySlug: 'luxury-rings',
    price: '$ 9,200.00',
    priceNumber: 9200,
    description: 'Hand-engraved using centuries-old techniques, a true testament to the artisan dedication on Mount Olympus.',
    extendedHistory: 'Each facet of Olympos Heritage is engraved under 10x magnification, reproducing the meander pattern of the Temple of Zeus. The interior band bears a secret inscription in ancient Greek, visible only to the wearer.',
    symbolism: 'Heritage, divine ancestry, and the mountain of the gods.',
    specs: {
      material: '18K Yellow Gold & Brilliant Diamonds',
      weight: '38.2 Grams',
      gems: '0.62ct F/VS Diamonds',
      craftHours: '78 Hours Engraving',
      provenance: 'Olympus Atelier Series',
      edition: 'Limited • 8 pieces',
      dimensions: 'US 6 - 13',
      hallmark: 'Owl of Athena • 750',
    },
    images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', emperorRingImg, artisanImg, heroStatueImg],
    sku: 'RL-OLY-005',
    inStock: true,
  },
  {
    id: '006',
    slug: 'emperors-will-imperial-ring',
    name: "THE EMPEROR'S WILL",
    subname: 'Imperial Decree Band',
    category: 'Emperor Rings',
    categorySlug: 'emperor-rings',
    price: '$ 12,000.00',
    priceNumber: 12000,
    description: 'Masterfully crafted by Jorge Uquillas, this masculine ring combines baroque grandeur with modern haute joaillerie.',
    extendedHistory: 'The Emperor\'s Will bears a hidden imperial seal on its interior, revealed only when removed. Its shoulders are sculpted as miniature Corinthian columns, supporting a domed cognac diamond like a temple roof.',
    symbolism: 'Authority, willpower, and the weight of destiny.',
    specs: {
      material: '18K Antique Gold & Cognac Diamond 1.2ct',
      weight: '42.0 Grams',
      gems: 'Central Cognac Diamond • Pavé Diamonds',
      craftHours: '112 Hours',
      provenance: 'Imperial Seal Collection',
      edition: 'One of One',
      dimensions: 'US 7 - 12',
      hallmark: 'Owl of Athena • 750 • J.Uquillas',
    },
    images: ['https://images.unsplash.com/photo-1599643478514-4a4e06223293?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', emperorRingImg, masterpieceCuffImg, artisanImg],
    sku: 'RL-WIL-006',
    inStock: true,
  },
  {
    id: '007',
    slug: 'golden-epoch-commanders-ring',
    name: 'THE GOLDEN EPOCH',
    subname: 'Commander of Time',
    category: 'Emperor Rings',
    categorySlug: 'emperor-rings',
    price: '$ 15,500.00',
    priceNumber: 15500,
    description: 'A heavy, commanding piece that speaks of power, heritage, and uncompromising luxury.',
    extendedHistory: 'Cast in solid gold weighing more than a classical drachma hoard, The Golden Epoch features a sunken relief of Helios driving his quadriga. The patina is hand-applied over seven firings to achieve antique depth.',
    symbolism: 'Eternal power, solar divinity, and golden age prosperity.',
    specs: {
      material: '22K Solid Gold • Antique Patina',
      weight: '51.3 Grams',
      gems: 'Natural Citrine & Diamonds',
      craftHours: '135 Hours',
      provenance: 'Helios Collection',
      edition: 'One of One',
      dimensions: 'US 8 - 12.5',
      hallmark: 'Owl of Athena • 916',
    },
    images: ['https://images.unsplash.com/photo-1590548784585-643d2b9f2925?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', heroStatueImg, statueImg, emperorRingImg],
    sku: 'RL-GEP-007',
    inStock: true,
  },
  {
    id: '008',
    slug: 'archons-seal-bespoke-signet',
    name: "ARCHON'S SEAL",
    subname: 'Bespoke Signet Mastery',
    category: 'Gold & Silver Rings',
    categorySlug: 'gold-silver-rings',
    price: '$ 7,800.00',
    priceNumber: 7800,
    description: 'A bespoke signet style masterpiece reflecting the absolute pinnacle of Jorge Uquillas craft.',
    extendedHistory: 'The Archon\'s Seal can be custom-engraved with family crest, initials or mythological totem. Its oval face is left intentionally blank in the atelier, awaiting the patron\'s legacy to be carved before delivery.',
    symbolism: 'Legacy, lineage, and personal legend.',
    specs: {
      material: '18K Gold & Sterling Silver Inlay',
      weight: '34.5 Grams',
      gems: 'Onyx Table • Optional Diamond Crest',
      craftHours: '68 Hours + Custom Engraving',
      provenance: 'Archon Private Commission',
      edition: 'Made to Order • Bespoke',
      dimensions: 'US 5 - 14 • Face 18x15mm',
      hallmark: 'Owl of Athena • 750/925',
    },
    images: ['https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', artisanImg, emperorRingImg, masterpieceCuffImg],
    sku: 'RL-ARC-008',
    inStock: true,
  },
  {
    id: '009',
    slug: 'aphrodites-tear-queens-ring',
    name: "APHRODITE'S TEAR",
    subname: 'Pear Diamond Reverie',
    category: 'Luxury Queens',
    categorySlug: 'luxuryqueens',
    price: '$ 14,500.00',
    priceNumber: 14500,
    description: 'A breathtakingly elegant female ring, adorned with a rare pear-shaped diamond and intricate rose gold engravings.',
    extendedHistory: 'The pear diamond of Aphrodite\'s Tear is set like a droplet suspended on rose gold waves, engraved with acanthus tendrils so fine they appear to move. Inspired by Botticelli\'s Venus emerging from the sea foam.',
    symbolism: 'Love, divine femininity, and the birth of beauty.',
    specs: {
      material: '18K Rose Gold • Pear Diamond 1.8ct',
      weight: '18.5 Grams',
      gems: 'Pear F/VVS1 1.80ct • Pavé 0.42ct',
      craftHours: '88 Hours',
      provenance: 'Venus Collection • Femme Atelier',
      edition: 'Limited • 12 pieces',
      dimensions: 'US 4.5 - 8.5',
      hallmark: 'Owl of Athena • 750 Rose',
    },
    images: ['https://images.unsplash.com/photo-1605100804763-247f661c14f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', statueImg, heroStatueImg, artisanImg],
    sku: 'RL-APH-009',
    inStock: true,
  },
  {
    id: '010',
    slug: 'empress-theodora-byzantine-halo',
    name: 'EMPRESS THEODORA',
    subname: 'Byzantine Halo Masterpiece',
    category: 'Luxury Queens',
    categorySlug: 'luxuryqueens',
    price: '$ 18,200.00',
    priceNumber: 18200,
    description: 'Inspired by Byzantine royalty, this masterpiece features a stunning halo setting and delicate filigree.',
    extendedHistory: 'Theodora\'s halo is composed of 48 micro-pavé diamonds surrounding a cushion-cut center, held by double claws shaped as imperial eagles. The gallery beneath replicates the dome of Hagia Sophia in miniature gold architecture.',
    symbolism: 'Byzantine splendor, empress grace, and sacred power.',
    specs: {
      material: '18K White Gold & Platinum Gallery',
      weight: '22.1 Grams',
      gems: 'Cushion Diamond 2.1ct • Halo 0.78ct',
      craftHours: '124 Hours',
      provenance: 'Byzantium Collection',
      edition: 'One of One • Museum Acquisition',
      dimensions: 'US 4 - 9',
      hallmark: 'Owl of Athena • 750 • Pt950',
    },
    images: ['https://images.unsplash.com/photo-1599643478514-4a4e06223293?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', masterpieceCuffImg, statueImg, heroStatueImg],
    sku: 'RL-THE-010',
    inStock: true,
  },
  {
    id: '011',
    slug: 'laocoon-bronze-and-time-atelier',
    name: 'LAOCOÖN — BRONZE AND TIME',
    subname: 'Monumental Bronze Equestrian',
    category: 'Special Editions',
    categorySlug: 'special-editions',
    price: '$ 28,000.00',
    priceNumber: 28000,
    description: '"A fluid energy frozen in still, heavy bronze. Born of molten fire and creative will." — Jorge Uquillas',
    extendedHistory: 'Laocoön is not a ring but a sculptural jewel — a bronze equestrian fragment where liquid bronze waves meet sapphire inlays. Exhibited in WebGL 360°, this piece bridges sculpture and haute joaillerie, destined for private collection display.',
    symbolism: 'Timeless struggle, heroic tragedy, and the triumph of form.',
    specs: {
      material: 'Patinated Bronze & Ceylon Sapphires',
      weight: '420 Grams (sculpture)',
      gems: 'Ceylon Sapphires 3.2ct total',
      craftHours: '320 Hours Sculpted',
      provenance: 'Jorge Uquillas Studio • Athens',
      edition: 'One of One • Unique Monument',
      dimensions: '28 x 18 x 12 cm',
      hallmark: 'J. Uquillas MMXXVI • Bronze Foundry Seal',
    },
    images: [artisanImg, heroStatueImg, statueImg, emperorRingImg],
    sku: 'RL-LAO-011',
    inStock: true,
    featured: true,
  },
  {
    id: '012',
    slug: 'helen-of-troy-poetry-in-gold',
    name: 'HELEN OF TROY',
    subname: 'Poetry in Gold',
    category: 'Luxury Queens',
    categorySlug: 'luxuryqueens',
    price: '$ 22,000.00',
    priceNumber: 22000,
    description: 'A ring that could launch a thousand ships. Pure poetry in gold, featuring a magnificent center stone.',
    extendedHistory: 'Helen\'s center oval diamond is elevated on a hidden halo, allowing light to enter from every angle, like the lanterns of Troy. The shank is chased with Trojan wave motifs that disappear into the finger.',
    symbolism: 'Irresistible beauty, mythic destiny, and timeless desire.',
    specs: {
      material: '18K Yellow Gold • Oval Diamond 3.0ct',
      weight: '24.8 Grams',
      gems: 'Oval D/VVS2 3.02ct • Pavé 0.55ct',
      craftHours: '142 Hours',
      provenance: 'Ilium Collection',
      edition: 'One of One',
      dimensions: 'US 4.5 - 8',
      hallmark: 'Owl of Athena • 750',
    },
    images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', heroStatueImg, emperorRingImg, masterpieceCuffImg],
    sku: 'RL-HEL-012',
    inStock: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  // Prioriza mesma categoria, depois complementa
  const sameCategory = products.filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id);
  const others = products.filter((p) => p.categorySlug !== product.categorySlug && p.id !== product.id);
  const pooled = [...sameCategory, ...others];
  // embaralha levemente mas mantém determinismo por id para não piscar
  return pooled.slice(0, limit);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function formatPrice(priceNumber: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'USD' }).format(priceNumber);
}
