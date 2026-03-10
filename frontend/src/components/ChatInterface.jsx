import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Calendar, FileText, Phone } from 'lucide-react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ChatInterface = ({ fullScreen = true }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Send welcome message
    const welcomeMsg = {
      id: 'welcome',
      role: 'assistant',
      content: 'Bună ziua! Sunt asistentul virtual al GAL Oamenii Deltei. Pot să te ajut cu informații despre fondurile europene LEADER, programări de consultanță, și orice întrebări legate de dezvoltarea rurală în Delta Dunării. Cu ce te pot ajuta astăzi?',
      timestamp: new Date()
    };
    setMessages([welcomeMsg]);
    setSuggestions([
      'Ce tipuri de proiecte pot fi finanțate?',
      'Vreau să deschid un punct gastronomic local',
      'Programează o consultație',
    ]);
  }, []);

  const sendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: messageText,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(`${API}/chat`, {
        session_id: sessionId,
        message: messageText
      });

      if (!sessionId) {
        setSessionId(response.data.session_id);
      }

      // Add assistant message
      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response.data.response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);

      if (response.data.suggestions) {
        setSuggestions(response.data.suggestions);
      }

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: 'Îmi pare rău, a apărut o eroare. Te rog încearcă din nou sau contactează-ne la office@galoameniideltei.ro',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleSuggestionClick = (suggestion) => {
    sendMessage(suggestion);
  };

  return (
    <div 
      className={fullScreen ? "h-screen flex flex-col bg-black" : "h-[600px] flex flex-col"}
      style={{ background: '#000000' }}
    >
      {/* Header */}
      <div className="p-4 border-b flex items-center gap-3" style={{ borderColor: 'rgba(0, 255, 209, 0.3)', background: '#121212' }}>
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(0, 255, 209, 0.2)' }}>
          <Bot size={24} style={{ color: '#00FFD1' }} />
        </div>
        <div>
          <h2 className="font-semibold" style={{ color: '#FFFFFF' }}>Asistent GAL Oamenii Deltei</h2>
          <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Consultanță fonduri europene</p>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 max-w-4xl mx-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0, 255, 209, 0.2)' }}>
                  <Bot size={18} style={{ color: '#00FFD1' }} />
                </div>
              )}
              
              <div
                className="max-w-[70%] p-4 rounded-lg"
                style={{
                  background: message.role === 'user' ? '#00FFD1' : '#121212',
                  color: message.role === 'user' ? '#000000' : '#FFFFFF',
                  border: `1px solid ${message.role === 'user' ? '#00FFD1' : 'rgba(255, 255, 255, 0.15)'}`
                }}
              >
                <p className="whitespace-pre-wrap" style={{ lineHeight: '1.6' }}>{message.content}</p>
              </div>

              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0, 255, 209, 0.2)' }}>
                  <User size={18} style={{ color: '#00FFD1' }} />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(0, 255, 209, 0.2)' }}>
                <Bot size={18} style={{ color: '#00FFD1' }} />
              </div>
              <div className="p-4 rounded-lg" style={{ background: '#121212', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
                <Loader2 className="animate-spin" size={20} style={{ color: '#00FFD1' }} />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Suggestions */}
      {suggestions.length > 0 && !loading && (
        <div className="px-4 py-2 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="flex flex-wrap gap-2 max-w-4xl mx-auto">
            {suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-3 py-1.5 rounded-full text-sm transition-all duration-300"
                style={{
                  background: 'rgba(0, 255, 209, 0.1)',
                  border: '1px solid rgba(0, 255, 209, 0.3)',
                  color: '#00FFD1'
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t" style={{ borderColor: 'rgba(255, 255, 209, 0.3)' }}>
        <div className="flex gap-3 max-w-4xl mx-auto">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Scrie mesajul tău aici..."
            disabled={loading}
            className="flex-1 rounded-lg"
            style={{
              background: '#121212',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#FFFFFF'
            }}
          />
          <Button
            type="submit"
            disabled={loading || !input.trim()}
            className="rounded-lg"
            style={{
              background: '#00FFD1',
              color: '#000000',
              minWidth: '50px'
            }}
          >
            <Send size={20} />
          </Button>
        </div>
      </form>

      {/* Quick Actions */}
      <div className="px-4 pb-4" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <div className="flex gap-2 max-w-4xl mx-auto pt-3">
          <button
            onClick={() => sendMessage('Vreau să programez o consultație')}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#FFFFFF'
            }}
          >
            <Calendar size={16} />
            Programare
          </button>
          <button
            onClick={() => sendMessage('Vreau să văd studiile de caz disponibile')}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#FFFFFF'
            }}
          >
            <FileText size={16} />
            Case Studies
          </button>
          <button
            onClick={() => sendMessage('Care sunt informațiile de contact?')}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#FFFFFF'
            }}
          >
            <Phone size={16} />
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
