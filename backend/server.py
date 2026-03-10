from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import FileResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import Optional

from models import (
    ChatRequest, 
    ChatResponse, 
    AppointmentRequest,
    Appointment
)
from chat_service import ChatService
from config import MONGO_URL, DB_NAME, AVAILABLE_TIME_SLOTS

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

# Initialize Chat Service
chat_service = ChatService(db)

# Create the main app
app = FastAPI(title="GAL Oamenii Deltei Chat API")

# Create API router
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Health check
@api_router.get("/")
async def root():
    return {
        "message": "GAL Oamenii Deltei Chat API",
        "status": "online",
        "version": "1.0.0"
    }

# Chat endpoints
@api_router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Send a message and get AI response"""
    try:
        session_id = request.session_id
        if not session_id:
            # Create new session
            session = await chat_service.create_session()
            session_id = session.session_id
        
        # Get response from Claude
        response_text = await chat_service.chat(session_id, request.message)
        
        # Get contextual suggestions
        suggestions = await chat_service.get_suggestions(request.message)
        
        return ChatResponse(
            session_id=session_id,
            response=response_text,
            suggestions=suggestions[:3]  # Limit to 3 suggestions
        )
    
    except Exception as e:
        logger.error(f"Chat error: {e}")
        raise HTTPException(status_code=500, detail="Eroare la procesarea mesajului")

@api_router.get("/chat/history/{session_id}")
async def get_history(session_id: str, limit: int = 20):
    """Get chat history for a session"""
    try:
        history = await chat_service.get_chat_history(session_id, limit)
        return {"session_id": session_id, "messages": history}
    except Exception as e:
        logger.error(f"History error: {e}")
        raise HTTPException(status_code=500, detail="Eroare la încărcarea istoricului")

# Appointment endpoints
@api_router.post("/appointments", response_model=Appointment)
async def create_appointment(request: AppointmentRequest, session_id: Optional[str] = None):
    """Create an appointment booking"""
    try:
        if not session_id:
            session = await chat_service.create_session()
            session_id = session.session_id
        
        # Validate time slot
        if request.ora not in AVAILABLE_TIME_SLOTS:
            raise HTTPException(
                status_code=400, 
                detail=f"Ora trebuie să fie una dintre: {', '.join(AVAILABLE_TIME_SLOTS)}"
            )
        
        appointment = await chat_service.create_appointment(
            session_id=session_id,
            appointment_data=request.dict()
        )
        
        return appointment
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Appointment error: {e}")
        raise HTTPException(status_code=500, detail="Eroare la crearea programării")

@api_router.get("/appointments/available-times")
async def get_available_times():
    """Get available time slots"""
    return {"available_times": AVAILABLE_TIME_SLOTS}

# Case studies endpoints
@api_router.get("/case-studies")
async def get_case_studies():
    """Get list of available case studies"""
    return {
        "case_studies": [
            {
                "id": "sdl-2023-2027",
                "title": "Strategia de Dezvoltare Locală GAL Oamenii Deltei 2023-2027",
                "description": "Document complet cu cele 7 intervenții FEADR și buget total de 1.751.488 EUR",
                "file_available": True
            },
            {
                "id": "arhitectura-traditionala",
                "title": "Ghid Recuperare Arhitectură Tradițională",
                "description": "Ghid practic pentru reabilitarea locuințelor în stil deltaic",
                "file_available": False
            },
            {
                "id": "puncte-gastronomice",
                "title": "Rețeaua Punctelor Gastronomice Locale",
                "description": "Studiu de caz: 15 PGL-uri implementate cu succes",
                "file_available": False
            }
        ]
    }

@api_router.get("/case-studies/{case_study_id}/download")
async def download_case_study(case_study_id: str):
    """Download a case study document"""
    if case_study_id == "sdl-2023-2027":
        # Return the knowledge base as a text file
        kb_path = ROOT_DIR / "knowledge_base.md"
        if kb_path.exists():
            return FileResponse(
                kb_path,
                media_type="text/markdown",
                filename="SDL_GAL_Oamenii_Deltei_2023-2027.md"
            )
    
    raise HTTPException(status_code=404, detail="Document negăsit")

# Include router in app
app.include_router(api_router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
