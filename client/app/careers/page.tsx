'use client';

import Link from 'next/link';
import { ArrowLeft, Briefcase } from 'lucide-react';

export default function CareersPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-purple-500/30 pt-24 pb-12">
            <div className="container mx-auto px-6 max-w-4xl">
                <Link
                    href="/"
                    className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Voltar
                </Link>

                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-2xl mb-6">
                        <Briefcase className="w-8 h-8 text-purple-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Trabalhe Conosco</h1>
                    <p className="text-xl text-gray-400">Ajude-nos a construir o futuro dos serviços em Moçambique.</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
                    <h3 className="text-2xl font-bold mb-4">Nenhuma vaga aberta no momento</h3>
                    <p className="text-gray-400 mb-8">
                        Atualmente não temos posições abertas, mas estamos sempre em busca de talentos.
                        Envie seu currículo para nosso banco de talentos e entraremos em contato quando surgir uma oportunidade.
                    </p>
                    <a
                        href="mailto:vagas@kukhamba.mz"
                        className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition-colors"
                    >
                        Enviar Currículo
                    </a>
                </div>
            </div>
        </div>
    );
}
