# AI Clone - Architecture Documentation

## Core Principle: Provider Abstraction

**NEVER couple your application to a single AI provider.**

```
Client → Next.js BFF → API Gateway → Model Orchestrator → Provider Adapter → AI Provider
```

This architecture enables:
- ✅ Instant provider swapping
- ✅ Cost-based routing
- ✅ Latency optimization
- ✅ Automatic failover
- ✅ Parallel execution
- ✅ Enterprise negotiation flexibility

---

## System Layers

### 1. Frontend Layer (Next.js)

**Role:** User interface and Backend-For-Frontend (BFF)

**Technology:**
- Next.js 15 with App Router
- React Server Components
- Server Actions
- Tailwind CSS + shadcn/ui
- Zustand for client state

**Responsibilities:**
- User authentication
- UI rendering
- Form validation
- Optimistic updates
- Real-time progress display
- API request batching

---

### 2. API Gateway Layer

**Role:** Request validation, auth, rate limiting

**Technology:**
- FastAPI
- JWT authentication
- Redis for rate limiting

**Responsibilities:**
- Request authentication
- Rate limiting per plan
- Request validation
- Response formatting
- Error handling

---

### 3. AI Orchestration Layer (CRITICAL)

**Role:** Intelligent routing and execution

**Component:** Model Router

**Capabilities:**
- Multi-provider routing
- Parallel inference execution
- Automatic failover
- Retry with exponential backoff
- Cost tracking
- Latency monitoring
- Provider health checks

**Example:**
```python
result = await model_router.generate(
    task="voice_clone",
    payload={"text": "Hello world", "voice_id": "abc123"},
    providers=["elevenlabs", "playht"],
    parallel=True,  # Execute both, return fastest
    priority="high"
)
```

---

### 4. Provider Adapter Layer (MANDATORY)

**Role:** Vendor isolation

**Pattern:** Abstract Base Class

Each provider implements:
- `generate_text()` - LLM generation
- `generate_image()` - Image generation
- `clone_voice()` - Voice synthesis
- `generate_video()` - Video generation

**Benefits:**
- No vendor lock-in
- Consistent error handling
- Unified cost tracking
- Easy A/B testing
- Simplified provider replacement

**Current Adapters:**
- OpenAI (GPT, DALL-E)
- ElevenLabs (Voice)
- Anthropic (Claude)
- Replicate (Video)
- More coming...

---

### 5. Queue System

**Role:** Asynchronous task processing

**Technology:** Redis + Dramatiq

**Task Types:**
- Voice model training (10-30 min)
- Face model training (20-60 min)
- Long video generation (5-15 min)
- Batch content workflows (variable)

**Why Separate Queue:**
- API stays responsive
- GPU tasks don't block requests
- Better error handling
- Resource isolation
- Easy horizontal scaling

---

### 6. GPU Worker Layer

**Role:** Heavy compute operations

**Deployment:** RunPod / Modal / Lambda Labs

**Operations:**
- Model fine-tuning
- Voice training
- Video rendering
- Batch inference

**Architecture:**
- Separate from API servers
- Elastic scaling
- Cost-optimized GPUs
- Auto-shutdown when idle

---

### 7. Storage Layer

**Technology:** Cloudflare R2 (or AWS S3)

**Stored Assets:**
- Training data (voice samples, videos)
- Generated outputs (voice, images, videos)
- User uploads
- Model checkpoints

**CDN:** Cloudflare for low-latency delivery

---

### 8. Database Layer

**Technology:** PostgreSQL

**Core Tables:**
- `users` - User accounts and credits
- `influencer_models` - Cloned models (voice, face, avatar)
- `generations` - Generated content records
- `provider_metrics` - Performance tracking

**Why PostgreSQL:**
- Complex relationships
- ACID compliance
- Rich querying
- Excellent for analytics
- Battle-tested

---

## Data Flow Examples

### Voice Generation Flow

1. User submits text via Next.js frontend
2. Next.js calls FastAPI `/api/v1/generations/voice`
3. FastAPI validates request and auth
4. Model Router selects provider based on:
   - User plan (free → cheaper model)
   - Provider health metrics
   - Cost vs latency trade-off
5. Provider Adapter calls ElevenLabs API
6. Response streamed back to client
7. Generation record saved to database
8. Cost deducted from user credits

### Parallel Inference (Performance Optimization)

