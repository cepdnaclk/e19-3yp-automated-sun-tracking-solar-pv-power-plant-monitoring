const changeCase = require("change-case");

const express = require("express");
const router = express.Router();

const { connection } = require("../database/database");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middleware/auth");

let refreshTokens = [];

//login - for all users
// request from frontend should be
// {
//   email: "john.doe@example",
//   password: "securepassword",
// }
router.post("/", (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    // console.log(email, password);

    const queryFindUser = `SELECT username, user_type, id, passphrase FROM user WHERE email = '${email}';`;

    // connection.query(queryFindUser, [email], (err, result) => {
    connection.query(queryFindUser, async (err, result) => {
      if (err) {
        console.log("Error during login:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const username = result[0]["username"];
      const user_type = result[0]["user_type"];
      const user_id = result[0]["id"];
      const passphrase = result[0]["passphrase"];

      const isMatch = await bcrypt.compare(password, passphrase);

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }

      // Successful login, proceed with further actions

      // Convert the keys from snake case to camel case and add to response
      // const formattedUser = Object.keys(user).reduce((acc, key) => {
      //   // Remove password field
      //   if (key === "passphrase") return acc;
      //   acc[key] = user[key];
      //   return acc;
      // }, {});

      const accessToken = generateAccessToken(
        username,
        user_type,
        user_id,
        email
      );
      const refreshToken = generateRefreshToken(
        username,
        user_type,
        user_id,
        email
      );
      refreshTokens.push(refreshToken);

      res.json({
        message: "Login Successful",
        accessToken: accessToken,
        refreshToken: refreshToken,
        username: username,
        user_type: user_type,
      });
    });
  } catch (err) {
    next(err);
  }
});

// check login status
router.get("/me", (req, res, next) => {
  try {
    if (req.headers.authorization == null)
      return res.sendStatus(401).json({ error: "Unauthorized" });
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden" });
      }
      res.status(200).json({ message: "Authorized" });
    });
  } catch (err) {
    next(err);
  }
});

router.post("/token", (req, res, next) => {
  try {
    const refreshToken = req.body.refreshToken;

    if (refreshToken == null)
      return res.sendStatus(401).json({ error: "Unauthorized" });
    if (refreshTokens.includes(refreshToken)) {
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, id) => {
        if (err) throw err;
        const accessToken = generateAccessToken(id);
        return res.status(200).json({ accessToken: accessToken });
      });
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/logout", (req, res) => {
  try {
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
