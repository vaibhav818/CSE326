const db = require('../config/db');

exports.subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    if (db.isPostgresConnected()) {
      await db.query(
        `INSERT INTO subscribers (email) VALUES ($1) ON CONFLICT (email) DO NOTHING`,
        [email.trim().toLowerCase()]
      );
      return res.json({ success: true, message: 'Thank you for subscribing to our cause updates!' });
    }

    if (!db.memoryStore.subscribers.includes(email.trim().toLowerCase())) {
      db.memoryStore.subscribers.push(email.trim().toLowerCase());
    }

    return res.json({ success: true, message: 'Thank you for subscribing to our cause updates!' });
  } catch (err) {
    console.error('Error subscribing:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

