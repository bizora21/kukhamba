'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import {
    ArrowLeft, Star, MapPin, Shield, CheckCircle,
    MessageSquare, Calendar, Clock, Share2, Heart, Image as ImageIcon
} from 'lucide-react';
import { useSearchParams } from 'next/navigation';

// Mock Data (Simulando dados que viriam do Supabase)
const MOCK_PROVIDER = {
    id: '1',
    name: 'João Silva',
    title: 'Eletricista Profissional & Técnico de AC',
    rating: 4.9,
    reviewsCount: 127,
    location: 'Maputo, Polana Cimento',
    verified: true,
    joinedDate: 'Jan 2024',
    bio: 'Especialista em instalações elétricas residenciais e comerciais com mais de 10 anos de experiência. Certificado em manutenção de ar condicionado e sistemas de segurança. Trabalho com rapidez, limpeza e garantia.',
    specialties: ['Instalação Elétrica', 'Manutenção de AC', 'Quadros Elétricos', 'Iluminação LED', 'Câmeras de Segurança'],
    priceRange: '500 - 2.000 MT / hora',
    portfolio: [
        { id: 1, image: 'bg-gradient-to-br from-gray-800 to-gray-700', title: 'Instalação de Lustre Moderno' },
        { id: 2, image: 'bg-gradient-to-br from-slate-800 to-slate-700', title: 'Quadro Elétrico Industrial' },
        { id: 3, image: 'bg-gradient-to-br from-zinc-800 to-zinc-700', title: 'Iluminação de Jardim' },
        { id: 4, image: 'bg-gradient-to-br from-neutral-800 to-neutral-700', title: 'Manutenção de AC Split' },
    ],
    reviews: [
        { id: 1, user: 'Ana M.', rating: 5, date: '2 dias atrás', text: 'Excelente profissional! Chegou no horário, resolveu o problema do curto-circuito rapidamente e deixou tudo limpo. Recomendo!' },
        { id: 2, user: 'Carlos B.', rating: 5, date: '1 semana atrás', text: 'Muito atencioso e honesto no orçamento. O ar condicionado ficou gelando como novo.' },
        { id: 3, user: 'Marta L.', rating: 4, date: '3 semanas atrás', text: 'Bom serviço, apenas demorou um pouco para responder as mensagens iniciais, mas o trabalho foi impecável.' },
    ]
};

function ProviderProfileContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [isFavorite, setIsFavorite] = useState(false);
    const [activeTab, setActiveTab] = useState<'about' | 'portfolio' | 'reviews'>('about');

    // In a real app, we would fetch data based on id
    const provider = MOCK_PROVIDER;

    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-purple-500/30 pt-24 pb-12">

            {/* Background Elements */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-purple-900/20 to-transparent opacity-60" />
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-6xl">

                {/* Navigation */}
                <Link
                    href="/"
                    className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Voltar para o início
                </Link>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Left Column: Main Profile Info */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Profile Header Card */}
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 flex gap-3">
                                <button className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-gray-300 hover:text-white">
                                    <Share2 className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setIsFavorite(!isFavorite)}
                                    className={`p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors ${isFavorite ? 'text-red-500' : 'text-gray-300 hover:text-white'}`}
                                >
                                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                                </button>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-6 items-start">
                                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-1 flex-shrink-0">
                                    <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                                        <span className="text-4xl font-bold text-white">{provider.name.charAt(0)}</span>
                                        {/* <img src={provider.image} alt={provider.name} className="w-full h-full object-cover" /> */}
                                    </div>
                                </div>

                                <div className="flex-1 pt-2">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h1 className="text-2xl sm:text-3xl font-bold text-white">{provider.name}</h1>
                                        {provider.verified && (
                                            <div className="text-blue-400" title="Profissional Verificado">
                                                <CheckCircle className="w-5 h-5 fill-blue-500/20" />
                                            </div>
                                        )}
                                    </div>

                                    <p className="text-purple-300 font-medium mb-3">{provider.title}</p>

                                    <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                            <span className="text-white font-bold">{provider.rating}</span>
                                            <span>({provider.reviewsCount} avaliações)</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4 text-gray-500" />
                                            <span>{provider.location}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {provider.specialties.map((spec, i) => (
                                            <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
                                                {spec}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tabs Navigation */}
                        <div className="flex border-b border-white/10">
                            <button
                                onClick={() => setActiveTab('about')}
                                className={`px-6 py-4 text-sm font-medium transition-colors relative ${activeTab === 'about' ? 'text-purple-400' : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                Sobre
                                {activeTab === 'about' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500" />}
                            </button>
                            <button
                                onClick={() => setActiveTab('portfolio')}
                                className={`px-6 py-4 text-sm font-medium transition-colors relative ${activeTab === 'portfolio' ? 'text-purple-400' : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                Portfólio
                                {activeTab === 'portfolio' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500" />}
                            </button>
                            <button
                                onClick={() => setActiveTab('reviews')}
                                className={`px-6 py-4 text-sm font-medium transition-colors relative ${activeTab === 'reviews' ? 'text-purple-400' : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                Avaliações
                                {activeTab === 'reviews' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500" />}
                            </button>
                        </div>

                        {/* Tab Content */}
                        <div className="min-h-[300px]">
                            {activeTab === 'about' && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-6">
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                        <h3 className="text-lg font-bold mb-4">Biografia</h3>
                                        <p className="text-gray-300 leading-relaxed">
                                            {provider.bio}
                                        </p>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4">
                                            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                                <Shield className="w-5 h-5 text-blue-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400">Verificação</p>
                                                <p className="font-semibold">Identidade Confirmada</p>
                                            </div>
                                        </div>
                                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4">
                                            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                                                <Calendar className="w-5 h-5 text-green-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400">Membro desde</p>
                                                <p className="font-semibold">{provider.joinedDate}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'portfolio' && (
                                <div className="grid sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                                    {provider.portfolio.map((item) => (
                                        <div key={item.id} className="group relative aspect-video bg-slate-800 rounded-xl overflow-hidden border border-white/10 cursor-pointer">
                                            <div className={`absolute inset-0 ${item.image}`} />
                                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                                <p className="text-white font-medium text-sm">{item.title}</p>
                                            </div>
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                                                    <ImageIcon className="w-5 h-5 text-white" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'reviews' && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                                    {provider.reviews.map((review) => (
                                        <div key={review.id} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-xs font-bold">
                                                        {review.user.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-sm">{review.user}</p>
                                                        <p className="text-xs text-gray-500">{review.date}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1 bg-yellow-500/10 px-2 py-1 rounded-lg">
                                                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                                    <span className="text-xs font-bold text-yellow-400">{review.rating}</span>
                                                </div>
                                            </div>
                                            <p className="text-gray-300 text-sm leading-relaxed">
                                                "{review.text}"
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Action Card (Sticky) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
                                <h3 className="text-xl font-bold mb-6">Solicitar Orçamento</h3>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400">Preço estimado</span>
                                        <span className="font-semibold text-white">{provider.priceRange}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400">Tempo de resposta</span>
                                        <span className="font-semibold text-green-400">~ 1 hora</span>
                                    </div>
                                </div>

                                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-purple-500/25 mb-3">
                                    Pedir Orçamento Grátis
                                </button>

                                <button className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                                    <MessageSquare className="w-4 h-4" />
                                    Enviar Mensagem
                                </button>

                                <p className="text-xs text-center text-gray-500 mt-4">
                                    Sem compromisso. Você só paga se fechar o serviço.
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-white/10 rounded-2xl p-6">
                                <h4 className="font-bold mb-2 flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-green-400" />
                                    Garantia KuKhamba
                                </h4>
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    Seu pagamento fica protegido até o serviço ser concluído. Garantimos a qualidade ou seu dinheiro de volta.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default function ProviderProfilePage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div></div>}>
            <ProviderProfileContent />
        </Suspense>
    );
}
