// components/Header.tsx
export default function Header() {
    return (
        <header className="relative bg-gradient-to-br from-indigo-800 via-indigo-700 to-blue-700 text-white overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-32"></div>
                <div className="absolute bottom-0 right-1/3 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl translate-y-24"></div>
                <div className="absolute top-1/2 right-0 w-32 h-32 bg-indigo-300/8 rounded-full blur-xl translate-x-16"></div>
            </div>

            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                    backgroundSize: '24px 24px'
                }}></div>
            </div>

            <div className="relative max-w-6xl mx-auto px-6 py-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {/* Enhanced logo/icon */}
                        <div className="relative">
                            <div className="w-14 h-14 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-lg">
                                <span className="text-2xl">📰asd</span>
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full animate-pulse shadow-lg"></div>
                        </div>

                        <div className="space-y-1">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                                Khmer News Reader
                            </h1>
                            <div className="flex items-center gap-2 text-indigo-200">
                                <div className="w-1 h-1 bg-blue-300 rounded-full"></div>
                                <p className="text-sm font-medium tracking-wide">
                                    Learn formal Khmer through current events
                                </p>
                                <div className="w-1 h-1 bg-blue-300 rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    {/* Optional navigation or stats */}
                    <div className="hidden md:flex items-center gap-6">
                        <div className="text-center">
                            <div className="text-xl font-bold text-white">24/7</div>
                            <div className="text-xs text-indigo-200 uppercase tracking-wider">Updates</div>
                        </div>
                        <div className="w-px h-8 bg-white/20"></div>
                        <div className="text-center">
                            <div className="text-xl font-bold text-white">ភាសាខ្មែរ</div>
                            <div className="text-xs text-indigo-200 uppercase tracking-wider">Language</div>
                        </div>
                    </div>
                </div>

                {/* Bottom accent line */}
                <div className="mt-6 flex items-center gap-2">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                    <div className="flex gap-1">
                        <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                        <div className="w-2 h-2 bg-blue-300/60 rounded-full"></div>
                        <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                </div>
            </div>

            {/* Bottom shadow/border */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </header>
    );
}