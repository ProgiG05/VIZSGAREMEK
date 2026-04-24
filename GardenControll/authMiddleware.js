const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: 'Please log in to access this feature.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            const message = err.name === 'TokenExpiredError'
                ? 'Your session has expired. Please log in again.'
                : 'Invalid session. Please log in again.';

            console.warn(`Auth failed: ${err.name} for token ending ...${token.slice(-8)}`);
            return res.status(403).json({ success: false, message });
        }

        req.user = user;
        next();
    });
}

module.exports = authenticateToken;
