'use client';

import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';

const articles = [
    {
        id: 1,
        title: "Como escolher o profissional ideal para sua reforma",
        excerpt: "Dicas essenciais para garantir que sua obra seja um sucesso, desde a verificação de referências até o contrato.",
        category: "Dicas para Casa",
        date: "20 Nov 2025",
        readTime: "5 min",
        image: "bg-gradient-to-br from-purple-500 to-indigo-600"
    },
    {
        id: 2,
        title: "Tendências de decoração em Moçambique para 2026",
        excerpt: "Descubra o que está em alta no design de interiores, misturando modernidade com elementos tradicionais.",
        category: "Decoração",
        date: "18 Nov 2025",
        readTime: "4 min",
        image: "bg-gradient-to-br from-pink-500 to-rose-600"
    },
    {
        id: 3,
        title: "Guia de segurança para contratação de serviços online",
        excerpt: "Aprenda como se proteger e garantir uma experiência segura ao contratar profissionais pela internet.",
        category: "Segurança",
        date: "15 Nov 2025",
        readTime: "6 min",
        image: "bg-gradient-to-br from-blue-500 to-cyan-600"
    },
    {
        id: 4,
        title: "Histórias de Sucesso: De freelancer a empresário",
        excerpt: "Conheça a história de João M., que começou fazendo pequenos reparos e hoje gerencia uma equipe de 10 pessoas.",
        category: "Empreendedorismo",
        date: "10 Nov 2025",
        readTime: "8 min",
        image: "bg-gradient-to-br from-emerald-500 to-teal-600"
    }
];

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-purple-500/30">
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-purple-900/20 to-transparent blur-3xl" />
            </div>

            <div className="relative z-10 container mx-auto px-6 py-12">
                <Link
                    href="/"
                    className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Voltar para o início
                </Link>

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-6">
                        <BookOpen className="w-8 h-8 text-pink-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-400">
                        Blog do KuKhamba
                    </h1>
                    <p className="text-xl text-gray-400">
                        Notícias, dicas e histórias inspiradoras da nossa comunidade.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article) => (
                        <article
                            key={article.id}
                            className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className={`h-48 w-full ${article.image} relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white border border-white/20">
                                    {article.category}
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {article.date}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {article.readTime}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                                    {article.title}
                                </h3>

                                <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                                    {article.excerpt}
                                </p>

                                <button className="text-sm font-semibold text-white flex items-center gap-2 group/btn">
                                    Ler artigo completo
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
