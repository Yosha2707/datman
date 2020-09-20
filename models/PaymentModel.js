var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var PaymentSchema = new Schema({
	client_id: {type: String, required: true},
	ref_no: {type: String, required: true},
	total_amount: {type: Number, required: true},
	datman_amount: {type: Number, required: true},
	client_amount: {type: Number, required: true},
	vat: {type: Number, required: false},
	service_tax: {type: Number, required: false},
	currency: { type: String, required: true },
}, {timestamps: true});

module.exports = mongoose.model("Payment", PaymentSchema);