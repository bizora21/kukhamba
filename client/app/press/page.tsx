'use client';

import Link from 'next/link';
import { ArrowLeft, Newspaper, Download } from 'lucide-react';

export default function PressPage() {
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

                <div className="flex items-center gap-4 mb-12">
                    <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center">
                        <Newspaper className="w-6 h-6 text-pink-400" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold">Imprensa e Mídia</h1>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                        <h3 className="text-xl font-bold mb-4">Sobre o KuKhamba</h3>
                        <p className="text-gray-400 mb-6">
                            O KuKhamba é a plataforma líder em conexão de serviços locais em Moçambique, fundada em 2025 com a missão de digitalizar a economia informal.
                        </p>
                        <button className="flex items-center text-purple-400 hover:text-purple-300 transition-colors font-medium">
                            <Download className="w-4 h-4 mr-2" />
                            Baixar Press Kit (PDF)
                        </button>
                    </div>

                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                        <h3 className="text-xl font-bold mb-4">Recursos de Marca</h3>
                        <p className="text-gray-400 mb-6">
                            Acesse nossos logotipos oficiais, paleta de cores e diretrizes de uso da marca para publicações.
                        </p>
                        <button className="flex items-center text-purple-400 hover:text-purple-300 transition-colors font-medium">
                            <Download className="w-4 h-4 mr-2" />
                            Baixar Logos e Assets
                        </button>
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-6">Contato para Imprensa</h2>
                    <p className="text-gray-400">
                        Para solicitações de entrevistas, dados de mercado ou outras informações jornalísticas, entre em contato com nossa assessoria:
                    </p>
                    <p className="mt-4 text-lg font-medium">
                        <a href="mailto:imprensa@kukhamba.mz" className="text-purple-400 hover:underline">imprensa@kukhamba.mz</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
