# Setup Guide

Complete setup instructions for the AI Clone platform.

## Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.11+
- **PostgreSQL** 15+
- **Redis** 7+
- **Git**

---

## Quick Start (Docker)

The fastest way to get started:

```bash
# Clone repository
git clone <your-repo>
cd Aiclone

# Start all services
docker-compose up

# Frontend: http://localhost:3000
# Backend: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

---

## Manual Setup

### 1. Database Setup

```bash
# Install PostgreSQL (macOS)
brew install postgresql@15
brew services start postgresql@15

# Create database
createdb aiclone

# Create user (optional)
psql postgres
CREATE USER aiclone WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE aiclone TO aiclone;
\q
```

### 2. Redis Setup

```bash
# Install Redis (macOS)
brew install redis
brew services start redis

# Verify Redis is running
redis-cli ping
# Should return: PONG
```

### 3. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env

# Edit .env with your settings
nano .env  # or use your preferred editor

# Run database migrations
alembic upgrade head

# Start backend server
uvicorn app.main:app --reload
```

Backend will be available at: http://localhost:8000

API documentation: http://localhost:8000/docs

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Edit .env.local
nano .env.local

# Start development server
npm run dev
```

Frontend will be available at: http://localhost:3000

### 5. Worker Setup (Optional for Development)

```bash
cd backend
source venv/bin/activate

# Start Dramatiq workers
dramatiq app.workers.tasks
```

---

## Environment Configuration

### Backend (.env)

Required variables:

```bash
# Database
DATABASE_URL=postgresql://aiclone:password@localhost:5432/aiclone

# Redis
REDIS_URL=redis://localhost:6379

# Secret Key (generate with: openssl rand -hex 32)
SECRET_KEY=your-secret-key-here

# AI Provider Keys
OPENAI_API_KEY=sk-...
ELEVENLABS_API_KEY=...
ANTHROPIC_API_KEY=...
REPLICATE_API_TOKEN=...

# Storage (choose one)
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET=aiclone-storage

# OR Cloudflare R2
R2_ACCOUNT_ID=...
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_BUCKET=aiclone-storage
```

### Frontend (.env.local)

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## Getting AI Provider Keys

### OpenAI
1. Go to https://platform.openai.com/api-keys
2. Create new secret key
3. Add to `OPENAI_API_KEY`

### ElevenLabs
1. Go to https://elevenlabs.io/
2. Sign up/login
3. Navigate to Profile → API Keys
4. Add to `ELEVENLABS_API_KEY`

### Anthropic (Claude)
1. Go to https://console.anthropic.com/
2. Create API key
3. Add to `ANTHROPIC_API_KEY`

### Replicate
1. Go to https://replicate.com/
2. Sign up/login
3. Get token from account settings
4. Add to `REPLICATE_API_TOKEN`

---

## Database Migrations

### Create Migration

```bash
cd backend
alembic revision --autogenerate -m "Description of changes"
```

### Apply Migration

```bash
alembic upgrade head
```

### Rollback Migration

```bash
alembic downgrade -1
```

---

## Testing the Setup

### 1. Check Backend Health

```bash
curl http://localhost:8000/health
```

Should return:
```json
{
  "status": "healthy",
  "services": {
    "database": "healthy",
    "redis": "healthy"
  }
}
```

### 2. Check API Documentation

Open: http://localhost:8000/docs

You should see the Swagger UI with all API endpoints.

### 3. Check Frontend

Open: http://localhost:3000

You should see the AI Clone homepage.

---

## Common Issues

### Port Already in Use

```bash
# Find process using port
lsof -ti:8000  # Backend
lsof -ti:3000  # Frontend

# Kill process
kill -9 <PID>
```

### Database Connection Error

```bash
# Check PostgreSQL is running
brew services list

# Restart PostgreSQL
brew services restart postgresql@15

# Test connection
psql -h localhost -U aiclone -d aiclone
```

### Redis Connection Error

```bash
# Check Redis is running
redis-cli ping

# Restart Redis
brew services restart redis
```

### Python Package Issues

```bash
# Upgrade pip
pip install --upgrade pip

# Clear cache and reinstall
pip cache purge
pip install -r requirements.txt --force-reinstall
```

### Node Modules Issues

```bash
# Clear cache
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

---

## Development Workflow

### Running All Services

Terminal 1 - Backend:
```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

Terminal 3 - Worker (optional):
```bash
cd backend
source venv/bin/activate
dramatiq app.workers.tasks
```

---

## Production Deployment

See deployment guides:
- [Deploy to Vercel (Frontend)](./DEPLOY_VERCEL.md)
- [Deploy to Fly.io (Backend)](./DEPLOY_FLY.md)
- [Deploy to Railway (Backend)](./DEPLOY_RAILWAY.md)

---

## Next Steps

1. ✅ Set up all services
2. ✅ Configure environment variables
3. ✅ Test health endpoints
4. 📖 Read [API Documentation](http://localhost:8000/docs)
5. 🎨 Explore the frontend at http://localhost:3000
6. 🚀 Start building features

---

## Getting Help

- Check API docs: http://localhost:8000/docs
- Review architecture: `docs/ARCHITECTURE.md`
- Read code comments in provider adapters
- Check logs for error details

**Logs:**
- Backend: Console output from uvicorn
- Frontend: Browser console + Next.js terminal
- Workers: Dramatiq worker terminal
