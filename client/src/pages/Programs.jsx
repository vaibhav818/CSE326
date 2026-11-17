import React, { useState, useEffect } from 'react';
import { Search, Heart, Filter, CheckCircle, ArrowUpDown } from 'lucide-react';
import { api } from '../services/api';

const CATEGORIES = [
  'All',
  'Education',
  'Healthcare & Welfare',
  'Child Welfare',
  'Sanitation & Health',
  'Empowerment'
];

export default function Programs({ onOpenDonate }) {
  const [programs, setPrograms] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getPrograms().then((data) => {
      setPrograms(data);
      setLoading(false);
    });
  }, []);

  const filteredPrograms = programs.filter((p) => {
    const matchesCat = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div>
      {/* Header */}
      <section style={{ background: '#0f172a', color: '#fff', padding: '70px 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <span className="section-tag" style={{ color: '#34d399' }}>Active Campaigns</span>
          <h1 style={{ color: '#fff', fontSize: '3rem', marginBottom: '18px' }}>
            Empower Ongoing Social Initiatives
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem' }}>
            Choose an initiative close to your heart. Every dollar is logged directly into our database
            with complete accountability and transparent allocation reports.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '24px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            {/* Category tabs */}
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    border: '1px solid',
                    borderColor: activeCategory === cat ? '#059669' : '#e2e8f0',
                    background: activeCategory === cat ? '#059669' : '#fff',
                    color: activeCategory === cat ? '#fff' : '#64748b',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div style={{ position: 'relative', minWidth: '280px' }}>
              <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="Search initiative..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 38px',
                  borderRadius: '9999px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Program Cards Grid */}
      <section className="section">
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}>
              <p>Loading active programs from database...</p>
            </div>
          ) : filteredPrograms.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}>
              <h3>No programs found matching your search.</h3>
              <p>Try selecting another category or clearing your search keywords.</p>
            </div>
          ) : (
            <div className="cards-grid">
              {filteredPrograms.map((item) => {
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
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748b', marginTop: '6px' }}>
                          <span>Target: ${(item.goal_amount - item.raised_amount > 0 ? (item.goal_amount - item.raised_amount).toLocaleString() : 0)} left</span>
                          <strong>{percent}%</strong>
                        </div>
                      </div>

                      <button
                        className="btn btn-primary"
                        style={{ width: '100%' }}
                        onClick={() => onOpenDonate(item.id)}
                      >
                        <Heart size={16} fill="white" /> Donate Now
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

