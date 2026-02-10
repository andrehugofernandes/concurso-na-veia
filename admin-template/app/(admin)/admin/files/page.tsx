'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { FileUploadForm } from "@/components/admin/forms/file-upload-form";

const cardStyle = "shadow-lg rounded-lg border-none overflow-hidden bg-white dark:bg-gray-800";

export default function FilesPage() {
  const [openUpload, setOpenUpload] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Gerenciar Arquivos
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Upload e organização de documentos do sistema
          </p>
        </div>
        <Button
          onClick={() => setOpenUpload(true)}
          className="text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] transition-colors"
          aria-label="Abrir modal de upload de arquivo"
        >
          <Upload className="h-4 w-4 mr-2" /> Upload de Arquivo
        </Button>
      </div>
      
      <Card className={cn("col-span-4", cardStyle)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
          <div>
            <CardTitle>Lista de Arquivos</CardTitle>
            <CardDescription>Gerencie os documentos do sistema</CardDescription>
          </div>
          <FileText className="h-5 w-5 text-green-600" />
        </CardHeader>
        <CardContent className="p-6 pt-2">
          <div className="p-8 text-center text-gray-500">
            <p>Página de gerenciamento de arquivos em desenvolvimento</p>
            <p className="text-sm mt-2">Implementação completa em breve</p>
          </div>
        </CardContent>
      </Card>

      <FileUploadForm open={openUpload} onClose={() => setOpenUpload(false)} />
    </div>
  );
}
