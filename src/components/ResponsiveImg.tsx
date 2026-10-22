import React from 'react';
import manifestJson from '../data/image-variants.json';

/**
 * Imagem responsiva com <picture>, guiada por um manifesto gerado no build.
 *
 * POR QUE NAO ADIVINHAR O NOME DO ARQUIVO
 * As variantes so existem quando o otimizador gerou: abaixo de 120 KB nada e
 * criado, e nunca e criada largura maior que a original. Deduzir a URL no
 * componente produziria <source> apontando para arquivo inexistente — e o
 * navegador NAO volta para o <img> quando o <source> falha: imagem quebrada,
 * sem aviso. O manifesto e lido do disco real, entao o que esta nele existe.
 *
 * Sem entrada no manifesto, cai no <img> simples. Esse e o comportamento padrao
 * e seguro, nao um erro.
 *
 * Manifesto: scripts/build-image-manifest.mjs (roda no build)
 */
type Variant = { w: number; file: string };
type Entry = { webp?: Variant[]; avif?: Variant[] };

const MANIFEST = manifestJson as Record<string, Entry>;

/**
 * Normaliza o `src` para a chave do manifesto.
 *
 * `/PUBLIC/Fotos%20para%20Post/x.jpg` -> `PUBLIC/Fotos para Post/x`
 *
 * Duas operacoes, ambas necessarias:
 * 1. tira a barra inicial, porque o manifesto e relativo a public/;
 * 2. tira a EXTENSAO, porque o manifesto indexa pelo nome-base: o otimizador
 *    gera `x-800.webp` a partir de `x.jpg`, `x.png` OU `x.webp`, entao a
 *    mesma peca aparece com tres extensoes diferentes e so o nome-base identifica
 *    quais variantes existem.
 */
const normalize = (src: string): string => {
  const noLeading = src.replace(/^\/+/, '');
  let decoded: string;
  try {
    decoded = decodeURIComponent(noLeading);
  } catch {
    decoded = noLeading;
  }
  return decoded.replace(/\.(jpe?g|png|webp|avif)$/i, '');
};

/** `PUBLIC/a-800.webp 800w, PUBLIC/a-1242.webp 1242w` */
const toSrcSet = (variants: Variant[]): string =>
  variants.map((v) => `/${v.file} ${v.w}w`).join(', ');

export interface ResponsiveImgProps {
  /** Caminho do ORIGINAL dentro de public/, ex: `/PUBLIC/anel.webp`. */
  src: string;
  alt: string;
  width?: number;
  height?: number;
  /** widths/100vw para o navegador escolher a menor variante adequada. */
  sizes?: string;
  className?: string;
  style?: React.CSSProperties;
  draggable?: boolean;
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  /** true = acima da dobra / elemento LCP. */
  priority?: boolean;
  /** Imagem decorativa: sem alt, fora do indice e fora da leitura. */
  decorative?: boolean;
}

export function ResponsiveImg({
  src,
  alt,
  width,
  height,
  sizes,
  className,
  style,
  draggable = false,
  onError,
  priority = false,
  decorative = false,
}: ResponsiveImgProps) {
  const entry = MANIFEST[normalize(src)];

  const imgProps = {
    src,
    alt: decorative ? '' : alt,
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
    className,
    style,
    draggable,
    onError,
    // No LCP, decode síncrono garante que a imagem esteja pronta no primeiro
    // paint em vez de aparecer depois da decodificação assíncrona.
    decoding: (priority ? 'sync' : 'async') as 'sync' | 'async',
    // Imagem acima da dobra nao entra em lazy: lazy atrasa o LCP.
    loading: (priority ? 'eager' : 'lazy') as 'eager' | 'lazy',
    fetchPriority: priority ? ('high' as const) : ('low' as const),
    ...(decorative ? { 'aria-hidden': true } : {}),
  };

  if (!entry) return <img {...imgProps} />;

  const sources = [
    ...(entry.avif?.length
      ? [{ type: 'image/avif', srcSet: toSrcSet(entry.avif), widths: entry.avif.map((v) => v.w) }]
      : []),
    ...(entry.webp?.length
      ? [{ type: 'image/webp', srcSet: toSrcSet(entry.webp), widths: entry.webp.map((v) => v.w) }]
      : []),
  ];

  // `sizes` so e valido junto de srcset. Sem ele, omite-se o atributo em vez de
  // mandar o navegador assumir 100vw e baixar sempre a maior variante.
  const defaultSizes = sources[0]
    ? `(max-width: 640px) 92vw, ${sources[0].widths[0]}px`
    : undefined;

  return (
    <picture>
      {sources.map((s) => (
        <source key={s.type} type={s.type} srcSet={s.srcSet} sizes={sizes ?? defaultSizes} />
      ))}
      <img {...imgProps} />
    </picture>
  );
}

export default ResponsiveImg;