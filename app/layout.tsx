import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const _geistSans = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PASO FIRME - Calzado & Style | Zapatería Online México',
  description:
    'Tienda en línea de calzado premium para dama, caballero y niños. Envío gratis a todo México en compras mayores a $999. 3 meses sin intereses.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#1e2532',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es-MX" className="bg-background">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
