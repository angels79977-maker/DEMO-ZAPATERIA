'use client'

import { motion } from 'framer-motion'
import { CreditCard, Flame, Ruler, ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/lib/cart-context'
import { formatMXN, SIZES, type Product, type Size } from '@/lib/products'
import { SizeGuideModal } from './size-guide-modal'

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState<Size | null>(null)
  const [showError, setShowError] = useState(false)
  const [guideOpen, setGuideOpen] = useState(false)

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  const selectedStock = selectedSize != null ? (product.stock[selectedSize] ?? 0) : null

  const handleAddToCart = () => {
    if (selectedSize == null) {
      setShowError(true)
      return
    }
    setShowError(false)
    addItem(product, selectedSize)
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground transition-shadow hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image || '/placeholder.svg'}
          alt={`${product.name} de ${product.brand}`}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {discount && (
          <span className="absolute left-3 top-3 rounded-full bg-destructive px-2.5 py-1 text-xs font-bold text-primary-foreground">
            -{discount}%
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {product.brand}
          </p>
          <h3 className="mt-0.5 font-bold leading-snug">{product.name}</h3>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-lg font-black">{formatMXN(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatMXN(product.originalPrice)}
            </span>
          )}
        </div>

        {product.msi && (
          <span className="inline-flex w-fit items-center gap-1.5 rounded-md bg-accent px-2 py-1 text-[11px] font-semibold text-accent-foreground">
            <CreditCard className="size-3.5" aria-hidden="true" />3 Meses Sin Intereses
          </span>
        )}

        <div>
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-muted-foreground">Talla MX</p>
            <button
              type="button"
              onClick={() => setGuideOpen(true)}
              className="flex items-center gap-1 text-xs font-medium text-primary underline-offset-2 hover:underline"
            >
              <Ruler className="size-3.5" aria-hidden="true" />
              Guía de Tallas
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5" role="group" aria-label="Seleccionar talla">
            {SIZES.map((size) => {
              const available = (product.stock[size] ?? 0) > 0
              const isSelected = selectedSize === size
              return (
                <button
                  key={size}
                  type="button"
                  disabled={!available}
                  onClick={() => {
                    setSelectedSize(size)
                    setShowError(false)
                  }}
                  aria-pressed={isSelected}
                  className={`min-w-9 rounded-lg border px-2 py-1.5 text-xs font-bold transition-colors ${
                    isSelected
                      ? 'border-primary bg-primary text-primary-foreground'
                      : available
                        ? 'border-border bg-card text-card-foreground hover:border-primary'
                        : 'cursor-not-allowed border-border bg-muted text-muted-foreground/40 line-through'
                  }`}
                >
                  {size}
                </button>
              )
            })}
          </div>
        </div>

        {selectedStock != null && selectedStock > 0 && selectedStock <= 3 && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1.5 text-xs font-bold text-destructive"
            role="status"
          >
            <Flame className="size-3.5" aria-hidden="true" />
            {`¡Últimos ${selectedStock} ${selectedStock === 1 ? 'par' : 'pares'} en Talla ${selectedSize} MX!`}
          </motion.p>
        )}

        {showError && (
          <p className="text-xs font-semibold text-destructive" role="alert">
            Selecciona una talla para continuar
          </p>
        )}

        <button
          type="button"
          onClick={handleAddToCart}
          className={`mt-auto flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-bold transition-all active:scale-95 ${
            selectedSize != null
              ? 'bg-primary text-primary-foreground hover:opacity-90'
              : 'bg-secondary text-secondary-foreground hover:opacity-90'
          }`}
        >
          <ShoppingBag className="size-4" aria-hidden="true" />
          Agregar al Carrito
        </button>
      </div>

      <SizeGuideModal open={guideOpen} onClose={() => setGuideOpen(false)} horma={product.horma} />
    </article>
  )
}
