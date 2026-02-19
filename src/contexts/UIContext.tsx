'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface UIContextType {
    pageTitle: string;
    setPageTitle: (title: string) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
    const [pageTitle, setPageTitleState] = useState<string>('');

    const setPageTitle = useCallback((title: string) => {
        setPageTitleState(title);
        // Opcional: Atualizar o document.title também
        if (typeof document !== 'undefined' && title) {
            document.title = `${title} - Petrobras Quest`;
        }
    }, []);

    return (
        <UIContext.Provider value={{ pageTitle, setPageTitle }}>
            {children}
        </UIContext.Provider>
    );
}

export function useUI() {
    const context = useContext(UIContext);
    if (context === undefined) {
        throw new Error('useUI must be used within a UIProvider');
    }
    return context;
}

/**
 * Hook utilitário para definir o título da página
 */
export function useSetPageTitle(title: string) {
    const { setPageTitle } = useUI();

    React.useEffect(() => {
        if (title) {
            setPageTitle(title);
        }
    }, [title, setPageTitle]);
}
