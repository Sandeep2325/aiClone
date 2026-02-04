"""
OpenAI Provider Adapter
"""

from typing import Dict, Any
import openai
from datetime import datetime
from app.providers.base_provider import BaseProvider
from app.core.config import settings


class OpenAIProvider(BaseProvider):
    """OpenAI API adapter"""

    def __init__(self):
        self.client = openai.AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

    async def generate_text(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """Generate text using GPT models"""
        start_time = datetime.now()

        response = await self.client.chat.completions.create(
            model=payload.get("model", "gpt-4"),
            messages=payload.get("messages", []),
            temperature=payload.get("temperature", 0.7),
            max_tokens=payload.get("max_tokens", 1000),
        )

        latency = (datetime.now() - start_time).total_seconds()

        # Calculate cost (approximate)
        input_cost = (response.usage.prompt_tokens / 1000) * 0.03
        output_cost = (response.usage.completion_tokens / 1000) * 0.06
        total_cost = input_cost + output_cost

        return {
            "text": response.choices[0].message.content,
            "cost": total_cost,
            "latency": latency,
            "model": response.model,
            "tokens": response.usage.total_tokens,
        }

    async def generate_image(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """Generate image using DALL-E"""
        start_time = datetime.now()

        response = await self.client.images.generate(
            model=payload.get("model", "dall-e-3"),
            prompt=payload.get("prompt"),
            size=payload.get("size", "1024x1024"),
            quality=payload.get("quality", "standard"),
            n=1,
        )

        latency = (datetime.now() - start_time).total_seconds()

        # DALL-E 3 pricing
        cost = 0.040 if payload.get("quality") == "standard" else 0.080

        return {
            "url": response.data[0].url,
            "cost": cost,
            "latency": latency,
        }

    async def clone_voice(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """Not supported by OpenAI"""
        raise NotImplementedError("Voice cloning not supported by OpenAI")

    async def generate_video(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """Not supported by OpenAI"""
        raise NotImplementedError("Video generation not supported by OpenAI")
