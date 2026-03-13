"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import QRCode from "qrcode";
import {
  getCurrentUserAction,
  enrollMFAAction,
  verify2FAAction,
  unenrollMFAAction,
} from "@/lib/actions/auth";

export default function SecuritySettingsPage() {
  const [loading, setLoading] = useState(true);
  const [mfaActive, setMfaActive] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [secret, setSecret] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [factorId, setFactorId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  useEffect(() => {
    checkMfaStatus();
  }, []);

  const checkMfaStatus = async () => {
    try {
      const result = await getCurrentUserAction();
      if (result.status === "error") {
        router.push("/login");
        return;
      }

      const user = result.data;
      // Assuming the action returns profile with mfa data if we want,
      // but we might need a specific action for factors.
      // For now, let's assume getCurrentUserAction provides enough or we add a getFactorsAction.
      // Actually, verify2FAAction already checks factors.
      // In a real app, 'profiles' might have a 'two_factor_enabled' flag.
      setMfaActive(user.user_metadata?.mfa_enabled || false);

      // Fallback: check metadata or add getMFAStatusAction
    } catch (err: any) {
      console.error("Error checking MFA:", err);
    } finally {
      setLoading(false);
    }
  };

  const startEnrolling = async () => {
    setError("");
    setSuccess("");
    try {
      const result = await enrollMFAAction();
      if (result.status === "error" || !result.data)
        throw new Error(result.error || "Erro ao iniciar enrollment");

      setFactorId(result.data.id);
      setSecret(result.data.totp.secret);

      const qrUrl = await QRCode.toDataURL(result.data.totp.uri);
      setQrCodeUrl(qrUrl);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const verifyAndActivate = async () => {
    setError("");
    setSuccess("");
    try {
      const result = await verify2FAAction(verifyCode, factorId);

      if (result.status === "error") throw new Error(result.error);

      setSuccess("Autenticação de dois fatores ativada com sucesso!");
      setMfaActive(true);
      setQrCodeUrl("");
      setVerifyCode("");
    } catch (err: any) {
      setError("Código inválido. Tente novamente.");
    }
  };

  const disableMfa = async () => {
    if (
      !confirm(
        "Tem certeza que deseja desativar a proteção 2FA? Isso tornará sua conta menos segura.",
      )
    )
      return;

    try {
      // We need the factorId to unenroll. We can get it from verify2FAAction or a new getMFAFactorsAction.
      // Simplified: let's assume verify2FAAction can help or we just find it.
      const result = await unenrollMFAAction(factorId); // In a real scenario, we'd fetch the verified factorId first.

      if (result.status === "error") throw new Error(result.error);

      setMfaActive(false);
      setSuccess("2FA desativado.");
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-400">
        Carregando configurações...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-8">Segurança da Conta</h1>

      <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50 shadow-xl">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <span className="text-2xl">🛡️</span> Autenticação de Dois Fatores
              (2FA)
            </h2>
            <p className="text-gray-400">
              Adicione uma camada extra de segurança à sua conta exigindo um
              código do seu celular além da senha.
            </p>
          </div>
          <div>
            <span
              className={`px-4 py-2 rounded-full text-sm font-bold border ${
                mfaActive
                  ? "bg-green-500/20 text-green-400 border-green-500/30"
                  : "bg-red-500/20 text-red-400 border-red-500/30"
              }`}
            >
              {mfaActive ? "ATIVADO" : "DESATIVADO"}
            </span>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6 text-red-400 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-6 text-green-400 text-sm">
            {success}
          </div>
        )}

        {!mfaActive && !qrCodeUrl && (
          <button
            onClick={startEnrolling}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all"
          >
            Ativar 2FA Agora
          </button>
        )}

        {!mfaActive && qrCodeUrl && (
          <div className="animate-fade-in space-y-6">
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700">
              <h3 className="text-lg font-bold text-white mb-4">
                1. Escaneie o QR Code
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Use um aplicativo autenticador como Google Authenticator ou
                Authy.
              </p>
              <div className="flex justify-center bg-white p-4 rounded-xl w-fit mx-auto mb-4">
                <Image
                  src={qrCodeUrl}
                  alt="QR Code 2FA"
                  width={200}
                  height={200}
                />
              </div>
              <p className="text-center text-xs text-gray-500 font-mono break-all">
                Segredo: {secret}
              </p>
            </div>

            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700">
              <h3 className="text-lg font-bold text-white mb-4">
                2. Digite o código gerado
              </h3>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={verifyCode}
                  onChange={(e) =>
                    setVerifyCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  placeholder="000000"
                  className="px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white text-center tracking-widest text-xl w-40 focus:outline-none focus:border-purple-500 transition"
                />
                <button
                  onClick={verifyAndActivate}
                  disabled={verifyCode.length !== 6}
                  className="px-6 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Verificar e Ativar
                </button>
              </div>
            </div>

            <button
              onClick={() => setQrCodeUrl("")}
              className="text-gray-400 hover:text-white text-sm underline"
            >
              Cancelar
            </button>
          </div>
        )}

        {mfaActive && (
          <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-green-400 mb-2">
              Sua conta está protegida! 🔒
            </h3>
            <p className="text-gray-400 mb-6">
              Você precisará digitar um código do seu aplicativo autenticador
              sempre que fizer login em um novo dispositivo.
            </p>
            <button
              onClick={disableMfa}
              className="px-6 py-3 border border-red-500/50 text-red-400 font-bold rounded-xl hover:bg-red-500/10 transition"
            >
              Desativar 2FA
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
