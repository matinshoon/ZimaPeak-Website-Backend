// routes/blog.js
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

// POST endpoint to create a new blog post
router.post('/make/blog', (req, res) => {
  const id = uuidv4();
  const { title, summary, author, publishedDate, videoUrl, content } = req.body;
  const query = 'INSERT INTO blogs (id, title, summary, author, publishedDate, videoUrl, content) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [id, title, summary, author, publishedDate, videoUrl, content], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id, title, summary, author, publishedDate, videoUrl, content });
  });
});

// GET endpoint to retrieve all blog posts
router.get('/get/blogs', (req, res) => {
  const query = 'SELECT * FROM blogs';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
});

// GET endpoint to retrieve a single blog post by ID
router.get('/get/blog/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM blogs WHERE id = ?'; // Fixed table name

  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    res.status(200).json(results[0]);
  });
});

module.exports = router;
