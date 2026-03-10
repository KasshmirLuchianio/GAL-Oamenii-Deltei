import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Servicii from "@/components/Servicii";
import AppointmentCalendar from "@/components/AppointmentCalendar";
import Testimoniale from "@/components/Testimoniale";
import CaseStudies from "@/components/CaseStudies";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

const Home = () => {
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
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
