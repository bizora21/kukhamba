'use client';

import Link from 'next/link';
import { ArrowLeft, Lock, CheckCircle, AlertTriangle } from 'lucide-react';

export default function SafetyPage() {
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

                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                        <Lock className="w-6 h-6 text-green-400" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold">Centro de Segurança</h1>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <CheckCircle className="text-green-400 w-5 h-5" />
                            O que nós fazemos
                        </h3>
                        <ul className="space-y-3 text-gray-400">
                            <li>• Verificação de identidade de todos os profissionais.</li>
                            <li>• Monitoramento de transações suspeitas.</li>
                            <li>• Proteção de pagamentos até a conclusão do serviço.</li>
                            <li>• Canal de denúncias 24/7.</li>
                        </ul>
                    </div>

                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <AlertTriangle className="text-yellow-400 w-5 h-5" />
                            Dicas para você
                        </h3>
                        <ul className="space-y-3 text-gray-400">
                            <li>• Nunca faça pagamentos fora da plataforma.</li>
                            <li>• Mantenha toda a comunicação no chat do app.</li>
                            <li>• Verifique as avaliações antes de contratar.</li>
                            <li>• Não compartilhe senhas ou dados bancários no chat.</li>
                        </ul>
                    </div>
                </div>

                <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                    <h3>Denunciar um Problema</h3>
                    <p>Se você presenciar qualquer comportamento suspeito ou inadequado, por favor, denuncie imediatamente através do perfil do usuário ou entre em contato com nosso suporte em <a href="mailto:seguranca@kukhamba.mz" className="text-purple-400">seguranca@kukhamba.mz</a>.</p>
                </div>
            </div>
        </div>
    );
}
