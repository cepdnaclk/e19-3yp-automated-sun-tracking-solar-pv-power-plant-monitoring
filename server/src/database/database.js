const mysql = require("mysql");
const fs = require("fs").promises; // Promises-based version of 'fs' module
const path = require("path");
const express = require('express');
const router = express.Router();

// connect database - add details here
const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST || "localhost",
  user: process.env.DATABASE_USER || "root",
  password: process.env.DATABASE_PASSWORD || "",
  database: process.env.DATABASE_DB || "HelioEye",
  port: process.env.DATABASE_PORT || 3306,
  charset: 'utf8mb4',
  multipleStatements: true,
  dateStrings: true, // automatically formats dates into yyyy-mm-dd
  timeout: 50000,
});

const connectToDB = async () => {
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      console.log("\x1b[32m%s\x1b[0m", "Connected to MySQL DB");
      resolve();
    });
  });
};



/*

const logFileModificationTime = async (filePath) => {
  const stats = await fs.stat(filePath);
  console.log(`File modified on: ${stats.mtime}`);
};

const executeScriptFromFile = async (filePath, operationName) => {
  console.log(`Starting ${operationName}... `);
  const script = await fs.readFile(filePath, "utf8");
  await execQuery(script);
  console.log(`${operationName} completed.`);
};

const initDatabase = async () => {
  try {

    await connectToDB();


    const schemaPath = path.join(__dirname, "schema.sql");
    await logFileModificationTime(schemaPath);
    await executeScriptFromFile(schemaPath, "DB Schema Creation");

    const dataPath = path.join(__dirname, "data.sql");
    await executeScriptFromFile(dataPath, "DB Population");

    const procedurePath = path.join(__dirname, "procedure.sql");
    await executeScriptFromFile(procedurePath, "Procedures Addition");

    const viewPath = path.join(__dirname, "view.sql");
    await executeScriptFromFile(viewPath, "Views Addition");
    
    // Read and sort the SQL script files in the folder
    const scriptFolder = path.join(__dirname, "scripts");
    const scriptFiles = await fs.readdir(scriptFolder);
    scriptFiles.sort();

    for (const scriptFile of scriptFiles) {
      if (scriptFile.endsWith(".sql")) {
        const scriptPath = path.join(scriptFolder, scriptFile);
        const scriptContent = await fs.readFile(scriptPath, "utf8");

        console.log(`Executing script: ${scriptFile}`);

        // Execute the SQL script
        await execQuery(scriptContent);

        console.log(`Script ${scriptFile} executed successfully.`);
      }
    }

    console.info("\x1b[32m%s\x1b[0m", "Database Initialization Done!");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

*/
const execQuery = (query, values = []) => {
    return new Promise((resolve, reject) => {
        connection.query(query, values, (err, rows) => {
            if (err) {
                console.error("Error executing query:", query, "Values:", values, "Error:", err);
                return reject(err);
            }
            resolve(rows);
        });
    });
};


// if ((process.env.NODE_ENV = "development")) initDatabase();


module.exports = { connection, execQuery };
