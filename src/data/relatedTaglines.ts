/**
 * Frases dos cards do carrossel de relacionados.
 * Poucas palavras que evocam força, poder, ouro e tradição, com sentido
 * ligado à peça. Sempre citam ouro nobre 18k (ou prata de lei nas peças
 * em prata/mistas) e as gemas quando a ficha técnica confirma.
 * Chave = slug do produto.
 */
export interface Tagline {
  en: string;
  es: string;
  pt: string;
}

export const relatedTaglines: Record<string, Tagline> = {
  // ---- Luxury Rings ----
  'emperor-ring-18k-gold-monogram-jorge-uquillas': {
    en: 'Imperial power sealed in solid 18k noble gold, hand-engraved for eternity',
    es: 'Poder imperial sellado en oro noble de 18k, grabado a mano para la eternidad',
    pt: 'Poder imperial selado em ouro nobre 18k, gravado à mão para a eternidade',
  },
  'bitcoin-ring-especial-edition-18k-gold-jorge-uquillas': {
    en: 'Sovereign wealth carved in solid 18k noble gold by master hands',
    es: 'Riqueza soberana tallada en oro noble de 18k por manos maestras',
    pt: 'Riqueza soberana talhada em ouro nobre 18k por mãos mestras',
  },
  'medusa-ring-especial-edition-diamonds-jorge-uquillas': {
    en: 'Myth turned to armour in 18k noble gold crowned with natural diamonds',
    es: 'El mito hecho armadura en oro noble de 18k coronado de diamantes',
    pt: 'O mito feito armadura em ouro nobre 18k coroado de diamantes',
  },
  'king-skull-ring-18k-diamonds-especial-edition-jorge-uquillas': {
    en: 'Crowned skull in 18k noble gold, pavé-set with blazing natural diamonds',
    es: 'Cráneo coronado en oro noble de 18k, pavé de diamantes encendidos',
    pt: 'Caveira coroada em ouro nobre 18k, pavê de diamantes incandescentes',
  },
  'tiger-ring-18k-gold-jorge-uquillas': {
    en: 'Pure predator power sculpted in solid 18k noble gold',
    es: 'Puro poder depredador esculpido en oro noble macizo de 18k',
    pt: 'Puro poder predador esculpido em ouro nobre maciço 18k',
  },
  // ---- Emperor Rings ----
  'emperor-heraldic-ring-18k-gold-jorge-uquillas': {
    en: 'Your lineage raised as empire in solid 18k noble gold',
    es: 'Tu linaje elevado a imperio en oro noble macizo de 18k',
    pt: 'Sua linhagem erguida como império em ouro nobre maciço 18k',
  },
  'rose-gold-pirate-skull-ring-jorge-uquillas': {
    en: 'Rebel luxury forged in 18k rose noble gold, defiant by design',
    es: 'Lujo rebelde forjado en oro noble rosa de 18k, desafiante por diseño',
    pt: 'Luxo rebelde forjado em ouro nobre rosé 18k, desafiante por essência',
  },
  'lion-emperor-ring-18k-gold-jorge-uquillas': {
    en: 'The emperor of beasts roaring in solid 18k noble gold',
    es: 'El emperador de las bestias rugiendo en oro noble macizo de 18k',
    pt: 'O imperador das feras rugindo em ouro nobre maciço 18k',
  },
  'koi-emperor-ring-18k-rose-gold-jorge-uquillas': {
    en: 'Perseverance cast in 18k rose noble gold, fortune made eternal',
    es: 'Perseverancia fundida en oro noble rosa de 18k, fortuna eterna',
    pt: 'Perseverança fundida em ouro nobre rosé 18k, fortuna eternizada',
  },
  'emperor-skull-ring-18k-gold-jorge-uquillas': {
    en: 'Sovereign power in solid 18k noble gold that remembers eternity',
    es: 'Poder soberano en oro noble macizo de 18k que recuerda la eternidad',
    pt: 'Poder soberano em ouro nobre maciço 18k que lembra a eternidade',
  },
  'luxury-emperor-masonic-ring-jorge-uquillas': {
    en: 'Sacred geometry cut in solid 18k noble gold for the highest degree',
    es: 'Geometría sagrada tallada en oro noble macizo de 18k del más alto grado',
    pt: 'Geometria sagrada talhada em ouro nobre maciço 18k do mais alto grau',
  },
  // ---- Special Editions ----
  'tempest-ring-especial-edition-jorge-uquillas': {
    en: 'The storm tamed in solid 18k noble gold, fury made eternal',
    es: 'La tempestad domada en oro noble macizo de 18k, furia eterna',
    pt: 'A tempestade domada em ouro nobre maciço 18k, fúria eterna',
  },
  'tiger-ring-especial-edition-jorge-uquillas': {
    en: 'Apex predator in solid 18k noble gold, stripes of golden fury',
    es: 'Depredador supremo en oro noble macizo de 18k, rayas de furia dorada',
    pt: 'Predador supremo em ouro nobre maciço 18k, listras de fúria dourada',
  },
  'dr-viotto-ring-jorge-uquillas-rings-luxury': {
    en: 'A private legend commissioned in solid 18k noble gold',
    es: 'Una leyenda privada encargada en oro noble macizo de 18k',
    pt: 'Uma lenda privada encomendada em ouro nobre maciço 18k',
  },
  'medusa-rings-18k-gold-diamonds-jorge-uquillas': {
    en: 'Gorgon crown in 18k noble gold with diamond fire for eyes',
    es: 'Corona gorgona en oro noble de 18k con fuego de diamantes',
    pt: 'Coroa górgona em ouro nobre 18k com fogo de diamantes',
  },
  'avengers-rings-18k-gold-jorge-uquillas': {
    en: 'Modern myths forged in solid 18k noble gold for new legends',
    es: 'Mitos modernos forjados en oro noble macizo de 18k para nuevas leyendas',
    pt: 'Mitos modernos forjados em ouro nobre maciço 18k para novas lendas',
  },
  'kraken-especial-edition-ring-jorge-uquillas': {
    en: 'Deep-sea power coiled in solid 18k noble gold from the abyss',
    es: 'Poder abisal enroscado en oro noble macizo de 18k desde el abismo',
    pt: 'Poder abissal enrolado em ouro nobre maciço 18k vindo do abismo',
  },
  'jesus-ring-18k-diamonds-jorge-uquillas': {
    en: 'Sacred devotion in 18k noble gold haloed with natural diamonds',
    es: 'Devoción sagrada en oro noble de 18k con halo de diamantes',
    pt: 'Devoção sagrada em ouro nobre 18k com halo de diamantes',
  },
  'monkey-ring-18k-gold-diamonds-jorge-uquillas': {
    en: 'Wild majesty in 18k noble gold with diamond-lit eyes',
    es: 'Majestad salvaje en oro noble de 18k con ojos de diamante',
    pt: 'Majestade selvagem em ouro nobre 18k com olhos de diamante',
  },
  'memento-mori-ring-jorge-uquillas-rings-luxury': {
    en: 'A reign sculpted in solid 18k noble gold to outlive time',
    es: 'Un reinado esculpido en oro noble macizo de 18k más allá del tiempo',
    pt: 'Um reinado esculpido em ouro nobre maciço 18k além do tempo',
  },
  'king-lion-ring-diamonds-jorge-uquillas': {
    en: 'Savannah throne in 18k noble gold crowned with natural diamonds',
    es: 'Trono de la sabana en oro noble de 18k coronado de diamantes',
    pt: 'Trono da savana em ouro nobre 18k coroado de diamantes',
  },
  // ---- Gold & Silver Rings ----
  'mixed-luxury-gold-ring-jorge-uquillas': {
    en: 'Yellow, rose and white 18k noble golds fused in one eternal band',
    es: 'Oros nobles de 18k amarillo, rosa y blanco fundidos en una alianza eterna',
    pt: 'Ouros nobres 18k amarelo, rosé e branco fundidos em uma aliança eterna',
  },
  'wolf-silver-ring-jorge-uquillas': {
    en: 'Lone wolf strength howled in solid sterling silver',
    es: 'Fuerza de lobo solitario aullada en plata de ley maciza',
    pt: 'Força de lobo solitário uivada em prata de lei maciça',
  },
  'family-crest-silver-ring-jorge-uquillas': {
    en: 'Your bloodline sealed in solid sterling silver by master hand',
    es: 'Tu linaje sellado en plata de ley maciza por mano maestra',
    pt: 'Sua linhagem selada em prata de lei maciça por mão mestra',
  },
  'mixed-masonic-33-degrees-gold-silver-ring-jorge-uquillas': {
    en: 'Highest masonic honour in 18k noble gold and sterling silver',
    es: 'Máximo honor masónico en oro noble de 18k y plata de ley',
    pt: 'Máxima honra maçônica em ouro nobre 18k e prata de lei',
  },
  'mixed-gold-silver-family-crest-ring-jorge-uquillas': {
    en: 'Two noble metals, one bloodline: 18k gold and sterling silver',
    es: 'Dos metales nobles, un linaje: oro de 18k y plata de ley',
    pt: 'Dois metais nobres, uma linhagem: ouro 18k e prata de lei',
  },
  'mixed-templar-gold-silver-ring-18k-jorge-uquillas': {
    en: 'Templar oath forged in 18k noble gold over sterling silver',
    es: 'Juramento templario forjado en oro noble de 18k sobre plata de ley',
    pt: 'Juramento templário forjado em ouro nobre 18k sobre prata de lei',
  },
  'mixed-gold-silver-ring-family-crest-numbered-jorge-uquillas': {
    en: 'Numbered legacy engraved in 18k gold and sterling silver',
    es: 'Legado numerado grabado en oro de 18k y plata de ley',
    pt: 'Legado numerado gravado em ouro 18k e prata de lei',
  },
  // ---- Luxury Queens ----
  'luxury-queens-ring-jorge-uquillas-rings-luxury': {
    en: 'Queenship in 18k noble gold armed with natural diamonds',
    es: 'Realeza en oro noble de 18k armada de diamantes naturales',
    pt: 'Realeza em ouro nobre 18k armada de diamantes naturais',
  },
  'sapphire-diamond-necklace-jorge-uquillas-rings-luxury': {
    en: 'Ceylon sapphires and diamonds set in 18k noble gold for queens',
    es: 'Zafiros de Ceilán y diamantes en oro noble de 18k para reinas',
    pt: 'Safiras do Ceilão e diamantes em ouro nobre 18k para rainhas',
  },
  // ---- Necklaces ----
  'panther-necklace-18k-gold-citrin-jorge-uquillas': {
    en: 'Night hunt in 18k noble gold with burning citrine eyes',
    es: 'Caza nocturna en oro noble de 18k con ojos de citrino ardiente',
    pt: 'Caça noturna em ouro nobre 18k com olhos de citrino ardente',
  },
  'rhino-necklace-18k-gold-diamonds-jorge-uquillas': {
    en: 'Savannah armour in 18k noble gold studded with natural diamonds',
    es: 'Armadura de la sabana en oro noble de 18k con diamantes naturales',
    pt: 'Armadura da savana em ouro nobre 18k com diamantes naturais',
  },
  'variable-18k-gold-chains-18mm-jorge-uquillas': {
    en: 'The golden foundation of kings in solid 18k noble gold',
    es: 'La base dorada de los reyes en oro noble macizo de 18k',
    pt: 'A base dourada dos reis em ouro nobre maciço 18k',
  },
  'medusa-necklace-full-diamonds-18k-gold-jorge-uquillas': {
    en: 'Gorgon in full diamond pavé set in solid 18k noble gold',
    es: 'Gorgona en pavé total de diamantes sobre oro noble macizo de 18k',
    pt: 'Górgona em pavê total de diamantes sobre ouro nobre maciço 18k',
  },
  'lion-necklace-18k-gold-jorge-uquillas': {
    en: "A lion's roar worn at the throat in solid 18k noble gold",
    es: 'El rugido del león al cuello en oro noble macizo de 18k',
    pt: 'O rugido do leão no pescoço em ouro nobre maciço 18k',
  },
  'king-lion-necklace-jorge-uquillas-rings-luxury': {
    en: 'Crowned savannah royalty sculpted in solid 18k noble gold',
    es: 'Realeza coronada de la sabana esculpida en oro noble macizo de 18k',
    pt: 'Realeza coroada da savana esculpida em ouro nobre maciço 18k',
  },
};

export function taglineFor(slug: string, lang: 'en' | 'es' | 'pt'): string | undefined {
  return relatedTaglines[slug]?.[lang];
}
