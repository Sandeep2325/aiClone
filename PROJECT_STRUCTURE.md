# Project Structure

Complete file tree for the AI Clone platform.

```
Aiclone/
│
├── README.md                      # Main project documentation
├── QUICKSTART.md                  # 5-minute setup guide
├── PROJECT_STRUCTURE.md           # This file
├── .gitignore                     # Git ignore rules
├── .cursorrules                   # Cursor AI coding rules
├── docker-compose.yml             # Docker orchestration
│
├── docs/                          # Documentation
│   ├── ARCHITECTURE.md           # Architecture deep dive
│   └── SETUP.md                  # Detailed setup guide
│
├── frontend/                      # Next.js 15 Application
│   ├── src/
│   │   ├── app/                  # Next.js App Router
│   │   │   ├── layout.tsx       # Root layout
│   │   │   ├── page.tsx         # Homepage
│   │   │   └── globals.css      # Global styles
│   │   │
│   │   ├── components/           # React components
│   │   │   ├── ui/              # shadcn/ui components (to be added)
│   │   │   └── providers.tsx    # Query client provider
│   │   │
│   │   ├── lib/                  # Utilities
│   │   │   ├── api.ts           # Axios client with interceptors
│   │   │   └── utils.ts         # Helper functions
│   │   │
│   │   └── stores/               # Zustand state management
│   │       └── user-store.ts    # User state
│   │
│   ├── package.json              # Dependencies
│   ├── tsconfig.json             # TypeScript config
│   ├── next.config.ts            # Next.js config
│   ├── tailwind.config.ts        # Tailwind CSS config
│   ├── postcss.config.mjs        # PostCSS config
│   ├── components.json           # shadcn/ui config
│   ├── .eslintrc.json            # ESLint config
│   ├── .env.example              # Environment template
│   ├── Dockerfile.dev            # Development Dockerfile
│   └── README.md                 # Frontend documentation
│
└── backend/                       # FastAPI Application
    ├── app/
    │   ├── __init__.py
    │   ├── main.py               # FastAPI app entry point
    │   │
    │   ├── core/                 # Core configuration
    │   │   ├── __init__.py
    │   │   ├── config.py        # Settings and env vars
    │   │   └── database.py      # Database setup
    │   │
    │   ├── models/               # SQLAlchemy models
    │   │   ├── __init__.py
    │   │   ├── user.py          # User model
    │   │   ├── influencer_model.py  # AI model records
    │   │   ├── generation.py   # Generation records
    │   │   └── provider_metrics.py  # Provider performance
    │   │
    │   ├── schemas/              # Pydantic schemas
    │   │   └── __init__.py      # Request/response models
    │   │
    │   ├── routers/              # API endpoints
    │   │   ├── __init__.py
    │   │   ├── health.py        # Health check
    │   │   ├── auth.py          # Authentication
    │   │   ├── models.py        # Model management
    │   │   ├── generations.py  # Content generation
    │   │   └── agents.py        # AI agent workflows
    │   │
    │   ├── orchestrator/         # AI Orchestration (CRITICAL)
    │   │   ├── __init__.py
    │   │   └── model_router.py  # Core routing logic
    │   │
    │   ├── providers/            # Provider Adapters (CRITICAL)
    │   │   ├── __init__.py
    │   │   ├── base_provider.py      # Abstract base class
    │   │   ├── openai_adapter.py     # OpenAI integration
    │   │   └── elevenlabs_adapter.py # ElevenLabs integration
    │   │
    │   ├── services/             # Business logic
    │   │   └── __init__.py
    │   │
    │   └── workers/              # Queue workers
    │       ├── __init__.py
    │       └── tasks.py         # GPU tasks
    │
    ├── alembic/                  # Database migrations
    │   ├── env.py               # Migration environment
    │   └── script.py.mako       # Migration template
    │
    ├── requirements.txt          # Python dependencies
    ├── pyproject.toml            # Python project config
    ├── alembic.ini               # Alembic config
    ├── .env.example              # Environment template
    ├── Dockerfile                # Production Dockerfile
    └── README.md                 # Backend documentation
```

## Key Components

### 🎯 Model Orchestrator
**Location:** `backend/app/orchestrator/model_router.py`

Central routing layer with:
- Multi-provider support
- Automatic failover
- Parallel execution
- Cost tracking
- Retry logic

### 🔌 Provider Adapters
**Location:** `backend/app/providers/`

Abstraction layer preventing vendor lock-in:
- `base_provider.py` - Contract all providers must implement
- `openai_adapter.py` - GPT and DALL-E
- `elevenlabs_adapter.py` - Voice cloning
- More adapters to be added

### 📊 Database Models
**Location:** `backend/app/models/`

PostgreSQL schema:
- `user.py` - User accounts and credits
- `influencer_model.py` - Cloned AI models
- `generation.py` - Generation history
- `provider_metrics.py` - Performance tracking

### 🚀 API Routers
**Location:** `backend/app/routers/`

RESTful endpoints:
- `/health` - System health
- `/api/v1/auth` - Authentication
- `/api/v1/models` - Model management
- `/api/v1/generations` - Content generation
- `/api/v1/agents` - AI workflows

### ⚙️ Queue Workers
**Location:** `backend/app/workers/tasks.py`

Async GPU tasks:
- Voice model training
- Face model training
- Video generation
- Batch workflows

## Directory Purposes

### Frontend Directories

- **`src/app/`** - Next.js pages (App Router)
- **`src/components/`** - Reusable React components
- **`src/components/ui/`** - shadcn/ui components (add via CLI)
- **`src/lib/`** - Utilities and helpers
- **`src/stores/`** - Zustand global state

### Backend Directories

- **`app/core/`** - Configuration and database
- **`app/models/`** - Database schema
- **`app/schemas/`** - API validation
- **`app/routers/`** - API endpoints
- **`app/orchestrator/`** - AI routing logic
- **`app/providers/`** - Provider abstractions
- **`app/services/`** - Business logic
- **`app/workers/`** - Background tasks

## Adding New Components

### Add a New Provider

1. Create `backend/app/providers/newprovider_adapter.py`
2. Extend `BaseProvider`
3. Implement required methods
4. Register in `model_router.py`

### Add a New API Endpoint

1. Create router in `backend/app/routers/`
2. Define Pydantic schemas in `backend/app/schemas/`
3. Include router in `backend/app/main.py`

### Add a New Database Model

1. Create model in `backend/app/models/`
2. Import in `backend/app/models/__init__.py`
3. Generate migration: `alembic revision --autogenerate`
4. Apply: `alembic upgrade head`

### Add a shadcn/ui Component

```bash
cd frontend
npx shadcn-ui@latest add button
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add card
```

## Environment Files

**Never commit these files:**
- `backend/.env`
- `frontend/.env.local`

**Templates provided:**
- `backend/.env.example`
- `frontend/.env.example`

## Build Artifacts (Gitignored)

- `frontend/.next/` - Next.js build
- `frontend/node_modules/` - Node packages
- `backend/venv/` - Python virtual environment
- `backend/__pycache__/` - Python cache
- `backend/*.egg-info/` - Python metadata

## Configuration Files

- **`.cursorrules`** - AI coding standards
- **`.gitignore`** - Git ignore rules
- **`docker-compose.yml`** - Local development
- **`alembic.ini`** - Database migrations
- **`pyproject.toml`** - Python tooling
- **`tsconfig.json`** - TypeScript config
- **`tailwind.config.ts`** - Styling config
