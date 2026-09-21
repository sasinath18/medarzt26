document.addEventListener("DOMContentLoaded", () => {
const audio1 = document.getElementById("audio1");
const audio2 = document.getElementById("audio2");
const audio3 = document.getElementById("audio3");
const audio4 = document.getElementById("audio4");

const AUDIO_PATHS = {
audio1: [
"assets/audio/audio1.mp3",
"assets/audio/audio%201.mp3",
"audio 1.mp3"
],
audio2: [
"assets/audio/audio2.mp3",
"assets/audio/audio%202.mp3",
"audio 2.mp3"
],
audio3: [
"assets/audio/audio3.mp3",
"assets/audio/audio%203.mp3",
"audio 3.mp3"
],
audio4: [
"assets/audio/audio4.mp3",
"assets/audio/audio%204.mp3",
"audio 4.mp3"
]
};

let audioUnlocked = false;

function unlockAudio() {
audioUnlocked = true;
}

function playSound(audio, key) {

if (!audio || !audioUnlocked) {
return;
}

const paths = AUDIO_PATHS[key] || [];
let index = 0;

function attemptPlay() {

if (index >= paths.length) {
return;
}

try {

audio.pause();
audio.currentTime = 0;
audio.src = paths[index];
audio.load();

const promise = audio.play();

if (promise) {

promise.catch(() => {
index++;
attemptPlay();
});

}

} catch (_) {

index++;
attemptPlay();

}

}

attemptPlay();

}

document.addEventListener(
"pointerdown",
unlockAudio,
{
once: true,
capture: true
}
);

document.addEventListener(
"keydown",
unlockAudio,
{
once: true,
capture: true
}
);


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
   SMOOTH NORMAL PAGE SCROLL
   - Mouse wheel / trackpad uses normal browser scrolling
   - Small scrolls do not force the next section
   - Tall sections such as SCHEDULE can be scrolled naturally
   - Navbar / in-page anchors use smooth scrolling
   - Event loading transition remains available later
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

unlockAudio();

playSound(
audio4,
"audio4"
);

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


/*
   Keep the existing pageTransition available for the event
   opening/loading effect later in this file.
*/

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
   INTERACTIVE AUDIO 1
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

playSound(
audio1,
"audio1"
);

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
"-60px";

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

const angle =
Math.random() *
Math.PI *
2;

const distance =
60 +
Math.random() *
230;

const startScale =
0.4 +
Math.random() *
0.5;

const endScale =
1 +
Math.random() *
0.9;

const size =
3 +
Math.random() *
4;

particle.className =
"dust";

particle.style.position =
"absolute";

particle.style.left =
"50%";

particle.style.top =
"50%";

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

const x =
Math.cos(angle) *
distance;

const y =
Math.sin(angle) *
distance;

particle.animate(
[
{
opacity: 0,
transform:
`translate3d(
0,
0,
0
)
scale(${startScale})`
},

{
opacity: 1,
transform:
`translate3d(
0,
0,
0
)
scale(1)`
},

{
opacity: 1,
transform:
`translate3d(
${x * 0.45}px,
${y * 0.45}px,
0
)
scale(${endScale})`
},

{
opacity: 0,
transform:
`translate3d(
${x}px,
${y}px,
0
)
scale(${endScale + 0.4})`
}
],
{
duration:
1150 +
Math.random() * 250,

delay:
Math.random() * 180,

easing:
"cubic-bezier(.15,.8,.2,1)",

fill:
"forwards"
}
);

}

setTimeout(() => {

container.innerHTML = "";

}, 1600);

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
"A gathering of ideas, research and innovation. Present your work and forge your path to victory.",

images: [
"assets/images/events/paper-forge-1.png",
"assets/images/events/paper-forge-2.png",
"assets/images/events/paper-forge-3.png"
]
},

{
house:
"HOUSE STARK",

title:
"THE ORACLE",

text:
"Event details will be revealed.",

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
"Event details will be revealed.",

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
"Event details will be revealed.",

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
"Event details will be revealed.",

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

/*
   IMPORTANT:
   Screenshot showed that the gold frame was actually
   the event-modal-card, not only the image.
*/

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


/* =====================================================
   REMOVE OUTER CARD FRAME
===================================================== */

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


/* AUDIO */

unlockAudio();

playSound(
audio2,
"audio2"
);


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


/* =====================================================
   IMAGE
===================================================== */

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


/*
   PRESERVE ORIGINAL IMAGE RATIO
*/

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


/*
   REMOVE ALL IMAGE FRAME
*/

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


/* =====================================================
   IMAGE CONTROLS
===================================================== */

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

playSound(
audio1,
"audio1"
);

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

playSound(
audio1,
"audio1"
);

}
);

}


