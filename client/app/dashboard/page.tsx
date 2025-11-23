'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { LogOut, User, Settings, Briefcase, MessageSquare, Shield, Search, FileText } from 'lucide-react';

export default function DashboardPage() {
    const { user, logout, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Navbar */}


            {/* Content */}
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 pt-24">Dashboard</h1>

                {/* Verification Alert - Only for Providers */}
                {user.role === 'PROVIDER' && (
                    <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                                <Shield className="w-6 h-6 text-orange-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-white">Verifique sua Identidade</h3>
                                <p className="text-sm text-gray-400">Para oferecer serviços e aumentar sua confiança, precisamos validar seus documentos.</p>
                            </div>
                        </div>
                        <Link
                            href="/provider/verification"
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-colors whitespace-nowrap w-full sm:w-auto text-center shadow-lg shadow-orange-500/20"
                        >
                            Verificar Agora
                        </Link>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Profile Card */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors cursor-pointer group">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <User className="w-6 h-6 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Meu Perfil</h3>
                        <p className="text-gray-400 text-sm">Gerencie suas informações pessoais e preferências.</p>
                    </div>

                    {/* Job Posting Cards (Client) */}
                    {user.role === 'CLIENT' && (
                        <>
                            <Link href="/client/jobs/new" className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors cursor-pointer group">
                                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Briefcase className="w-6 h-6 text-green-400" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Publicar Trabalho</h3>
                                <p className="text-gray-400 text-sm">Crie um novo pedido de serviço e receba propostas.</p>
                            </Link>

                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors cursor-pointer group">
                                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <FileText className="w-6 h-6 text-purple-400" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Meus Trabalhos</h3>
                                <p className="text-gray-400 text-sm">Gerencie seus pedidos e veja candidaturas.</p>
                            </div>
                        </>
                    )}

                    {/* Job Finding Cards (Provider) */}
                    {user.role === 'PROVIDER' && (
                        <>
                            <Link href="/jobs" className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors cursor-pointer group">
                                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Search className="w-6 h-6 text-green-400" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Encontrar Trabalho</h3>
                                <p className="text-gray-400 text-sm">Busque oportunidades e envie propostas.</p>
                            </Link>

                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors cursor-pointer group">
                                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <FileText className="w-6 h-6 text-purple-400" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Minhas Candidaturas</h3>
                                <p className="text-gray-400 text-sm">Acompanhe o status das suas propostas.</p>
                            </div>
                        </>
                    )}

                    {/* Messages Card */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors cursor-pointer group">
                        <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <MessageSquare className="w-6 h-6 text-pink-400" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Mensagens</h3>
                        <p className="text-gray-400 text-sm">Verifique suas conversas e negociações.</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
