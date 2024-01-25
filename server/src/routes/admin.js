//TBD item in delete API
//initiation
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

//for json mapping
const {
  requestBodyToFieldsAndValues,
  objectKeysSnakeToCamel,
} = require("../utils/parse");

const { authenticateToken } = require("../middleware/auth");

// to execute and get the output of the queries easily
const { execQuery } = require("../database/database");

//All these functions (APIs) are only accessible for admins

// get users - if request has an id, get the specific user, if not get all users
// [Done]
//change req.query to req.body if necessary
router.get("/view", authenticateToken, (req, res, next) => {
  if (req.user_type === "admin") {
    if (req.query.id) {
      const userId = req.query.id || req.user_id;
      execQuery(
        `SELECT id, username, email, contact_number, user_address FROM user WHERE id=${userId}`
      )
        .then((rows) => {
          if (rows.length > 0) {
            const data = objectKeysSnakeToCamel(rows[0]);
            res.status(200).json(data);
          } else {
            res.status(404).json({ error: "User not found" });
          }
        })
        .catch((err) => {
          next(err);
        });
    } else {
      execQuery(
        `SELECT id, username, email, contact_number, user_address FROM user WHERE user_type="admin"`
      )
        .then((rows) => {
          const data = rows.map((row) => objectKeysSnakeToCamel(row));
          res.status(200).json(data);
        })
        .catch((err) => {
          next(err);
        });
    }
  } else {
    res.status(403).json({ error: "Forbidden" });
  }
});

//add new admin - [Done]
// request from frontend should be
//{
//   username: "john_doe",
//   user_type: "admin",
//   email: "john.doe@example.com",
//   passphrase: "securepassword",
//   contact_number: "1234567890",
//   user_address: "123 Main Street, Cityville"
// }

router.post("/new", authenticateToken, async (req, res, next) => {
  if (req.user_type == "admin") {
    try {
      // const [fields, values] = requestBodyToFieldsAndValues(req.body);
      // delete req.body["id"];
      // make the password hashed
      req.body.passphrase = await bcrypt.hash(req.body.passphrase, 10);
      const [fields, values] = [Object.keys(req.body), Object.values(req.body)];
      const addAdmins = `INSERT INTO user (${fields.toString()}) VALUES (${values.toString()})`;

      execQuery(addAdmins)
        .then((rows) => {
          res
            .status(200)
            .json({ message: "New Admin user created successfully" });
        })
        .catch((err) => {
          next(err);
        });
    } catch (err) {
      next(err);
    }
  } else {
    return res.sendStatus(401).json({ error: "Unauthorized" });
  }
});

//create a custom API to add a user called "SUPER ADMIN" with password "superadmin123" and user_type "admin" to the database
//request format
// {
//   "username": "SUPER ADMIN",
//   "password": "superadmin123",
//   "user_type": "admin"
//   "email": "superadmin@gmail.com"
//    contact_number: "1234567890",
//    user_address: "123 Main Street, Cityville"
// }
router.post("/create", async (req, res, next) => {
  try {
    const username = req.body["username"];
    const password = req.body["password"];
    const user_type = req.body["user_type"];
    const email = req.body["email"];
    const contact_number = req.body["contact_number"];
    const user_address = req.body["user_address"];

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const insertUserQuery = `INSERT INTO user 
    (username, passphrase, user_type, email, contact_number, user_address) 
    VALUES ('${username}', '${hashedPassword}', '${user_type}', '${email}', '${contact_number}', '${user_address}')`;
    const rows = await execQuery(insertUserQuery);
    res.status(200).json({ message: "SUPER ADMIN created successfully" });
  } catch (err) {
    next(err);
  }
});

//update admin (my profile) details - [Done]
// password change is in different API
// request format
// {
//   id : 123456
//   username: "john_doe",
//   user_type: "admin",
//   email: "john.doe@example.com",
//   contact_number: "1234567890",
//   user_address: "123 Main Street, Cityville"
// }
router.put("/myProfile", authenticateToken, (req, res, next) => {
  if (req.user_type == "admin" && req.user_id == req.body.id) {
    try {
      const id = req.user_id;
      const [fields, values] = [Object.keys(req.body), Object.values(req.body)];
      // Combine the two arrays into a single array.
      let updateString = "";

      for (let i = 0; i < fields.length; i++) {
        updateString += fields[i] + " = ";
        updateString += `'${values[i]}', `;
      }

      // remove last trailling ", "
      updateString = updateString.substring(0, updateString.length - 2);

      const updateMemberQuery = `UPDATE user SET ${updateString} WHERE id='${id}';`;

      execQuery(updateMemberQuery)
        .then((rows) => {
          res
            .status(200)
            .json({ message: "Admin details updated successfully" });
        })
        .catch((err) => {
          next(err);
        });
    } catch (err) {
      next(err);
    }
  } else {
    return res.sendStatus(401).json({ error: "Unauthorized" });
  }
});

//create a put request to change password [Done]
// request format
// {
//   old_password: "securepassword",
//   new_password: "newsecurepassword"
// }
router.put("/changePassword", authenticateToken, async (req, res, next) => {
  if (req.user_type == "admin" && req.user_id == req.body.id) {
    try {
      const id = req.user_id;
      const old_password = req.body["currentPassword"];
      const new_password = req.body["newPassword"];
      const getPassphraseQuery = `SELECT passphrase FROM user WHERE id=${id}`;
      const rows = await execQuery(getPassphraseQuery);
      const passphrase = rows[0]["passphrase"];
      const isMatch = await bcrypt.compare(old_password, passphrase);

      if (isMatch) {
        const hashedPassword = await bcrypt.hash(new_password, 10);
        const updatePassphraseQuery = `UPDATE user SET passphrase='${hashedPassword}' WHERE id=${id}`;
        await execQuery(updatePassphraseQuery);
        res.status(200).json({ message: "Password changed successfully" });
      } else {
        res.status(401).json({ error: "Invalid Password" });
      }
    } catch (err) {
      next(err);
    }
  } else {
    return res.sendStatus(401).json({ error: "Unauthorized" });
  }
});

//change this to delete an admin user account after confirmation of password of the admin user
//request format
// {
//   id : 123456 //id of the admin user to be deleted
//   password: "securepassword"
// }
router.delete("/deleteAccount", authenticateToken, async (req, res, next) => {
  if (req.user_type == "admin" && req.username == "SUPER ADMIN") {
    try {
      const id = req.user_id;
      const password = req.body["password"];
      const getPassphraseQuery = `SELECT passphrase FROM user WHERE id=${id}`;
      const rows = await execQuery(getPassphraseQuery);
      const passphrase = rows[0][0]["passphrase"];
      const isMatch = await bcrypt.compare(password, passphrase);

      if (isMatch) {
        const deleteAdminQuery = `DELETE FROM user WHERE id=${req.body.id}`;
        await execQuery(deleteAdminQuery);
        res.status(200).json({ message: "Admin Account Deleted Successfully" });
      } else {
        res.status(401).json({ error: "Invalid Password" });
      }
    } catch (err) {
      next(err);
    }
  } else {
    return res.sendStatus(401).json({ error: "Unauthorized" });
  }
});

module.exports = router;
