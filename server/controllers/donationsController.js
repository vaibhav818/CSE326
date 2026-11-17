const db = require('../config/db');

exports.createDonation = async (req, res) => {
  try {
    const { program_id, donor_name, donor_email, amount, payment_method, message } = req.body;

    if (!donor_name || !donor_email || !amount || parseFloat(amount) <= 0) {
      return res.status(400).json({ success: false, message: 'Please provide donor name, valid email, and amount.' });
    }

    const donationAmount = parseFloat(amount);
    const progId = program_id ? parseInt(program_id, 10) : null;

    if (db.isPostgresConnected()) {
      // Begin transaction
      const client = await db.pool.connect();
      try {
        await client.query('BEGIN');
        const insertRes = await client.query(
          `INSERT INTO donations (program_id, donor_name, donor_email, amount, payment_method, message)
           VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
          [progId, donor_name, donor_email, donationAmount, payment_method || 'Card', message || '']
        );

        if (progId) {
          await client.query(
            `UPDATE programs SET raised_amount = raised_amount + $1 WHERE id = $2`,
            [donationAmount, progId]
          );
        }

        await client.query('COMMIT');
        return res.status(201).json({ success: true, message: 'Thank you for your generous contribution!', data: insertRes.rows[0] });
      } catch (e) {
        await client.query('ROLLBACK');
        throw e;
      } finally {
        client.release();
      }
    }

    // In-memory fallback
    const newDonation = {
      id: db.memoryStore.donations.length + 1,
      program_id: progId,
      donor_name,
      donor_email,
      amount: donationAmount,
      payment_method: payment_method || 'Card',
      message: message || '',
      created_at: new Date().toISOString()
    };
    db.memoryStore.donations.unshift(newDonation);

    if (progId) {
      const prog = db.memoryStore.programs.find(p => p.id === progId);
      if (prog) {
        prog.raised_amount = parseFloat((prog.raised_amount + donationAmount).toFixed(2));
      }
    }

    return res.status(201).json({
      success: true,
      message: 'Thank you for your generous contribution!',
      data: newDonation
    });
  } catch (err) {
    console.error('Error creating donation:', err);
    res.status(500).json({ success: false, message: 'Internal server error while processing donation' });
  }
};

exports.getRecentDonations = async (req, res) => {
  try {
    if (db.isPostgresConnected()) {
      const result = await db.query(
        `SELECT d.*, p.title as program_title 
         FROM donations d 
         LEFT JOIN programs p ON d.program_id = p.id 
         ORDER BY d.created_at DESC LIMIT 10`
      );
      return res.json({ success: true, data: result.rows });
    }

    const list = db.memoryStore.donations.slice(0, 10).map(d => {
      const prog = db.memoryStore.programs.find(p => p.id === d.program_id);
      return { ...d, program_title: prog ? prog.title : 'General Welfare Fund' };
    });

    res.json({ success: true, data: list });
  } catch (err) {
    console.error('Error fetching donations:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

