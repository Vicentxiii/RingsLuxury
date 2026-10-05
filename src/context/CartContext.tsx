import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getProductBySlug, type Product } from '../data/products';

export interface CartLine {
  slug: string;
  qty: number;
}

export interface CartLineDetailed extends CartLine {
  product: Product;
}

interface CartValue {
  lines: CartLineDetailed[];
  count: number;
  subtotal: number;
  hasUponRequest: boolean;
  maxQtyFor: (slug: string) => number;
  add: (slug: string, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartValue | undefined>(undefined);

const STORAGE_KEY = 'rl-cart-v1';

/** Peças 1/1 são únicas: no máximo 1 unidade. Sob encomenda: até 9. */
export function maxQtyForSlug(slug: string): number {
  const p = getProductBySlug(slug);
  if (!p) return 1;
  return p.specs.edition.toLowerCase().includes('one of one') ? 1 : 9;
}

function load(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((l) => typeof l?.slug === 'string' && getProductBySlug(l.slug))
      .map((l) => ({
        slug: l.slug,
        qty: Math.min(Math.max(1, Math.floor(l.qty) || 1), maxQtyForSlug(l.slug)),
      }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => load());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines]);

  const value = useMemo<CartValue>(() => {
    const detailed: CartLineDetailed[] = lines.flatMap((l) => {
      const product = getProductBySlug(l.slug);
      return product ? [{ ...l, product }] : [];
    });
    const count = detailed.reduce((n, l) => n + l.qty, 0);
    const subtotal = detailed.reduce((n, l) => n + l.product.priceNumber * l.qty, 0);
    const hasUponRequest = detailed.some((l) => l.product.priceNumber <= 0);

    return {
      lines: detailed,
      count,
      subtotal,
      hasUponRequest,
      maxQtyFor: maxQtyForSlug,
      add: (slug, qty = 1) => {
        if (!getProductBySlug(slug)) return;
        setLines((prev) => {
          const found = prev.find((l) => l.slug === slug);
          const max = maxQtyForSlug(slug);
          if (found) {
            return prev.map((l) =>
              l.slug === slug ? { ...l, qty: Math.min(l.qty + qty, max) } : l,
            );
          }
          return [...prev, { slug, qty: Math.min(Math.max(1, qty), max) }];
        });
      },
      remove: (slug) => setLines((prev) => prev.filter((l) => l.slug !== slug)),
      setQty: (slug, qty) => {
        const max = maxQtyForSlug(slug);
        const safe = Math.min(Math.max(1, Math.floor(qty) || 1), max);
        setLines((prev) => prev.map((l) => (l.slug === slug ? { ...l, qty: safe } : l)));
      },
      clear: () => setLines([]),
    };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
