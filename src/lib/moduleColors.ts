/**
 * Sistema de Coloração de Módulos (1-10)
 * Paleta harmônica para identificação visual de módulos em aulas premium
 *
 * Cada módulo tem uma cor única que aparece em:
 * - ModuleBanner (fundo do banner)
 * - ModuleSectionHeader (número do módulo)
 * - CardCarousel (corIndicador)
 * - StickyModuleNav (badges de navegação no topo)
 */

/**
 * Cores Tailwind para cada módulo (1-10)
 */
const MODULE_COLORS = [
  "blue-500",    // 1
  "cyan-500",    // 2
  "emerald-500", // 3
  "teal-500",    // 4
  "violet-500",  // 5
  "amber-500",   // 6
  "orange-500",  // 7
  "red-500",     // 8
  "pink-500",    // 9
  "indigo-500"   // 10
] as const;

/**
 * Cores Hex para cada módulo (1-10)
 * Usar quando Tailwind não for disponível (SVG, canvas, etc)
 */
const MODULE_COLORS_HEX = [
  "#3b82f6",  // 1 - Azul
  "#06b6d4",  // 2 - Ciano
  "#10b981",  // 3 - Esmeralda
  "#14b8a6",  // 4 - Teal
  "#a78bfa",  // 5 - Violeta
  "#f59e0b",  // 6 - Âmbar
  "#f97316",  // 7 - Laranja
  "#ef4444",  // 8 - Vermelho
  "#ec4899",  // 9 - Rosa
  "#6366f1"   // 10 - Índigo
] as const;

/**
 * Variantes para ModuleBanner e ModuleSectionHeader
 */
const MODULE_VARIANTS = [
  "blue",
  "cyan",
  "emerald",
  "teal",
  "violet",
  "amber",
  "orange",
  "red",
  "pink",
  "indigo"
] as const;

export type ModuleVariant = typeof MODULE_VARIANTS[number];

/**
 * Nomes descritivos das cores para documentação
 */
const MODULE_COLOR_NAMES = [
  "Azul Primário",
  "Ciano",
  "Esmeralda",
  "Teal",
  "Violeta",
  "Âmbar",
  "Laranja",
  "Vermelho",
  "Rosa",
  "Índigo"
] as const;

/**
 * Retorna a cor Tailwind para um módulo (1-10)
 *
 * @param moduleIndex número do módulo (1-10)
 * @returns string da classe Tailwind (ex: "blue-500")
 *
 * @example
 * getModuleColor(1) → "blue-500"
 * getModuleColor(5) → "violet-500"
 */
export function getModuleColor(moduleIndex: number): string {
  if (moduleIndex < 1 || moduleIndex > 10) {
    console.warn(`⚠️ Módulo ${moduleIndex} inválido. Usando padrão "blue-500".`);
    return "blue-500";
  }
  return MODULE_COLORS[moduleIndex - 1];
}

/**
 * Retorna a cor Hex para um módulo (1-10)
 * Usar quando Tailwind não for disponível
 *
 * @param moduleIndex número do módulo (1-10)
 * @returns string hex (ex: "#3b82f6")
 *
 * @example
 * getModuleColorHex(3) → "#10b981"
 */
export function getModuleColorHex(moduleIndex: number): string {
  if (moduleIndex < 1 || moduleIndex > 10) {
    console.warn(`⚠️ Módulo ${moduleIndex} inválido. Usando padrão "#3b82f6".`);
    return "#3b82f6";
  }
  return MODULE_COLORS_HEX[moduleIndex - 1];
}

/**
 * Retorna a cor variant para ModuleBanner/ModuleSectionHeader
 *
 * @param moduleIndex número do módulo (1-10)
 * @returns string variant (ex: "blue", "cyan", etc)
 *
 * @example
 * getModuleVariant(7) → "orange"
 */
export function getModuleVariant(moduleIndex: number): ModuleVariant {
  if (moduleIndex < 1 || moduleIndex > 10) {
    console.warn(`⚠️ Módulo ${moduleIndex} inválido. Usando padrão "blue".`);
    return "blue";
  }
  return MODULE_VARIANTS[moduleIndex - 1] as ModuleVariant;
}

/**
 * Retorna o nome descritivo da cor para um módulo
 *
 * @param moduleIndex número do módulo (1-10)
 * @returns string nome (ex: "Azul Primário", "Laranja")
 *
 * @example
 * getModuleColorName(6) → "Âmbar"
 */
export function getModuleColorName(moduleIndex: number): string {
  if (moduleIndex < 1 || moduleIndex > 10) {
    return "Inválido";
  }
  return MODULE_COLOR_NAMES[moduleIndex - 1];
}

/**
 * Retorna a classe CSS completa para background color de um módulo
 *
 * @param moduleIndex número do módulo (1-10)
 * @param opacity opacidade (padrão: "500", ex: "400", "600", "700")
 * @returns string classe Tailwind (ex: "bg-blue-500")
 *
 * @example
 * getModuleBackgroundClass(1) → "bg-blue-500"
 * getModuleBackgroundClass(1, "400") → "bg-blue-400"
 */
export function getModuleBackgroundClass(
  moduleIndex: number,
  opacity: string = "500"
): string {
  const color = getModuleColor(moduleIndex).split("-")[0];
  return `bg-${color}-${opacity}`;
}

