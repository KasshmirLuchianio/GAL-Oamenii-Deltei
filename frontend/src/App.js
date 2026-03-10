import React from "react";
import "@/App.css";
import ChatInterface from "@/components/ChatInterface";

function App() {
  return (
    <div className="App">
      <ChatInterface fullScreen={true} />
    </div>
  );
}

export default App;
