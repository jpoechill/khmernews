"use client";

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { articles } from '@/data/articles';
import React, { useEffect } from 'react';

export default function NewsArticlePage() {
    const { slug } = useParams();
    const article = articles.find((a) => a.slug === slug);


    useEffect(() => {
        const handleHover = (e: MouseEvent) => {
            const el = (e.target as HTMLElement).closest('[data-word]');
            const word = el?.getAttribute('data-word');
            if (!word) return;
            document.querySelectorAll(`[data-word="${word}"]`).forEach((el) => {
                el.classList.add('ring', 'ring-yellow-400');
            });
        };

        const handleLeave = (e: MouseEvent) => {
            const el = (e.target as HTMLElement).closest('[data-word]');
            const word = el?.getAttribute('data-word');
            if (!word) return;
            document.querySelectorAll(`[data-word="${word}"]`).forEach((el) => {
                el.classList.remove('ring', 'ring-yellow-400');
            });
        };

        const observer = new MutationObserver(() => {
            document.querySelectorAll('[data-word]').forEach((el) => {
                const element = el as HTMLElement;
                element.removeEventListener('mouseenter', handleHover);
                element.removeEventListener('mouseleave', handleLeave);
                element.addEventListener('mouseenter', handleHover);
                element.addEventListener('mouseleave', handleLeave);
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => observer.disconnect();
    }, []);

    if (!article) return <div className="p-10 text-center text-red-600">Article not found</div>;


    const highlightKhmer = (text: string) => {
        let result = text;

        article.vocabulary.forEach(({ khmer, english, translit }) => {
            const safeKhmer = khmer.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`(${safeKhmer})`, 'g');
            result = result.replace(
                regex,
                `
                <span class="group inline-block relative text-indigo-800 font-semibold linked-word" data-word="${english.toLowerCase()}">
  <span class="bg-yellow-100 rounded px-1 cursor-pointer transition border-b-2 border-dotted border-yellow-600">
    $1
  </span>
  <span class="absolute hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded mt-1 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap">
    ${english} — <i>${translit}</i>
  </span>
</span>
                `
            );
        });

        return result;
    };

    const highlightEnglish = (text: string) => {
        const words = text.split(/(\s+)/);
        return words.map((word, i) => {
            const clean = word.replace(/[.,:;"'()\-–—]/g, '').toLowerCase();
            const match = article.vocabulary.find(v => v.english.toLowerCase() === clean);
            if (match) {
                return (
                    <span key={i} className="group inline-block relative text-indigo-800 font-semibold linked-word" data-word={match.english.toLowerCase()}>
                        <span className="bg-yellow-100 rounded px-1 cursor-pointer hover:bg-yellow-300 transition">{word}</span>
                        <span className="absolute hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded mt-1 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap">
                            {match.khmer} — <i>{match.translit}</i>
                        </span>
                    </span>
                );
            }
            return <span key={i}>{word}</span>;
        });
    };

    const highlightTransliteration = (text: string) => {
        let result = text;

        article.vocabulary.forEach(({ translit, khmer, english }) => {
            const regex = new RegExp(`\\b(${translit})\\b`, 'gi');
            result = result.replace(
                regex,
                `<span class="group inline-block relative text-indigo-800 font-semibold linked-word" data-word="${english.toLowerCase()}">
          <span class="bg-yellow-100 rounded px-1 cursor-pointer hover:bg-yellow-300 transition">$1</span>
          <span class="absolute hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded mt-1 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap">
            ${khmer} — ${english}
          </span>
        </span>`
            );
        });

        return result;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-6 py-4">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors group">
                        <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Homepage
                    </Link>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-8">
                <div className="flex flex-col items-start text-center mb-4">
                    <h1 className="text-3xl md:text-xl font-bold text-gray-900 mb-2 leading-tight">
                        📰 {article.title}
                    </h1>
                    <div className="flex flex-wrap justify-center items-center gap-3 text-sm text-gray-600 mb-4">
                        <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                            Latest News
                        </div>
                        <span className="text-gray-500">•</span>
                        <span>Published on {article.date}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-xs text-amber-800 bg-amber-100 border border-amber-200 px-2 py-1 rounded">
                            Curated by Human, Generated by AI
                        </span>
                    </div>
                </div>

                <div className="grid gap-4">
                    <section className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-blue-600 mb-4">🇰🇭 Khmer Original</h2>
                        <div className="text-xl space-y-3 leading-relaxed text-gray-800">
                            {article.khmer.map((para, i) => (
                                <p key={i} dangerouslySetInnerHTML={{ __html: highlightKhmer(para) }} />
                            ))}
                        </div>
                    </section>

                    <section className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-green-600 mb-4">📘 English Translation</h2>
                        <div className="text-base space-y-2 text-gray-800">
                            {article.english.map((para, i) => (
                                <p key={i}>{highlightEnglish(para)}</p>
                            ))}
                        </div>
                    </section>

                    <section className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-purple-600 mb-4">📗 Khmer Transliteration</h2>
                        <div className="text-base space-y-2 text-gray-700 italic">
                            {article.transliteration.map((para, i) => (
                                <p key={i} dangerouslySetInnerHTML={{ __html: highlightTransliteration(para) }} />
                            ))}
                        </div>
                    </section>

                    <section className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-orange-600 mb-4">📖 Vocabulary</h2>
                        <table className="w-full text-sm border-t border-gray-200">
                            <thead>
                                <tr className="text-left">
                                    <th className="py-2">Khmer</th>
                                    <th className="py-2">English</th>
                                    <th className="py-2">Transliteration</th>
                                </tr>
                            </thead>
                            <tbody>
                                {article.vocabulary.map(({ khmer, english, translit }, i) => (
                                    <tr key={i} className="border-t">
                                        <td className="py-2 font-medium text-gray-800">{khmer}</td>
                                        <td className="py-2 capitalize">{english}</td>
                                        <td className="py-2 italic text-gray-600">{translit}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>

                    <section className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-indigo-600 mb-4">🔗 Sources</h2>
                        <ul className="space-y-1 text-sm text-blue-700">
                            {article.sources?.map((source, i) => (
                                <li key={i}>
                                    <a href={source.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                        {source.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}
