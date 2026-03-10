import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ChatPage from "@/pages/ChatPage";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Servicii from "@/components/Servicii";
import AppointmentCalendar from "@/components/AppointmentCalendar";
import Testimoniale from "@/components/Testimoniale";
import CaseStudies from "@/components/CaseStudies";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { MessageCircle } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="dark-theme">
      <Header />
      <main>
        <Hero />
        <Servicii />
        <AppointmentCalendar />
        <Testimoniale />
        <CaseStudies />
        <Blog />
      </main>
      <Footer />
      
      {/* Floating Chat Button */}
      <Link
        to="/chat"
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-50"
        style={{
          background: '#00FFD1',
          boxShadow: '0 8px 32px rgba(0, 255, 209, 0.4)'
        }}
      >
        <MessageCircle size={28} style={{ color: '#000000' }} />
      </Link>
      
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
