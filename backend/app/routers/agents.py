from fastapi import APIRouter

router = APIRouter()


@router.post("/content")
async def create_content():
    """AI agent creates full content workflow"""
    return {"message": "Content agent - To be implemented"}


@router.post("/batch")
async def batch_generate():
    """Batch content generation"""
    return {"message": "Batch generation - To be implemented"}


@router.get("/workflows")
async def list_workflows():
    """List available workflows"""
    return {"message": "List workflows - To be implemented"}
