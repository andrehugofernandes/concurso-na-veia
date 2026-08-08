"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminTenantsRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/cursos");
  }, [router]);

  return (
    <div className="p-12 text-center text-muted-foreground font-medium">
      Redirecionando para Gestão Centralizada de Concursos & Cursos...
    </div>
  );
}
