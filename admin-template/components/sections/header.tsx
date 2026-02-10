"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Sun, Moon, Search, LogIn } from "lucide-react"
import { useTheme } from "@/components/providers/theme-provider"
import logoLight from "../../../attached_assets/logog.png"
import logoDark from "../../../attached_assets/logog.png"
import { Topbar } from "./Topbar"
import Link from "next/link";
// import Link from "next/link"

export function Header() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
  
  const currentTheme = resolvedTheme || 'light'

  const scrollToSection = (sectionId: string, event: React.MouseEvent | React.KeyboardEvent) => {
    if (event.type === 'keydown' && !['Enter', ' '].includes((event as React.KeyboardEvent).key)) {
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileMenuOpen(false);
      element.setAttribute('tabindex', '-1');
      element.focus();
      setTimeout(() => element.removeAttribute('tabindex'), 1000);
    }
  }

  const navigationItems = [
    { label: "Biblioteca IMUNE+", href: "biblioteca", color: "hover:text-[#00BDFF]" },
    { label: "Capacita+", href: "capacita", color: "hover:text-[#00BDFF]" },
    { label: "Impressos IMUNE+", href: "impressos", color: "hover:text-[#00BDFF]" },
    { label: "ImunePlay", href: "imuneplay", color: "hover:text-[#00BDFF]" },
  ]

  return (
    <>
    <Topbar />
    <header 
      className={`sticky top-[35px] z-50 transition-colors duration-300 ${
        currentTheme === "light" ? "bg-imune-header" : "bg-gray-800"
      }`}
      role="banner"
    >
      <div className="w-full px-[20px] xl:px-[50px] py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-start">
            <Link 
              href="/" 
              className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white rounded"
              title="Página inicial do IMUNE+"
              aria-label="Página inicial do IMUNE+"
            >
              <Image
                src={currentTheme === "light" ? logoLight : logoDark}
                alt="IMUNE+ - Voltar para a página inicial"
                width={300}
                height={60}
                className="h-12 w-auto"
                priority
              />
            </Link>
          </div>

          <nav className="hidden lg:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <button
                key={item.href}
                onClick={(e) => scrollToSection(item.href, e)}
                onKeyDown={(e) => scrollToSection(item.href, e)}
                className={`transition-colors duration-200 ${item.color} uppercase font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-imune-orange dark:focus:ring-offset-gray-800 px-2 py-1 rounded ${
                  currentTheme === "light" ? "text-[#0037c1]" : "text-white"
                }`}
                aria-label={`Ir para ${item.label}`}
                role="link"
                tabIndex={0}
              >
                {item.label}
              </button>
            ))}
            <Link href="/login">
              <Button
                variant="outline"
                className={`hidden sm:flex items-center space-x-1 ${
                  currentTheme === "light" 
                    ? "border-[#ffffff]/30 bg-gradient-to-br from-[#008C32] to-[#00DD4F] transition-all duration-300 transform hover:scale-105 hover:shadow-lg  hover:opacity-90 text-white hover:text-white hover:bg-gradient-to-tr" 
                    : "border-gray-600 text-white hover:bg-gray-700"
                }`}
                aria-label="Fazer login no sistema"
              >
                <LogIn className="h-4 w-4 mr-1" aria-hidden="true" />
                <span>Login</span>
              </Button>
            </Link>
          </nav>

          <div className="flex items-end space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className={`hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white rounded-full p-1 ${
                currentTheme === "light" ? "text-[#0037c1]" : "text-white"
              }`}
              aria-label={currentTheme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro"}
              aria-pressed={currentTheme === "dark"}
            >
              {currentTheme === "dark" ? (
                <Sun className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Moon className="h-5 w-5" aria-hidden="true" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={`hover:bg-white/20 focus:outline-none ${
                currentTheme === "light" ? "text-[#0037c1]" : "text-white"
              } rounded-full p-1`}
              onClick={() => console.log("Search functionality would be implemented here")}
              aria-label="Abrir busca"
            >
              <Search className="h-5 w-5" aria-hidden="true" />
            </Button>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`lg:hidden hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white rounded-full ${
                    currentTheme === "light" ? "text-[#333333]" : "text-white"
                  }`}
                  aria-label="Abrir menu de navegação"
                  aria-expanded={mobileMenuOpen}
                  aria-controls="mobile-navigation"
                >
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="left" 
                className={`w-[300px] sm:w-[400px] transition-all duration-300 ease-in-out ${
                  currentTheme === "light" ? "bg-imune-header" : "bg-gray-800"
                } border-r border-gray-200 dark:border-gray-700`}
                id="mobile-navigation"
                aria-label="Menu de navegação"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8 pt-4 px-4">
                    <Image
                      src={currentTheme === "light" ? logoLight : logoDark}
                      alt="IMUNE+ Logo"
                      width={150}
                      height={36}
                      className="h-9 w-auto"
                    />
                  </div>
                  <nav className="flex flex-col space-y-2 px-4">
                    {navigationItems.map((item) => (
                      <button
                        key={item.href}
                        onClick={(e) => scrollToSection(item.href, e)}
                        onKeyDown={(e) => scrollToSection(item.href, e)}
                        className={`text-left py-3 px-4 rounded-lg transition-colors duration-200 ${item.color} 
                          font-medium text-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-imune-orange 
                          focus:ring-offset-2 focus:ring-offset-transparent ${
                            currentTheme === "light" ? "text-[#0037c1]" : "text-white"
                          }`}
                        role="link"
                        tabIndex={0}
                        aria-label={`Ir para ${item.label}`}
                      >
                        {item.label}
                      </button>
                    ))}
                    {/* <Link href="/login" className="block mb-4">
                      <Button
                        variant="outline"
                        className={`w-full justify-start ${
                          currentTheme === "light" 
                            ? "border-[#0037c1]/30 text-[#0037c1] hover:bg-[#0037c1]/20" 
                            : "border-gray-600 text-white hover:bg-gray-700"
                        }`}
                        aria-label="Fazer login no sistema"
                      >
                        <LogIn className="h-5 w-5 mr-2" aria-hidden="true" />
                        Fazer Login
                      </Button>
                    </Link> */}
                  </nav>
                  <div className="mt-auto px-4 pb-6">
                    {/* <Link href="/login" className="block mb-4">
                      <Button
                        variant="outline"
                        className={`w-full justify-start ${
                          currentTheme === "light" 
                            ? "border-[#0037c1]/30 text-[#0037c1] hover:bg-[#0037c1]/20" 
                            : "border-gray-600 text-white hover:bg-gray-700"
                        }`}
                        aria-label="Fazer login no sistema"
                      >
                        <LogIn className="h-5 w-5 mr-2" aria-hidden="true" />
                        Fazer Login
                      </Button>
                    </Link> */}
                    <Button
                      variant="outline"
                      className={`w-full justify-start ${
                        currentTheme === "light" 
                          ? "border-[#0037c1]/30 text-[#0037c1] hover:bg-[#0037c1]/20" 
                          : "border-gray-600 text-white hover:bg-gray-700"
                      }`}
                      onClick={toggleTheme}
                      aria-label={currentTheme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro"}
                    >
                      {currentTheme === "dark" ? (
                        <Sun className="h-5 w-5 mr-2" aria-hidden="true" />
                      ) : (
                        <Moon className="h-5 w-5 mr-2" aria-hidden="true" />
                      )}
                      {currentTheme === "dark" ? "Tema Claro" : "Tema Escuro"}
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
    </>
  )
}