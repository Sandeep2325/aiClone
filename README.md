# AI Influencer Cloning Platform

A scalable platform where influencers can clone their voice, face, video style, and image likeness to generate full social media content automatically using AI agents.

## Architecture Overview

```
Next.js (Frontend + BFF)
        ↓
API Gateway
        ↓
AI Orchestration Layer (FastAPI)
        ↓
Model Router → Provider Adapters → AI Providers
        ↓
Queue System → GPU Workers
        ↓
Storage + Database
```

## Tech Stack

### Frontend
- **Next.js 15** - React Server Components, Server Actions, Streaming
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI Components
- **Zustand** - State Management
- **Framer Motion** - Animations

### Backend
- **FastAPI** - AI Orchestration & API
- **PostgreSQL** - Primary Database
- **Redis** - Caching & Queue
- **Dramatiq** - Task Queue
- **Python 3.11+** - Runtime

### Infrastructure
- **Vercel** - Frontend Hosting
- **Fly.io/Railway** - Backend Hosting
- **RunPod/Modal** - GPU Workers
- **Cloudflare R2/S3** - Storage
- **Stripe** - Billing

## Project Structure

```
/frontend          # Next.js application
/backend           # FastAPI AI orchestration
/workers           # GPU worker services
/docs              # Documentation
```

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.11+
- PostgreSQL 15+
- Redis 7+
- Docker (optional)

### Quick Start

1. **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

2. **Backend Setup**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

3. **Database Setup**
```bash
# Create PostgreSQL database
createdb aiclone

# Run migrations
cd backend
alembic upgrade head
```

## Development Workflow

1. Frontend runs on `http://localhost:3000`
2. Backend runs on `http://localhost:8000`
3. API docs available at `http://localhost:8000/docs`

## Key Features

- ✅ Multi-provider AI orchestration
- ✅ Voice cloning (ElevenLabs, PlayHT)
- ✅ Video generation (Replicate, Runway)
- ✅ Image generation (OpenAI, SDXL)
- ✅ LLM routing (GPT, Claude, Gemini)
- ✅ Parallel inference
- ✅ Queue-based processing
- ✅ Cost tracking
- ✅ Consent management
- ✅ AI agent workflows

## Security & Compliance

- Consent capture before cloning
- AI content watermarking
- Abuse detection
- Deepfake usage policies

## License

Proprietary - All rights reserved
