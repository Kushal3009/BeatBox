import jwt from 'jsonwebtoken';

const secret = process.env.SECRET_KEY || 'Kushal030';

export const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token;

    if (token) {
        try {
            // Verify token
            const decoded = jwt.verify(token, secret);
            req.user = decoded; // Attach user data to request object
            return res.redirect('/'); // Redirect if already logged in
        } catch (error) {
            // Token is invalid or expired
            return next();
        }
    } else {
        return next(); // Proceed if no token found
    }
};
