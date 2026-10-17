import React from 'react';

/**
 * Imagem de produto/joia com carregamento otimizado.
 *
 * POR QUE EXISTE
 * A imagem principal do produto e o elemento LCP (Largest Contentful Paint) de
 * /produto/:slug, ou seja, o que trava a velocidade de exibição da pagina. Sem
 * `fetchpriority="high"`, o navegador nao a prioriza e ela perde a corrida para
 * o logo e para o CSS. Sem `width`/`height`, o layout salta enquanto a imagem
 * carrega (CLS, que derruba o Core Web Vitals). Sem `decoding="async"`, a
 * decodificacao bloqueia a renderizacao.
 *
 * USO BASICO (so atributos de performance, nenhuma requisicao nova):
 *   <LuxuryImage src={img} alt={alt} width={1400} height={1400} priority />
 *
 * USO COM VARIANTES (apos rodar o otimizador de imagens):
 *   <LuxuryImage
 *     src="/PUBLIC/anel.webp"
 *     alt={alt}
 *     width={1400} height={1400}
 *     priority
 *     sources={[
 *       { type: 'image/avif', srcSet: '/PUBLIC/anel-800.avif 800w, /PUBLIC/anel-1400.avif 1400w' },
 *       { type: 'image/webp', srcSet: '/PUBLIC/anel-800.webp 800w, /PUBLIC/anel-1400.webp 1400w' },
 *     ]}
 *     srcSet="/PUBLIC/anel-800.webp 800w, /PUBLIC/anel-1400.webp 1400w"
 *     sizes="(max-width: 1024px) 92vw, 560px"
 *   />
 *
 * IMPORTANTE: `sources`/`srcSet` so devem apontar para arquivos que EXISTAM.
 * Um <source> para arquivo inexistente nao cai no <img> de fallback: o navegador
 * escolhe o primeiro <source> que ele consegue parsear e o resultado e 404 com
 * imagem quebrada. Por isso o componente so emite <picture> quando `sources` e
 * informado explicitamente.
 */
export interface LuxuryImageProps {
  src: string;
  alt: string;
  /** Dimensoes intrinsecas, obrigatorias para evitar CLS. */
  width?: number;
  height?: number;
  /** `sizes` junto com `srcSet`, para o navegador escolher a menor suited. */
  sizes?: string;
  srcSet?: string;
  /** <source> ordenados por preferencia: AVIF antes de WebP. */
  sources?: Array<{ type: string; srcSet: string }>;
  className?: string;
  draggable?: boolean;
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  style?: React.CSSProperties;
  /** true = acima da dobra / LCP. Carrega com prioridade maxima. */
  priority?: boolean;
  /** Imagem decorativa: nao entra no indice e nao e lida por leitor de tela. */
  decorative?: boolean;
}

export function LuxuryImage({
  src,
  alt,
  width,
  height,
  sizes,
  srcSet,
  sources,
  className,
  draggable = false,
  onError,
  style,
  priority = false,
  decorative = false,
}: LuxuryImageProps) {
  // `fetchpriority` em React 19 e um atributo valido. Aversao antiga do React
  // usaria fetchPriority camelCase; o projeto roda em React 19, entao o
  // attributo em kebab e o correto.
  const imgProps = {
    src,
    alt: decorative ? '' : alt,
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
    ...(srcSet ? { srcSet } : {}),
    ...(sizes ? { sizes } : {}),
    className,
    draggable,
    onError,
    style,
    decoding: 'async' as const,
    // Imagem acima da dobra NUNCA entra em lazy: lazy atrasa o LCP. Imagem de
    // fundo decorativa entra em lazy e com prioridade baixa.
    loading: (priority ? 'eager' : 'lazy') as 'eager' | 'lazy',
    fetchPriority: priority ? ('high' as const) : ('low' as const),
    ...(decorative ? { 'aria-hidden': true } : {}),
  };

  if (!sources || sources.length === 0) {
    return <img {...imgProps} />;
  }

  return (
    <picture>
      {sources.map((s) => (
        <source key={s.type} type={s.type} srcSet={s.srcSet} {...(sizes ? { sizes } : {})} />
      ))}
      <img {...imgProps} />
    </picture>
  );
}

export default LuxuryImage;