//initiation
// TODO - email OTP verification when user is adding the 
const express = require("express");
const router = express.Router();

//for json mapping
const {
  requestBodyToFieldsAndValues,
  objectKeysSnakeToCamel,
} = require("../utils/parse");

// to execute and get the output of the queries easily
const { execQuery } = require("../database/database");

// View devices - for the admins
// 
//change req.query to req.body if necessary

router.get("/", (req, res, next) => {
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

  //view devices - for companies
  //view devices - for customers
  
  //add new device - only accessible for admins - [Done]
  //
  // request from frontend should be 
  //{
  // "model_name": "Example Company",
  // "model_number": "example@example.com",
  // "assigned_company_id" : xxxx
  //}
  router.post("/", (req, res, next) => {
    try {
      // const [fields, values] = requestBodyToFieldsAndValues(req.body);
      const [fields, values] = [Object.keys(req.body), Object.values(req.body)];
      const createdeviceQuery = `INSERT INTO device (${fields.toString()}) VALUES (${values.toString()})`;
  
      execQuery(createdeviceQuery)
        .then((rows) => {
          res.status(200).json({ message: "New Device created successfully" });
        })
        .catch((err) => {
          next(err);
        });
    } catch (err) {
      next(err);
    }
  });

  
  //update device - [Done]
  
  // update the device details by the company - only from admin
  // {
  //   "model_name": "Example Company",
  // "model_number": "example@example.com",
  // "assigned_company_id" : xxxx   
  // }
  
  // adding necessary details by the company request format - only from company
  // {
  //   id: 123456, //device id
  //   dimension: "11.2 x 34.5",
  //   description: "123 Descrption",
  //   purchased_customer_email: "purchasedcustomer@gmail.com"  //company should add the customer's email when they are selling the device
  // }

  // This API updates anything that is given by the request format
  
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
  
      const updateDeviceDataQuery = `UPDATE device SET ${updateString} WHERE id='${id}';`;
  
      execQuery(updateDeviceDataQuery)
        .then((rows) => {
          res
            .status(200)
            .json({ message: "Device Specifications updated successfully" });
        })
        .catch((err) => {
          next(err);
        });
    } catch (err) {
      next(err);
    }
  });

  // assigning a customer to the device - only from customer
  //  { 
  //   "id": 123456, //device id
  //   "email": "useremail@gmail.com" //customer email
  //   "assigned_customer_id":654321  
  //    device_location:"79.256598 10.125689"
  // }

  router.put("/", (req, res, next) => {
    try {
      // const id = req.body["id"];
      // const email = req.body["email"];
      // delete req.body["id"];
      // delete req.body["email"]; //id and email used in the UPDATE query, not needed in the update string
      // const [fields, values] = [Object.keys(req.body), Object.values(req.body)];
      // // Combine the two arrays into a single array.
      // let updateString = "";
  
      // for (let i = 0; i < fields.length; i++) {
      //   updateString += fields[i] + " = ";
      //   updateString += `'${values[i]}', `;
      // }
  
      // // remove last trailling ", "
      // updateString = updateString.substring(0, updateString.length - 2);
  
      // set the devices's assigned customer id to user's id, 
      // used the purchased customer email to check whether the correct user is adding the device
      const assignCustomertoDeviceQuery = `UPDATE device SET assigned_customer_id=${req.body.assigned_customer_id} WHERE id=${req.body.id} AND
      (SELECT purchased_customer_email FROM device WHERE id=${req.body.id}) = ${req.body.email};`;
  
      execQuery(assignCustomertoDeviceQuery)
        .then((rows) => {
          res
            .status(200)
            .json({ message: "Device Specifications updated successfully" });
        })
        .catch((err) => {
          next(err);
        });
    } catch (err) {
      next(err);
    }
  });
  
  // delete device - [Done]
  // only accessible for admins
  // admin has to add the password to delete this for security and UX reasons

  // request format
  // {
  //   "deviceId": 123,
  //   "adminId": 456,
  //   "password": "admin_password"
  // }

  router.delete("/", (req, res, next) => {
    try {
      const deleteDeviceQuery = `DELETE FROM device WHERE id=${req.body.deviceId} AND ${req.body.password} = (SELECT passphrase FROM admin
        WHERE admin.id=${req.body.adminId})`;
      execQuery(deleteDeviceQuery)
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
