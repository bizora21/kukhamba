'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, Filter, Star, ChevronDown, SlidersHorizontal } from 'lucide-react';

// Mock Data
const CATEGORIES = [
    { id: 'all', name: 'Todas' },
    { id: 'electrician', name: 'Eletricista' },
    { id: 'plumber', name: 'Canalizador' },
    { id: 'ac', name: 'Climatização' },
    { id: 'cleaning', name: 'Limpeza' },
    { id: 'security', name: 'Segurança' },
];

const PROVIDERS = [
    {
        id: '1',
        name: 'João Silva',
        service: 'Eletricista',
        rating: 4.9,
        reviews: 127,
        location: 'Maputo, Polana',
        price: '500 MT/h',
        image: 'bg-purple-500',
        verified: true
    },
    {
        id: '2',
        name: 'Maria Santos',
        service: 'Limpeza Profissional',
        rating: 4.8,
        reviews: 84,
        location: 'Matola, Malhampsene',
        price: '300 MT/h',
        image: 'bg-pink-500',
        verified: true
    },
    {
        id: '3',
        name: 'Carlos Macamo',
        service: 'Técnico de AC',
        rating: 4.7,
        reviews: 56,
        location: 'Maputo, Costa do Sol',
        price: '800 MT/h',
        image: 'bg-blue-500',
        verified: false
    },
    {
        id: '4',
        name: 'Ana Paulo',
        service: 'Canalizadora',
        rating: 5.0,
        reviews: 32,
        location: 'Maputo, Zimpeto',
        price: '450 MT/h',
        image: 'bg-green-500',
        verified: true
    },
    {
        id: '5',
        name: 'Pedro Cossa',
        service: 'Segurança Eletrônica',
        rating: 4.6,
        reviews: 19,
        location: 'Matola Rio',
        price: '1200 MT/h',
        image: 'bg-orange-500',
        verified: true
    }
];

export default function SearchPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showFilters, setShowFilters] = useState(false);

    const filteredProviders = PROVIDERS.filter(provider => {
        const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            provider.service.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' ||
            (selectedCategory === 'electrician' && provider.service.includes('Eletricista')) ||
            (selectedCategory === 'plumber' && provider.service.includes('Canaliza')) ||
            (selectedCategory === 'ac' && provider.service.includes('AC')) ||
            (selectedCategory === 'cleaning' && provider.service.includes('Limpeza')) ||
            (selectedCategory === 'security' && provider.service.includes('Segurança'));

        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-slate-950 text-white pt-24 pb-12">
            <div className="container mx-auto px-4">

                {/* Header & Search Bar */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-6">Encontre Profissionais</h1>

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="O que você precisa? (ex: Eletricista, Limpeza...)"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                            />
                        </div>
                        <div className="relative md:w-64">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Localização"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                            />
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="md:hidden bg-white/10 p-4 rounded-xl flex items-center justify-center"
                        >
                            <SlidersHorizontal className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Filters Sidebar */}
                    <aside className={`lg:w-64 space-y-8 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                        <div>
                            <h3 className="font-bold mb-4 flex items-center gap-2">
                                <Filter className="w-4 h-4 text-purple-400" />
                                Categorias
                            </h3>
                            <div className="space-y-2">
                                {CATEGORIES.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setSelectedCategory(cat.id)}
                                        className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${selectedCategory === cat.id
                                            ? 'bg-purple-600 text-white'
                                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                            }`}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold mb-4">Faixa de Preço</h3>
                            <div className="space-y-4">
                                <input type="range" className="w-full accent-purple-500" />
                                <div className="flex justify-between text-xs text-gray-400">
                                    <span>0 MT</span>
                                    <span>5000+ MT</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold mb-4">Avaliação</h3>
                            <div className="space-y-2">
                                {[5, 4, 3].map((stars) => (
                                    <label key={stars} className="flex items-center gap-2 cursor-pointer group">
                                        <input type="checkbox" className="rounded border-gray-600 bg-white/5 text-purple-500 focus:ring-purple-500" />
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-3 h-3 ${i < stars ? 'fill-current' : 'text-gray-600'}`} />
                                            ))}
                                        </div>
                                        <span className="text-sm text-gray-400 group-hover:text-white">& acima</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Results Grid */}
                    <main className="flex-1">
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-gray-400">
                                Mostrando <span className="text-white font-bold">{filteredProviders.length}</span> resultados
                            </p>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                Ordenar por:
                                <button className="flex items-center gap-1 text-white font-medium">
                                    Relevância <ChevronDown className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredProviders.map((provider) => (
                                <Link href={`/provider/view?id=${provider.id}`} key={provider.id} className="group">
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-purple-500/50 transition-all hover:-translate-y-1 h-full flex flex-col">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-12 h-12 ${provider.image} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                                                    {provider.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-white group-hover:text-purple-400 transition-colors">{provider.name}</h4>
                                                    <p className="text-xs text-gray-400">{provider.service}</p>
                                                </div>
                                            </div>
                                            {provider.verified && (
                                                <span className="bg-blue-500/10 text-blue-400 text-[10px] px-2 py-1 rounded-full font-medium border border-blue-500/20">
                                                    VERIFICADO
                                                </span>
                                            )}
                                        </div>

                                        <div className="space-y-3 mb-4 flex-1">
                                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                                <span className="font-bold text-white">{provider.rating}</span>
                                                <span className="text-gray-500">({provider.reviews})</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                                <MapPin className="w-4 h-4" />
                                                {provider.location}
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                                            <span className="font-bold text-white">{provider.price}</span>
                                            <span className="text-xs text-purple-400 font-medium group-hover:underline">Ver Perfil</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {filteredProviders.length === 0 && (
                            <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 border-dashed">
                                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-8 h-8 text-gray-500" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Nenhum resultado encontrado</h3>
                                <p className="text-gray-400">Tente ajustar os filtros ou buscar por outro termo.</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
