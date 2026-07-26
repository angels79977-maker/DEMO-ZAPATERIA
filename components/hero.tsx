'use client'

import { motion } from 'framer-motion'
import { Truck } from 'lucide-react'

export function Hero({ onCtaClick }: { onCtaClick: () => void }) {
  return (
    <section className="relative overflow-hidden bg-secondary text-secondary-foreground">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-14 md:grid-cols-2 md:py-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start gap-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-4 py-1.5 text-xs font-semibold text-primary">
            <Truck className="size-4" aria-hidden="true" />
            {'Envío Gratis a todo México en compras mayores a $999'}
          </span>
          <h1 className="text-balance text-4xl font-black leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Pisa fuerte.
            <br />
            <span className="text-primary">Camina con estilo.</span>
          </h1>
          <p className="max-w-md text-pretty leading-relaxed text-secondary-foreground/70">
            Descubre la nueva colección de calzado premium para dama, caballero y los más pequeños.
            Calidad que se siente en cada paso.
          </p>
          <button
            type="button"
            onClick={onCtaClick}
            className="rounded-full bg-primary px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-transform hover:scale-105 active:scale-95"
          >
            Ver Colección
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/ZAPATOSOFF.png"
             alt="Sneaker premium de la nueva colección SHOP SHOES"
            className="mx-auto w-full max-w-lg rounded-2xl object-cover shadow-2xl"
          />
          <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-card px-5 py-2 text-xs font-bold text-card-foreground shadow-lg">
            <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
            Nueva Colección 2026
          </div>
        </motion.div>
      </div>
    </section>
  )
}
