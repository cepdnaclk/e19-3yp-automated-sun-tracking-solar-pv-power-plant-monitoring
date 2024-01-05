//main server of the app

// get libraries
const express = require("express");

//initialize app
const app = express();
const port = 8081;

//middleware setup

//sample app api
app.get("/", (req,res) => {

    console.log("started");
    res.send("Sample App");
})

//user authentication
app.use("/x", require("./src/route/login")); //edit this accordingly

//jwt authentication
const { authenticateToken } = require("./src/middleware/auth");

//main router
app.use(require("./src/mainRouter"));

//database connection and query setup



//start server
app.listen(port, () => {
    console.log(`The app listening on port ${port}`)
});