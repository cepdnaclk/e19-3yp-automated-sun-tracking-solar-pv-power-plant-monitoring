//TBD item in delete API 
//initiation
const express = require("express");
const router = express.Router();

//for json mapping
const {
  requestBodyToFieldsAndValues,
  objectKeysSnakeToCamel,
} = require("../utils/parse");

const { authenticateToken } = require("../middleware/auth")

// to execute and get the output of the queries easily
const { execQuery } = require("../database/database");

//All these functions (APIs) are only accessible for admins

// get users - if request has an id, get the specific user, if not get all users 
// [Done]
//change req.query to req.body if necessary
router.get("/", authenticateToken, (req, res, next) => {

  if(req.user_type == "admin"){
    if (req.query.id) {
      execQuery(`SELECT id, username, email, passphrase, contact_number, user_address FROM user WHERE id=${req.query.id} AND username=${req.username}`)
        .then((rows) => {
          data = objectKeysSnakeToCamel(rows[0]);
          res.status(200).json(data);
        })
        .catch((err) => {
          next(err);
        });
    } else {
      execQuery(`SELECT id, username, email, contact_number, user_address FROM user WHERE user_type="admin"`)
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

  router.post("/", authenticateToken,(req, res, next) => {
    
    if(req.user_type == "admin"){
    try {
      // const [fields, values] = requestBodyToFieldsAndValues(req.body);
      // delete req.body["id"];
      const [fields, values] = [Object.keys(req.body), Object.values(req.body)];
      const addAdmins = `INSERT INTO user (${fields.toString()}) VALUES (${values.toString()})`;
  
      execQuery(addAdmins)
        .then((rows) => {
          res.status(200).json({ message: "New Admin user created successfully" });
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
  
//update admin (my profile) details - [Done]
// request format
// {
//   id : 123456
//   username: "john_doe",
//   user_type: "admin",
//   email: "john.doe@example.com",
//   passphrase: "securepassword",
//   contact_number: "1234567890",
//   user_address: "123 Main Street, Cityville"
// }
router.put("/", authenticateToken,(req, res, next) => {
   if(req.user_type == "admin"){

      try {
        const id = req.body["id"];
        delete req.body["id"];
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
  
  //delete members - [Done]
  // change to req.body.id if necessary
  // TBD - admin delete only for primary super admin ?
  router.delete("/", (req, res, next) => {
    if(req.user_type == "admin" && req.username == "SUPER ADMIN"){
      try {
        const deleteAdminQuery = `DELETE FROM user WHERE id=${req.query.id} AND user_type = "admin"`;
        execQuery(deleteAdminQuery)
          .then((rows) => {
            res.status(200).json({ message: "Admin Account Deleted Successfully" });
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
module.exports = router;
