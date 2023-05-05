//REQUIRED NODE MODULES
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const app = express();

//REQUIRED CREATED MODULES
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorHandler');
const viewRouter = require('./routes/viewRouter');
const youBSRouter = require('./routes/youBSRouter');
const paymentManagerRouter = require('./routes/paymentRouter');
const ordersRouter = require('./routes/ordersRouter');
const mailerRouter = require('./routes/mailerRouter');
const razorpayRouter = require('./routes/razorpayRouter');
const spokenVideosRouter = require('./routes/spokenVideosRouter');
const navodayaVideosRouter = require('./routes/navodayaVideosRouter');

// app.use(morgan('dev'));
app.use(express.json());

//SETTING VIEW ENGINE
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//SERVING STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

//FOR RAZORPAY PAYMENT ID GENERATION
app.use(express.urlencoded({ extended: false }));

//ROUTES
app.use('/', viewRouter);
app.use('/', youBSRouter);
app.use('/api/v1/paymentManager', paymentManagerRouter);
app.use('/api/v1/orders', ordersRouter);
app.use('/api/v1/sendMail', mailerRouter);
app.use('/api/v1/razorpay', razorpayRouter);
app.use('/api/v1/spoken', spokenVideosRouter);
app.use('/api/v1/navodaya', navodayaVideosRouter);


//UNUSED ROUTES MIDDLEWARE
app.use('*', (req, res, next) => {
	next(new AppError(`can't find the ${req.originalUrl} on this server`, 404));
})

//GLOBAL ERROR HANDLING MIDDLEWARE
app.use(globalErrorHandler);

module.exports = app;

