import Link from 'next/link';
import Image from 'next/image';
import { articles } from '@/data/articles';
import React from 'react';
import { Metadata } from 'next';
import ArticleHoverEffect from '@/components/ArticleHoverEffect';

// Generate metadata for each article
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const article = articles.find((a) => a.slug === params.slug);

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
            <ArticleHoverEffect />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
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

                <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
                    <div className="max-w-5xl mx-auto px-6 py-4">
                        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-900 transition-colors group">
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
                        <div className="flex flex-wrap justify-center items-center gap-3 text-sm text-gray-700 mb-4">
                            <div className="inline-flex items-center gap-2 bg-red-100 text-red-900 px-3 py-1 rounded-full text-xs font-medium">
                                <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></span>
                                Latest News
                            </div>
                            <span className="text-gray-600">•</span>
                            <span className="text-gray-800">Published on {article.date}</span>
                            <span className="text-gray-600">•</span>
                            <span className="text-xs text-amber-900 bg-amber-100 border border-amber-300 px-2 py-1 rounded">
                                Curated by Human
                            </span>
                        </div>
                    </div>

                    {/* Optional Article Image */}
                    {article.image && (
                        <section className="bg-white rounded-xl shadow-sm p-6 mb-4">
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
                        <section className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-blue-700 mb-4">🇰🇭 Khmer Original</h2>
                            <div className="text-xl space-y-3 leading-relaxed text-gray-900">
                                {article.khmer.map((para, i) => (
                                    <p key={i} dangerouslySetInnerHTML={{ __html: highlightKhmer(para) }} />
                                ))}
                            </div>
                        </section>

                        <section className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-green-700 mb-4">📘 English Translation</h2>
                            <div className="text-base space-y-2 text-gray-900">
                                {article.english.map((para, i) => (
                                    <p key={i}>{highlightEnglish(para)}</p>
                                ))}
                            </div>
                        </section>

                        <section className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-purple-700 mb-4">📗 Khmer Transliteration</h2>
                            <div className="text-base space-y-2 text-gray-800 italic">
                                {article.transliteration.map((para, i) => (
                                    <p key={i} dangerouslySetInnerHTML={{ __html: highlightTransliteration(para) }} />
                                ))}
                            </div>
                        </section>

                        <section className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-orange-700 mb-4">📖 Vocabulary</h2>
                            <table className="w-full text-sm border-t border-gray-200">
                                <thead>
                                    <tr className="text-left">
                                        <th className="py-2 font-semibold text-gray-900">Khmer</th>
                                        <th className="py-2 font-semibold text-gray-900">English</th>
                                        <th className="py-2 font-semibold text-gray-900">Transliteration</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {article.vocabulary.map(({ khmer, english, translit }, i) => (
                                        <tr key={i} className="border-t">
                                            <td className="py-2 font-medium text-gray-900">{khmer}</td>
                                            <td className="py-2 capitalize text-gray-800">{english}</td>
                                            <td className="py-2 italic text-gray-700">{translit}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section>

                        <section className="bg-white rounded-xl shadow-sm p-6">
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
