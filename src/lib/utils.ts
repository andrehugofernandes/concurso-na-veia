export const calcularNivel = (xp: number): string => {
  if (xp < 1000) return 'Estagiário';
  if (xp < 3000) return 'Técnico Júnior';
  if (xp < 6000) return 'Técnico Pleno';
  if (xp < 10000) return 'Técnico Sênior';
  return 'APROVADO! 🎉';
};

export const formatarTempo = (segundos: number): string => {
  const mins = Math.floor(segundos / 60);
  const secs = segundos % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const salvarUsuario = (usuario: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('petrobrasQuestAI', JSON.stringify(usuario));
  }
};

export const carregarUsuario = (): any | null => {
  if (typeof window !== 'undefined') {
    const dados = localStorage.getItem('petrobrasQuestAI');
    return dados ? JSON.parse(dados) : null;
  }
  return null;
};
