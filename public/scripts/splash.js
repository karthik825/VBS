const splash = document.querySelector('.splash');

// splash screen
if (sessionStorage.isVisited) {
	splash.classList.add('hidden');
	document.querySelector('main').style.animation = 'transitionInNormal 1s ease-in-out';
	document.querySelector('main').classList.remove('hidden');
}
if (!sessionStorage.isVisited) {
	setTimeout(() => {
		sessionStorage.isVisited = 'true'
	}, 3700);
	document.addEventListener('DOMContentLoaded', (e) => {
		setTimeout(() => {
			splash.classList.add('hidden');
			document.querySelector('main').classList.remove('hidden');
			document.querySelector('main').style.animation = 'transitionInNormal 1.5s ease-in-out';
		}, 4000);
	});
}
