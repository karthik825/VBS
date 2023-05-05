const Razorpay = require('razorpay');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const Order = require('../models/ordersModel');
const catchAsync = require('../utils/catchAsync');
dotenv.config({ path: `${__dirname}/config.env` });


const razorpay = new Razorpay({
	key_id: process.env.MERCHANTKEYID,
	key_secret: process.env.MERCHANTKEYSECRET,
});

exports.createOrder = catchAsync(async (req, res, next) => {
	let options = {
		// amount: 100,
		amount: req.body[1] * 100,
		currency: "INR",
	}
	razorpay.orders.create(options, (err, order) => {
		res.json(order)
	});
})

exports.finishOrder = catchAsync(async (req, res, next) => {
	razorpay.payments.fetch(req.body.razorpay_payment_id).then(async (paymentDocument) => {
		// STORING DETAILS IN DATA BASE
		const details = {
			order_id: paymentDocument.order_id,
			orderData: paymentDocument
		}
		await Order.create(details);
		fs.writeFileSync(path.join(__dirname, '../data/orderid.txt'), paymentDocument.order_id);
		if (paymentDocument.status == 'captured') {
			res.redirect('/paymentSuccessful');
		} else {
			res.redirect('/paymentFailure');
		}
	})
})
exports.paymentDetails;
