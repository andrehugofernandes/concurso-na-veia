"use client";

import { useState, useEffect } from "react";
import { checkInfinitePayPixStatusAction } from "@/lib/actions/infinitepay";
import { LuCopy, LuCheck, LuShieldCheck, LuX } from "react-icons/lu";

interface InfinitePayPixModalProps {
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

export function InfinitePayPixModal({ isOpen, onClose, onSuccess, pixData }: InfinitePayPixModalProps) {
  const [copied, setCopied] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    if (!isOpen || !pixData?.txid || isPaid) return;

    // Polling a cada 4 segundos para verificar liquidação do Pix na InfinitePay
    const interval = setInterval(async () => {
      setIsChecking(true);
      const res = await checkInfinitePayPixStatusAction(pixData.txid);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
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
            <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
              ✓
            </div>
            <h3 className="text-2xl font-black text-foreground">Pagamento Aprovado!</h3>
            <p className="text-sm text-muted-foreground">
              Seu pagamento Pix via InfinitePay foi confirmado com sucesso. Redirecionando...
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                <LuShieldCheck className="w-3.5 h-3.5" /> Pagamento Seguro InfinitePay (Pix)
              </span>
              <h3 className="text-2xl font-black text-foreground mt-2">
                Valor: R$ {pixData.valor.toFixed(2).replace(".", ",")}
              </h3>
              <p className="text-xs text-muted-foreground">
                Abra o app do seu banco, escaneie o QR Code ou copie o código Pix abaixo.
              </p>
            </div>

            {/* QR Code */}
            <div className="flex justify-center my-4">
              {pixData.imagemQrcode && pixData.imagemQrcode.length > 50 ? (
                <div className="p-3 bg-white rounded-2xl border border-border shadow-md">
                  <img
                    src={pixData.imagemQrcode.startsWith("data:") ? pixData.imagemQrcode : `data:image/png;base64,${pixData.imagemQrcode}`}
                    alt="QR Code Pix InfinitePay"
                    className="w-48 h-48 object-contain"
                  />
                </div>
              ) : (
                <div className="w-48 h-48 bg-muted rounded-2xl border border-dashed border-border flex flex-col items-center justify-center p-4 text-center">
                  <p className="text-xs text-muted-foreground">
                    Utilize o código Copia e Cola abaixo para efetuar o pagamento.
                  </p>
                </div>
              )}
            </div>

            {/* Código Copia e Cola */}
            <div className="space-y-2 text-left">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Código Pix (Copia e Cola)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={pixData.pixCopiaECola}
                  className="w-full bg-secondary text-foreground text-xs p-3 rounded-xl border border-border focus:outline-none select-all font-mono truncate"
                />
                <button
                  onClick={handleCopy}
                  className={`p-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shrink-0 ${
                    copied
                      ? "bg-green-500 text-white"
                      : "bg-primary text-primary-foreground hover:opacity-90"
                  }`}
                >
                  {copied ? (
                    <>
                      <LuCheck className="w-4 h-4" /> Copiado
                    </>
                  ) : (
                    <>
                      <LuCopy className="w-4 h-4" /> Copiar
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Polling Indicator */}
            <div className="pt-2 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Aguardando confirmação do pagamento...</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
