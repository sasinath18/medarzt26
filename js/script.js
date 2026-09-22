document.addEventListener("DOMContentLoaded", () => {

/* =========================================================
   CURSOR LIGHT
========================================================= */

const cursorGlow =
document.getElementById("cursorGlow");

if (
cursorGlow &&
window.matchMedia(
"(hover:hover) and (pointer:fine)"
).matches
) {

let mouseX = -1000;
let mouseY = -1000;

let glowX = -1000;
let glowY = -1000;

window.addEventListener(
"mousemove",
event => {

mouseX = event.clientX;
mouseY = event.clientY;

document.body.classList.add(
"cursor-active"
);

},
{
passive: true
}
);

window.addEventListener(
"mouseleave",
() => {

document.body.classList.remove(
"cursor-active"
);

}
);

function animateCursor() {

glowX +=
(mouseX - glowX) * 0.16;

glowY +=
(mouseY - glowY) * 0.16;

cursorGlow.style.transform =
`translate3d(
${glowX}px,
${glowY}px,
0
)`;

requestAnimationFrame(
animateCursor
);

}

animateCursor();

}


/* =========================================================
   NORMAL PAGE SCROLL
========================================================= */

const pageTransition =
document.getElementById("pageTransition");

const eventModal =
document.getElementById("eventModal");


function isEventModalOpen() {

return !!(
eventModal &&
eventModal.classList.contains("active")
);

}


function scrollToSection(
index,
playNavigationSound = true
) {

const sections =
Array.from(
document.querySelectorAll("section[id]")
);

if (
index < 0 ||
index >= sections.length ||
isEventModalOpen()
) {
return false;
}

const target =
sections[index];

if (!target) {
return false;
}

if (playNavigationSound) {

}

target.scrollIntoView({
behavior: "smooth",
block: "start",
inline: "nearest"
});

return true;

}


/* =========================================================
   NAVBAR / ANCHOR LINKS
========================================================= */

document.addEventListener(
"click",
event => {

const link =
event.target.closest(
'a[href^="#"]'
);

if (!link) {
return;
}

const href =
link.getAttribute("href");

if (
!href ||
href === "#"
) {
return;
}

if (
link.classList.contains(
"nav-register"
)
) {
return;
}

let target = null;

try {

target =
document.querySelector(href);

} catch (_) {

return;

}

if (!target) {
return;
}

const sections =
Array.from(
document.querySelectorAll("section[id]")
);

const targetIndex =
sections.indexOf(target);

if (targetIndex === -1) {
return;
}

event.preventDefault();

scrollToSection(
targetIndex,
true
);

},
true
);


if (pageTransition) {

pageTransition.setAttribute(
"aria-hidden",
"true"
);

}


/* =========================================================
   COUNTDOWN
========================================================= */

const eventDate =
new Date(
"October 10, 2026 00:00:00"
).getTime();


function updateCountdown() {

const days =
document.getElementById("days");

const hours =
document.getElementById("hours");

const minutes =
document.getElementById("minutes");

const seconds =
document.getElementById("seconds");

if (
!days ||
!hours ||
!minutes ||
!seconds
) {
return;
}

let difference =
eventDate -
Date.now();

if (difference < 0) {
difference = 0;
}

const d =
Math.floor(
difference /
(
1000 *
60 *
60 *
24
)
);

const h =
Math.floor(
(
difference %
(
1000 *
60 *
60 *
24
)
) /
(
1000 *
60 *
60
)
);

const m =
Math.floor(
(
difference %
(
1000 *
60 *
60
)
) /
(
1000 *
60
)
);

const s =
Math.floor(
(
difference %
(
1000 *
60
)
) /
1000
);

days.textContent =
String(d).padStart(2, "0");

hours.textContent =
String(h).padStart(2, "0");

minutes.textContent =
String(m).padStart(2, "0");

seconds.textContent =
String(s).padStart(2, "0");

}


updateCountdown();

setInterval(
updateCountdown,
1000
);


/* =========================================================
   INTERACTIVE HOVER
========================================================= */

const interactiveSelector = [
".interactive-card",
".coordinator-controls button",
".coordinator-tabs button"
].join(",");

let lastInteractive = null;


document.addEventListener(
"pointerover",
event => {

const item =
event.target.closest(
interactiveSelector
);

if (!item) {
return;
}

if (
item === lastInteractive
) {
return;
}

lastInteractive = item;

},
{
passive: true
}
);


document.addEventListener(
"pointerout",
event => {

const item =
event.target.closest(
interactiveSelector
);

if (!item) {
return;
}

if (
!event.relatedTarget ||
!item.contains(
event.relatedTarget
)
) {

if (
lastInteractive === item
) {
lastInteractive = null;
}

}

},
{
passive: true
}
);


/* =========================================================
   MAGIC DUST
========================================================= */

function createMagicDust(
container,
count = 90
) {

if (!container) {
return;
}

container.innerHTML = "";

container.style.position =
"absolute";

container.style.inset =
"-42px";

container.style.overflow =
"visible";

container.style.pointerEvents =
"none";

container.style.zIndex =
"50";


for (
let i = 0;
i < count;
i++
) {

const particle =
document.createElement(
"span"
);

const side =
Math.floor(
Math.random() * 4
);

const edgePosition =
8 +
Math.random() * 84;

const distance =
55 +
Math.random() * 125;

const size =
3.5 +
Math.random() * 3.5;


let startX =
edgePosition;

let startY =
edgePosition;

let moveX =
0;

let moveY =
0;


/* TOP */

if (side === 0) {

startX =
edgePosition;

startY =
0;

moveX =
(Math.random() - 0.5) * 70;

moveY =
-distance;

}


/* RIGHT */

else if (side === 1) {

startX =
100;

startY =
edgePosition;

moveX =
distance;

moveY =
(Math.random() - 0.5) * 70;

}


/* BOTTOM */

else if (side === 2) {

startX =
edgePosition;

startY =
100;

moveX =
(Math.random() - 0.5) * 70;

moveY =
distance;

}


/* LEFT */

else {

startX =
0;

startY =
edgePosition;

moveX =
-distance;

moveY =
(Math.random() - 0.5) * 70;

}


particle.className =
"dust";

particle.style.position =
"absolute";

particle.style.left =
`${startX}%`;

particle.style.top =
`${startY}%`;

particle.style.width =
`${size}px`;

particle.style.height =
`${size}px`;

particle.style.marginLeft =
`${-size / 2}px`;

particle.style.marginTop =
`${-size / 2}px`;

particle.style.borderRadius =
"50%";

particle.style.background =
"#fff4b8";

particle.style.opacity =
"0";

particle.style.zIndex =
"60";

particle.style.pointerEvents =
"none";

particle.style.boxShadow =
"0 0 8px #fff4b8," +
"0 0 16px #f6d77b," +
"0 0 28px rgba(246,219,132,.95)";


container.appendChild(
particle
);


particle.animate(
[
{
opacity:0,
transform:
"translate3d(0,0,0) scale(.25)"
},

{
opacity:1,
transform:
"translate3d(0,0,0) scale(1)"
},

{
opacity:1,
transform:
`translate3d(
${moveX * 0.45}px,
${moveY * 0.45}px,
0
) scale(1.15)`
},

{
opacity:0,
transform:
`translate3d(
${moveX}px,
${moveY}px,
0
) scale(1.45)`
}
],
{
duration:
1250 +
Math.random() * 450,

delay:
Math.random() * 120,

easing:
"cubic-bezier(.15,.8,.2,1)",

fill:
"forwards"
}
);

}


setTimeout(
() => {

container.innerHTML =
"";

},
1900
);

}


function clearMagicDust(
container
) {

if (!container) {
return;
}

container.innerHTML = "";

}


/* =========================================================
   EVENT DATA
========================================================= */

const eventData = [

{
house:
"ALL FOUR HOUSES",

title:
"PAPER FORGE",

text:
"The Scribe's Path",

images: [
"assets/images/events/paper-forge-1.png",
"assets/images/events/paper-forge-2.png",
"assets/images/events/paper-forge-3.png",
"assets/images/events/paper-forge-4.png"
]
},

{
house:
"HOUSE STARK",

title:
"HERMES CODE",

text:
"Tech Heist",

images: [
"assets/images/events/stark-1.png",
"assets/images/events/stark-2.png",
"assets/images/events/stark-3.png"
]
},

{
house:
"HOUSE TARGARYEN",

title:
"SOLIDUS GAMBIT",

text:
"CryptoQuest",

images: [
"assets/images/events/targaryen-1.png",
"assets/images/events/targaryen-2.png",
"assets/images/events/targaryen-3.png"
]
},

{
house:
"HOUSE LANNISTER",

title:
"CITADEL TRIALS",

text:
"Mind Matrix",

images: [
"assets/images/events/lannister-1.png",
"assets/images/events/lannister-2.png",
"assets/images/events/lannister-3.png"
]
},

{
house:
"HOUSE BARATHEON",

title:
"RECORDS OF ASCLEPIOS",

text:
"Diagnox",

images: [
"assets/images/events/baratheon-1.png",
"assets/images/events/baratheon-2.png",
"assets/images/events/baratheon-3.png"
]
}

];


/* =========================================================
   EVENT MODAL
========================================================= */

const eventModalCard =
document.querySelector(
".event-modal-card"
);

const eventModalClose =
document.getElementById(
"eventModalClose"
);

const eventModalHouse =
document.getElementById(
"eventModalHouse"
);

const eventModalTitle =
document.getElementById(
"eventModalTitle"
);

const eventModalText =
document.getElementById(
"eventModalText"
);

const eventModalGallery =
document.getElementById(
"eventModalGallery"
);

const eventMagic =
document.getElementById(
"eventMagic"
);


function openEvent(index) {

const data =
eventData[index];

if (
!data ||
!eventModal
) {
return;
}


if (eventModalCard) {

eventModalCard.style.setProperty(
"border",
"0",
"important"
);

eventModalCard.style.setProperty(
"background",
"transparent",
"important"
);

eventModalCard.style.setProperty(
"box-shadow",
"none",
"important"
);

eventModalCard.style.setProperty(
"border-radius",
"0",
"important"
);

}


if (eventModalHouse) {

eventModalHouse.textContent =
data.house;

}


if (eventModalTitle) {

eventModalTitle.textContent =
data.title;

}


if (eventModalText) {

eventModalText.textContent =
data.text;

}


if (eventModalGallery) {

eventModalGallery.innerHTML =
"";

const image =
document.createElement(
"img"
);

image.className =
"event-active-image";

image.alt =
`${data.title} image 1`;

image.loading =
"eager";

image.style.display =
"block";

image.style.width =
"auto";

image.style.height =
"auto";

image.style.maxWidth =
"min(420px,75vw)";

image.style.maxHeight =
"65vh";

image.style.objectFit =
"contain";

image.style.setProperty(
"border",
"0",
"important"
);

image.style.setProperty(
"outline",
"0",
"important"
);

image.style.setProperty(
"background",
"transparent",
"important"
);

image.style.setProperty(
"box-shadow",
"none",
"important"
);

image.style.setProperty(
"padding",
"0",
"important"
);

image.style.setProperty(
"margin",
"0",
"important"
);

image.src =
data.images[0];

eventModalGallery.appendChild(
image
);


const controls =
document.createElement(
"div"
);

controls.className =
"event-image-controls";

controls.style.display =
"flex";

controls.style.justifyContent =
"center";

controls.style.alignItems =
"center";

controls.style.gap =
"14px";

controls.style.marginTop =
"15px";


const prev =
document.createElement(
"button"
);

prev.type =
"button";

prev.textContent =
"‹ PREV";


const counter =
document.createElement(
"span"
);

counter.textContent =
`1 / ${data.images.length}`;


const next =
document.createElement(
"button"
);

next.type =
"button";

next.textContent =
"NEXT ›";


controls.appendChild(
prev
);

controls.appendChild(
counter
);

controls.appendChild(
next
);

eventModalGallery.appendChild(
controls
);


let current =
0;


function showImage() {

image.src =
data.images[
current
];

image.alt =
`${data.title} image ${
current + 1
}`;

counter.textContent =
`${
current + 1
} / ${
data.images.length
}`;

}


prev.addEventListener(
"click",
event => {

event.preventDefault();

event.stopPropagation();

current--;

if (
current < 0
) {

current =
data.images.length -
1;

}

showImage();

}
);


next.addEventListener(
"click",
event => {

event.preventDefault();

event.stopPropagation();

current++;

if (
current >=
data.images.length
) {

current = 0;

}

showImage();

}
);

}


/* =========================================================
   OPEN EVENT IMMEDIATELY
========================================================= */

eventModal.classList.add(
"active"
);

eventModal.setAttribute(
"aria-hidden",
"false"
);

requestAnimationFrame(() => {

createMagicDust(
eventMagic,
125
);

});

}


/* =========================================================
   EVENT CARDS
========================================================= */

document
.querySelectorAll(
".event-card"
)
.forEach(
card => {

card.addEventListener(
"click",
() => {

openEvent(
Number(
card.dataset.event
)
);

}
);


card.addEventListener(
"keydown",
event => {

if (
event.key === "Enter" ||
event.key === " "
) {

event.preventDefault();

openEvent(
Number(
card.dataset.event
)
);

}

}

);

}
);


/* =========================================================
   CLOSE EVENT
========================================================= */

function closeEvent() {

if (!eventModal) {
return;
}

eventModal.classList.remove(
"active"
);

eventModal.setAttribute(
"aria-hidden",
"true"
);

clearMagicDust(
eventMagic
);


if (eventModalCard) {

eventModalCard.style.setProperty(
"border",
"0",
"important"
);

eventModalCard.style.setProperty(
"background",
"transparent",
"important"
);

eventModalCard.style.setProperty(
"box-shadow",
"none",
"important"
);

}

}


if (eventModalClose) {

eventModalClose.addEventListener(
"click",
() => {

closeEvent();

}
);

}


const eventBackdrop =
document.querySelector(
".event-modal-backdrop"
);

if (eventBackdrop) {

eventBackdrop.addEventListener(
"click",
closeEvent
);

}


document.addEventListener(
"keydown",
event => {

if (
event.key === "Escape"
) {

closeEvent();

}

}
);


/* =========================================================
   FAQ
========================================================= */

const faqQuestions =
document.querySelectorAll(
".faq-question"
);

const faqAnswer =
document.getElementById(
"faqAnswerBox"
);

const answerTitle =
document.getElementById(
"faq-answer-title"
);

const answerText =
document.getElementById(
"faq-answer-text"
);

const faqMagic =
document.getElementById(
"faqMagic"
);


const faqData = {

0: {
title:
"HOW DO I REGISTER FOR MEDARZT'26?",

text:
"Registration details will be announced by the symposium organizers. Please follow the official MEDARZT'26 announcements for registration information."
},

1: {
title:
"IS REGISTRATION AVAILABLE ON THE SPOT?",

text:
"No. On-spot registration is not available. Participants must complete the registration process through the officially announced procedure before the event."
},

2: {
title:
"CAN I PARTICIPATE INDIVIDUALLY OR DO I NEED A TEAM?",

text:
"Participation requirements depend on the respective event. Please check the event details for the required team size or individual participation option."
},

3: {
title:
"WHAT ARE THE RULES EVERY PARTICIPANT MUST FOLLOW?",

text:
"All participants must follow the common symposium rules, event-specific rules, time limits, coordinator instructions, and fair-play guidelines."
},

4: {
title:
"CAN I TAKE PART IN MULTIPLE EVENTS?",

text:
"One team can participate in a maximum of two events across the symposium schedule."
}

};


faqQuestions.forEach(
question => {

question.addEventListener(
"click",
() => {

const id =
Number(
question.dataset.faq
);

const data =
faqData[id];

if (!data) {
return;
}


faqQuestions.forEach(
item => {

item.classList.remove(
"active"
);

}
);


question.classList.add(
"active"
);


if (faqAnswer) {

faqAnswer.classList.remove(
"magic-open"
);

}


createMagicDust(
faqMagic,
100
);


setTimeout(
() => {

if (answerTitle) {

answerTitle.textContent =
data.title;

}


if (answerText) {

answerText.textContent =
data.text;

}


if (faqAnswer) {

faqAnswer.classList.remove(
"magic-open"
);

void faqAnswer.offsetWidth;

faqAnswer.classList.add(
"magic-open"
);

}

},
450
);

}
);

}
);


/* =========================================================
   COORDINATOR IMAGE FALLBACKS
========================================================= */

function coordinatorFallback(label) {

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 850">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stop-color="#0b0b0b"/>
<stop offset="55%" stop-color="#262015"/>
<stop offset="100%" stop-color="#050505"/>
</linearGradient>
</defs>
<rect width="500" height="850" fill="url(#bg)"/>
<rect x="18" y="18" width="464" height="814" rx="18" fill="none" stroke="#d7aa43" stroke-width="2"/>
<circle cx="250" cy="300" r="82" fill="#181818" stroke="#d7aa43" stroke-width="2"/>
<circle cx="250" cy="285" r="34" fill="#3a3326"/>
<path d="M155 455 Q250 370 345 455 L380 615 L120 615 Z" fill="#29251f"/>
<text x="250" y="700" fill="#f0cb6b" font-family="serif" font-size="27" text-anchor="middle" letter-spacing="3">MEDARZT'26</text>
<text x="250" y="748" fill="#a7a198" font-family="serif" font-size="15" text-anchor="middle" letter-spacing="2">${label}</text>
</svg>`;

return "data:image/svg+xml;charset=UTF-8," +
encodeURIComponent(svg);

}


function prepareCoordinatorImages() {

const tracks = [

[
document.getElementById("staffTrack"),
"STAFF COORDINATOR"
],

[
document.getElementById("studentsTrack"),
"STUDENT COORDINATOR"
]

];

tracks.forEach(
([track, prefix]) => {

if (!track) {
return;
}

track.querySelectorAll("img").forEach(
(img, index) => {

img.onerror = () => {

img.onerror = null;

img.src =
coordinatorFallback(
`${prefix} ${index + 1}`
);

};

}
);

}
);

}


prepareCoordinatorImages();


/* =========================================================
   COORDINATOR SLIDER
========================================================= */

function setupCoordinatorSlider(
track,
totalSlides,
prevButton,
nextButton,
counter
) {

if (!track) {

return {
reset() {},
stop() {},
start() {}
};

}

const slides =
track.querySelectorAll(
".coordinator-slide"
);


slides.forEach(
slide => {

slide.style.flex =
"0 0 100%";

slide.style.width =
"100%";

}
);


let current = 0;
let autoSlideTimer = null;


function update() {

track.style.transform =
`translateX(-${
current * 100
}%)`;

if (counter) {

counter.textContent =
`${
current + 1
} / ${
totalSlides
}`;

}

}


function startAutoSlide() {

if (
totalSlides <= 1
) {
return;
}

if (autoSlideTimer) {

clearInterval(
autoSlideTimer
);

}

autoSlideTimer =
setInterval(
() => {

current++;

if (
current >= totalSlides
) {

current = 0;

}

update();

},
3000
);

}


function stopAutoSlide() {

if (!autoSlideTimer) {
return;
}

clearInterval(
autoSlideTimer
);

autoSlideTimer = null;

}


function resetAutoSlide() {

stopAutoSlide();

startAutoSlide();

}


if (prevButton) {

prevButton.addEventListener(
"click",
() => {

current--;

if (
current < 0
) {

current =
totalSlides -
1;

}

update();

resetAutoSlide();

}
);

}


if (nextButton) {

nextButton.addEventListener(
"click",
() => {

current++;

if (
current >= totalSlides
) {

current = 0;

}

update();

resetAutoSlide();

}
);

}


update();

startAutoSlide();


return {

reset() {

current = 0;

update();

resetAutoSlide();

},

stop() {

stopAutoSlide();

},

start() {

startAutoSlide();

}

};

}


/* =========================================================
   STAFF SLIDER
========================================================= */

const staffSlider =
setupCoordinatorSlider(
document.getElementById(
"staffTrack"
),
2,
document.getElementById(
"staffPrev"
),
document.getElementById(
"staffNext"
),
document.getElementById(
"staffCounter"
)
);


/* =========================================================
   STUDENT SLIDER
========================================================= */

const studentsTrackElement =
document.getElementById(
"studentsTrack"
);

const studentSlideCount =
studentsTrackElement
? studentsTrackElement.querySelectorAll(
".coordinator-slide"
).length
: 0;


const studentSlider =
setupCoordinatorSlider(
studentsTrackElement,
studentSlideCount || 10,
document.getElementById(
"studentsPrev"
),
document.getElementById(
"studentsNext"
),
document.getElementById(
"studentsCounter"
)
);


/* =========================================================
   COORDINATOR TABS
========================================================= */

const coordinatorTabs =
document.querySelectorAll(
".coordinator-tabs button"
);

const staffGroup =
document.getElementById(
"staffGroup"
);

const studentsGroup =
document.getElementById(
"studentsGroup"
);


coordinatorTabs.forEach(
button => {

button.addEventListener(
"click",
() => {

const group =
button.dataset.group;


coordinatorTabs.forEach(
tab => {

tab.classList.remove(
"active"
);

}
);

button.classList.add(
"active"
);


if (
group === "staff"
) {

if (staffGroup) {

staffGroup.classList.add(
"active"
);

}

if (studentsGroup) {

studentsGroup.classList.remove(
"active"
);

}

staffSlider.reset();

}

else {

if (staffGroup) {

staffGroup.classList.remove(
"active"
);

}

if (studentsGroup) {

studentsGroup.classList.add(
"active"
);

}

studentSlider.reset();

}

}
);

}
);

});
