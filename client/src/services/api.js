const API_BASE = '/api';

export const api = {
  // Programs
  async getPrograms(params = {}) {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE}/programs${query ? `?${query}` : ''}`);
      if (!res.ok) throw new Error('Failed to fetch programs');
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('API fetch failed, utilizing fallback data:', err);
      return [
        {
          id: 1,
          title: 'Education to Every Child',
          category: 'Education',
          description: 'Providing quality education, school supplies, textbooks, and mentoring to underprivileged children across underserved rural communities.',
          goal_amount: 9845.00,
          raised_amount: 6420.00,
          image_url: '/images/programs/1.jpg',
          featured: true
        },
        {
          id: 2,
          title: 'Make Life Easier for Them',
          category: 'Healthcare & Welfare',
          description: 'Distributing emergency healthcare kits, nutritious food packages, and winter clothing to vulnerable families in need.',
          goal_amount: 9845.00,
          raised_amount: 5200.00,
          image_url: '/images/programs/2.jpg',
          featured: true
        },
        {
          id: 3,
          title: 'Dedicating to Helping Kids',
          category: 'Child Welfare',
          description: 'Rehabilitation, psychological support, and safe shelter homes for abandoned and vulnerable children.',
          goal_amount: 9845.00,
          raised_amount: 7890.00,
          image_url: '/images/programs/3.jpg',
          featured: true
        },
        {
          id: 4,
          title: 'Clean Water for Communities',
          category: 'Sanitation & Health',
          description: 'Installing solar-powered clean water filtration plants and sanitization wells in water-scarce villages.',
          goal_amount: 9845.00,
          raised_amount: 4310.00,
          image_url: '/images/programs/4.jpg',
          featured: true
        },
        {
          id: 5,
          title: 'Higher Education Scholarships',
          category: 'Education',
          description: 'Financial grants and sponsorships for talented high school graduates from low-income backgrounds pursuing university degrees.',
          goal_amount: 15000.00,
          raised_amount: 9850.00,
          image_url: '/images/gallery/3.jpg',
          featured: false
        },
        {
          id: 6,
          title: 'Skill Building & Vocational Training',
          category: 'Empowerment',
          description: 'Empowering youth and young mothers with computer literacy, vocational crafts, and job placement assistance.',
          goal_amount: 12000.00,
          raised_amount: 8100.00,
          image_url: '/images/gallery/5.jpg',
          featured: false
        }
      ];
    }
  },

  async getStats() {
    try {
      const res = await fetch(`${API_BASE}/programs/stats`);
      if (!res.ok) throw new Error('Failed to fetch stats');
      const data = await res.json();
      return data.data;
    } catch (err) {
      return {
        totalRaised: 41770,
        totalGoal: 66380,
        totalDonors: 486,
        activeInitiatives: 6,
        volunteersCount: 74
      };
    }
  },

  // Donations
  async createDonation(payload) {
    const res = await fetch(`${API_BASE}/donations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  async getRecentDonations() {
    try {
      const res = await fetch(`${API_BASE}/donations/recent`);
      if (!res.ok) throw new Error('Failed to fetch recent donations');
      const data = await res.json();
      return data.data;
    } catch {
      return [
        { id: 1, donor_name: 'Ananya Sharma', amount: 150, program_title: 'Education to Every Child', created_at: new Date().toISOString() },
        { id: 2, donor_name: 'Rahul Verma', amount: 250, program_title: 'Dedicating to Helping Kids', created_at: new Date().toISOString() }
      ];
    }
  },

  // Volunteer & Adoption
  async registerVolunteer(payload) {
    const res = await fetch(`${API_BASE}/volunteers/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  async submitAdoptionInquiry(payload) {
    const res = await fetch(`${API_BASE}/volunteers/adopt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  // Newsletter
  async subscribeNewsletter(email) {
    const res = await fetch(`${API_BASE}/feedback/newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    return res.json();
  }
};

