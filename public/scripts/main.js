class App {
	constructor() {

		//VARIABLES
		this.wrapperMenu = document.querySelector('.wrapper-menu');

		//SCREEN VIEW OBSERVER
		this.observer = new IntersectionObserver(function (entries) {
			if (entries[0].isIntersecting === true) {
				document.querySelectorAll('nav > ul > li > a').forEach((el) => {
					if (entries[0].target.dataset.section === el.dataset.section) {
						el.classList.add('active');
					} else {
						el.classList.remove('active');
					}
				});
			};
		}, { threshold: [0.2] });

		this.counterObserver = new IntersectionObserver(function (entries) {
			if (entries[0].isIntersecting === true) {
				app.startCounters();
			}
		}, { threshold: 0.6 })

		//TO BE CALLED FUNCTIONS ON START
		this.startListeners();
		this.startNavigationButtons();
		this.startObeservers();

		//OBJECT FROM Typed.js SCRIPT TO RUN TYPING ANIMATION
		new Typed(".typed", {
			strings: ["Srinivas Vegur", "a Professinal Tutor", "a Numerologist", "an Astrologist", "a School Principal"],
			typeSpeed: 50,
			backSpeed: 50,
			loop: true,
		});

	}
	//TOGGLES MENU BUTTON(FOR MOBILE PHONES)
	toggleMenu = () => {
		this.wrapperMenu.classList.toggle('open');
		document.querySelectorAll('nav > ul > li').forEach((el, i) => {
			el.classList.toggle(`appear-${i}`);
		})
		if (this.wrapperMenu.classList.contains('open') || window.pageYOffset >= 100) {
			document.querySelector('nav').style.background = 'var(--primary-light-color)';
			document.querySelector('.nav-container').style.boxShadow = '';
		} else {
			document.querySelector('nav').style.background = 'transparent';
			document.querySelector('.nav-container').style.boxShadow = '';
		}
	}

	//TRIGGERS NAVBAR BACKGROUND ON SCROLL
	triggerNavBarBackground = () => {
		if (window.pageYOffset >= 100) {
			document.querySelector('nav').style.background = 'var(--primary-light-color)';
			document.querySelector('.nav-container').style.boxShadow = '0 0.5px 10px rgba(107, 107, 107, 0.596)';
		}
		else if (document.getElementById('check').checked === false) {
			document.querySelector('nav').style.background = 'transparent';
			document.querySelector('.nav-container').style.boxShadow = '';
		}
	}

	triggerTextPosition = () => {
		if (window.pageYOffset >= 200) {
			document.querySelector('.brand-text').style.display = 'none';
		} else {
			document.querySelector('.brand-text').style.display = 'block';
		}
	}

	//NAVIGATION BUTTONS
	startNavigationButtons = () => {
		document.querySelectorAll('nav > ul > li > a').forEach((el) => {
			el.addEventListener('click', (e) => {
				e.preventDefault();
				document.querySelector(`section[data-section="${el.dataset.section}"]`).scrollIntoView({
					behavior: 'smooth',
				});
				document.getElementById('check').checked = false;
				this.wrapperMenu.classList.remove('open');
			})
		})
		document.querySelectorAll('.navigation > a').forEach(el => {
			el.addEventListener('click', (e) => {
				e.preventDefault();
				document.querySelector(`section[data-section="${el.dataset.section}"]`).scrollIntoView({
					behavior: 'smooth',
				});
			})
		})
		document.querySelector('.home-btn-1').addEventListener('click', (e) => {
			e.preventDefault();
			document.getElementById('contact').scrollIntoView({
				behavior: 'smooth',
			})
		})
		document.querySelectorAll('.service-contact').forEach(el => {
			el.addEventListener('click', (e) => {
				e.preventDefault();
				document.getElementById('contact').scrollIntoView({
					behavior: 'smooth',
				})
			})
		})
	}

	//STARTS ALL THE LISTENERS
	startListeners = () => {
		this.wrapperMenu.addEventListener('click', this.toggleMenu);
		window.addEventListener('scroll', () => {
			this.triggerNavBarBackground();
			this.triggerTextPosition();
		});
	}

	//STARTS OBSERVSERS
	startObeservers = () => {
		document.querySelectorAll('section').forEach((el) => {
			this.observer.observe(el);
		})
		this.counterObserver.observe(document.querySelector('.school-details'));
	}

	//STARTS COUNTERS
	startCounters = () => {
		let counters = document.querySelectorAll('.counter');
		counters.forEach((counter) => {
			let count = 0;
			const maxCount = +counter.dataset.target;
			const executeCount = () => {
				count++;
				counter.innerHTML = count;
				if (count == maxCount) {
					clearInterval(countInterval);
				}
			}
			let countInterval;
			if (maxCount <= 50) {
				countInterval = setInterval(executeCount, 100);
			} else if (maxCount <= 100) {
				countInterval = setInterval(executeCount, 30);
			} else {
				countInterval = setInterval(executeCount, 5);
			}
		})
	}
}

//STARTS THE SCRIPT
const app = new App();



