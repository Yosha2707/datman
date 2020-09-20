var express = require("express");
const PaymentController = require("../controllers/PaymentController");

var router = express.Router();

router.post("/", PaymentController.payment);


module.exports = router;