import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Acasă', href: '#home' },
    { name: 'Servicii', href: '#servicii' },
    { name: 'Programări', href: '#calendar' },
    { name: 'Testimoniale', href: '#testimoniale' },
    { name: 'Case Studies', href: '#case-studies' },
    { name: 'Blog', href: '#blog' }
  ];

  return (
    <header className="dark-header">
      <div className="flex items-center justify-between w-full">
        <Link to="/" className="flex items-center gap-3">
          <div className="text-2xl font-semibold" style={{ color: '#00FFD1' }}>
            GAL Oamenii Deltei
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="dark-nav-link"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-primary"
          >
            Contact
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-black border-t border-white/25 py-6 px-8 z-50">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white/70 hover:text-white text-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="btn-primary mt-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
