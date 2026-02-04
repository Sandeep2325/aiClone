"""
Base Provider Contract
All provider adapters must implement this interface
"""

from abc import ABC, abstractmethod
from typing import Dict, Any


class BaseProvider(ABC):
    """
    Abstract base class for all AI provider adapters
    
    This ensures consistent interface across all providers
    and prevents vendor lock-in
    """

    @abstractmethod
    async def generate_text(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """
        Generate text using LLM
        
        Args:
            payload: {
                "prompt": str,
                "max_tokens": int,
                "temperature": float,
                ...
            }
        
        Returns:
            {
                "text": str,
                "cost": float,
                "latency": float,
                "model": str
            }
        """
        pass

    @abstractmethod
    async def generate_image(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """
        Generate image
        
        Args:
            payload: {
                "prompt": str,
                "size": str,
                "style": str,
                ...
            }
        
        Returns:
            {
                "url": str,
                "cost": float,
                "latency": float
            }
        """
        pass

    @abstractmethod
    async def clone_voice(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """
        Clone voice or generate speech
        
        Args:
            payload: {
                "text": str,
                "voice_id": str,
                "model_id": str,
                ...
            }
        
        Returns:
            {
                "audio_url": str,
                "cost": float,
                "latency": float,
                "duration": float
            }
        """
        pass

    @abstractmethod
    async def generate_video(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """
        Generate video
        
        Args:
            payload: {
                "prompt": str,
                "duration": int,
                "style": str,
                ...
            }
        
        Returns:
            {
                "video_url": str,
                "cost": float,
                "latency": float
            }
        """
        pass
