const errorHandler = (err, req, res, next) => {
  // If headers have already been sent, we can't send another response
  if (res.headersSent) {
    console.error(err); // Log the error
    return next(err); // Pass the error to the next middleware
  }

  // ========== JWT Authentication Errors ==========
  if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError")
    return res.status(401).send("Unauthorized");

  // ========== SQL Errors ==========
  if (err.code === "ER_DUP_ENTRY")
    return res.status(409).send("Duplicate Entry");
  if (err.code === "ER_NO_DEFAULT_FOR_FIELD")
    return res.status(400).send("Missing Form Data");
  // ========== Other Errors ==========
  // else return res.status(500).send("Internal Server Error");
};

module.exports = errorHandler;