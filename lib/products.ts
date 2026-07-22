export type Category = 'Dama' | 'Caballero' | 'Urbano' | 'Botas'

export const SIZES = [23, 24, 25, 26, 27, 28, 29] as const
export type Size = (typeof SIZES)[number]

export interface Product {
  id: string
  name: string
  brand: string
  category: Category
  price: number
  originalPrice: number | null
  image: string
  msi: boolean
  /** Stock per size — sizes not listed are unavailable */
  stock: Partial<Record<Size, number>>
  horma: string
}

export const PRODUCTS: Product[] = [
  {
    id: 'vertex-runner',
    name: 'Vertex Runner Pro',
    brand: 'PASO FIRME',
    category: 'Caballero',
    price: 1299,
    originalPrice: 1799,
    image: '/images/vertex-runner.png',
    msi: true,
    stock: { 25: 6, 26: 4, 27: 2, 28: 5, 29: 1 },
    horma: 'Horma exacta - Pide tu talla usual',
  },
  {
    id: 'luna-flats',
    name: 'Luna Flats',
    brand: 'Vía Bella',
    category: 'Dama',
    price: 899,
    originalPrice: 1199,
    image: '/images/luna-flats.png',
    msi: false,
    stock: { 23: 8, 24: 3, 25: 2, 26: 5 },
    horma: 'Horma amplia - Considera media talla menos',
  },
  {
    id: 'azteca-boot',
    name: 'Bota Azteca Work',
    brand: 'Cuero Real',
    category: 'Botas',
    price: 1899,
    originalPrice: 2499,
    image: '/images/azteca-boot.png',
    msi: true,
    stock: { 25: 4, 26: 7, 27: 3, 28: 2, 29: 4 },
    horma: 'Horma exacta - Pide tu talla usual',
  },
  {
    id: 'chelsea-noir',
    name: 'Chelsea Noir',
    brand: 'Vía Bella',
    category: 'Botas',
    price: 1549,
    originalPrice: null,
    image: '/images/chelsea-noir.png',
    msi: true,
    stock: { 23: 5, 24: 6, 25: 1, 26: 3 },
    horma: 'Horma justa - Considera media talla más',
  },
  {
    id: 'street-classic',
    name: 'Street Classic Low',
    brand: 'PASO FIRME',
    category: 'Urbano',
    price: 799,
    originalPrice: 999,
    image: '/images/street-classic.png',
    msi: false,
    stock: { 23: 4, 24: 5, 25: 8, 26: 6, 27: 4, 28: 2 },
    horma: 'Horma exacta - Pide tu talla usual',
  },
  {
    id: 'onyx-oxford',
    name: 'Onyx Oxford',
    brand: 'Don Vittorio',
    category: 'Caballero',
    price: 1699,
    originalPrice: 2199,
    image: '/images/onyx-oxford.png',
    msi: true,
    stock: { 25: 3, 26: 5, 27: 6, 28: 3, 29: 2 },
    horma: 'Horma exacta - Pide tu talla usual',
  },
  {
    id: 'coral-heels',
    name: 'Coral Heels 7cm',
    brand: 'Vía Bella',
    category: 'Dama',
    price: 1149,
    originalPrice: 1499,
    image: '/images/coral-heels.png',
    msi: true,
    stock: { 23: 2, 24: 7, 25: 5, 26: 1 },
    horma: 'Horma justa - Considera media talla más',
  },
  {
    id: 'trail-max',
    name: 'Trail Max GTX',
    brand: 'PASO FIRME',
    category: 'Urbano',
    price: 1449,
    originalPrice: null,
    image: '/images/trail-max.png',
    msi: true,
    stock: { 25: 5, 26: 2, 27: 7, 28: 4, 29: 3 },
    horma: 'Horma amplia - Considera media talla menos',
  },
]

export const FREE_SHIPPING_THRESHOLD = 999
export const SHIPPING_COST = 120

export function formatMXN(amount: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
  }).format(amount)
}

export const SIZE_GUIDE = [
  { cm: '22.5', mx: '23', us: '6' },
  { cm: '23.0', mx: '24', us: '6.5' },
  { cm: '24.0', mx: '25', us: '7.5' },
  { cm: '25.0', mx: '26', us: '8.5' },
  { cm: '26.0', mx: '27', us: '9.5' },
  { cm: '27.0', mx: '28', us: '10.5' },
  { cm: '28.0', mx: '29', us: '11.5' },
]
