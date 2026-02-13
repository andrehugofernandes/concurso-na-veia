import type { Metadata } from 'next'
import { Poppins, Bebas_Neue } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from "@/components/providers/theme-provider"
import { ThemeProvider as SkinProvider } from "@/lib/contexts/theme-context"

const poppins = Poppins({
  weight: ['300', '400', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
})

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bebas',
})

export const metadata: Metadata = {
  title: 'A Vaga eh Minha - Domine seu Futuro',
  description: 'Sistema avançado de estudos com IA para concursos públicos. A vaga eh sua no avagaemia.ai.',
  keywords: 'avagaemia, a vaga eh minha, concurso, ia, simulado, aulas interativas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${poppins.variable} ${bebasNeue.variable} font-sans`} suppressHydrationWarning>
        <SkinProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </SkinProvider>
      </body>
    </html>
  )
}
