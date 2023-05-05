const Order = require('../models/ordersModel');
const catchAsync = require('../utils/catchAsync');

exports.createOrder = catchAsync(async (req, res, next) => {
	const newOrder = await Order.create(req.body);
	res.status(201).json({
		status: 'success',
		data: {
			orderDetails: newOrder
		}
	});
});

exports.getOrderDetails = catchAsync(async (req, res, next) => {
	const order = await Order.findById(req.params.id);
	res.status(200).json({
		status: 'success',
		data: {
			order
		}
	});
});