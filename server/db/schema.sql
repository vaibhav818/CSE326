-- Database Schema for Crowd Funding & Social Awareness Platform (PostgreSQL)

CREATE TABLE IF NOT EXISTS programs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    goal_amount NUMERIC(12, 2) NOT NULL DEFAULT 10000.00,
    raised_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    image_url VARCHAR(255),
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS donations (
    id SERIAL PRIMARY KEY,
    program_id INTEGER REFERENCES programs(id) ON DELETE SET NULL,
    donor_name VARCHAR(150) NOT NULL,
    donor_email VARCHAR(150) NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    payment_method VARCHAR(50) DEFAULT 'Card',
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS volunteers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(50),
    interest_area VARCHAR(100) NOT NULL,
    availability VARCHAR(100),
    message TEXT,
    status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS adoption_inquiries (
    id SERIAL PRIMARY KEY,
    guardian_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    address TEXT,
    notes TEXT,
    status VARCHAR(50) DEFAULT 'Under Review',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS subscribers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed initial initiatives
INSERT INTO programs (title, category, description, goal_amount, raised_amount, image_url, featured)
VALUES 
('Education to Every Child', 'Education', 'Providing quality education, school supplies, textbooks, and mentoring to underprivileged children across underserved rural communities.', 9845.00, 6420.00, '/images/programs/1.jpg', true),
('Make Life Easier for Them', 'Healthcare & Welfare', 'Distributing emergency healthcare kits, nutritious food packages, and winter clothing to vulnerable families in need.', 9845.00, 5200.00, '/images/programs/2.jpg', true),
('Dedicating to Helping Kids', 'Child Welfare', 'Rehabilitation, psychological support, and safe shelter homes for abandoned and vulnerable children.', 9845.00, 7890.00, '/images/programs/3.jpg', true),
('Clean Water for Communities', 'Sanitation & Health', 'Installing solar-powered clean water filtration plants and sanitization wells in water-scarce villages.', 9845.00, 4310.00, '/images/programs/4.jpg', true),
('Higher Education Scholarships', 'Education', 'Financial grants and sponsorships for talented high school graduates from low-income backgrounds pursuing university degrees.', 15000.00, 9850.00, '/images/gallery/3.jpg', false),
('Skill Building & Vocational Training', 'Empowerment', 'Empowering youth and young mothers with computer literacy, vocational crafts, and job placement assistance.', 12000.00, 8100.00, '/images/gallery/5.jpg', false)
ON CONFLICT DO NOTHING;

