import React, { useState, useRef } from 'react';
import { supabase } from '../lib/supabase';

interface FileUploadProps {
    label: string;
    bucketName: string;
    onUploadComplete: (url: string) => void;
    accept?: string;
}

export default function FileUpload({ label, bucketName, onUploadComplete, accept = "image/*,application/pdf" }: FileUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setError(null);
            const file = event.target.files?.[0];
            if (!file) return;

            // Preview
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviewUrl(reader.result as string);
                };
                reader.readAsDataURL(file);
            } else {
                setPreviewUrl(null);
            }

            setUploading(true);

            // Upload to Supabase
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { data, error: uploadError } = await supabase.storage
                .from(bucketName)
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            // Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from(bucketName)
                .getPublicUrl(filePath);

            onUploadComplete(publicUrl);
        } catch (err: any) {
            console.error('Error uploading file:', err);
            setError(err.message || 'Erro ao fazer upload');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>

            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-indigo-500 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}>
                <div className="space-y-1 text-center">
                    {previewUrl ? (
                        <div className="relative">
                            <img src={previewUrl} alt="Preview" className="mx-auto h-48 object-cover rounded-md" />
                            <p className="text-xs text-gray-500 mt-2">Clique para alterar</p>
                        </div>
                    ) : (
                        <>
                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="flex text-sm text-gray-600 justify-center">
                                <span className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                    Upload um arquivo
                                </span>
                                <p className="pl-1">ou arraste e solte</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, PDF até 10MB</p>
                        </>
                    )}
                    <input
                        ref={fileInputRef}
                        type="file"
                        className="sr-only"
                        accept={accept}
                        onChange={handleFileChange}
                        disabled={uploading}
                    />
                </div>
            </div>

            {uploading && (
                <div className="mt-2 flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600 mr-2"></div>
                    <span className="text-sm text-gray-500">Enviando...</span>
                </div>
            )}

            {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}
