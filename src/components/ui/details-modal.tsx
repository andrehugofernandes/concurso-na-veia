'use client';

import { ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, AlertCircle } from 'lucide-react';

interface DetailField {
  label: string;
  value: string | ReactNode;
  fullWidth?: boolean;
}

interface DetailSection {
  title: string;
  fields: DetailField[];
}

interface DetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  icon?: ReactNode;
  sections: DetailSection[];
  filePath?: string;
  errorMessage?: string;
  onDownload?: () => void;
  downloadLabel?: string;
  showDownloadButton?: boolean;
}

export function DetailsModal({
  open,
  onOpenChange,
  title,
  description,
  icon,
  sections,
  filePath,
  errorMessage,
  onDownload,
  downloadLabel = 'Baixar PDF',
  showDownloadButton = true,
}: DetailsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col bg-white dark:bg-gradient-to-br dark:from-[#1f1f1f] dark:via-[#151515] dark:to-[#101010] border-gray-200 dark:border-gray-700">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            {icon}
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="space-y-6 mt-4 overflow-y-auto flex-1 pr-2">
          {/* Seções de Informações */}
          {sections.map((section, sectionIndex) => (
            <Card key={sectionIndex} className="border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-base">{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  {section.fields.map((field, fieldIndex) => (
                    <div
                      key={fieldIndex}
                      className={field.fullWidth ? 'col-span-2' : ''}
                    >
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {field.label}
                      </p>
                      {typeof field.value === 'string' ? (
                        <p className="text-sm text-gray-900 dark:text-white">
                          {field.value}
                        </p>
                      ) : (
                        field.value
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Caminho do Arquivo */}
          {filePath && (
            <Card className="border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-base">Localização do Arquivo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-3">
                  <p className="text-sm font-mono text-gray-900 dark:text-white break-all">
                    {filePath}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Mensagem de Erro */}
          {errorMessage && (
            <Card className="border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10">
              <CardHeader>
                <CardTitle className="text-base text-red-800 dark:text-red-300 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Mensagem de Erro
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-red-100 dark:bg-red-900/20 rounded-md p-3">
                  <p className="text-sm font-mono text-red-900 dark:text-red-200 whitespace-pre-wrap">
                    {errorMessage}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

        </div>

        {/* Botões de Ação - Fixos na base */}
        <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0 bg-white dark:bg-gray-900">
          {showDownloadButton && onDownload && (
            <Button
              onClick={() => {
                onDownload();
                onOpenChange(false);
              }}
              className="gap-2 bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white"
            >
              <Download className="h-4 w-4" />
              {downloadLabel}
            </Button>
          )}
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="gap-2 border-gray-200 dark:border-gray-600"
          >
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
