import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Eye, Award, CheckCircle2, HeartHandshake, Users, Globe2, ShieldCheck } from 'lucide-react';

export default function About({ onOpenDonate }) {
  return (
    <div>
      {/* Header Banner */}
      <section style={{ background: '#0f172a', color: '#fff', padding: '80px 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <span className="section-tag" style={{ color: '#34d399' }}>Who We Are</span>
          <h1 style={{ color: '#fff', fontSize: '3rem', marginBottom: '20px' }}>
            Empowering Grassroots Change Through Transparent Crowdfunding
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.15rem', lineHeight: '1.7' }}>
            Welcome to the Crowd Funding & Social Awareness Platform. We believe in the power of community,
            collaborative generosity, and full transparency to make measurable differences in lives and causes that matter most.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            <div className="form-card" style={{ borderLeft: '4px solid #059669' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <div style={{ background: '#ecfdf5', color: '#059669', padding: '12px', borderRadius: '12px' }}>
                  <Target size={28} />
                </div>
                <h3 style={{ fontSize: '1.5rem' }}>Our Mission</h3>
              </div>
              <p style={{ color: '#64748b', lineHeight: '1.8' }}>
                To democratize philanthropic support by connecting passionate individuals with high-impact initiatives in
                education, child protection, disaster recovery, and community healthcare. Every dollar is tracked directly
                from donor to recipient.
              </p>
            </div>

            <div className="form-card" style={{ borderLeft: '4px solid #f59e0b' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <div style={{ background: '#fef3c7', color: '#d97706', padding: '12px', borderRadius: '12px' }}>
                  <Eye size={28} />
                </div>
                <h3 style={{ fontSize: '1.5rem' }}>Our Vision</h3>
              </div>
              <p style={{ color: '#64748b', lineHeight: '1.8' }}>
                A world where socioeconomic barriers do not limit human potential. We envision self-sustaining
                neighborhoods where children receive exemplary schooling, families have clean water and nourishment,
                and vulnerable youth find secure, loving guardianship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="section" style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Core Tenets</span>
            <h2 className="section-title">Why Our Platform Is Different</h2>
            <p className="section-subtitle">
              Engineered with modern full-stack technologies to deliver end-to-end accountability.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            <div style={{ background: '#fff', padding: '28px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
              <ShieldCheck size={32} style={{ color: '#059669', marginBottom: '16px' }} />
              <h4 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>100% Fund Transparency</h4>
              <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
                All donations are committed via transactional PostgreSQL records, allowing donors to observe campaign progress in real-time.
              </p>
            </div>

            <div style={{ background: '#fff', padding: '28px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
              <Users size={32} style={{ color: '#059669', marginBottom: '16px' }} />
              <h4 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Community-Led Action</h4>
              <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
                Programs are curated in partnership with on-ground local volunteers who understand the cultural and economic nuances.
              </p>
            </div>

            <div style={{ background: '#fff', padding: '28px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
              <Award size={32} style={{ color: '#059669', marginBottom: '16px' }} />
              <h4 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Audited & Verified</h4>
              <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
                Every campaign undergoes thorough verification before onboarding, ensuring legitimate delivery of resources and services.
              </p>
            </div>

            <div style={{ background: '#fff', padding: '28px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
              <Globe2 size={32} style={{ color: '#059669', marginBottom: '16px' }} />
              <h4 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Multi-Regional Reach</h4>
              <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
                Expanding support systems across Punjab, northern rural sectors, and pan-national education initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Project Team */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Engineering & Platform Team</span>
            <h2 className="section-title">The People Behind the Platform</h2>
            <p className="section-subtitle">
              Designed and built as part of the CSE326 Capstone & Social Awareness Initiative.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px', maxWidth: '960px', margin: '0 auto' }}>
            <div className="card" style={{ textAlign: 'center', padding: '32px 24px' }}>
              <div style={{ width: '88px', height: '88px', borderRadius: '50%', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', fontSize: '1.8rem', fontWeight: '800' }}>
                VK
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '4px' }}>Vaibhav Kumar</h3>
              <p style={{ color: '#059669', fontWeight: '600', fontSize: '0.9rem', marginBottom: '12px' }}>Full-Stack Developer & Lead</p>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '16px' }}>
                Engineered the React.js frontend architecture, Node/Express REST APIs, and database transactions.
              </p>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                Reg: 12308868 | Roll: RK23NTA16
              </div>
            </div>

            <div className="card" style={{ textAlign: 'center', padding: '32px 24px' }}>
              <div style={{ width: '88px', height: '88px', borderRadius: '50%', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', fontSize: '1.8rem', fontWeight: '800' }}>
                K
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '4px' }}>Khushi</h3>
              <p style={{ color: '#d97706', fontWeight: '600', fontSize: '0.9rem', marginBottom: '12px' }}>Content & Portfolio Research</p>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '16px' }}>
                Researched social impact case studies, campaign content structure, and portfolio documentation.
              </p>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                Reg: 12323630 | Roll: RK23NTA23
              </div>
            </div>

            <div className="card" style={{ textAlign: 'center', padding: '32px 24px' }}>
              <div style={{ width: '88px', height: '88px', borderRadius: '50%', background: '#e0e7ff', color: '#4338ca', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', fontSize: '1.8rem', fontWeight: '800' }}>
                I
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '4px' }}>Ishanth</h3>
              <p style={{ color: '#4338ca', fontWeight: '600', fontSize: '0.9rem', marginBottom: '12px' }}>User Experience & Testing</p>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '16px' }}>
                Assisted in usability assessment, multi-page responsiveness, and community outreach scenarios.
              </p>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                Reg: 12303317 | Roll: 15
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Action Banner */}
      <section style={{ background: '#f1f5f9', padding: '60px 0', textAlign: 'center' }}>
        <div className="container">
          <h3 style={{ fontSize: '2rem', marginBottom: '14px' }}>Ready to Make a Difference?</h3>
          <p style={{ color: '#64748b', marginBottom: '24px', maxWidth: '580px', margin: '0 auto 24px auto' }}>
            Whether giving 1 hour of volunteer time or sponsoring a child's school term, your participation matters.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px' }}>
            <button className="btn btn-primary" onClick={() => onOpenDonate()}>
              Donate Today
            </button>
            <Link to="/join-us" className="btn btn-outline">
              Register as Volunteer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

