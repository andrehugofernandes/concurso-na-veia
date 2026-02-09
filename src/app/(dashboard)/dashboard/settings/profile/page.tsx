'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function ProfileSettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [nome, setNome] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [generatedPassword, setGeneratedPassword] = useState('');
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/login');
                return;
            }

            const { data: profile } = await supabase
                .from('profiles')
                .select('nome, avatar_url')
                .eq('id', user.id)
                .single();

            if (profile) {
                setNome(profile.nome || '');
                setAvatarUrl(profile.avatar_url || '');
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProfile = async () => {
        setSaving(true);
        setError('');
        setSuccess('');
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { error } = await supabase
                .from('profiles')
                .update({ nome, avatar_url: avatarUrl })
                .eq('id', user.id);

            if (error) throw error;
            setSuccess('Perfil atualizado com sucesso!');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleChangePassword = async () => {
        setError('');
        setSuccess('');

        if (newPassword !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }

        if (newPassword.length < 8) {
            setError('A senha deve ter no mínimo 8 caracteres.');
            return;
        }

        setSaving(true);
        try {
            const { error } = await supabase.auth.updateUser({
                password: newPassword,
            });

            if (error) throw error;

            setSuccess('Senha alterada com sucesso!');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const generateStrongPassword = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let password = '';
        for (let i = 0; i < 16; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setGeneratedPassword(password);
        setNewPassword(password);
        setConfirmPassword(password);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setSuccess('Senha copiada para a área de transferência!');
    };

    if (loading) {
        return <div className="p-8 text-center text-gray-400">Carregando...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 pt-8">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/dashboard" className="text-gray-400 hover:text-white transition">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </Link>
                <h1 className="text-3xl font-bold text-white">Configurações do Perfil</h1>
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

            {/* Profile Section */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50 shadow-xl mb-8">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="text-2xl">👤</span> Informações do Perfil
                </h2>

                <div className="space-y-6">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-slate-900 text-3xl font-bold">
                            {avatarUrl ? (
                                <img src={avatarUrl} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                            ) : (
                                nome.charAt(0).toUpperCase()
                            )}
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                URL da Foto
                            </label>
                            <input
                                type="url"
                                value={avatarUrl}
                                onChange={(e) => setAvatarUrl(e.target.value)}
                                placeholder="https://exemplo.com/sua-foto.jpg"
                                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition"
                            />
                            <p className="text-xs text-gray-500 mt-1">Cole a URL de uma imagem pública</p>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Nome Completo
                        </label>
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition"
                        />
                    </div>

                    <button
                        onClick={handleUpdateProfile}
                        disabled={saving}
                        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50"
                    >
                        {saving ? 'Salvando...' : 'Salvar Alterações'}
                    </button>
                </div>
            </div>

            {/* Password Section */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50 shadow-xl">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="text-2xl">🔑</span> Alterar Senha
                </h2>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Nova Senha
                        </label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Confirmar Nova Senha
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition"
                        />
                    </div>

                    {/* Password Generator */}
                    <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-gray-300">🎲 Gerador de Senha Forte</span>
                            <button
                                onClick={generateStrongPassword}
                                className="text-sm text-purple-400 hover:text-purple-300 transition"
                            >
                                Gerar Nova
                            </button>
                        </div>
                        {generatedPassword && (
                            <div className="flex items-center gap-2">
                                <code className="flex-1 px-3 py-2 bg-slate-800 rounded-lg text-green-400 font-mono text-sm">
                                    {generatedPassword}
                                </code>
                                <button
                                    onClick={() => copyToClipboard(generatedPassword)}
                                    className="px-3 py-2 bg-slate-700 rounded-lg text-gray-300 hover:text-white transition"
                                >
                                    📋
                                </button>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleChangePassword}
                        disabled={saving || !newPassword || !confirmPassword}
                        className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 font-bold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saving ? 'Alterando...' : 'Alterar Senha'}
                    </button>
                </div>
            </div>
        </div>
    );
}
