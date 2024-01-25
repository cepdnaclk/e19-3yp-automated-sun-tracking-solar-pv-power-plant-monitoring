//initiation
const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");

const { authenticateToken } = require("../middleware/auth");

//for json mapping
const {
  requestBodyToFieldsAndValues,
  objectKeysSnakeToCamel,
} = require("../utils/parse");

// to execute and get the output of the queries easily
const { execQuery } = require("../database/database");

// get customers - if request has an id, get the specific user, if not get all users
// only accessible for company
// query id - id of the specific user
// [Done]
router.get("/view", authenticateToken, (req, res, next) => {
  if (req.user_type == "company") {
    if (req.query.id) {
      //id of the specific user
      execQuery(`SELECT user.id, user.username, user.user_type, user.email, user.contact_number, user.user_address
                FROM user
                JOIN device ON user.id = ${req.query.id}
                WHERE device.assigned_company_id = ${req.user_id}}`)
        .then((rows) => {
          data = objectKeysSnakeToCamel(rows[0]);
          res.status(200).json(data);
        })
        .catch((err) => {
          next(err);
        });
    } else {
      // all users under the company - mapped from devices table
      execQuery(`SELECT user.id, user.username, user.user_type, user.email, user.contact_number, user.user_address
                FROM user
                JOIN device ON user.id = device.assigned_customer_id
                WHERE device.assigned_company_id = ${req.user_id}}`)
        .then((rows) => {
          data = rows[0].map((row) => objectKeysSnakeToCamel(row));
          res.status(200).json(data);
        })
        .catch((err) => {
          next(err);
        });
    }
  } else {
    return res.sendStatus(401).json({ error: "Unauthorized" });
  }
});

// get own profile - only for the respective customer - [Done]
router.get("/viewProfile", authenticateToken, (req, res, next) => {
  if (req.user_type == "customer") {
    execQuery(
      `SELECT user.id, user.username, user.email, user.contact_number, user.user_address FROM user WHERE id=${req.user_id}`
    )
      .then((rows) => {
        data = objectKeysSnakeToCamel(rows[0]);
        res.status(200).json(data);
      })
      .catch((err) => {
        next(err);
      });
  } else {
    return res.sendStatus(401).json({ error: "Unauthorized" });
  }
});

//add new customer - only accessible for customers and customer registration
// [Done]
// request from frontend should be
// {
//   username: "john_doe",
//   user_type: "customer",
//   email: "john.doe@example.com",
//   passphrase: "securepassword",
//   contact_number: "1234567890",
//   user_address: "123 Main Street, Cityville"
// } - authentication token not needed
router.post("/register", async (req, res, next) => {
  try {
    // const [fields, values] = requestBodyToFieldsAndValues(req.body);
    // delete req.body["id"];
    req.body.passphrase = await bcrypt.hash(req.body.passphrase, 10);
    const [fields, values] = [Object.keys(req.body), Object.values(req.body)];
    const quotedValues = values.map((value) => `'${value}'`);
    const customerRegisterQuery = `INSERT INTO user (${fields.toString()}, user_type) VALUES (${quotedValues.toString()}, 'customer');`;

    execQuery(customerRegisterQuery)
      .then((rows) => {
        res.status(200).json({ message: "Registration Successful" });
      })
      .catch((err) => {
        res.status(400).json({ message: err.toString() });
      });
  } catch (err) {
    res.status(400).json({ message: err.toString() });
  }
});

// update company (my profile) details - only for customers
// password change is in a separate API
// request format
// {
//   username: "john_doe",
//   email: "john.doe@example.com",
//   contact_number: "1234567890",
//   user_address: "123 Main Street, Cityville"
// }
// [Done]

router.put("/updateProfile", authenticateToken, (req, res, next) => {
  if (req.user_type == "customer" && req.user_id == req.body["id"]) {
    try {
      const [fields, values] = [Object.keys(req.body), Object.values(req.body)];
      // Combine the two arrays into a single array.
      let updateString = "";

      for (let i = 0; i < fields.length; i++) {
        updateString += fields[i] + " = ";
        updateString += `'${values[i]}', `;
      }

      // remove last trailling ", "
      updateString = updateString.substring(0, updateString.length - 2);

      const updateCustomerQuery = `UPDATE user SET ${updateString} WHERE id='${req.user_id}';`;

      console.log(updateCustomerQuery);

      execQuery(updateCustomerQuery)
        .then((rows) => {
          res
            .status(200)
            .json({ message: "User details updated successfully" });
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
  if (req.user_type == "customer" && req.user_id == req.body["id"]) {
    try {
      const id = req.user_id;
      const old_password = req.body["old_password"];
      const new_password = req.body["new_password"];
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

// delete customer - only accessbile for the customers
//password should be checked to delete the profile
// {
//   "password": "user_password"
// }
// [Done]

router.delete("/deleteProfile", authenticateToken, async (req, res, next) => {
  if (req.user_type == "customer") {
    try {
      const id = req.user_id;
      const password = req.body["password"];
      const getPassphraseQuery = `SELECT passphrase FROM user WHERE id=${id}`;
      const rows = await execQuery(getPassphraseQuery);
      const passphrase = rows[0][0]["passphrase"];
      const isMatch = await bcrypt.compare(password, passphrase);

      if (isMatch) {
        const deleteCustomerQuery = `DELETE FROM user WHERE id=${id}`;
        await execQuery(deleteCustomerQuery);
        res
          .status(200)
          .json({ message: "Customer Account Deleted Successfully" });
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
