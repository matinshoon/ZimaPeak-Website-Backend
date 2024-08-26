// routes/careers.js
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

// POST endpoint to create a new career listing
router.post('/make/career', (req, res) => {
  const id = uuidv4();
  const { title, description, requirements, location, type, salary } = req.body;
  const query = 'INSERT INTO careers (id, title, description, requirements, location, type, salary) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [id, title, description, JSON.stringify(requirements), location, type, salary], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id, title, description, requirements, location, type, salary });
  });
});

// GET endpoint to retrieve all career listings
router.get('/get/careers', (req, res) => {
  const query = 'SELECT * FROM careers';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
});

module.exports = router;
