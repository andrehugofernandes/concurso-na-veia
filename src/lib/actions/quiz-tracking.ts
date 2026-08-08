"use server";

import { createClient } from "@/lib/supabase/server";

export interface QuizAttemptRecord {
  aulaId?: string;
  moduloNumero: number;
  questaoId: string;
  pergunta: string;
  respostaUsuario: string; // Ex: "A", "B", "C", "D", "E"
  respostaCorreta: string; // Ex: "B"
  correto: boolean;
  materiaId?: string;
}

/**
 * Salva a tentativa do usuário em uma questão do quiz do módulo.
 * Registra no banco para alimentar o histórico e o motor de simulados de erros.
 */
export async function recordQuizAttempt(attempt: QuizAttemptRecord) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { success: false, error: "Usuário não autenticado" };

    // Tenta salvar na tabela user_quiz_attempts
    const { error: dbError } = await supabase.from("user_quiz_attempts").insert({
      user_id: user.id,
      aula_id: attempt.aulaId || null,
      modulo_numero: attempt.moduloNumero,
      questao_id: attempt.questaoId,
      pergunta: attempt.pergunta,
      resposta_usuario: attempt.respostaUsuario,
      resposta_correta: attempt.respostaCorreta,
      correto: attempt.correto,
      materia_id: attempt.materiaId || "geral",
    });

    // Atualiza estatísticas no perfil do usuário
    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("questoes_certas, questoes_erradas, questoes_geradas")
        .eq("id", user.id)
        .single();

      if (profile) {
        const certas = (profile.questoes_certas || 0) + (attempt.correto ? 1 : 0);
        const erradas = (profile.questoes_erradas || 0) + (attempt.correto ? 0 : 1);
        const total = certas + erradas;

        await supabase
          .from("profiles")
          .update({
            questoes_certas: certas,
            questoes_erradas: erradas,
            questoes_geradas: total,
          })
          .eq("id", user.id);
      }
    } catch (profErr) {
      // Fallback RPC se tabela tiver restrições
      try {
        if (attempt.correto) {
          await supabase.rpc("increment_profile_score", { p_user_id: user.id, p_correct: 1 });
        } else {
          await supabase.rpc("increment_profile_score", { p_user_id: user.id, p_incorrect: 1 });
        }
      } catch {
        // RPC fallback silencioso
      }
    }

    return { success: true };
  } catch (error: any) {
    console.warn("[recordQuizAttempt] Aviso ao salvar tentativa:", error?.message);
    return { success: false, error: error?.message };
  }
}

/**
 * Busca as questões mais erradas pelo usuário para direcionar os simulados focados.
 */
export async function getUserWeakQuestions(materiaId?: string) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return [];

    let query = supabase
      .from("user_quiz_attempts")
      .select("questao_id, pergunta, resposta_correta, materia_id, count")
      .eq("user_id", user.id)
      .eq("correto", false);

    if (materiaId) {
      query = query.eq("materia_id", materiaId);
    }

    const { data } = await query.limit(20);
    return data || [];
  } catch (error) {
    console.warn("[getUserWeakQuestions] Erro ao buscar pontos fracos:", error);
    return [];
  }
}
