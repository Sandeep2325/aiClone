from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List


class Settings(BaseSettings):
    """Application settings"""

    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", case_sensitive=True
    )

    # Application
    APP_ENV: str = "development"
    DEBUG: bool = True
    SECRET_KEY: str = "change-this-in-production"

    # Database
    DATABASE_URL: str = "postgresql://aiclone:aiclone_dev_password@localhost:5432/aiclone"

    # Redis
    REDIS_URL: str = "redis://localhost:6379"

    # CORS
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000"]

    # AI Providers - Voice
    ELEVENLABS_API_KEY: str = ""
    PLAYHT_API_KEY: str = ""
    PLAYHT_USER_ID: str = ""

    # AI Providers - LLM
    OPENAI_API_KEY: str = ""
    ANTHROPIC_API_KEY: str = ""
    GOOGLE_API_KEY: str = ""

    # AI Providers - Video
    REPLICATE_API_TOKEN: str = ""
    RUNWAY_API_KEY: str = ""

    # AI Providers - Image
    STABILITY_API_KEY: str = ""

    # Storage
    AWS_ACCESS_KEY_ID: str = ""
    AWS_SECRET_ACCESS_KEY: str = ""
    AWS_S3_BUCKET: str = "aiclone-storage"
    AWS_REGION: str = "us-east-1"

    # Cloudflare R2
    R2_ACCOUNT_ID: str = ""
    R2_ACCESS_KEY_ID: str = ""
    R2_SECRET_ACCESS_KEY: str = ""
    R2_BUCKET: str = ""

    # Stripe
    STRIPE_API_KEY: str = ""
    STRIPE_WEBHOOK_SECRET: str = ""

    # Monitoring
    SENTRY_DSN: str = ""


settings = Settings()
