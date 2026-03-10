import React from 'react';
import { Star } from 'lucide-react';
import { testimoniale } from '../data/mockData';
import { Card } from './ui/card';

const Testimoniale = () => {
  return (
    <section id="testimoniale" className="py-24" style={{ background: '#000000' }}>
      <div className="dark-content-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 rounded-sm mb-6" style={{ 
            background: 'rgba(0, 255, 209, 0.1)',
            border: '1px solid rgba(0, 255, 209, 0.3)'
          }}>
            <span style={{ color: '#00FFD1', fontSize: '14px', fontWeight: '500' }}>
              TESTIMONIALE
            </span>
          </div>
          
          <h2 className="display-large mb-6" style={{ color: '#FFFFFF' }}>
            Povești de Succes din Delta Dunării
          </h2>
          
          <p className="body-medium" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
            Peste 50 de antreprenori locali și-au transformat visurile în afaceri prospere 
            cu ajutorul nostru. Iată ce spun beneficiarii noștri:
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimoniale.map((testimonial) => (
            <Card 
              key={testimonial.id}
              className="p-8 rounded-sm transition-all duration-400 hover:transform hover:-translate-y-1"
              style={{
                background: '#121212',
                border: '1px solid rgba(255, 255, 255, 0.15)'
              }}
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    fill="#00FFD1" 
                    style={{ color: '#00FFD1' }}
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="body-medium mb-8" style={{ 
                color: 'rgba(255, 255, 255, 0.85)',
                fontStyle: 'italic',
                lineHeight: '1.8'
              }}>
                "{testimonial.text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-6 border-t" style={{
                borderColor: 'rgba(255, 255, 255, 0.15)'
              }}>
                <img 
                  src={testimonial.imagine}
                  alt={testimonial.nume}
                  className="w-14 h-14 rounded-full object-cover"
                  style={{
                    border: '2px solid rgba(0, 255, 209, 0.3)'
                  }}
                />
                <div>
                  <div className="font-semibold mb-1" style={{ color: '#FFFFFF' }}>
                    {testimonial.nume}
                  </div>
                  <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    {testimonial.functie}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-16 text-center">
          <div className="inline-block p-6 rounded-sm" style={{
            background: 'rgba(0, 255, 209, 0.05)',
            border: '1px solid rgba(0, 255, 209, 0.2)'
          }}>
            <div className="text-4xl font-semibold mb-2" style={{ color: '#00FFD1' }}>
              4.9/5.0
            </div>
            <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Rating mediu din 50+ proiecte finalizate
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimoniale;
