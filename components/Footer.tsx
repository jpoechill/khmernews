// components/Footer.tsx

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 border-t border-blue-100/50 mt-6 relative overflow-hidden">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-[0.02]">
                <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl transform -translate-x-32 -translate-y-32"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full blur-3xl transform translate-x-48 translate-y-48"></div>
            </div>

            {/* Footer Stats - positioned above main footer */}
            {/* {articles.length > 0 && (
                <div className="max-w-5xl mx-auto px-4 pt-8 pb-4 relative z-10">
                    <div className="flex justify-center">
                        <div className="inline-flex items-center gap-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 px-8 py-6 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                            <div className="text-center group">
                                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:to-blue-600 transition-all duration-300">
                                    {articles.length}
                                </div>
                                <div className="text-sm text-slate-500 font-medium">Articles</div>
                            </div>
                            <div className="w-px h-8 bg-gradient-to-b from-transparent via-slate-200 to-transparent"></div>
                            <div className="text-center group">
                                <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent group-hover:from-emerald-500 group-hover:to-green-600 transition-all duration-300">
                                    3
                                </div>
                                <div className="text-sm text-slate-500 font-medium">Languages</div>
                            </div>
                            <div className="w-px h-8 bg-gradient-to-b from-transparent via-slate-200 to-transparent"></div>
                            <div className="text-center group">
                                <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-700 bg-clip-text text-transparent group-hover:from-purple-500 group-hover:to-violet-600 transition-all duration-300">
                                    {articles.reduce((total, article) => total + (article.vocabulary?.length || 0), 0)}
                                </div>
                                <div className="text-sm text-slate-500 font-medium">Vocabulary</div>
                            </div>
                        </div>
                    </div>
                </div>
            )} */}

            <div className="max-w-5xl mx-auto px-4 py-8 relative z-10">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                                Khmer News Reader
                            </h3>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Making Khmer news accessible through interactive language learning tools and immersive reading experiences.
                        </p>
                        <div className="flex space-x-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Educational
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Open Source
                            </span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center">
                            <div className="w-1 h-4 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full mr-2"></div>
                            Resources
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <a href="#" className="text-slate-600 hover:text-indigo-600 transition-all duration-200 flex items-center group">
                                    <svg className="w-4 h-4 mr-2 text-slate-400 group-hover:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Reading Guide
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-600 hover:text-indigo-600 transition-all duration-200 flex items-center group">
                                    <svg className="w-4 h-4 mr-2 text-slate-400 group-hover:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    Language Tips
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-600 hover:text-indigo-600 transition-all duration-200 flex items-center group">
                                    <svg className="w-4 h-4 mr-2 text-slate-400 group-hover:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    About Project
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Connect Section */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center">
                            <div className="w-1 h-4 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full mr-2"></div>
                            Connect
                        </h4>
                        <p className="text-xs text-slate-500 mb-4">
                            Join our community and contribute to making Khmer more accessible
                        </p>
                        <div className="flex space-x-3">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-200 hover:from-slate-800 hover:to-slate-900 text-slate-600 hover:text-white rounded-xl transition-all duration-300 transform hover:scale-110 hover:rotate-3"
                                aria-label="GitHub"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                            <a
                                href="mailto:contact@example.com"
                                className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-200 hover:from-blue-500 hover:to-indigo-600 text-slate-600 hover:text-white rounded-xl transition-all duration-300 transform hover:scale-110 hover:-rotate-3"
                                aria-label="Email"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-200 hover:from-purple-500 hover:to-pink-600 text-slate-600 hover:text-white rounded-xl transition-all duration-300 transform hover:scale-110"
                                aria-label="Discord"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.197.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gradient-to-r from-transparent via-slate-200 to-transparent pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        {/* Copyright */}
                        <div className="text-sm text-slate-500 flex items-center space-x-2">
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full animate-pulse"></div>
                            <p>&copy; {currentYear} Khmer News Reader. Built for educational purposes.</p>
                        </div>

                        {/* Powered by */}
                        <div className="text-sm text-slate-500 flex items-center space-x-2">
                            <span>Language learning powered by</span>
                            <a
                                href="https://khmermix.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-500 hover:to-purple-600 text-slate-700 hover:text-white font-medium transition-all duration-300 rounded-full border border-indigo-200 hover:border-transparent transform hover:scale-105"
                            >
                                <span>KhmerMix</span>
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}