const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
	order_id: {
		type: String,
		required: [true, 'orderschema must contain order id']
	},
	orderData: {
		type: Map,
		required: [true, 'orderschema must contain order Data']
	}
});

const Order = mongoose.model('Order', ordersSchema);

module.exports = Order;