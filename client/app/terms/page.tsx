import React from 'react';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white shadow sm:rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:px-6 bg-slate-900">
                    <h1 className="text-2xl font-bold leading-6 text-white">Termos de Uso</h1>
                    <p className="mt-1 max-w-2xl text-sm text-slate-300">Última atualização: {new Date().toLocaleDateString()}</p>
                </div>
                <div className="px-4 py-5 sm:p-6 space-y-6 text-gray-700">
                    <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-2">1. Aceitação dos Termos</h2>
                        <p>
                            Ao acessar e usar a plataforma KuKhamba, você concorda em cumprir e estar vinculado a estes Termos de Uso.
                            Se você não concordar com qualquer parte destes termos, você não deve usar nossos serviços.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-2">2. Descrição do Serviço</h2>
                        <p>
                            O KuKhamba é uma plataforma online que conecta clientes que buscam serviços específicos ("Clientes")
                            com profissionais que oferecem esses serviços ("Prestadores"). Nós atuamos apenas como intermediários
                            para facilitar essa conexão e não somos empregadores de nenhum Prestador.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-2">3. Cadastro e Segurança</h2>
                        <p>
                            Para usar certos recursos, você deve se registrar e criar uma conta. Você concorda em fornecer informações
                            precisas, atuais e completas. Você é responsável por manter a confidencialidade de sua senha e conta.
                        </p>
                        <p className="mt-2">
                            <strong>Para Prestadores:</strong> É obrigatório passar pelo processo de verificação de identidade para
                            oferecer serviços na plataforma. O fornecimento de documentos falsos resultará no banimento imediato.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-2">4. Responsabilidades dos Usuários</h2>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Você não deve usar o serviço para qualquer propósito ilegal ou não autorizado.</li>
                            <li>Você não deve assediar, abusar ou prejudicar outra pessoa.</li>
                            <li>Prestadores devem cumprir com os serviços acordados com qualidade e profissionalismo.</li>
                            <li>Clientes devem realizar o pagamento pelos serviços prestados conforme acordado.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-2">5. Pagamentos e Taxas</h2>
                        <p>
                            O KuKhamba pode cobrar taxas de serviço ou comissões sobre transações realizadas através da plataforma.
                            Todas as taxas serão claramente comunicadas antes da conclusão de qualquer transação.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-2">6. Limitação de Responsabilidade</h2>
                        <p>
                            O KuKhamba não se responsabiliza pela qualidade, segurança ou legalidade dos serviços anunciados,
                            nem pela veracidade ou precisão dos anúncios dos usuários. A contratação de serviços é de inteira
                            responsabilidade e risco do Cliente e do Prestador.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-2">7. Modificações dos Termos</h2>
                        <p>
                            Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor
                            imediatamente após a publicação na plataforma. O uso continuado do serviço após as alterações constitui
                            sua aceitação dos novos termos.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-2">8. Contato</h2>
                        <p>
                            Se você tiver dúvidas sobre estes Termos, entre em contato conosco através do nosso suporte.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
