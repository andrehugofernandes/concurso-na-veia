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
