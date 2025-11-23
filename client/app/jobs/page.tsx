'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, MapPin, Clock, Briefcase, Filter } from 'lucide-react';

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

export default function JobsPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: '',
        location: ''
    });

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (filters.category) params.append('category', filters.category);
            if (filters.location) params.append('location', filters.location);

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs?${params.toString()}`);
            if (res.ok) {
                const data = await res.json();
                setJobs(data);
            }
        } catch (error) {
            console.error('Erro ao buscar jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchJobs();
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                        Encontre Trabalho
                    </h1>
                    <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
                        Explore oportunidades publicadas por clientes e envie sua proposta.
                    </p>
                </div>

                {/* Filtros */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                    <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Briefcase className="h-5 w-5 text-gray-400" />
                            </div>
                            <select
                                name="category"
                                value={filters.category}
                                onChange={handleFilterChange}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            >
                                <option value="">Todas as Categorias</option>
                                <option value="Limpeza">Limpeza</option>
                                <option value="Reparos">Reparos</option>
                                <option value="Mudanças">Mudanças</option>
                                <option value="Jardinagem">Jardinagem</option>
                                <option value="Tecnologia">Tecnologia</option>
                            </select>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MapPin className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="location"
                                value={filters.location}
                                onChange={handleFilterChange}
                                placeholder="Localização (ex: Maputo)"
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colors"
                        >
                            <Search className="w-5 h-5 mr-2" />
                            Buscar Oportunidades
                        </button>
                    </form>
                </div>

                {/* Lista de Jobs */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-500">Carregando oportunidades...</p>
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                        <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">Nenhuma oportunidade encontrada</h3>
                        <p className="mt-2 text-gray-500">Tente ajustar seus filtros ou volte mais tarde.</p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {jobs.map((job) => (
                            <Link href={`/jobs/${job.id}`} key={job.id} className="block group">
                                <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 h-full border border-gray-100 flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {job.category || 'Geral'}
                                        </span>
                                        <span className="text-sm text-gray-500 flex items-center">
                                            <Clock className="w-3 h-3 mr-1" />
                                            {new Date(job.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                                        {job.title}
                                    </h3>

                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                                        {job.description}
                                    </p>

                                    <div className="border-t border-gray-100 pt-4 mt-auto">
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center text-gray-500">
                                                <MapPin className="w-4 h-4 mr-1" />
                                                {job.serviceLocation}
                                            </div>
                                            <div className="font-semibold text-green-600">
                                                {job.estimatedBudget ? `${job.estimatedBudget.toLocaleString()} MT` : 'A combinar'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
