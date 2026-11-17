const db = require('../config/db');

exports.registerVolunteer = async (req, res) => {
  try {
    const { name, email, phone, interest_area, availability, message } = req.body;

    if (!name || !email || !interest_area) {
      return res.status(400).json({ success: false, message: 'Please provide full name, email, and area of interest.' });
    }

    if (db.isPostgresConnected()) {
      const result = await db.query(
        `INSERT INTO volunteers (name, email, phone, interest_area, availability, message)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [name, email, phone || '', interest_area, availability || 'Flexible', message || '']
      );
      return res.status(201).json({
        success: true,
        message: 'Volunteer application submitted successfully! Our community coordinator will contact you.',
        data: result.rows[0]
      });
    }

    const newVolunteer = {
      id: db.memoryStore.volunteers.length + 1,
      name,
      email,
      phone: phone || '',
      interest_area,
      availability: availability || 'Flexible',
      message: message || '',
      status: 'Pending',
      created_at: new Date().toISOString()
    };
    db.memoryStore.volunteers.push(newVolunteer);

    res.status(201).json({
      success: true,
      message: 'Volunteer application submitted successfully! Our community coordinator will contact you.',
      data: newVolunteer
    });
  } catch (err) {
    console.error('Error registering volunteer:', err);
    res.status(500).json({ success: false, message: 'Server error while submitting volunteer application' });
  }
};

exports.submitAdoptionInquiry = async (req, res) => {
  try {
    const { guardian_name, email, phone, address, notes } = req.body;

    if (!guardian_name || !email || !phone) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and contact number.' });
    }

    if (db.isPostgresConnected()) {
      const result = await db.query(
        `INSERT INTO adoption_inquiries (guardian_name, email, phone, address, notes)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [guardian_name, email, phone, address || '', notes || '']
      );
      return res.status(201).json({
        success: true,
        message: 'Adoption inquiry received. Our legal and welfare counseling team will get in touch.',
        data: result.rows[0]
      });
    }

    const newInquiry = {
      id: db.memoryStore.adoption_inquiries.length + 1,
      guardian_name,
      email,
      phone,
      address: address || '',
      notes: notes || '',
      status: 'Under Review',
      created_at: new Date().toISOString()
    };
    db.memoryStore.adoption_inquiries.push(newInquiry);

    res.status(201).json({
      success: true,
      message: 'Adoption inquiry received. Our legal and welfare counseling team will get in touch.',
      data: newInquiry
    });
  } catch (err) {
    console.error('Error submitting adoption inquiry:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

