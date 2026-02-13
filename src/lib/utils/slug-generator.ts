/**
 * Gera um slug a partir de um título
 * Remove acentuação, converte para minúsculas e separa palavras com hífen
 *
 * @example
 * generateSlug("Meu Artigo Incrível") // "meu-artigo-incrivel"
 * generateSlug("Hello World!") // "hello-world"
 */
export function generateSlug(title: string): string {
  return title
    .normalize('NFD') // Normalizar para decomposição
    .replace(/[\u0300-\u036f]/g, '') // Remove acentuação
    .toLowerCase() // Converter para minúsculas
    .trim() // Remover espaços nas extremidades
    .replace(/\s+/g, '-') // Espaços para hífen
    .replace(/[^\w-]/g, '') // Remove caracteres especiais
    .replace(/-+/g, '-'); // Múltiplos hífens para um único
}

/**
 * Valida se um slug é válido
 * Deve conter apenas letras, números e hífens
 */
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

/**
 * Garante que um slug é único adicionando um sufixo numérico se necessário
 * @example
 * ensureUniqueSlug("meu-artigo", ["meu-artigo"]) // "meu-artigo-1"
 * ensureUniqueSlug("novo-post", ["outro-post"]) // "novo-post"
 */
export function ensureUniqueSlug(slug: string, existingSlugs: string[]): string {
  if (!existingSlugs.includes(slug)) {
    return slug;
  }

  let counter = 1;
  let newSlug = `${slug}-${counter}`;

  while (existingSlugs.includes(newSlug)) {
    counter++;
    newSlug = `${slug}-${counter}`;
  }

  return newSlug;
}
