import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; 
import loginLimiter from '../middleware/rateLimiter.js';
import { body, validationResult } from 'express-validator';
import authMiddleware from '../middleware/authMiddleware.js';



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
            name: req.body.name || '', // add this line if name comes from frontend
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

// Route to get logged-in user profile
router.get('/me', authMiddleware, async (req, res) => {
  res.json({
    _id: req.user._id,
    username: req.user.username,
    name: req.user.name || '',
  });
});

// Route to update logged-in user profile (name and password)
router.put('/me', authMiddleware, async (req, res, next) => {
  try {
    if (req.body.name !== undefined) {
      req.user.name = req.body.name;
    }
    if (req.body.password) {
      if (req.body.password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
      }
      req.user.password = await bcrypt.hash(req.body.password, 10);
    }
    await req.user.save();
    res.json({
      message: 'Profile updated',
      user: {
        _id: req.user._id,
        username: req.user.username,
        name: req.user.name,
      }
    });
  } catch (err) {
    next(err);
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
