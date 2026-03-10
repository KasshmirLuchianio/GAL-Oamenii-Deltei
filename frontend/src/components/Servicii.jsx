import React from 'react';
import { Map, Euro, Briefcase, CheckCircle, TrendingUp, Users } from 'lucide-react';
import { servicii } from '../data/mockData';

const iconMap = {
  map: Map,
  euro: Euro,
  briefcase: Briefcase,
  'check-circle': CheckCircle,
  'trending-up': TrendingUp,
  users: Users
};

const Servicii = () => {
  return (
    <section id="servicii" className="py-24" style={{ background: '#000000' }}>
      <div className="dark-content-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 rounded-sm mb-6" style={{ 
            background: 'rgba(0, 255, 209, 0.1)',
            border: '1px solid rgba(0, 255, 209, 0.3)'
          }}>
            <span style={{ color: '#00FFD1', fontSize: '14px', fontWeight: '500' }}>
              SERVICIILE NOASTRE
            </span>
          </div>
          
          <h2 className="display-large mb-6" style={{ color: '#FFFFFF' }}>
            Consultanță Completă pentru Fonduri Europene
          </h2>
          
          <p className="body-medium" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
            De la elaborarea strategiei până la raportarea finală, vă oferim suportul necesar 
            pentru accesarea cu succes a fondurilor LEADER și FEADR.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicii.map((serviciu) => {
            const IconComponent = iconMap[serviciu.icon];
            
            return (
              <div 
                key={serviciu.id}
                className="p-8 rounded-sm transition-all duration-400 hover:transform hover:-translate-y-2 cursor-pointer group"
                style={{
                  background: '#121212',
                  border: '1px solid rgba(255, 255, 255, 0.15)'
                }}
              >
                <div 
                  className="w-14 h-14 rounded-sm flex items-center justify-center mb-6 transition-all duration-400"
                  style={{
                    background: 'rgba(0, 255, 209, 0.1)',
                    border: '1px solid rgba(0, 255, 209, 0.3)'
                  }}
                >
                  <IconComponent size={28} style={{ color: '#00FFD1' }} />
                </div>

                <h3 className="heading-3 mb-4" style={{ color: '#FFFFFF' }}>
                  {serviciu.titlu}
                </h3>

                <p className="body-medium mb-6" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  {serviciu.descriere}
                </p>

                <div 
                  className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-400"
                  style={{ color: '#00FFD1' }}
                >
                  Află mai multe
                  <span className="transform transition-transform duration-400 group-hover:translate-x-1">→</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <a href="#calendar" className="btn-primary inline-flex items-center gap-3">
            Solicită Consultanță Gratuită
          </a>
        </div>

      </div>
    </section>
  );
};

export default Servicii;
