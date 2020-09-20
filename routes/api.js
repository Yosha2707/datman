var express = require("express");
var paymentRouter = require("./payment");

var app = express();

app.use("/payment/", paymentRouter);

module.exports = app;