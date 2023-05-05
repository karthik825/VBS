const express = require('express');
const router = express.Router();
const RazorpayController = require('../controllers/razorpayController');


router.post('/order', RazorpayController.createOrder);
router.get('/status')
router.post('/is-order-complete', RazorpayController.finishOrder);

module.exports = router;