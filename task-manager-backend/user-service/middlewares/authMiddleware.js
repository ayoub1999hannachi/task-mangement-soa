const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
    // Extract the token from the Authorization header (Bearer <token>)
    const token = req.header('Authorization')?.split(' ')[1];
    
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        // Verify token and add the user ID to the request object
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;  // Attach user info to the request object
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};
