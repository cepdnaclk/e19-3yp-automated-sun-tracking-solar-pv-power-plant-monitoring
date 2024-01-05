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

// get users
router.get("/", (req, res, next) => {
    if (req.query.id) {
      execQuery(`SELECT * FROM member WHERE id=${req.query.id}`)
        .then((rows) => {
          data = objectKeysSnakeToCamel(rows[0]);
          res.status(200).json(data);
        })
        .catch((err) => {
          next(err);
        });
    } else {
      execQuery("CALL GetAllMembers()")
        .then((rows) => {
          data = rows[0].map((row) => objectKeysSnakeToCamel(row));
          res.status(200).json(data);
        })
        .catch((err) => {
          next(err);
        });
    }
  });
  
  //add new member
  router.post("/", (req, res, next) => {
    try {
      // const [fields, values] = requestBodyToFieldsAndValues(req.body);
      delete req.body["id"];
      const [fields, values] = [Object.keys(req.body), Object.values(req.body)];
      const memberRegistrationQuery = `INSERT INTO member (${fields.toString()}) VALUES (${values.toString()})`;
  
      execQuery(memberRegistrationQuery)
        .then((rows) => {
          res.status(200).json({ message: "New Member created successfully" });
        })
        .catch((err) => {
          next(err);
        });
    } catch (err) {
      next(err);
    }
  });
  
  //update member details
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
  
      const updateMemberQuery = `UPDATE member SET ${updateString} WHERE id='${id}';`;
  
      execQuery(updateMemberQuery)
        .then((rows) => {
          res
            .status(200)
            .json({ message: "Member details updated successfully" });
        })
        .catch((err) => {
          next(err);
        });
    } catch (err) {
      next(err);
    }
  });
  
  //delete members - access only for LCVP PM
  router.delete("/", (req, res, next) => {
    try {
      const deleteMemberQuery = `DELETE FROM x WHERE id=${req.query.x}`;
      execQuery(deleteMemberQuery)
        .then((rows) => {
          res.status(200).json({ message: "delete request" });
        })
        .catch((err) => {
          next(err);
        });
    } catch (err) {
      next(err);
    }
  });
  

module.exports = router;
