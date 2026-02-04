from sqlalchemy import Column, String, DateTime, Enum as SQLEnum, ForeignKey, JSON
from sqlalchemy.sql import func
import enum
from app.core.database import Base


class ModelType(str, enum.Enum):
    VOICE = "voice"
    FACE = "face"
    AVATAR = "avatar"
    STYLE = "style"


class ModelStatus(str, enum.Enum):
    PENDING = "pending"
    TRAINING = "training"
    READY = "ready"
    FAILED = "failed"


class InfluencerModel(Base):
    __tablename__ = "influencer_models"

    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    name = Column(String, nullable=False)
    type = Column(SQLEnum(ModelType), nullable=False)
    provider = Column(String, nullable=False)  # e.g., "elevenlabs", "replicate"
    status = Column(SQLEnum(ModelStatus), default=ModelStatus.PENDING)
    training_data_url = Column(String, nullable=True)
    model_metadata = Column(JSON, nullable=True)  # Provider-specific data
    created_at = Column(DateTime, default=func.now(), nullable=False)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
