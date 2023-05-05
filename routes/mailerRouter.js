const express = require('express');
const router = express.Router();
const mailer = require('../controllers/mailer');

router.post('/', mailer);

module.exports = router;