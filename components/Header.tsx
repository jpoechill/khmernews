// components/Header.tsx
import React from 'react';

// Define a type for vocabulary
interface Vocabulary {
    khmer: string;
    english: string;
    translit: string;
}

// Define a type for Article
interface Article {
    vocabulary?: Vocabulary[];
    slug: string;
    title: string;
    date: string;
    image?: {
        url: string;
        alt: string;
        caption?: string;
    };
    english?: string[];
    khmer?: string[];
    transliteration?: string[];
    sources?: { title: string; url: string }[];
    // Add other known properties as needed
    // [key: string]: unknown; // Remove 'any', use 'unknown' if you must allow extra fields
}

interface HeaderProps {
    articles: Article[];
}

export default function Header({ articles }: HeaderProps) {
    return (
        <header className="bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 border-b border-blue-100/50 mt-6 relative overflow-hidden rounded-b-2xl shadow-sm">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none">
                <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl transform -translate-x-32 -translate-y-32"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full blur-3xl transform translate-x-48 translate-y-48"></div>
            </div>
            <div className="max-w-5xl mx-auto px-6 py-4 relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center border border-blue-200 shadow">
                            <span className="text-xl text-blue-700">📰</span>
                        </div>
                    </div>
                    <div className="space-y-0.5">
                        <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">MixNews</h1>
                        <p className="text-sm text-slate-600 font-light">Learn Khmer through real news.</p>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mt-2 md:mt-0">
                    {/* Stats */}
                    <div className="flex items-center gap-4 text-xs text-slate-700 font-medium bg-white/70 px-3 py-1 rounded-lg border border-blue-100 shadow-sm">
                        <span><span className="font-bold text-blue-700">{articles.length}</span> Articles</span>
                        <span className="hidden md:inline">|</span>
                        <span><span className="font-bold text-indigo-700">{articles.reduce((total, a) => total + (a.vocabulary?.length || 0), 0)}</span> Vocabulary</span>
                    </div>
                    {/* Auth */}
                    <div className="flex items-center gap-2">
                        <a href="/login" className="text-xs font-semibold text-blue-700 hover:text-indigo-700 px-3 py-1 rounded transition-colors">Login</a>
                        <a href="/signup" className="text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-700 hover:to-blue-700 px-3 py-1 rounded shadow-sm transition-colors">Sign Up</a>
                    </div>
                </div>
            </div>
        </header>
    );
}