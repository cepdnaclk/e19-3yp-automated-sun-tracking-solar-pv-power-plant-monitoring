//initiation
// TODO - email OTP verification when user is adding the 
const express = require("express");
const router = express.Router();

//for json mapping
const {
  requestBodyToFieldsAndValues,
  objectKeysSnakeToCamel,
} = require("../utils/parse");

const { authenticateToken } = require("../middleware/auth");

// to execute and get the output of the queries easily
const { execQuery } = require("../database/database");

// View devices - for the admins - [Done]
router.get("/", authenticateToken, (req, res, next) => {
  if(req.user_type == "admin"){
    if (req.query.id) {
      execQuery(`SELECT id, model_name, model_number, assigned_company_id FROM device WHERE id=${req.query.id}`)
        .then((rows) => {
          data = objectKeysSnakeToCamel(rows[0]);
          res.status(200).json(data);
        })
        .catch((err) => {
          next(err);
        });
    } else {
      execQuery(`SELECT id, model_name, model_number, assigned_company_id FROM device`)
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

  //view devices - for companies - [Done]
  // request format { id: device_id}
  router.get("/", authenticateToken, (req, res, next) => {
    if(req.user_type == "company"){
      if (req.query.id) {
        execQuery(`SELECT id, model_name, model_number, description_, purchased_customer_email FROM device 
        WHERE id=${req.query.id} AND assigned_company_id=${req.user_id}`)
          .then((rows) => {
            data = objectKeysSnakeToCamel(rows[0]);
            res.status(200).json(data);
          })
          .catch((err) => {
            next(err);
          });
      } else {
        execQuery(`SELECT id, model_name, model_number, description_, purchased_customer_email FROM device 
        WHERE assigned_company_id=${req.user_id}`)
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

  //view devices - from customer's app
  router.get("/", authenticateToken, (req, res, next) => {
    if(req.user_type == "customer"){
      if (req.query.id) {
        execQuery(`SELECT device_name_by_customer, model_name, model_number, description_ 
                    FROM device WHERE assigned_customer_id=${req.user_id} AND id=${req.query.id}`)
          .then((rows) => {
            data = objectKeysSnakeToCamel(rows[0]);
            res.status(200).json(data);
          })
          .catch((err) => {
            next(err);
          });
      } else {
        execQuery(`SELECT device_name_by_customer, model_name, model_number, description_ 
        FROM device WHERE assigned_customer_id=${req.user_id}`)
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

  // view contact details of the device's company - Contact support
  // request format { id: device_id}
  router.get("/", authenticateToken, (req, res, next) => {
    if(req.user_type == "customer"){
      if (req.query.id) {
        execQuery(`SELECT username, email, contact_number, user_address 
                    FROM user WHERE id=
                    (SELECT assigned_company_id
                      FROM device WHERE id= ${req.query.id})`)	
          .then((rows) => {
            data = objectKeysSnakeToCamel(rows[0]);
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

  
  //add new device - only accessible for admins - [Done]
  //
  // request from frontend should be 
  //{
  // "model_name": "Example Company",
  // "model_number": "example@example.com",
  // "assigned_company_id" : xxxx
  //}
  router.post("/", (req, res, next) => {
    if(req.user_type == "admin"){
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
    } else {
      return res.sendStatus(401).json({ error: "Unauthorized" });
    }
    
  });

  
  //update device - [Done]
  
  // update the device details by the company - only from admin
  // {
  //   "model_name": "Example Model",
  // "model_number": "efwfr",
  // "assigned_company_id" : xxxx   
  // }

  router.put("/", (req, res, next) => {
    if(req.user_type == "admin"){
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
    
        const updateDeviceDataAdminQuery = `UPDATE device SET ${updateString} WHERE id='${id}';`;
    
        execQuery(updateDeviceDataAdminQuery)
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
    } else {
      return res.sendStatus(401).json({ error: "Unauthorized" });
    }
  }); 

  // adding necessary details by the company - only from company 
  // (edit device by company)
  // request format 
  // {
  //   id: 123456, //device id
  //   description: "123 Descrption",
  //   purchased_customer_email: "purchasedcustomer@gmail.com"  //company should add the customer's email when they are selling the device
  // }

  // This API updates anything that is given by the request format
  
  router.put("/", (req, res, next) => {
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
    
        const updateDeviceDataCompanyQuery = `UPDATE device SET ${updateString} WHERE id='${id}';`;
    
        execQuery(updateDeviceDataCompanyQuery)
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
    } else {
      return res.sendStatus(401).json({ error: "Unauthorized" });
    }
  });

  // Add device by customer to their app - [Done]
  //  { 
  //   id: 123456, //device id
  //    device_name_by_customer: "Roof 1 Home 1",
  //    device_latitude:"79.256598"
  //    device_longitude:"10.125689"
  // }

  router.put("/", authenticateToken, (req, res, next) => {
    if(req.user_type == "customer"){
      try {
        // set the devices's assigned customer id to user's id, 
        // used the purchased customer email to check whether the correct user is adding the device
        const assignCustomertoDeviceQuery = `UPDATE device SET 
                                              assigned_customer_id=${req.user_id}, 
                                              device_latitude=${req.body.device_latitude}, 
                                              device_longitude=${req.body.device_longitude} 
                                              WHERE id=${req.body.id} AND
                                              (SELECT purchased_customer_email FROM device 
                                              WHERE id=${req.body.id}) = ${req.email};`;
    
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
    } else {
      return res.sendStatus(401).json({ error: "Unauthorized" });
    }
    
  });
  
  // delete device - [Done]
  // only accessible for admins
  // admin has to add the password to delete this for security and UX reasons

  // request format
  // {
  //   "deviceId": 123,
  //   "password": "admin_password"
  // }

  router.delete("/", authenticateToken, (req, res, next) => {
    if(req.user_type == "admin"){
      try {
        const deleteDeviceQuery = `DELETE FROM device WHERE id=${req.body.deviceId} 
          AND (SELECT passphrase FROM admin
          WHERE admin.id=${req.user_id}) = ${req.body.password}`;
        execQuery(deleteDeviceQuery)
          .then((rows) => {
            res.status(200).json({ message: "Device Deleted Successfully" });
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