/**
 * Retorna a classe CSS completa para text color de um módulo
 *
 * @param moduleIndex número do módulo (1-10)
 * @param opacity opacidade (padrão: "500", ex: "400", "600", "700")
 * @returns string classe Tailwind (ex: "text-blue-500")
 *
 * @example
 * getModuleTextClass(1) → "text-blue-500"
 */
export function getModuleTextClass(
  moduleIndex: number,
  opacity: string = "500"
): string {
  const color = getModuleColor(moduleIndex).split("-")[0];
  return `text-${color}-${opacity}`;
}

/**
 * Retorna a classe CSS completa para border color de um módulo
 *
 * @param moduleIndex número do módulo (1-10)
 * @param opacity opacidade (padrão: "500")
 * @returns string classe Tailwind (ex: "border-blue-500")
 *
 * @example
 * getModuleBorderClass(4) → "border-teal-500"
 */
export function getModuleBorderClass(
  moduleIndex: number,
  opacity: string = "500"
): string {
  const color = getModuleColor(moduleIndex).split("-")[0];
  return `border-${color}-${opacity}`;
}

/**
 * Retorna a classe CSS para um indicador visual (ex: corIndicador)
 * Combine com `/10` para opacity dinâmica
 *
 * @param moduleIndex número do módulo (1-10)
 * @returns string classe Tailwind (ex: "bg-blue-500/10")
 *
 * @example
 * getModuleIndicatorClass(2) → "bg-cyan-500/10"
 */
export function getModuleIndicatorClass(moduleIndex: number): string {
  const color = getModuleColor(moduleIndex);
  return `bg-${color}/10`;
}

/**
 * Retorna um objeto com todas as informações de cor para um módulo
 * Útil para passar props dinamicamente
 *
 * @param moduleIndex número do módulo (1-10)
 * @returns objeto com todas as propriedades de cor
 *
 * @example
 * const colorInfo = getModuleColorInfo(3);
 * // {
 * //   index: 3,
 * //   tailwind: "emerald-500",
 * //   hex: "#10b981",
 * //   variant: "emerald",
 * //   name: "Esmeralda",
 * //   bgClass: "bg-emerald-500",
 * //   textClass: "text-emerald-500",
 * //   borderClass: "border-emerald-500"
 * // }
 */
export function getModuleColorInfo(moduleIndex: number) {
  return {
    index: moduleIndex,
    tailwind: getModuleColor(moduleIndex),
    hex: getModuleColorHex(moduleIndex),
    variant: getModuleVariant(moduleIndex),
    name: getModuleColorName(moduleIndex),
    bgClass: getModuleBackgroundClass(moduleIndex),
    textClass: getModuleTextClass(moduleIndex),
    borderClass: getModuleBorderClass(moduleIndex),
    indicatorClass: getModuleIndicatorClass(moduleIndex)
  };
}

/**
 * Valida se um índice de módulo é válido (1-10)
 *
 * @param moduleIndex número para validar
 * @returns boolean true se válido, false caso contrário
 *
 * @example
 * isValidModuleIndex(5) → true
 * isValidModuleIndex(15) → false
 */
export function isValidModuleIndex(moduleIndex: number): boolean {
  return moduleIndex >= 1 && moduleIndex <= 10;
}

/**
 * Retorna um array com todas as 10 cores em ordem
 * Útil para loops ou mapeamentos
 *
 * @returns array de 10 cores
 *
 * @example
 * getAllModuleColors() → ["blue-500", "cyan-500", "emerald-500", ...]
 */
export function getAllModuleColors(): string[] {
  return [...MODULE_COLORS];
}

/**
 * Retorna um array com todas as 10 cores em hex
 *
 * @returns array de 10 cores hex
 */
export function getAllModuleColorsHex(): string[] {
  return [...MODULE_COLORS_HEX];
}

/**
 * Retorna um array com todos os 10 variants
 *
 * @returns array de 10 variants
 */
export function getAllModuleVariants(): ModuleVariant[] {
  return [...MODULE_VARIANTS];
}

/**
 * Cria um mapa de módulo → cor para fácil lookup
 *
 * @returns objeto com índices 1-10 como chaves e cores como valores
 *
 * @example
 * const colorMap = createModuleColorMap();
 * colorMap[1] → "blue-500"
 * colorMap[10] → "indigo-500"
 */
export function createModuleColorMap(): Record<number, string> {
  const map: Record<number, string> = {};
  for (let i = 1; i <= 10; i++) {
    map[i] = getModuleColor(i);
  }
  return map;
}

/**
 * Cria um mapa de módulo → variant para fácil lookup
 *
 * @returns objeto com índices 1-10 como chaves e variants como valores
 */
export function createModuleVariantMap(): Record<number, ModuleVariant> {
  const map: Record<number, ModuleVariant> = {};
  for (let i = 1; i <= 10; i++) {
    map[i] = getModuleVariant(i);
  }
  return map;
}

/**
 * Log de debug com informações de todas as 10 cores
 * Use apenas em desenvolvimento
 *
 * @example
 * debugModuleColors()
 */
export function debugModuleColors(): void {
  console.log("🎨 Sistema de Coloração de Módulos:");
  console.log("====================================");
  for (let i = 1; i <= 10; i++) {
    const info = getModuleColorInfo(i);
    console.log(
      `Módulo ${i}: ${info.name} | Tailwind: ${info.tailwind} | Hex: ${info.hex}`
    );
  }
  console.log("====================================");
}
