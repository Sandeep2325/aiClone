import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            AI Clone
          </Link>
          <div className="flex gap-4">
            <Link href="/about" className="px-4 py-2 text-gray-300 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="/about" className="px-4 py-2 text-gray-300 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/signin" className="px-4 py-2 text-gray-300 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link 
              href="/signup" 
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center p-8 md:p-24">
        <div className="text-center space-y-8 max-w-5xl">
          {/* Badge */}
          <div className="inline-block">
            <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-sm font-medium">
              🚀 The Future of Content Creation
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            Clone Your Voice, Face & Style with AI
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Generate unlimited content automatically. Scale your presence across all platforms while you sleep.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-3 justify-center">
            <span className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-full text-gray-300 text-sm">
              ✨ Voice Cloning
            </span>
            <span className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-full text-gray-300 text-sm">
              🎥 Video Generation
            </span>
            <span className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-full text-gray-300 text-sm">
              🖼️ Image Creation
            </span>
            <span className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-full text-gray-300 text-sm">
              ⚡ 60-80% Faster
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link 
              href="/signup" 
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 inline-block"
            >
              Start Free Trial →
            </Link>
            <Link 
              href="/about" 
              className="px-8 py-4 border border-gray-600 text-gray-300 rounded-xl font-semibold text-lg hover:bg-gray-800/50 transition-all inline-block"
            >
              Watch Demo
            </Link>
          </div>

          {/* Social Proof */}
          <div className="pt-12 flex flex-col items-center gap-4">
            <p className="text-gray-400 text-sm">Trusted by creators worldwide</p>
            <div className="flex gap-8 items-center opacity-50">
              <div className="text-gray-500 font-bold">10,000+ Users</div>
              <div className="w-px h-6 bg-gray-700"></div>
              <div className="text-gray-500 font-bold">1M+ Generated</div>
              <div className="w-px h-6 bg-gray-700"></div>
              <div className="text-gray-500 font-bold">99.9% Uptime</div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            Everything You Need to Scale
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-800/30 border border-gray-700 rounded-xl hover:border-purple-500 transition-all group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🎤</div>
              <h3 className="text-xl font-semibold text-white mb-2">Voice Cloning</h3>
              <p className="text-gray-400">
                Clone your voice in minutes. Generate natural-sounding audio for any content.
              </p>
            </div>
            <div className="p-6 bg-gray-800/30 border border-gray-700 rounded-xl hover:border-purple-500 transition-all group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🎬</div>
              <h3 className="text-xl font-semibold text-white mb-2">Video Creation</h3>
              <p className="text-gray-400">
                Create professional videos with your AI avatar. No camera needed.
              </p>
            </div>
            <div className="p-6 bg-gray-800/30 border border-gray-700 rounded-xl hover:border-purple-500 transition-all group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">⚡</div>
              <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
              <p className="text-gray-400">
                Parallel processing makes us 60-80% faster than competitors.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
