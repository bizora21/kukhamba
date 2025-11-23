'use client';

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';
import FileUpload from '../../../components/FileUpload';

export default function ProviderVerificationPage() {
    const { user, token } = useAuth(); // Precisamos do token para autenticar no backend
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);

    const [documents, setDocuments] = useState<{
        identityFront: string | null;
        identityBack: string | null;
        selfie: string | null;
        certificate: string | null;
    }>({
        identityFront: null,
        identityBack: null,
        selfie: null,
        certificate: null
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!documents.identityFront || !documents.identityBack || !documents.selfie) {
            setError('Por favor, envie todos os documentos obrigatórios (Identidade e Selfie).');
            return;
        }

        if (!termsAccepted) {
            setError('Você deve aceitar os Termos de Uso e Política de Privacidade para continuar.');
            return;
        }

        setLoading(true);

        try {
            // Preparar dados para envio
            const payload = {
                userId: user?.id, // Assumindo que temos o ID do usuário no contexto
                documentsUrl: JSON.stringify({
                    front: documents.identityFront,
                    back: documents.identityBack
                }),
                selfieUrl: documents.selfie,
                certificateUrl: documents.certificate
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/provider/verification`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Enviar token se disponível
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error('Falha ao enviar documentos');
            }

            setSuccess(true);
            // Redirecionar após alguns segundos
            setTimeout(() => {
                router.push('/dashboard');
            }, 3000);

        } catch (err: any) {
            console.error('Erro ao enviar verificação:', err);
            setError(err.message || 'Erro ao enviar documentos. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Documentos Enviados!</h2>
                        <p className="text-gray-600">
                            Sua conta está em análise. Você receberá uma notificação assim que sua verificação for concluída.
                        </p>
                        <p className="text-sm text-gray-500 mt-4">Redirecionando para o dashboard...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-gray-900">Verificação de Prestador</h1>
                    <p className="mt-2 text-lg text-gray-600">
                        Para garantir a segurança da plataforma, precisamos verificar sua identidade.
                    </p>
                </div>

                <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 sm:p-10">
                    {error && (
                        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Seção 1: Documento de Identidade */}
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">1. Documento de Identidade (BI ou Passaporte)</h3>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <FileUpload
                                    label="Frente do Documento"
                                    bucketName="provider-documents"
                                    onUploadComplete={(url) => setDocuments(prev => ({ ...prev, identityFront: url }))}
                                />
                                <FileUpload
                                    label="Verso do Documento"
                                    bucketName="provider-documents"
                                    onUploadComplete={(url) => setDocuments(prev => ({ ...prev, identityBack: url }))}
                                />
                            </div>
                        </div>

                        {/* Seção 2: Selfie */}
                        <div className="border-t border-gray-200 pt-8">
                            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">2. Selfie de Verificação</h3>
                            <p className="text-sm text-gray-500 mb-4">
                                Tire uma foto segurando seu documento de identidade ao lado do rosto. Certifique-se de que seu rosto e o documento estejam visíveis e nítidos.
                            </p>
                            <FileUpload
                                label="Sua Selfie com Documento"
                                bucketName="provider-documents"
                                onUploadComplete={(url) => setDocuments(prev => ({ ...prev, selfie: url }))}
                            />
                        </div>

                        {/* Seção 3: Certificados (Opcional) */}
                        <div className="border-t border-gray-200 pt-8">
                            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">3. Certificados ou Diplomas (Opcional)</h3>
                            <p className="text-sm text-gray-500 mb-4">
                                Se você possui certificados profissionais, envie-os aqui para aumentar a confiança dos clientes.
                            </p>
                            <FileUpload
                                label="Certificado Profissional"
                                bucketName="provider-documents"
                                accept="image/*,application/pdf"
                                onUploadComplete={(url) => setDocuments(prev => ({ ...prev, certificate: url }))}
                            />
                        </div>

                        {/* Seção 4: Termos e Condições */}
                        <div className="border-t border-gray-200 pt-8">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="terms"
                                        name="terms"
                                        type="checkbox"
                                        required
                                        checked={termsAccepted}
                                        onChange={(e) => setTermsAccepted(e.target.checked)}
                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="font-medium text-gray-700">
                                        Eu concordo com os Termos e Política
                                    </label>
                                    <p className="text-gray-500">
                                        Ao enviar meus documentos, declaro que as informações são verdadeiras e concordo com os{' '}
                                        <a href="/terms" target="_blank" className="text-indigo-600 hover:text-indigo-500 underline">Termos de Uso</a>
                                        {' '}e a{' '}
                                        <a href="/privacy" target="_blank" className="text-indigo-600 hover:text-indigo-500 underline">Política de Privacidade</a>
                                        {' '}do KuKhamba.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-5">
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => router.back()}
                                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {loading ? 'Enviando...' : 'Enviar para Análise'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
