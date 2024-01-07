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

// get customers - if request has an id, get the specific user, if not get all users 
// only accessible for admins
// Not done
//change req.query to req.body if necessary

// -------------remanining-----------
router.get("/", (req, res, next) => {
    if (req.query.id) {
      execQuery(`SELECT id, customer_name, email, customer_address, customer_contact FROM customer WHERE id=${req.query.id}`)
        .then((rows) => {
          data = objectKeysSnakeToCamel(rows[0]);
          res.status(200).json(data);
        })
        .catch((err) => {
          next(err);
        });
    } else {
      execQuery(`SELECT id, customer_name, email, customer_address, customer_contact FROM customer`)
        .then((rows) => {
          data = rows[0].map((row) => objectKeysSnakeToCamel(row));
          res.status(200).json(data);
        })
        .catch((err) => {
          next(err);
        });
    }
  });
  
  //add new customer - only accessible for customers and customer registration
  // [Done]
  // request from frontend should be 
  // {
  // "customer_name": "Example Company",
  // "email": "example@example.com",
  // "passphrase": "securepassword",
  // "customer_address": "123 Main Street, Cityville",
  // "customer_contact": "123-456-7890"
  // }
  router.post("/", (req, res, next) => {
    try {
      // const [fields, values] = requestBodyToFieldsAndValues(req.body);
      // delete req.body["id"];
      const [fields, values] = [Object.keys(req.body), Object.values(req.body)];
      const customerRegisterQuery = `INSERT INTO customer (${fields.toString()}) VALUES (${values.toString()})`;
  
      execQuery(customerRegisterQuery)
        .then((rows) => {
          res.status(200).json({ message: "New Customer created successfully" });
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
  // {
  //   "id": 123,
  //   "customer_name": "Example Company",
  // "email": "example@example.com",
  // "passphrase": "securepassword",
  // "customer_address": "123 Main Street, Cityville",
  // "customer_contact": "123-456-7890"
  // }
  // [Done]
  
  router.put("/", (req, res, next) => {
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
  });
  
  // delete customer - only accessbile for the customers
  //password should be checked to delete the profile
  // {
  //   "id": 123,
  //   "password": "user_password"
  // }
  // [Done]
  router.delete("/", (req, res, next) => {
    try {
      const deleteCustomerQuery = `DELETE FROM customer WHERE id=${req.body.id} AND passphrase=${req.body.password}`;
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
  });
  

module.exports = router;
