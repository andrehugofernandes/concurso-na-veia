export const getColor = (colorName: string) => {
    const colors: Record<string, string> = {
        red: '#ef4444',
        blue: '#3b82f6',
        green: '#22c55e',
        yellow: '#eab308',
        purple: '#a855f7',
        orange: '#f97316',
    };
    return colors[colorName] || colorName;
};

export const getContrastColor = (hex: string) => {
    // Mock simple contrast
    return '#ffffff';
};

export function hexToRgba(hex: string, alpha: number = 1): string {
  // Remove o hash caso exista
  const cleanHex = hex.replace("#", "");

  let r = 0, g = 0, b = 0;
  if (cleanHex.length === 3) {
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
  } else if (cleanHex.length === 6) {
    r = parseInt(cleanHex.substring(0, 2), 16);
    g = parseInt(cleanHex.substring(2, 4), 16);
    b = parseInt(cleanHex.substring(4, 6), 16);
  }

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
