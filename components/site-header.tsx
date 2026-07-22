'use client'

import { Search, ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import type { Category } from '@/lib/products'

const NAV_LINKS: { label: string; category: Category | 'Ofertas' }[] = [
  { label: 'Dama', category: 'Dama' },
  { label: 'Caballero', category: 'Caballero' },
  { label: 'Niños', category: 'Urbano' },
  { label: 'Ofertas', category: 'Ofertas' },
]

interface SiteHeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  onNavigate: (category: Category | 'Ofertas') => void
}

export function SiteHeader({ searchQuery, onSearchChange, onNavigate }: SiteHeaderProps) {
  const { itemCount, openDrawer } = useCart()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-secondary text-secondary-foreground">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 lg:px-8">
        <a href="#" className="flex shrink-0 items-baseline gap-1.5" aria-label="PASO FIRME - Inicio">
          <span className="text-lg font-black tracking-tight text-secondary-foreground">
            PASO<span className="text-primary">FIRME</span>
          </span>
          <span className="hidden text-[10px] font-medium uppercase tracking-widest text-secondary-foreground/60 sm:inline">
            Calzado &amp; Style
          </span>
        </a>

        <div className="relative mx-auto hidden w-full max-w-sm md:block">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-secondary-foreground/50"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar tenis, botas, zapatos..."
            className="w-full rounded-full border border-secondary-foreground/15 bg-secondary-foreground/10 py-2 pl-9 pr-4 text-sm text-secondary-foreground placeholder:text-secondary-foreground/50 focus:border-primary focus:outline-none"
            aria-label="Buscar productos"
          />
        </div>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Categorías">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => onNavigate(link.category)}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                link.label === 'Ofertas' ? 'text-primary' : 'text-secondary-foreground/80'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          onClick={openDrawer}
          className="relative ml-auto rounded-full p-2 transition-colors hover:bg-secondary-foreground/10 lg:ml-0"
          aria-label={`Abrir carrito, ${itemCount} artículos`}
        >
          <ShoppingBag className="size-5" aria-hidden="true" />
          {itemCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {itemCount}
            </span>
          )}
        </button>
      </div>

      <div className="border-t border-secondary-foreground/10 px-4 pb-3 pt-2 md:hidden">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-secondary-foreground/50"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar calzado..."
            className="w-full rounded-full border border-secondary-foreground/15 bg-secondary-foreground/10 py-2 pl-9 pr-4 text-sm text-secondary-foreground placeholder:text-secondary-foreground/50 focus:border-primary focus:outline-none"
            aria-label="Buscar productos"
          />
        </div>
      </div>
    </header>
  )
}
