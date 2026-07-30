'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, ShoppingBag, Trash2, Truck, X } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/lib/cart-context'
import { formatMXN } from '@/lib/products'
import { CheckoutModal } from './checkout-modal'

export function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    removeItem,
    updateQuantity,
    subtotal,
    shipping,
    total,
    zipCode,
    setZipCode,
  } = useCart()
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  return (
    <>
      <AnimatePresence>
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50">
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-foreground/60"
              onClick={closeDrawer}
              aria-label="Close cart"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Shopping Cart"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.28 }}
              className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-card text-card-foreground shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <h2 className="flex items-center gap-2 text-lg font-bold">
                  <ShoppingBag className="size-5 text-primary" aria-hidden="true" />
                  Your Cart
                </h2>
                <button
                  type="button"
                  onClick={closeDrawer}
                  className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted"
                  aria-label="Cerrar"
                >
                  <X className="size-5" aria-hidden="true" />
                </button>
              </div>

              {items.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
                  <ShoppingBag className="size-12 text-muted-foreground/40" aria-hidden="true" />
                  <p className="font-bold">Your cart is empty</p>
                  <p className="text-sm text-muted-foreground">
                    Add your favorite pair and it will appear here.
                  </p>
                  <button
                    type="button"
                    onClick={closeDrawer}
                    className="mt-2 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  <ul className="flex-1 divide-y divide-border overflow-y-auto px-5">
                    {items.map((item) => (
                      <li key={`${item.product.id}-${item.size}`} className="flex gap-4 py-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.product.image || '/placeholder.svg'}
                          alt={item.product.name}
                          className="size-20 shrink-0 rounded-xl border border-border object-cover"
                        />
                        <div className="flex flex-1 flex-col gap-1">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-sm font-bold leading-snug">{item.product.name}</p>
                              <p className="text-xs text-muted-foreground">
                                 Size {item.size} MX
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(item.product.id, item.size)}
                              className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
                              aria-label={`Remove ${item.product.name} size ${item.size}`}
                            >
                              <Trash2 className="size-4" aria-hidden="true" />
                            </button>
                          </div>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center gap-2 rounded-full border border-border px-1 py-0.5">
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(item.product.id, item.size, item.quantity - 1)
                                }
                                className="rounded-full p-1 transition-colors hover:bg-muted disabled:opacity-40"
                                disabled={item.quantity <= 1}
                                aria-label="Decrease quantity"
                              >
                                <Minus className="size-3.5" aria-hidden="true" />
                              </button>
                              <span className="min-w-4 text-center text-sm font-bold">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(item.product.id, item.size, item.quantity + 1)
                                }
                                className="rounded-full p-1 transition-colors hover:bg-muted"
                                aria-label="Increase quantity"
                              >
                                <Plus className="size-3.5" aria-hidden="true" />
                              </button>
                            </div>
                            <p className="text-sm font-black">
                              {formatMXN(item.product.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-border px-5 py-4">
                    <label
                      htmlFor="zip-input"
                      className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground"
                    >
                      <Truck className="size-3.5" aria-hidden="true" />
                      Calculate shipping (ZIP)
                    </label>
                    <input
                      id="zip-input"
                      type="text"
                      inputMode="numeric"
                      maxLength={5}
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ''))}
                      placeholder="e.g. 31000"
                      className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                    />

                    <dl className="mt-4 flex flex-col gap-1.5 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Subtotal</dt>
                        <dd className="font-semibold">{formatMXN(subtotal)}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Shipping Cost</dt>
                        <dd className="font-semibold">
                          {shipping == null ? (
                            <span className="text-xs text-muted-foreground">Enter your ZIP code</span>
                          ) : shipping === 0 ? (
                            <span className="font-bold text-primary">GRATIS</span>
                          ) : (
                            `${formatMXN(shipping)} por FedEx/DHL`
                          )}
                        </dd>
                      </div>
                      <div className="mt-1 flex justify-between border-t border-border pt-2 text-base">
                        <dt className="font-bold">Final Total</dt>
                        <dd className="font-black">{formatMXN(total)}</dd>
                      </div>
                    </dl>

                    <button
                      type="button"
                      onClick={() => setCheckoutOpen(true)}
                      className="mt-4 w-full rounded-full bg-primary py-3.5 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </>
  )
}
