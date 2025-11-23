'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, Camera, CheckCircle, Shield, AlertCircle, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function VerificationPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [documentFile, setDocumentFile] = useState<File | null>(null);
    const [selfieImage, setSelfieImage] = useState<string | null>(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Camera Handling
    const startCamera = async () => {
        setIsCameraOpen(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error("Error accessing camera:", err);
            alert("Não foi possível acessar a câmera. Verifique as permissões.");
            setIsCameraOpen(false);
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
        setIsCameraOpen(false);
    };

    const captureSelfie = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                canvasRef.current.width = videoRef.current.videoWidth;
                canvasRef.current.height = videoRef.current.videoHeight;
                context.drawImage(videoRef.current, 0, 0);
                const imageDataUrl = canvasRef.current.toDataURL('image/jpeg');
                setSelfieImage(imageDataUrl);
                stopCamera();
            }
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setDocumentFile(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        // Simulate API call
        setStep(4); // Loading/Processing state could be added here
        setTimeout(() => {
            // Redirect to dashboard after "success"
            // router.push('/dashboard'); 
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-purple-500/30 py-12">
            <div className="container mx-auto px-6 max-w-3xl">

                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <Link href="/dashboard" className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Voltar
                    </Link>
                    <div className="flex items-center gap-2 text-green-400 bg-green-400/10 px-3 py-1 rounded-full text-sm font-medium">
                        <Shield className="w-4 h-4" />
                        Ambiente Seguro
                    </div>
                </div>

                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Verificação de Identidade</h1>
                    <p className="text-gray-400">Para garantir a segurança da comunidade KuKhamba, precisamos validar quem você é.</p>
                </div>

                {/* Progress Steps */}
                <div className="flex justify-center items-center gap-4 mb-12">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${step >= s ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-500'
                                }`}>
                                {step > s ? <CheckCircle className="w-6 h-6" /> : s}
                            </div>
                            {s < 3 && (
                                <div className={`w-16 h-1 mx-2 rounded-full ${step > s ? 'bg-purple-600' : 'bg-white/10'
                                    }`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Step Content */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm">

                    {/* STEP 1: Document Upload */}
                    {step === 1 && (
                        <div className="animate-in fade-in slide-in-from-right-8 duration-300">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <Upload className="w-6 h-6 text-purple-400" />
                                Envie seu Documento
                            </h2>
                            <p className="text-gray-400 mb-8">
                                Por favor, envie uma foto clara do seu Bilhete de Identidade (BI) ou Passaporte. Certifique-se de que todos os dados estejam legíveis.
                            </p>

                            <div className="border-2 border-dashed border-white/20 rounded-2xl p-12 text-center hover:border-purple-500/50 transition-colors bg-white/5 cursor-pointer relative group">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                {documentFile ? (
                                    <div className="flex flex-col items-center">
                                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                                            <CheckCircle className="w-8 h-8 text-green-400" />
                                        </div>
                                        <p className="font-semibold text-white">{documentFile.name}</p>
                                        <p className="text-sm text-green-400 mt-2">Arquivo selecionado com sucesso</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                            <Upload className="w-8 h-8 text-purple-400" />
                                        </div>
                                        <p className="font-semibold text-white mb-2">Clique para selecionar ou arraste aqui</p>
                                        <p className="text-sm text-gray-500">JPG, PNG ou PDF (Máx. 5MB)</p>
                                    </div>
                                )}
                            </div>

                            <div className="mt-8 flex justify-end">
                                <button
                                    onClick={() => setStep(2)}
                                    disabled={!documentFile}
                                    className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-xl transition-all"
                                >
                                    Continuar
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: Selfie Capture */}
                    {step === 2 && (
                        <div className="animate-in fade-in slide-in-from-right-8 duration-300">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <Camera className="w-6 h-6 text-purple-400" />
                                Tire uma Selfie
                            </h2>
                            <p className="text-gray-400 mb-8">
                                Precisamos confirmar que o documento pertence a você. Posicione seu rosto no centro da câmera.
                            </p>

                            <div className="bg-black/50 rounded-2xl overflow-hidden aspect-video relative flex items-center justify-center border border-white/10">
                                {selfieImage ? (
                                    <div className="relative w-full h-full">
                                        <img src={selfieImage} alt="Selfie" className="w-full h-full object-cover" />
                                        <button
                                            onClick={() => setSelfieImage(null)}
                                            className="absolute top-4 right-4 p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-full transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                ) : isCameraOpen ? (
                                    <div className="relative w-full h-full">
                                        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover transform scale-x-[-1]" />
                                        <canvas ref={canvasRef} className="hidden" />
                                        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4">
                                            <button
                                                onClick={captureSelfie}
                                                className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center hover:bg-white/20 transition-colors"
                                            >
                                                <div className="w-12 h-12 bg-white rounded-full" />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Camera className="w-10 h-10 text-gray-400" />
                                        </div>
                                        <button
                                            onClick={startCamera}
                                            className="bg-white text-slate-900 font-bold py-3 px-6 rounded-full hover:bg-gray-200 transition-colors"
                                        >
                                            Abrir Câmera
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="mt-8 flex justify-between">
                                <button
                                    onClick={() => setStep(1)}
                                    className="text-gray-400 hover:text-white font-medium px-4 py-2"
                                >
                                    Voltar
                                </button>
                                <button
                                    onClick={() => setStep(3)}
                                    disabled={!selfieImage}
                                    className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-xl transition-all"
                                >
                                    Continuar
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: Confirmation */}
                    {step === 3 && (
                        <div className="animate-in fade-in slide-in-from-right-8 duration-300 text-center">
                            <h2 className="text-2xl font-bold mb-6">Confirme seus dados</h2>

                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                    <p className="text-sm text-gray-400 mb-2">Documento</p>
                                    <div className="flex items-center justify-center gap-2 text-green-400 font-medium">
                                        <CheckCircle className="w-4 h-4" />
                                        {documentFile?.name}
                                    </div>
                                </div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                    <p className="text-sm text-gray-400 mb-2">Selfie</p>
                                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-purple-500">
                                        <img src={selfieImage!} alt="Selfie Preview" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl mb-8 text-left flex gap-3">
                                <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-blue-200">
                                    Ao enviar, você concorda que o KuKhamba processe seus dados biométricos para fins de verificação de identidade, conforme nossa Política de Privacidade.
                                </p>
                            </div>

                            <div className="flex justify-between items-center">
                                <button
                                    onClick={() => setStep(2)}
                                    className="text-gray-400 hover:text-white font-medium px-4 py-2"
                                >
                                    Corrigir
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold py-4 px-12 rounded-xl transition-all shadow-lg shadow-green-500/25"
                                >
                                    Enviar para Análise
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 4: Success State */}
                    {step === 4 && (
                        <div className="animate-in zoom-in duration-500 text-center py-12">
                            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/50">
                                <CheckCircle className="w-12 h-12 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold mb-4">Verificação em Análise!</h2>
                            <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
                                Recebemos seus documentos. Nossa equipe fará a validação em até 24 horas. Você receberá uma notificação assim que aprovado.
                            </p>
                            <Link
                                href="/dashboard"
                                className="inline-block bg-white text-slate-900 font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-colors"
                            >
                                Voltar ao Dashboard
                            </Link>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
