import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import NextTopLoader from 'nextjs-toploader'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Rút Thẻ Định Mệnh - Trò Chơi Uống Rượu",
  description: "Trò chơi uống rượu vui nhộn cùng bạn bè!",
  icons: {
    icon: "/placeholder-logo.png", 
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <NextTopLoader 
          color="rgb(var(--primary))"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          zIndex={1600}
        />
        <ThemeProvider 
          attribute="class" 
          defaultTheme="light" 
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}