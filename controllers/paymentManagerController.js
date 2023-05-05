const PaymentManager = require('../models/paymentManagerModel');
const APIFeatures = require('../utils/apifeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');



exports.getAllPayments = catchAsync(async (req, res, next) => {
	const features = new APIFeatures(PaymentManager.find(), req.query)
		.filter()
		.sort()
		.limitFields()
		.paginate();
	const payments = await features.query;
	res.status(200).json({
		status: 'success',
		results: payments.length,
		data: {
			payments
		}
	});
});

exports.createPayment = catchAsync(async (req, res, next) => {
	const newPayment = await PaymentManager.create(req.body);
	res.status(201).json({
		status: 'success',
		data: {
			tour: newPayment,
		}
	});
});

exports.getPayment = catchAsync(async (req, res, next) => {
	const payment = await PaymentManager.findById(req.params.id);
	if (!payment) {
		return next(new AppError('No Payment Found with that ID', 404));
	}
	res.status(200).json({
		status: "success",
		data: {
			payment
		}
	});
});

exports.updatePayment = catchAsync(async (req, res, next) => {
	const payment = await PaymentManager.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true
	});
	if (!payment) {
		return next(new AppError('No Payment Found with that ID', 404));
	}
	res.status(200).json({
		status: "success",
		data: {
			payment
		}
	});
});

exports.deletePayment = catchAsync(async (req, res, next) => {
	const payment = await PaymentManager.findByIdAndDelete(req.params.id);
	if (!payment) {
		return next(new AppError('No Payment Found with that ID', 404));
	}
	res.status(204).json({
		status: "success",
		data: {
			payment: null,
		}
	});
});


//JUST FOR LEARNING PURPOSE
//About Pipeline Matching, Grouping and Sorting
// exports.getPaymentStats = async (req, res) => {
// 	try {
// 		const stats = await Payment.aggregate([
// 			{
// 				$match: { amount: { $gte: 500 } }
// 			},
// 			{
// 				$group: {
// 					_id: null,
// 					numPayment: {
// 						$sum: 1
// 					},
// 					sumOfPayments: {
// 						$sum: '$amount'
// 					},
// 					avgAmount: {
// 						$avg: '$amount'
// 					},
// 					minAmount: {
// 						$min: '$amount'
// 					},
// 					maxAmount: {
// 						$max: '$amount'
// 					}
// 				}
// 			},
// 			{
// 				$sort: {
// 					amount: 1  // 1 for ASCENDING AND -1 FOR DESCENDING
// 				}
// 			}
// 		]);
// 		res.status(200).json({
// 			status: "success",
// 			data: {
// 				stats
// 			}
// 		});
// 	} catch (err) {
// 		res.status(404).json({
// 			status: "error",
// 			message: err
// 		})
// 	}
// }

// //About Pipeline Unwinding, Limiting and etc...
// exports.getMonthlyPlan = async (req, res) => {
// 	try {

// 		const year = req.params.year * 1;
// 		const plan = Payment.aggregate([
// 			{
// 				$unwind: '$amount'
// 			},
// 			{
// 				$match: {
// 					amount: {
// 						$gte: 500
// 					}
// 				}
// 			},
// 			{
// 				$group: {
// 					_id: null,
// 				}
// 			},
// 			{
// 				$project: {
// 					amount: 0,
// 				}
// 			}
// 		]);
// 		res.status(200).json({
// 			status: "success",
// 			data: {
// 				plan
// 			}
// 		})
// 	} catch (err) {
// 		res.status(404).json({
// 			status: "error",
// 			message: err
// 		})
// 	}
// }