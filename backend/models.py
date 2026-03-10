from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
import uuid

class ChatMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
    role: str  # "user" or "assistant"
    content: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    metadata: Optional[dict] = None

class ChatSession(BaseModel):
    session_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    last_activity: datetime = Field(default_factory=datetime.utcnow)
    metadata: Optional[dict] = None

class Appointment(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
    nume: str
    email: str
    telefon: str
    data: str  # Format: YYYY-MM-DD
    ora: str   # Format: HH:MM
    mesaj: Optional[str] = None
    status: str = "pending"  # pending, confirmed, cancelled
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ChatRequest(BaseModel):
    session_id: Optional[str] = None
    message: str
    
class ChatResponse(BaseModel):
    session_id: str
    response: str
    suggestions: Optional[List[str]] = None

class AppointmentRequest(BaseModel):
    nume: str
    email: str
    telefon: str
    data: str
    ora: str
    mesaj: Optional[str] = None
