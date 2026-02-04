from sqlalchemy import Column, String, Float, Integer, DateTime
from sqlalchemy.sql import func
from app.core.database import Base


class ProviderMetrics(Base):
    __tablename__ = "provider_metrics"

    id = Column(String, primary_key=True)
    provider = Column(String, nullable=False, index=True)
    model_type = Column(String, nullable=False)  # voice, image, video, text
    avg_latency = Column(Float, default=0.0)  # Average latency in seconds
    failure_rate = Column(Float, default=0.0)  # Percentage 0-100
    cost_per_second = Column(Float, nullable=True)  # Cost per second
    total_requests = Column(Integer, default=0)
    successful_requests = Column(Integer, default=0)
    last_updated = Column(DateTime, default=func.now(), onupdate=func.now())
    created_at = Column(DateTime, default=func.now(), nullable=False)
