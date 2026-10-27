import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { absoluteUrl, HAS_SITE_URL } from '../site.config';
import { useLanguage, type Lang } from '../i18n/LanguageContext';

/** Ultima revisao editorial da Home, mostrada e declarada no JSON-LD. */
const PAGE_UPDATED = '2026-10-17';

/**
 * Respostas diretas na Home em formato FAQ Accordion (Clique para revelar).
 */
interface QA {
  id: string;
  q: string;
  a: string;
  /** Complemento opcional, abaixo da resposta direta. */
  detail?: string;
  link?: { to: string; label: string };
}

interface FaqDict {
  title: string;
  subtitle: string;
  updatedBadge: string;
  inShortTitle: string;
  inShortText1: string;
  inShortText2: string;
  writtenBy: string;
  role: string;
  questions: QA[];
}

const FAQ_DATA: Record<Lang, FaqDict> = {
  en: {
    title: 'What clients ask before they commission',
    subtitle: 'Direct answers, with the real numbers of the atelier: price, time, method, shipping and warranty.',
    updatedBadge: `Prices updated ${PAGE_UPDATED} · metal purity per ISO 8653 · stones graded per GIA`,
    inShortTitle: 'In short',
    inShortText1:
      'RINGS LUXURY makes 1/1 handmade 18k gold rings, cast solid and hand-engraved for 90 to 140 hours, with hand-selected natural diamonds set one by one. They start at US$ 4,800, take 60 days from the first 50% payment, ship insured door to door worldwide and carry a lifetime warranty.',
    inShortText2: 'The next step is a private consultation in São Paulo or Miami, or by video from anywhere.',
    writtenBy: 'Written by',
    role: ', master goldsmith and hand engraver, founder of RINGS LUXURY.',
    questions: [
      {
        id: 'quanto-custa-anel-ouro-18k',
        q: 'How much does a handmade 18k gold ring cost?',
        a: 'A handcrafted 18k gold diamond ring by Jorge Uquillas starts at US$ 4,800, and the Emperor collection runs between US$ 4,800 and US$ 28,000. Mixed gold and silver rings start at US$ 3,500 and sterling silver rings at US$ 1,500; necklaces reach US$ 150,000 for the Rhino.',
        detail:
          'Every ring is drawn for one client, so the price of a bespoke piece is always confirmed in writing before any deposit, never quoted from a list.',
        link: { to: '/emperor-rings', label: 'See the Emperor collection' },
      },
      {
        id: 'quanto-tempo-leva-para-fazer',
        q: 'How long does it take to make a handmade gold ring?',
        a: 'A piece is made to order in 60 days from the first 50% payment, and 90 to 140 hours of that is hand engraving alone, cut into the solid metal with tempered-steel gravers.',
        detail:
          'Is it worth planning a date? Tell the atelier at consultation, before the gold is cast, and the timeline is planned around it.',
        link: { to: '/luxury-rings-guide', label: 'Read the buying guide' },
      },
      {
        id: 'anel-feito-a-mao-ou-pronto',
        q: 'Is it really handmade, or is it a cast replica?',
        a: 'It is 1/1, one of one: the original wax matrix is destroyed after casting, so no mould or replica of your ring can ever be made. There is no stock and no second copy.',
        detail:
          'The engraving is cut directly into the solid 18k gold, never by laser or machine, and each piece leaves with a master hallmark micro-engraved in the metal, an archival folio and a certificate of authenticity.',
        link: { to: '/jorge-uquillas', label: 'Meet Jorge Uquillas' },
      },
      {
        id: 'diamante-real-ou-falso',
        q: 'Are the diamonds real, and how can I tell?',
        a: 'Every stone is a hand-selected natural diamond, chosen for fire and clarity, weighed and set one by one under the microscope. No lab-grown stones are used.',
        detail:
          'Seven tests separate a natural diamond from an imitation, from the fog test to the UV glow and the diamond tester: see the full guide.',
        link: { to: '/blog/how-to-tell-if-your-diamonds-are-real-or-fake', label: 'The 7 tests explained' },
      },
      {
        id: 'envio-seguro-internacional',
        q: 'Do you ship internationally, and is it insured?',
        a: 'Yes, to clients in over 50 countries. Every commission travels door to door under full insurance for the declared value, tracked and with mandatory signature, in a hand-worked varnished wooden box inside neutral outer packaging.',
        detail: 'Shipping is included on commissions above US$ 5,000.',
        link: { to: '/shipping', label: 'Shipping and insurance' },
      },
      {
        id: 'garantia-e-pos-venda',
        q: 'What happens after the piece arrives?',
        a: 'A lifetime warranty covers manufacturing defects in the metal, the hand engraving and the settings, and includes one hand polish per year by appointment.',
        detail:
          'Never machine-buff a hand-engraved ring: aggressive polishing rounds the crisp classical edges the hand engraver created. That is why the polish is done at the atelier, by hand.',
        link: { to: '/warranty', label: 'Read the warranty' },
      },
    ],
  },
  es: {
    title: 'Lo que los clientes preguntan antes de encargar',
    subtitle: 'Respuestas directas, con los números reales del atelier: precio, tiempo, método, envío y garantía.',
    updatedBadge: `Precios actualizados el ${PAGE_UPDATED} · pureza del metal según ISO 8653 · gemas clasificadas según GIA`,
    inShortTitle: 'En resumen',
    inShortText1:
      'RINGS LUXURY crea anillos 1/1 hechos a mano en oro de 18k, fundidos en metal macizo y grabados a mano durante 90 a 140 horas, con diamantes naturales seleccionados y engastados uno a uno. Comienzan en US$ 4.800, requieren 60 días a partir del primer pago del 50%, viajan asegurados puerta a puerta a todo el mundo y cuentan con garantía de por vida.',
    inShortText2: 'El siguiente paso es una consulta privada en São Paulo o Miami, o por videollamada desde cualquier parte del mundo.',
    writtenBy: 'Escrito por',
    role: ', maestro orfebre y grabador artístico, fundador de RINGS LUXURY.',
    questions: [
      {
        id: 'quanto-custa-anel-ouro-18k',
        q: '¿Cuánto cuesta un anillo de oro de 18k hecho a mano?',
        a: 'Un anillo de diamantes en oro de 18k hecho a mano por Jorge Uquillas comienza en US$ 4.800, y la colección Emperor oscila entre US$ 4.800 y US$ 28.000. Los anillos mixtos de oro y plata comienzan en US$ 3.500 y los de plata esterlina en US$ 1.500; los collares alcanzan los US$ 150.000 en el modelo Rhino.',
        detail:
          'Cada anillo se diseña para un solo cliente, por lo que el precio de una pieza a medida siempre se confirma por escrito antes de cualquier depósito, nunca según una lista fija.',
        link: { to: '/emperor-rings', label: 'Ver la colección Emperor' },
      },
      {
        id: 'quanto-tempo-leva-para-fazer',
        q: '¿Cuánto tiempo lleva hacer un anillo de oro artesanal?',
        a: 'Una pieza se fabrica bajo pedido en 60 días a partir del primer pago del 50%, y de 90 a 140 horas de ese tiempo corresponden únicamente al grabado a mano, tallado en el metal macizo con buriles de acero templado.',
        detail:
          '¿Deseas planificar para una fecha específica? Infórmalo al atelier en la consulta, antes de fundir el oro, y el cronograma se adaptará a ella.',
        link: { to: '/luxury-rings-guide', label: 'Leer la guía de compra' },
      },
      {
        id: 'anel-feito-a-mao-ou-pronto',
        q: '¿Es realmente hecho a mano o es una réplica fundida?',
        a: 'Es 1/1, pieza única: la matriz de cera original se destruye tras la fundición, por lo que nunca se podrá fabricar un molde ni una réplica de tu anillo. No hay existencias ni segunda copia.',
        detail:
          'El grabado se talla directamente en el oro macizo de 18k, nunca por láser ni máquina, y cada pieza sale con el contraste maestro micrograbado en el metal, un folio de archivo y certificado de autenticidad.',
        link: { to: '/jorge-uquillas', label: 'Conoce a Jorge Uquillas' },
      },
      {
        id: 'diamante-real-ou-falso',
        q: '¿Son verdaderos los diamantes y cómo puedo saberlo?',
        a: 'Cada piedra es un diamante natural seleccionado a mano, elegido por su brillo y claridad, pesado y engastado uno a uno bajo el microscopio. No se utilizan piedras creadas en laboratorio.',
        detail:
          'Siete pruebas diferencian un diamante natural de una imitación, desde la prueba del vaho hasta el brillo UV y el medidor de diamantes: consulta la guía completa.',
        link: { to: '/blog/how-to-tell-if-your-diamonds-are-real-or-fake', label: 'Las 7 pruebas explicadas' },
      },
      {
        id: 'envio-seguro-internacional',
        q: '¿Hacen envíos internacionales y están asegurados?',
        a: 'Sí, a clientes en más de 50 países. Cada encargo viaja puerta a puerta con seguro a todo riesgo por el valor declarado, rastreado y con firma obligatoria, en un estuche de madera barnizado a mano dentro de un embalaje exterior discreto.',
        detail: 'El envío está incluido en encargos superiores a US$ 5.000.',
        link: { to: '/shipping', label: 'Envíos y seguros' },
      },
      {
        id: 'garantia-e-pos-venda',
        q: '¿Qué sucede después de que llega la pieza?',
        a: 'Una garantía de por vida cubre defectos de fabricación en el metal, el grabado a mano y el engaste, e incluye un pulido a mano por año con cita previa.',
        detail:
          'Nunca pula mecánicamente un anillo grabado a mano: el pulido agresivo redondea los bordes clásicos nítidos que el grabador creó. Por eso el pulido se realiza en el atelier, a mano.',
        link: { to: '/warranty', label: 'Leer la garantía' },
      },
    ],
  },
  pt: {
    title: 'O que os clientes perguntam antes de encomendar',
    subtitle: 'Respostas diretas, com os números reais do atelier: preço, prazo, método, envio e garantia.',
    updatedBadge: `Preços atualizados em ${PAGE_UPDATED} · pureza do metal segundo ISO 8653 · pedras classificadas pelo GIA`,
    inShortTitle: 'Em resumo',
    inShortText1:
      'A RINGS LUXURY cria anéis 1/1 em ouro 18k feitos à mão, fundidos em metal maciço e gravados à mão durante 90 a 140 horas, com diamantes naturais selecionados e cravados um a um. Começam em US$ 4.800, levam 60 dias a partir do sinal de 50%, viajam com seguro porta a porta para todo o mundo e contam com garantia vitalícia.',
    inShortText2: 'O próximo passo é uma consulta privada em São Paulo ou Miami, ou por vídeo de qualquer lugar do mundo.',
    writtenBy: 'Escrito por',
    role: ', mestre ourives e gravador artístico, fundador da RINGS LUXURY.',
    questions: [
      {
        id: 'quanto-custa-anel-ouro-18k',
        q: 'Quanto custa um anel de ouro 18k feito à mão?',
        a: 'Um anel de diamantes em ouro 18k feito à mão por Jorge Uquillas começa em US$ 4.800, e a coleção Emperor varia entre US$ 4.800 e US$ 28.000. Anéis mistos de ouro e prata começam em US$ 3.500 e anéis de prata 925 em US$ 1.500; colares chegam a US$ 150.000 no modelo Rhino.',
        detail:
          'Cada anel é desenhado para um único cliente, então o preço de uma peça sob medida é sempre confirmado por escrito antes de qualquer entrada, nunca cotado de uma tabela.',
        link: { to: '/emperor-rings', label: 'Ver a coleção Emperor' },
      },
      {
        id: 'quanto-tempo-leva-para-fazer',
        q: 'Quanto tempo leva para fazer um anel de ouro artesanal?',
        a: 'Uma peça é feita sob encomenda em 60 dias a partir do primeiro pagamento de 50%, sendo que 90 a 140 horas disso é apenas gravação à mão, esculpida no metal maciço com buris de aço temperado.',
        detail:
          'Deseja planejar uma data especial? Informe ao atelier na consulta, antes da fundição do ouro, e o cronograma será planejado em torno dela.',
        link: { to: '/luxury-rings-guide', label: 'Ler o guia de compras' },
      },
      {
        id: 'anel-feito-a-mao-ou-pronto',
        q: 'É realmente feito à mão ou é uma réplica fundida?',
        a: 'É 1/1, peça única: a matriz original de cera é destruída após a fundição, portanto nenhum molde ou réplica do seu anel poderá ser feito. Não há estoque nem segunda cópia.',
        detail:
          'A gravação é feita diretamente no ouro 18k maciço, nunca por laser ou máquina, e cada peça sai com o carimbo do mestre microgravado no metal, um fólio de arquivo e certificado de autenticidade.',
        link: { to: '/jorge-uquillas', label: 'Conheça Jorge Uquillas' },
      },
      {
        id: 'diamante-real-ou-falso',
        q: 'Os diamantes são verdadeiros e como posso saber?',
        a: 'Cada pedra é um diamante natural selecionado à mão, escolhido pelo brilho e pureza, pesado e cravado um a um sob microscópio. Nenhuma pedra criada em laboratório é usada.',
        detail:
          'Sete testes separam um diamante natural de uma imitação, do teste de embaçamento ao brilho UV e ao testador de diamantes: veja o guia completo.',
        link: { to: '/blog/how-to-tell-if-your-diamonds-are-real-or-fake', label: 'Os 7 testes explicados' },
      },
      {
        id: 'envio-seguro-internacional',
        q: 'Vocês enviam internacionalmente e com seguro?',
        a: 'Sim, para clientes em mais de 50 países. Cada encomenda viaja de porta em porta com seguro total pelo valor declarado, rastreada e com assinatura obrigatória, em estojo de madeira trabalhada e envernizada à mão dentro de embalagem externa discreta.',
        detail: 'O frete está incluso em encomendas acima de US$ 5.000.',
        link: { to: '/shipping', label: 'Envios e seguro' },
      },
      {
        id: 'garantia-e-pos-venda',
        q: 'O que acontece depois que a peça chega?',
        a: 'Uma garantia vitalícia cobre defeitos de fabricação no metal, na gravação à mão e na cravação, e inclui um polimento manual por ano com agendamento.',
        detail:
          'Nunca faça polimento mecânico agressivo em um anel gravado à mão: ele arredonda as bordas clássicas criadas pelo mestre gravador. Por isso o polimento é feito no atelier, à mão.',
        link: { to: '/warranty', label: 'Leia a garantia' },
      },
    ],
  },
};

