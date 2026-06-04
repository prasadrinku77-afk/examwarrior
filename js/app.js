// ======================================
// MANISH KUMAR SCHOOL
// APP.JS
// ======================================

console.log("Website Loaded Successfully");

// ======================================
// ADMISSION FORM
// ======================================

const admissionForm = document.getElementById("admissionForm");

if(admissionForm){

admissionForm.addEventListener("submit", function(e){

e.preventDefault();

alert(
"Thank you for your application. Our team will contact you shortly."
);

admissionForm.reset();

});

}

// ======================================
// SMOOTH SCROLL
// ======================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

anchor.addEventListener('click', function (e) {

e.preventDefault();

const target = document.querySelector(
this.getAttribute('href')
);

if(target){

target.scrollIntoView({
behavior:'smooth'
});

}

});

});

// ======================================
// MOBILE MENU AUTO CLOSE
// ======================================

const navLinks = document.querySelectorAll('.nav-link');

const navbarCollapse =
document.querySelector('.navbar-collapse');

navLinks.forEach(link => {

link.addEventListener('click', () => {

if(navbarCollapse.classList.contains('show')){

new bootstrap.Collapse(navbarCollapse).hide();

}

});

});

// ======================================
// SIMPLE SCROLL ANIMATION
// ======================================

const cards = document.querySelectorAll('.card');

window.addEventListener('scroll', () => {

cards.forEach(card => {

const cardTop =
card.getBoundingClientRect().top;

if(cardTop < window.innerHeight - 50){

card.style.opacity = "1";
card.style.transform = "translateY(0)";

}

});

});

// Initial state

cards.forEach(card => {

card.style.opacity = "0";

card.style.transform = "translateY(30px)";

card.style.transition =
"all 0.6s ease";

});

// ======================================
// FUTURE FIREBASE READY
// ======================================

// Firebase code will be added in Phase 2

console.log("Ready for Firebase Integration");
