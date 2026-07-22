'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { FREE_SHIPPING_THRESHOLD, SHIPPING_COST, type Product, type Size } from './products'

export interface CartItem {
  product: Product
  size: Size
  quantity: number
}

interface CartContextValue {
  items: CartItem[]
  addItem: (product: Product, size: Size) => void
  removeItem: (productId: string, size: Size) => void
  updateQuantity: (productId: string, size: Size, quantity: number) => void
  clearCart: () => void
  subtotal: number
  shipping: number | null
  total: number
  itemCount: number
  zipCode: string
  setZipCode: (zip: string) => void
  isDrawerOpen: boolean
  openDrawer: () => void
  closeDrawer: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = 'paso-firme-cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [zipCode, setZipCode] = useState('')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setItems(JSON.parse(stored))
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items, hydrated])

  const addItem = useCallback((product: Product, size: Size) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id && i.size === size)
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.size === size ? { ...i, quantity: i.quantity + 1 } : i,
        )
      }
      return [...prev, { product, size, quantity: 1 }]
    })
    setIsDrawerOpen(true)
  }, [])

  const removeItem = useCallback((productId: string, size: Size) => {
    setItems((prev) => prev.filter((i) => !(i.product.id === productId && i.size === size)))
  }, [])

  const updateQuantity = useCallback((productId: string, size: Size, quantity: number) => {
    if (quantity < 1) return
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId && i.size === size ? { ...i, quantity } : i)),
    )
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    [items],
  )

  // shipping is null until a valid 5-digit zip code is entered
  const shipping = useMemo(() => {
    if (zipCode.length !== 5) return null
    return subtotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  }, [zipCode, subtotal])

  const total = subtotal + (shipping ?? 0)
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      subtotal,
      shipping,
      total,
      itemCount,
      zipCode,
      setZipCode,
      isDrawerOpen,
      openDrawer: () => setIsDrawerOpen(true),
      closeDrawer: () => setIsDrawerOpen(false),
    }),
    [
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      subtotal,
      shipping,
      total,
      itemCount,
      zipCode,
      isDrawerOpen,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
