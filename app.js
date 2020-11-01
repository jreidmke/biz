const { json } = require("express");
const express = require("express");
const app = express();

app.use(json());
const ExpressError = require("./expressError");

const coRoutes = require('./routes/companies');
app.use("/companies", coRoutes);
const inRoutes = require('./routes/invoices');
app.use("/invoices", inRoutes);

/** 404 handler */
app.use(function (req, res, next) {
    const err = new ExpressError("Not Found", 404);
    return next(err);
  });

  /** general error handler */
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);

    return res.json({
      error: err,
      message: err.message
    });
  });

  module.exports = app;