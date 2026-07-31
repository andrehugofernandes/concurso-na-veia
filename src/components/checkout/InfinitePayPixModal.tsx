"use client";

import { useState, useEffect } from "react";
import QRCode from "qrcode";
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
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");

  useEffect(() => {
    if (pixData?.pixCopiaECola) {
      console.log("[InfinitePayPixModal] Gerando QR Code local via biblioteca 'qrcode'...");
      QRCode.toDataURL(pixData.pixCopiaECola, {
        width: 300,
        margin: 1,
        color: {
          dark: "#0f172a",
          light: "#ffffff",
        },
      })
        .then((url) => {
          setQrCodeDataUrl(url);
          console.log("[InfinitePayPixModal] ✅ QR Code local gerado com sucesso!");
        })
        .catch((err) => {
          console.error("[InfinitePayPixModal Error] Falha ao gerar QR Code local:", err);
        });
    }
  }, [pixData?.pixCopiaECola]);

  useEffect(() => {
    if (!isOpen || !pixData?.txid || isPaid) return;

    // Polling a cada 4 segundos para verificar liquidação do Pix na InfinitePay
    const interval = setInterval(async () => {
      setIsChecking(true);
      console.log(`[InfinitePayPixModal] Verificando status do Pix (txid: ${pixData.txid})...`);
      const res = await checkInfinitePayPixStatusAction(pixData.txid);
      setIsChecking(false);

      if (res.paid) {
        console.log(`[InfinitePayPixModal] ✅ Pix Aprovado (txid: ${pixData.txid})!`);
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

  // Priorizar imagem local de alta definição Data URL, ou imagem vinda da API
  const finalQrImage = qrCodeDataUrl || pixData.imagemQrcode;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-card border border-border rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 text-center overflow-hidden">
        {/* Botão Fechar no Canto Superior Direito */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Fechar Modal"
          className="absolute top-4 right-4 z-20 text-muted-foreground hover:text-foreground transition p-2 rounded-full hover:bg-muted/80"
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
            {/* Cabeçalho com Spacing Limpo sem Sobreposição */}
            <div className="pt-2 space-y-3">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  <LuShieldCheck className="w-4 h-4 shrink-0" /> Pagamento Seguro InfinitePay (Pix)
                </span>
              </div>

              <div>
                <h3 className="text-3xl font-black text-foreground tracking-tight">
                  Valor: R$ {pixData.valor.toFixed(2).replace(".", ",")}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Abra o app do seu banco, escaneie o QR Code ou copie o código Pix abaixo.
                </p>
              </div>
            </div>

            {/* Container do QR Code */}
            <div className="flex justify-center my-3">
              {finalQrImage ? (
                <div className="p-3 bg-white rounded-2xl border border-border shadow-lg inline-block">
                  <img
                    src={finalQrImage}
                    alt="QR Code Pix InfinitePay"
                    className="w-44 h-44 sm:w-48 sm:h-48 object-contain"
                  />
                </div>
              ) : (
                <div className="w-48 h-48 bg-muted rounded-2xl border border-dashed border-border flex flex-col items-center justify-center p-4 text-center">
                  <p className="text-xs text-muted-foreground">
                    Gerando QR Code Pix...
                  </p>
                </div>
              )}
            </div>

            {/* Código Copia e Cola */}
            <div className="space-y-2 text-left pt-1">
              <label className="text-[11px] font-extrabold text-muted-foreground uppercase tracking-wider">
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
                  type="button"
                  className={`px-4 py-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shrink-0 shadow-md ${
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

            {/* Status Indicator */}
            <div className="pt-2 flex items-center justify-center gap-2 text-xs font-medium text-muted-foreground">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>Aguardando confirmação do pagamento...</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
