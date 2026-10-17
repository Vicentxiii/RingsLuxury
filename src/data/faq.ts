/**
 * FAQ mestre do site, em um unico lugar: src/data/faq.ts.
 *
 * POR QUE ISTO EXISTE
 * A auditoria mediu 46/100 em "Respostas diretas (AEO)". As perguntas estavam
 * espalhadas em 43 paginas de produto (as mesmas 4 repetidas em todas, o que o
 * Google trata como conteudo duplicado) e nenhuma pagina reunia o conjunto.
 * Esta e a pagina que a IA consulta para responder "quanto custa um anel de
 * ouro 18k da Rings Luxury", entao ela precisa de:
 * - perguntas escritas como sao digitadas na busca;
 * - resposta de 1 a 3 frases, factual e autocontida, com numero quando existe;
 * - links internos para a pagina que aprofunda o assunto.
 *
 * REGRA: nenhum numero inventado. Todo numero aqui ja aparece em outro lugar do
 * site (src/i18n/pages.ts, src/data/products.ts, public/llms.txt).
 */
export interface FaqEntry {
  q: string;
  /** Resposta curta, answer-first: e o que o Google extrai e a IA cita. */
  a: string;
  /** Complemento opcional, renderizado abaixo da resposta direta. */
  detail?: string;
  /** Link interno que aprofunda a resposta. */
  link?: { to: string; label: string };
}

export interface FaqGroup {
  id: string;
  title: string;
  kicker: string;
  items: FaqEntry[];
}

