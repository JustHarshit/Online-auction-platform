import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authMiddleware = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.header('Authorization').replace('Bearer ', '');
        console.log('Extracted token:', token);

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use jwt.verify instead of destructured verify
        console.log('Decoded token:', decoded);

        // Find user by ID
        try {
            const user = await User.findOne({ _id: decoded._id });
            console.log('Found user:', user);

            if (!user) {
                throw new Error('User not found');
            }
            req.user = user;
            req.token = token;
            next();
        } catch (e) {
            console.error('Error finding user:', e);
            res.status(401).send({ error: 'Please authenticate.' });
        }
    } catch (e) {
        console.error('Authentication error:', e);
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

export default authMiddleware;
