import { Router } from "express";
import { signUp, login } from '../controller/user.js';
import { check, validationResult } from 'express-validator';
import { isAuthenticated } from '../middleware/auth.js';

const router = Router();

// Validation middleware for sign-up
const validateSignUp = [
    check('username')
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    check('email')
        .isEmail().withMessage('Invalid email format'),
    check('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
];


// Define the sign-up route with validation
router.post('/signup', isAuthenticated, validateSignUp, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, signUp);

router.get('/signup', isAuthenticated, (req, res) => {
    res.send("Welcome to Sign Up");
});

// Define the login route with validation
router.post('/login', isAuthenticated, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, login);

router.get('/login', isAuthenticated, (req, res) => {
    res.send("Welcome to Login");
});


router.get("/logout", isAuthenticated, (req, res) => {
    try {
    res.clearCookie("token"); // Clear the token cookie with a path
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error clearing cookie:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Export the router as the default export
export default router;
