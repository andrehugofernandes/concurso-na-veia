// Utilitários de Áudio Nativo para o PetroLingo (Text-to-Speech + Web Audio API SFX)

let currentGenderToggle: 'female' | 'male' = 'female';

/**
 * Garante o carregamento assíncrono de vozes do sistema operacional/navegador
 */
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}

/**
 * Busca vozes em inglês (Feminina ou Masculina) disponíveis no dispositivo
 */
export const getEnglishVoice = (gender?: 'female' | 'male'): { voice: SpeechSynthesisVoice | null; pitch: number } => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return { voice: null, pitch: 1.0 };
  }

  const voices = window.speechSynthesis.getVoices();
  const englishVoices = voices.filter(v => v.lang.startsWith('en'));

  const targetGender = gender || currentGenderToggle;

  // Alterna o gênero para a próxima palavra/frase falada
  if (!gender) {
    currentGenderToggle = currentGenderToggle === 'female' ? 'male' : 'female';
  }

  if (targetGender === 'female') {
    const femaleVoice = englishVoices.find(v => 
      /female|zira|samantha|victoria|karen|jenny|ava|google.*us|google.*uk/i.test(v.name)
    ) || englishVoices[0] || null;

    return {
      voice: femaleVoice,
      pitch: 1.15 // Frequência ajustada para voz feminina limpa
    };
  } else {
    const maleVoice = englishVoices.find(v => 
      /male|david|mark|george|james|guy|alex|daniel|richard/i.test(v.name)
    ) || englishVoices.find(v => v !== englishVoices[0]) || englishVoices[0] || null;

    return {
      voice: maleVoice,
      pitch: 0.85 // Frequência ajustada para voz masculina grave
    };
  }
};

/**
 * Pronuncia qualquer texto em inglês alternando automaticamente entre vozes Masculina e Feminina
 */
export const speakEnglishText = (text: string, rate: number = 0.9, forcedGender?: 'female' | 'male') => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel(); // Cancela áudios em fila
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = rate; // Cadência didática

      const { voice, pitch } = getEnglishVoice(forcedGender);
      if (voice) {
        utterance.voice = voice;
      }
      utterance.pitch = pitch;

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error('Error in Text-To-Speech:', e);
    }
  }
};

/**
 * Toca um efeito sonoro de sucesso/match (Chime duplo estilo Duolingo)
 */
export const playMatchSuccessSound = () => {
  if (typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    // Arpejo de três notas harmônicas (C5 -> E5 -> G5)
    const notes = [523.25, 659.25, 783.99];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      gain.gain.setValueAtTime(0.12, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.22);
    });
  } catch (e) {
    // Ignorar restrições de som do navegador
  }
};

/**
 * Toca um efeito sonoro de erro sutil
 */
export const playErrorSound = () => {
  if (typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(130, now + 0.18);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.18);
  } catch (e) {
    // Ignorar restrições de som do navegador
  }
};

/**
 * Toca um efeito sonoro festivo de vitória/fanfarra ao concluir uma lição com sucesso (Estilo Duolingo Victory Fanfare)
 */
export const playVictoryFanfareSound = () => {
  if (typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    // Sequência festiva de 4 notas de vitória (C5 -> E5 -> G5 -> C6 com sustentação)
    const notes = [
      { freq: 523.25, duration: 0.14, delay: 0 },
      { freq: 659.25, duration: 0.14, delay: 0.12 },
      { freq: 783.99, duration: 0.14, delay: 0.24 },
      { freq: 1046.50, duration: 0.50, delay: 0.38 }
    ];

    notes.forEach(({ freq, duration, delay }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + delay);

      gain.gain.setValueAtTime(0.2, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + delay);
      osc.stop(now + delay + duration);
    });
  } catch (e) {
    // Ignorar
  }
};