/* =====================================================
   EVENT LOADING TRANSITION
===================================================== */

if (pageTransition) {

pageTransition.classList.remove(
"transition-out"
);

pageTransition.classList.remove(
"active"
);

void pageTransition.offsetWidth;

pageTransition.classList.add(
"active"
);

pageTransition.style.setProperty(
"opacity",
"1",
"important"
);

pageTransition.style.setProperty(
"visibility",
"visible",
"important"
);

pageTransition.style.setProperty(
"pointer-events",
"all",
"important"
);

pageTransition.style.setProperty(
"transform",
"translateY(0)",
"important"
);

}


/* EXACT 2 SECOND EVENT LOADING */

setTimeout(() => {

if (audio2) {

audio2.pause();

audio2.currentTime =
0;

}

eventModal.classList.add(
"active"
);

eventModal.setAttribute(
"aria-hidden",
"false"
);

}, 2000);


/* MAGIC DUST + AUDIO 3 */

setTimeout(() => {

createMagicDust(
eventMagic,
100
);

playSound(
audio3,
"audio3"
);

}, 2050);


/* CLOSE MEDARZT LOADING */

setTimeout(() => {

if (pageTransition) {

pageTransition.classList.remove(
"active"
);

pageTransition.classList.remove(
"transition-out"
);

pageTransition.style.setProperty(
"opacity",
"0",
"important"
);

pageTransition.style.setProperty(
"visibility",
"hidden",
"important"
);

pageTransition.style.setProperty(
"pointer-events",
"none",
"important"
);

pageTransition.style.setProperty(
"transform",
"translateY(100%)",
"important"
);

pageTransition.setAttribute(
"aria-hidden",
"true"
);

}

}, 2000);

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


/*
   Keep the event modal card
   visually clean after closing too.
*/

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

unlockAudio();

playSound(
audio1,
"audio1"
);

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

unlockAudio();

playSound(
audio4,
"audio4"
);


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


setTimeout(
() => {

createMagicDust(
faqMagic,
75
);

},
30
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
   Temporary portrait image until the real Canva files are added.
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

return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
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

tracks.forEach(([track, prefix]) => {

    if (!track) {
        return;
    }

    track.querySelectorAll("img").forEach((img, index) => {

        img.onerror = () => {

            img.onerror = null;

            img.src = coordinatorFallback(
                `${prefix} ${index + 1}`
            );

        };

    });

});

}


prepareCoordinatorImages();


/* =========================================================
   COORDINATOR SLIDER
   - PREV / NEXT buttons
   - AUTO SLIDE EVERY 3 SECONDS
   - Manual click resets the 3-second timer
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


/* -----------------------------------------
   MAKE EACH SLIDE FULL WIDTH
----------------------------------------- */

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


/* -----------------------------------------
   UPDATE SLIDE
----------------------------------------- */

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


/* -----------------------------------------
   START AUTO SLIDE
   EVERY 3 SECONDS
----------------------------------------- */

function startAutoSlide() {

if (
totalSlides <= 1
) {
return;
}


/* Prevent duplicate timers */

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


/* -----------------------------------------
   STOP AUTO SLIDE
----------------------------------------- */

function stopAutoSlide() {

if (!autoSlideTimer) {
return;
}

clearInterval(
autoSlideTimer
);

autoSlideTimer = null;

}


/* -----------------------------------------
   RESET TIMER
   Manual PREV / NEXT click pannumbothu
   timer again 3 seconds-la start aagum
----------------------------------------- */

function resetAutoSlide() {

stopAutoSlide();

startAutoSlide();

}


/* -----------------------------------------
   PREVIOUS
----------------------------------------- */

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

playSound(
audio1,
"audio1"
);

/* Restart 3-second timer */

resetAutoSlide();

}
);

}


/* -----------------------------------------
   NEXT
----------------------------------------- */

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

playSound(
audio1,
"audio1"
);

/* Restart 3-second timer */

resetAutoSlide();

}
);

}


/* -----------------------------------------
   INITIAL STATE
----------------------------------------- */

update();


/* -----------------------------------------
   START AUTO PLAY
----------------------------------------- */

startAutoSlide();


/* -----------------------------------------
   RETURN CONTROLS
----------------------------------------- */

return {

reset() {

current = 0;

update();

/* Restart timer from beginning */

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


/* -----------------------------------------
   ACTIVE TAB
----------------------------------------- */

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


/* -----------------------------------------
   STAFF
----------------------------------------- */

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


/* -----------------------------------------
   STUDENTS
----------------------------------------- */

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


    playSound(
        audio1,
        "audio1"
    );

}
);

}
);

});