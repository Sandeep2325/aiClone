"""
Model Router - Core orchestration layer
Routes requests to providers with failover and parallel execution
"""

import asyncio
from typing import List, Optional, Dict, Any
import structlog
from datetime import datetime

logger = structlog.get_logger()


class ModelRouter:
    """
    Central orchestration layer for AI model routing
    
    Responsibilities:
    - Route inference requests to providers
    - Retry logic with exponential backoff
    - Provider failover
    - Parallel execution
    - Cost tracking
    - Latency tracking
    """

    def __init__(self):
        self.providers: Dict[str, Any] = {}
        self.metrics: Dict[str, Dict] = {}

    def register_provider(self, name: str, provider: Any):
        """Register a provider adapter"""
        self.providers[name] = provider
        logger.info("Provider registered", provider=name)

    async def generate(
        self,
        task: str,
        payload: Dict[str, Any],
        providers: Optional[List[str]] = None,
        priority: str = "normal",
        parallel: bool = False,
        max_retries: int = 3,
    ) -> Dict[str, Any]:
        """
        Execute AI generation task with intelligent routing
        
        Args:
            task: Task type (e.g., 'voice_clone', 'image_generate')
            payload: Input data for generation
            providers: List of provider names to try (in order if parallel=False)
            priority: Priority level ('low', 'normal', 'high')
            parallel: If True, execute all providers in parallel and return fastest
            max_retries: Maximum retry attempts per provider
        
        Returns:
            Dict with result, provider used, cost, and latency
        """
        start_time = datetime.now()
        
        if not providers:
            providers = self._get_default_providers(task)
        
        logger.info(
            "Starting generation",
            task=task,
            providers=providers,
            priority=priority,
            parallel=parallel,
        )

        if parallel:
            result = await self._execute_parallel(task, payload, providers, max_retries)
        else:
            result = await self._execute_sequential(task, payload, providers, max_retries)

        end_time = datetime.now()
        latency = (end_time - start_time).total_seconds()

        result["total_latency"] = latency
        
        logger.info(
            "Generation completed",
            task=task,
            provider=result.get("provider"),
            latency=latency,
            cost=result.get("cost"),
        )

        return result

    async def _execute_parallel(
        self, task: str, payload: Dict[str, Any], providers: List[str], max_retries: int
    ) -> Dict[str, Any]:
        """Execute task on multiple providers in parallel, return fastest successful result"""
        tasks = [
            self._execute_with_retry(task, payload, provider, max_retries)
            for provider in providers
        ]

        # Return first successful result
        for coro in asyncio.as_completed(tasks):
            try:
                result = await coro
                if result.get("status") == "success":
                    return result
            except Exception as e:
                logger.error("Provider failed in parallel execution", error=str(e))
                continue

        return {"status": "failed", "error": "All providers failed"}

    async def _execute_sequential(
        self, task: str, payload: Dict[str, Any], providers: List[str], max_retries: int
    ) -> Dict[str, Any]:
        """Execute task with provider failover (try providers in sequence)"""
        for provider in providers:
            try:
                result = await self._execute_with_retry(task, payload, provider, max_retries)
                if result.get("status") == "success":
                    return result
            except Exception as e:
                logger.error(
                    "Provider failed, trying next",
                    provider=provider,
                    error=str(e),
                )
                continue

        return {"status": "failed", "error": "All providers failed"}

    async def _execute_with_retry(
        self, task: str, payload: Dict[str, Any], provider: str, max_retries: int
    ) -> Dict[str, Any]:
        """Execute task with exponential backoff retry"""
        for attempt in range(max_retries):
            try:
                result = await self._execute_single(task, payload, provider)
                return result
            except Exception as e:
                wait_time = 2 ** attempt  # Exponential backoff
                logger.warning(
                    "Retry after failure",
                    provider=provider,
                    attempt=attempt + 1,
                    wait_time=wait_time,
                    error=str(e),
                )
                if attempt < max_retries - 1:
                    await asyncio.sleep(wait_time)
                else:
                    raise

        return {"status": "failed", "error": "Max retries exceeded"}

    async def _execute_single(
        self, task: str, payload: Dict[str, Any], provider: str
    ) -> Dict[str, Any]:
        """Execute task on a single provider"""
        if provider not in self.providers:
            raise ValueError(f"Provider {provider} not registered")

        provider_instance = self.providers[provider]
        
        # Route to appropriate method based on task
        if task == "voice_clone":
            result = await provider_instance.clone_voice(payload)
        elif task == "generate_image":
            result = await provider_instance.generate_image(payload)
        elif task == "generate_video":
            result = await provider_instance.generate_video(payload)
        elif task == "generate_text":
            result = await provider_instance.generate_text(payload)
        else:
            raise ValueError(f"Unknown task type: {task}")

        result["provider"] = provider
        result["status"] = "success"
        return result

    def _get_default_providers(self, task: str) -> List[str]:
        """Get default providers for a task type"""
        defaults = {
            "voice_clone": ["elevenlabs", "playht"],
            "generate_image": ["openai", "stability"],
            "generate_video": ["replicate", "runway"],
            "generate_text": ["openai", "anthropic"],
        }
        return defaults.get(task, [])


# Global router instance
model_router = ModelRouter()
