'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react';

export default function Header() {
    const { user, logout } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen
                ? 'bg-white/90 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm'
                : 'bg-transparent py-5'
                }`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group" onClick={closeMobileMenu}>
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform">
                            K
                        </div>
                        <span className={`font-bold text-xl tracking-tight transition-colors ${isScrolled || isMobileMenuOpen ? 'text-slate-900' : 'text-slate-900'}`}>
                            KuKhamba
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Início</Link>
                        <Link href="/services" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Serviços</Link>
                        <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Sobre</Link>
                        <Link href="/contact" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Contato</Link>
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/dashboard"
                                    className="flex items-center gap-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-full transition-colors"
                                >
                                    <LayoutDashboard className="w-4 h-4" />
                                    Dashboard
                                </Link>
                                <button
                                    onClick={logout}
                                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                    title="Sair"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
                                >
                                    Entrar
                                </Link>
                                <Link
                                    href="/register"
                                    className="text-sm font-bold bg-blue-600 text-white px-5 py-2.5 rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                                >
                                    Criar conta
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-slate-600"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMobileMenuOpen && (
                    <div className="md:hidden pt-6 pb-4 bg-white border-t border-slate-100 mt-4 animate-in slide-in-from-top-5 fade-in duration-200">
                        <nav className="flex flex-col gap-4">
                            <Link
                                href="/"
                                className="text-lg font-medium text-slate-600 hover:text-blue-600 py-2 border-b border-slate-50"
                                onClick={closeMobileMenu}
                            >
                                Início
                            </Link>
                            <Link
                                href="/services"
                                className="text-lg font-medium text-slate-600 hover:text-blue-600 py-2 border-b border-slate-50"
                                onClick={closeMobileMenu}
                            >
                                Serviços
                            </Link>
                            <Link
                                href="/about"
                                className="text-lg font-medium text-slate-600 hover:text-blue-600 py-2 border-b border-slate-50"
                                onClick={closeMobileMenu}
                            >
                                Sobre
                            </Link>
                            <Link
                                href="/contact"
                                className="text-lg font-medium text-slate-600 hover:text-blue-600 py-2 border-b border-slate-50"
                                onClick={closeMobileMenu}
                            >
                                Contato
                            </Link>

                            <div className="pt-4 flex flex-col gap-3">
                                {user ? (
                                    <>
                                        <Link
                                            href="/dashboard"
                                            className="flex items-center justify-center gap-2 text-white bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-xl font-bold transition-colors"
                                            onClick={closeMobileMenu}
                                        >
                                            <LayoutDashboard className="w-5 h-5" />
                                            Acessar Dashboard
                                        </Link>
                                        <button
                                            onClick={() => { logout(); closeMobileMenu(); }}
                                            className="flex items-center justify-center gap-2 text-slate-500 hover:text-red-500 py-2"
                                        >
                                            <LogOut className="w-5 h-5" />
                                            Sair da conta
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href="/login"
                                            className="text-center text-slate-600 font-medium py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                                            onClick={closeMobileMenu}
                                        >
                                            Entrar
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="text-center bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors"
                                            onClick={closeMobileMenu}
                                        >
                                            Criar conta grátis
                                        </Link>
                                    </>
                                )}
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
