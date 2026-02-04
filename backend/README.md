# AI Clone - Backend

FastAPI-based AI orchestration layer for the influencer cloning platform.

## Architecture

```
FastAPI → Model Router → Provider Adapters → AI Providers
                ↓
          Queue System → GPU Workers
```

## Setup

### Prerequisites
- Python 3.11+
- PostgreSQL 15+
- Redis 7+

### Installation

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment variables
cp .env.example .env
# Edit .env with your API keys
```

### Database Setup

```bash
# Create database
createdb aiclone

# Run migrations
alembic upgrade head
```

### Running

```bash
# Development server
uvicorn app.main:app --reload

# Production server
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

### Worker Process

```bash
# Start Dramatiq workers
dramatiq app.workers.tasks
```

## Project Structure

```
app/
├── main.py              # FastAPI application
├── core/                # Core configuration
│   ├── config.py       # Settings
│   └── database.py     # Database setup
├── models/              # SQLAlchemy models
│   ├── user.py
│   ├── influencer_model.py
│   └── generation.py
├── routers/             # API routes
│   ├── auth.py
│   ├── models.py
│   ├── generations.py
│   └── agents.py
├── orchestrator/        # AI orchestration
│   └── model_router.py  # Core routing logic
├── providers/           # Provider adapters
│   ├── base_provider.py
│   ├── openai_adapter.py
│   ├── elevenlabs_adapter.py
│   └── ...
├── services/            # Business logic
├── workers/             # Queue workers
│   └── tasks.py
└── schemas/             # Pydantic schemas
```

## Key Components

### Model Router

Central orchestration layer that routes requests to AI providers with:
- Automatic failover
- Parallel execution
- Retry logic
- Cost tracking
- Latency monitoring

### Provider Adapters

Isolation layer between your app and AI vendors:
- `OpenAIProvider` - GPT models and DALL-E
- `ElevenLabsProvider` - Voice cloning
- `AnthropicProvider` - Claude models
- `ReplicateProvider` - Video generation
- More to be added

### Queue Workers

GPU-intensive tasks run asynchronously:
- Voice model training
- Face model training
- Long video generation
- Batch content workflows

## API Documentation

Once running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Testing

```bash
# Run tests
pytest

# With coverage
pytest --cov=app tests/
```

## Code Quality

```bash
# Format code
black .

# Lint
ruff check .

# Type check
mypy app/
```

## Environment Variables

See `.env.example` for all required variables.

Key variables:
- `DATABASE_URL` - PostgreSQL connection
- `REDIS_URL` - Redis connection
- `OPENAI_API_KEY` - OpenAI API key
- `ELEVENLABS_API_KEY` - ElevenLabs API key
- And more...

## Deployment

### Fly.io

```bash
fly launch
fly deploy
```

### Railway

```bash
railway up
```

### Docker

```bash
docker build -t aiclone-backend .
docker run -p 8000:8000 aiclone-backend
```
