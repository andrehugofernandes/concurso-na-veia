"use client";

import React, { useState, useEffect } from "react";
import { LuArrowUp } from "react-icons/lu";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-8 right-8 z-[100] p-4 rounded-full bg-primary text-primary-foreground shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none",
      )}
      aria-label="Voltar ao topo"
    >
      <LuArrowUp className="w-6 h-6 transition-transform group-hover:-translate-y-1" />
      <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping -z-10 group-hover:block hidden" />
    </button>
  );
}
