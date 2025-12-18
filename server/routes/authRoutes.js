import express from 'express';
// 🛑 CRITICAL FIX: Switch from 'bcryptjs' to 'argon2'
import argon2 from 'argon2'; 
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { requestResetController } from '../controllers/requestResetController.js';
import { resetPasswordController } from '../controllers/resetPasswordController.js';

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// ✅ Signup Route (FIXED with Argon2 Hashing)
router.post('/signup', async (req, res) => {
    let { username, email, password } = req.body;

    // 1. Normalize input
    username = username ? username.toLowerCase() : username;
    email = email ? email.toLowerCase() : email;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            console.log(`[SIGNUP FAIL] User or email already exists: ${username || email}`);
            return res.status(400).json({ message: 'User already exists' });
        }

        // 2. CRITICAL FIX: Hash password using Argon2
        const hashedPassword = await argon2.hash(password);
        console.log(`[SIGNUP DEBUG] Password Hashed Successfully with Argon2.`);

        // 3. Create new user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword // Save the Argon2 hash
        });

        // 4. Generate JWT token
        const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '7d' });
        console.log(`[SIGNUP SUCCESS] User created: ${newUser.username}`);

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: { id: newUser._id, username: newUser.username, email: newUser.email }
        });
    } catch (error) {
        console.error('Registration Error (500):', error.message);
        res.status(500).json({ message: 'Signup failed', error: error.message });
    }
});

// ✅ Login Route (FIXED with Argon2 Verification)
router.post('/login', async (req, res) => {
    let { identifier, password } = req.body; 

    console.log(`[LOGIN-START] Received identifier: ${identifier}`);

    // CRITICAL FIX: Normalize the identifier to lowercase for database lookup
    identifier = identifier ? identifier.toLowerCase() : identifier;

    try {
        // 1. Find user by normalized username or email
        const user = await User.findOne({ 
            $or: [{ email: identifier }, { username: identifier }] 
        });

        if (!user) {
            console.log(`[LOGIN DEBUG] FAILED: User not found for normalized identifier: ${identifier}`);
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        console.log(`[LOGIN DEBUG] SUCCESS: User found: ${user.username}`);

        // 2. CRITICAL FIX: Compare password using Argon2.verify()
        const isMatch = await argon2.verify(user.password, password);

        if (!isMatch) {
            console.log(`[LOGIN DEBUG] FAILED: Password Mismatch for user: ${user.username}`);
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        console.log(`[LOGIN DEBUG] SUCCESS: Password matched for user: ${user.username}`);

        // 3. Generate token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

        res.status(200).json({
            message: 'Login successful',
            token,
            user: { id: user._id, username: user.username, email: user.email }
        });
    } catch (error) {
        console.error('Login Error (500):', error.message);
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
});

// ✅ Request password reset (OTP)
router.post('/request-reset', requestResetController);

// ✅ Reset password using OTP
router.post('/reset-password', resetPasswordController);

// ✅ Protected route to get current user info
router.get('/me', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('username email');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ user });
    } catch (error) {
        console.error('Error in /me route:', error.message);
        res.status(500).json({ message: 'Failed to fetch user', error: error.message });
    }
});

export default router;
