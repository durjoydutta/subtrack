import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js';
import User from '../database/models/user.model.js';

export const signUp = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check for existing user by email or username
    const isExistingUser = await User.exists({
        $or: [ { username }, { email } ]
    });

    if (isExistingUser) {
        return res.status(409).json({ message: 'Username or email is already taken. Please choose another one.' });
    }
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create([{
            username,
            email,
            password: hashedPassword
        }], { session }); // Transactional save

        // Generate a JWT token for the signed up user
        const token = jwt.sign(
            { id: newUser[0]._id},
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        // Commit the transaction
        await session.commitTransaction();

        // Send response
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                user: { id: newUser[0]._id, username: newUser[0].username, email: newUser[0].email },
                jwtToken: token
            }
        });
    } catch (error) {
        // Rollback the transaction on error
        await session.abortTransaction();
        next(error);
    } finally {
        // End the session
        await session.endSession();
    }
};

export const signIn = async (req, res, next) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).json({ message: 'Please provide both username and password' });
    }

    try {
        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            // Generic message for both invalid username or password
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Validate password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            // Generic message for invalid credentials
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, username: user.username },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        // Prepare sanitized user details
        const sanitizedUser = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        // Send response
        res.status(200).json({
            success: true,
            message: `${user.username} signed in successfully`,
            data: {
                user: sanitizedUser,
                jwtToken: token,
            },
        });
    } catch (error) {
        // Pass errors to the error-handling middleware
        next(error);
    }
};

export const signOut = async (req, res, next) => {
    // signout logic to be implemented
}