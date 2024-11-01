import User from '../models/user.js'; // Ensure this is at the top
import { createHmac } from 'node:crypto'; // Importing only createHmac
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'




dotenv.config(); // Load environment variables from .env file
const secret = process.env.SECRET_KEY; // Use environment variable

export const signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ success: false, error: "User already exists" });
        }

        // Hash the password
        const hashPassword = createHmac('sha256', secret)
            .update(password)
            .digest('hex');

        // Create and save the new user
        const newUser = new User({ username, email, password: hashPassword });
        await newUser.save();

        res.json({ success: true, msg: "Register successfully" });
    } catch (error) {
        console.error("Error during sign up:", error);
        res.status(500).json({ success: false, error: "Error signing up" });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, error: "User Not Exists" });
        }

        // Hash the input password
        const hashPassword = createHmac('sha256', secret)
            .update(password)
            .digest('hex');

        // Check if the hashed password matches
        if (user.password !== hashPassword) {
            return res.status(401).json({ success: false, error: "Password Not Matching" });
        }

        const data = { username: user.username };
        const token = jwt.sign(data, secret);

        res.cookie('token', token)
          
        res.json({ success: true, msg: "Login Successfully",user:user.username });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ success: false, error: "Error signing in" });
    }
};


