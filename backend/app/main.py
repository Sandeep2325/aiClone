from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import structlog

from app.core.config import settings
from app.core.database import init_db
from app.routers import health, auth, models, generations, agents

# Configure structured logging
structlog.configure(
    processors=[
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.JSONRenderer(),
    ]
)

logger = structlog.get_logger()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application startup and shutdown events"""
    # Startup
    logger.info("Starting AI Clone API", env=settings.APP_ENV)
    await init_db()
    yield
    # Shutdown
    logger.info("Shutting down AI Clone API")


app = FastAPI(
    title="AI Clone API",
    description="AI Orchestration Layer for Influencer Cloning Platform",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router, prefix="/health", tags=["Health"])
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(models.router, prefix="/api/v1/models", tags=["AI Models"])
app.include_router(
    generations.router, prefix="/api/v1/generations", tags=["Generations"]
)
app.include_router(agents.router, prefix="/api/v1/agents", tags=["AI Agents"])


@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    """Global exception handler"""
    logger.error("Unhandled exception", exc_info=exc, path=request.url.path)
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"},
    )


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "service": "AI Clone API",
        "version": "1.0.0",
        "status": "operational",
        "docs": "/docs",
    }
