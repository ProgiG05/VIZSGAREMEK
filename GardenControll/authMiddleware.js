const jwt = require('jsonwebtoken');


function authenticateToken(req, res, next) {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ success: false, message: 'Please log in to access this feature.' });
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
        req.user = user;
        next();
    } catch (err) {
        const message = err.name === 'TokenExpiredError'
            ? 'Your session has expired. Please log in again.'
            : 'Invalid session. Please log in again.';

        console.warn(`Auth failed: ${err.name} for token ending ...${token.substring(token.length - 8)}`);
        return res.status(401).json({ success: false, message });
    }
}

module.exports = authenticateToken;