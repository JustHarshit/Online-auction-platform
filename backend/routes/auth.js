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
    async (req, res) => {
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
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
});


// Login route
router.post('/login', loginLimiter, async (req, res) => {
    try {
        console.log("Login Request Body:", req.body); // Log request body
        // Find the user
        const user = await User.findOne({ username: req.body.username });
        console.log("User Found:", user); // Log user found

        if (!user) {
            console.log("User not found error");
            return res.status(400).json({ message: 'Cannot find user' });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        console.log("Password Match:", passwordMatch); // Log password match result

        if (!passwordMatch) {
            console.log("Incorrect password error");
            return res.status(400).json({ message: 'Incorrect password' });
        }

        // Create a JWT
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Replace 'YOUR_SECRET_KEY'
        console.log("Generated Token:", token); // Log generated token

        // Send the token
        res.json({ token, message: 'Logged in successfully' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
});

export default router;
