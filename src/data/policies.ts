/**
 * Conteudo das paginas de politica (/privacy, /terms, /shipping, /returns,
 * /warranty).
 *
 * POR QUE ESTE ARQUIVO EXISTE
 * Uma auditoria de SEO de e-commerce reprova qualquer loja de luxo sem
 * politicas publicas: sao o sinal de confianca numero 1, alem de serem
 * obrigatorias por lei em varias jurisdicoes (LGPD no Brasil, GDPR na Europa,
 * CCPA nos EUA) e o lugar onde o Google procura para classificar o negocio
 * como varejista de confianca.
 *
 * REGRA DE OURO DESTE ARQUIVO
 * Nenhum numero, prazo ou百分比 e inventado. Todo fato vem do que o site ja
 * publica em outro lugar (veja `fonte` em cada secao). Onde a resposta depende
 * do contrato de cada encomenda, o texto diz exatamente isso, em vez de chutar
 * uma politica ficticia: politica inventada e pior que politica ausente,
 * porque quebra a expectativa do cliente e a confianca do Google ao mesmo tempo.
 *
 * Idioma: somente EN. O dicionario de i18n (src/i18n) cobre a navegacao em
 * 3 idiomas, mas documento legal so existe na versao assinada da encomenda.
 */
import contact from './contact.json';
import locationsData from './locations.json';

export interface PolicySection {
  heading: string;
  body: string[];
  list?: string[];
}

export interface Policy {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  /** Frases de uma linha que a IA e o Google podem citar direto. */
  answer: string[];
  updated: string;
  sections: PolicySection[];
}

const ateliers = locationsData.locations
  .map((l) => `${l.city}${l.district ? ` (${l.district})` : ''}, ${l.country}`)
  .join(' • ');

const commonContact = `${contact.phoneDisplay} • ${contact.email} • ${contact.hours.displayDays}, ${contact.hours.display}`;

