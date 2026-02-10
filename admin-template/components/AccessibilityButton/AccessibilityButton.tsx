'use client';
import { useState, useEffect } from "react";
import { FaPlus, FaMinus, FaUndo, FaWheelchair, FaEye, FaAdjust, FaFont, FaUnderline } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/providers/theme-provider";

const AccessibilityButton: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [fontSize, setFontSize] = useState<number>(1);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isNegativeContrast, setIsNegativeContrast] = useState(false);
  const [isWhiteBackground, setIsWhiteBackground] = useState(false);
  const [isUnderlineLinks, setIsUnderlineLinks] = useState(false);
  const [isLegibleFont, setIsLegibleFont] = useState(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  // Carregar configurações salvas do localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('accessibilitySettings');
    if (savedSettings) {
      const {
        fontSize: savedFontSize,
        isHighContrast: savedHighContrast,
        isNegativeContrast: savedNegativeContrast,
        isWhiteBackground: savedWhiteBackground,
        isUnderlineLinks: savedUnderlineLinks,
        isLegibleFont: savedLegibleFont
      } = JSON.parse(savedSettings);
      
      setFontSize(savedFontSize || 1);
      setIsHighContrast(!!savedHighContrast);
      setIsNegativeContrast(!!savedNegativeContrast);
      setIsWhiteBackground(!!savedWhiteBackground);
      setIsUnderlineLinks(!!savedUnderlineLinks);
      setIsLegibleFont(!!savedLegibleFont);
    }
    setIsMounted(true);
  }, []);

  // Salvar configurações sempre que mudarem
  useEffect(() => {
    if (!isMounted) return;
    
    const settings = {
      fontSize,
      isHighContrast,
      isNegativeContrast,
      isWhiteBackground,
      isUnderlineLinks,
      isLegibleFont
    };
    
    localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
    
    // Aplicar estilos
    document.documentElement.style.setProperty('--accessibility-font-size', `${fontSize}em`);
    document.documentElement.classList.toggle('high-contrast', isHighContrast);
    document.documentElement.classList.toggle('negative-contrast', isNegativeContrast);
    document.documentElement.classList.toggle('white-background', isWhiteBackground);
    document.documentElement.classList.toggle('underline-links', isUnderlineLinks);
    document.documentElement.classList.toggle('legible-font', isLegibleFont);
    
  }, [fontSize, isHighContrast, isNegativeContrast, isWhiteBackground, isUnderlineLinks, isLegibleFont, isMounted]);

  // Funções de acessibilidade
  const increaseFontSize = () => setFontSize(prev => Math.min(prev + 0.1, 1.5));
  const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 0.1, 0.8));
  const toggleHighContrast = () => {
    setIsHighContrast(prev => !prev);
    if (isNegativeContrast) setIsNegativeContrast(false);
  };
  const toggleNegativeContrast = () => {
    setIsNegativeContrast(prev => !prev);
    if (isHighContrast) setIsHighContrast(false);
  };
  const toggleWhiteBackground = () => setIsWhiteBackground(prev => !prev);
  const toggleUnderlineLinks = () => setIsUnderlineLinks(prev => !prev);
  const toggleLegibleFont = () => setIsLegibleFont(prev => !prev);
  
  const resetAccessibility = () => {
    setFontSize(1);
    setIsHighContrast(false);
    setIsNegativeContrast(false);
    setIsWhiteBackground(false);
    setIsUnderlineLinks(false);
    setIsLegibleFont(false);
  };
  
  const toggleThemeMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (!isMounted) return null;

  return (
    <div className="fixed left-0 sm:left-2 bottom-4 sm:top-1/2 sm:-translate-y-1/2 z-50 flex flex-col items-start sm:items-stretch">
      <span id="high-contrast-label" className="sr-only">Alto contraste</span>
      <span id="negative-contrast-label" className="sr-only">Contraste negativo</span>
      <span id="white-bg-label" className="sr-only">Fundo claro</span>
      <span id="underline-links-label" className="sr-only">Sublinhar links</span>
      <span id="legible-font-label" className="sr-only">Fonte legível</span>
      
      {isExpanded ? (
        <button
          className="bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white p-3 rounded-r-full sm:rounded-md flex items-center justify-center shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded="true"
          aria-controls="accessibility-dialog"
          aria-label="Fechar menu de acessibilidade"
          title="Fechar menu de acessibilidade"
          type="button"
          aria-haspopup="dialog"
        >
          <FaWheelchair className="text-2xl" aria-hidden="true" />
        </button>
      ) : (
        <button
          className="bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white p-3 rounded-r-full sm:rounded-md flex items-center justify-center shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded="false"
          aria-controls="accessibility-dialog"
          aria-label="Abrir menu de acessibilidade"
          title="Abrir menu de acessibilidade"
          type="button"
          aria-haspopup="dialog"
        >
          <FaWheelchair className="text-2xl" aria-hidden="true" />
        </button>
      )}

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            id="accessibility-dialog"
            className="bg-white dark:bg-gray-800 p-3 rounded-md mt-2 shadow-xl border border-gray-200 dark:border-gray-700 w-screen max-w-xs sm:w-auto"
            initial={{ opacity: 0, y: 20, x: 0 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20, x: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="accessibility-dialog-title"
            aria-describedby="accessibility-dialog-description"
          >
            <h2 id="accessibility-dialog-title" className="text-lg font-semibold text-gray-900 dark:text-white mb-2 px-2">
              Acessibilidade
            </h2>
            <p id="accessibility-dialog-description" className="text-sm text-gray-600 dark:text-gray-300 mb-3 px-2">
              Personalize a exibição do site de acordo com suas necessidades
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between space-x-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Tamanho do texto</span>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={decreaseFontSize}
                    className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Diminuir tamanho da fonte"
                    type="button"
                  >
                    <FaMinus className="w-3 h-3" />
                  </button>
                  <button
                    onClick={increaseFontSize}
                    className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Aumentar tamanho da fonte"
                    type="button"
                  >
                    <FaPlus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {isHighContrast ? (
                <button
                  onClick={toggleHighContrast}
                  className="w-full text-left p-2 rounded-md flex items-center bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100"
                  role="switch"
                  aria-checked="true"
                  aria-labelledby="high-contrast-label"
                  type="button"
                >
                  <FaEye className="mr-2 flex-shrink-0" />
                  Desativar Alto Contraste
                </button>
              ) : (
                <button
                  onClick={toggleHighContrast}
                  className="w-full text-left p-2 rounded-md flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  role="switch"
                  aria-checked="false"
                  aria-labelledby="high-contrast-label"
                  type="button"
                >
                  <FaEye className="mr-2 flex-shrink-0" />
                  Ativar Alto Contraste
                </button>
              )}

              {isNegativeContrast ? (
                <button
                  onClick={toggleNegativeContrast}
                  className="w-full text-left p-2 rounded-md flex items-center bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100"
                  role="switch"
                  aria-checked="true"
                  aria-labelledby="negative-contrast-label"
                  type="button"
                >
                  <FaAdjust className="mr-2 flex-shrink-0" />
                  Desativar Contraste Negativo
                </button>
              ) : (
                <button
                  onClick={toggleNegativeContrast}
                  className="w-full text-left p-2 rounded-md flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  role="switch"
                  aria-checked="false"
                  aria-labelledby="negative-contrast-label"
                  type="button"
                >
                  <FaAdjust className="mr-2 flex-shrink-0" />
                  Ativar Contraste Negativo
                </button>
              )}

              {isWhiteBackground ? (
                <button
                  onClick={toggleWhiteBackground}
                  className="w-full text-left p-2 rounded-md flex items-center bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100"
                  role="switch"
                  aria-checked="true"
                  aria-labelledby="white-bg-label"
                  type="button"
                >
                  <FaEye className="mr-2 flex-shrink-0" />
                  Desativar Fundo Claro
                </button>
              ) : (
                <button
                  onClick={toggleWhiteBackground}
                  className="w-full text-left p-2 rounded-md flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  role="switch"
                  aria-checked="false"
                  aria-labelledby="white-bg-label"
                  type="button"
                >
                  <FaEye className="mr-2 flex-shrink-0" />
                  Ativar Fundo Claro
                </button>
              )}

              {isUnderlineLinks ? (
                <button
                  onClick={toggleUnderlineLinks}
                  className="w-full text-left p-2 rounded-md flex items-center bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100"
                  role="switch"
                  aria-checked="true"
                  aria-labelledby="underline-links-label"
                  type="button"
                >
                  <FaUnderline className="mr-2 flex-shrink-0" />
                  Remover Links
                </button>
              ) : (
                <button
                  onClick={toggleUnderlineLinks}
                  className="w-full text-left p-2 rounded-md flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  role="switch"
                  aria-checked="false"
                  aria-labelledby="underline-links-label"
                  type="button"
                >
                  <FaUnderline className="mr-2 flex-shrink-0" />
                  Sublinhar Links
                </button>
              )}

              {isLegibleFont ? (
                <button
                  onClick={toggleLegibleFont}
                  className="w-full text-left p-2 rounded-md flex items-center bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100"
                  role="switch"
                  aria-checked="true"
                  aria-labelledby="legible-font-label"
                  type="button"
                >
                  <FaFont className="mr-2 flex-shrink-0" />
                  Desativar Fonte Legível
                </button>
              ) : (
                <button
                  onClick={toggleLegibleFont}
                  className="w-full text-left p-2 rounded-md flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  role="switch"
                  aria-checked="false"
                  aria-labelledby="legible-font-label"
                  type="button"
                >
                  <FaFont className="mr-2 flex-shrink-0" />
                  Ativar Fonte Legível
                </button>
              )}

              <button
                onClick={toggleThemeMode}
                className="w-full text-left p-2 rounded-md flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                type="button"
                aria-label={`Alternar para tema ${theme === 'dark' ? 'claro' : 'escuro'}`}
              >
                <FaAdjust className="mr-2 flex-shrink-0" />
                Alternar para tema {theme === 'dark' ? 'claro' : 'escuro'}
              </button>

              <button
                onClick={resetAccessibility}
                className="w-full text-left p-2 rounded-md flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 mt-2 border-t border-gray-200 dark:border-gray-700 pt-2"
                type="button"
                aria-label="Redefinir configurações de acessibilidade"
              >
                <FaUndo className="mr-2 flex-shrink-0" />
                Redefinir configurações
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <style jsx global>{`
        :root {
          --accessibility-font-size: 1em;
        }
        
        .high-contrast {
          --tw-bg-opacity: 1 !important;
          --tw-text-opacity: 1 !important;
          background-color: #000 !important;
          color: #fff !important;
        }
        
        .high-contrast a,
        .high-contrast button,
        .high-contrast [role="button"] {
          outline: 2px solid #fff !important;
          outline-offset: 2px !important;
        }
        
        .negative-contrast {
          filter: invert(1) hue-rotate(180deg) !important;
          background-color: #fff !important;
        }
        
        .white-background {
          background-color: #fff !important;
          color: #000 !important;
        }
        
        .underline-links a {
          text-decoration: underline !important;
        }
        
        .legible-font {
          font-family: Arial, Helvetica, sans-serif !important;
        }
        
        /* Aplicar tamanho da fonte */
        html {
          font-size: var(--accessibility-font-size, 1em);
        }
      `}</style>
    </div>
  );
};

export default AccessibilityButton;
