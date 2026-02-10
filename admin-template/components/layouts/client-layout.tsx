"use client"

import { ReactNode } from "react"
import { Header } from "@/components/sections/header"
import Footer from "@/components/sections/footer"
import { ThemeProvider } from "@/components/providers/theme-provider"

interface ClientLayoutProps {
  children: ReactNode
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <ThemeProvider>
      <Header />
      {children}
      <Footer />
    </ThemeProvider>
  )
}
