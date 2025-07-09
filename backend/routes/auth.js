import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; 
import loginLimiter from '../middleware/rateLimiter.js';
import { body, validationResult } from 'express-validator';


const router = express.Router();

// Registration route
router.post('/register', [
    body('username').isString().trim().escape(),
    body('password').isLength({ min: 8 })
    ], 
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        console.log("Register Request Body:", req.body); // Log request body
        // Hash the password
        const saltRounds = 10;  // Define the number of salt rounds
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        // Create a new user
        const user = new User({
            username: req.body.username,
            password: hashedPassword,
        });

        // Save the user
        await user.save();

        // Send a success response
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        return next(error);
    }
});


// Login route
router.post('/login', loginLimiter, async (req, res, next) => {
    try {
        console.log("Login Request Body:", req.body); // Log request body
        // Find the user
        const user = await User.findOne({ username: req.body.username });
        console.log("User Found:", user); // Log user found

        if (!user) {
            console.log("User not found error");
            const error = new Error('User not found');
            error.status = 400;
            return next(error);
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        console.log("Password Match:", passwordMatch); // Log password match result

        if (!passwordMatch) {
            console.log("Incorrect password error");
            const error = new Error('Incorrect password');
            error.status = 400;
            return next(error);
        }

        // Create a JWT
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Replace 'YOUR_SECRET_KEY'
        console.log("Generated Token:", token); // Log generated token

        // Send the token
        res.json({ token, message: 'Logged in successfully' });
    } catch (error) {
        console.error('Login error:', error);
        return next(error);
    }
});

export default router;
