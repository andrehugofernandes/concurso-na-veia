"use client";

import React, { useState, useEffect } from "react";
import { LuArrowUp } from "react-icons/lu";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [side, setSide] = useState<"left" | "right">("right");

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    const handleSideChange = (e: Event) => {
      setSide((e as CustomEvent<{ side: "left" | "right" }>).detail.side);
    };

    window.addEventListener("scroll", toggleVisibility);
    window.addEventListener("scroll-to-top-side", handleSideChange);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      window.removeEventListener("scroll-to-top-side", handleSideChange);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-[106px] md:bottom-8 z-[100] p-2.5 md:p-4 rounded-full bg-primary text-primary-foreground shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 group cursor-pointer flex items-center justify-center",
        side === "right"
          ? "right-4 md:right-8 left-auto"
          : "left-4 md:left-8 right-auto",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none",
      )}
      aria-label="Voltar ao topo"
    >
      <LuArrowUp className="w-4 h-4 md:w-6 md:h-6 transition-transform group-hover:-translate-y-1 pointer-events-none" />
      <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping -z-10 group-hover:block hidden pointer-events-none" />
    </button>
  );
}