export const policies: Policy[] = [
  {
    slug: 'shipping',
    title: 'Shipping and Insurance',
    seoTitle: 'Insured Worldwide Shipping | RINGS LUXURY',
    seoDescription:
      'How RINGS LUXURY ships handmade 18k gold rings worldwide: fully insured door-to-door delivery, tracked with signature, free above US$ 5,000, hand-worked wooden box.',
    answer: [
      'Every commission ships fully insured, door to door, tracked and with mandatory signature.',
      'Shipping is included on commissions above US$ 5,000.',
      'Each piece travels in a hand-worked varnished wooden presentation box inside neutral outer packaging.',
      'Pieces are made to order in 60 days from the first 50% payment; delivery time depends on the destination and is confirmed when the commission is scheduled.',
    ],
    updated: '2026-10-16',
    sections: [
      {
        heading: 'How your piece is protected in transit',
        body: [
          'Each piece is photographed and documented before it leaves the atelier, then sealed in a hand-worked varnished wooden presentation box inside neutral outer packaging, with no branding on the outer carton.',
          'Every shipment travels door to door under full insurance for the declared value of the piece, tracked, with mandatory signature on delivery. The recipient must be the client named on the commission, or a third party you authorize in writing beforehand.',
        ],
      },
      {
        heading: 'Cost and delivery time',
        body: [
          'Shipping is included on commissions above US$ 5,000. Below that value, the cost is quoted in writing with your commission proposal, depending on destination and insurance level.',
          'Pieces are made to order in 60 days from the first 50% payment. Transit time then depends on the destination region and on customs, and is confirmed in writing when your commission is scheduled. For time-sensitive occasions, tell the atelier at consultation so the timeline can be planned before the gold is cast.',
        ],
        list: [
          'The atelier provides the carrier, the tracking number and the declared value on your invoice.',
          'Duties and import taxes, when not included, are the responsibility of the recipient, except in Brazil, where the atelier handles the necessary clearance steps.',
          'The atelier cannot ship to a post box or to an address that the carrier refuses.',
        ],
      },
      {
        heading: 'If a shipment is damaged or lost',
        body: [
          'Any damage or loss must be reported to the atelier within 7 days of delivery, with photographs of the packaging and of the piece as received.',
          'The atelier files the claim with the carrier and the insurer and keeps you informed until resolution. Repairs or restoration of the piece are performed at the atelier, and are quoted only after inspection.',
        ],
      },
      {
        heading: 'Where we deliver',
        body: [
          `Worldwide, with private consultations and visits at the ateliers: ${ateliers}.`,
          `Private appointment: ${commonContact}.`,
        ],
      },
    ],
  },
  {
    slug: 'warranty',
    title: 'Lifetime Warranty',
    seoTitle: 'Lifetime Warranty on Handmade 18k Gold Rings | RINGS LUXURY',
    seoDescription:
      'The RINGS LUXURY lifetime warranty covers manufacturing defects in handmade 18k gold rings and necklaces, includes annual polishing by appointment and covers the hand engraving.',
    answer: [
      'The lifetime warranty covers manufacturing defects in the metal, the hand engraving and the settings.',
      'It includes one hand polish per year, by appointment, at the atelier.',
      'Normal wear from daily use, and damage from accidents, are not defects and are quoted as atelier work after inspection.',
    ],
    updated: '2026-10-16',
    sections: [
      {
        heading: 'What the lifetime warranty covers',
        body: [
          'The lifetime warranty covers defects of manufacture: casting porosity, defects in the hand engraving, loose or poorly executed settings, and any structural failure not caused by wear or impact.',
          'It also covers one hand polish per year, by appointment at the atelier, because hand-engraved 18k gold needs its crisp classical edges maintained by hand, never by machine buffing.',
        ],
      },
      {
        heading: 'What it does not cover',
        body: [
          'Normal wear from daily use is not a defect: fine scratches on 18k gold, softening of the engraving after decades of wear, and the natural movement of a worn ring are expected in solid gold jewelry and do not constitute a manufacturing defect.',
          'Damage from accidents, impact, crushing, loss or theft, and any work performed by another jeweler on the piece, is not covered. Micro-adjustments, additional engraving and stone re-seating are quoted on consultation, after inspection.',
        ],
        list: [
          'Keep the archival folio and the master hallmark with the piece: they are the proof of origin and of the warranty.',
          'Report any defect to the atelier before a third party touches the piece.',
          'Annual polishing also checks the settings under magnification, which is what prevents a stone from ever loosening silently.',
        ],
      },
      {
        heading: 'How to claim',
        body: [
          `Write to ${contact.email} or ${contact.phoneDisplay} describing the piece and the issue, ideally with photographs. The atelier inspects the piece and answers in writing with the service plan and, if applicable, the cost of atelier work before anything is done.`,
          'The same route serves clients outside Brazil and the United States: the atelier arranges the evaluation of the piece in whichever atelier is closest to you.',
        ],
      },
    ],
  },
  {
    slug: 'returns',
    title: 'Returns and Custom Work',
    seoTitle: 'Returns and Custom Made Rings | RINGS LUXURY',
    seoDescription:
      'Returns policy for RINGS LUXURY: each ring is 1/1 and made to your commission, so finished bespoke pieces are not returnable. What happens before work begins, and how to cancel.',
    answer: [
      'Each piece is 1/1 and made to your commission, so a finished bespoke piece cannot be returned or resold, because no identical piece can ever be reproduced.',
      'Before the work begins, the design, metal, stones, price and timeline are agreed in writing; cancelling before the gold is cast is refunded according to the stage reached.',
      'If a piece arrives damaged or with a manufacturing defect, it is repaired or remade at the atelier at no cost, under the lifetime warranty.',
    ],
    updated: '2026-10-16',
    sections: [
      {
        heading: 'Why a finished 1/1 piece is not returnable',
        body: [
          'At RINGS LUXURY every piece is one of one: it is designed for one client, cast from a wax matrix that is destroyed after casting, and engraved by hand. There is no stock to resell and no identical piece to reproduce.',
          'For that reason a finished commissioned piece cannot be returned, exchanged or resold once it has been delivered to you. This is not a restriction on your rights: it is the physical nature of a one-of-one object. This condition is stated in writing before any payment, together with the rest of your commission terms.',
        ],
      },
      {
        heading: 'Before the work begins',
        body: [
          'The commission is only accepted after a private consultation, in person at São Paulo or Miami, or by video, where the design, the metal, the stones, the price and the timeline are all agreed in writing.',
          'From that moment the wax matrix is sculpted in your presence or under your instructions, and the schedule begins. If you cancel before the casting starts, the amount already paid is refunded according to the stage reached, which is described in the written commission terms. Once the gold is cast, the piece is made for you and the stages completed are not refundable.',
        ],
        list: [
          'Nothing is cast, and no diamond is reserved, before you approve the drawing and the written proposal.',
          'Stone selection is confirmed with you before setting.',
          'Any change of design after approval is quoted as new atelier work.',
        ],
      },
      {
        heading: 'If something is wrong with the piece',
        body: [
          'A manufacturing defect is always repaired or remade at the atelier at no cost, under the lifetime warranty, including transit to and from the atelier.',
          'Transport damage or loss is handled as a shipping claim with the carrier and the insurer, as described in the shipping policy.',
        ],
      },
    ],
  },
  {
    slug: 'terms',
    title: 'Terms of Sale',
    seoTitle: 'Terms of Sale and Commissions | RINGS LUXURY',
    seoDescription:
      'Terms of sale for RINGS LUXURY handmade 18k gold jewelry by Jorge Uquillas: commission process, payment, hallmark, certificate of authenticity, intellectual property and governing law.',
    answer: [
      'Every piece is commissioned: design, metal, stones, price and timeline are agreed in writing at the private consultation, before anything is cast.',
      'Each piece leaves the atelier with its archival folio, certificate of authenticity and master hallmark, and is registered as one of one.',
      'These terms govern the commission and are confirmed in writing for each client, together with the applicable consumer protection of the country of delivery.',
    ],
    updated: '2026-10-16',
    sections: [
      {
        heading: 'The commission',
        body: [
          'A commission begins with a private consultation, in person at the São Paulo or Miami atelier or by video. During the consultation the design is drawn, the metal, the stones, the price and the timeline are agreed, and everything is confirmed in writing before any deposit or casting.',
          'The price agreed in that written proposal covers the piece, the stones, the atelier hours, the archival documentation, the hallmark and, above US$ 5,000, the insured shipping.',
        ],
      },
      {
        heading: 'Payment',
        body: [
          'Commissions are paid in two stages: 50% to begin the work and 50% before shipping. Payment is made by major credit card, PIX or wire transfer, with discreet billing and no third-party data shared.',
          'The atelier issues a receipt and a written commission proposal for every client, which is the document that governs the specific terms of your piece, including the cancellation terms described in the returns policy.',
        ],
      },
      {
        heading: 'Authenticity and documentation',
        body: [
          'Every piece carries the atelier master hallmark micro-engraved in the metal and leaves with its archival folio and certificate of authenticity. The wax matrix is destroyed after casting, so no replica of your piece can exist.',
          'Pieces are registered in the atelier archive with their own dossier and number. Photographs of the finished piece, of the hallmark and of the archive entry are provided to the client.',
        ],
      },
      {
        heading: 'Your drawing stays yours',
        body: [
          'The design you commission remains your intellectual property. The atelier does not reproduce a client design for anyone else, and no client drawing is published without written permission.',
          'The atelier reserves the right to photograph finished pieces for the atelier archive and, with the client written permission, for publication.',
        ],
      },
      {
        heading: 'Liability and governing law',
        body: [
          'The atelier is responsible for the piece as described in the written proposal: the material, the stones, the hand engraving and the structural finish. Natural characteristics of solid 18k gold and of natural diamonds, including fine scratches, the softening of engraving over time and the natural inclusions of natural stones, are not defects.',
          'These general terms are completed by the written commission proposal for your piece, and by the consumer protection legislation of the country of delivery, which prevails over anything written here.',
          `Private consultation: ${commonContact}. Ateliers: ${ateliers}.`,
        ],
      },
    ],
  },
  {
    slug: 'privacy',
    title: 'Privacy Policy',
    seoTitle: 'Privacy Policy and LGPD | RINGS LUXURY',
    seoDescription:
      'How RINGS LUXURY collects, uses and protects your personal data, in line with LGPD, GDPR and CCPA. What the atelier collects, for what, and how to request deletion.',
    answer: [
      'The atelier collects only the data needed to build and deliver your commission: name, e-mail, WhatsApp or phone, ring size and the story you want told in the piece.',
      'Your data is never sold or shared with advertisers. Payment data goes straight to the payment provider.',
      'You can ask at any time for access to, correction of or deletion of your data, and your photos are never published without your written permission.',
    ],
    updated: '2026-10-16',
    sections: [
      {
        heading: 'What data is collected',
        body: [
          'To build and deliver a commission, the atelier collects the data you give at consultation: name, e-mail, WhatsApp or phone, the finger and hand the ring is for, your ring size, and the story you want told in the piece.',
          'A photography of the finished piece may be added to your archive file. Payment data is not stored by the atelier: it goes directly to the payment provider.',
        ],
        list: [
          'Consultation forms collect name, e-mail, message and, when you give it, a phone or WhatsApp number.',
          'Cookies are not used for advertising or cross-site tracking. Language preference is stored only in your own browser, on your own device.',
        ],
      },
      {
        heading: 'Why the data is used',
        body: [
          'To contact you about your commission, to draw, quote, build and ship your piece, to issue the certificate of authenticity and the archive dossier, and to keep the warranty of your piece.',
          'Legal basis: performance of a contract you asked for, and legitimate interest in answering your questions before a commission exists.',
        ],
      },
      {
        heading: 'How long it is kept',
        body: [
          'Commission files are kept for as long as the piece exists in the atelier archive, which is permanent, because the archive is the proof of provenance and the basis of the lifetime warranty.',
          'Consultation contacts that do not become commissions are kept for 24 months and then deleted, unless you ask to be contacted about future collections.',
        ],
      },
      {
        heading: 'Sharing and photos',
        body: [
          'Your data is never sold, rented or shared with advertisers. It is shared only with the carriers and the insurer needed to deliver your insured piece, and with the payment provider, each under their own privacy policy.',
          'Photographs of a finished piece are never published without your written permission. The atelier holds copyright on the photography of its own work, and the drawing you commission stays yours.',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          'You can ask at any time for confirmation of processing, access to your data, correction, anonymization, deletion of data you have not given consent for, portability, and information about who shared your data. Requests are answered in writing.',
          'This policy follows the LGPD (Brazil), the GDPR (European Union) and the CCPA (United States), and the rights of the law that applies to your country of residence are always preserved.',
        ],
      },
      {
        heading: 'Contact the atelier about your data',
        body: [`Write to ${contact.email} or ${contact.phoneDisplay} with any request about your personal data. The atelier answers in writing.`],
      },
    ],
  },
];

export const policyBySlug = (slug: string): Policy | undefined => policies.find((p) => p.slug === slug);

export default policies;