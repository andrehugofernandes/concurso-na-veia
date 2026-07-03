export interface ThemeColors {
  primary: string;
  primaryHover: string;
  name: string;
}

export const availableThemes: Record<string, ThemeColors> = {
  orange: {
    primary: '#FF8500',
    primaryHover: '#E67600',
    name: 'Laranja'
  },
  blue: {
    primary: '#0037C1',
    primaryHover: '#002A91',
    name: 'Azul'
  },
  green: {
    primary: '#008C32',
    primaryHover: '#007129',
    name: 'Verde'
  },
  lightGreen: {
    primary: '#00DD4F',
    primaryHover: '#00C445',
    name: 'Verde Claro'
  },
  yellow: {
    primary: '#FDC300',
    primaryHover: '#E4B000',
    name: 'Amarelo'
  },
  lightBlue: {
    primary: '#00BDFF',
    primaryHover: '#00A8E6',
    name: 'Azul Claro'
  }
};

export const defaultTheme = 'blue';

export const isLightColor = (color: string): boolean => {
  const hex = color.replace('#', '').toLowerCase();
  // Exceção para o laranja escuro (#FF8500) para garantir contraste com texto branco
  if (hex === 'ff8500') return false;

  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return brightness > 128;
};

// Helper para converter hex para HSL (valores separados por espaço para o Tailwind)
export const hexToHsl = (hex: string): string => {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rNorm:
        h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
        break;
      case gNorm:
        h = (bNorm - rNorm) / d + 2;
        break;
      case bNorm:
        h = (rNorm - gNorm) / d + 4;
        break;
    }
    h /= 6;
  }
  return `${(h * 360).toFixed(1)} ${(s * 100).toFixed(1)}% ${(l * 100).toFixed(1)}%`;
};

// Helper para converter hex para RGB no formato "R, G, B" para uso com rgba()
export const hexToRgbValues = (hex: string): string => {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) return "15, 23, 42";
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
};
