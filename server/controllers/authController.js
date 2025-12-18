import User from '../models/User.js';
import argon2 from 'argon2'; // 🛑 NEW: Use argon2 instead of bcryptjs
import jwt from 'jsonwebtoken';

// Ensure this variable is correctly loaded from your .env file
const JWT_SECRET = process.env.JWT_SECRET;

// --- Helper Functions ---

// ✅ Register User (Guaranteed Hashing with Argon2)
export const registerUser = async (req, res) => {
    let { username, email, password } = req.body;
    
    // 1. Normalize input
    username = username ? username.toLowerCase() : username;
    email = email ? email.toLowerCase() : email;

    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // 2. CRITICAL FIX: Hash the password using Argon2
        // Argon2.hash() includes salt generation automatically
        const hashedPassword = await argon2.hash(password); 
        console.log(`[SIGNUP DEBUG] Password Hashed Successfully with Argon2.`);

        // 3. Create the user
        const user = await User.create({ 
            username, 
            email, 
            password: hashedPassword // Save the Argon2 hash
        });

        // 4. Generate token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
        console.log(`[SIGNUP SUCCESS] User created: ${user.username}`);

        res.status(201).json({
            token,
            user: { id: user._id, username: user.username, email: user.email }
        });

    } catch (err) {
        console.error('Registration Error (500):', err.message);
        res.status(500).json({ message: 'Registration failed', error: err.message });
    }
};

// ✅ Login User (Argon2 Verification)
export const loginUser = async (req, res) => {
    let { identifier, password } = req.body; 

    // Normalize identifier before lookup
    identifier = identifier ? identifier.toLowerCase() : identifier;

    try {
        // 1. Find user
        const user = await User.findOne({ 
            $or: [{ username: identifier }, { email: identifier }] 
        });

        if (!user) {
            console.log(`[LOGIN DEBUG] FAILED: User not found for normalized identifier: ${identifier}`);
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        console.log(`[LOGIN DEBUG] SUCCESS: User found: ${user.username}`);

        // 2. CRITICAL FIX: Compare password using Argon2.verify()
        // This is highly stable and fast
        const isMatch = await argon2.verify(user.password, password);

        if (!isMatch) {
            console.log(`[LOGIN DEBUG] FAILED: Password Mismatch for user: ${user.username}`);
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        console.log(`[LOGIN DEBUG] SUCCESS: Password matched for user: ${user.username}`);

        // 3. Generate token and respond
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

        res.json({ 
            token,
            user: { id: user._id, username: user.username, email: user.email }
        });
    } catch (err) {
        console.error('Login Error (500):', err.message);
        res.status(500).json({ message: 'Login failed', error: err.message });
    }
};
