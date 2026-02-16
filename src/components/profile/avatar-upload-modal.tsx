'use client';

import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { Upload, Image as ImageIcon, User, X, Loader2 } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

interface AvatarUploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpload: (file: File) => Promise<{ success: boolean; error?: string }>;
    currentAvatarUrl?: string | null;
}

export function AvatarUploadModal({
    isOpen,
    onClose,
    onUpload,
    currentAvatarUrl
}: AvatarUploadModalProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const handleFileSelect = (file: File) => {
        setError(null);

        // Validar tipo
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
            setError('Tipo de arquivo não suportado. Use JPG, PNG ou WebP');
            return;
        }

        // Validar tamanho (2MB)
        if (file.size > 2 * 1024 * 1024) {
            setError('Arquivo muito grande. Tamanho máximo: 2MB');
            return;
        }

        setSelectedFile(file);

        // Criar preview (apenas no browser)
        if (typeof window !== 'undefined' && typeof FileReader !== 'undefined') {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        setUploading(true);
        setError(null);

        try {
            const result = await onUpload(selectedFile);

            if (result.success) {
                toast({
                    title: 'Sucesso',
                    description: 'Foto de perfil atualizada!',
                });
                onClose();
                setSelectedFile(null);
                setPreviewUrl(null);
            } else {
                setError(result.error || 'Erro ao fazer upload');
                toast({
                    title: 'Erro',
                    description: result.error || 'Falha no upload',
                    variant: 'destructive',
                });
            }
        } catch (err: any) {
            setError(err.message || 'Erro inesperado');
        } finally {
            setUploading(false);
        }
    };

    const handleClose = () => {
        if (!uploading) {
            onClose();
            setSelectedFile(null);
            setPreviewUrl(null);
            setError(null);
        }
    };

    return (
        <Sheet open={isOpen} onOpenChange={handleClose}>
            <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto p-0 bg-background border-l">
                {/* Header */}
                <div className="flex items-center justify-between w-full p-6 relative bg-primary text-primary-foreground">
                    <div className="flex items-center space-x-3">
                        <Badge className="h-8 w-8 rounded-full p-0 flex items-center justify-center bg-white/20 hover:bg-white/20">
                            <User className="h-4 w-4 text-white" />
                        </Badge>
                        <SheetTitle className="text-lg font-semibold text-white">
                            Alterar Foto de Perfil
                        </SheetTitle>
                    </div>
                    <button
                        onClick={handleClose}
                        disabled={uploading}
                        className="absolute right-6 top-6 text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded-sm p-1"
                        aria-label="Fechar"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Preview Circle */}
                    <div className="flex justify-center py-4">
                        <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-muted shadow-sm">
                            <Image
                                src={previewUrl || currentAvatarUrl || `https://ui-avatars.com/api/?name=User&background=random`}
                                alt="Preview"
                                fill
                                className="object-cover"
                                unoptimized // Since we might use external URLs
                            />
                            {uploading && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10 transition-opacity">
                                    <Loader2 className="h-8 w-8 text-white animate-spin" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2 text-center">
                        <h3 className="font-medium text-lg">Faça upload de uma nova foto</h3>
                        <p className="text-sm text-muted-foreground">Sua foto será visível para todos os administradores.</p>
                    </div>

                    {/* Drop Zone */}
                    <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onClick={() => !uploading && fileInputRef.current?.click()}
                        onKeyDown={(e) => {
                            if ((e.key === 'Enter' || e.key === ' ') && !uploading) {
                                e.preventDefault();
                                fileInputRef.current?.click();
                            }
                        }}
                        role="button"
                        tabIndex={0}
                        aria-label="Área para selecionar ou arrastar arquivo"
                        className={`
              relative group
              border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200
              ${isDragging
                                ? 'border-primary bg-primary/5 scale-[1.02]'
                                : 'border-border hover:border-primary/50 hover:bg-muted/50'
                            }
              ${uploading ? 'pointer-events-none opacity-60' : ''}
            `}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={handleInputChange}
                            aria-label="Selecionar arquivo de imagem"
                            className="hidden"
                            disabled={uploading}
                        />

                        <div className="flex flex-col items-center gap-3">
                            {selectedFile ? (
                                <>
                                    <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                        <ImageIcon className="h-6 w-6 text-green-600 dark:text-green-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-foreground truncate max-w-[200px]">
                                            {selectedFile.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {(selectedFile.size / 1024).toFixed(2)} KB
                                        </p>
                                    </div>
                                    {!uploading && (
                                        <Badge variant="outline" className="mt-2 text-xs font-normal border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/20 dark:text-green-400">
                                            Pronto para enviar
                                        </Badge>
                                    )}
                                </>
                            ) : (
                                <>
                                    <div className={`h-12 w-12 rounded-full flex items-center justify-center transition-colors ${isDragging ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'}`}>
                                        <Upload className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-foreground">
                                            Clique para selecionar
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            ou arraste e solte aqui
                                        </p>
                                    </div>
                                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mt-2">
                                        JPG, PNG ou WebP (máx. 2MB)
                                    </p>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-2 animate-in fade-in slide-in-from-top-2">
                            <div className="h-5 w-5 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <X className="h-3 w-3 text-destructive" />
                            </div>
                            <p className="text-xs text-destructive font-medium leading-5">{error}</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 p-6 bg-muted/20 border-t mt-auto">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleClose}
                        disabled={uploading}
                        className="w-full sm:w-auto"
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="button"
                        onClick={handleUpload}
                        disabled={!selectedFile || uploading}
                        className="w-full sm:w-auto min-w-[120px]"
                    >
                        {uploading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Enviando...
                            </>
                        ) : (
                            'Salvar Foto'
                        )}
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
