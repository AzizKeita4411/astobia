const portfolioData = [
	{
		id: 1,
		title: 'Neural Network',
		description: 'Advanced AI system with deep learning capabilities for predictive analytics and pattern recognition.',
		image: 'neural-network.jpg',
		tech: ['TensorFlow', 'Python', 'CUDA']
	},
	{
		id: 2,
		title: 'Quantum Cloud',
		description: 'Next-generation cloud infrastructure leveraging quantum computing for unprecedented processing power.',
		image: 'quantum-cloud.jpg',
		tech: ['AWS', 'Kubernetes', 'Docker']
	},
	{
		id: 3,
		title: 'Blockchain Vault',
		description: 'Secure decentralized storage solution using advanced encryption and distributed ledger technology.',
		image: 'blockchain-vault.jpg',
		tech: ['Ethereum', 'Solidity', 'Web3']
	},
	{
		id: 4,
		title: 'Cyber Defense',
		description: 'Military-grade cybersecurity framework with real-time threat detection and automated response.',
		image: 'cyber-defense.jpg',
		tech: ['Zero Trust', 'AI Defense', 'Encryption']
	},
	{
		id: 5,
		title: 'Data Nexus',
		description: 'Big data processing platform capable of analyzing petabytes of information in real-time.',
		image: 'data-nexus.jpg',
		tech: ['Apache Spark', 'Hadoop', 'Kafka']
	},
	{
		id: 6,
		title: 'AR Interface',
		description: 'Augmented reality system for immersive data visualization and interactive experiences.',
		image: 'ar-interface.jpg',
		tech: ['Unity', 'ARCore', 'Computer Vision']
	},
	{
		id: 7,
		title: 'IoT Matrix',
		description: 'Intelligent IoT ecosystem connecting millions of devices with edge computing capabilities.',
		image: 'iot-matrix.jpg',
		tech: ['MQTT', 'Edge AI', '5G']
	}
];

const teamData = [
	{
		id: 1,
		title: 'Membre 01',
		description: 'Rôle (ex: Développeur Full‑Stack)',
		image: 'assets/aziz.png',
		tech: ['Web', 'API', 'UI']
	},
	{
		id: 2,
		title: 'Membre 02',
		description: 'Rôle (ex: Designer UI/UX)',
		image: 'assets/théwo.png',
		tech: ['UX', 'UI', 'Brand']
	},
	{
		id: 3,
		title: 'Membre 03',
		description: 'Rôle (ex: Consultant IT)',
		image: 'assets/weuz.png',
		tech: ['Stratégie', 'Audit', 'Cloud']
	},
	{
		id: 4,
		title: 'Membre 04',
		description: 'Rôle',
		image: 'assets/chiwa.png',
		tech: ['Support', 'Systèmes', 'Réseau']
	},
];

function getPortfolioImageBasePath() {
	const path = window.location.pathname || '';
	// This project stores carousel images in ./assets/images/
	if (!path.includes('/reusable/sections/home/')) return './assets/images/';
	// Standalone: reusable/sections/home/index.html (images are in project root /images)
	if (path.includes('/reusable/sections/home/')) return '../../../images/';
	// Modular/original: images live in /images
	return 'images/';
}

function resolveImageSrc(imageBasePath, image) {
	if (!image) return '';
	if (image.startsWith('http://') || image.startsWith('https://')) return image;
	if (image.startsWith('/') || image.startsWith('./') || image.startsWith('../')) return image;
	if (image.includes('/')) return image;
	return `${imageBasePath}${image}`;
}

function scrollToSection(sectionId) {
	const section = document.getElementById(sectionId);
	if (!section) return;

	const header = document.getElementById('header');
	const headerHeight = header ? header.offsetHeight : 0;
	const targetPosition = section.offsetTop - headerHeight;

	window.scrollTo({
		top: targetPosition,
		behavior: 'smooth'
	});
}


