'use client';

import { Palette, Check } from 'lucide-react';
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { useTheme } from '@/components/providers/theme-provider';
import { availableThemes } from '@/lib/themes';

interface ThemeSwitcherProps {
  inDropdown?: boolean;
}

export function ThemeSwitcher({ inDropdown = true }: ThemeSwitcherProps) {
  const { currentTheme, setThemeColor } = useTheme();
  // A cor da bolinha é resolvida via globals.css usando [data-theme-color] + .dot-theme

  return (
    <>
      {inDropdown && (
        <>
          <DropdownMenuLabel className="flex items-center">
            <Palette className="mr-2 h-4 w-4" />
            <span>Temas</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
        </>
      )}
      
      {Object.keys(availableThemes).map((key) => {
        const theme = availableThemes[key];
        return (
        <DropdownMenuItem
          key={key}
          className="flex items-center justify-between cursor-pointer py-2"
          onClick={() => setThemeColor(key)}
        >
          <div className="flex items-center gap-2">
            <div className="dot-theme flex-shrink-0" aria-hidden data-theme-color={key} />
            <span>{theme.name}</span>
          </div>
          {currentTheme === key && <Check className="h-4 w-4 flex-shrink-0" />}
        </DropdownMenuItem>
        );
      })}
    </>
  );
}
