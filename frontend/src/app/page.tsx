import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          AI Clone
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Clone your voice, face, and video style to generate AI-powered content automatically
        </p>
        <div className="flex gap-4 justify-center pt-8">
          <Link 
            href="/dashboard" 
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity inline-block"
          >
            Get Started
          </Link>
          <Link 
            href="/about" 
            className="px-6 py-3 border border-border rounded-lg font-semibold hover:bg-accent transition-colors inline-block"
          >
            Learn More
          </Link>
        </div>
      </div>
    </main>
  );
}