function initCarouselInstance({
	carouselId,
	indicatorsId,
	prevBtnId,
	nextBtnId,
	data,
	imageBasePath
}) {
	const carousel = document.getElementById(carouselId);
	const indicatorsContainer = document.getElementById(indicatorsId);
	if (!carousel || !indicatorsContainer) return;
	if (carousel.dataset.initialized === 'true') return;
	carousel.dataset.initialized = 'true';

	let currentIndex = 0;

	function createCarouselItem(itemData, index) {
		const item = document.createElement('div');
		item.className = 'carousel-item';
		item.dataset.index = String(index);

		const techBadges = (itemData.tech || []).map(tech => `<span class=\"tech-badge\">${tech}</span>`).join('');
		const imageSrc = resolveImageSrc(imageBasePath, itemData.image);

		item.innerHTML = `
			<div class="card">
				<div class="card-number">0${itemData.id}</div>
				<div class="card-image">
					<img src="${imageSrc}" alt="${itemData.title}">
				</div>
				<h3 class="card-title">${itemData.title}</h3>
				<p class="card-description">${itemData.description}</p>
				<div class="card-tech">${techBadges}</div>
				<button class="card-cta" onclick="scrollToSection('contact')">Explore</button>
			</div>
		`;

		return item;
	}

	function updateCarousel() {
		const items = carousel.querySelectorAll('.carousel-item');
		const indicators = indicatorsContainer.querySelectorAll('.indicator');
		const totalItems = items.length;
		const isMobile = window.innerWidth <= 768;
		const isTablet = window.innerWidth <= 1024;
		const isTeamCarousel = carouselId === 'teamCarousel';

		items.forEach((item, index) => {
			let offset = index - currentIndex;

			if (offset > totalItems / 2) {
				offset -= totalItems;
			} else if (offset < -totalItems / 2) {
				offset += totalItems;
			}

			const absOffset = Math.abs(offset);
			const sign = offset < 0 ? -1 : 1;

			item.style.transform = '';
			item.style.opacity = '';
			item.style.zIndex = '';
			item.style.transition = 'all 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)';

			let spacing1 = isTeamCarousel ? 480 : 400;
			let spacing2 = isTeamCarousel ? 720 : 600;
			let spacing3 = isTeamCarousel ? 900 : 750;

			if (isMobile) {
				spacing1 = isTeamCarousel ? 330 : 280;
				spacing2 = isTeamCarousel ? 490 : 420;
				spacing3 = isTeamCarousel ? 640 : 550;
			} else if (isTablet) {
				spacing1 = isTeamCarousel ? 410 : 340;
				spacing2 = isTeamCarousel ? 610 : 520;
				spacing3 = isTeamCarousel ? 780 : 650;
			}

			if (absOffset === 0) {
				item.style.transform = 'translate(-50%, -50%) translateZ(0) scale(1)';
				item.style.opacity = '1';
				item.style.zIndex = '10';
			} else if (absOffset === 1) {
				const translateX = sign * spacing1;
				const rotation = isMobile ? 25 : 30;
				const scale = isMobile ? 0.88 : 0.85;
				item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-200px) rotateY(${-sign * rotation}deg) scale(${scale})`;
				item.style.opacity = '0.8';
				item.style.zIndex = '5';
			} else if (absOffset === 2) {
				const translateX = sign * spacing2;
				const rotation = isMobile ? 35 : 40;
				const scale = isMobile ? 0.75 : 0.7;
				item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-350px) rotateY(${-sign * rotation}deg) scale(${scale})`;
				item.style.opacity = '0.5';
				item.style.zIndex = '3';
			} else if (absOffset === 3) {
				const translateX = sign * spacing3;
				const rotation = isMobile ? 40 : 45;
				const scale = isMobile ? 0.65 : 0.6;
				item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-450px) rotateY(${-sign * rotation}deg) scale(${scale})`;
				item.style.opacity = '0.3';
				item.style.zIndex = '2';
			} else {
				item.style.transform = 'translate(-50%, -50%) translateZ(-500px) scale(0.5)';
				item.style.opacity = '0';
				item.style.zIndex = '1';
			}
		});

		indicators.forEach((indicator, index) => {
			indicator.classList.toggle('active', index === currentIndex);
		});
	}

	function nextSlide() {
		currentIndex = (currentIndex + 1) % data.length;
		updateCarousel();
	}

	function prevSlide() {
		currentIndex = (currentIndex - 1 + data.length) % data.length;
		updateCarousel();
	}

	function goToSlide(index) {
		currentIndex = index;
		updateCarousel();
	}

	data.forEach((itemData, index) => {
		const item = createCarouselItem(itemData, index);
		carousel.appendChild(item);

		const indicator = document.createElement('div');
		indicator.className = 'indicator';
		if (index === 0) indicator.classList.add('active');
		indicator.dataset.index = String(index);
		indicator.addEventListener('click', () => goToSlide(index));
		indicatorsContainer.appendChild(indicator);
	});

	updateCarousel();

	const nextBtn = document.getElementById(nextBtnId);
	const prevBtn = document.getElementById(prevBtnId);
	if (nextBtn) nextBtn.addEventListener('click', nextSlide);
	if (prevBtn) prevBtn.addEventListener('click', prevSlide);

	setInterval(nextSlide, 5000);

	document.addEventListener('keydown', (e) => {
		if (e.key === 'ArrowLeft') prevSlide();
		if (e.key === 'ArrowRight') nextSlide();
	});

	let resizeTimeout;
	window.addEventListener('resize', () => {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(() => {
			updateCarousel();
		}, 250);
	});
}

function initCarousel() {
	initCarouselInstance({
		carouselId: 'carousel',
		indicatorsId: 'indicators',
		prevBtnId: 'prevBtn',
		nextBtnId: 'nextBtn',
		data: portfolioData,
		imageBasePath: getPortfolioImageBasePath()
	});

	initCarouselInstance({
		carouselId: 'teamCarousel',
		indicatorsId: 'teamIndicators',
		prevBtnId: 'teamPrevBtn',
		nextBtnId: 'teamNextBtn',
		data: teamData,
		imageBasePath: ''
	});
}

// Standalone support: if you open reusable/sections/home/index.html directly,
// run the carousel init automatically.
document.addEventListener('DOMContentLoaded', () => {
	if (typeof initCarousel === 'function') initCarousel();
});
