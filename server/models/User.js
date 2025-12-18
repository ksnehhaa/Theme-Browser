import mongoose from 'mongoose';
// 🛑 CRITICAL FIX: Removed 'bcryptjs' import as hashing is now done in authRoutes.js
// If you use other libraries that need to be imported here, add them back, 
// but the hashing hook itself is gone.

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
}, { timestamps: true });

// 🛑 CRITICAL FIX: The pre('save') hook for hashing is REMOVED
// because the hashing is now handled explicitly by Argon2 in authRoutes.js
// This prevents conflicts and double-hashing.

const User = mongoose.model('User', userSchema);
export default User;
