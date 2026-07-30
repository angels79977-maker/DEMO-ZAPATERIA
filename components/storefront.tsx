'use client'

import { useState } from 'react'
import { CartProvider } from '@/lib/cart-context'
import type { Category } from '@/lib/products'
import { CartDrawer } from './cart-drawer'
import { Hero } from './hero'
import { ProductCatalog } from './product-catalog'
import { SiteHeader } from './site-header'

export function Storefront() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeNavCategory, setActiveNavCategory] = useState<Category | 'Sale' | null>(null)

  const scrollToCatalog = () => {
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleNavigate = (category: Category | 'Sale') => {
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
        <div className="mx-auto max-w-7xl px-4 pt-6 lg:px-8">
          <a href="#catalog" className="block relative overflow-hidden rounded-2xl">
            <img
              src="/images/promo-shoes.png"
              alt="Special offers on SHOP SHOES footwear"
              className="h-auto w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <span className="rounded-full bg-primary px-6 py-3 text-lg font-black text-primary-foreground shadow-lg">
                SPECIAL OFFERS
              </span>
            </div>
          </a>
        </div>
        {activeNavCategory && (
          <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 pt-6 lg:px-8">
            <span className="rounded-full bg-accent px-4 py-1.5 text-sm font-bold text-accent-foreground">
              {activeNavCategory === 'Sale' ? 'Sale Only' : activeNavCategory}
            </span>
            <button
              type="button"
              onClick={() => setActiveNavCategory(null)}
              className="text-sm font-medium text-primary underline-offset-2 hover:underline"
            >
              View All
            </button>
          </div>
        )}
        <ProductCatalog searchQuery={searchQuery} activeNavCategory={activeNavCategory} />
      </main>

      <footer className="border-t border-border bg-secondary py-8 text-secondary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 text-center lg:px-8">
          <p className="text-lg font-black tracking-tight">
            SHOP SHOES
          </p>
          <p className="text-xs text-secondary-foreground/60">
             Shoes &amp; Style · Shipping all over United States of America · Demo prototype
          </p>
        </div>
      </footer>

      <CartDrawer />
    </CartProvider>
  )
}
