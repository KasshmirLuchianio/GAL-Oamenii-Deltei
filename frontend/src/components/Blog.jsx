import React from 'react';
import { Clock, ArrowRight, Calendar } from 'lucide-react';
import { articoleBlog } from '../data/mockData';
import { Card } from './ui/card';

const Blog = () => {
  return (
    <section id="blog" className="py-24" style={{ background: '#000000' }}>
      <div className="dark-content-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 rounded-sm mb-6" style={{ 
            background: 'rgba(0, 255, 209, 0.1)',
            border: '1px solid rgba(0, 255, 209, 0.3)'
          }}>
            <span style={{ color: '#00FFD1', fontSize: '14px', fontWeight: '500' }}>
              BLOG & RESURSE
            </span>
          </div>
          
          <h2 className="display-large mb-6" style={{ color: '#FFFFFF' }}>
            Ultimele Articole despre Fonduri Europene
          </h2>
          
          <p className="body-medium" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
            Ghiduri practice, știri și analize despre accesarea fondurilor LEADER, 
            turism durabil și dezvoltare rurală în Delta Dunării
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {articoleBlog.map((articol) => (
            <Card 
              key={articol.id}
              className="rounded-sm overflow-hidden transition-all duration-400 hover:transform hover:-translate-y-2 cursor-pointer group"
              style={{
                background: '#121212',
                border: '1px solid rgba(255, 255, 255, 0.15)'
              }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={articol.imagine}
                  alt={articol.titlu}
                  className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-110"
                />
                <div className="absolute inset-0" style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)'
                }}></div>
                
                {/* Category */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-sm text-xs font-medium" style={{
                  background: '#00FFD1',
                  color: '#000000'
                }}>
                  {articol.categorie}
                </div>

                {/* Reading Time */}
                <div className="absolute bottom-4 right-4 px-3 py-1 rounded-sm text-xs flex items-center gap-2" style={{
                  background: 'rgba(0, 0, 0, 0.7)',
                  color: '#FFFFFF'
                }}>
                  <Clock size={12} />
                  {articol.timpCitire}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4 text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>{articol.data}</span>
                  </div>
                  <span>•</span>
                  <span>{articol.autor}</span>
                </div>

                <h3 className="heading-3 mb-3 transition-colors duration-300 group-hover:text-[#00FFD1]" style={{ color: '#FFFFFF' }}>
                  {articol.titlu}
                </h3>

                <p className="body-medium mb-6" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  {articol.excerpt}
                </p>

                <div 
                  className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-400"
                  style={{ color: '#00FFD1' }}
                >
                  Citește articolul
                  <ArrowRight size={16} className="transform transition-transform duration-400 group-hover:translate-x-1" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <button className="btn-secondary inline-flex items-center gap-2">
            Vezi Toate Articolele
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default Blog;
