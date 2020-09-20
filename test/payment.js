const { chai, server, should } = require("./testConfig");
const PaymentModel = require("../models/PaymentModel");

/**
 * Test cases to test payment 
 * Covered Routes:
 * (1) Payment
 */

describe("Payment", () => {
	//Before each test we empty the database
	before((done) => { 
		PaymentModel.deleteMany({}, (err) => { 
			done();           
		});        
	});

	// Prepare data for testing
	const TestData = {
		"client_id":"xdhcfruklferltuhsixjaw",
		"amount": 100,
		"currency": "USD",
		"ref_no": "1234"
	};

	/*
  * Test the /POST route
  */
	describe("/POST Payment", () => {
		it("It should send validation error for Payment", (done) => {
			chai.request(server)
				.post("/api/payment")
				.send({
					"client_id": "dfxsdcfsjeflx",
					"amount": "fg",
					"currency": "",
					"ref_no": ""
				})
				.end((err, res) => {
					res.should.have.status(400);
					done();
				});
		});
	});

	/*
  * Test the /POST route
  */
	describe("/POST Payment", () => {
		it("It should add payment", (done) => {
			chai.request(server)
				.post("/api/payment")
				.send(TestData)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property("message").eql("Payment Done Successfully.");
					done();
				});
		});
	});

	describe("/POST Payment", () => {
		it("It should send validation error for refrence id", (done) => {
			chai.request(server)
				.post("/api/payment")
				.send(TestData)
				.end((err, res) => {
					res.should.have.status(400);
					done();
				});
		});
	});
});