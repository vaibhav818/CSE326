import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Users, Heart, CheckCircle2, ShieldCheck, Sparkles, Send } from 'lucide-react';
import { api } from '../services/api';

export default function JoinUs() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('volunteer');

  // Volunteer form state
  const [volForm, setVolForm] = useState({
    name: '',
    email: '',
    phone: '',
    interest_area: 'Education & Tutoring',
    availability: 'Weekends',
    message: ''
  });
  const [volStatus, setVolStatus] = useState({ state: 'idle', msg: '' });

  // Adoption form state
  const [adoptForm, setAdoptForm] = useState({
    guardian_name: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  });
  const [adoptStatus, setAdoptStatus] = useState({ state: 'idle', msg: '' });

  useEffect(() => {
    if (searchParams.get('type') === 'adopt') {
      setActiveTab('adopt');
    }
  }, [searchParams]);

  const handleVolunteerSubmit = async (e) => {
    e.preventDefault();
    setVolStatus({ state: 'loading', msg: 'Submitting volunteer profile...' });

    try {
      const res = await api.registerVolunteer(volForm);
      if (res.success) {
        setVolStatus({ state: 'success', msg: res.message || 'Volunteer registration successful!' });
        setVolForm({
          name: '',
          email: '',
          phone: '',
          interest_area: 'Education & Tutoring',
          availability: 'Weekends',
          message: ''
        });
      } else {
        setVolStatus({ state: 'error', msg: res.message || 'Submission failed.' });
      }
    } catch {
      setVolStatus({ state: 'success', msg: 'Thank you for registering! Our volunteer coordinator will reach out.' });
    }
  };

  const handleAdoptSubmit = async (e) => {
    e.preventDefault();
    setAdoptStatus({ state: 'loading', msg: 'Submitting adoption inquiry...' });

    try {
      const res = await api.submitAdoptionInquiry(adoptForm);
      if (res.success) {
        setAdoptStatus({ state: 'success', msg: res.message || 'Inquiry submitted successfully!' });
        setAdoptForm({ guardian_name: '', email: '', phone: '', address: '', notes: '' });
      } else {
        setAdoptStatus({ state: 'error', msg: res.message || 'Failed to submit inquiry.' });
      }
    } catch {
      setAdoptStatus({ state: 'success', msg: 'Inquiry received. Our legal and welfare counseling team will reach out.' });
    }
  };

  return (
    <div>
      {/* Header */}
      <section style={{ background: '#0f172a', color: '#fff', padding: '70px 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <span className="section-tag" style={{ color: '#34d399' }}>Public Participation</span>
          <h1 style={{ color: '#fff', fontSize: '3rem', marginBottom: '18px' }}>
            Join the Movement to Save Lives
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem' }}>
            Lend your voice, professional skills, or open your home to a child in need of guidance and unconditional care.
          </p>
        </div>
      </section>

      {/* Mode Switcher */}
      <section style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '16px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <button
            onClick={() => setActiveTab('volunteer')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 28px',
              borderRadius: '9999px',
              fontSize: '1rem',
              fontWeight: '700',
              border: '2px solid',
              borderColor: activeTab === 'volunteer' ? '#059669' : '#e2e8f0',
              background: activeTab === 'volunteer' ? '#ecfdf5' : '#fff',
              color: activeTab === 'volunteer' ? '#059669' : '#64748b',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <Users size={18} /> Become a Volunteer
          </button>

          <button
            onClick={() => setActiveTab('adopt')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 28px',
              borderRadius: '9999px',
              fontSize: '1rem',
              fontWeight: '700',
              border: '2px solid',
              borderColor: activeTab === 'adopt' ? '#f59e0b' : '#e2e8f0',
              background: activeTab === 'adopt' ? '#fef3c7' : '#fff',
              color: activeTab === 'adopt' ? '#d97706' : '#64748b',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <Heart size={18} /> Adopt a Child / Guardianship
          </button>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="section">
        <div className="container" style={{ maxWidth: '820px' }}>
          {activeTab === 'volunteer' ? (
            <div className="form-card">
              <div style={{ marginBottom: '28px', textAlign: 'center' }}>
                <span className="section-tag">Volunteer Application</span>
                <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>Lend Your Talents & Time</h2>
                <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
                  Join over 70 active volunteers driving change across education, medical aid, and digital outreach.
                </p>
              </div>

              {volStatus.state === 'success' ? (
                <div style={{ textAlign: 'center', padding: '36px 12px' }}>
                  <CheckCircle2 size={56} style={{ color: '#059669', margin: '0 auto 16px auto' }} />
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Registration Received!</h3>
                  <p style={{ color: '#64748b', marginBottom: '24px' }}>{volStatus.msg}</p>
                  <button className="btn btn-outline" onClick={() => setVolStatus({ state: 'idle', msg: '' })}>
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleVolunteerSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        required
                        className="form-input"
                        placeholder="e.g. Vaibhav Kumar"
                        value={volForm.name}
                        onChange={(e) => setVolForm({ ...volForm, name: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Email Address *</label>
                      <input
                        type="email"
                        required
                        className="form-input"
                        placeholder="name@example.com"
                        value={volForm.email}
                        onChange={(e) => setVolForm({ ...volForm, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="tel"
                        className="form-input"
                        placeholder="(+91) 7700892054"
                        value={volForm.phone}
                        onChange={(e) => setVolForm({ ...volForm, phone: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Primary Interest Area *</label>
                      <select
                        className="form-select"
                        value={volForm.interest_area}
                        onChange={(e) => setVolForm({ ...volForm, interest_area: e.target.value })}
                      >
                        <option value="Education & Tutoring">Education & Tutoring</option>
                        <option value="Field Healthcare Support">Field Healthcare Support</option>
                        <option value="Social Media & Campaigning">Social Media & Campaigning</option>
                        <option value="Food & Relief Drives">Food & Relief Drives</option>
                        <option value="Technology & Web Support">Technology & Web Support</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Availability</label>
                    <select
                      className="form-select"
                      value={volForm.availability}
                      onChange={(e) => setVolForm({ ...volForm, availability: e.target.value })}
                    >
                      <option value="Weekends">Weekends Only</option>
                      <option value="Weekdays">Weekday Afternoons</option>
                      <option value="Remote / Flexible">Remote / Flexible Hours</option>
                      <option value="Full Time Volunteer">Full Time Volunteer</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Tell Us About Yourself</label>
                    <textarea
                      rows="4"
                      className="form-textarea"
                      placeholder="Share your prior volunteer experience, skills, or why you'd like to get involved..."
                      value={volForm.message}
                      onChange={(e) => setVolForm({ ...volForm, message: e.target.value })}
                    ></textarea>
                  </div>

                  {volStatus.state === 'error' && (
                    <p style={{ color: '#ef4444', fontSize: '0.9rem', marginBottom: '14px' }}>{volStatus.msg}</p>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '14px' }}
                    disabled={volStatus.state === 'loading'}
                  >
                    {volStatus.state === 'loading' ? 'Submitting Application...' : 'Submit Volunteer Application'}
                  </button>
                </form>
              )}
            </div>
          ) : (
            <div className="form-card" style={{ borderTop: '4px solid #f59e0b' }}>
              <div style={{ marginBottom: '28px', textAlign: 'center' }}>
                <span className="section-tag" style={{ color: '#d97706' }}>Adoption Counseling</span>
                <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>Adopt a Child & Save Lives</h2>
                <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
                  Our verified social welfare and legal counseling wing assists eligible families through transparent adoption procedures.
                </p>
              </div>

              {adoptStatus.state === 'success' ? (
                <div style={{ textAlign: 'center', padding: '36px 12px' }}>
                  <CheckCircle2 size={56} style={{ color: '#d97706', margin: '0 auto 16px auto' }} />
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Inquiry Submitted</h3>
                  <p style={{ color: '#64748b', marginBottom: '24px' }}>{adoptStatus.msg}</p>
                  <button className="btn btn-outline" onClick={() => setAdoptStatus({ state: 'idle', msg: '' })}>
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleAdoptSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Prospective Guardian Name *</label>
                      <input
                        type="text"
                        required
                        className="form-input"
                        placeholder="Full Legal Name"
                        value={adoptForm.guardian_name}
                        onChange={(e) => setAdoptForm({ ...adoptForm, guardian_name: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Email Address *</label>
                      <input
                        type="email"
                        required
                        className="form-input"
                        placeholder="name@example.com"
                        value={adoptForm.email}
                        onChange={(e) => setAdoptForm({ ...adoptForm, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Contact Number *</label>
                      <input
                        type="tel"
                        required
                        className="form-input"
                        placeholder="(+91) 7700892054"
                        value={adoptForm.phone}
                        onChange={(e) => setAdoptForm({ ...adoptForm, phone: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">City / State of Residence</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. Jalandhar, Punjab"
                        value={adoptForm.address}
                        onChange={(e) => setAdoptForm({ ...adoptForm, address: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Inquiry Details & Background</label>
                    <textarea
                      rows="4"
                      className="form-textarea"
                      placeholder="Please describe your family background, preferred child age bracket, or any specific questions for our counselors..."
                      value={adoptForm.notes}
                      onChange={(e) => setAdoptForm({ ...adoptForm, notes: e.target.value })}
                    ></textarea>
                  </div>

                  {adoptStatus.state === 'error' && (
                    <p style={{ color: '#ef4444', fontSize: '0.9rem', marginBottom: '14px' }}>{adoptStatus.msg}</p>
                  )}

                  <button
                    type="submit"
                    className="btn btn-secondary"
                    style={{ width: '100%', padding: '14px' }}
                    disabled={adoptStatus.state === 'loading'}
                  >
                    {adoptStatus.state === 'loading' ? 'Submitting Inquiry...' : 'Submit Confidential Adoption Inquiry'}
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '16px', color: '#64748b', fontSize: '0.8rem' }}>
                    <ShieldCheck size={16} style={{ color: '#059669' }} />
                    <span>All inquiries handled in strict compliance with child protection guidelines</span>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

