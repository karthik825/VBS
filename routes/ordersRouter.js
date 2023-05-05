const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/ordersController');

router
	.route('/')
	.post(OrderController.createOrder);
router
	.route('/:id')
	.get(OrderController.getOrderDetails);

module.exports = router;
