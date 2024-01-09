//initiation
const express = require("express");
const router = express.Router();

//for json mapping
const {
  requestBodyToFieldsAndValues,
  objectKeysSnakeToCamel,
  } = require("../utils/parse");

  const bcrypt = require("bcrypt");

// to execute and get the output of the queries easily
const { execQuery } = require("../database/database");
const { authenticateToken } = require("../middleware/auth");


// get companies - if request has an id, get the specific user, if not get all users 
// only accessble for admins
// [Done]
//change req.query to req.body if necessary
router.get("/view", authenticateToken, (req, res, next) => {
    if(req.user_type == "admin"){
      if (req.query.id) {
        execQuery(`SELECT id, username, email, contact_number, user_address FROM user WHERE id=${req.query.id} AND user_type="company"`)
          .then((rows) => {
            data = objectKeysSnakeToCamel(rows[0]);
            res.status(200).json(data);
          })
          .catch((err) => {
            next(err);
          });
      } else {
        execQuery(`SELECT id, username, email, contact_number, user_address FROM user WHERE user_type="company"`)
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

  // get own profile - only for the respective company - [Done]
  router.get("/myprofile", authenticateToken, (req, res, next) => {
    if(req.user_type == "company"){
       //view own profile
        execQuery(`SELECT id, username, email, contact_number, user_address
                  FROM user
                  WHERE id = ${req.user_id}}`)
          .then((rows) => {
            data = objectKeysSnakeToCamel(rows[0]);
            res.status(200).json(data);
          })
          .catch((err) => {
            next(err);
          });
      }}
  );

  
  //add new company - only accessible for admins
  //[Done]
  // request from frontend should be 
  // {
    //   username: "john_doe",
    //   user_type: "company",
    //   email: "john.doe@example.com",
    //   passphrase: "securepassword",
    //   contact_number: "1234567890",
    //   user_address: "123 Main Street, Cityville"
    // }
  router.post("/new",authenticateToken, async(req, res, next) => {
    if(req.user_type == "admin"){
      try {
        req.body.passphrase = await bcrypt.hash(req.body.passphrase, 10);
        const [fields, values] = [Object.keys(req.body), Object.values(req.body)];
        const createCompanyQuery = `INSERT INTO user (${fields.toString()}) VALUES (${values.toString()})`;
    
        execQuery(createCompanyQuery)
          .then((rows) => {
            res.status(200).json({ message: "New Company created successfully" });
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
  
  //update company (my profile) details - only accessble companies to update their own details
  // [Done]
// {
//   username: "john_doe",
//   user_type: "admin",
//   email: "john.doe@example.com",
//   contact_number: "1234567890",
//   user_address: "123 Main Street, Cityville"
// }
  
  router.put("/update", authenticateToken, (req, res, next) => {
    if(req.user_type == "company"){
      try {
        const id = req.user_id;
        delete req.body["id"]; //id used in the UPDATE query, not needed in the update string
        const [fields, values] = [Object.keys(req.body), Object.values(req.body)];
        // Combine the two arrays into a single array.
        let updateString = "";
    
        for (let i = 0; i < fields.length; i++) {
          updateString += fields[i] + " = ";
          updateString += `'${values[i]}', `;
        }
    
        // remove last trailling ", "
        updateString = updateString.substring(0, updateString.length - 2);
    
        const updateCompanyQuery = `UPDATE user SET ${updateString} WHERE id='${id}';`;
    
        execQuery(updateCompanyQuery)
          .then((rows) => {
            res
              .status(200)
              .json({ message: "Company details updated successfully" });
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
  if(req.user_type == "company"){
    try {
      const id = req.user_id;
      const old_password = req.body["old_password"];
      const new_password = req.body["new_password"];
      const getPassphraseQuery = `SELECT passphrase FROM user WHERE id=${id}`;
      const rows = await execQuery(getPassphraseQuery);
      const passphrase = rows[0][0]["passphrase"];
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
  
  // delete companies - [Done]
  // only accessible for admins

  // request format
  // {
  //   "companyId": 123456, //company ID of the account to be deleted
  //   "password": "admin_password"
  // }

  router.delete("/deleteCompany", authenticateToken, async (req, res, next) => {
    if(req.user_type == "customer"){
      try {
        const id = req.user_id;
        const password = req.body["password"];
        const getPassphraseQuery = `SELECT passphrase FROM user WHERE id=${id}`;
        const rows = await execQuery(getPassphraseQuery);
        const passphrase = rows[0][0]["passphrase"];
        const isMatch = await bcrypt.compare(password, passphrase);
  
        if (isMatch) {
          const deleteCompanyQuery = `DELETE FROM user WHERE id=${req.body.companyId} 
          AND user_type="company"`;
          await execQuery(deleteCompanyQuery);
          res.status(200).json({ message: "Customer Account Deleted Successfully" });
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
