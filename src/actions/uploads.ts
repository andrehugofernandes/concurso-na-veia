"use server";

import { createClient } from "@/lib/supabase/server";
import { uploadToFirebaseStorage } from "@/lib/services/firebase-storage";

export async function uploadTicketAttachmentAction(formData: FormData) {
  try {
    const file = formData.get("file") as File | null;
    if (!file) {
      return { status: "error", error: "Nenhum arquivo enviado" };
    }

    const supabase = await createClient();

    // Verify authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return { status: "error", error: "Usuário não autenticado" };
    }

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Firebase Storage
    const result = await uploadToFirebaseStorage(
      buffer,
      file.name,
      file.type
    );

    if (!result.success || !result.url) {
      console.error('❌ [uploadTicketAttachmentAction ERROR]:', result.error);
      return { status: "error", error: result.error || "Erro no upload da imagem" };
    }

    return { status: "success", data: { url: result.url } };
  } catch (error: any) {
    return { status: "error", error: error.message || "Erro interno no servidor ao fazer upload" };
  }
}

