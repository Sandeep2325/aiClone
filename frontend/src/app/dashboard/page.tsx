'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/user-store';

export default function Dashboard() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);

  useEffect(() => {
    if (!user) {
      router.push('/signin');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            AI Clone
          </Link>
          <nav className="flex gap-4 items-center">
            <Link href="/dashboard" className="px-4 py-2 text-white rounded-lg hover:bg-gray-800 transition-colors">
              Dashboard
            </Link>
            <Link href="/models" className="px-4 py-2 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors">
              My Models
            </Link>
            <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <span className="text-purple-300 font-semibold">{user.credits}</span>
              <span className="text-gray-400 text-sm">credits</span>
            </div>
            <div className="w-px h-6 bg-gray-700"></div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-white">Welcome back, {user.name}!</h1>
          <p className="text-gray-400">Create and manage your AI clones</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link href="/create/voice" className="block p-6 bg-gray-800/30 border border-gray-700 rounded-xl hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🎤</div>
            <h3 className="text-xl font-semibold mb-2 text-white">Clone Your Voice</h3>
            <p className="text-gray-400 mb-4 text-sm">
              Create a digital clone of your voice for content generation
            </p>
            <div className="flex items-center text-purple-400 font-semibold">
              Get Started 
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link href="/create/video" className="block p-6 bg-gray-800/30 border border-gray-700 rounded-xl hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🎬</div>
            <h3 className="text-xl font-semibold mb-2 text-white">Generate Videos</h3>
            <p className="text-gray-400 mb-4 text-sm">
              Create AI-powered videos with your cloned avatar
            </p>
            <div className="flex items-center text-purple-400 font-semibold">
              Create Video 
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link href="/create/image" className="block p-6 bg-gray-800/30 border border-gray-700 rounded-xl hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🖼️</div>
            <h3 className="text-xl font-semibold mb-2 text-white">Generate Images</h3>
            <p className="text-gray-400 mb-4 text-sm">
              Create stunning AI-generated images for your content
            </p>
            <div className="flex items-center text-purple-400 font-semibold">
              Generate 
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl">
            <div className="text-3xl font-bold text-white mb-1">0</div>
            <div className="text-sm text-gray-400">Voice Models</div>
          </div>
          <div className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl">
            <div className="text-3xl font-bold text-white mb-1">0</div>
            <div className="text-sm text-gray-400">Videos Generated</div>
          </div>
          <div className="p-6 bg-gradient-to-br from-pink-500/10 to-red-500/10 border border-pink-500/20 rounded-xl">
            <div className="text-3xl font-bold text-white mb-1">0</div>
            <div className="text-sm text-gray-400">Images Created</div>
          </div>
          <div className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl">
            <div className="text-3xl font-bold text-white mb-1">{user.credits}</div>
            <div className="text-sm text-gray-400">Credits Remaining</div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
            <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
              View All →
            </button>
          </div>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🚀</div>
            <p className="text-gray-400 mb-4">No activity yet. Start by creating your first AI clone!</p>
            <Link 
              href="/create/voice"
              className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all"
            >
              Create Your First Clone
            </Link>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="text-3xl">💡</div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Pro Tip</h3>
                <p className="text-gray-400 text-sm">
                  For best results, upload 3-5 minutes of clear audio when creating your voice clone.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="text-3xl">⚡</div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Did You Know?</h3>
                <p className="text-gray-400 text-sm">
                  Our parallel processing is 60-80% faster than competitors. Generate multiple assets simultaneously!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
