import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  weight: ['300', '400', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Petrobras Quest AI - Sistema de Estudos com IA',
  description: 'Questões ilimitadas geradas por IA no estilo CESGRANRIO para o concurso da Petrobras 2026',
  keywords: 'petrobras, concurso, cesgranrio, questões, ia, simulado',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={poppins.className} suppressHydrationWarning>{children}</body>
    </html>
  )
}
