const en = {
  home: 'HOME',
  luxuryRings: 'LUXURY RINGS',
  emperorRings: 'EMPEROR RINGS',
  specialEditions: 'SPECIAL EDITIONS',
  goldSilverRings: 'GOLD-SILVER RINGS',
  luxuryQueens: 'LUXURY QUEENS',
  necklaces: 'NECKLACES',
  courses: 'COURSES',
  contact: 'CONTACT',
  blog: 'BLOG',
  logoSubtitle: 'Jorge Uquillas • HandCrafted 18k • Artisan Rings',
  flagUS: 'English',
  flagES: 'Español',
  flagBR: 'Português',
} as const;

type Keys = keyof typeof en;

const es: Record<Keys, string> = {
  home: 'INICIO',
  luxuryRings: 'ANILLOS DE LUJO',
  emperorRings: 'ANILLOS DEL EMPERADOR',
  specialEditions: 'EDICIONES ESPECIALES',
  goldSilverRings: 'ANILLOS ORO-PLATA',
  luxuryQueens: 'REINAS DE LUJO',
  necklaces: 'COLLARES',
  courses: 'CURSOS',
  contact: 'CONTACTO',
  blog: 'BLOG',
  logoSubtitle: 'Jorge Uquillas • HandCrafted 18k • Anillos Artesanales',
  flagUS: 'English',
  flagES: 'Español',
  flagBR: 'Português',
};

const pt: Record<Keys, string> = {
  home: 'INÍCIO',
  luxuryRings: 'ANÉIS DE LUXO',
  emperorRings: 'ANÉIS DO IMPERADOR',
  specialEditions: 'EDIÇÕES ESPECIAIS',
  goldSilverRings: 'ANÉIS OURO-PRATA',
  luxuryQueens: 'RAINHAS DE LUXO',
  necklaces: 'COLARES',
  courses: 'CURSOS',
  contact: 'CONTATO',
  blog: 'BLOG',
  logoSubtitle: 'Jorge Uquillas • HandCrafted 18k • Anéis Artesanais',
  flagUS: 'English',
  flagES: 'Español',
  flagBR: 'Português',
};

export const navTexts = { en, es, pt };
export type NavDict = typeof en;

// ---- Footer strings (lives here to avoid cross-agent conflicts with pages.ts) ----
const footerEn = {
  brandParagraph:
    '1/1 handcrafted 18k gold artisan rings with natural diamonds, finished by master hand engraver Jorge Uquillas.',
  collectionsHeading: 'Collections',
  atelierHeading: 'Atelier',
  privateSalonHeading: 'Private Salon',
  colLuxuryRings: 'Luxury Rings',
  colEmperorRings: 'Emperor Rings',
  colGoldSilver: 'Gold & Silver Rings',
  colSpecialEditions: 'Special Editions',
  colNecklaces: 'Necklaces',
  colLuxuryQueens: 'Luxury Queens',
  atelierAbout: 'About Jorge Uquillas',
  atelierJournal: "The Master's Journal",
  atelierCourses: 'Engraving Courses',
  visitsScheduled: 'Visits under schedule',
  bottomRights: '© MMXXVI RINGS LUXURY ATELIER, All Rights Reserved',
  bottomTagline: 'HandCrafted 18k Gold • Handmade 18k Gold Rings',
  handmadeInBrazil: 'Handmade in Brazil & Miami',
  creditPrefix: 'Site created by',
  creditRole: 'an Digital Artisan',
  creditFromWord: 'from',
  creditFrom: 'Transcent Digital',
} as const;

type FooterKeys = keyof typeof footerEn;

const footerEs: Record<FooterKeys, string> = {
  brandParagraph:
    'Anillos artesanales 1/1 de oro de 18k con diamantes naturales, terminados por el maestro grabador a mano Jorge Uquillas.',
  collectionsHeading: 'Colecciones',
  atelierHeading: 'Atelier',
  privateSalonHeading: 'Salón Privado',
  colLuxuryRings: 'Anillos de Lujo',
  colEmperorRings: 'Anillos del Emperador',
  colGoldSilver: 'Anillos de Oro y Plata',
  colSpecialEditions: 'Ediciones Especiales',
  colNecklaces: 'Collares',
  colLuxuryQueens: 'Reinas de Lujo',
  atelierAbout: 'Sobre Jorge Uquillas',
  atelierJournal: 'El Diario del Maestro',
  atelierCourses: 'Cursos de Grabado',
  visitsScheduled: 'Visitas con cita previa',
  bottomRights: '© MMXXVI RINGS LUXURY ATELIER, Todos los Derechos Reservados',
  bottomTagline: 'Oro de 18k Hecho a Mano • Anillos de Oro de 18k Hechos a Mano',
  handmadeInBrazil: 'Hecho a mano en Brasil y Miami',
  creditPrefix: 'Sitio creado por',
  creditRole: 'an Digital Artisan',
  creditFromWord: 'de',
  creditFrom: 'Transcent Digital',
};

const footerPt: Record<FooterKeys, string> = {
  brandParagraph:
    'Anéis artesanais 1/1 em ouro 18k com diamantes naturais, finalizados pelo mestre gravador à mão Jorge Uquillas.',
  collectionsHeading: 'Coleções',
  atelierHeading: 'Atelier',
  privateSalonHeading: 'Salão Privado',
  colLuxuryRings: 'Anéis de Luxo',
  colEmperorRings: 'Anéis do Imperador',
  colGoldSilver: 'Anéis de Ouro e Prata',
  colSpecialEditions: 'Edições Especiais',
  colNecklaces: 'Colares',
  colLuxuryQueens: 'Rainhas de Luxo',
  atelierAbout: 'Sobre Jorge Uquillas',
  atelierJournal: 'O Diário do Mestre',
  atelierCourses: 'Cursos de Gravação',
  visitsScheduled: 'Visitas com agendamento',
  bottomRights: '© MMXXVI RINGS LUXURY ATELIER, Todos os Direitos Reservados',
  bottomTagline: 'Ouro 18k Artesanal • Anéis Artesanais em Ouro 18k',
  handmadeInBrazil: 'Feito à mão no Brasil e Miami',
  creditPrefix: 'Site criado por',
  creditRole: 'an Digital Artisan',
  creditFromWord: 'da',
  creditFrom: 'Transcent Digital',
};

export const footerTexts = { en: footerEn, es: footerEs, pt: footerPt };
export type FooterDict = typeof footerEn;
