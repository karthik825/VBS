const mongoose = require('mongoose');
const dotenv = require('dotenv');

//HANDLING PROGRAMMATIC ERRORS
process.on('uncaughtException', (err) => {
	console.log('UNCAUGHT EXCEPTION!💥💥  Shutting down');
	console.log(err.name, err.message);
	process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);


//CONNECTING TO MONGODB
mongoose.connect(DB, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
}).then(con => {
	console.log('DB Connection made successfull');
});


//LISTENING THE REQUESTS
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
	console.log(`Vegur's MacBook listening your request from port ${port}`);
});


//HANDLING THE PROMISE REJECTIONS
process.on('unhandledRejection', (err) => {
	console.log('UNHANDLED REJECTION!💥💥  Shutting down');
	console.log(err.name, err.message);
	server.close(() => {
		process.exit(1);
	});
});

