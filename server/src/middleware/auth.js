//for web token authentication

const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (token == null)
      return res.sendStatus(401).json({ error: "Unauthorized" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, username, user_type) => {
      if (err) throw err;
      req.username = username;
      req.user_type = user_type;
      next();
    });
  } catch (err) {
    next(err);
  }
}

function generateAccessToken(username,user_type) {
  return jwt.sign({ username: username, user_type:user_type }, process.env.ACCESS_TOKEN_SECRET, {
    // Expire token in 20 mins
    expiresIn: "1200s",
  });
}

function generateRefreshToken(username,user_type) {
  return jwt.sign({ username: username, user_type:user_type }, process.env.REFRESH_TOKEN_SECRET);
}

module.exports = {
  authenticateToken,
  generateAccessToken,
  generateRefreshToken,
};
