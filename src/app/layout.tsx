import type { Metadata } from "next";
import { Poppins, Khand, Orbitron } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ThemeProvider as SkinProvider } from "@/lib/contexts/theme-context";
import { headers } from "next/headers";
import { hexToHsl, hexToRgbValues, isLightColor } from "@/lib/themes";

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
  title: "Passei No Concurso - Sua Aprovação Aqui",
  description:
    "Sistema avançado de estudos com IA para concursos públicos. A aprovação é sua no passeinoconcurso.ai.",
  keywords:
    "passeinoconcurso, simulador, concurso, ia, simulado, aulas interativas",
};

import { DevProfileSwitcher } from "@/components/dev/DevProfileSwitcher";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const tenantPrimaryHeader = headersList.get('x-tenant-primary');
  const tenantSecondaryHeader = headersList.get('x-tenant-secondary');

  const tenantPrimary = tenantPrimaryHeader || undefined;
  const tenantSecondary = tenantSecondaryHeader || undefined;

  const inlineStyles = tenantPrimary ? `
    :root {
      --primary: ${hexToHsl(tenantPrimary)};
      --primary-hover: ${hexToHsl(tenantPrimary)};
      --primary-hex: ${tenantPrimary};
      --primary-hover-hex: ${tenantPrimary};
      --primary-rgb: ${hexToRgbValues(tenantPrimary)};
      --primary-foreground: ${isLightColor(tenantPrimary) ? "222.2 84.7% 4.9%" : "210 40% 98%"};
    }
  ` : '';

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: inlineStyles }} />
      </head>
      <body
        className={`${poppins.variable} ${khand.variable} ${orbitron.variable} font-sans overflow-x-clip`}
        suppressHydrationWarning
      >
        <SkinProvider 
          tenantPrimary={tenantPrimary}
          tenantSecondary={tenantSecondary}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            {/* Oculto por pedido do dev. Para ativar, basta descomentar a linha abaixo */}
            {/* <DevProfileSwitcher /> */}
          </ThemeProvider>
        </SkinProvider>
      </body>
    </html>
  );
}
