'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, Lock, User, Phone, MapPin, AlertCircle, Loader2, Briefcase, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function RegisterPage() {
    const router = useRouter();
    const { register } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        phone: '',
        role: 'CLIENT' as 'CLIENT' | 'PROVIDER',
        location: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validações
        if (formData.password !== formData.confirmPassword) {
            setError('As senhas não coincidem');
            return;
        }

        if (formData.password.length < 6) {
            setError('A senha deve ter no mínimo 6 caracteres');
            return;
        }

        setLoading(true);

        try {
            const { confirmPassword, ...registerData } = formData;
            await register(registerData);
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Erro ao criar conta');
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

            <div className="w-full max-w-2xl relative z-10">
                {/* Logo e Título */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg shadow-purple-500/20 hover:scale-105 transition-transform">
                        <span className="text-2xl font-bold text-white">K</span>
                    </Link>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Criar Conta no KuKhamba
                    </h1>
                    <p className="text-gray-400">
                        Junte-se à nossa comunidade
                    </p>
                </div>

                {/* Card de Registro */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Erro */}
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-red-200">{error}</p>
                            </div>
                        )}

                        {/* Tipo de Conta */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-3">
                                Tipo de Conta
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, role: 'CLIENT' })}
                                    className={`p-4 rounded-xl border transition-all group ${formData.role === 'CLIENT'
                                        ? 'border-purple-500 bg-purple-500/20'
                                        : 'border-white/10 bg-white/5 hover:bg-white/10'
                                        }`}
                                >
                                    <ShoppingBag className={`w-8 h-8 mx-auto mb-2 ${formData.role === 'CLIENT' ? 'text-purple-400' : 'text-gray-400 group-hover:text-gray-300'
                                        }`} />
                                    <p className={`font-medium ${formData.role === 'CLIENT' ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
                                        }`}>
                                        Cliente
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Procurar serviços
                                    </p>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, role: 'PROVIDER' })}
                                    className={`p-4 rounded-xl border transition-all group ${formData.role === 'PROVIDER'
                                        ? 'border-pink-500 bg-pink-500/20'
                                        : 'border-white/10 bg-white/5 hover:bg-white/10'
                                        }`}
                                >
                                    <Briefcase className={`w-8 h-8 mx-auto mb-2 ${formData.role === 'PROVIDER' ? 'text-pink-400' : 'text-gray-400 group-hover:text-gray-300'
                                        }`} />
                                    <p className={`font-medium ${formData.role === 'PROVIDER' ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
                                        }`}>
                                        Prestador
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Oferecer serviços
                                    </p>
                                </button>
                            </div>
                        </div>

                        {/* Grid de Campos */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Nome Completo */}
                            <div className="md:col-span-2">
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                                    Nome Completo
                                </label>
                                <div className="relative group">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                                    <input
                                        id="fullName"
                                        type="text"
                                        required
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none text-white placeholder-gray-500"
                                        placeholder="João Silva"
                                    />
                                </div>
                            </div>

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

                            {/* Telefone */}
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                                    Telefone
                                </label>
                                <div className="relative group">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                                    <input
                                        id="phone"
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none text-white placeholder-gray-500"
                                        placeholder="+258 84 123 4567"
                                    />
                                </div>
                            </div>

                            {/* Localização */}
                            <div className="md:col-span-2">
                                <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-2">
                                    Localização (Opcional)
                                </label>
                                <div className="relative group">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                                    <input
                                        id="location"
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none text-white placeholder-gray-500"
                                        placeholder="Maputo, Moçambique"
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

                            {/* Confirmar Senha */}
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                                    Confirmar Senha
                                </label>
                                <div className="relative group">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        required
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none text-white placeholder-gray-500"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Botão de Registro */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Criando conta...
                                </>
                            ) : (
                                'Criar Conta'
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

                    {/* Link para Login */}
                    <div className="text-center">
                        <p className="text-gray-400">
                            Já tem uma conta?{' '}
                            <Link
                                href="/login"
                                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                            >
                                Fazer login
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
