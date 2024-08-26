const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// CORS Configuration
const corsOptions = {
    origin: ['https://zimapeak.com', 'http://localhost:3001'], // Allow these origins
    methods: ['GET', 'POST'], // Specify allowed methods
    credentials: true // Allow credentials
};

// Apply the CORS middleware
app.use(cors(corsOptions));

// Middleware
app.use(bodyParser.json());

// Import MySQL connection
const db = require('./db');

// Import and use routes
const caseStudiesRoutes = require('./routes/caseStudies');
const blogRoutes = require('./routes/blog');
const careersRoutes = require('./routes/careers');
const newslettersRoutes = require('./routes/newsletters');

// Use the routes with the '/privateapi' prefix
app.use('/privateapi', caseStudiesRoutes);
app.use('/privateapi', blogRoutes);
app.use('/privateapi', careersRoutes);
app.use('/privateapi', newslettersRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
