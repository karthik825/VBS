const mongoose = require('mongoose');

const paymentManagerSchema = new mongoose.Schema({
	paymentAPICall: {
		type: String,
		unique: true,
		required: [true, 'Payment Schema must have a payment API call'],
	},
	heading: {
		type: String,
		required: [true, 'Payment Schema must have a heading'],
	},
	topheading: {
		type: String,
		required: [true, 'Payment Schema must have a topheading'],
	},
	description: String,
	amount: {
		type: Number,
		required: [true, 'Payment Schema must have a Amount']
	},
});

const PaymentManager = mongoose.model('PaymentManager', paymentManagerSchema);

module.exports = PaymentManager;

// DOCUMENT MIDDLEWARE (SAVE HOOK) runs before .save and .create not .insertMany
// paymentSchema.pre('save', function (next) {
// 	console.log(this);
// 	next();
// })
// paymentSchema.post('save', function (next) {
// 	('Hey from Post save hook 👋🏻');
// 	next();
// })

//QUERY MIDDLEWARE only works for find not for findone or findOneanddelete 
//We need to create another functions seperate for them(hooks) or else can use regular expression like /^find/
// paymentSchema.pre('find', function (next) {
// 	this.find({
// 		secretKey: { $ne: true },
// 	});
// 	next();
// })

//AGGREGATION MIDDLEWARE
// paymentSchema.pre('aggregation', function (next) {
//   this.pipeline().unshift({
// 		$match: {
// 			amount: {
// 				$gte: 50,
// 			}
// 		}
// 	})
// })