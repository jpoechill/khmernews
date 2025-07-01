'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { articles } from '@/data/articles';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function NewsIndex() {
  const [viewCounts, setViewCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    // Fetch view counts from API
    const fetchViewCounts = async () => {
      try {
        const response = await fetch('/api/views');
        if (response.ok) {
          const data = await response.json();
          setViewCounts(data.viewCounts || {});
        }
      } catch (error) {
        console.error('Failed to fetch view counts:', error);
      }
    };
    fetchViewCounts();
  }, []);

  // Sort articles by date descending (assuming ISO format)
  const sortedArticles = [...articles].sort((a, b) => (a.date < b.date ? 1 : -1));
  const firstTwo = sortedArticles.slice(0, 2);
  const nextSix = sortedArticles.slice(2, 8);
  const archive = sortedArticles.slice(8);

  // Helper: get sub-description (first line of English translation)
  const getSubDesc = (article: typeof articles[0]) => article.english?.[0]?.slice(0, 120) || '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header articles={articles} />

      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* First 2 articles in 2-column grid */}
        {firstTwo.length > 0 && (
          <section className="grid md:grid-cols-2 gap-8 mb-12">
            {firstTwo.map((article) => (
              <Link key={article.slug} href={`/news/${article.slug}`} className="group block">
                <div className="aspect-[3/2] bg-gray-100 overflow-hidden rounded-2xl shadow-lg border border-gray-100 mb-4">
                  <Image
                    src={article.image?.url || '/public/images/placeholder.png'}
                    alt={article.image?.alt || article.title}
                    width={900}
                    height={600}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    priority
                  />
                </div>
                <h2 className="text-2xl font-bold leading-snug mb-2 group-hover:underline underline-offset-4 decoration-2 transition-colors">{article.title}</h2>
                <p className="text-base text-gray-700 mb-2 line-clamp-3">{getSubDesc(article)}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{article.date}</span>
                  <span className="ml-2 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    {(viewCounts[article.slug] || 0).toLocaleString()} views
                  </span>
                </div>
              </Link>
            ))}
          </section>
        )}

        {/* Next 6 articles in 3-column grid */}
        {nextSix.length > 0 && (
          <section className="grid md:grid-cols-3 gap-8 mb-12">
            {nextSix.map((article) => (
              <Link key={article.slug} href={`/news/${article.slug}`} className="group block">
                <div className="aspect-[3/2] bg-gray-100 overflow-hidden rounded-xl shadow border border-gray-100 mb-3">
                  <Image
                    src={article.image?.url || '/public/images/placeholder.png'}
                    alt={article.image?.alt || article.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-bold leading-snug mb-2 group-hover:underline underline-offset-4 decoration-2 transition-colors">{article.title}</h3>
                <p className="text-sm text-gray-700 mb-2 line-clamp-2">{getSubDesc(article)}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{article.date}</span>
                  <span className="ml-2 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    {(viewCounts[article.slug] || 0).toLocaleString()} views
                  </span>
                </div>
              </Link>
            ))}
          </section>
        )}

        {/* Archive List */}
        {archive.length > 0 && (
          <section className="mb-16">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Archive</h4>
            <ul className="divide-y divide-gray-100 bg-white rounded-xl border border-gray-100">
              {archive.map((article) => (
                <li key={article.slug}>
                  <Link href={`/news/${article.slug}`} className="flex flex-col md:flex-row items-start md:items-center justify-between px-4 py-3 hover:bg-blue-50 transition">
                    <div className="flex-1 min-w-0">
                      <span className="block font-medium text-gray-900 truncate">{article.title}</span>
                      <span className="block text-xs text-gray-500 mt-0.5">{article.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-2 md:mt-0">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                      {(viewCounts[article.slug] || 0).toLocaleString()} views
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Common News Vocabulary Section */}
        <section className="max-w-6xl mx-auto px-6 py-10 mb-16 bg-gradient-to-br from-blue-50 via-white to-cyan-50 rounded-xl border border-blue-100/60">
          <h3 className="text-xl font-bold text-blue-900 mb-2 flex items-center gap-2">
            <span role="img" aria-label="Vocabulary">🌟</span> Common News Vocabulary
          </h3>
          <p className="text-slate-700 mb-6 text-base">Here are some of the most useful words and phrases you&apos;ll see again and again in Khmer news. Click on any word to practice and remember it!</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {(() => {
              // Aggregate vocab frequency
              const freq: Record<string, { khmer: string; english: string; translit: string; count: number }> = {};
              articles.forEach(article => {
                article.vocabulary?.forEach(vocab => {
                  const key = vocab.khmer + '|' + vocab.english;
                  if (!freq[key]) {
                    freq[key] = { ...vocab, count: 0 };
                  }
                  freq[key].count++;
                });
              });
              // Sort by frequency, then alphabetically
              const sorted = Object.values(freq)
                .sort((a, b) => b.count - a.count || a.khmer.localeCompare(b.khmer))
                .slice(0, 24); // Show top 24
              return sorted.map((vocab, i) => (
                <div key={vocab.khmer + vocab.english} className="group bg-white shadow-md border border-blue-100 rounded-xl px-3 py-4 flex flex-col items-center text-center cursor-pointer transition hover:bg-blue-50/80">
                  <div className="text-lg text-blue-700 mb-1 flex flex-col items-center justify-center font-normal relative">
                    <span className="block w-full text-center">{vocab.khmer}</span>
                    <span className={`mt-2 text-[11px] font-normal rounded-full px-2 py-0.5 ${i % 2 === 0 ? 'bg-blue-200 text-blue-800' : 'bg-violet-200 text-violet-800'}`}>x{vocab.count}</span>
                  </div>
                  <div className="text-sm text-slate-800 mb-0.5 font-normal">{vocab.english}</div>
                  <div className="text-xs text-slate-500 italic mb-1 font-normal">{vocab.translit}</div>
                </div>
              ));
            })()}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
