import React, { useState } from 'react';
import { Calendar } from './ui/calendar';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Calendar as CalendarIcon, Clock, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { oreDisponibile } from '../data/mockData';
import { toast } from 'sonner';

const AppointmentCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({
    nume: '',
    email: '',
    telefon: '',
    mesaj: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedTime) {
      toast.error('Vă rugăm selectați o oră pentru programare');
      return;
    }

    // Mock submission
    toast.success('Programarea a fost înregistrată cu succes! Veți fi contactat în curând.');
    
    // Reset form
    setSelectedTime('');
    setFormData({ nume: '', email: '', telefon: '', mesaj: '' });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="calendar" className="py-24" style={{ background: '#121212' }}>
      <div className="dark-content-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 rounded-sm mb-6" style={{ 
            background: 'rgba(0, 255, 209, 0.1)',
            border: '1px solid rgba(0, 255, 209, 0.3)'
          }}>
            <span style={{ color: '#00FFD1', fontSize: '14px', fontWeight: '500' }}>
              PROGRAMEAZĂ CONSULTAȚIE
            </span>
          </div>
          
          <h2 className="display-large mb-6" style={{ color: '#FFFFFF' }}>
            Rezervă o Întâlnire de Consultanță
          </h2>
          
          <p className="body-medium" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
            Discutăm împreună despre proiectul tău și identificăm sursele de finanțare potrivite. 
            Prima consultație este gratuită!
          </p>
        </div>

        {/* Calendar & Form */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Calendar Section */}
          <div>
            <Card className="p-8 rounded-sm" style={{ 
              background: '#000000',
              border: '1px solid rgba(255, 255, 255, 0.15)'
            }}>
              <div className="flex items-center gap-3 mb-6">
                <CalendarIcon size={24} style={{ color: '#00FFD1' }} />
                <h3 className="heading-2" style={{ color: '#FFFFFF' }}>
                  Selectează Data
                </h3>
              </div>

              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-sm border-0"
                disabled={(date) => date < new Date()}
                style={{
                  '--rdp-accent-color': '#00FFD1',
                  '--rdp-background-color': 'rgba(0, 255, 209, 0.1)'
                }}
              />

              {/* Time Slots */}
              <div className="mt-8">
                <div className="flex items-center gap-3 mb-4">
                  <Clock size={24} style={{ color: '#00FFD1' }} />
                  <h4 className="heading-3" style={{ color: '#FFFFFF' }}>
                    Selectează Ora
                  </h4>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  {oreDisponibile.map((ora) => (
                    <button
                      key={ora}
                      onClick={() => setSelectedTime(ora)}
                      className="py-3 px-4 rounded-sm text-sm font-medium transition-all duration-300"
                      style={{
                        background: selectedTime === ora ? '#00FFD1' : 'rgba(255, 255, 255, 0.05)',
                        border: `1px solid ${selectedTime === ora ? '#00FFD1' : 'rgba(255, 255, 255, 0.15)'}`,
                        color: selectedTime === ora ? '#000000' : '#FFFFFF'
                      }}
                    >
                      {ora}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Form Section */}
          <div>
            <Card className="p-8 rounded-sm" style={{ 
              background: '#000000',
              border: '1px solid rgba(255, 255, 255, 0.15)'
            }}>
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare size={24} style={{ color: '#00FFD1' }} />
                <h3 className="heading-2" style={{ color: '#FFFFFF' }}>
                  Detalii Contact
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="nume" className="flex items-center gap-2 mb-2" style={{ color: '#FFFFFF' }}>
                    <User size={16} style={{ color: '#00FFD1' }} />
                    Nume Complet *
                  </Label>
                  <Input
                    id="nume"
                    name="nume"
                    value={formData.nume}
                    onChange={handleInputChange}
                    required
                    placeholder="Ion Popescu"
                    className="rounded-sm"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#FFFFFF'
                    }}
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="flex items-center gap-2 mb-2" style={{ color: '#FFFFFF' }}>
                    <Mail size={16} style={{ color: '#00FFD1' }} />
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="ion.popescu@email.ro"
                    className="rounded-sm"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#FFFFFF'
                    }}
                  />
                </div>

                <div>
                  <Label htmlFor="telefon" className="flex items-center gap-2 mb-2" style={{ color: '#FFFFFF' }}>
                    <Phone size={16} style={{ color: '#00FFD1' }} />
                    Telefon *
                  </Label>
                  <Input
                    id="telefon"
                    name="telefon"
                    type="tel"
                    value={formData.telefon}
                    onChange={handleInputChange}
                    required
                    placeholder="0740 123 456"
                    className="rounded-sm"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#FFFFFF'
                    }}
                  />
                </div>

                <div>
                  <Label htmlFor="mesaj" className="flex items-center gap-2 mb-2" style={{ color: '#FFFFFF' }}>
                    <MessageSquare size={16} style={{ color: '#00FFD1' }} />
                    Mesaj (opțional)
                  </Label>
                  <Textarea
                    id="mesaj"
                    name="mesaj"
                    value={formData.mesaj}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Descrie pe scurt proiectul sau ideea ta..."
                    className="rounded-sm"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#FFFFFF'
                    }}
                  />
                </div>

                {selectedTime && (
                  <div className="p-4 rounded-sm" style={{
                    background: 'rgba(0, 255, 209, 0.1)',
                    border: '1px solid rgba(0, 255, 209, 0.3)'
                  }}>
                    <p className="text-sm" style={{ color: '#00FFD1' }}>
                      Programare: {date?.toLocaleDateString('ro-RO')} la ora {selectedTime}
                    </p>
                  </div>
                )}

                <button type="submit" className="btn-primary w-full">
                  Confirmă Programarea
                </button>
              </form>
            </Card>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AppointmentCalendar;
