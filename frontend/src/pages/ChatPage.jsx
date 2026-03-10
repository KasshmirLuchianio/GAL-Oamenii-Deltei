import React from 'react';
import ChatInterface from '../components/ChatInterface';

const ChatPage = () => {
  return (
    <div className="w-full h-screen" style={{ background: '#000000' }}>
      <ChatInterface fullScreen={true} />
    </div>
  );
};

export default ChatPage;
