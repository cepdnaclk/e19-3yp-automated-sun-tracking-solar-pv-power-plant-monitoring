//for web token authentication

const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (token == null)
      return res.sendStatus(401).json({ error: "Unauthorized" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userId) => {
      if (err) throw err;
      req.userId = userId;
      next();
    });
  } catch (err) {
    next(err);
  }
}

function generateAccessToken(id) {
  return jwt.sign({ id: id }, process.env.ACCESS_TOKEN_SECRET, {
    // Expire token in 20 mins
    // expiresIn: "1200s",
  });
}

function generateRefreshToken(id) {
  return jwt.sign({ id: id }, process.env.REFRESH_TOKEN_SECRET);
}

module.exports = {
  authenticateToken,
  generateAccessToken,
  generateRefreshToken,
};
