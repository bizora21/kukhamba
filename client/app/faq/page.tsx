'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
    {
        question: "Como funciona o KuKhamba?",
        answer: "O KuKhamba conecta clientes que precisam de serviços a profissionais qualificados. Você posta o que precisa, recebe orçamentos, escolhe o melhor profissional e paga com segurança através da plataforma."
    },
    {
        question: "É seguro contratar pelo KuKhamba?",
        answer: "Sim! Verificamos a identidade dos prestadores de serviço e oferecemos um sistema de avaliações transparente. Além disso, o pagamento só é liberado ao profissional após a conclusão satisfatória do serviço."
    },
    {
        question: "Quanto custa usar a plataforma?",
        answer: "Para clientes, o uso é gratuito. Você paga apenas pelo serviço contratado. Para profissionais, cobramos uma pequena taxa de serviço sobre os trabalhos realizados para manter a plataforma."
    },
    {
        question: "Como posso me tornar um prestador de serviços?",
        answer: "Basta criar uma conta, selecionar a opção 'Quero oferecer serviços' e completar seu perfil profissional com fotos, descrição e documentos de verificação."
    },
    {
        question: "Quais métodos de pagamento são aceitos?",
        answer: "Aceitamos M-Pesa, e-Mola e cartões de crédito/débito. Estamos trabalhando para integrar mais opções locais em breve."
    },
    {
        question: "O que acontece se eu não gostar do serviço?",
        answer: "Temos uma política de garantia. Se o serviço não for realizado conforme o combinado, você pode abrir uma disputa e nossa equipe mediará a situação, podendo haver reembolso total ou parcial."
    }
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-purple-500/30">
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-purple-500/10 blur-[100px]" />
                <div className="absolute bottom-[10%] left-[10%] w-[30%] h-[30%] rounded-full bg-blue-500/10 blur-[100px]" />
            </div>

            <div className="relative z-10 container mx-auto px-6 py-12">
                <Link
                    href="/"
                    className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Voltar para o início
                </Link>

                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-6">
                            <HelpCircle className="w-8 h-8 text-purple-400" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-400">
                            Perguntas Frequentes
                        </h1>
                        <p className="text-xl text-gray-400">
                            Tire suas dúvidas sobre o funcionamento do KuKhamba.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-white/5 border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:bg-white/10"
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
                                >
                                    <span className="font-semibold text-lg pr-8">{faq.question}</span>
                                    {openIndex === index ? (
                                        <Minus className="w-5 h-5 text-purple-400 flex-shrink-0" />
                                    ) : (
                                        <Plus className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                    )}
                                </button>

                                <div
                                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <p className="text-gray-400 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-white/10 rounded-2xl p-8">
                        <h3 className="text-xl font-bold mb-2">Ainda tem dúvidas?</h3>
                        <p className="text-gray-400 mb-6">Nossa equipe de suporte está pronta para ajudar você.</p>
                        <button className="px-6 py-3 bg-white text-slate-900 rounded-full font-semibold hover:bg-gray-200 transition-colors">
                            Fale Conosco
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
