//for web token authentication

const jwt = require("jsonwebtoken");
require("dotenv").config();

function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (token == null){
      return res.status(401).json({ error: "Unauthorized" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        throw err;
      }
      req.username = decoded.username;
      req.user_type = decoded.user_type;
      req.user_id = decoded.id;
      req.email = decoded.email;
      next();
    });
  } catch (err) {
    next(err);
  }
}

function generateAccessToken(username, user_type, id, email) {
  return jwt.sign(
    { username: username, user_type: user_type, id: id, email: email },
    process.env.ACCESS_TOKEN_SECRET,
    {
      // Expire token in 20 mins
      expiresIn: "1200s",
    }
  );
}

function generateRefreshToken(username, user_type, id, email) {
  return jwt.sign(
    { username: username, user_type: user_type, id: id, email: email },
    process.env.REFRESH_TOKEN_SECRET
  );
}

module.exports = {
  authenticateToken,
  generateAccessToken,
  generateRefreshToken,
};
