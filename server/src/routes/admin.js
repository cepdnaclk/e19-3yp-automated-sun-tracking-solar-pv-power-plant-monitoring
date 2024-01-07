//TBD item in delete API 
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

//All these functions (APIs) are only accessible for admins

// get users - if request has an id, get the specific user, if not get all users 
// [Done]
//change req.query to req.body if necessary
router.get("/", (req, res, next) => {
    if (req.query.id) {
      execQuery(`SELECT id, admin_name, email FROM admins WHERE id=${req.query.id}`)
        .then((rows) => {
          data = objectKeysSnakeToCamel(rows[0]);
          res.status(200).json(data);
        })
        .catch((err) => {
          next(err);
        });
    } else {
      execQuery(`SELECT id, admin_name, email FROM admins`)
        .then((rows) => {
          data = rows[0].map((row) => objectKeysSnakeToCamel(row));
          res.status(200).json(data);
        })
        .catch((err) => {
          next(err);
        });
    }
  });
  
  //add new admin - [Done]
  // request from frontend should be 
  //{
  //   "admin_name": "New Admin Name",
  //   "email": "newadmin@example.com",
  //   "passphrase": "newpassphrase"
  // }
  router.post("/", (req, res, next) => {
    try {
      // const [fields, values] = requestBodyToFieldsAndValues(req.body);
      // delete req.body["id"];
      const [fields, values] = [Object.keys(req.body), Object.values(req.body)];
      const addAdmins = `INSERT INTO admins (${fields.toString()}) VALUES (${values.toString()})`;
  
      execQuery(addAdmins)
        .then((rows) => {
          res.status(200).json({ message: "New Admin created successfully" });
        })
        .catch((err) => {
          next(err);
        });
    } catch (err) {
      next(err);
    }
  });
  
  //update admin (my profile) details - [Done]
  // request format
  // {
  //   "id": 123,
  //   "admin_name": "New Admin Name",
  //   "email": "newadmin@example.com",
  //   "passphrase": "newpassphrase"
  // }
  router.put("/", (req, res, next) => {
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
  
      const updateMemberQuery = `UPDATE admins SET ${updateString} WHERE id='${id}';`;
  
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
  });
  
  //delete members - [Done]
  // change to req.body.id if necessary
  // TBD - admin delete only for primary super admin (id = 001) ?
  router.delete("/", (req, res, next) => {
    try {
      const deleteAdminQuery = `DELETE FROM admins WHERE id=${req.query.id}`;
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
  });
  

module.exports = router;
