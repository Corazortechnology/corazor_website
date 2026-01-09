import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import dynamic from 'next/dynamic'
import { defaultMetadata } from './metadata'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

// Lazy load all client-side components to avoid SSR issues
const SmoothScroll = dynamic(() => import('@/components/animations/smooth-scroll'), { ssr: false })
const GlowingCursor = dynamic(() => import('@/components/animations/cursor'), { ssr: false })
const ScrollTriggerInit = dynamic(() => import('@/components/animations/scroll-trigger-init'), { ssr: false })
const Navigation = dynamic(() => import('@/components/ui/Navigation'), { ssr: false })
const MagneticCursor = dynamic(() => import('@/components/ui/MagneticCursor'), { ssr: false })
const FloatingNeonBlobs = dynamic(() => import('@/components/animations/FloatingNeonBlobs'), { ssr: false })

export const metadata: Metadata = defaultMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Corazor Technology",
              description: "Where Innovation Meets Execution. Building intelligent, scalable digital ecosystems powered by AI, Web, App & Blockchain.",
              url: process.env.NEXT_PUBLIC_SITE_URL || "https://corazor.com",
              logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://corazor.com"}/logo.png`,
              sameAs: [
                "https://linkedin.com/company/corazor",
                "https://github.com/corazor",
              ],
            }),
          }}
        />
        {/* Google Analytics - Only load if ID is provided */}
        {process.env.NEXT_PUBLIC_ANALYTICS_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_ANALYTICS_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_ANALYTICS_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className={inter.className}>
        <SmoothScroll>
          <ScrollTriggerInit />
          <GlowingCursor />
          <MagneticCursor />
          <Navigation />
          <FloatingNeonBlobs>
            {children}
          </FloatingNeonBlobs>
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  )
}
