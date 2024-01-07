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

// get companies - if request has an id, get the specific user, if not get all users 
// view all - only accessble for admins
// view one profile - only for the respctive company
// [Done]
//change req.query to req.body if necessary
router.get("/", (req, res, next) => {
    //only for the respective company
    if (req.query.id) {
      execQuery(`SELECT id, company_name, email, company_address, contact_no1, contact_no2 FROM company WHERE id=${req.query.id}`)
        .then((rows) => {
          data = objectKeysSnakeToCamel(rows[0]);
          res.status(200).json(data);
        })
        .catch((err) => {
          next(err);
        });
    } else {
      //for admins
      execQuery(`SELECT id, company_name, email, company_address, contact_no1, contact_no2 FROM company`)
        .then((rows) => {
          data = rows[0].map((row) => objectKeysSnakeToCamel(row));
          res.status(200).json(data);
        })
        .catch((err) => {
          next(err);
        });
    }
  });
  
  //add new company - only accessible for admins
  //[Done]
  // request from frontend should be 
  //{
  // "company_name": "Example Company",
  // "email": "example@example.com",
  // "passphrase": "securepassword",
  // "company_address": "123 Main Street, Cityville",
  // "contact_no1": "123-456-7890",
  // "contact_no2": "987-654-3210"
  // }
  router.post("/", (req, res, next) => {
    try {
      // const [fields, values] = requestBodyToFieldsAndValues(req.body);
      // delete req.body["id"];
      const [fields, values] = [Object.keys(req.body), Object.values(req.body)];
      const createCompanyQuery = `INSERT INTO company (${fields.toString()}) VALUES (${values.toString()})`;
  
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
  });
  
  //update company (my profile) details - only accessble companies to update their own details
  // [Done]
  // request format
  // {
  //   "id": 123,
  //   "company_name": "Example Company",
  //   "email": "example@example.com",
  //   "passphrase": "securepassword",
  //   "company_address": "123 Main Street, Cityville",
  //   "contact_no1": "123-456-7890",
  //   "contact_no2": "987-654-3210"
  // }
  
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
  
      const updateCompanyQuery = `UPDATE company SET ${updateString} WHERE id='${id}';`;
  
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
  });
  
  // delete companies
  // change to req.body.id if necessary
  // only accessible for admins

  // request format
  // {
  //   "companyId": 123,
  //   "adminId": 456,
  //   "password": "admin_password"
  // }

  router.delete("/", (req, res, next) => {
    try {
      const deleteCompanyQuery = `DELETE FROM company WHERE id=${req.body.deviceId} 
      AND ${req.body.password} = (SELECT passphrase FROM admin
                                  WHERE admin.id=${req.body.adminId}) `;

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
  });  

module.exports = router;
