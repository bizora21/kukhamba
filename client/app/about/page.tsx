'use client';

import Link from 'next/link';
import { ArrowLeft, Users, Target, Heart, Globe } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-purple-500/30">
            {/* Background Elements */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px]" />
            </div>

            <div className="relative z-10 container mx-auto px-6 py-12">
                <Link
                    href="/"
                    className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Voltar para o início
                </Link>

                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-400">
                        Sobre o KuKhamba
                    </h1>

                    <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                        Conectando talentos locais a oportunidades reais. Somos a ponte digital que impulsiona a economia de serviços em Moçambique.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6">
                                <Target className="w-6 h-6 text-purple-400" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Nossa Missão</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Facilitar o acesso a serviços de qualidade para todos os moçambicanos, enquanto empoderamos prestadores de serviço com ferramentas para crescerem seus negócios de forma profissional e segura.
                            </p>
                        </div>

                        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                                <Globe className="w-6 h-6 text-blue-400" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Nossa Visão</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Ser a plataforma de referência em África para contratação de serviços, criando um ecossistema digital onde a confiança e a excelência são a norma, não a exceção.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-12">
                        <section>
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <Users className="w-8 h-8 text-pink-500" />
                                Quem Somos
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300">
                                <p className="mb-4">
                                    O KuKhamba nasceu da necessidade de simplificar a busca por profissionais qualificados em Moçambique. Percebemos que encontrar um eletricista confiável, um designer talentoso ou um professor particular muitas vezes dependia apenas do "boca a boca".
                                </p>
                                <p>
                                    Decidimos mudar isso criando uma plataforma transparente, onde a reputação é construída com base em avaliações reais e onde a segurança no pagamento é garantida. O nome "KuKhamba" reflete nosso compromisso com a comunidade e o crescimento conjunto.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <Heart className="w-8 h-8 text-red-500" />
                                Nossos Valores
                            </h2>
                            <div className="grid sm:grid-cols-3 gap-4">
                                {[
                                    { title: "Confiança", desc: "Verificação rigorosa e avaliações transparentes." },
                                    { title: "Inovação", desc: "Tecnologia de ponta para resolver problemas reais." },
                                    { title: "Comunidade", desc: "Crescimento compartilhado entre clientes e profissionais." }
                                ].map((value, i) => (
                                    <div key={i} className="bg-white/5 p-6 rounded-xl border border-white/5">
                                        <h3 className="font-bold text-lg mb-2 text-white">{value.title}</h3>
                                        <p className="text-sm text-gray-400">{value.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
