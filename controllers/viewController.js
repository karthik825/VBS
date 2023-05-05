const fs = require('fs');
const Order = require('../models/ordersModel');
const dotenv = require('dotenv');
const path = require('path');
const PaymentManager = require('../models/paymentManagerModel');
const catchAsync = require('../utils/catchAsync');
dotenv.config({ path: `${__dirname}/config.env` });



exports.getMainPage = (req, res) => {
	res.status(200).render('base', {
		title: "VBS Shri Sai Academy"
	});
};

exports.getNumerologyPayment = catchAsync(async (req, res, next) => {
	let payment = await PaymentManager.find({
		"paymentAPICall": "NumerologySection"
	});
	payment = payment[0];
	res.status(200).render('payment', {
		title: "VBS Payments",
		subtitle: "Numerology Section",
		heading: payment.heading,
		topheading: payment.topheading,
		description: payment.description,
		amount: payment.amount
	});
});

exports.getBootcampPayment = catchAsync(async (req, res, next) => {
	let payment = await PaymentManager.find({
		"paymentAPICall": "SpokenBootcamp"
	});
	payment = payment[0];
	res.status(200).render('payment', {
		title: "VBS Payments",
		subtitle: "Spoken Bootcamp",
		heading: payment.heading,
		topheading: payment.topheading,
		description: payment.description,
		amount: payment.amount
	});
});

exports.getHoroscopyPayment = catchAsync(async (req, res, next) => {
	let payment = await PaymentManager.find({
		"paymentAPICall": "HoroscopySection"
	});
	payment = payment[0];
	res.status(200).render('payment', {
		title: "VBS Payments",
		subtitle: "Horoscopy Section",
		heading: payment.heading,
		topheading: payment.topheading,
		description: payment.description,
		amount: payment.amount
	});
})

exports.paymentSuccessful = catchAsync(async (req, res, next) => {
	const order_id = fs.readFileSync(path.join(__dirname, '../data/orderid.txt'), 'utf8');
	let paymentDocument = await Order.find({
		"order_id": order_id
	});
	fs.writeFileSync(path.join(__dirname, '../data/orderid.txt'), '');
	paymentDocument = paymentDocument[0].orderData;
	res.status(200).render('status', {
		title: "VBS Payments",
		subtitle: "Success",
		heading: 'Paid Succesfully',
		email: paymentDocument.get('email'),
		mobile: paymentDocument.get('contact'),
		status: paymentDocument.get('status'),
		amount: paymentDocument.get('amount') / 100,
		order_id: paymentDocument.get('order_id'),
		paid_to: process.env.MERCHANTNAME,
		merchant_mobile: process.env.MERCHANTMOBILE,
		merchant_id: process.env.MERCHANTID
	});
});

exports.paymentFailure = catchAsync(async (req, res, next) => {
	const order_id = fs.readFileSync(path.join(__dirname, '../data/orderid.txt'), 'utf8');
	let paymentDocument = await Order.find({
		"order_id": order_id
	});
	res.status(200).render('status', {
		title: "VBS Payments",
		subtitle: "Failure",
		heading: 'Transaction Failed',
		email: paymentDocument.email,
		mobile: paymentDocument.contact,
		status: paymentDocument.status,
		amount: paymentDocument.amount / 100,
		order_id: paymentDocument.order_id,
		paid_to: process.env.MERCHANTNAME,
		merchent_mobile: process.env.MERCHANTMOBILE,
		merchant_id: process.env.MERCHANTID

	})
})


exports.getNumerology = (req, res) => {
	res.status(200).render('numerology', {
		title: "VBS",
		subtitle: "Numerology"
	});
};
exports.getInstitute = (req, res) => {
	res.status(200).render('institute', {
		title: "SSCPS",
		subtitle: "Sri Sai Chaitanya"
	});
};

exports.getPrivacyPolicy = (req, res) => {
	res.status(200).render('privacypolicy', {
		title: "VBS Shri Sai Academy",
		subtitle: "Privacy Policy"
	});
}
exports.getTermsAndConditions = (req, res) => {
	res.status(200).render('terms', {
		title: "VBS Shri Sai Academy",
		subtitle: "Terms and Conditions"
	});
}
exports.getRefundPolicy = (req, res) => {
	res.status(200).render('refundpolicy', {
		title: "VBS Shri Sai Academy",
		subtitle: "Returns and Refunds Policy"
	});
}



















// qfpObcwHAFk