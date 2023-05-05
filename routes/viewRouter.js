const express = require('express');
const router = express.Router();
const ViewController = require('../controllers/viewController');

router.get('/', ViewController.getMainPage);
router.get('/privacypolicy', ViewController.getPrivacyPolicy);
router.get('/termsandconditions', ViewController.getTermsAndConditions);
router.get('/refundpolicy', ViewController.getRefundPolicy);
router.get('/bootcampPayment', ViewController.getBootcampPayment);
router.get('/numerologyPayment', ViewController.getNumerologyPayment);
router.get('/horoscopyPayment', ViewController.getHoroscopyPayment);
router.get('/paymentSuccessful', ViewController.paymentSuccessful);
router.get('/paymentFailure', ViewController.paymentFailure);

module.exports = router;