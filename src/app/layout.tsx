import type { Metadata } from "next";
import { Poppins, Khand, Orbitron } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ThemeProvider as SkinProvider } from "@/lib/contexts/theme-context";

const poppins = Poppins({
  weight: ["300", "400", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

const khand = Khand({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-khand",
});

const orbitron = Orbitron({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  title: "Concurso Na Veia - Sua Aprovação Aqui",
  description:
    "Sistema avançado de estudos com IA para concursos públicos. A aprovação é sua no passeinoconcurso.ai.",
  keywords:
    "passeinoconcurso, simulador, concurso, ia, simulado, aulas interativas",
  icons: {
    icon: [
      { url: "/logo-badge.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/favicon.ico",
    apple: "/logo-badge.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${khand.variable} ${orbitron.variable} font-sans overflow-x-clip`}
        suppressHydrationWarning
      >
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
  );
}
