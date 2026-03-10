import React from 'react';
import { Download, FileText, Calendar, ExternalLink } from 'lucide-react';
import { caseStudies } from '../data/mockData';
import { Card } from './ui/card';

const CaseStudies = () => {
  const handleDownload = (fisier, titlu) => {
    if (fisier) {
      // În producție, aici ar fi logica reală de download
      window.open(fisier, '_blank');
    } else {
      alert('Acest document va fi disponibil în curând');
    }
  };

  return (
    <section id="case-studies" className="py-24" style={{ background: '#121212' }}>
      <div className="dark-content-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 rounded-sm mb-6" style={{ 
            background: 'rgba(0, 255, 209, 0.1)',
            border: '1px solid rgba(0, 255, 209, 0.3)'
          }}>
            <span style={{ color: '#00FFD1', fontSize: '14px', fontWeight: '500' }}>
              CASE STUDIES
            </span>
          </div>
          
          <h2 className="display-large mb-6" style={{ color: '#FFFFFF' }}>
            Studii de Caz și Documente Utile
          </h2>
          
          <p className="body-medium" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
            Descoperă strategiile și modelele de succes care au transformat comunitățile rurale 
            din Delta Dunării. Documente disponibile pentru download gratuit.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {caseStudies.map((study) => (
            <Card 
              key={study.id}
              className="rounded-sm overflow-hidden transition-all duration-400 hover:transform hover:-translate-y-2 group"
              style={{
                background: '#000000',
                border: '1px solid rgba(255, 255, 255, 0.15)'
              }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={study.imagine}
                  alt={study.titlu}
                  className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-110"
                />
                <div className="absolute inset-0" style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)'
                }}></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-sm text-xs font-medium" style={{
                  background: 'rgba(0, 255, 209, 0.9)',
                  color: '#000000'
                }}>
                  {study.categorie}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3 text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  <Calendar size={14} />
                  <span>{study.dataPublicare}</span>
                </div>

                <h3 className="heading-3 mb-4" style={{ color: '#FFFFFF' }}>
                  {study.titlu}
                </h3>

                <p className="body-small mb-6" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  {study.descriere}
                </p>

                {/* Download Button */}
                <button
                  onClick={() => handleDownload(study.fisier, study.titlu)}
                  className="w-full py-3 px-4 rounded-sm flex items-center justify-center gap-2 text-sm font-medium transition-all duration-400"
                  style={{
                    background: study.fisier ? '#00FFD1' : 'rgba(255, 255, 255, 0.1)',
                    color: study.fisier ? '#000000' : '#FFFFFF',
                    border: `1px solid ${study.fisier ? '#00FFD1' : 'rgba(255, 255, 255, 0.2)'}`
                  }}
                >
                  {study.fisier ? (
                    <>
                      <Download size={16} />
                      Descarcă PDF
                    </>
                  ) : (
                    <>
                      <FileText size={16} />
                      Disponibil în curând
                    </>
                  )}
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center p-12 rounded-sm" style={{
          background: '#000000',
          border: '1px solid rgba(0, 255, 209, 0.3)'
        }}>
          <h3 className="heading-2 mb-4" style={{ color: '#FFFFFF' }}>
            Ai nevoie de un studiu personalizat?
          </h3>
          <p className="body-medium mb-6" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Elaborăm strategii și studii de fezabilitate adaptate nevoilor tale
          </p>
          <a href="#contact" className="btn-primary inline-flex items-center gap-2">
            Solicită Ofertă
            <ExternalLink size={18} />
          </a>
        </div>

      </div>
    </section>
  );
};

export default CaseStudies;
