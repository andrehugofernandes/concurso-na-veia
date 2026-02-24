"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface HeaderStateContextType {
  isStickyNavPinned: boolean;
  setIsStickyNavPinned: (pinned: boolean) => void;
  isTemporaryHeaderVisible: boolean;
  setIsTemporaryHeaderVisible: (visible: boolean) => void;
}

const HeaderStateContext = createContext<HeaderStateContextType | undefined>(
  undefined,
);

export function HeaderStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isStickyNavPinned, setIsStickyNavPinned] = useState(false);
  const [isTemporaryHeaderVisible, setIsTemporaryHeaderVisible] =
    useState(false);
  const pathname = usePathname();

  // Reset state on navigation
  useEffect(() => {
    setIsStickyNavPinned(false);
    setIsTemporaryHeaderVisible(false);
  }, [pathname]);

  // Reset temporary visibility when unpinned
  useEffect(() => {
    if (!isStickyNavPinned) {
      setIsTemporaryHeaderVisible(false);
    }
  }, [isStickyNavPinned]);

  return (
    <HeaderStateContext.Provider
      value={{
        isStickyNavPinned,
        setIsStickyNavPinned,
        isTemporaryHeaderVisible,
        setIsTemporaryHeaderVisible,
      }}
    >
      {children}
    </HeaderStateContext.Provider>
  );
}

export function useHeaderState() {
  const context = useContext(HeaderStateContext);
  if (context === undefined) {
    throw new Error("useHeaderState must be used within a HeaderStateProvider");
  }
  return context;
}