export const faqGroups: FaqGroup[] = [
  {
    id: 'pieces',
    kicker: 'The pieces',
    title: 'What kind of rings does RINGS LUXURY make?',
    items: [
      {
        q: 'What is a 1/1 handmade ring?',
        a: 'One of one: a single piece that will never be repeated. The original wax matrix is destroyed after casting, so no mould or replica of your ring can ever exist.',
        detail:
          'Each ring is drawn for one client, cast in solid 18k gold and engraved by hand with tempered-steel gravers. It leaves the atelier registered in the archive with its own dossier, certificate of authenticity and master hallmark.',
        link: { to: '/luxury-rings-guide', label: 'Read the buying guide' },
      },
      {
        q: 'How long does hand engraving take?',
        a: 'Between 90 and 140 hours of hand engraving per ring, cut directly into the solid metal, never laser or machine engraved.',
        link: { to: '/blog/the-art-of-artistic-engraving', label: 'How artistic engraving is done' },
      },
      {
        q: 'Are the diamonds real?',
        a: 'Yes, only hand-selected natural diamonds. Each stone is checked for fire and clarity, weighed, and set one by one under the microscope, with prongs carved from the 18k gold itself.',
        detail:
          'You can learn the 7 tests that separate a natural diamond from an imitation, from CZ to lab-grown, in our guide.',
        link: { to: '/blog/how-to-tell-if-your-diamonds-are-real-or-fake', label: 'How to tell real from fake diamonds' },
      },
      {
        q: 'Is the gold real 18k, or is it plated?',
        a: 'Solid 18k gold, cast, never plated. 18k is 75% pure gold alloyed for strength, the atelier standard for hand engraving.',
        link: { to: '/blog/understanding-gold-pricing', label: 'Understanding 18k gold and pricing' },
      },
    ],
  },
  {
    id: 'commission',
    kicker: 'Commissions',
    title: 'How a commission works',
    items: [
      {
        q: 'How do I commission a ring?',
        a: 'With a private consultation, in person in São Paulo or Miami or by video. Design, metal, stones, price and timeline are all agreed in writing before anything is cast.',
        link: { to: '/contact', label: 'Request a private consultation' },
      },
      {
        q: 'How much does a handmade 18k gold ring cost?',
        a: 'Each piece is priced individually, because every ring is drawn for one commission. The price is confirmed in writing with your proposal and covers the piece, the stones, the atelier hours, the documentation, the hallmark and, above US$ 5,000, insured shipping.',
        detail:
          'What drives the price: the metal and its weight, the natural diamonds selected, the complexity of the engraving, and the number of atelier hours. Hand engraving alone runs 90 to 140 hours per ring.',
        link: { to: '/emperor-rings', label: 'See the Emperor collection' },
      },
      {
        q: 'How do I find my ring size?',
        a: 'Your size is taken before casting, because each piece is made to measure. Measure the finger at the end of the day, when it is warmest, and note that wide sculpted bands fit tighter than thin ones.',
      },
      {
        q: 'How is a commission paid?',
        a: 'In two stages: 50% to begin the work and 50% before shipping, by major credit card, PIX or wire transfer, with discreet billing. The written proposal of your piece governs the exact terms.',
        link: { to: '/terms', label: 'Terms of sale' },
      },
      {
        q: 'How do I know the ring I received is authentic?',
        a: 'Every piece carries the master hallmark micro-engraved in the metal and leaves with its archival folio and certificate of authenticity. Because the wax matrix is destroyed after casting, no replica can exist.',
        link: { to: '/warranty', label: 'Lifetime warranty' },
      },
    ],
  },
  {
    id: 'delivery',
    kicker: 'Delivery and care',
    title: 'Shipping, warranty and care',
    items: [
      {
        q: 'Do you ship internationally?',
        a: 'Yes, worldwide. Every commission travels door to door under full insurance, tracked and with mandatory signature, in a hand-worked varnished wooden box inside neutral outer packaging.',
        link: { to: '/shipping', label: 'Shipping and insurance' },
      },
      {
        q: 'Is shipping included?',
        a: 'Shipping is included on commissions above US$ 5,000. Below that value the cost is quoted in writing with your proposal.',
        link: { to: '/shipping', label: 'Shipping and insurance' },
      },
      {
        q: 'How long does a commission take?',
        a: 'Pieces are made to order in 60 days from the first 50% payment. Transit time then depends on the destination and is confirmed when the commission is scheduled.',
      },
      {
        q: 'What does the lifetime warranty cover?',
        a: 'Manufacturing defects in the metal, the hand engraving and the settings, plus one hand polish per year by appointment. Normal wear from daily use is not a defect.',
        link: { to: '/warranty', label: 'Read the warranty' },
      },
      {
        q: 'How do I care for a hand-engraved gold ring?',
        a: 'Store it in its case, keep perfume and chemicals off the metal, and clean it only with the atelier dry flannel. Book the yearly atelier polish and never let a machine buff the crisp classical edges.',
        detail: 'A machine polishing rounds the edges the hand engraver created. That is why the polish is done at the atelier, by hand.',
      },
      {
        q: 'Can I return a custom-made ring?',
        a: 'A finished 1/1 piece cannot be returned, because there is no identical piece to reproduce. This is stated in writing before payment. Defects in manufacturing are always repaired or remade at no cost.',
        link: { to: '/returns', label: 'Returns and custom work' },
      },
    ],
  },
  {
    id: 'atelier',
    kicker: 'The atelier',
    title: 'Who makes the pieces and where',
    items: [
      {
        q: 'Who is Jorge Uquillas?',
        a: 'A master goldsmith and hand engraver, founder of RINGS LUXURY, with ateliers in Brazil and Miami, known for 1/1 handmade 18k gold diamond rings engraved with hand gravers.',
        link: { to: '/jorge-uquillas', label: 'About the master engraver' },
      },
      {
        q: 'Where are the ateliers?',
        a: 'São Paulo (Avenida Paulista, Brazil) and Miami (Brickell, Florida, USA), both by private appointment, plus private video consultations for clients anywhere in the world.',
        link: { to: '/contact', label: 'Book an appointment' },
      },
      {
        q: 'Do I receive the piece with a certificate?',
        a: 'Yes. Each piece leaves with an archival folio, a certificate of authenticity and the master hallmark, and is photographed and registered in the atelier archive.',
      },
      {
        q: 'Do you teach engraving?',
        a: 'Yes. The atelier academy runs a program in artistic engraving and haute joaillerie, from design to lost-wax casting, metals, gem setting and the final masterpiece, taught directly by Jorge Uquillas.',
        link: { to: '/courses', label: 'See the courses' },
      },
    ],
  },
  {
    id: 'diamonds',
    kicker: 'Gemology',
    title: 'Understanding your diamonds',
    items: [
      {
        q: 'How do I know if a diamond is real or fake?',
        a: 'Seven tests: the fog test, a 10x loupe, weight on a carat scale, UV fluorescence, a diamond tester, water and newspaper screening, and finally verification by a jeweler under the microscope.',
        detail:
          'Note that a lab-grown diamond passes every home test: only professional screening separates natural from lab-grown.',
        link: { to: '/blog/how-to-tell-if-your-diamonds-are-real-or-fake', label: 'Read the full test guide' },
      },
      {
        q: 'What are the 4Cs of a diamond?',
        a: 'Cut, colour, clarity and carat. Cut is what decides the fire of a stone; colour grades how white it is; clarity grades natural inclusions; carat is weight, not size alone.',
        link: { to: '/blog/the-anatomy-of-a-diamond', label: 'The anatomy of a diamond' },
      },
      {
        q: 'Do you use lab-grown diamonds?',
        a: 'No. The atelier works exclusively with hand-selected natural diamonds, chosen for fire and structural quality, not just for a certificate.',
        link: { to: '/blog/the-anatomy-of-a-diamond', label: 'How stones are selected' },
      },
    ],
  },
];

/** Todas as perguntas em uma lista, para o JSON-LD de FAQPage. */
export const allFaqEntries = faqGroups.flatMap((g) => g.items);

export default faqGroups;