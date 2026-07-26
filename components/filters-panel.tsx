'use client'

import { formatMXN, SIZES, type Category, type Size } from '@/lib/products'

export interface Filters {
  categories: Category[]
  sizes: Size[]
  maxPrice: number
}

export const MAX_PRICE = 2500

const CATEGORIES: Category[] = ['Dama', 'Caballero', 'Urbano', 'Botas']

interface FiltersPanelProps {
  filters: Filters
  onChange: (filters: Filters) => void
}

export function FiltersPanel({ filters, onChange }: FiltersPanelProps) {
  const toggleCategory = (cat: Category) => {
    const categories = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat]
    onChange({ ...filters, categories })
  }

  const toggleSize = (size: Size) => {
    const sizes = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size]
    onChange({ ...filters, sizes })
  }

  return (
    <div className="flex flex-col gap-6">
      <fieldset>
        <legend className="mb-3 text-sm font-bold uppercase tracking-wide">Categoría</legend>
        <div className="flex flex-col gap-2">
          {CATEGORIES.map((cat) => (
            <label key={cat} className="flex cursor-pointer items-center gap-2.5 text-sm">
              <input
                type="checkbox"
                checked={filters.categories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="size-4 accent-primary"
              />
              {cat}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-sm font-bold uppercase tracking-wide">Talla MX</legend>
        <div className="flex flex-wrap gap-1.5">
          {SIZES.map((size) => {
            const active = filters.sizes.includes(size)
            return (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                aria-pressed={active}
                className={`min-w-10 rounded-lg border px-2.5 py-2 text-xs font-bold transition-colors ${
                  active
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-card-foreground hover:border-primary'
                }`}
              >
                {size}
              </button>
            )
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-sm font-bold uppercase tracking-wide">Precio máximo</legend>
        <input
          type="range"
          min={500}
          max={MAX_PRICE}
          step={50}
          value={filters.maxPrice}
          onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full accent-primary"
          aria-label="Precio máximo"
        />
        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
          <span>{formatMXN(500)}</span>
          <span className="font-bold text-foreground">{formatMXN(filters.maxPrice)}</span>
        </div>
      </fieldset>

      <button
        type="button"
        onClick={() => onChange({ categories: [], sizes: [], maxPrice: MAX_PRICE })}
        className="text-sm font-medium text-primary underline-offset-2 hover:underline"
      >
        Limpiar filtros
      </button>
    </div>
  )
}
