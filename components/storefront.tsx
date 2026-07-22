'use client'

import { useState } from 'react'
import { CartProvider } from '@/lib/cart-context'
import type { Category } from '@/lib/products'
import { CartDrawer } from './cart-drawer'
import { Hero } from './hero'
import { ProductCatalog } from './product-catalog'
import { SiteHeader } from './site-header'
import { WhatsAppButton } from './whatsapp-button'

export function Storefront() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeNavCategory, setActiveNavCategory] = useState<Category | 'Ofertas' | null>(null)

  const scrollToCatalog = () => {
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleNavigate = (category: Category | 'Ofertas') => {
    setActiveNavCategory((prev) => (prev === category ? null : category))
    scrollToCatalog()
  }

  return (
    <CartProvider>
      <SiteHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNavigate={handleNavigate}
      />
      <main>
        <Hero
          onCtaClick={() => {
            setActiveNavCategory(null)
            scrollToCatalog()
          }}
        />
        {activeNavCategory && (
          <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 pt-6 lg:px-8">
            <span className="rounded-full bg-accent px-4 py-1.5 text-sm font-bold text-accent-foreground">
              {activeNavCategory === 'Ofertas' ? 'Solo Ofertas' : activeNavCategory}
            </span>
            <button
              type="button"
              onClick={() => setActiveNavCategory(null)}
              className="text-sm font-medium text-primary underline-offset-2 hover:underline"
            >
              Ver todo
            </button>
          </div>
        )}
        <ProductCatalog searchQuery={searchQuery} activeNavCategory={activeNavCategory} />
      </main>

      <footer className="border-t border-border bg-secondary py-8 text-secondary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 text-center lg:px-8">
          <p className="text-lg font-black tracking-tight">
            PASO<span className="text-primary">FIRME</span>
          </p>
          <p className="text-xs text-secondary-foreground/60">
            {'Calzado & Style · Envíos a todo México · Prototipo de demostración'}
          </p>
        </div>
      </footer>

      <CartDrawer />
      <WhatsAppButton />
    </CartProvider>
  )
}
