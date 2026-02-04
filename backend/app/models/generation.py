from sqlalchemy import Column, String, DateTime, Enum as SQLEnum, ForeignKey, Float, JSON
from sqlalchemy.sql import func
import enum
from app.core.database import Base


class GenerationType(str, enum.Enum):
    VOICE = "voice"
    IMAGE = "image"
    VIDEO = "video"
    TEXT = "text"


class GenerationStatus(str, enum.Enum):
    QUEUED = "queued"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"


class Generation(Base):
    __tablename__ = "generations"

    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    model_id = Column(
        String, ForeignKey("influencer_models.id"), nullable=True, index=True
    )
    type = Column(SQLEnum(GenerationType), nullable=False)
    status = Column(SQLEnum(GenerationStatus), default=GenerationStatus.QUEUED)
    provider = Column(String, nullable=False)
    cost = Column(Float, default=0.0)  # Cost in USD
    latency = Column(Float, nullable=True)  # Latency in seconds
    output_url = Column(String, nullable=True)
    input_data = Column(JSON, nullable=True)
    output_metadata = Column(JSON, nullable=True)
    error_message = Column(String, nullable=True)
    created_at = Column(DateTime, default=func.now(), nullable=False)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
