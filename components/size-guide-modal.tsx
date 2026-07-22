'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Ruler, X } from 'lucide-react'
import { useEffect } from 'react'
import { SIZE_GUIDE } from '@/lib/products'

interface SizeGuideModalProps {
  open: boolean
  onClose: () => void
  horma: string
}

export function SizeGuideModal({ open, onClose, horma }: SizeGuideModalProps) {
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-foreground/60"
            onClick={onClose}
            aria-label="Cerrar guía de tallas"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Guía de tallas"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md rounded-2xl bg-card p-6 text-card-foreground shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-bold">
                <Ruler className="size-5 text-primary" aria-hidden="true" />
                Guía de Tallas
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted"
                aria-label="Cerrar"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-accent-foreground">
              <span className="size-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              {horma}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Mide tu pie del talón a la punta del dedo más largo (en cm) y compara con la tabla:
            </p>

            <table className="mt-3 w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th scope="col" className="py-2 font-semibold">
                    Pie (cm)
                  </th>
                  <th scope="col" className="py-2 font-semibold">
                    Talla MX
                  </th>
                  <th scope="col" className="py-2 font-semibold">
                    Talla US
                  </th>
                </tr>
              </thead>
              <tbody>
                {SIZE_GUIDE.map((row) => (
                  <tr key={row.mx} className="border-b border-border last:border-0">
                    <td className="py-2">{row.cm} cm</td>
                    <td className="py-2 font-bold">{row.mx} MX</td>
                    <td className="py-2 text-muted-foreground">{row.us} US</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
