const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const programsRoutes = require('./routes/programs');
const donationsRoutes = require('./routes/donations');
const volunteersRoutes = require('./routes/volunteers');
const feedbackRoutes = require('./routes/feedback');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Static files (serves images/video for API fallback)
app.use('/images', express.static('../client/public/images'));
app.use('/video', express.static('../client/public/video'));

// API Routes
app.use('/api/programs', programsRoutes);
app.use('/api/donations', donationsRoutes);
app.use('/api/volunteers', volunteersRoutes);
app.use('/api/feedback', feedbackRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Crowd Funding & Social Awareness API',
    version: '1.0.0'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Crowd Funding Server running on http://localhost:${PORT}`);
});

