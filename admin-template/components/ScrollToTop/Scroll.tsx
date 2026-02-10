"use client";
import React, { useState, useEffect } from "react";

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Mostrar o botão quando a rolagem for maior que 300px
  const toggleVisibility = (): void => {
    setIsVisible(window.pageYOffset > 300);
  };

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Voltar ao topo"
      onClick={scrollToTop}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          scrollToTop();
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        fixed bottom-10 right-10 
        rounded-full p-2.5 
        cursor-pointer shadow-lg 
        transition-colors duration-300
        opacity-0 invisible
        z-[1000]
        ${isVisible ? 'opacity-100 visible' : ''}
        ${isHovered ? 'bg-blue-500/50' : 'bg-[#FDC300]'}
      `}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px">
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M4 12l1.41 1.41L11 7.83v8.59h2V7.83l5.59 5.58L20 12l-8-8-8 8z" />
      </svg>
    </div>
  );
};

export default ScrollToTop;
