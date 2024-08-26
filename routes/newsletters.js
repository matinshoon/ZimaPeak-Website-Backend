// routes/newsletters.js
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

// POST endpoint to subscribe to the newsletter
router.post('/make/newsletter', (req, res) => {
  const id = uuidv4();
  const { email } = req.body;
  
  // Validate email format
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }
  
  const query = 'INSERT INTO newsletters (id, email) VALUES (?, ?)';
  db.query(query, [id, email], (err, results) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'Email already subscribed' });
      }
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id, email });
  });
});

// GET endpoint to retrieve all newsletter subscribers
router.get('/get/newsletters', (req, res) => {
  const query = 'SELECT * FROM newsletters';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
});

module.exports = router;
