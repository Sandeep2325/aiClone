# AI Clone - Frontend

Next.js 15 frontend with React Server Components, Tailwind CSS, and shadcn/ui.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
│   ├── ui/          # shadcn/ui components
│   └── ...
├── lib/             # Utilities and API client
├── stores/          # Zustand state management
└── types/           # TypeScript types
```

## Key Technologies

- **Next.js 15** - React framework with App Router
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful UI components
- **Zustand** - Lightweight state management
- **TanStack Query** - Data fetching and caching
- **Framer Motion** - Animations
- **TypeScript** - Type safety

## Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

## Building for Production

```bash
npm run build
npm start
```

## Deployment

Optimized for Vercel:

```bash
vercel deploy
```
