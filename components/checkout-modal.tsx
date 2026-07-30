'use client'

import { AnimatePresence, motion } from 'framer-motion'
import {
  Banknote,
  CheckCircle2,
  CreditCard,
  FileDown,
  Landmark,
  MessageCircle,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/lib/cart-context'
import { formatMXN } from '@/lib/products'

type PaymentMethod = 'card' | 'oxxo' | 'spei'

interface CheckoutModalProps {
  open: boolean
  onClose: () => void
}

export function CheckoutModal({ open, onClose }: CheckoutModalProps) {
  const { total, clearCart, closeDrawer } = useCart()
  const [step, setStep] = useState(1)
  const [address, setAddress] = useState({ street: '', zip: '', city: '' })
  const [payment, setPayment] = useState<PaymentMethod>('card')
  const [orderId, setOrderId] = useState('')
  const [orderTotal, setOrderTotal] = useState(0)

  const handleClose = () => {
    onClose()
    // reset after exit animation
    setTimeout(() => setStep(1), 300)
  }

  const handleConfirmPayment = () => {
    setOrderId(`PF-${Math.floor(100000 + Math.random() * 900000)}`)
    setOrderTotal(total)
    setStep(3)
    clearCart()
  }

  const handleFinish = () => {
    handleClose()
    closeDrawer()
  }

  const addressValid = address.street.trim() !== '' && address.zip.length === 5 && address.city.trim() !== ''

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-foreground/70"
            onClick={step === 3 ? handleFinish : handleClose}
            aria-label="Close checkout"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Checkout process"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.2 }}
            className="relative flex max-h-[90vh] w-full max-w-md flex-col overflow-y-auto rounded-2xl bg-card p-6 text-card-foreground shadow-2xl"
          >
            {step < 3 && (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold">Checkout</h2>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted"
                    aria-label="Cerrar"
                  >
                    <X className="size-5" aria-hidden="true" />
                  </button>
                </div>
                {/* Step indicator */}
                <div className="mt-4 flex items-center gap-2" aria-hidden="true">
                  {[1, 2].map((s) => (
                    <div
                      key={s}
                      className={`h-1.5 flex-1 rounded-full ${s <= step ? 'bg-primary' : 'bg-muted'}`}
                    />
                  ))}
                </div>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Paso {step} de 2 · {step === 1 ? 'Shipping Address' : 'Payment Method'}
                </p>
              </>
            )}

            {step === 1 && (
              <form
                className="mt-4 flex flex-col gap-4"
                onSubmit={(e) => {
                  e.preventDefault()
                  if (addressValid) setStep(2)
                }}
              >
                <div>
                  <label htmlFor="street" className="text-sm font-semibold">
                    Street and number
                  </label>
                  <input
                    id="street"
                    type="text"
                    required
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    placeholder="123 Main St, Downtown"
                    className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="checkout-zip" className="text-sm font-semibold">
                      ZIP
                    </label>
                    <input
                      id="checkout-zip"
                      type="text"
                      required
                      inputMode="numeric"
                      maxLength={5}
                      value={address.zip}
                      onChange={(e) =>
                        setAddress({ ...address, zip: e.target.value.replace(/\D/g, '') })
                      }
                      placeholder="31000"
                      className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="text-sm font-semibold">
                      City
                    </label>
                    <input
                      id="city"
                      type="text"
                      required
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      placeholder="Chihuahua"
                      className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={!addressValid}
                  className="mt-2 w-full rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground transition-opacity disabled:opacity-40"
                >
                  Continue to Payment
                </button>
              </form>
            )}

            {step === 2 && (
              <div className="mt-4 flex flex-col gap-3">
                {(
                  [
                     {
                       id: 'card' as const,
                       icon: CreditCard,
                       title: 'Credit / Debit Card',
                       subtitle: 'Secure payment with Stripe · 3 interest-free installments',
                     },
                     {
                       id: 'oxxo' as const,
                       icon: Banknote,
                       title: 'Mercado Pago / OXXO',
                       subtitle: 'Pay in cash at your nearest store',
                     },
                     {
                       id: 'spei' as const,
                       icon: Landmark,
                       title: 'SPEI Transfer',
                       subtitle: 'From your banking app, instant confirmation',
                     },
                  ] satisfies { id: PaymentMethod; icon: typeof CreditCard; title: string; subtitle: string }[]
                ).map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPayment(method.id)}
                    aria-pressed={payment === method.id}
                    className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-colors ${
                      payment === method.id
                        ? 'border-primary bg-accent'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <method.icon className="size-5 shrink-0 text-primary" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-bold">{method.title}</p>
                      <p className="text-xs text-muted-foreground">{method.subtitle}</p>
                    </div>
                  </button>
                ))}

                {payment === 'card' && (
                  <div className="rounded-xl border border-border bg-muted p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Stripe · Demo
                    </p>
                    <div className="mt-2 flex flex-col gap-2">
                      <input
                        type="text"
                        placeholder="4242 4242 4242 4242"
                        disabled
                        className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm"
                        aria-label="Card number (demo)"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          disabled
                          className="rounded-lg border border-input bg-card px-3 py-2 text-sm"
                          aria-label="Expiration date (demo)"
                        />
                        <input
                          type="text"
                          placeholder="CVC"
                          disabled
                          className="rounded-lg border border-input bg-card px-3 py-2 text-sm"
                          aria-label="CVC (demo)"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-1 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 rounded-full border border-border py-3 text-sm font-bold transition-colors hover:bg-muted"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmPayment}
                    className="flex-1 rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground"
                  >
                    Pay {formatMXN(total)}
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col items-center gap-4 py-4 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                >
                  <CheckCircle2 className="size-16 text-primary" aria-hidden="true" />
                </motion.div>
                <div>
                  <h2 className="text-xl font-black">Order Confirmed!</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Thank you for your purchase of {formatMXN(orderTotal)}
                  </p>
                </div>
                <div className="w-full rounded-xl bg-muted p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Order number
                  </p>
                  <p className="mt-1 font-mono text-lg font-black">{orderId}</p>
                </div>
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-border py-3 text-sm font-bold transition-colors hover:bg-muted"
                >
                  <FileDown className="size-4" aria-hidden="true" />
                  Print Shipping Guide (PDF)
                </button>
                <a
                  href={`https://wa.me/5216141234567?text=${encodeURIComponent(`Hi, I want to receive the notification and guide for my order ${orderId} via WhatsApp`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp py-3 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  Receive notification and guide via WhatsApp
                </a>
                <button
                  type="button"
                  onClick={handleFinish}
                  className="text-sm font-medium text-muted-foreground underline-offset-2 hover:underline"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
