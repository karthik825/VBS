const fs = require("fs");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config({ path: `${__dirname}/../config.env` });

let card = fs.readFileSync(`${__dirname}/../templates/mailCard.html`);

module.exports = (req, res, next) => {
	const Data = req.body;
	card = card.toString().replace('{$NAME$}', Data.name).replace('{$EMAIL$}', Data.email).replace('{$MESSAGE$}', Data.message).replace('{$MOBILE$}', Data.mobile);
	let transporter = nodemailer.createTransport({
		host: process.env.HOST,
		port: 587,
		secure: false,
		auth: {
			user: process.env.USERNAME,
			pass: process.env.PASSWORD,
		},
	});
	transporter.sendMail({
		from: process.env.FROMADDRESS,
		to: process.env.TOADDRESS,
		subject: process.env.SUBJECT,
		html: card,
	}).then((message) => {
		res.status(200).json({
			status: 'success',
			data: message
		});
	}).catch((err) => {
		console.log('SOMETHING WENT REALLY WRONG ERRORR! 💥💥');
	})
}
