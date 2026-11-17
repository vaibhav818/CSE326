import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Heart, Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar({ onOpenDonate }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMenu = () => setMobileOpen(false);

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="nav-brand" onClick={closeMenu}>
          <img src="/images/logo.png" alt="CrowdFunding NGO" className="nav-logo" />
          <span>HopeForward</span>
        </Link>

        <ul className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          <li>
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu} end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink to="/programs" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
              Programs
            </NavLink>
          </li>
          <li>
            <NavLink to="/education" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
              Education
            </NavLink>
          </li>
          <li>
            <NavLink to="/gallery" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
              Gallery
            </NavLink>
          </li>
          <li>
            <NavLink to="/join-us" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
              Join Us
            </NavLink>
          </li>
          {mobileOpen && (
            <li style={{ marginTop: '12px' }}>
              <button 
                className="nav-cta-btn" 
                style={{ display: 'inline-flex', width: '100%', justifyContent: 'center' }}
                onClick={() => { closeMenu(); onOpenDonate(); }}
              >
                <Heart size={16} fill="white" /> Donate Now
              </button>
            </li>
          )}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button className="nav-cta-btn" onClick={() => onOpenDonate()}>
            <Heart size={16} fill="white" /> Donate Now
          </button>

          <button 
            className="mobile-toggle" 
            onClick={() => setMobileOpen(!mobileOpen)} 
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>
    </nav>
  );
}

