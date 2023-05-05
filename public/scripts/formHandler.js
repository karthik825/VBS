//VARIABLES
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const mobileInput = document.querySelector('#mobile');
const message = document.querySelector('#message');
const success = document.querySelector('#success');
const errorNodes = document.querySelectorAll('.error');
const form = document.querySelector('form');

class HandleForm {
	constructor() {
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			this._validateForm();
		})
	}
	//validating the form
	_validateForm() {
		this._clear();
		let hasError = false;
		if (nameInput.value.length === 0) {
			errorNodes[0].innerText = "Name cannot be empty";
			nameInput.classList.add('error-border');
			hasError = true;
		}
		if (!this._emailIsValid(email.value)) {
			errorNodes[1].innerText = "Invalid email address";
			emailInput.classList.add('error-border');
			hasError = true;
		}
		if (!this._numberIsValid(mobile.value)) {
			errorNodes[2].innerText = "Invalid mobile number";
			emailInput.classList.add('error-border');
			hasError = true;
		}

		if (message.value.length === 0) {
			errorNodes[3].innerText = "Please enter message";
			message.classList.add('error-border');
			hasError = true;
		}
		if (!hasError) {
			const Data = {
				"name": nameInput.value,
				"email": emailInput.value,
				"message": message.value,
				"mobile": mobileInput.value,
			}
			this._sendEmail(Data);
		}
	}
	//clearing the errorNodes
	_clear() {
		errorNodes.forEach((errorNode) => {
			errorNode.innerText = "";
		})
		success.innerText = '';
		nameInput.classList.remove('error-border');
		emailInput.classList.remove('error-border');
		mobileInput.classList.remove('error-border');
		message.classList.remove('error-border');
	}
	//checking if email is valid
	_emailIsValid(email) {
		let pattern = /\S+@\S+\.\S+/;
		return pattern.test(email);
	}
	//checking mobile number is correct or not
	_numberIsValid(number) {
		let pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
		return pattern.test(number);
	}
	//sending Mail
	_sendEmail(Data) {
		alert('Do you wanna send your enquiry form to VBS Academy?');
		success.style.color = "var(--tertiary-dark-color)";
		success.innerText = "Sending.....";
		axios.post('/api/v1/sendMail', Data).then(() => {
			success.style.color = "green";
			success.innerText = "Sent Successfully!";
			setTimeout(() => {
				success.innerText = "";
			}, 5000);
		}).catch((err) => {
			console.error(err);
		});

	}
}
new HandleForm();