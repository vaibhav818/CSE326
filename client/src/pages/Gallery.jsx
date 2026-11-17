import React, { useState } from 'react';
import { X, ZoomIn, Heart } from 'lucide-react';

const GALLERY_ITEMS = [
  { id: 1, src: '/images/gallery/1.jpg', title: 'Rural Classroom Distribution', category: 'Education', desc: 'Distributing new textbooks and writing materials to eager primary school students.' },
  { id: 2, src: '/images/gallery/2.jpg', title: 'Nutrition & Midday Meals', category: 'Healthcare', desc: 'Preparing fresh hot meals packed with essential vitamins for growing children.' },
  { id: 3, src: '/images/gallery/3.jpg', title: 'Digital Literacy Session', category: 'Education', desc: 'Introducing high schoolers to interactive computer programming and internet skills.' },
  { id: 4, src: '/images/gallery/4.jpg', title: 'Community Water Filtration', category: 'Sanitation', desc: 'Villagers celebrating the inauguration of a clean, solar-driven filtration well.' },
  { id: 5, src: '/images/gallery/5.jpg', title: 'Vocational Sewing Workshop', category: 'Empowerment', desc: 'Equipping mothers with sewing techniques and tailoring machines for financial independence.' },
  { id: 6, src: '/images/gallery/6.jpg', title: 'Preventive Health Camp', category: 'Healthcare', desc: 'Volunteer pediatricians and nurses conducting free diagnostic checkups and vaccinations.' },
  { id: 7, src: '/images/gallery/7.jpg', title: 'Youth Sports & Leadership', category: 'Community', desc: 'Afternoon soccer games and team-building camps fostering camaraderie and confidence.' },
  { id: 8, src: '/images/gallery/8.jpg', title: 'Art & Cultural Expression', category: 'Education', desc: 'Encouraging creativity, painting, and music among underprivileged youth centers.' },
];

export default function Gallery({ onOpenDonate }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [filter, setFilter] = useState('All');

  const filteredItems = filter === 'All' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === filter);

  return (
    <div>
      {/* Header */}
      <section style={{ background: '#0f172a', color: '#fff', padding: '70px 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <span className="section-tag" style={{ color: '#34d399' }}>Visual Stories</span>
          <h1 style={{ color: '#fff', fontSize: '3rem', marginBottom: '18px' }}>
            Moments of Hope & Resilience
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem' }}>
            Every photograph captures the tangible impact of public contributions in our beneficiary communities.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '20px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {['All', 'Education', 'Healthcare', 'Sanitation', 'Empowerment', 'Community'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              style={{
                padding: '8px 18px',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: '600',
                border: '1px solid',
                borderColor: filter === tab ? '#059669' : '#e2e8f0',
                background: filter === tab ? '#059669' : '#fff',
                color: filter === tab ? '#fff' : '#64748b',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section">
        <div className="container">
          <div className="gallery-grid">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="gallery-item"
                onClick={() => setSelectedPhoto(item)}
              >
                <img src={item.src} alt={item.title} loading="lazy" />
                <div className="gallery-overlay">
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: '700', textTransform: 'uppercase' }}>
                      {item.category}
                    </span>
                    <div className="gallery-title">{item.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="modal-overlay" onClick={() => setSelectedPhoto(null)}>
          <div 
            className="modal-content" 
            style={{ maxWidth: '780px', overflow: 'hidden' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ position: 'relative', background: '#000' }}>
              <img 
                src={selectedPhoto.src} 
                alt={selectedPhoto.title} 
                style={{ width: '100%', maxHeight: '480px', objectFit: 'contain' }}
              />
              <button 
                onClick={() => setSelectedPhoto(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(0,0,0,0.6)',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={20} />
              </button>
            </div>
            <div style={{ padding: '24px' }}>
              <span style={{ color: '#059669', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                {selectedPhoto.category}
              </span>
              <h3 style={{ fontSize: '1.5rem', margin: '6px 0 10px 0' }}>{selectedPhoto.title}</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>
                {selectedPhoto.desc}
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button className="btn btn-outline" onClick={() => setSelectedPhoto(null)}>
                  Close
                </button>
                <button 
                  className="btn btn-primary" 
                  onClick={() => { setSelectedPhoto(null); onOpenDonate(); }}
                >
                  <Heart size={16} fill="white" /> Support This Work
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

