'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, Lock, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(formData.email, formData.password);
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Erro ao fazer login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 relative overflow-hidden flex items-center justify-center px-4 py-12">
            {/* Animated Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-blue-900/20"></div>
                <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Logo e Título */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg shadow-purple-500/20 hover:scale-105 transition-transform">
                        <span className="text-2xl font-bold text-white">K</span>
                    </Link>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Bem-vindo de volta
                    </h1>
                    <p className="text-gray-400">
                        Faça login para continuar no KuKhamba
                    </p>
                </div>

                {/* Card de Login */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Erro */}
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-red-200">{error}</p>
                            </div>
                        )}

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                Email
                            </label>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none text-white placeholder-gray-500"
                                    placeholder="seu@email.com"
                                />
                            </div>
                        </div>

                        {/* Senha */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                Senha
                            </label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none text-white placeholder-gray-500"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {/* Esqueceu a senha */}
                        <div className="flex items-center justify-end">
                            <Link
                                href="/forgot-password"
                                className="text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors"
                            >
                                Esqueceu a senha?
                            </Link>
                        </div>

                        {/* Botão de Login */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Entrando...
                                </>
                            ) : (
                                'Entrar'
                            )}
                        </button>
                    </form>

                    {/* Divisor */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-slate-900/50 backdrop-blur text-gray-500 rounded-full">ou</span>
                        </div>
                    </div>

                    {/* Link para Registro */}
                    <div className="text-center">
                        <p className="text-gray-400">
                            Não tem uma conta?{' '}
                            <Link
                                href="/register"
                                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                            >
                                Criar conta
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Link para Home */}
                <div className="text-center mt-8">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm text-gray-500 hover:text-white transition-colors gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Voltar para a página inicial
                    </Link>
                </div>
            </div>
        </div>
    );
}
