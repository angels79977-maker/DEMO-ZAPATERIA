'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

const WHATSAPP_NUMBER = '5216141234567'

export function WhatsAppButton() {
  const { items } = useCart()

  const lastItem = items[items.length - 1]
  const message = lastItem
    ? `Hola PASO FIRME 👟 Me interesa el modelo "${lastItem.product.name}" en talla ${lastItem.size} MX. ¿Me pueden dar más información?`
    : 'Hola PASO FIRME 👟 Estoy viendo su tienda en línea y me gustaría recibir asesoría sobre su calzado.'

  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, type: 'spring', stiffness: 260, damping: 20 }}
      className="fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-whatsapp text-primary-foreground shadow-xl transition-transform hover:scale-110 active:scale-95"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="size-7" aria-hidden="true" />
    </motion.a>
  )
}
