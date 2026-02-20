import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes"
import { useTheme as useSkinTheme } from "@/lib/contexts/theme-context"

export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export function useTheme() {
    const nextTheme = useNextTheme();
    const skinTheme = useSkinTheme();

    return {
        ...nextTheme,
        ...skinTheme
    };
}
