const { Pool } = require('pg');
require('dotenv').config();

// Default PostgreSQL connection configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/crowdfunding_db',
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
  connectionTimeoutMillis: 2000,
});

// Fallback in-memory store if PostgreSQL server is not currently reachable
let isPostgresConnected = false;

const memoryStore = {
  programs: [
    {
      id: 1,
      title: 'Education to Every Child',
      category: 'Education',
      description: 'Providing quality education, school supplies, textbooks, and mentoring to underprivileged children across underserved rural communities.',
      goal_amount: 9845.00,
      raised_amount: 6420.00,
      image_url: '/images/programs/1.jpg',
      featured: true,
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      title: 'Make Life Easier for Them',
      category: 'Healthcare & Welfare',
      description: 'Distributing emergency healthcare kits, nutritious food packages, and winter clothing to vulnerable families in need.',
      goal_amount: 9845.00,
      raised_amount: 5200.00,
      image_url: '/images/programs/2.jpg',
      featured: true,
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      title: 'Dedicating to Helping Kids',
      category: 'Child Welfare',
      description: 'Rehabilitation, psychological support, and safe shelter homes for abandoned and vulnerable children.',
      goal_amount: 9845.00,
      raised_amount: 7890.00,
      image_url: '/images/programs/3.jpg',
      featured: true,
      created_at: new Date().toISOString()
    },
    {
      id: 4,
      title: 'Clean Water for Communities',
      category: 'Sanitation & Health',
      description: 'Installing solar-powered clean water filtration plants and sanitization wells in water-scarce villages.',
      goal_amount: 9845.00,
      raised_amount: 4310.00,
      image_url: '/images/programs/4.jpg',
      featured: true,
      created_at: new Date().toISOString()
    },
    {
      id: 5,
      title: 'Higher Education Scholarships',
      category: 'Education',
      description: 'Financial grants and sponsorships for talented high school graduates from low-income backgrounds pursuing university degrees.',
      goal_amount: 15000.00,
      raised_amount: 9850.00,
      image_url: '/images/gallery/3.jpg',
      featured: false,
      created_at: new Date().toISOString()
    },
    {
      id: 6,
      title: 'Skill Building & Vocational Training',
      category: 'Empowerment',
      description: 'Empowering youth and young mothers with computer literacy, vocational crafts, and job placement assistance.',
      goal_amount: 12000.00,
      raised_amount: 8100.00,
      image_url: '/images/gallery/5.jpg',
      featured: false,
      created_at: new Date().toISOString()
    }
  ],
  donations: [
    {
      id: 1,
      program_id: 1,
      donor_name: 'Ananya Sharma',
      donor_email: 'ananya@example.com',
      amount: 150.00,
      payment_method: 'Card',
      message: 'Keep up the inspiring work for child education!',
      created_at: new Date(Date.now() - 3600000 * 24).toISOString()
    },
    {
      id: 2,
      program_id: 3,
      donor_name: 'Rahul Verma',
      donor_email: 'rahul.v@example.com',
      amount: 250.00,
      payment_method: 'UPI',
      message: 'For the shelter and medical assistance.',
      created_at: new Date(Date.now() - 3600000 * 12).toISOString()
    }
  ],
  volunteers: [],
  adoption_inquiries: [],
  subscribers: []
};

// Check PostgreSQL connection on startup
(async () => {
  try {
    const client = await pool.connect();
    isPostgresConnected = true;
    console.log('✅ Connected to PostgreSQL database successfully.');
    client.release();
  } catch (err) {
    console.warn('⚠️  PostgreSQL server is not reachable locally. Running with active in-memory database store with full seed data for seamless testing.');
    isPostgresConnected = false;
  }
})();

module.exports = {
  pool,
  isPostgresConnected: () => isPostgresConnected,
  memoryStore,
  query: async (text, params) => {
    if (isPostgresConnected) {
      return pool.query(text, params);
    }
    throw new Error('Postgres not connected');
  }
};

