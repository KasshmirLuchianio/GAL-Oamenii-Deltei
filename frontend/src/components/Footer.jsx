import React from 'react';
import { MapPin, Phone, Mail, Facebook, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: '#000000', borderTop: '1px solid rgba(255, 255, 255, 0.15)' }}>
      <div className="dark-content-container py-16">
        
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Company Info */}
          <div>
            <div className="text-2xl font-semibold mb-4" style={{ color: '#00FFD1' }}>
              GAL Oamenii Deltei
            </div>
            <p className="body-small mb-6" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Consultanță specializată pentru accesarea fondurilor europene LEADER și dezvoltare rurală durabilă în Delta Dunării.
            </p>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-sm flex items-center justify-center transition-all duration-300"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#FFFFFF'
                }}
              >
                <Facebook size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-sm flex items-center justify-center transition-all duration-300"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#FFFFFF'
                }}
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-sm flex items-center justify-center transition-all duration-300"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#FFFFFF'
                }}
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="heading-3 mb-4" style={{ color: '#FFFFFF' }}>
              Navigare Rapidă
            </h4>
            <ul className="space-y-3">
              {['Acasă', 'Servicii', 'Programări', 'Testimoniale', 'Case Studies', 'Blog'].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase()}`}
                    className="body-small transition-colors duration-300 hover:text-[#00FFD1]"
                    style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="heading-3 mb-4" style={{ color: '#FFFFFF' }}>
              Servicii
            </h4>
            <ul className="space-y-3">
              {[
                'Strategii Dezvoltare',
                'Accesare Fonduri',
                'Planuri Afaceri',
                'Implementare Proiecte',
                'Brand & Marketing',
                'Cooperare Teritorială'
              ].map((serviciu) => (
                <li key={serviciu}>
                  <a 
                    href="#servicii"
                    className="body-small transition-colors duration-300 hover:text-[#00FFD1]"
                    style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                  >
                    {serviciu}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="heading-3 mb-4" style={{ color: '#FFFFFF' }}>
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} style={{ color: '#00FFD1', marginTop: '2px' }} />
                <span className="body-small" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Județul Tulcea<br />Delta Dunării, România
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} style={{ color: '#00FFD1' }} />
                <a 
                  href="tel:+40740123456"
                  className="body-small transition-colors duration-300 hover:text-[#00FFD1]"
                  style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                >
                  +40 740 123 456
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} style={{ color: '#00FFD1' }} />
                <a 
                  href="mailto:office@galoameniideltei.ro"
                  className="body-small transition-colors duration-300 hover:text-[#00FFD1]"
                  style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                >
                  office@galoameniideltei.ro
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.15)' }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="body-small" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              © {currentYear} GAL Oamenii Deltei. Toate drepturile rezervate.
            </p>
            <div className="flex gap-6">
              <a 
                href="#"
                className="body-small transition-colors duration-300 hover:text-[#00FFD1]"
                style={{ color: 'rgba(255, 255, 255, 0.6)' }}
              >
                Politică Confidențialitate
              </a>
              <a 
                href="#"
                className="body-small transition-colors duration-300 hover:text-[#00FFD1]"
                style={{ color: 'rgba(255, 255, 255, 0.6)' }}
              >
                Termeni și Condiții
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
