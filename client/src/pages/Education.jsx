import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, Laptop, Award, CheckCircle, Heart, Sparkles } from 'lucide-react';

export default function Education({ onOpenDonate }) {
  return (
    <div>
      {/* Hero Banner */}
      <section style={{ background: '#064e3b', color: '#fff', padding: '80px 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          <span className="hero-badge" style={{ background: 'rgba(52, 211, 153, 0.2)', color: '#6ee7b7' }}>
            <GraduationCap size={16} /> Knowledge Transforms Generations
          </span>
          <h1 style={{ color: '#fff', fontSize: '3.25rem', marginBottom: '20px' }}>
            Education is Essential for a <em>Better Future</em>
          </h1>
          <p style={{ color: '#a7f3d0', fontSize: '1.2rem', lineHeight: '1.8' }}>
            We firmly believe that education is the cornerstone of human dignity and social mobility.
            The transformative power of learning goes far beyond individual growth; it sparks community resilience,
            fuels scientific innovation, and creates enduring economic independence.
          </p>
        </div>
      </section>

      {/* Video Feature Section */}
      <section className="section" style={{ background: '#f8fafc' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '48px', alignItems: 'center' }}>
            {/* Video Player */}
            <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-xl)', background: '#000' }}>
              <video 
                controls 
                autoPlay 
                muted 
                loop 
                playsInline 
                style={{ width: '100%', display: 'block', maxHeight: '420px', objectFit: 'cover' }}
              >
                <source src="/video/childrens.mp4" type="video/mp4" />
                Your browser does not support HTML5 video.
              </video>
            </div>

            {/* Video Story */}
            <div>
              <span className="section-tag">Ground Realities</span>
              <h2 style={{ fontSize: '2.4rem', marginBottom: '18px' }}>
                Inside Our Community Learning Centers
              </h2>
              <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '20px' }}>
                Watch our students in action. Over 1,200 children across rural districts previously lacked basic literacy materials,
                notebooks, and trained educators. Through the generosity of our supporters, we have built safe learning spaces equipped
                with certified mentors and digital tablets.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle size={20} style={{ color: '#059669', flexShrink: 0 }} />
                  <span style={{ fontWeight: 600 }}>Free textbooks, uniforms, and nutritious midday meals</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle size={20} style={{ color: '#059669', flexShrink: 0 }} />
                  <span style={{ fontWeight: 600 }}>STEM & Coding workshops for middle school students</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle size={20} style={{ color: '#059669', flexShrink: 0 }} />
                  <span style={{ fontWeight: 600 }}>100% girl-child retention and secondary school completion</span>
                </div>
              </div>

              <button className="btn btn-primary" onClick={() => onOpenDonate(1)}>
                <Heart size={16} fill="white" /> Sponsor Classroom Supplies
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Scholarship Tiers */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Direct Sponsorship</span>
            <h2 className="section-title">Educational Scholarship Tiers</h2>
            <p className="section-subtitle">
              Transparent packages covering tuition, supplies, and mentorship for one academic year.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
            {/* Tier 1 */}
            <div className="form-card" style={{ textAlign: 'center', borderTop: '4px solid #059669' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#059669', marginBottom: '6px' }}>$50</div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '10px' }}>Back-to-School Kit</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px' }}>
                Provides complete stationary, textbooks, backpack, and geometry kits for one student.
              </p>
              <button className="btn btn-outline" style={{ width: '100%' }} onClick={() => onOpenDonate(1)}>
                Donate $50
              </button>
            </div>

            {/* Tier 2 */}
            <div className="form-card" style={{ textAlign: 'center', borderTop: '4px solid #f59e0b', position: 'relative', transform: 'scale(1.02)', boxShadow: 'var(--shadow-xl)' }}>
              <span style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: '#f59e0b', color: '#fff', padding: '4px 14px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase' }}>
                Most Popular
              </span>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#d97706', marginBottom: '6px' }}>$150</div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '10px' }}>Full Term Tuition</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px' }}>
                Covers tuition fees, uniforms, exam fees, and after-school remedial tutoring for 6 months.
              </p>
              <button className="btn btn-secondary" style={{ width: '100%' }} onClick={() => onOpenDonate(1)}>
                Donate $150
              </button>
            </div>

            {/* Tier 3 */}
            <div className="form-card" style={{ textAlign: 'center', borderTop: '4px solid #4338ca' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#4338ca', marginBottom: '6px' }}>$500</div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '10px' }}>Annual Higher Education</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px' }}>
                Underwrites a comprehensive high school or college scholarship including digital device access.
              </p>
              <button className="btn btn-outline" style={{ width: '100%' }} onClick={() => onOpenDonate(5)}>
                Donate $500
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

