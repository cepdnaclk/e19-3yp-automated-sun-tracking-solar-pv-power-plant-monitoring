//initiation
const express = require("express");
const router = express.Router();

//for json mapping
const {
  requestBodyToFieldsAndValues,
  objectKeysSnakeToCamel,
} = require("../utils/parse");

// to execute and get the output of the queries easily
const { execQuery } = require("../database/database");
const { authenticateToken } = require("../middleware/auth");

if(req.user_type == "company"){
} else {
  return res.sendStatus(401).json({ error: "Unauthorized" });
}
// get companies - if request has an id, get the specific user, if not get all users 
// view all - only accessble for admins
// view one profile - only for the respctive company
// [Done]
//change req.query to req.body if necessary
router.get("/", authenticateToken, (req, res, next) => {
    //only for the respective company
    if(req.user_type == "company"){
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
        //for admins
        execQuery(`SELECT id, username, email, passphrase, contact_number, user_address FROM user WHERE user_type="company"`)
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
  router.post("/",authenticateToken, (req, res, next) => {
    if(req.user_type == "admin"){
      try {
        // const [fields, values] = requestBodyToFieldsAndValues(req.body);
        // delete req.body["id"];
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
//   id : 123456
//   username: "john_doe",
//   user_type: "admin",
//   email: "john.doe@example.com",
//   passphrase: "securepassword",
//   contact_number: "1234567890",
//   user_address: "123 Main Street, Cityville"
// }
  
  router.put("/", authenticateToken, (req, res, next) => {
    if(req.user_type == "company"){
      try {
        const id = req.body["id"];
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
  
  // delete companies
  // change to req.body.id if necessary
  // only accessible for admins

  // request format
  // {
  //   "companyId": 123456, //company ID of the account to be deleted
  //   "password": "admin_password"
  // }

  router.delete("/", (req, res, next) => {
    if(req.user_type == "admin"){
      try {
        const deleteCompanyQuery = `DELETE FROM user WHERE id=${req.body.companyId} 
                                    AND ${req.body.password} = 
                                    (SELECT passphrase FROM user
                                    WHERE username=${req.username}) `;
  
        execQuery(deleteCompanyQuery)
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
