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

    const studentName = document.getElementById("studentName")?.value || "";
    const mobileNumber = document.getElementById("mobileNumber")?.value || "";
    const emailAddress = document.getElementById("emailAddress")?.value || "";
    const course = document.getElementById("course")?.value || "";
    const studentQuery = document.getElementById("studentQuery")?.value || "";

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
      alert("Submission Failed. Check browser console for details.");
    }
  });
}

// ======================================
// DYNAMIC PDF NOTES PORTAL ENGINE
// ======================================

// Tracking states globally
let currentExamType = '';
let currentTier = 'PT'; 

// Trigger visibility transitions for nested layouts
window.showExamOptions = function(examId, structuralTitle) {
    currentExamType = examId;
    currentTier = 'PT'; // Clear state memory back to defaults
    
    // Hide parent layout cards container
    const standardGrid = document.getElementById('exam-cards-container');
    if (standardGrid) standardGrid.classList.add('d-none');
    
    // Unhide target granular workspace detail card
    const detailView = document.getElementById('resource-detail-view');
    if (detailView) detailView.classList.remove('d-none');
    
    // Set matching tracking label text
    const contextTitle = document.getElementById('selected-exam-title');
    if (contextTitle) contextTitle.innerText = structuralTitle;

    // Filter tier view button layout toggles explicitly for civil targets
    const tierBox = document.getElementById('tier-toggle-container');
    if (tierBox) {
        if (examId === 'upsc' || examId === 'bpsc') {
            tierBox.classList.remove('d-none');
            const ptRadio = document.getElementById('tierPT');
            if (ptRadio) ptRadio.checked = true;
        } else {
            tierBox.classList.add('d-none');
        }
    }

    renderResourceLinks();
};

// Return control mapping states backward
window.closeResourceView = function() {
    const detailView = document.getElementById('resource-detail-view');
    if (detailView) detailView.classList.add('d-none');
    
    const standardGrid = document.getElementById('exam-cards-container');
    if (standardGrid) standardGrid.classList.remove('d-none');
};

// Handle tier context modifications
window.switchTier = function(tierName) {
    currentTier = tierName;
    renderResourceLinks();
};

// Build sub-directory layout arrays matching uploaded PDF asset pathways
function renderResourceLinks() {
    const targetGrid = document.getElementById('download-links-grid');
    if (!targetGrid) return;
    
    targetGrid.innerHTML = ''; // Clean tracking view elements out safely

    // Flowchart resource type definitions
    const resourceTypes = [
        { name: 'Recommended Reference Books', icon: 'fa-book text-warning', file: 'books.pdf' },
        { name: 'Previous Year Papers', icon: 'fa-folder-open text-info', file: 'pyp.pdf' },
        { name: 'Solved Question Papers', icon: 'fa-square-check text-success', file: 'solved_pyp.pdf' },
        { name: 'Mock Test Series Papers', icon: 'fa-pen-to-square text-primary', file: 'mock_test.pdf' },
        { name: 'Latest Syllabus & Guides', icon: 'fa-newspaper text-danger', file: 'syllabus.pdf' }
    ];

    resourceTypes.forEach(resource => {
        // Formulate clean file string naming outputs
        let structuralPath = `pdf/${currentExamType}_`;
        if (currentExamType === 'upsc' || currentExamType === 'bpsc') {
            structuralPath += `${currentTier.toLowerCase()}_`;
        }
        structuralPath += resource.file;

        // Build Bootstrap inner columns safely
        const listColumn = document.createElement('div');
        listColumn.className = 'col-md-6 col-lg-4';
        listColumn.innerHTML = `
            <div class="p-3 border rounded d-flex align-items-center justify-content-between bg-light shadow-sm">
                <div class="d-flex align-items-center overflow-hidden me-2">
                    <i class="fa-solid ${resource.icon} fa-xl me-3 flex-shrink-0"></i>
                    <div class="text-truncate">
                        <strong class="d-block text-dark text-truncate small fw-bold">${resource.name}</strong>
                        <small class="text-muted text-uppercase font-monospace" style="font-size: 0.75rem;">
                            ${(currentExamType === 'upsc' || currentExamType === 'bpsc') ? currentTier : 'Exam'} Asset
                        </small>
                    </div>
                </div>
                <a href="${structuralPath}" target="_blank" class="btn btn-sm btn-primary flex-shrink-0 px-3">
                    <i class="fa-solid fa-download"></i> Open
                </a>
            </div>
        `;
        targetGrid.appendChild(listColumn);
    });
}

// ======================================
// SMOOTH SCROLL
// ======================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
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

const navLinks = document.querySelectorAll(".nav-link");
const navbarCollapse = document.querySelector(".navbar-collapse");

if (navbarCollapse) {
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        new bootstrap.Collapse(navbarCollapse).hide();
      }
    });
  });
}

// ======================================
// CARD ANIMATION CONTROL
// ======================================

const cards = document.querySelectorAll(".card");

cards.forEach(card => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = "all 0.6s ease";
});

function animateCardsOnScroll() {
  cards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    if (cardTop < window.innerHeight - 50) {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }
  });
}

window.addEventListener("scroll", animateCardsOnScroll);
// Run on initial page trigger to check position status of cards instantly
document.addEventListener("DOMContentLoaded", animateCardsOnScroll);

console.log("Firebase Ready");
