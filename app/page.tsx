'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { articles } from '@/data/articles';

export default function NewsIndex() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-card-index') || '0');
          if (entry.isIntersecting) {
            setVisibleCards(prev => new Set([...prev, index]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const cards = document.querySelectorAll('[data-card-index]');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, [viewMode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-1">
                📰 Khmer News & Articles
              </h1>
              <p className="text-sm text-blue-100">
                Learn Khmer through real-world articles. Practice reading, grow your vocabulary, and explore side-by-side translations.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-xs text-blue-200">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                Multi-Language
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                AI Enhanced
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-0">
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition ${viewMode === 'grid'
              ? 'bg-white text-blue-700 shadow'
              : 'bg-blue-100 text-blue-200'
              }`}
          >
            Grid View
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition ${viewMode === 'list'
              ? 'bg-white text-blue-700 shadow'
              : 'bg-blue-100 text-blue-200'
              }`}
          >
            List View
          </button>
        </div>
      </div>

      {/* Articles Section */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        {viewMode === 'grid' ? (
          <div className="grid gap-6 md:grid-cols-2 pt-4 lg:grid-cols-3">
            {articles.map((article, index) => (
              <Link key={article.slug} href={`/news/${article.slug}`}>
                <article
                  data-card-index={index}
                  className={`group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-700 transform ${visibleCards.has(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                    }`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                    transitionProperty: 'opacity, transform'
                  }}
                >
                  {/* Optional Image Thumbnail */}
                  {article.image && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={article.image.url}
                        alt={article.image.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        width={192}
                        height={192}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                  )}
                  <div className="p-6 pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {index + 1}
                        </div>
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          News Article
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span className="text-xs text-gray-500">Available</span>
                      </div>
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h2>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        🇰🇭 Khmer
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        🇺🇸 English
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                        📝 Transliteration
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {article.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        {article.vocabulary?.length || 0} vocab
                      </div>
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        AI Enhanced
                      </div>
                      <div className="flex items-center gap-1 text-blue-600 font-medium text-sm group-hover:gap-2 transition-all">
                        Read Article
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {articles.map((article, index) => (
              <Link key={article.slug} href={`/news/${article.slug}`}>
                <div
                  data-card-index={index}
                  className={`flex items-start gap-4 bg-white p-4 my-4 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-700 transform ${visibleCards.has(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                    }`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                    transitionProperty: 'opacity, transform'
                  }}
                >
                  <div className="text-sm w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full text-white font-bold flex items-center justify-center">
                    {index + 1}
                  </div>
                  {/* Optional Image Thumbnail for List View */}
                  {article.image && (
                    <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                      <Image
                        src={article.image.url}
                        alt={article.image.alt}
                        className="w-full h-full object-cover"
                        width={80}
                        height={80}
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h2 className="text-base font-semibold text-gray-900 mb-1">{article.title}</h2>
                    <p className="text-xs text-gray-500">{article.date}</p>
                    <div className="flex flex-wrap gap-2 mt-2 text-xs">
                      <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">🇰🇭 Khmer</span>
                      <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full">🇺🇸 English</span>
                      <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">📝 Transliteration</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {articles.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No articles available</h3>
            <p className="text-gray-500">Check back soon for new content!</p>
          </div>
        )}

        {/* Footer Stats */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-6 bg-white rounded-2xl shadow-lg px-8 py-6 border border-gray-100">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{articles.length}</div>
              <div className="text-sm text-gray-500">Articles</div>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">3</div>
              <div className="text-sm text-gray-500">Languages</div>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {articles.reduce((total, article) => total + (article.vocabulary?.length || 0), 0)}
              </div>
              <div className="text-sm text-gray-500">Vocabulary</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
