console.clear();
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* ===== SELECTEURS (TOUJOURS EN HAUT) ===== */
let panels = document.querySelector('.panels');
let sections = gsap.utils.toArray(".panel");
let activeSlide = document.querySelector('.activeSlide');
let slideTotal = document.querySelector('.slideTotal');
let upBtn = document.querySelector(".up");
let dnBtn = document.querySelector(".down");

/* ===== GUARD (sécurité) ===== */
if (!panels || sections.length === 0) {
	console.warn("Panels ou sections manquants");
	return;
}

/* ===== TOTAL SLIDES ===== */
let totalSlides = sections.length;
slideTotal.innerHTML = totalSlides;

/* ===== SCROLLTRIGGERS ===== */
sections.forEach((eachPanel, index) => {

	let realIndex = index + 1;

	ScrollTrigger.create({
		scroller: ".panels",
		trigger: eachPanel,
		start: "top 50%",
		end: "top bottom",

		onLeave: () => {
			eachPanel.classList.add('active');
			activeSlide.innerHTML = realIndex;

			dnBtn.setAttribute('data-down', realIndex + 1);
			upBtn.setAttribute('data-up', realIndex - 1);

			updateUI(realIndex - 1, realIndex + 1);
		},

		onLeaveBack: () => {
			eachPanel.classList.remove('active');
			activeSlide.innerHTML = realIndex - 1;

			dnBtn.setAttribute('data-down', realIndex);
			upBtn.setAttribute('data-up', realIndex - 2);

			updateUI(realIndex - 2, realIndex);
		}
	});
});

/* ===== UI ===== */
function updateUI(upIndex, downIndex) {

	upBtn.classList.toggle('disabled', upIndex < 1);
	dnBtn.classList.toggle('disabled', downIndex > totalSlides);
}

/* ===== BOUTONS ===== */
dnBtn.addEventListener("click", () => {
	let next = parseInt(dnBtn.dataset.down, 10);
	if (next <= totalSlides) goToPanel(next);
});

upBtn.addEventListener("click", () => {
	let prev = parseInt(upBtn.dataset.up, 10);
	if (prev >= 1) goToPanel(prev);
});

/* ===== SCROLL TO PANEL ===== */
function goToPanel(index) {
	gsap.to(panels, {
		duration: 0.55,
		ease: "power4.inOut",
		scrollTo: {
			y: "#panel_" + index,
			autoKill: false
		}
	});
}