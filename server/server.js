//main server of the app

// get libraries
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

//initialize app
const app = express();
// const port = process.env.PORT || 8081;
const port = 8081;

app.use(cors());
app.use(express.json()); // for parsing application/json

///upload file part
// Set up storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'src', 'public'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  }
});


const upload = multer({ storage: storage });

// File upload route
app.post('/upload', upload.single('userManual'), (req, res) => {
  res.send('User Manual uploaded successfully');
});

///////////
//end of upload file part

//middleware setup

//sample app api
// app.get("/", (req,res) => {

//     console.log("started");
//     res.send("Sample App");
// })

//user authentication
app.use("/login", require("./src/routes/login")); //edit this accordingly

// jwt authentication
// const { authenticateToken } = require("./src/middleware/auth");
// app.use(authenticateToken)

//main router
app.use("/", require("./src/mainRouter"));

//database connection and query setup


// error logging
app.use(require("./src/middleware/errorLogger"));

// error response handling
app.use(require("./src/middleware/errorHandler"));

//start server
app.listen(port, () => {
  console.log(`The app listening on port ${port}`);
});
