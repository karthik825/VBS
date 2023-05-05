const fs = require('fs');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const SpokenVideos = require('../models/spokenVideosModel');
const NavodayaVideos = require('../models/navodayaVideosModel');
const PaymentManager = require('../models/paymentManagerModel');

const app = express();

app.use(express.json());


dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
}).then(con => {
	console.log('DB Connection made successfull');
});


const importDataFromDB = async (Model, file) => {
	const query = await Model.find();
	fs.writeFile(`${__dirname}/${file}`, JSON.stringify(query), (err) => {
		if (err) {
			return console.log(err);
		}
		console.log(`The ${Model} was saved to ${file}!`);
	});
	process.exit(1);
}

const exportDataToDB = async (Model, file) => {
	fs.readFile(`${__dirname}/${file}`, 'utf-8', async (err, data) => {
		if (err) {
			console.log(`Error in Reading the File ${file}`);
		} else {
			try {
				data = JSON.parse(data);
				await Model.create(data);
				console.log(`The Data in DB  is created successfully from ${file}!`);
				process.exit(1);
			} catch (err) {
				console.log(err);
			}
		}
	});
}

const deleteDataInDB = async (Model) => {
	try {
		await Model.deleteMany();
		console.log(`The Data in DB  is deleted successfully!`);
		process.exit(1);
	} catch (err) {
		console.log(err);
	}
}

const captureTerminalCommands = () => {
	if (process.argv[2] === '--import-spoken') {
		importDataFromDB(SpokenVideos, 'spokenVideos.json');
	} else if (process.argv[2] === '--export-spoken') {
		exportDataToDB(SpokenVideos, 'spokenVideos.json');
	} else if (process.argv[2] === '--delete-spoken') {
		deleteDataInDB(SpokenVideos);
	}

	if (process.argv[2] === '--import-navodaya') {
		importDataFromDB(NavodayaVideos, 'navodayaVideos.json');
	} else if (process.argv[2] === '--export-navodaya') {
		exportDataToDB(NavodayaVideos, 'navodayaVideos.json');
	} else if (process.argv[2] === '--delete-navodaya') {
		deleteDataInDB(NavodayaVideos);
	}

	if (process.argv[2] === '--import-paymentManager') {
		importDataFromDB(PaymentManager, 'paymentManager.json');
	} else if (process.argv[2] === '--export-paymentManager') {
		exportDataToDB(PaymentManager, 'paymentManager.json');
	} else if (process.argv[2] === '--delete-paymentManager') {
		deleteDataInDB(PaymentManager);
	}

}


captureTerminalCommands();

const port = process.env.PORT || 3000;
app.listen(4000, () => {
	console.log(`Vegur's MacBook listening your request from port ${port}`);
});

