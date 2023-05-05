const express = require('express');
const router = express.Router();
const paymentManagerController = require('../controllers/paymentManagerController');

// router.route('/paymentStats').get(paymentController.getPaymentStats);
// router.route('/monthly-plan/:year').get(paymentController.getMonthlyPlan);

//FOR Development Purpose
router
	.route('/')
	.get(paymentManagerController.getAllPayments)
	.post(paymentManagerController.createPayment);
router.
	route('/:id')
	.get(paymentManagerController.getPayment)
	.patch(paymentManagerController.updatePayment)
	.delete(paymentManagerController.deletePayment);



module.exports = router;