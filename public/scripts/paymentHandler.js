const payButton = document.getElementById('paybutton');
const heading = document.querySelector('.section-heading > h1').innerHTML;
const amount = payButton.innerHTML.split(' ');

axios.post('/api/v1/razorpay/order', amount).then((info) => {
	var options = {
		"key": "rzp_live_w1SVn0dFNbiMRg", // Enter the Key ID generated from the Dashboard
		"name": "VBS Shri Sai Academy",
		"description": heading,
		"image": "https://raw.githubusercontent.com/ShriSaiAcademy/Logo/main/logo.png",
		"order_id": info.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
		"callback_url": "/api/v1/razorpay/is-order-complete",
		"theme": {
			"color": "#b08968"
		},
		"amount": amount
	};
	let rzp1 = new Razorpay(options);
	payButton.onclick = function (e) {
		e.preventDefault();
		rzp1.open();
	}
});