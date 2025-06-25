
// components/ArticleBody.tsx
'use client';
import { useEffect } from 'react';

interface Paragraph {
    khmer: string;
    english: string;
    transliteration: string;
}

interface ArticleBodyProps {
    title: string;
    author: string;
    paragraphs: Paragraph[];
    source: string;
}

export default function ArticleBody({ title, author, paragraphs, source }: ArticleBodyProps) {
    useEffect(() => {
        document.querySelectorAll('.vocab').forEach((el) => {
            const id = el.getAttribute('data-id');

            el.addEventListener('mouseenter', () => {
                document.querySelectorAll(`.vocab[data-id="${id}"]`).forEach((m) => m.classList.add('bg-blue-200'));
                document.querySelectorAll(`.eng-vocab[data-id="${id}"]`).forEach((m) => m.classList.add('bg-yellow-100'));
            });

            el.addEventListener('mouseleave', () => {
                document.querySelectorAll(`.vocab[data-id="${id}"]`).forEach((m) => m.classList.remove('bg-blue-200'));
                document.querySelectorAll(`.eng-vocab[data-id="${id}"]`).forEach((m) => m.classList.remove('bg-yellow-100'));
            });
        });
    }, []);

    return (
        <main className="max-w-6xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold text-indigo-700 mb-4">{title}</h1>
            <p className="text-2xl leading-relaxed mb-2">
                <span className="font-bold">✍️ សរសេរដោយ៖</span> {author}
            </p>

            {paragraphs.map((para, idx) => (
                <div key={idx} className="mb-6">
                    <p
                        className="text-2xl leading-relaxed text-gray-700 mb-2"
                        dangerouslySetInnerHTML={{ __html: para.khmer }}
                    />
                    <p
                        className="text-base italic text-gray-600 mb-1"
                        dangerouslySetInnerHTML={{ __html: para.english }}
                    />
                    <p className="text-base text-gray-500">{para.transliteration}</p>
                </div>
            ))}

            <p className="text-sm text-gray-600 mt-6">Source: {source}</p>
            <hr className="my-8" />

            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">📘 Vocabulary Table</h2>
            <table className="table-auto w-full text-left border border-gray-300">
                <thead className="bg-indigo-100">
                    <tr>
                        <th className="p-2 border">Khmer Word</th>
                        <th className="p-2 border">Transliteration</th>
                        <th className="p-2 border">English Meaning</th>
                    </tr>
                </thead>
                <tbody className="text-xl bg-white">
                    <tr><td className="p-2 border">ទេវកាសអាកាស</td><td className="p-2 border">tevakas akas</td><td className="p-2 border"><span className="eng-vocab" data-id="airspace">airspace</span></td></tr>
                    <tr><td className="p-2 border">ការវាយប្រហារ</td><td className="p-2 border">kar veay praha</td><td className="p-2 border"><span className="eng-vocab" data-id="attack">attack</span></td></tr>
                    <tr><td className="p-2 border">បិទ</td><td className="p-2 border">bet</td><td className="p-2 border"><span className="eng-vocab" data-id="close">close</span></td></tr>
                    <tr><td className="p-2 border">ការព្រួយបារម្ភ</td><td className="p-2 border">kar pruy barom</td><td className="p-2 border"><span className="eng-vocab" data-id="concerns">concerns</span></td></tr>
                    <tr><td className="p-2 border">សន្តិសុខ</td><td className="p-2 border">santisok</td><td className="p-2 border"><span className="eng-vocab" data-id="security">security</span></td></tr>
                    <tr><td className="p-2 border">ប្រឆាំងយោធា</td><td className="p-2 border">prochang youthea</td><td className="p-2 border"><span className="eng-vocab" data-id="paramilitary">paramilitary</span></td></tr>
                    <tr><td className="p-2 border">គោលដៅ</td><td className="p-2 border">kol dao</td><td className="p-2 border"><span className="eng-vocab" data-id="target">target</span></td></tr>
                    <tr><td className="p-2 border">សមរម្យ</td><td className="p-2 border">somrom</td><td className="p-2 border"><span className="eng-vocab" data-id="legitimate">legitimate</span></td></tr>
                    <tr><td className="p-2 border">រដ្ឋាភិបាល</td><td className="p-2 border">rothapeapal</td><td className="p-2 border"><span className="eng-vocab" data-id="government">government</span></td></tr>
                    <tr><td className="p-2 border">សង្គ្រាម</td><td className="p-2 border">songkream</td><td className="p-2 border"><span className="eng-vocab" data-id="war">war</span></td></tr>
                    <tr><td className="p-2 border">ការជជែក</td><td className="p-2 border">kar jejek</td><td className="p-2 border"><span className="eng-vocab" data-id="negotiation">negotiation</span></td></tr>
                </tbody>
            </table>
        </main>
    );
}