const express = require("express");
const router = express.Router();

//router.use("/xxx", require("./routeS/xxx"));
router.use("/admin", require("./routes/admin"));
router.use("/companies", require("./routes/companies"));
router.use("/devices", require("./routes/devices"));
router.use("/customers", require("./routes/customers"));

module.exports = router;
