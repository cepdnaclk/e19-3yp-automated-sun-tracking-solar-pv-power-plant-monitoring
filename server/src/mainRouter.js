const express = require("express");
const router = express.Router();

router.use("/xxx", require("./route/xxx"));


module.exports = router