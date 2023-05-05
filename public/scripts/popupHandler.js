const btn = document.querySelector('.pop-up-btn-1');


btn.addEventListener('click', () => {
	document.querySelector('.alert').style.display = 'none';
	document.querySelector('.alert-overlay').style.display = 'none';
})