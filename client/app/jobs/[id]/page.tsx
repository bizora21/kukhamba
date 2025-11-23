'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { MapPin, Calendar, DollarSign, User as UserIcon, CheckCircle, AlertCircle } from 'lucide-react';

interface Job {
    id: string;
    title: string;
    description: string;
    estimatedBudget: number;
    serviceLocation: string;
    category: string;
    createdAt: string;
    client: {
        fullName: string;
        location: string;
    };
}

export default function JobDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const { user, token } = useAuth();
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);
    const [proposal, setProposal] = useState({ price: '', message: '' });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (id) fetchJobDetails();
    }, [id]);

    const fetchJobDetails = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${id}`);
            if (res.ok) {
                const data = await res.json();
                setJob(data);
            } else {
                setError('Oportunidade não encontrada.');
            }
        } catch (err) {
            console.error(err);
            setError('Erro ao carregar detalhes.');
        } finally {
            setLoading(false);
        }
    };

    const handleApply = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            router.push(`/login?redirect=/jobs/${id}`);
            return;
        }
        if (user.role !== 'PROVIDER') {
            setError('Apenas prestadores de serviço podem se candidatar.');
            return;
        }

        setApplying(true);
        setError(null);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${id}/apply`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    price: parseFloat(proposal.price),
                    message: proposal.message
                })
            });

            if (res.ok) {
                setSuccess(true);
                setTimeout(() => router.push('/dashboard'), 3000);
            } else {
                const data = await res.json();
                throw new Error(data.error || 'Erro ao enviar proposta.');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setApplying(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
    if (!job) return <div className="min-h-screen flex items-center justify-center text-gray-500">Oportunidade não encontrada.</div>;

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Cabeçalho do Job */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
                    <div className="bg-slate-900 px-6 py-8 sm:px-10">
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500/20 text-blue-200 mb-4 border border-blue-500/30">
                                    {job.category || 'Geral'}
                                </span>
                                <h1 className="text-3xl font-bold text-white mb-2">{job.title}</h1>
                                <div className="flex items-center text-slate-300 text-sm">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    {job.serviceLocation}
                                    <span className="mx-2">•</span>
                                    <Calendar className="w-4 h-4 mr-1" />
                                    Publicado em {new Date(job.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                            <div className="text-right hidden sm:block">
                                <p className="text-slate-400 text-sm mb-1">Orçamento Estimado</p>
                                <p className="text-2xl font-bold text-green-400">
                                    {job.estimatedBudget ? `${job.estimatedBudget.toLocaleString()} MT` : 'A combinar'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="px-6 py-8 sm:px-10">
                        <div className="prose max-w-none text-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Descrição do Trabalho</h3>
                            <p className="whitespace-pre-line">{job.description}</p>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sobre o Cliente</h3>
                            <div className="flex items-center">
                                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                    <UserIcon className="w-6 h-6" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-900">{job.client?.fullName || 'Cliente KuKhamba'}</p>
                                    <p className="text-sm text-gray-500">{job.client?.location || 'Moçambique'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Área de Candidatura */}
                {success ? (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <h3 className="text-lg font-medium text-green-900">Proposta Enviada com Sucesso!</h3>
                        <p className="mt-2 text-green-600">O cliente será notificado. Boa sorte!</p>
                        <p className="text-sm text-green-500 mt-4">Redirecionando para o dashboard...</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-10">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Enviar Proposta</h2>

                        {!user ? (
                            <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                                <p className="text-gray-600 mb-4">Você precisa estar logado como prestador para se candidatar.</p>
                                <div className="space-x-4">
                                    <button onClick={() => router.push(`/login?redirect=/jobs/${id}`)} className="text-blue-600 font-medium hover:underline">Entrar</button>
                                    <span className="text-gray-300">|</span>
                                    <button onClick={() => router.push('/register')} className="text-blue-600 font-medium hover:underline">Criar Conta</button>
                                </div>
                            </div>
                        ) : user.role === 'CLIENT' ? (
                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <AlertCircle className="h-5 w-5 text-yellow-400" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-yellow-700">
                                            Você está logado como Cliente. Apenas prestadores podem enviar propostas.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleApply} className="space-y-6">
                                {error && (
                                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                                        <p className="text-sm text-red-700">{error}</p>
                                    </div>
                                )}

                                <div>
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Sua Oferta (MT)</label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-gray-500 sm:text-sm">MT</span>
                                        </div>
                                        <input
                                            type="number"
                                            name="price"
                                            id="price"
                                            required
                                            min="1"
                                            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md py-3"
                                            placeholder="0.00"
                                            value={proposal.price}
                                            onChange={(e) => setProposal({ ...proposal, price: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensagem para o Cliente</label>
                                    <div className="mt-1">
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={4}
                                            required
                                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md py-3 px-4"
                                            placeholder="Descreva por que você é a melhor escolha para este trabalho..."
                                            value={proposal.message}
                                            onChange={(e) => setProposal({ ...proposal, message: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={applying}
                                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${applying ? 'opacity-75 cursor-not-allowed' : ''}`}
                                >
                                    {applying ? 'Enviando...' : 'Enviar Proposta'}
                                </button>
                            </form>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
