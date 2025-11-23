import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-slate-950 border-t border-white/10 pt-16 pb-8 text-gray-400">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center font-bold text-white">
                                K
                            </div>
                            <span className="font-bold text-xl text-white">KuKhamba</span>
                        </div>
                        <p className="text-sm leading-relaxed mb-6">
                            A maior plataforma de serviços de Moçambique. Conectamos quem precisa a quem sabe fazer, com segurança e qualidade.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-purple-400 transition-colors"><Facebook className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-pink-400 transition-colors"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-blue-400 transition-colors"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-blue-600 transition-colors"><Linkedin className="w-5 h-5" /></a>
                        </div>
                    </div>

                    {/* Links Rápidos */}
                    <div>
                        <h3 className="text-white font-bold mb-6">Empresa</h3>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/about" className="hover:text-purple-400 transition-colors">Sobre Nós</Link></li>
                            <li><Link href="/blog" className="hover:text-purple-400 transition-colors">Blog</Link></li>
                            <li><Link href="/careers" className="hover:text-purple-400 transition-colors">Carreiras</Link></li>
                            <li><Link href="/press" className="hover:text-purple-400 transition-colors">Imprensa</Link></li>
                        </ul>
                    </div>

                    {/* Suporte */}
                    <div>
                        <h3 className="text-white font-bold mb-6">Suporte</h3>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/faq" className="hover:text-purple-400 transition-colors">FAQ / Ajuda</Link></li>
                            <li><Link href="/terms" className="hover:text-purple-400 transition-colors">Termos de Uso</Link></li>
                            <li><Link href="/privacy" className="hover:text-purple-400 transition-colors">Política de Privacidade</Link></li>
                            <li><Link href="/safety" className="hover:text-purple-400 transition-colors">Segurança</Link></li>
                        </ul>
                    </div>

                    {/* Contato */}
                    <div>
                        <h3 className="text-white font-bold mb-6">Contato</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-purple-500 flex-shrink-0" />
                                <span>Av. Julius Nyerere, 1234<br />Maputo, Moçambique</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-purple-500 flex-shrink-0" />
                                <span>+258 84 123 4567</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-purple-500 flex-shrink-0" />
                                <span>contato@kukhamba.mz</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                    <p>&copy; {new Date().getFullYear()} KuKhamba. Todos os direitos reservados.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacidade</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Termos</Link>
                        <Link href="/sitemap" className="hover:text-white transition-colors">Mapa do Site</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
