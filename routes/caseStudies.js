// routes/caseStudies.js
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

// POST endpoint to create a new case study
router.post('/make/caseStudy', (req, res) => {
  const id = uuidv4();
  const { title, summary, client, banner, tags, challenge, solution, outcome, results, logo } = req.body;
  const query = 'INSERT INTO case_studies (id, title, summary, client, banner, tags, challenge, solution, outcome, results, logo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [id, title, summary, client, banner, JSON.stringify(tags), challenge, solution, outcome, results, logo], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id, title, summary, client, banner, tags, challenge, solution, outcome, results, logo });
  });
});

// GET endpoint to retrieve all case studies
router.get('/get/caseStudies', (req, res) => {
  const query = 'SELECT * FROM case_studies';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
});

// GET endpoint to retrieve a case study by ID
router.get('/get/caseStudy/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM case_studies WHERE id = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Case study not found' });
    }
    res.status(200).json(results[0]);
  });
});

module.exports = router;
