//main server of the app

// get libraries
const express = require("express");
const cors = require("cors");

//initialize app
const app = express();
const port = 8081;

app.use(cors());

app.use(express.json()); // for parsing application/json

//middleware setup

//sample app api
// app.get("/", (req,res) => {

//     console.log("started");
//     res.send("Sample App");
// })

//user authentication
app.use("/api/login", require("./src/routes/login")); //edit this accordingly

// jwt authentication
const { authenticateToken } = require("./src/middleware/auth");
app.use(authenticateToken)

//main router
app.use("/api", require("./src/mainRouter"));

//database connection and query setup


// error logging
app.use(require("./src/middleware/errorLogger"));

// error response handling
app.use(require("./src/middleware/errorHandler"));

//start server
app.listen(port, () => {
  console.log(`The app listening on port ${port}`);
});
