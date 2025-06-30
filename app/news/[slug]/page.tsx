import Link from 'next/link';
import Image from 'next/image';
import { articles } from '@/data/articles';
import React from 'react';
import { Metadata } from 'next';
import ArticleHoverEffect from '@/components/ArticleHoverEffect';

// Generate metadata for each article
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const article = articles.find((a) => a.slug === slug);

    if (!article) {
        return {
            title: 'Article Not Found - Khmer News Reader',
            description: 'The requested article could not be found.',
        };
    }

    const articleUrl = `https://khmernewsreader.com/news/${article.slug}`;
    const imageUrl = article.image ? `https://khmernewsreader.com${article.image.url}` : 'https://khmernewsreader.com/og-image.png';

    return {
        title: `${article.title} - Khmer News Reader`,
        description: `Read "${article.title}" in Khmer with English translation and transliteration. Practice Khmer language with real-world news articles.`,
        keywords: [
            'Khmer news',
            'Cambodian news',
            'Khmer language learning',
            'Khmer reading practice',
            article.title,
            'Khmer translation',
            'Khmer transliteration'
        ],
        openGraph: {
            title: article.title,
            description: `Read "${article.title}" in Khmer with English translation and transliteration.`,
            url: articleUrl,
            siteName: 'Khmer News Reader',
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: article.image?.alt || article.title,
                },
            ],
            locale: 'en_US',
            type: 'article',
            publishedTime: article.date,
            authors: ['Khmer News Reader Team'],
        },
        twitter: {
            card: 'summary_large_image',
            title: article.title,
            description: `Read "${article.title}" in Khmer with English translation and transliteration.`,
            images: [imageUrl],
        },
        alternates: {
            canonical: articleUrl,
        },
    };
}

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function NewsArticlePage({ params }: PageProps) {
    const { slug } = await params;
    const article = articles.find((a) => a.slug === slug);

    if (!article) return <div className="p-10 text-center text-red-700 font-medium">Article not found</div>;

    // Get current view count for initial display (not incrementing)
    let initialViewCount = 0;
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/views/${slug}`, {
            cache: 'no-store'
        });
        if (response.ok) {
            const data = await response.json();
            initialViewCount = data.viewCount || 0;
        }
    } catch (error) {
        console.error('Failed to fetch initial view count:', error);
    }

    // --- Helper functions must be defined before use ---
    const highlightKhmer = (text: string) => {
        let result = text;
        article.vocabulary.forEach(({ khmer, english, translit }) => {
            const safeKhmer = khmer.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`(${safeKhmer})`, 'g');
            result = result.replace(
                regex,
                `
                <span class="group inline-block relative text-blue-900 font-semibold linked-word" data-word="${english.toLowerCase()}">
  <span class="bg-yellow-100 rounded px-1 cursor-pointer transition border-b-2 border-dotted border-yellow-700">
    $1
  </span>
  <span class="absolute hidden group-hover:block text-xs bg-gray-900 text-white px-2 py-1 rounded mt-1 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap">
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
                    <span key={i} className="group inline-block relative text-blue-900 font-semibold linked-word" data-word={match.english.toLowerCase()}>
                        <span className="bg-yellow-100 rounded px-1 cursor-pointer hover:bg-yellow-300 transition">{word}</span>
                        <span className="absolute hidden group-hover:block text-xs bg-gray-900 text-white px-2 py-1 rounded mt-1 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap">
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
                `<span class="group inline-block relative text-blue-900 font-semibold linked-word" data-word="${english.toLowerCase()}">
          <span class="bg-yellow-100 rounded px-1 cursor-pointer hover:bg-yellow-300 transition">$1</span>
          <span class="absolute hidden group-hover:block text-xs bg-gray-900 text-white px-2 py-1 rounded mt-1 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap">
            ${khmer} — ${english}
          </span>
        </span>`
            );
        });
        return result;
    };

    // Render the hover effect logic as a client component
    // (renders nothing, just runs the effect)
    return (
        <>
            <ArticleHoverEffect slug={slug} />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 animate-fade-in">
                {/* Structured Data for SEO */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Article",
                            "headline": article.title,
                            "description": `Read "${article.title}" in Khmer with English translation and transliteration.`,
                            "image": article.image ? `https://khmernewsreader.com${article.image.url}` : "https://khmernewsreader.com/og-image.png",
                            "author": {
                                "@type": "Organization",
                                "name": "Khmer News Reader Team"
                            },
                            "publisher": {
                                "@type": "Organization",
                                "name": "Khmer News Reader",
                                "logo": {
                                    "@type": "ImageObject",
                                    "url": "https://khmernewsreader.com/logo.png"
                                }
                            },
                            "datePublished": article.date,
                            "dateModified": article.date,
                            "mainEntityOfPage": {
                                "@type": "WebPage",
                                "@id": `https://khmernewsreader.com/news/${article.slug}`
                            },
                            "inLanguage": ["en", "km"],
                            "keywords": [
                                "Khmer news",
                                "Cambodian news",
                                "Khmer language learning",
                                "Khmer reading practice",
                                article.title
                            ]
                        })
                    }}
                />

                <div className="bg-white/90 backdrop-blur-md border-b border-gray-200/70 sticky top-0 z-50 shadow-sm">
                    <div className="max-w-6xl mx-auto px-6 py-5">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-3 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-all duration-200 group hover:gap-4"
                        >
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-all duration-200 group-hover:scale-110">
                                <svg
                                    className="w-4 h-4 transition-all duration-200 group-hover:-translate-x-0.5 group-hover:scale-110"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2.5"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                            </div>
                            <span className="relative">
                                Back to Homepage
                                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                            </span>
                        </Link>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-6 py-8 animate-fade-in-up">
                    <div className="flex flex-col items-start text-center mb-4">
                        <h1 className="text-3xl md:text-xl font-bold text-gray-900 mb-2 leading-tight">
                            📰 {article.title}
                        </h1>
                        <div className="flex flex-wrap justify-center items-center gap-3 text-sm text-gray-700 mb-4">
                            <div className="inline-flex items-center gap-2 bg-red-100 text-red-900 px-3 py-1 rounded-full text-xs font-medium">
                                <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></span>
                                Latest News
                            </div>
                            <span className="text-gray-600">•</span>
                            <span className="text-gray-800">Published on {article.date}</span>
                            <span className="text-gray-600">•</span>
                            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-xs font-medium">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                </svg>
                                <span id="article-view-count">{initialViewCount}</span> views
                            </div>
                            <span className="text-gray-600">•</span>
                            <span className="text-xs text-amber-900 bg-amber-100 border border-amber-300 px-2 py-1 rounded">
                                Curated by Human
                            </span>
                        </div>
                    </div>

                    {/* Optional Article Image */}
                    {article.image && (
                        <section className="bg-white rounded-xl shadow-sm p-6 mb-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            <div className="relative">
                                <Image
                                    src={article.image.url}
                                    alt={article.image.alt}
                                    className="w-full h-auto rounded-lg shadow-md object-cover"
                                    style={{ maxHeight: '700px' }}
                                    width={1000}
                                    height={1000}
                                />
                                {article.image.caption && (
                                    <div className="mt-3 text-center">
                                        <p className="text-sm text-gray-600 italic">
                                            {article.image.caption}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                    <div className="grid gap-4">
                        <section className="bg-white rounded-xl shadow-sm p-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-blue-700">🇰🇭 Khmer Original</h2>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-500 font-medium">Text Size:</span>
                                    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                                        <button
                                            id="decrease-text-size"
                                            className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-white rounded transition-colors text-xs font-bold"
                                            title="Decrease text size"
                                        >
                                            A-
                                        </button>
                                        <span className="text-xs text-gray-700 font-medium px-2" id="text-size-display">20px</span>
                                        <button
                                            id="increase-text-size"
                                            className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-white rounded transition-colors text-xs font-bold"
                                            title="Increase text size"
                                        >
                                            A+
                                        </button>
                                        <button
                                            id="reset-text-size"
                                            className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-white rounded transition-colors text-xs font-bold"
                                            title="Reset text size"
                                        >
                                            ↺
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="text-xl space-y-3 leading-relaxed text-gray-900 khmer-text" style={{ fontSize: '20px' }}>
                                {article.khmer.map((para, i) => (
                                    <p key={i} dangerouslySetInnerHTML={{ __html: highlightKhmer(para) }} />
                                ))}
                            </div>
                        </section>

                        <section className="relative bg-gradient-to-br from-green-50 via-white to-emerald-50/30 rounded-2xl shadow-lg border border-green-100/50 p-8 overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                            {/* Decorative background elements */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-green-200/15 to-transparent rounded-full -translate-y-12 translate-x-12"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-emerald-200/10 to-transparent rounded-full translate-y-16 -translate-x-16"></div>

                            {/* Header with enhanced design */}
                            <div className="relative mb-6">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center text-white text-lg shadow-lg">
                                            🇬🇧
                                        </div>
                                        <h2 className="text-2xl font-bold bg-gradient-to-r from-green-700 via-emerald-600 to-green-600 bg-clip-text text-transparent">
                                            English Translation
                                        </h2>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-500 font-medium">Text Size:</span>
                                        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                                            <button
                                                id="decrease-english-text-size"
                                                className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-green-600 hover:bg-white rounded transition-colors text-xs font-bold"
                                                title="Decrease text size"
                                            >
                                                A-
                                            </button>
                                            <span className="text-xs text-gray-700 font-medium px-2" id="english-text-size-display">16px</span>
                                            <button
                                                id="increase-english-text-size"
                                                className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-green-600 hover:bg-white rounded transition-colors text-xs font-bold"
                                                title="Increase text size"
                                            >
                                                A+
                                            </button>
                                            <button
                                                id="reset-english-text-size"
                                                className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-green-600 hover:bg-white rounded transition-colors text-xs font-bold"
                                                title="Reset text size"
                                            >
                                                ↺
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content area with enhanced styling */}
                            <div className="relative bg-white/60 backdrop-blur-sm rounded-xl border border-green-100/50 p-6 shadow-sm">
                                <div className="text-base space-y-4 text-gray-900 leading-relaxed english-text" style={{ fontSize: '16px' }}>
                                    {article.english.map((para, i) => (
                                        <p key={i} className="group hover:text-green-800 transition-colors duration-200 p-3 rounded-lg hover:bg-green-50/50">
                                            {/* <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-3 opacity-60 group-hover:opacity-100 transition-opacity duration-200"></span> */}
                                            {highlightEnglish(para)}
                                        </p>
                                    ))}
                                </div>
                            </div>

                            {/* Bottom accent */}
                            <div className="mt-4 flex justify-end">
                                <div className="flex gap-1">
                                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                                </div>
                            </div>
                        </section>

                        <section className="relative bg-gradient-to-br from-purple-50 via-white to-violet-50/30 rounded-2xl shadow-lg border border-purple-100/50 p-8 overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                            {/* Decorative background elements */}
                            <div className="absolute top-0 left-0 w-28 h-28 bg-gradient-to-br from-purple-200/15 to-transparent rounded-full -translate-y-14 -translate-x-14"></div>
                            <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-violet-200/10 to-transparent rounded-full translate-y-10 translate-x-10"></div>

                            {/* Header with enhanced design */}
                            <div className="relative mb-6">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl flex items-center justify-center text-white text-lg shadow-lg">
                                            🔤
                                        </div>
                                        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-700 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                                            Khmer Transliteration
                                        </h2>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-500 font-medium">Text Size:</span>
                                        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                                            <button
                                                id="decrease-translit-text-size"
                                                className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-purple-600 hover:bg-white rounded transition-colors text-xs font-bold"
                                                title="Decrease text size"
                                            >
                                                A-
                                            </button>
                                            <span className="text-xs text-gray-700 font-medium px-2" id="translit-text-size-display">16px</span>
                                            <button
                                                id="increase-translit-text-size"
                                                className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-purple-600 hover:bg-white rounded transition-colors text-xs font-bold"
                                                title="Increase text size"
                                            >
                                                A+
                                            </button>
                                            <button
                                                id="reset-translit-text-size"
                                                className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-purple-600 hover:bg-white rounded transition-colors text-xs font-bold"
                                                title="Reset text size"
                                            >
                                                ↺
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content area with enhanced styling */}
                            <div className="relative bg-white/60 backdrop-blur-sm rounded-xl border border-purple-100/50 p-6 shadow-sm">
                                <div className="text-base space-y-4 text-gray-800 leading-relaxed translit-text" style={{ fontSize: '16px' }}>
                                    {article.transliteration.map((para, i) => (
                                        <p key={i}
                                            className="group hover:text-purple-800 transition-colors duration-200 p-3 rounded-lg hover:bg-purple-50/50 italic font-medium"
                                            dangerouslySetInnerHTML={{
                                                __html: `
                                               
                                                ${highlightTransliteration(para)}`
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Bottom accent */}
                            <div className="mt-4 flex justify-end">
                                <div className="flex gap-1">
                                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></div>
                                    <div className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                                </div>
                            </div>
                        </section>

                        <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 rounded-2xl shadow-lg border border-blue-200 p-8 overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                            {/* Decorative background elements */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-300/30 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-300/30 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
                            <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-gradient-to-r from-cyan-300/20 to-blue-300/20 rounded-full -translate-x-10 -translate-y-10"></div>

                            {/* Header with enhanced typography */}
                            <div className="relative mb-8">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg animate-pulse">
                                        🌊
                                    </div>
                                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                                        Vocabulary
                                    </h2>
                                </div>
                                {/* <p className="text-blue-600/80 text-sm font-medium pl-15">Essential words and phrases</p>
                                <div className="w-20 h-1 bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 rounded-full mt-3"></div> */}
                            </div>

                            {/* Enhanced table */}
                            <div className="relative overflow-hidden rounded-xl border border-blue-200 bg-white/95 backdrop-blur-sm shadow-lg">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 text-white">
                                            <th className="py-4 px-6 text-left font-bold text-sm uppercase tracking-wider">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-3 h-3 bg-white rounded-full animate-pulse"></span>
                                                    ភាសាខ្មែរ
                                                </div>
                                            </th>
                                            <th className="py-4 px-6 text-left font-bold text-sm uppercase tracking-wider">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                                                    English
                                                </div>
                                            </th>
                                            <th className="py-4 px-6 text-left font-bold text-sm uppercase tracking-wider">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                                                    Pronunciation
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-blue-100">
                                        {article.vocabulary.map(({ khmer, english, translit }, i) => (
                                            <tr key={i} className="group hover:bg-gradient-to-r hover:from-blue-50/50 hover:via-indigo-50/30 hover:to-cyan-50/50 transition-all duration-300">
                                                <td className="py-4 px-6">
                                                    <span className="text-xl font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                                                        {khmer}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className="font-semibold text-gray-700 capitalize group-hover:text-indigo-600 transition-colors duration-200">
                                                        {english}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className="italic font-medium text-gray-600 bg-gradient-to-r from-blue-100 to-indigo-100 px-4 py-2 rounded-full text-sm group-hover:from-indigo-100 group-hover:to-cyan-100 group-hover:text-indigo-700 transition-all duration-200 shadow-sm border border-blue-200">
                                                        /{translit}/
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Bottom accent */}
                            <div className="mt-6 flex justify-center">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                                    <div className="w-3 h-3 bg-indigo-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                    <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                                </div>
                            </div>
                        </section>

                        <section className="bg-white rounded-xl shadow-sm p-6 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                            <h2 className="text-lg font-semibold text-indigo-700 mb-4">🔗 Sources</h2>
                            <ul className="space-y-1 text-sm text-blue-800">
                                {article.sources?.map((source, i) => (
                                    <li key={i}>
                                        <a href={source.url} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-blue-900 transition-colors">
                                            {source.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}
