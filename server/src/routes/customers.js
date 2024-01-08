//initiation
const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../middleware/auth");

//for json mapping
const {
  requestBodyToFieldsAndValues,
  objectKeysSnakeToCamel,
} = require("../utils/parse");

// to execute and get the output of the queries easily
const { execQuery } = require("../database/database");

if(req.user_type == "company"){
} else {
  return res.sendStatus(401).json({ error: "Unauthorized" });
}

// get customers - if request has an id, get the specific user, if not get all users 
// only accessible for company
// [Done]
router.get("/", authenticateToken, (req, res, next) => {
  if(req.user_type == "company"){
    if (req.query.id) { //id of the specific user
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
  router.get("/", authenticateToken, (req, res, next) => {
    if(req.user_type == "customer"){
       //view own profile
        execQuery(`SELECT username, email, passphrase, contact_number, user_address
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
  router.post("/", (req, res, next) => {
    try {
      // const [fields, values] = requestBodyToFieldsAndValues(req.body);
      // delete req.body["id"];
      const [fields, values] = [Object.keys(req.body), Object.values(req.body)];
      const customerRegisterQuery = `INSERT INTO user (${fields.toString()}) VALUES (${values.toString()})`;
  
      execQuery(customerRegisterQuery)
        .then((rows) => {
          res.status(200).json({ message: "Registration Successful" });
        })
        .catch((err) => {
          next(err);
        });
    } catch (err) {
      next(err);
    }
  });
  
  // update company (my profile) details - only for customers 
  // 
  // request format
  // // {
//   id : 123456
//   username: "john_doe",
//   user_type: "admin",
//   email: "john.doe@example.com",
//   passphrase: "securepassword",
//   contact_number: "1234567890",
//   user_address: "123 Main Street, Cityville"
// }
  // [Done]
  
  router.put("/", authenticateToken, (req, res, next) => {
    if(req.user_type == "customer"){
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
    
        const updateCustomerQuery = `UPDATE customer SET ${updateString} WHERE id='${id}';`;
    
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
  
  // delete customer - only accessbile for the customers
  //password should be checked to delete the profile
  // {
  //   "password": "user_password"
  // }
  // [Done]
  router.delete("/", authenticateToken, (req, res, next) => {
    if(req.user_type == "customer"){
      try {
        const deleteCustomerQuery = `DELETE FROM user WHERE id=${req.user_id} AND username =${req.username} AND passphrase=${req.body.password}`;
        execQuery(deleteCustomerQuery)
          .then((rows) => {
            res.status(200).json({ message: "User Account Deleted Successfully" });
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
