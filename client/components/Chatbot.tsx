'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Bot, User, ChevronRight, RefreshCcw } from 'lucide-react';

type Option = {
    label: string;
    action: string;
};

type Message = {
    id: string;
    text: React.ReactNode; // Allow JSX for rich content
    sender: 'user' | 'bot';
    timestamp: Date;
    options?: Option[];
};

// Knowledge Base / Decision Tree
const botFlow: Record<string, { text: string | React.ReactNode; options?: Option[] }> = {
    start: {
        text: "Olá! Bem-vindo ao KuKhamba. Sou seu assistente virtual. Como posso ajudar você hoje?",
        options: [
            { label: "Quero Contratar um Serviço", action: "hire_service" },
            { label: "Quero Oferecer Serviços", action: "offer_service" },
            { label: "Dúvidas sobre Pagamentos", action: "payments" },
            { label: "Segurança e Garantia", action: "safety" },
            { label: "Falar com Suporte Humano", action: "support" },
        ],
    },
    hire_service: {
        text: "Ótimo! Para contratar é muito simples:\n\n1. Crie uma conta como 'Cliente'.\n2. Pesquise o serviço que precisa (ex: Eletricista, Limpeza).\n3. Veja os perfis, avaliações e solicite um orçamento.\n\nO que você gostaria de saber mais?",
        options: [
            { label: "Como escolher o melhor profissional?", action: "how_to_choose" },
            { label: "É gratuito para clientes?", action: "cost_client" },
            { label: "Voltar ao Menu Inicial", action: "start" },
        ],
    },
    offer_service: {
        text: "Excelente! Estamos sempre buscando bons profissionais.\n\nPara começar:\n1. Cadastre-se como 'Prestador de Serviços'.\n2. Complete seu perfil com fotos e documentos.\n3. Aguarde a verificação e comece a receber pedidos!",
        options: [
            { label: "Quanto custa para anunciar?", action: "cost_provider" },
            { label: "Quais documentos preciso?", action: "documents" },
            { label: "Voltar ao Menu Inicial", action: "start" },
        ],
    },
    payments: {
        text: "Aceitamos diversos métodos de pagamento para facilitar sua vida:\n\n✅ M-Pesa\n✅ e-Mola\n✅ Cartão de Crédito/Débito\n\nO pagamento fica seguro conosco e só é liberado ao profissional após a conclusão do serviço.",
        options: [
            { label: "Como funciona o reembolso?", action: "refund" },
            { label: "Voltar ao Menu Inicial", action: "start" },
        ],
    },
    safety: {
        text: "Sua segurança é nossa prioridade! 🛡️\n\n- Todos os prestadores passam por verificação de identidade.\n- Temos um sistema de avaliações reais.\n- Garantia de satisfação: se algo der errado, nossa equipe intervém.",
        options: [
            { label: "Ver Dicas de Segurança", action: "safety_tips" },
            { label: "Voltar ao Menu Inicial", action: "start" },
        ],
    },
    support: {
        text: (
            <span>
                Se precisar de ajuda mais específica, nossa equipe está à disposição.<br /><br />
                📧 Email: <a href="mailto:suporte@kukhamba.mz" className="text-blue-400 underline">suporte@kukhamba.mz</a><br />
                📱 WhatsApp: +258 84 123 4567<br /><br />
                Atendemos de Seg a Sex, das 8h às 18h.
            </span>
        ),
        options: [
            { label: "Voltar ao Menu Inicial", action: "start" },
        ],
    },
    // Sub-flows
    how_to_choose: {
        text: "Dica de Ouro: Verifique sempre as estrelas ⭐ e leia os comentários de clientes anteriores. Peça fotos de trabalhos passados antes de fechar negócio.",
        options: [{ label: "Voltar", action: "hire_service" }],
    },
    cost_client: {
        text: "Sim! Para clientes, o uso da plataforma é 100% gratuito. Você paga apenas o valor combinado com o prestador pelo serviço.",
        options: [{ label: "Voltar", action: "hire_service" }],
    },
    cost_provider: {
        text: "O cadastro é gratuito! Cobramos apenas uma pequena taxa de serviço (10-15%) sobre os trabalhos que você fechar através da plataforma.",
        options: [{ label: "Voltar", action: "offer_service" }],
    },
    documents: {
        text: "Geralmente pedimos:\n- Documento de Identidade (BI ou Passaporte)\n- Comprovante de Residência\n- Certificados (se aplicável à profissão)",
        options: [{ label: "Voltar", action: "offer_service" }],
    },
    refund: {
        text: "Se o serviço não for realizado ou for muito diferente do combinado, você pode abrir uma disputa. Analisaremos o caso e podemos devolver 100% do seu dinheiro.",
        options: [{ label: "Voltar", action: "payments" }],
    },
    safety_tips: {
        text: "1. Nunca pague por fora da plataforma.\n2. Mantenha toda a comunicação no chat do KuKhamba.\n3. Não compartilhe dados pessoais sensíveis desnecessários.",
        options: [{ label: "Voltar", action: "safety" }],
    },
};

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Initialize chat on client-side only to avoid hydration mismatch
    useEffect(() => {
        setMessages([
            {
                id: 'init',
                text: botFlow['start'].text,
                sender: 'bot',
                timestamp: new Date(),
                options: botFlow['start'].options
            }
        ]);
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, isOpen]);

    const handleOptionClick = (option: Option) => {
        // 1. Add user selection as a message
        const userMsg: Message = {
            id: Date.now().toString(),
            text: option.label,
            sender: 'user',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMsg]);
        setIsTyping(true);

        // 2. Find response
        const response = botFlow[option.action];

        // 3. Simulate delay and add bot response
        setTimeout(() => {
            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: response.text,
                sender: 'bot',
                timestamp: new Date(),
                options: response.options
            };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 800);
    };

    const resetChat = () => {
        setMessages([
            {
                id: Date.now().toString(),
                text: botFlow['start'].text,
                sender: 'bot',
                timestamp: new Date(),
                options: botFlow['start'].options
            }
        ]);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 font-sans">
            {/* Chat Window */}
            {isOpen && (
                <div className="absolute bottom-16 right-0 w-[350px] h-[550px] bg-slate-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300 flex flex-col">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 flex items-center justify-between flex-shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm relative">
                                <Bot className="w-6 h-6 text-white" />
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-purple-600 rounded-full"></span>
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-sm">Assistente KuKhamba</h3>
                                <span className="text-xs text-white/80">Respostas instantâneas</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={resetChat}
                                className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded"
                                title="Reiniciar conversa"
                            >
                                <RefreshCcw className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-950/95 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                            >
                                <div className={`flex items-end gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'user' ? 'bg-purple-500/20' : 'bg-blue-500/20'
                                        }`}>
                                        {msg.sender === 'user' ? (
                                            <User className="w-4 h-4 text-purple-400" />
                                        ) : (
                                            <Bot className="w-4 h-4 text-blue-400" />
                                        )}
                                    </div>

                                    <div className={`p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.sender === 'user'
                                        ? 'bg-purple-600 text-white rounded-tr-none'
                                        : 'bg-white/10 text-gray-200 rounded-tl-none border border-white/5'
                                        }`}>
                                        {typeof msg.text === 'string' ? (
                                            msg.text.split('\n').map((line, i, arr) => (
                                                <span key={i}>
                                                    {line}
                                                    {i < arr.length - 1 && <br />}
                                                </span>
                                            ))
                                        ) : (
                                            msg.text
                                        )}
                                    </div>
                                </div>

                                {/* Options Buttons (Only for bot messages) */}
                                {msg.sender === 'bot' && msg.options && (
                                    <div className="mt-3 ml-10 flex flex-wrap gap-2 max-w-[90%]">
                                        {msg.options.map((option, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleOptionClick(option)}
                                                className="text-xs sm:text-sm bg-white/5 hover:bg-purple-500/20 hover:text-purple-300 border border-white/10 text-gray-300 px-4 py-2 rounded-full transition-all duration-200 flex items-center gap-1 group"
                                            >
                                                {option.label}
                                                <ChevronRight className="w-3 h-3 opacity-50 group-hover:translate-x-0.5 transition-transform" />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex items-center gap-2 ml-2">
                                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                                    <Bot className="w-4 h-4 text-blue-400" />
                                </div>
                                <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-purple-500/25 ${isOpen
                    ? 'bg-slate-800 text-white rotate-90'
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white animate-pulse-slow'
                    }`}
            >
                {isOpen ? (
                    <X className="w-6 h-6" />
                ) : (
                    <MessageSquare className="w-6 h-6" />
                )}
            </button>
        </div>
    );
}
