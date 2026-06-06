// ======================================
// MANISH KUMAR SCHOOL
// APP.JS
// ======================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

console.log("Website Loaded Successfully");

// ======================================
// FIREBASE CONFIG
// ======================================

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

// ======================================
// ADMISSION FORM FIREBASE SAVE
// ======================================

const admissionForm = document.getElementById("admissionForm");

if (admissionForm) {

  admissionForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const studentName =
      document.getElementById("studentName")?.value || "";

    const mobileNumber =
      document.getElementById("mobileNumber")?.value || "";

    const emailAddress =
      document.getElementById("emailAddress")?.value || "";

    const course =
      document.getElementById("course")?.value || "";

    const studentQuery =
      document.getElementById("studentQuery")?.value || "";

    try {

      await addDoc(collection(db, "admissions"), {
        studentName,
        mobileNumber,
        emailAddress,
        course,
        studentQuery,
        createdAt: serverTimestamp()
      });

      alert("Application Submitted Successfully!");

      admissionForm.reset();

    } catch (error) {

      console.error("Firebase Error:", error);

      alert(
        "Submission Failed. Check browser console for details."
      );

    }

  });

}

// ======================================
// SMOOTH SCROLL
// ======================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

  anchor.addEventListener("click", function (e) {

    e.preventDefault();

    const target =
      document.querySelector(this.getAttribute("href"));

    if (target) {

      target.scrollIntoView({
        behavior: "smooth"
      });

    }

  });

});

// ======================================
// MOBILE MENU AUTO CLOSE
// ======================================

const navLinks =
  document.querySelectorAll(".nav-link");

const navbarCollapse =
  document.querySelector(".navbar-collapse");

if (navbarCollapse) {

  navLinks.forEach(link => {

    link.addEventListener("click", () => {

      if (navbarCollapse.classList.contains("show")) {

        new bootstrap.Collapse(
          navbarCollapse
        ).hide();

      }

    });

  });

}

// ======================================
// CARD ANIMATION
// ======================================

const cards =
  document.querySelectorAll(".card");

cards.forEach(card => {

  card.style.opacity = "0";

  card.style.transform =
    "translateY(30px)";

  card.style.transition =
    "all 0.6s ease";

});

window.addEventListener("scroll", () => {

  cards.forEach(card => {

    const cardTop =
      card.getBoundingClientRect().top;

    if (cardTop < window.innerHeight - 50) {

      card.style.opacity = "1";

      card.style.transform =
        "translateY(0)";

    }

  });

});

console.log("Firebase Ready");
