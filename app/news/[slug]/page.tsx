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
            <div className="min-h-screen bg-white">
                {/* Structured Data for SEO */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Article",
                            "headline": article.title,
                            "description": `Read \"${article.title}\" in Khmer with English translation and transliteration.`,
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

                <div className="w-full border-b border-gray-200 sticky top-0 z-50 bg-white">
                    <div className="max-w-5xl mx-auto px-4 py-3">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:underline"
                        >
                            <span>&larr;</span>
                            <span>Back to Homepage</span>
                        </Link>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto px-4 py-6">
                    <div className="mb-4">
                        <h1 className="text-2xl font-semibold text-gray-900 mb-1">{article.title}</h1>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-2">
                            <span>Published on {article.date}</span>
                            <span>&middot;</span>
                            <span id="article-view-count">{initialViewCount} views</span>
                            <span>&middot;</span>
                            <span>Curated by Human</span>
                        </div>
                    </div>

                    {/* Optional Article Image */}
                    {article.image && (
                        <section className="mb-4">
                            <Image
                                src={article.image.url}
                                alt={article.image.alt}
                                className="w-full h-auto object-cover"
                                style={{ maxHeight: '500px' }}
                                width={1000}
                                height={1000}
                            />
                            {article.image.caption && (
                                <div className="mt-2 text-center">
                                    <p className="text-xs text-gray-500 italic">
                                        {article.image.caption}
                                    </p>
                                </div>
                            )}
                        </section>
                    )}

                    <div className="grid gap-4">
                        <section className="p-0 mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-base font-semibold text-gray-800">Khmer Original</h2>
                                <div className="flex items-center gap-1">
                                    <span className="text-xs text-gray-400">Text Size:</span>
                                    <button id="decrease-text-size" className="text-xs px-2 py-1 text-gray-600 border border-gray-200 bg-white" title="Decrease text size">A-</button>
                                    <span className="text-xs text-gray-500 px-1" id="text-size-display">24px</span>
                                    <button id="increase-text-size" className="text-xs px-2 py-1 text-gray-600 border border-gray-200 bg-white" title="Increase text size">A+</button>
                                    <button id="reset-text-size" className="text-xs px-2 py-1 text-gray-600 border border-gray-200 bg-white" title="Reset text size">↺</button>
                                </div>
                            </div>
                            <div className="text-base space-y-2 text-gray-900 khmer-text" style={{ fontSize: '24px' }}>
                                {article.khmer.map((para, i) => (
                                    <p key={i} dangerouslySetInnerHTML={{ __html: highlightKhmer(para) }} />
                                ))}
                            </div>
                        </section>

                        <section className="p-0 mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-base font-semibold text-gray-800">English Translation</h2>
                                <div className="flex items-center gap-1">
                                    <span className="text-xs text-gray-400">Text Size:</span>
                                    <button id="decrease-english-text-size" className="text-xs px-2 py-1 text-gray-600 border border-gray-200 bg-white" title="Decrease text size">A-</button>
                                    <span className="text-xs text-gray-500 px-1" id="english-text-size-display">20px</span>
                                    <button id="increase-english-text-size" className="text-xs px-2 py-1 text-gray-600 border border-gray-200 bg-white" title="Increase text size">A+</button>
                                    <button id="reset-english-text-size" className="text-xs px-2 py-1 text-gray-600 border border-gray-200 bg-white" title="Reset text size">↺</button>
                                </div>
                            </div>
                            <div className="text-base space-y-2 text-gray-900 leading-relaxed english-text" style={{ fontSize: '20px' }}>
                                {article.english.map((para, i) => (
                                    <p key={i}>{highlightEnglish(para)}</p>
                                ))}
                            </div>
                        </section>

                        <section className="p-0 mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-base font-semibold text-gray-800">Khmer Transliteration</h2>
                                <div className="flex items-center gap-1">
                                    <span className="text-xs text-gray-400">Text Size:</span>
                                    <button id="decrease-translit-text-size" className="text-xs px-2 py-1 text-gray-600 border border-gray-200 bg-white" title="Decrease text size">A-</button>
                                    <span className="text-xs text-gray-500 px-1" id="translit-text-size-display">20px</span>
                                    <button id="increase-translit-text-size" className="text-xs px-2 py-1 text-gray-600 border border-gray-200 bg-white" title="Increase text size">A+</button>
                                    <button id="reset-translit-text-size" className="text-xs px-2 py-1 text-gray-600 border border-gray-200 bg-white" title="Reset text size">↺</button>
                                </div>
                            </div>
                            <div className="text-base space-y-2 text-gray-800 leading-relaxed translit-text" style={{ fontSize: '20px' }}>
                                {article.transliteration.map((para, i) => (
                                    <p key={i} className="italic" dangerouslySetInnerHTML={{ __html: highlightTransliteration(para) }} />
                                ))}
                            </div>
                        </section>

                        <section className="p-0 mb-4">
                            <h2 className="text-base font-semibold text-gray-800 mb-2">Vocabulary</h2>
                            <table className="w-full text-lg text-left text-gray-700">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-2 font-semibold">ភាសាខ្មែរ</th>
                                        <th className="py-2 px-2 font-semibold">English</th>
                                        <th className="py-2 px-2 font-semibold">Pronunciation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {article.vocabulary.map(({ khmer, english, translit }, i) => (
                                        <tr key={i}>
                                            <td className="py-2 px-2">{khmer}</td>
                                            <td className="py-2 px-2">{english}</td>
                                            <td className="py-2 px-2">/{translit}/</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section>

                        <section className="p-0 mb-4">
                            <h2 className="text-base font-semibold text-gray-800 mb-2">Sources</h2>
                            <ul className="space-y-1 text-lg text-gray-700">
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
        </>
    );
}
