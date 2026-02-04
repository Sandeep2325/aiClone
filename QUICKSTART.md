# AI Clone - Quick Start Guide

Get the platform running in 5 minutes.

## Prerequisites

- Node.js 18+
- Python 3.11+
- PostgreSQL 15+
- Redis 7+

## Option 1: Docker (Fastest)

```bash
# Start everything with Docker Compose
docker-compose up

# Access:
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

That's it! The application is running.

---

## Option 2: Manual Setup

### Step 1: Install Dependencies

**macOS:**
```bash
# Install PostgreSQL and Redis
brew install postgresql@15 redis

# Start services
brew services start postgresql@15
brew services start redis
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql-15 redis-server
sudo systemctl start postgresql redis
```

### Step 2: Database Setup

```bash
# Create database
createdb aiclone
```

### Step 3: Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Setup environment
cp .env.example .env

# Run migrations
alembic upgrade head

# Start server
uvicorn app.main:app --reload
```

Backend running at: **http://localhost:8000**

### Step 4: Frontend Setup

Open a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local

# Start development server
npm run dev
```

Frontend running at: **http://localhost:3000**

---

## Verify Installation

### Check Backend Health

```bash
curl http://localhost:8000/health
```

Expected response:
```json
{
  "status": "healthy",
  "services": {
    "database": "healthy",
    "redis": "healthy"
  }
}
```

### Check API Documentation

Open: **http://localhost:8000/docs**

You should see interactive API documentation.

### Check Frontend

Open: **http://localhost:3000**

You should see the AI Clone homepage.

---

## Next Steps

### 1. Add AI Provider Keys

Edit `backend/.env` and add your API keys:

```bash
# Required for text generation
OPENAI_API_KEY=sk-...

# Required for voice cloning
ELEVENLABS_API_KEY=...

# Optional but recommended
ANTHROPIC_API_KEY=...
REPLICATE_API_TOKEN=...
```

Get keys from:
- OpenAI: https://platform.openai.com/api-keys
- ElevenLabs: https://elevenlabs.io/
- Anthropic: https://console.anthropic.com/
- Replicate: https://replicate.com/

### 2. Explore the API

Visit http://localhost:8000/docs and try:
- `/health` - Check system status
- `/api/v1/models` - Create AI models
- `/api/v1/generations` - Generate content
- `/api/v1/agents` - AI agent workflows

### 3. Start Building

The architecture is ready. You can now:
- Create voice clones
- Generate images
- Build video workflows
- Implement AI agents

---

## Project Structure

```
Aiclone/
├── frontend/          # Next.js 15 + Tailwind + shadcn/ui
├── backend/           # FastAPI + PostgreSQL + Redis
│   ├── app/
│   │   ├── routers/          # API endpoints
│   │   ├── orchestrator/     # Model routing (CORE)
│   │   ├── providers/        # AI provider adapters
│   │   ├── models/           # Database models
│   │   └── workers/          # Queue tasks
├── docs/              # Documentation
└── docker-compose.yml # One-command setup
```

---

## Key Architectural Concepts

### 1. Model Orchestrator
Central routing layer that handles:
- Provider selection
- Failover
- Parallel execution
- Cost tracking

Located: `backend/app/orchestrator/model_router.py`

### 2. Provider Adapters
Abstraction layer for AI vendors:
- `OpenAIProvider` - GPT and DALL-E
- `ElevenLabsProvider` - Voice cloning
- More to come...

Located: `backend/app/providers/`

### 3. Queue System
Heavy tasks run asynchronously:
- Voice model training
- Video generation
- Batch workflows

Located: `backend/app/workers/tasks.py`

---

## Common Commands

### Backend

```bash
cd backend
source venv/bin/activate

# Start API server
uvicorn app.main:app --reload

# Start workers
dramatiq app.workers.tasks

# Run migrations
alembic upgrade head

# Create migration
alembic revision --autogenerate -m "Description"

# Format code
black .

# Lint
ruff check .
```

### Frontend

```bash
cd frontend

# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint
npm run lint
```

---

## Troubleshooting

### Port already in use

```bash
# Kill process on port 8000 (backend)
lsof -ti:8000 | xargs kill -9

# Kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill -9
```

### Database connection error

```bash
# Check PostgreSQL is running
brew services list

# Restart PostgreSQL
brew services restart postgresql@15
```

### Redis connection error

```bash
# Check Redis is running
redis-cli ping  # Should return "PONG"

# Restart Redis
brew services restart redis
```

---

## Learn More

- **Full Setup Guide:** `docs/SETUP.md`
- **Architecture Deep Dive:** `docs/ARCHITECTURE.md`
- **API Documentation:** http://localhost:8000/docs
- **Code Style Guide:** `.cursorrules`

---

## What's Included

✅ Next.js 15 frontend with React Server Components  
✅ FastAPI backend with async support  
✅ PostgreSQL database with migrations  
✅ Redis for caching and queues  
✅ Model orchestrator with provider abstraction  
✅ OpenAI and ElevenLabs adapters  
✅ Queue system with Dramatiq  
✅ Docker Compose for easy setup  
✅ Comprehensive documentation  
✅ Production-ready architecture  

---

## Support

Questions? Check:
1. API docs: http://localhost:8000/docs
2. Architecture guide: `docs/ARCHITECTURE.md`
3. Setup guide: `docs/SETUP.md`

**Ready to build something amazing!** 🚀
