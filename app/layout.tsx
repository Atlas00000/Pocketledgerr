import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'PocketLedger - Lightweight Expense Tracker',
    template: '%s | PocketLedger'
  },
  description: 'Track your expenses with ease using PocketLedger, the lightweight and intuitive expense tracking app.',
  keywords: ['expense tracker', 'personal finance', 'budgeting', 'money management'],
  authors: [{ name: 'PocketLedger Team' }],
  creator: 'PocketLedger',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pocketledger.app',
    title: 'PocketLedger - Lightweight Expense Tracker',
    description: 'Track your expenses with ease using PocketLedger, the lightweight and intuitive expense tracking app.',
    siteName: 'PocketLedger',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PocketLedger - Lightweight Expense Tracker',
    description: 'Track your expenses with ease using PocketLedger, the lightweight and intuitive expense tracking app.',
    creator: '@pocketledger',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
