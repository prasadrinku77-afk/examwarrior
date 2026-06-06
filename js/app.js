// ======================================
// MANISH KUMAR SCHOOL
// APP.JS
// ======================================

console.log("Website Loaded Successfully");
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
// ======================
// ADMISSION FORM
// ======================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA8uZDSlXt9Jfglhh47zyo0wjdRxHuFMRc",
  authDomain: "mk-school-300b3.firebaseapp.com",
  projectId: "mk-school-300b3",
  storageBucket: "mk-school-300b3.firebasestorage.app",
  messagingSenderId: "153218908826",
  appId: "1:153218908826:web:c71655455007f525431523",
  measurementId: "G-6959G49TVX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const admissionForm = document.getElementById("admissionForm");

if (admissionForm) {

  admissionForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    try {

      await addDoc(collection(db, "admissions"), {

        studentName:
          document.getElementById("studentName").value,

        mobileNumber:
          document.getElementById("mobileNumber").value,

        emailAddress:
          document.getElementById("emailAddress").value,

        course:
          document.getElementById("course").value,

        query:
          document.getElementById("studentQuery").value,

        createdAt: serverTimestamp()

      });

      alert("Application Submitted Successfully!");

      admissionForm.reset();

    } catch (error) {

      console.error(error);

      alert("Submission Failed!");

    }

  });

}
