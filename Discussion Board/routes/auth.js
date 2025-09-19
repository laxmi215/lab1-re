// routes/auth.js
const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { email, password, givenName, familyName, phone } = req.body;
        // Validate input
        const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        const phoneRegex = /^(\+\d{1,2}\s?)?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
        if (!emailRegex.test(email)) return res.status(400).send('Invalid email address');
        if (!passwordRegex.test(password)) return res.status(400).send('Password must be 8+ chars, include upper, lower, digit');
        if (!givenName || !familyName) return res.status(400).send('Name fields required');
        if (!phoneRegex.test(phone)) return res.status(400).send('Invalid phone number');
        // Check for existing user
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).send('Email already registered');
        // Save user
        const user = new User({ email, password, givenName, familyName, phone });
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).send('Invalid credentials');
        }
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret');
        res.send({ token });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;