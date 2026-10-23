import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { GreekKeyBorder } from './OrnamentIcons';
import { useLanguage } from '../i18n/LanguageContext';
import contact from '../data/contact.json';
import locationsData from '../data/locations.json';

/**
 * Rodapé, principal bloco de entity signal do site.
 *
 * Decisões de SEO aqui:
 * - Links para PÁGINAS reais via react-router (`/luxury-rings`, `/blog`, ...).
 *   A versao anterior so tinha ancoras `#hash` da propria home, que nao
 *   transmitem nada para as 12 paginas de produto e os 6 posts.
 * - NAP completo e clicavel: `tel:` e `mailto:`. Telefone e o sinal mais forte
 * de SEO local e hoje nao existia em lugar nenhum do projeto.
 * - `sameAs` e schema vem de src/data/contact.json e src/data/locations.json,
 *   que o plugin de build tambem leem. Uma fonte, zero divergencia.
 * - Enderecos de cidades que nao sao atelier foram REMOVIDOS. Eram
 *   placeholders ficticios e brigavam com as localacoes reais (Miami, Sao
 *   Paulo), o que destoi qualquer sinal de NAP. Nao volte a declara-los sem
 *   um endereco real.
 */
const COLLECTIONS_ROUTES = [
  { to: '/luxury-rings', key: 'colLuxuryRings' },
  { to: '/emperor-rings', key: 'colEmperorRings' },
  { to: '/gold-silver-rings', key: 'colGoldSilver' },
  { to: '/special-editions', key: 'colSpecialEditions' },
  { to: '/necklaces', key: 'colNecklaces' },
  { to: '/luxuryqueens', key: 'colLuxuryQueens' },
] as const;

const ATELIER_ROUTES = [
  { to: '/jorge-uquillas', key: 'atelierAbout' },
  { to: '/gallery', key: 'atelierGallery' },
  { to: '/blog', key: 'atelierJournal' },
  { to: '/courses', key: 'atelierCourses' },
  { to: '/faq', key: 'atelierFaq' },
] as const;

/** Politicas: o sinal de confianca nº1 de auditoria de e-commerce. */
const POLICY_ROUTES = [
  { to: '/shipping', label: 'Shipping and Insurance' },
  { to: '/returns', label: 'Returns and Custom Work' },
  { to: '/warranty', label: 'Lifetime Warranty' },
  { to: '/terms', label: 'Terms of Sale' },
  { to: '/privacy', label: 'Privacy Policy' },
] as const;

/**
 * Redes sociais derivadas de contact.sameAs.
 *
 * `short` e o texto visivel do botao; `icon` vai em sr-only, porque um icone de
 * rede social nao tem nome acessivel proprio e o botao precisa dizer qual
 * plataforma e. O perfil do Google nao aparece como botao (e um link curto de
 * compartilhamento, nao um perfil navegavel), mas continua no sameAs do schema.
 */
const SOCIAL_LINKS = (contact.sameAs ?? [])
  .filter((url) => /instagram|youtube|facebook|tiktok|linkedin/i.test(url))
  .map((url) => {
    const label = /instagram/i.test(url)
      ? 'Instagram'
      : /youtube/i.test(url)
        ? 'YouTube'
        : /facebook/i.test(url)
          ? 'Facebook'
          : /tiktok/i.test(url)
            ? 'TikTok'
            : 'LinkedIn';
    return { href: url, label, short: label };
  });