export function HomeDirectAnswers() {
  const { lang } = useLanguage();
  const [openId, setOpenId] = useState<string | null>(null);

  const currentFaq = FAQ_DATA[lang] || FAQ_DATA.en;

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      aria-labelledby="respostas-diretas"
      className="relative py-24 md:py-32 px-6 bg-[#020202]"
    >
      {/* FAQPage Schema para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            ...(HAS_SITE_URL ? { '@id': `${absoluteUrl('/')}#faq` } : {}),
            dateModified: PAGE_UPDATED,
            author: HAS_SITE_URL
              ? { '@id': `${absoluteUrl('/jorge-uquillas')}#jorge` }
              : { '@type': 'Person', name: 'Jorge Uquillas' },
            publisher: HAS_SITE_URL ? { '@id': `${absoluteUrl('/')}#organization` } : undefined,
            mainEntity: currentFaq.questions.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.detail ? `${f.a} ${f.detail}` : f.a },
            })),
          }),
        }}
      />

      <div className="max-w-3xl mx-auto">
        <h2
          id="respostas-diretas"
          className="font-cinzel text-3xl md:text-4xl text-[#E6CA85] tracking-wide text-center mb-4"
        >
          {currentFaq.title}
        </h2>
        <p className="font-cormorant text-xl text-[#A8A296] text-center leading-relaxed mb-3">
          {currentFaq.subtitle}
        </p>
        <p className="text-[10px] uppercase tracking-[0.28em] text-[#9A7B38] text-center mb-12">
          {currentFaq.updatedBadge}
        </p>

        {/* ── FAQ ACCORDION (Clique para revelar a resposta) ── */}
        <div className="space-y-3.5">
          {currentFaq.questions.map((f) => {
            const isOpen = openId === f.id;

            return (
              <div
                key={f.id}
                id={f.id}
                className={`scroll-mt-28 rounded-xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-[#C5A059]/70 bg-[#070707] shadow-[0_4px_24px_rgba(197,160,89,0.12)]'
                    : 'border-[#C5A059]/25 bg-[#050505]/60 hover:border-[#C5A059]/50'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(f.id)}
                  aria-expanded={isOpen}
                  className="w-full py-5 px-6 flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none"
                >
                  <span
                    className={`font-cinzel text-base md:text-lg leading-snug transition-colors ${
                      isOpen ? 'text-[#E6CA85]' : 'text-[#F3EFE6] hover:text-[#E6CA85]'
                    }`}
                  >
                    {f.q}
                  </span>
                  <span
                    className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? 'border-[#C5A059] bg-[#C5A059]/20 text-[#E6CA85] rotate-180'
                        : 'border-[#C5A059]/30 text-[#C5A059] rotate-0'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-[#A8A296] font-cormorant text-lg leading-relaxed border-t border-[#C5A059]/15 animate-in fade-in duration-300">
                    <p className="text-[#EDE8DB]">{f.a}</p>
                    {f.detail && <p className="mt-2 text-[#C2BDB2]">{f.detail}</p>}
                    {f.link && (
                      <Link
                        to={f.link.to}
                        className="inline-block mt-3 text-[10px] uppercase tracking-[0.2em] text-[#C5A059] hover:text-[#E6CA85] transition-colors"
                      >
                        {f.link.label} →
                      </Link>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Resumo de fechamento */}
        <div className="mt-14 border border-[#C5A059]/25 bg-[#050505]/50 p-7 md:p-9 rounded-2xl">
          <h3 className="font-cinzel text-sm uppercase tracking-[0.24em] text-[#C5A059] mb-4">
            {currentFaq.inShortTitle}
          </h3>
          <p className="font-cormorant text-lg leading-relaxed text-[#D8D2C4]">
            {currentFaq.inShortText1}
          </p>
          <p className="font-cormorant text-lg leading-relaxed text-[#A8A296] mt-3">
            {currentFaq.inShortText2}
          </p>
        </div>

        {/* Assinatura */}
        <p className="font-cormorant text-lg text-[#D8D2C4] text-center mt-12">
          {currentFaq.writtenBy} <span className="text-[#C5A059]">Jorge Uquillas</span>
          {currentFaq.role}
        </p>
      </div>
    </section>
  );
}

export default HomeDirectAnswers;