```python
# Sequential (slow)
voice = await generate_voice(text)
image = await generate_image(prompt)
video = await generate_video(script)
# Total: 15 seconds

# Parallel (fast)
voice, image, video = await asyncio.gather(
    generate_voice(text),
    generate_image(prompt),
    generate_video(script)
)
# Total: 5 seconds (60-80% faster)
```

### AI Agent Workflow

**User Request:** "Create 5 fitness reels"

**Agent Execution:**
1. Generate 5 video scripts (LLM)
2. Generate voice for each script (parallel)
3. Generate avatar videos (parallel)
4. Create captions and hashtags (LLM)
5. Export platform-ready assets
6. Return batch results

**Technology:** Temporal for durable workflows

---

## Scaling Strategy

### Phase 1: API-First (Current)
- Use third-party APIs for all AI
- Focus on speed to market
- Validate product-market fit

### Phase 2: Hybrid
- Self-host high-volume models
- Keep APIs for low-volume/experimental
- Dramatically improve margins

### Phase 3: Self-Hosted
- Run custom models on dedicated GPUs
- Maximum defensibility
- Highest margins
- Enterprise-ready

---

## Security Architecture

### Consent Management
- Video/written consent before cloning
- Consent records stored with timestamp
- Audit trail for legal compliance

### Watermarking
- Invisible watermarks on AI content
- Traceable back to source account
- Deterrent for misuse

### Abuse Detection
- Automated deepfake detection
- Rate limiting for suspicious activity
- Manual review queue for flagged content

### Access Control
- JWT-based authentication
- Role-based permissions
- API key rotation
- Webhook signature verification

---

## Cost Optimization

### Strategies

1. **Intelligent Routing**
   - Route simple tasks to cheap models
   - Use premium models only when needed

2. **Aggressive Caching**
   - Cache LLM outputs (scripts, captions)
   - Cache image generations
   - Redis with 24-hour TTL

3. **Batch Processing**
   - Group similar requests
   - Reduce per-request overhead

4. **Provider Negotiation**
   - Enterprise pricing at scale
   - Volume discounts
   - Custom SLAs

5. **Self-Hosting Migration**
   - Identify high-volume use cases
   - Calculate break-even point
   - Move incrementally

---

## Monitoring & Observability

### Key Metrics

**Performance:**
- Request latency (p50, p95, p99)
- Provider response times
- Queue wait times
- GPU utilization

**Business:**
- Cost per generation
- Revenue per user
- Credit usage patterns
- Churn indicators

**Reliability:**
- Error rates by provider
- Retry success rates
- Failover frequency
- Uptime

**Tools:**
- Structured logging (structlog)
- Metrics (Prometheus)
- Tracing (optional: Jaeger)
- Alerts (PagerDuty)

---

## Disaster Recovery

### Database Backups
- Automated daily backups
- Point-in-time recovery
- Multi-region replication

### Storage Redundancy
- Cross-region replication
- Versioning enabled
- Lifecycle policies

### Provider Failover
- Automatic provider switching
- Health check monitoring
- Circuit breaker pattern

---

## Future Enhancements

### Model Registry
Internal versioning system:
- `voice_v1`, `voice_v2`, `avatar_pro`
- A/B testing capabilities
- Staged rollouts
- Easy rollbacks

### Multi-Tenancy
- Team workspaces
- Shared models
- Usage attribution
- Centralized billing

### Advanced Agents
- Calendar-based posting
- Brand voice fine-tuning
- Multi-platform optimization
- Performance analytics

---

## Technology Justifications

### Why FastAPI (vs Django/Flask)
- Native async support
- Automatic API docs
- Type safety with Pydantic
- Excellent for streaming
- Fast development

### Why PostgreSQL (vs MongoDB)
- Complex relationships
- Strong consistency
- Billing accuracy
- Rich analytics
- Team familiarity

### Why Dramatiq (vs Celery)
- Simpler than Celery
- Better defaults
- Excellent Python 3 support
- Redis-native

### Why Next.js (vs pure React)
- Server components
- Built-in API routes
- Excellent DX
- Vercel deployment
- SEO benefits

---

This architecture balances:
- ✅ Speed to market
- ✅ Cost efficiency
- ✅ Scalability
- ✅ Maintainability
- ✅ Provider flexibility

Ready for production from day one.
