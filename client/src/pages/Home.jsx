import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, GraduationCap, Droplets, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { api } from '../services/api';

export default function Home({ onOpenDonate }) {
  const [stats, setStats] = useState({
    totalRaised: 41770,
    totalGoal: 66380,
    totalDonors: 486,
    activeInitiatives: 6,
    volunteersCount: 74
  });
  const [programs, setPrograms] = useState([]);
  const [recentDonations, setRecentDonations] = useState([]);

  useEffect(() => {
    api.getStats().then(setStats);
    api.getPrograms({ featured: 'true' }).then(setPrograms);
    api.getRecentDonations().then(setRecentDonations);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <span className="hero-badge">
              <Sparkles size={14} /> NGO & Social Cause Initiative
            </span>
            <h1 className="hero-title">
              Together We Can <span>Save Lives</span> & Build Futures
            </h1>
            <p className="hero-description">
              Saving lives often requires collective effort and collaboration. Whether through supporting education,
              providing clean water, promoting public healthcare, or volunteering hands-on, our community platform empowers
              everyone to create measurable social impact.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => onOpenDonate()}>
                <Heart size={18} fill="white" /> Donate to a Cause
              </button>
              <Link to="/programs" className="btn btn-white">
                Explore Programs <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Ribbon */}
      <section className="stats-ribbon">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">${stats.totalRaised.toLocaleString()}</div>
              <div className="stat-label">Total Funds Raised</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{stats.totalDonors}+</div>
              <div className="stat-label">Public Contributors</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{stats.activeInitiatives}</div>
              <div className="stat-label">Active Social Initiatives</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{stats.volunteersCount}+</div>
              <div className="stat-label">Registered Volunteers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Action Pillars (About Preview) */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">How You Can Help</span>
            <h2 className="section-title">Pillars of Collective Impact</h2>
            <p className="section-subtitle">
              Every initiative is powered by community champions dedicated to creating sustainable opportunity.
            </p>
          </div>

          <div className="pillars-grid">
            <div className="pillar-box">
              <div className="pillar-icon-box">
                <Heart size={32} />
              </div>
              <h3 className="pillar-title">Give Donation</h3>
              <p className="pillar-desc">
                Together, we have the power to create lasting change. Support poverty alleviation, child medical care,
                and emergency relief projects worldwide.
              </p>
              <button className="btn btn-primary" onClick={() => onOpenDonate()}>
                Donate Now
              </button>
            </div>

            <div className="pillar-box">
              <div className="pillar-icon-box" style={{ background: '#fef3c7', color: '#d97706' }}>
                <Users size={32} />
              </div>
              <h3 className="pillar-title">Become a Volunteer</h3>
              <p className="pillar-desc">
                Engage directly in event coordination, digital outreach, or grassroots field projects.
                Lend your skills to empower local communities.
              </p>
              <Link to="/join-us" className="btn btn-secondary">
                Join As Volunteer
              </Link>
            </div>

            <div className="pillar-box">
              <div className="pillar-icon-box" style={{ background: '#e0e7ff', color: '#4338ca' }}>
                <GraduationCap size={32} />
              </div>
              <h3 className="pillar-title">Give Scholarship</h3>
              <p className="pillar-desc">
                We believe in the transformative power of education. Sponsor textbooks, tuition, and mentorship
                for gifted children in marginalized regions.
              </p>
              <Link to="/education" className="btn btn-outline">
                Sponsor a Student
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="section" style={{ background: '#f1f5f9' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Ongoing Programs</span>
            <h2 className="section-title">Featured Social Initiatives</h2>
            <p className="section-subtitle">
              Transparent, measurable crowdfunding campaigns addressing urgent humanitarian challenges.
            </p>
          </div>

          <div className="cards-grid">
            {programs.slice(0, 3).map((item) => {
              const percent = Math.min(100, Math.round((item.raised_amount / item.goal_amount) * 100));
              return (
                <div key={item.id} className="card">
                  <div className="card-img-wrapper">
                    <img src={item.image_url || '/images/programs/1.jpg'} alt={item.title} className="card-img" />
                    <span className="card-badge">{item.category}</span>
                  </div>
                  <div className="card-body">
                    <h3 className="card-title">{item.title}</h3>
                    <p className="card-desc">{item.description}</p>

                    <div className="progress-container">
                      <div className="progress-info">
                        <span className="raised">${Number(item.raised_amount).toLocaleString()} Raised</span>
                        <span style={{ color: '#64748b' }}>Goal: ${Number(item.goal_amount).toLocaleString()}</span>
                      </div>
                      <div className="progress-bar-bg">
                        <div className="progress-bar-fill" style={{ width: `${percent}%` }}></div>
                      </div>
                      <div style={{ textAlign: 'right', fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                        {percent}% Funded
                      </div>
                    </div>

                    <button
                      className="btn btn-primary"
                      style={{ width: '100%' }}
                      onClick={() => onOpenDonate(item.id)}
                    >
                      <Heart size={16} fill="white" /> Support This Cause
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/programs" className="btn btn-outline" style={{ background: '#fff' }}>
              View All 6 Active Programs <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Video & Education Spotlight */}
      <section className="video-section">
        <div className="video-bg-container">
          <video autoPlay muted loop playsInline>
            <source src="/video/childrens.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="container">
          <div className="video-content">
            <span className="hero-badge" style={{ background: 'rgba(5, 150, 105, 0.4)' }}>
              Education Is The Foundation
            </span>
            <h2 style={{ fontSize: '3rem', color: '#fff', marginBottom: '20px' }}>
              Education is Essential for a <em>Better Future</em>
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '1.15rem', lineHeight: '1.8', marginBottom: '32px' }}>
              We firmly believe that education is the cornerstone of lasting societal progress.
              The transformative power of learning fuels innovation, dismantles generational cycles of poverty,
              and empowers young minds to shape their own destiny.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link to="/education" className="btn btn-primary">
                Explore Education Programs
              </Link>
              <Link to="/gallery" className="btn btn-outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}>
                View Field Gallery
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Live Recent Supporter Feed */}
      {recentDonations.length > 0 && (
        <section className="section" style={{ padding: '60px 0', background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem' }}>Recent Community Contributions</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Real-time updates recorded across all initiatives</p>
              </div>
              <button className="btn btn-outline" onClick={() => onOpenDonate()} style={{ padding: '8px 18px', fontSize: '0.9rem' }}>
                Join the Donor Wall
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              {recentDonations.slice(0, 4).map((d) => (
                <div key={d.id} style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <strong style={{ color: '#0f172a' }}>{d.donor_name}</strong>
                    <span style={{ color: '#059669', fontWeight: '700', fontSize: '1rem' }}>+${Number(d.amount).toFixed(0)}</span>
                  </div>
                  <p style={{ color: '#64748b', fontSize: '0.85rem' }}>{d.program_title || 'General Fund'}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Join & Adopt CTA */}
      <section className="section" style={{ background: 'linear-gradient(135deg, #065f46 0%, #047857 100%)', color: '#fff' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '720px' }}>
          <h2 style={{ color: '#fff', fontSize: '2.75rem', marginBottom: '18px' }}>
            Adopt a Child & <span>Save Lives</span>
          </h2>
          <p style={{ color: '#d1fae5', fontSize: '1.15rem', lineHeight: '1.7', marginBottom: '36px' }}>
            We believe in the extraordinary power of adoption and child guardianship—a journey that permanently
            transforms the trajectory of a young life and delivers warmth, security, and hope.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/join-us" className="btn btn-white" style={{ fontWeight: '700' }}>
              Join Our Volunteer Network
            </Link>
            <Link to="/join-us?type=adopt" className="btn btn-secondary">
              Child Adoption Inquiry
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

