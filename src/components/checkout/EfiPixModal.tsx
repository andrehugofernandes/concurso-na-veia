"use client";

import { useState, useEffect } from "react";
import { checkEfiPixStatusAction } from "@/lib/actions/efi";
import { LuCopy, LuCheck, LuQrCode, LuLoader, LuShieldCheck, LuX } from "react-icons/lu";

interface EfiPixModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  pixData: {
    txid: string;
    pixCopiaECola: string;
    imagemQrcode?: string;
    valor: number;
    expiracao?: number;
  } | null;
}

export function EfiPixModal({ isOpen, onClose, onSuccess, pixData }: EfiPixModalProps) {
  const [copied, setCopied] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    if (!isOpen || !pixData?.txid || isPaid) return;

    // Polling a cada 4 segundos para checar se o Pix foi pago
    const interval = setInterval(async () => {
      setIsChecking(true);
      const res = await checkEfiPixStatusAction(pixData.txid);
      setIsChecking(false);

      if (res.paid) {
        setIsPaid(true);
        clearInterval(interval);
        setTimeout(() => {
          if (onSuccess) onSuccess();
        }, 2000);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isOpen, pixData?.txid, isPaid, onSuccess]);

  if (!isOpen || !pixData) return null;

  const handleCopy = () => {
    if (pixData.pixCopiaECola) {
      navigator.clipboard.writeText(pixData.pixCopiaECola);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-card border border-border rounded-3xl p-6 shadow-2xl space-y-5 text-center">
        {/* Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition p-1"
        >
          <LuX className="w-5 h-5" />
        </button>

        {isPaid ? (
          <div className="py-8 space-y-4 animate-in zoom-in duration-300">
            <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto text-3xl">
              ✓
            </div>
            <h3 className="text-2xl font-black text-foreground">Pagamento Confirmado!</h3>
            <p className="text-sm text-muted-foreground">
              Seu pagamento PIX foi aprovado com sucesso. Redirecionando...
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-500/10 text-green-500 border border-green-500/20">
                <LuShieldCheck className="w-3.5 h-3.5" /> Pagamento Seguro por PIX
              </span>
              <h3 className="text-xl font-black text-foreground mt-2">
                Valor: R$ {pixData.valor.toFixed(2).replace(".", ",")}
              </h3>
              <p className="text-xs text-muted-foreground">
                Abra o app do seu banco e escaneie o QR Code ou copie o código abaixo.
              </p>
            </div>

            {/* QR Code */}
            <div className="flex justify-center my-4">
              {pixData.imagemQrcode ? (
                <div className="p-3 bg-white rounded-2xl border border-border shadow-md">
                  <img
                    src={pixData.imagemQrcode.startsWith("data:") ? pixData.imagemQrcode : `data:image/png;base64,${pixData.imagemQrcode}`}
                    alt="QR Code Pix"
                    className="w-48 h-48 object-contain"
                  />
                </div>
              ) : (
                <div className="w-48 h-48 bg-accent/40 rounded-2xl flex flex-col items-center justify-center text-muted-foreground text-xs p-4">
                  <LuQrCode className="w-10 h-10 mb-2 opacity-50" />
                  Use o código Pix Copia e Cola abaixo
                </div>
              )}
            </div>

            {/* Pix Copia e Cola */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider text-left">
                Código Pix Copia e Cola
              </label>
              <div className="flex items-center gap-2 bg-background border border-border rounded-xl p-2">
                <input
                  type="text"
                  readOnly
                  value={pixData.pixCopiaECola}
                  className="bg-transparent text-xs text-foreground font-mono flex-1 outline-none truncate px-1"
                />
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 bg-primary text-primary-foreground px-3 py-1.5 rounded-lg font-bold text-xs hover:brightness-110 active:scale-95 transition-all flex-shrink-0"
                >
                  {copied ? (
                    <>
                      <LuCheck className="w-3.5 h-3.5" /> Copiado!
                    </>
                  ) : (
                    <>
                      <LuCopy className="w-3.5 h-3.5" /> Copiar
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Status Indicator */}
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2">
              <LuLoader className={`w-3.5 h-3.5 ${isChecking ? "animate-spin text-primary" : "opacity-40"}`} />
              <span>Aguardando confirmação do banco...</span>
            </div>

            {/* Voltar para Cartão */}
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 mt-3 rounded-xl border border-border text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all flex items-center justify-center gap-2"
            >
              ← Voltar para opções de pagamento (Cartão / PIX)
            </button>
          </>
        )}
      </div>
    </div>
  );
}
