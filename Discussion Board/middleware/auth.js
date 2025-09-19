// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).send('No token provided');
    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).send('No token provided');
    jwt.verify(token, 'your_jwt_secret', async (err, decoded) => {
        if (err) return res.status(403).send('Invalid token');
        try {
            const user = await User.findById(decoded.id);
            if (!user) return res.status(401).send('User not found');
            req.user = user;
            next();
        } catch (error) {
            res.status(401).send('Unauthorized');
        }
    });
}

module.exports = authenticateToken;