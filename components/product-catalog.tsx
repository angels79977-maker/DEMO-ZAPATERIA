'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { SlidersHorizontal, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { PRODUCTS, type Category } from '@/lib/products'
import { FiltersPanel, MAX_PRICE, type Filters } from './filters-panel'
import { ProductCard } from './product-card'

interface ProductCatalogProps {
  searchQuery: string
  activeNavCategory: Category | 'Ofertas' | null
}

export function ProductCatalog({ searchQuery, activeNavCategory }: ProductCatalogProps) {
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    sizes: [],
    maxPrice: MAX_PRICE,
  })
  const [drawerOpen, setDrawerOpen] = useState(false)

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        if (!p.name.toLowerCase().includes(q) && !p.brand.toLowerCase().includes(q)) return false
      }
      if (activeNavCategory === 'Ofertas') {
        if (!p.originalPrice) return false
      } else if (activeNavCategory && p.category !== activeNavCategory) {
        return false
      }
      if (filters.categories.length > 0 && !filters.categories.includes(p.category)) return false
      if (filters.sizes.length > 0 && !filters.sizes.some((s) => (p.stock[s] ?? 0) > 0))
        return false
      if (p.price > filters.maxPrice) return false
      return true
    })
  }, [searchQuery, activeNavCategory, filters])

  return (
    <section id="catalogo" className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight md:text-3xl">Catálogo</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? 'modelo' : 'modelos'} disponibles
          </p>
        </div>
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-semibold text-card-foreground transition-colors hover:border-primary lg:hidden"
        >
          <SlidersHorizontal className="size-4" aria-hidden="true" />
          Filtros
        </button>
      </div>

      <div className="mt-6 flex gap-8">
        <aside className="hidden w-56 shrink-0 lg:block" aria-label="Filtros de productos">
          <div className="sticky top-24 rounded-2xl border border-border bg-card p-5">
            <FiltersPanel filters={filters} onChange={setFilters} />
          </div>
        </aside>

        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border py-20 text-center">
              <p className="font-bold">Sin resultados</p>
              <p className="text-sm text-muted-foreground">
                Intenta ajustar los filtros o tu búsqueda.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filters drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-foreground/60"
              onClick={() => setDrawerOpen(false)}
              aria-label="Cerrar filtros"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Filtros"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="absolute inset-y-0 left-0 w-80 max-w-[85vw] overflow-y-auto bg-card p-6 text-card-foreground shadow-2xl"
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-bold">Filtros</h3>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted"
                  aria-label="Cerrar"
                >
                  <X className="size-5" aria-hidden="true" />
                </button>
              </div>
              <FiltersPanel filters={filters} onChange={setFilters} />
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="mt-6 w-full rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground"
              >
                Ver {filtered.length} resultados
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
