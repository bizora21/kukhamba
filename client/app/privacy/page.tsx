import React from 'react';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white shadow sm:rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:px-6 bg-slate-900">
                    <h1 className="text-2xl font-bold leading-6 text-white">Política de Privacidade</h1>
                    <p className="mt-1 max-w-2xl text-sm text-slate-300">Última atualização: {new Date().toLocaleDateString()}</p>
                </div>
                <div className="px-4 py-5 sm:p-6 space-y-6 text-gray-700">
                    <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-2">1. Introdução</h2>
                        <p>
                            No KuKhamba, respeitamos sua privacidade e estamos comprometidos em proteger seus dados pessoais.
                            Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações
                            quando você usa nossa plataforma.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-2">2. Informações que Coletamos</h2>
                        <ul className="list-disc pl-5 space-y-1">
                            <li><strong>Informações de Cadastro:</strong> Nome, e-mail, número de telefone e senha.</li>
                            <li><strong>Informações de Perfil:</strong> Foto de perfil, localização, habilidades e biografia.</li>
                            <li><strong>Documentos de Verificação (Prestadores):</strong> Cópias de documentos de identidade (BI/Passaporte), selfies de verificação e certificados profissionais.</li>
                            <li><strong>Dados de Uso:</strong> Informações sobre como você interage com nossos serviços, incluindo logs de acesso e dispositivo.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-2">3. Como Usamos Suas Informações</h2>
                        <p>Utilizamos seus dados para:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Fornecer, operar e manter nossos serviços.</li>
                            <li>Melhorar, personalizar e expandir nossa plataforma.</li>
                            <li>Processar transações e enviar notificações relacionadas.</li>
                            <li><strong>Verificar a identidade de prestadores</strong> para garantir a segurança da comunidade.</li>
                            <li>Prevenir fraudes e atividades ilícitas.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-2">4. Compartilhamento de Informações</h2>
                        <p>
                            Não vendemos seus dados pessoais. Podemos compartilhar informações apenas nas seguintes circunstâncias:
                        </p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Com prestadores ou clientes para facilitar a prestação do serviço (apenas dados necessários como nome e contato após contratação).</li>
                            <li>Com fornecedores de serviços terceirizados que nos ajudam a operar a plataforma (ex: processamento de pagamentos, hospedagem).</li>
                            <li>Para cumprir obrigações legais ou responder a processos judiciais.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-2">5. Segurança dos Dados</h2>
                        <p>
                            Implementamos medidas de segurança técnicas e organizacionais apropriadas para proteger seus dados pessoais.
                            Os documentos de verificação são armazenados de forma segura e acessíveis apenas por nossa equipe de conformidade.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-2">6. Seus Direitos</h2>
                        <p>
                            Você tem o direito de acessar, corrigir ou excluir seus dados pessoais. Você também pode optar por não receber
                            comunicações de marketing a qualquer momento.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-2">7. Contato</h2>
                        <p>
                            Para exercer seus direitos ou tirar dúvidas sobre esta política, entre em contato conosco através do nosso canal de suporte.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
