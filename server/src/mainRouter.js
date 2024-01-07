const express = require("express");
const router = express.Router();

router.use("/xxx", require("./routeS/xxx"));
router.use("/admin", require("./routes/admin"));


module.exports = router