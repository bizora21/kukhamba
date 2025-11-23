'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Briefcase, MapPin, DollarSign, FileText, CheckCircle } from 'lucide-react';

export default function NewJobPage() {
    const { user, token } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        estimatedBudget: '',
        serviceLocation: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    estimatedBudget: formData.estimatedBudget ? parseFloat(formData.estimatedBudget) : null
                })
            });

            if (res.ok) {
                setSuccess(true);
                setTimeout(() => router.push('/dashboard'), 3000);
            } else {
                const data = await res.json();
                throw new Error(data.error || 'Erro ao publicar trabalho.');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (success) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Trabalho Publicado!</h2>
                        <p className="text-gray-600">
                            Seu pedido foi publicado com sucesso. Os prestadores poderão enviar propostas em breve.
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
                <div className="md:flex md:items-center md:justify-between mb-8">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                            Publicar Novo Trabalho
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Descreva o que você precisa e receba propostas de profissionais qualificados.
                        </p>
                    </div>
                </div>

                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        )}

                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título do Trabalho</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Briefcase className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    required
                                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
                                    placeholder="Ex: Preciso de um encanador urgente"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoria</label>
                            <select
                                id="category"
                                name="category"
                                required
                                className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                value={formData.category}
                                onChange={handleChange}
                            >
                                <option value="">Selecione uma categoria</option>
                                <option value="Limpeza">Limpeza</option>
                                <option value="Reparos">Reparos</option>
                                <option value="Mudanças">Mudanças</option>
                                <option value="Jardinagem">Jardinagem</option>
                                <option value="Tecnologia">Tecnologia</option>
                                <option value="Outros">Outros</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição Detalhada</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute top-3 left-3 pointer-events-none">
                                    <FileText className="h-5 w-5 text-gray-400" />
                                </div>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={5}
                                    required
                                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
                                    placeholder="Descreva os detalhes do serviço, materiais necessários, etc."
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                            <div>
                                <label htmlFor="estimatedBudget" className="block text-sm font-medium text-gray-700">Orçamento Estimado (MT)</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <DollarSign className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="number"
                                        name="estimatedBudget"
                                        id="estimatedBudget"
                                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md py-3"
                                        placeholder="0.00"
                                        value={formData.estimatedBudget}
                                        onChange={handleChange}
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500 sm:text-sm">MT</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="serviceLocation" className="block text-sm font-medium text-gray-700">Localização do Serviço</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <MapPin className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="serviceLocation"
                                        id="serviceLocation"
                                        required
                                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
                                        placeholder="Bairro, Cidade"
                                        value={formData.serviceLocation}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-5 border-t border-gray-200 flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                            >
                                {loading ? 'Publicando...' : 'Publicar Trabalho'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
