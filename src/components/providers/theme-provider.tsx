"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export const useTheme = () => {
    const context = React.useContext(React.createContext({ theme: 'dark', setTheme: (theme: string) => { }, resolvedTheme: 'dark', themeColors: { primary: '#0037C1' } }));
    // Mock return to prevent crash if not wrapped
    return {
        theme: 'dark',
        setTheme: (t: string) => { },
        resolvedTheme: 'dark',
        themeColors: { primary: '#0037C1' },
        currentTheme: 'dark',
        isLightColor: (color: string) => false
    };
}
