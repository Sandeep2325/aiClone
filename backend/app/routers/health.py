from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
import redis.asyncio as redis
from app.core.database import get_db
from app.core.config import settings

router = APIRouter()


@router.get("")
async def health_check(db: AsyncSession = Depends(get_db)):
    """Health check endpoint"""

    # Check database
    try:
        await db.execute(text("SELECT 1"))
        db_status = "healthy"
    except Exception as e:
        db_status = f"unhealthy: {str(e)}"

    # Check Redis
    try:
        r = redis.from_url(settings.REDIS_URL)
        await r.ping()
        await r.close()
        redis_status = "healthy"
    except Exception as e:
        redis_status = f"unhealthy: {str(e)}"

    overall_status = (
        "healthy" if db_status == "healthy" and redis_status == "healthy" else "degraded"
    )

    return {
        "status": overall_status,
        "services": {
            "database": db_status,
            "redis": redis_status,
        },
    }
