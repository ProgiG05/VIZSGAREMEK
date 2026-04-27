const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Please log in to access this feature.",
    });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_ACCESS_SECRET, {
      algorithms: ["HS256"],
    });
    req.user = user;
    next();
  } catch (err) {
    const isExpired = err.name === "TokenExpiredError";

    console.warn(
      `Auth failed [${err.name}] for token ending ...${token.slice(-8)}`,
    );

    return res.status(401).json({
      success: false,
      expired: isExpired,
      message: isExpired
        ? "Your session has expired. Please log in again."
        : "Invalid session. Please log in again.",
    });
  }
}

module.exports = authenticateToken;
