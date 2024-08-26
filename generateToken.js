// generateToken.js

require('dotenv').config(); // Load environment variables from .env file
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET; // Read the secret key from environment variables

if (!secretKey) {
    console.error('JWT_SECRET is not defined in .env file');
    process.exit(1);
}

const payload = { /* any payload data you need */ };
const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

console.log('Generated JWT Token:', token);
