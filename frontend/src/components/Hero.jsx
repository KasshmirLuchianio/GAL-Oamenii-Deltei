import React from 'react';
import { ArrowRight, MapPin, Award, TrendingUp } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center" style={{ 
      background: '#000000',
      paddingTop: '80px'
    }}>
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 1px, #fff 1px, #fff 2px),
                         repeating-linear-gradient(-90deg, #fff, #fff 1px, transparent 1px, transparent 7.6923%)`,
        backgroundSize: '100% 100%'
      }}></div>

      <div className="dark-content-container relative z-10 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="inline-block px-4 py-2 rounded-sm" style={{ 
              background: 'rgba(0, 255, 209, 0.1)',
              border: '1px solid rgba(0, 255, 209, 0.3)'
            }}>
              <span style={{ color: '#00FFD1', fontSize: '14px', fontWeight: '500' }}>
                Consultanță Fonduri Europene LEADER 2023-2027
              </span>
            </div>

            <h1 className="display-huge" style={{ 
              color: '#FFFFFF',
              lineHeight: '1.1'
            }}>
              Transformăm Proiecte în
              <span style={{ color: '#00FFD1' }}> Realitate Finanțată</span>
            </h1>

            <p className="body-large" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
              Specialist în accesarea fondurilor FEADR pentru dezvoltarea rurală durabilă în Delta Dunării. 
              De la strategie la implementare, vă ghidăm pe tot parcursul proiectului.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-6">
              <div>
                <div className="text-3xl font-semibold mb-1" style={{ color: '#00FFD1' }}>50+</div>
                <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Proiecte Finalizate</div>
              </div>
              <div>
                <div className="text-3xl font-semibold mb-1" style={{ color: '#00FFD1' }}>98%</div>
                <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Rată Aprobare</div>
              </div>
              <div>
                <div className="text-3xl font-semibold mb-1" style={{ color: '#00FFD1' }}>1.7M€</div>
                <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Fonduri Atrase</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a href="#calendar" className="btn-primary inline-flex items-center gap-3">
                Programează Consultație
                <ArrowRight size={20} />
              </a>
              <a href="#servicii" className="btn-secondary inline-flex items-center gap-3">
                Explorează Serviciile
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 pt-6 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.15)' }}>
              <div className="flex items-center gap-2">
                <Award size={20} style={{ color: '#00FFD1' }} />
                <span className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Acreditare AFIR
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={20} style={{ color: '#00FFD1' }} />
                <span className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Expert Local Delta Dunării
                </span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp size={20} style={{ color: '#00FFD1' }} />
                <span className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  10+ Ani Experiență
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="relative rounded-sm overflow-hidden" style={{
              border: '2px solid rgba(0, 255, 209, 0.3)'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=900&fit=crop"
                alt="Consultanță fonduri europene"
                className="w-full h-auto"
              />
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)'
              }}></div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 p-6 rounded-sm" style={{
              background: '#121212',
              border: '1px solid rgba(0, 255, 209, 0.3)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
            }}>
              <div className="text-xl font-semibold mb-1" style={{ color: '#00FFD1' }}>
                1.751.488 EUR
              </div>
              <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Buget SDL 2023-2027
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
