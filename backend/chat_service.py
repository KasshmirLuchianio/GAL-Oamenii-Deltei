import asyncio
from typing import List, Optional
from datetime import datetime
from emergentintegrations.llm.chat import LlmChat, UserMessage
from motor.motor_asyncio import AsyncIOMotorDatabase
from models import ChatMessage, ChatSession, Appointment
from config import (
    EMERGENT_LLM_KEY, 
    CLAUDE_MODEL, 
    CLAUDE_PROVIDER,
    SYSTEM_PROMPT,
    KNOWLEDGE_BASE_PATH
)
import logging

logger = logging.getLogger(__name__)

class ChatService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
        self.knowledge_base = self._load_knowledge_base()
    
    def _load_knowledge_base(self) -> str:
        """Load knowledge base from file"""
        try:
            with open(KNOWLEDGE_BASE_PATH, 'r', encoding='utf-8') as f:
                return f.read()
        except Exception as e:
            logger.error(f"Error loading knowledge base: {e}")
            return ""
    
    async def create_session(self, user_id: Optional[str] = None) -> ChatSession:
        """Create a new chat session"""
        session = ChatSession(user_id=user_id)
        await self.db.chat_sessions.insert_one(session.dict())
        return session
    
    async def get_session(self, session_id: str) -> Optional[ChatSession]:
        """Get session by ID"""
        session_data = await self.db.chat_sessions.find_one({"session_id": session_id})
        if session_data:
            return ChatSession(**session_data)
        return None
    
    async def save_message(self, message: ChatMessage):
        """Save a chat message to database"""
        await self.db.chat_messages.insert_one(message.dict())
        
        # Update session last_activity
        await self.db.chat_sessions.update_one(
            {"session_id": message.session_id},
            {"$set": {"last_activity": datetime.utcnow()}}
        )
    
    async def get_chat_history(self, session_id: str, limit: int = 20) -> List[ChatMessage]:
        """Get chat history for a session"""
        messages = await self.db.chat_messages.find(
            {"session_id": session_id}
        ).sort("timestamp", -1).limit(limit).to_list(limit)
        
        # Reverse to get chronological order
        messages.reverse()
        return [ChatMessage(**msg) for msg in messages]
    
    async def chat(self, session_id: str, user_message: str) -> str:
        """Process chat message and get response from Claude"""
        try:
            # Get or create session
            session = await self.get_session(session_id)
            if not session:
                session = await self.create_session()
                session_id = session.session_id
            
            # Save user message
            user_msg = ChatMessage(
                session_id=session_id,
                role="user",
                content=user_message
            )
            await self.save_message(user_msg)
            
            # Get chat history for context
            history = await self.get_chat_history(session_id, limit=10)
            
            # Create enhanced system prompt with knowledge base
            enhanced_system_prompt = f"""{SYSTEM_PROMPT}

## BAZA DE CUNOȘTINȚE:
{self.knowledge_base}

Folosește aceste informații pentru a răspunde precis la întrebările utilizatorilor despre fondurile europene și GAL Oamenii Deltei.
"""
            
            # Initialize Claude chat
            chat = LlmChat(
                api_key=EMERGENT_LLM_KEY,
                session_id=session_id,
                system_message=enhanced_system_prompt
            ).with_model(CLAUDE_PROVIDER, CLAUDE_MODEL)
            
            # Prepare message with context from history (excluding current message)
            conversation_context = ""
            for msg in history[:-1]:  # Exclude the just-saved user message
                if msg.role == "user":
                    conversation_context += f"\n\nUtilizator: {msg.content}"
                else:
                    conversation_context += f"\n\nAsistent: {msg.content}"
            
            # Create the message with conversation context
            full_message = f"{conversation_context}\n\nUtilizator: {user_message}" if conversation_context else user_message
            
            claude_message = UserMessage(text=full_message)
            
            # Get response from Claude
            response = await chat.send_message(claude_message)
            
            # Save assistant response
            assistant_msg = ChatMessage(
                session_id=session_id,
                role="assistant",
                content=response
            )
            await self.save_message(assistant_msg)
            
            return response
            
        except Exception as e:
            logger.error(f"Error in chat service: {e}")
            return "Îmi pare rău, a apărut o eroare tehnică. Te rog încearcă din nou sau contactează-ne direct la office@galoameniideltei.ro"
    
    async def create_appointment(self, session_id: str, appointment_data: dict) -> Appointment:
        """Create an appointment booking"""
        appointment = Appointment(
            session_id=session_id,
            **appointment_data
        )
        await self.db.appointments.insert_one(appointment.dict())
        return appointment
    
    async def get_suggestions(self, context: str = "") -> List[str]:
        """Generate contextual suggestions for user"""
        default_suggestions = [
            "Ce tipuri de proiecte pot fi finanțate?",
            "Vreau să deschid un punct gastronomic local",
            "Cum pot reabilita casa tradițională pentru turism?",
            "Programează o consultație",
            "Ce documente sunt necesare?"
        ]
        
        # TODO: Make this more intelligent based on conversation context
        return default_suggestions
