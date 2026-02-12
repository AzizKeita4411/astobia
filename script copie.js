const openMenu = document.getElementById("open-menu");
const closeMenu = document.getElementById("close-menu");
const navlinks = document.getElementById("mobile-navlinks");

const openMenuHandler = () => {
    navlinks.classList.remove("-translate-x-full")
    navlinks.classList.add("translate-x-0")
}

const closeMenuHandler = () => {
    navlinks.classList.remove("translate-x-0")
    navlinks.classList.add("-translate-x-full")
}

if (openMenu && closeMenu && navlinks) {
    openMenu.addEventListener("click", openMenuHandler);
    closeMenu.addEventListener("click", closeMenuHandler);
}


// Testimonials Section Marquee
const cardsData = [
    {
        image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
        name: 'Sophie Martin',
        handle: '@sophiemartin',
        date: '14 février 2025',
        quote: 'L\'application mobile développée par Astobia Info Tech a complètement transformé notre façon de travailler. Ce qui prenait des heures se fait maintenant en minutes !',
    },
    {
        image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
        name: 'Thomas Dubois',
        handle: '@thomasdubois',
        date: '3 mars 2025',
        quote: 'Nous avons essayé plusieurs solutions, mais rien ne se compare en termes de rapidité et de simplicité. Un véritable changement de jeu.',
    },
    {
        image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60',
        name: 'Marie Leclerc',
        handle: '@marieleclerc',
        date: '22 avril 2025',
        quote: 'Leur plateforme SaaS nous a fait économiser des heures chaque semaine. Chaque centime en vaut la peine.',
    },
    {
        image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60',
        name: 'Pierre Bernard',
        handle: '@pierrebernard',
        date: '18 mai 2025',
        quote: 'La mise en place a été incroyablement facile. En 10 minutes, nous étions opérationnels. Leur support est exceptionnel !',
    },
];

const row1 = document.getElementById('row1');
const row2 = document.getElementById('row2');

const createCard = (card) => `
        <div class="p-4 rounded-lg mx-4 w-72 shrink-0 bg-blue-950/30 border border-blue-950">
        <div class="flex gap-2">
            <img class="size-11 rounded-full" alt="${card.name}" src="${card.image}">
            <div class="flex flex-col">
                <div class="flex items-center gap-1">
                    <p>${card.name}</p>
                    <svg class="mt-0.5" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z"
                            fill="#2196F3"></path>
                    </svg>
                </div>
                <span class="text-xs text-slate-500">${card.handle}</span>
            </div>
        </div>
        <p class="text-sm pt-4 text-slate-500 line-clamp-2">
            ${card.quote}
        </p>
    </div>
    `;

const renderCards = (target) => {
    if (!target) return;
    const doubled = [...cardsData, ...cardsData];
    doubled.forEach(card => target.insertAdjacentHTML('beforeend', createCard(card)));
};

if (row1) renderCards(row1);
if (row2) renderCards(row2);

// Reveal on scroll + 3D tilt hover (Option A)
document.addEventListener('DOMContentLoaded', () => {
	const revealEls = document.querySelectorAll('.reveal');
	if (revealEls.length) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('reveal--visible');
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
		);

		revealEls.forEach((el) => observer.observe(el));
	}

	const tiltEls = document.querySelectorAll('.tilt-3d');
	if (tiltEls.length) {
		const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReduced) return;

		tiltEls.forEach((el) => {
			let frameId;

			const onMove = (e) => {
				const rect = el.getBoundingClientRect();
				const x = (e.clientX - rect.left) / rect.width;
				const y = (e.clientY - rect.top) / rect.height;

				const rotateY = (x - 0.5) * 10;
				const rotateX = (0.5 - y) * 10;

				if (frameId) cancelAnimationFrame(frameId);
				frameId = requestAnimationFrame(() => {
					el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
				});
			};

			const onLeave = () => {
				if (frameId) cancelAnimationFrame(frameId);
				el.style.transform = '';
			};

			el.addEventListener('mousemove', onMove);
			el.addEventListener('mouseleave', onLeave);
		});
	}

	const particlesContainer = document.getElementById('particles');
	if (particlesContainer && !particlesContainer.dataset.initialized) {
		particlesContainer.dataset.initialized = 'true';
		const particleCount = 15;
		for (let i = 0; i < particleCount; i++) {
			const particle = document.createElement('div');
			particle.className = 'particle';
			particle.style.left = Math.random() * 100 + '%';
			particle.style.top = Math.random() * 100 + '%';
			particle.style.animationDelay = Math.random() * 20 + 's';
			particle.style.animationDuration = (18 + Math.random() * 8) + 's';
			particlesContainer.appendChild(particle);
		}
	}
});

