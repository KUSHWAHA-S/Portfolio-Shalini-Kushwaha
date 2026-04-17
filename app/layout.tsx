import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Mrs_Saint_Delafield } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const geistSans = Geist({ 
  subsets: ["latin"],
  variable: "--font-geist-sans",
})
const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

const mrsSaintDelafield = Mrs_Saint_Delafield({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mrs-saint-delafield",
})

export const metadata: Metadata = {
  title: 'Shalini Kushwaha | Frontend Developer',
  description: 'Frontend Developer with 4 years of experience building responsive web and mobile interfaces using React.js, Next.js, TypeScript, and React Native.',
  keywords: ['Shalini Kushwaha', 'Frontend Developer', 'React', 'Next.js', 'TypeScript', 'React Native', 'Portfolio'],
  authors: [{ name: 'Shalini Kushwaha' }],
  creator: 'Shalini Kushwaha',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Shalini Kushwaha | Frontend Developer',
    description: 'Frontend Developer specializing in scalable, responsive, and high-performance interfaces.',
    siteName: 'Shalini Kushwaha Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shalini Kushwaha | Frontend Developer',
    description: 'Frontend Developer specializing in scalable, responsive, and high-performance interfaces.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${mrsSaintDelafield.variable} font-sans antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
