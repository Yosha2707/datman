const Payment = require("../models/PaymentModel");
const { body,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");



/**
 * @api {post} /api/payment Add Payment
 * @apiName Payment
 * @apiGroup Payment
 *
 * @apiParam {String} client_id This is Client ID.
 * @apiParam {String} ref_no This is Reference Number.
 * @apiParam {Number} amount This is Total Amount.
 * @apiParam {String} currency This is Currency i.e USD.
 * @apiParam {Number} vat This is value added tax in percentage i.e 5.
 * @apiParam {Number} service_tax This is service tax in percentage i.e 10.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": 1,
 *       "message": "Payment Done Successfully.",
	*     "data": {
			"_id": "",
			"client_id": "CLIENT ID",
			"ref_no": "REFRENCE NUMBER",
			"total_amount": "TOTAL AMOUNT",
			"datman_amount": "AMOUNT EARNED BY DATMAN",
			"client_amount": "AMOUNT EARNED BY CLIENT",
			"vat": "VALUE ADDED TAX AMOUNT",
			"service_tax": "SERVICE TAX AMOUNT",
			"currency": "USD",
			"createdAt": "CREATED DATE TIME",
			"updatedAt": "UPDATED DATE TIME",
			"__v": 0
		}
 *     }
 */
exports.payment = [
	body("client_id", "Client ID must not be empty.").isLength({ min: 1 }).trim(),
	body("amount", "Amount must not be empty and should be a number.").isNumeric(),
	body("currency", "Currency must not be empty.").isLength({ min: 1 }).trim(),
	body("ref_no", "ISBN must not be empty").isLength({ min: 1 }).trim().custom((value,{req}) => {
		return Payment.findOne({ref_no : value}).then(pay => {
			if (pay) {
				return Promise.reject("Payment with this ref no already exist.");
			}
		});
	}),
	sanitizeBody("*").escape(),
	(req, res) => {
		try {
			const errors = validationResult(req);
			var vat_value = 0;
			var service_tax_value = 0;
			var amount = req.body.amount
			if(req.body.vat && isNaN(req.body.vat) == false){ //checks if vat in req body and is it an number
				vat_value = amount * req.body.vat/100; //calculate vat amount 
			}

			if(req.body.service_tax && isNaN(req.body.service_tax) == false){ //checks if service tax in req body and is it an number
				service_tax_value = amount * req.body.service_tax/100; //calculate service tax
			}
			var datman_amount = (amount * 2.4)/100 //deducting 2.4 percent from amount paid my customer for datman
			var client_amount = amount - datman_amount + vat_value + service_tax_value;

			var payment = new Payment(
				{ 	client_id: req.body.client_id,
					ref_no: req.body.ref_no,
					total_amount: amount,
					datman_amount: datman_amount,
					client_amount: client_amount,
					vat: vat_value, //we save the calculated vat tax in db
					service_tax: service_tax_value, //we save calculated service tax in db
					currency: req.body.currency
				});

			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}
			else {
				//Save payment.
				payment.save(function (err) {
					if (err) { return apiResponse.ErrorResponse(res, err); }
					let paymentData = new Payment(payment);
					return apiResponse.successResponseWithData(res,"Payment Done Successfully.", paymentData);
				});
			}
		} catch (err) {
			//throw error in json response with status 500. 
			console.log(err);
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

