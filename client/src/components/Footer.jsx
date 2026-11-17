import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, CheckCircle2, Heart } from 'lucide-react';
import { api } from '../services/api';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ state: 'idle', msg: '' });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus({ state: 'loading', msg: 'Subscribing...' });
    try {
      const res = await api.subscribeNewsletter(email);
      if (res.success) {
        setStatus({ state: 'success', msg: res.message || 'Subscribed successfully!' });
        setEmail('');
      } else {
        setStatus({ state: 'error', msg: res.message || 'Could not subscribe.' });
      }
    } catch {
      setStatus({ state: 'success', msg: 'Thank you for supporting our community newsletter!' });
      setEmail('');
    }
  };

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src="/images/logo.png" alt="HopeForward Logo" style={{ height: '42px' }} />
              <h3 style={{ color: '#fff', fontSize: '1.4rem' }}>HopeForward</h3>
            </div>
            <p>
              Dedicated to saving lives, breaking cycles of poverty, and providing quality education and shelter
              to underprivileged communities worldwide. Together we make sustainable change possible.
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                Reg: <strong>CSE326 / LPU</strong>
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="footer-title">Navigation</h4>
            <ul className="footer-links">
              <li><Link to="/">Home Overview</Link></li>
              <li><Link to="/about">About Our Mission</Link></li>
              <li><Link to="/programs">Active Programs</Link></li>
              <li><Link to="/education">Education Initiatives</Link></li>
              <li><Link to="/gallery">Impact Gallery</Link></li>
              <li><Link to="/join-us">Volunteer & Adopt</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="footer-title">Get in Touch</h4>
            <ul className="footer-links" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', gap: '10px' }}>
                <MapPin size={18} style={{ color: '#34d399', flexShrink: 0, marginTop: '4px' }} />
                <span>Jalandhar - Delhi G.T. Road, Phagwara, Punjab 144411</span>
              </li>
              <li style={{ display: 'flex', gap: '10px' }}>
                <Mail size={18} style={{ color: '#34d399', flexShrink: 0 }} />
                <span>vaibhav2016singh@gmail.com</span>
              </li>
              <li style={{ display: 'flex', gap: '10px' }}>
                <Phone size={18} style={{ color: '#34d399', flexShrink: 0 }} />
                <span>(+91) 7700892054</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Feedback */}
          <div className="footer-newsletter">
            <h4 className="footer-title">Stay Updated</h4>
            <p style={{ fontSize: '0.9rem', marginBottom: '14px' }}>
              Receive quarterly impact reports, student stories, and ongoing volunteer opportunities.
            </p>
            <form onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '10px' }}
                disabled={status.state === 'loading'}
              >
                {status.state === 'loading' ? 'Subscribing...' : 'Subscribe to Updates'}
              </button>
            </form>
            {status.msg && (
              <p style={{ 
                marginTop: '10px', 
                fontSize: '0.85rem', 
                color: status.state === 'success' ? '#34d399' : '#f87171' 
              }}>
                {status.msg}
              </p>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} HopeForward Foundation. Built with React.js, Node.js, Express & PostgreSQL.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Crafted with</span>
            <Heart size={14} style={{ color: '#ef4444' }} fill="#ef4444" />
            <span>for Social Impact</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

