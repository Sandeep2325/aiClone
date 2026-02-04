import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            AI Clone
          </Link>
          <nav className="flex gap-4">
            <Link href="/about" className="px-4 py-2 text-white rounded-lg hover:bg-gray-800 transition-colors">
              About
            </Link>
            <Link href="/signup" className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all">
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Creator Operating System
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          The most advanced AI platform for content creators. Clone your voice, face, and style to scale your content production infinitely.
        </p>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Platform Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-800/30 border border-gray-700 rounded-xl hover:border-purple-500 transition-all">
            <div className="text-4xl mb-4">🎤</div>
            <h3 className="text-xl font-semibold mb-3 text-white">Voice Cloning</h3>
            <p className="text-gray-400">
              Create a digital twin of your voice that sounds natural and authentic. Generate hours of content in minutes.
            </p>
          </div>

          <div className="p-6 bg-gray-800/30 border border-gray-700 rounded-xl hover:border-purple-500 transition-all">
            <div className="text-4xl mb-4">🎭</div>
            <h3 className="text-xl font-semibold mb-3 text-white">Face & Avatar</h3>
            <p className="text-gray-400">
              Clone your facial expressions and mannerisms. Create video content without being on camera.
            </p>
          </div>

          <div className="p-6 bg-gray-800/30 border border-gray-700 rounded-xl hover:border-purple-500 transition-all">
            <div className="text-4xl mb-4">🎬</div>
            <h3 className="text-xl font-semibold mb-3 text-white">Video Generation</h3>
            <p className="text-gray-400">
              Generate professional videos with your AI clone. Perfect for social media, courses, and marketing.
            </p>
          </div>

          <div className="p-6 bg-gray-800/30 border border-gray-700 rounded-xl hover:border-purple-500 transition-all">
            <div className="text-4xl mb-4">🖼️</div>
            <h3 className="text-xl font-semibold mb-3 text-white">Image Generation</h3>
            <p className="text-gray-400">
              Create stunning visuals for thumbnails, social posts, and promotional materials using AI.
            </p>
          </div>

          <div className="p-6 bg-gray-800/30 border border-gray-700 rounded-xl hover:border-purple-500 transition-all">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-3 text-white">AI Agents</h3>
            <p className="text-gray-400">
              Autonomous content workflows. Tell the AI what you want, and it creates complete content packages.
            </p>
          </div>

          <div className="p-6 bg-gray-800/30 border border-gray-700 rounded-xl hover:border-purple-500 transition-all">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-3 text-white">Parallel Processing</h3>
            <p className="text-gray-400">
              60-80% faster than competitors. Generate voice, images, and videos simultaneously.
            </p>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="container mx-auto px-4 py-16 bg-gray-800/20 rounded-2xl my-16 border border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Enterprise-Grade Architecture</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2 text-white">
              <span className="text-green-400">✓</span>
              Provider Abstraction
            </h3>
            <p className="text-gray-400">
              Never locked into a single AI vendor. Switch providers instantly based on cost or performance.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2 text-white">
              <span className="text-green-400">✓</span>
              Automatic Failover
            </h3>
            <p className="text-gray-400">
              If one provider fails, we automatically route to backup providers. 99.9% uptime guaranteed.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2 text-white">
              <span className="text-green-400">✓</span>
              Cost Tracking
            </h3>
            <p className="text-gray-400">
              Every generation tracked and logged. Optimize your AI spending with detailed analytics.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2 text-white">
              <span className="text-green-400">✓</span>
              Scalable Infrastructure
            </h3>
            <p className="text-gray-400">
              From MVP to millions of users. Built on production-grade technology from day one.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl font-bold mb-6 text-white">Ready to Scale Your Content?</h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Join thousands of creators using AI to multiply their content output and reach.
        </p>
        <Link 
          href="/signup" 
          className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/50"
        >
          Start Creating for Free
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-16 bg-gray-900/50">
        <div className="container mx-auto px-4 py-8 text-center text-gray-400">
          <p>&copy; 2026 AI Clone. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
