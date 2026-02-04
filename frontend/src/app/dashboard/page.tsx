import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI Clone
          </Link>
          <nav className="flex gap-4">
            <Link href="/dashboard" className="px-4 py-2 rounded-lg hover:bg-accent transition-colors">
              Dashboard
            </Link>
            <Link href="/" className="px-4 py-2 rounded-lg hover:bg-accent transition-colors">
              Logout
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome to Your Dashboard</h1>
          <p className="text-muted-foreground">Create and manage your AI clones</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 border border-border rounded-lg hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-4">🎤</div>
            <h3 className="text-xl font-semibold mb-2">Clone Your Voice</h3>
            <p className="text-muted-foreground mb-4">
              Create a digital clone of your voice for content generation
            </p>
            <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
              Get Started
            </button>
          </div>

          <div className="p-6 border border-border rounded-lg hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-4">🎬</div>
            <h3 className="text-xl font-semibold mb-2">Generate Videos</h3>
            <p className="text-muted-foreground mb-4">
              Create AI-powered videos with your cloned avatar
            </p>
            <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
              Create Video
            </button>
          </div>

          <div className="p-6 border border-border rounded-lg hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-4">🖼️</div>
            <h3 className="text-xl font-semibold mb-2">Generate Images</h3>
            <p className="text-muted-foreground mb-4">
              Create stunning AI-generated images for your content
            </p>
            <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
              Generate
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 bg-accent rounded-lg">
            <div className="text-2xl font-bold">0</div>
            <div className="text-sm text-muted-foreground">Voice Models</div>
          </div>
          <div className="p-4 bg-accent rounded-lg">
            <div className="text-2xl font-bold">0</div>
            <div className="text-sm text-muted-foreground">Videos Generated</div>
          </div>
          <div className="p-4 bg-accent rounded-lg">
            <div className="text-2xl font-bold">0</div>
            <div className="text-sm text-muted-foreground">Images Created</div>
          </div>
          <div className="p-4 bg-accent rounded-lg">
            <div className="text-2xl font-bold">100</div>
            <div className="text-sm text-muted-foreground">Credits Remaining</div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="border border-border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
          <div className="text-center py-8 text-muted-foreground">
            <p>No activity yet. Start by creating your first AI clone!</p>
          </div>
        </div>
      </main>
    </div>
  );
}
