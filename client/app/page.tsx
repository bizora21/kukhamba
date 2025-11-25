'use client';

import Link from 'next/link';
import { Search, Briefcase, Shield, Star, MapPin, Users, ArrowRight, CheckCircle } from 'lucide-react';

export default function Home() {
  const categories = [
    { name: 'Construção & Reforma', icon: '🏗️', count: 120 },
    { name: 'Eletricista', icon: '⚡', count: 85 },
    { name: 'Canalização', icon: '🔧', count: 64 },
    { name: 'Design & Criatividade', icon: '🎨', count: 42 },
    { name: 'Aulas Particulares', icon: '📚', count: 95 },
    { name: 'Limpeza & Diaristas', icon: '🧹', count: 150 },
  ];

  const featuredProviders = [
    {
      id: 1,
      name: 'João Silva',
      service: 'Eletricista Credenciado',
      rating: 4.9,
      reviews: 127,
      location: 'Maputo, Polana',
      image: '/placeholder-avatar.jpg',
      verified: true
    },
    {
      id: 2,
      name: 'Maria Santos',
      service: 'Designer Gráfico Sênior',
      rating: 5.0,
      reviews: 89,
      location: 'Matola, Fomento',
      image: '/placeholder-avatar.jpg',
      verified: true
    },
    {
      id: 3,
      name: 'Carlos Muianga',
      service: 'Mestre de Obras',
      rating: 4.8,
      reviews: 156,
      location: 'Maputo, Zimpeto',
      image: '/placeholder-avatar.jpg',
      verified: false
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-900">

      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-slate-100 z-0"></div>

        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 left-0 -ml-20 -mt-20 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-8 animate-fade-in-up">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
              A plataforma #1 de serviços em Moçambique
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
              Encontre profissionais <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                de confiança
              </span> para tudo.
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Conectamos você aos melhores prestadores de serviço da região.
              Rápido, seguro e com garantia de qualidade KuKhamba.
            </p>

            {/* Search Box */}
            <div className="bg-white p-2 rounded-2xl shadow-xl border border-slate-100 max-w-3xl mx-auto flex flex-col sm:flex-row gap-2 transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex-1 flex items-center px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus-within:border-blue-500 focus-within:bg-white transition-colors">
                <Search className="w-5 h-5 text-slate-400 mr-3" />
                <input
                  type="text"
                  placeholder="O que você precisa fazer?"
                  className="bg-transparent w-full outline-none text-slate-700 placeholder-slate-400"
                />
              </div>
              <div className="flex-1 flex items-center px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus-within:border-blue-500 focus-within:bg-white transition-colors">
                <MapPin className="w-5 h-5 text-slate-400 mr-3" />
                <input
                  type="text"
                  placeholder="Sua localização"
                  className="bg-transparent w-full outline-none text-slate-700 placeholder-slate-400"
                />
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-lg shadow-blue-600/20 flex items-center justify-center">
                Buscar
              </button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-500">
              <span className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-1.5" /> Profissionais Verificados</span>
              <span className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-1.5" /> Pagamento Seguro</span>
              <span className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-1.5" /> Suporte 24/7</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Categorias Populares</h2>
              <p className="text-slate-500 mt-2">Explore os serviços mais solicitados da semana</p>
            </div>
            <Link href="/categories" className="hidden sm:flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              Ver todas <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <div key={category.name} className="group bg-slate-50 hover:bg-white border border-slate-100 hover:border-blue-100 rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-lg cursor-pointer">
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{category.icon}</div>
                <h3 className="font-semibold text-slate-900 mb-1 text-sm">{category.name}</h3>
                <p className="text-xs text-slate-500">{category.count} profissionais</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/categories" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              Ver todas as categorias <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Providers */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Profissionais em Destaque</h2>
            <p className="text-slate-500 mt-2 max-w-2xl mx-auto">
              Conheça alguns dos nossos parceiros mais bem avaliados pela comunidade.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProviders.map((provider) => (
              <div key={provider.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center text-xl font-bold text-slate-500 overflow-hidden">
                      {/* Placeholder for image */}
                      {provider.name.charAt(0)}
                    </div>
                    {provider.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-1 rounded-full border-2 border-white" title="Verificado">
                        <Shield className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">{provider.name}</h3>
                    <p className="text-sm text-slate-500 mb-1">{provider.service}</p>
                    <div className="flex items-center text-sm text-slate-400">
                      <MapPin className="w-3 h-3 mr-1" />
                      {provider.location}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-orange-400 fill-current" />
                    <span className="font-bold text-slate-900 ml-1.5">{provider.rating}</span>
                    <span className="text-slate-400 text-sm ml-1">({provider.reviews} avaliações)</span>
                  </div>
                  <Link href={`/provider/view?id=${provider.id}`} className="text-blue-600 font-semibold text-sm hover:underline">
                    Ver Perfil
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Pronto para resolver seu problema?</h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que já usam o KuKhamba para contratar serviços de qualidade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-blue-50 transition-colors shadow-lg">
              Criar Conta Grátis
            </Link>
            <Link href="/register?role=PROVIDER" className="bg-blue-700 text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-800 transition-colors border border-blue-500">
              Quero Trabalhar
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white text-xl font-bold mb-4">KuKhamba</h3>
              <p className="text-sm text-slate-400">
                Conectando Moçambique através de serviços de qualidade.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Plataforma</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/services" className="hover:text-white transition-colors">Serviços</Link></li>
                <li><Link href="/providers" className="hover:text-white transition-colors">Profissionais</Link></li>
                <li><Link href="/how-it-works" className="hover:text-white transition-colors">Como Funciona</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white transition-colors">Sobre Nós</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contato</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Carreiras</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/terms" className="hover:text-white transition-colors">Termos de Uso</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacidade</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
            &copy; {new Date().getFullYear()} KuKhamba. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