export function Footer() {
  const { t, lang } = useLanguage();

  const COLLECTIONS = COLLECTIONS_ROUTES.map((c) => ({
    to: c.to,
    label: t.footer[c.key],
  }));

  const ATELIER = ATELIER_ROUTES.map((a) => ({
    to: a.to,
    label: t.footer[a.key],
  }));
  return (
    <footer
      id="main-footer"
      className="relative w-full bg-black text-[#EAE6DF] pt-24 pb-16 overflow-hidden border-t border-[#C5A059]/30"
      itemScope
      itemType="https://schema.org/Organization"
    >
      {/* Sem textura, preto puro */}
      {/* Imagem de fundo do rodapé, 30% de opacidade */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <img
          src="/PUBLIC/fundo-do-rodape-rings-luxury-jorge-uquillas-aneis-feitos-a-mao.webp"
          alt=""
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-[0.12] select-none"
          onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
        />
      </div>

      {/* Degradê preto forte no final, letras ficam por cima */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/85 to-transparent pointer-events-none" aria-hidden />

      {/* Monumental Greek Key Border Header */}
      <div className="w-full mb-16 opacity-40">
        <GreekKeyBorder className="w-full h-3" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-[#C5A059]/20">
          {/* Brand */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <img
                src="/PUBLIC/logo-novo-rings-luxury.webp"
                alt="RINGS LUXURY by Jorge Uquillas"
                className="w-auto h-14 md:h-16 object-contain select-none shrink-0"
                draggable={false}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('logo-novo-rings-luxury.webp')) {
                    target.src = '/PUBLIC/logo-original.webp';
                  } else if (!target.src.includes('logo.svg')) {
                    target.src = '/logo.svg';
                  }
                }}
              />
              <div className="flex flex-col">
                <span
                  className="font-cinzel text-xl md:text-2xl font-medium tracking-[0.3em] text-[#F3EFE6]"
                  itemProp="name"
                >
                  RINGS LUXURY
                </span>
                <span
                  className="text-[9px] uppercase tracking-[0.4em] text-[#9A7B38]"
                  itemProp="slogan"
                >
                  Jorge Uquillas • HandCrafted 18k
                </span>
              </div>
            </div>

            <p className="font-cormorant text-base md:text-lg italic text-[#C2BDB2] max-w-sm leading-relaxed">
              {t.footer.brandParagraph}
            </p>

            <div className="flex items-center gap-4 text-[10px] tracking-[0.25em] text-[#9A7B38] uppercase">
              <span>São Paulo</span>
              <span aria-hidden>•</span>
              <span>Miami</span>
            </div>

            {/*
                Redes sociais. Os botoes sao gerados a partir de contact.sameAs,
                que e a MESMA lista que vai no JSON-LD: um perfil novo entra nos
                dois lugares de uma vez, sem risco de o botao existir e o schema
                nao declarar (ou o contrario).
              */}
            <ul className="flex flex-wrap items-center gap-3">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Rings Luxury on ${s.label}`}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-[#C5A059]/40 hover:border-[#C5A059] text-[#C5A059] hover:text-[#E6CA85] hover:bg-[#C5A059]/10 rounded-full font-sans-luxury text-[11px] font-medium tracking-[0.2em] uppercase transition-all"
                  >
                    <span>{s.short}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coleções, links reais, não âncoras */}
          <nav className="md:col-span-3 space-y-4" aria-label="Collections">
            <h2 className="font-cinzel text-[11px] tracking-[0.35em] uppercase text-[#C5A059]">
              {t.footer.collectionsHeading}
            </h2>
            <ul className="space-y-2.5 text-[11px] font-sans-luxury tracking-[0.2em] uppercase text-[#A8A296]">
              {COLLECTIONS.map((c) => (
                <li key={c.to}>
                  <Link to={c.to} className="hover:text-[#C5A059] transition-colors">
                    {c.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/collections" className="hover:text-[#C5A059] transition-colors">
                  {lang === 'es' ? 'TODAS LAS PIEZAS' : lang === 'pt' ? 'TODAS AS PEÇAS' : 'ALL PIECES'}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Ateliê */}
          <nav className="md:col-span-2 space-y-4" aria-label="Atelier">
            <h2 className="font-cinzel text-[11px] tracking-[0.35em] uppercase text-[#C5A059]">
              {t.footer.atelierHeading}
            </h2>
            <ul className="space-y-2.5 text-[11px] font-sans-luxury tracking-[0.2em] uppercase text-[#A8A296]">
              {ATELIER.map((a) => (
                <li key={a.to}>
                  <Link to={a.to} className="hover:text-[#C5A059] transition-colors">
                    {a.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contato, NAP */}
          <div className="md:col-span-3 space-y-4">
            <h2 className="font-cinzel text-[11px] tracking-[0.35em] uppercase text-[#C5A059]">
              {t.footer.privateSalonHeading}
            </h2>

            <ul className="space-y-3 text-xs text-[#A8A296] font-sans-luxury leading-relaxed">
              <li>
                <a
                  href={`tel:${contact.phone}`}
                  className="inline-flex items-center gap-2 hover:text-[#C5A059] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C5A059] shrink-0" aria-hidden />
                  {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-2 hover:text-[#C5A059] transition-colors break-all"
                >
                  <Mail className="w-3.5 h-3.5 text-[#C5A059] shrink-0" aria-hidden />
                  {contact.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#C5A059] shrink-0" aria-hidden />
                <span>
                  {contact.hours.display}
                  <br />
                  {contact.hours.displayDays}
                </span>
              </li>
            </ul>

            <ul className="pt-2 space-y-2 text-xs text-[#A8A296] font-sans-luxury leading-relaxed">
              {locationsData.locations.map((loc) => (
                <li key={loc.id} className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" aria-hidden />
                  <span>
                    <strong className="text-[#F3EFE6] font-cinzel">{loc.city}</strong>
                    {loc.district ? `, ${loc.district}` : ''}
                    <br />
                    <span className="text-[#9A7B38]">{t.footer.visitsScheduled}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-12 flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 order-last md:order-first">
            {POLICY_ROUTES.map((p) => (
              <li key={p.to}>
                <Link
                  to={p.to}
                  className="text-[10px] tracking-[0.2em] uppercase text-[#A8A296] hover:text-[#C5A059] transition-colors"
                >
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="text-[10px] tracking-[0.3em] uppercase text-[#9A7B38]">
            {t.footer.bottomRights}
          </div>

          <div className="font-cinzel text-[10px] font-semibold tracking-[0.28em] uppercase text-[#C5A059] text-center">
            {t.footer.bottomTagline}
          </div>

          <div className="text-[10px] tracking-[0.3em] uppercase text-[#9A7B38]">
            {t.footer.handmadeInBrazil}
          </div>
        </div>

        {/* Crédito de criação, dois links: autor e empresa */}
        <div className="pt-8 flex justify-center">
          <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.28em] text-[#9A7B38] text-center">
            {t.footer.creditPrefix}{' '}
            <a
              href={contact.credit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F3EFE6] hover:text-[#C5A059] transition-colors"
            >
              {contact.credit.name}
            </a>
            , {t.footer.creditRole} {t.footer.creditFromWord}{' '}
            <a
              href={contact.credit.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F3EFE6] hover:text-[#C5A059] transition-colors"
            >
              {t.footer.creditFrom}
            </a>
          </p>
        </div>
      </div>

      {/* Sub Greek Key Border at Very Bottom */}
      <div className="w-full mt-12 opacity-30">
        <GreekKeyBorder className="w-full h-3" />
      </div>
    </footer>
  );
}

export default Footer;
