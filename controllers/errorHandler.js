const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
	const message = `Invalid ${err.path}: ${err.value}`;
	return (new AppError(message, 400));
}

const handleDuplicateFieldsErrorDB = (err) => {
	const value = err.keyValue[Object.keys(err.keyValue)[0]];
	const message = `Duplicate field value: ${value}. Please use another value!`;
	return (new AppError(message, 400));
}

const handleValidationErrorDB = (err) => {
	const errors = Object.values(err.errors).map(el => el.message);
	const message = `Invalid Input Data: ${errors.join('. ')}`;
	return (new AppError(message, 400));
}

const sendErrorDev = (err, res) => {
	res.status(err.statusCode).json({
		status: err.status,
		error: err,
		message: err.message,
		stack: err.stack
	});
}
const sendErrorProd = (err, res) => {
	//Operational Error + 404 for animation page not found
	if (err.statusCode === 404) {
		res.status(404).render('404', {
			title: "VBS",
			subtitle: '404 Error'
		});
	}
	//Operational Error 
	else if (err.isOperational) {
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		});
	}
	//Programming or unknown error
	else {
		//1) Log error
		console.error('ERROR!💥💥💥', err);
		//2) sending error response
		res.status(500).json({
			status: 'error',
			message: 'Something went wrong :('
		})
	}
}
module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';
	if (process.env.NODE_ENV === 'development') {
		sendErrorDev(err, res);
	} else if (process.env.NODE_ENV === 'production') {
		let error = { ...err };
		if (err.name === 'CastError') error = handleCastErrorDB(error);
		if (err.code === 11000) error = handleDuplicateFieldsErrorDB(error);
		if (err.name === 'validationError') error = handleValidationErrorDB(error);
		sendErrorProd(error, res);
	}
};