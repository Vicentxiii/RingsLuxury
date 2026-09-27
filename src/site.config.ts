/**
 * Domínio do site — fonte única.
 *
 * Vazio por padrão de propósito: enquanto o domínio não estiver registrado,
 * nenhum canonical, sitemap ou URL absoluta é publicado. Publicar um
 * canonical apontando para um domínio que não existe manda o Google
 * consolidar sinal em um endereço que não resolve.
 *
 * Defina em .env (ver .env.example):
 *   VITE_SITE_URL=https://seudominio.com
 */
const raw = (import.meta.env.VITE_SITE_URL ?? '').trim();

export const SITE_URL = raw.replace(/\/+$/, '');

export const HAS_SITE_URL = SITE_URL.length > 0;

/** Junta um caminho interno à origem do site. Retorna o caminho puro se não houver domínio. */
export const absoluteUrl = (route: string): string => {
  const path = route.startsWith('/') ? route : `/${route}`;
  return HAS_SITE_URL ? `${SITE_URL}${path}` : path;
};
