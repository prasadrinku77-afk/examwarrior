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
// DYNAMIC VIDEO & NOTE PORTAL ENGINE
// ======================================

let currentExamType = '';
let currentTier = 'PT'; 

// --- DYNAMIC MULTI-FILE PDF DATABASE ---
const pdfNotesDatabase = {
  upsc: {
    PT: {
      books: [
        { displayTitle: "Core NCERT Geography Textbooks Pack", fileName: "pdf/upsc_pt_books_ncert.pdf" },
        { displayTitle: "Indian Polity by M. Laxmikanth Highlights", fileName: "pdf/upsc_pt_books_polity.pdf" }
      ],
      pyp: [
        { displayTitle: "UPSC Prelims CSAT Paper I (2025)", fileName: "pdf/upsc_pt_csat_p1.pdf" },
        { displayTitle: "UPSC Prelims CSAT Paper II (2025)", fileName: "pdf/upsc_pt_csat_p2.pdf" },
        { displayTitle: "UPSC Prelims CSAT Paper III (2024)", fileName: "pdf/upsc_pt_csat_p3.pdf" }
      ],
      solved_pyp: [
        { displayTitle: "Solved Question Paper CSAT 2024", fileName: "pdf/upsc_pt_solved_2024.pdf" },
        { displayTitle: "Solved Question Paper CSAT 2023", fileName: "pdf/upsc_pt_solved_2023.pdf" }
      ],
      mock_test: [
        { displayTitle: "Prelims GS Full-Length Mock Test 01", fileName: "pdf/upsc_pt_mock_01.pdf" },
        { displayTitle: "Prelims GS Full-Length Mock Test 02", fileName: "pdf/upsc_pt_mock_02.pdf" }
      ],
      syllabus: [
        { displayTitle: "Official Civil Services Examination Syllabus", fileName: "pdf/upsc_pt_syllabus_official.pdf" }
      ]
    },
    Mains: {
      books: [{ displayTitle: "Mains GS Paper 1 Reference Guide", fileName: "pdf/upsc_mains_books_gs1.pdf" }],
      pyp: [{ displayTitle: "GS Essay Paper Analysis (2024)", fileName: "pdf/upsc_mains_pyp_essay.pdf" }],
      solved_pyp: [{ displayTitle: "Solved GS Paper II Archives", fileName: "pdf/upsc_mains_solved_gs2.pdf" }],
      mock_test: [{ displayTitle: "Mains Answer Writing Evaluation Mock 1", fileName: "pdf/upsc_mains_mock_1.pdf" }],
      syllabus: [{ displayTitle: "Detailed GS Content Blueprint", fileName: "pdf/upsc_mains_syllabus.pdf" }]
    }
  },
  bpsc: {
    PT: {
      books: [{ displayTitle: "Bihar Special GK Compendium", fileName: "pdf/bpsc_pt_books_bihargk.pdf" }],
      pyp: [{ displayTitle: "70th BPSC Prelims Combined Exam Paper", fileName: "pdf/bpsc_pt_pyp_70th.pdf" }],
      solved_pyp: [{ displayTitle: "69th BPSC Prelims Answer Explanations", fileName: "pdf/bpsc_pt_solved_69th.pdf" }],
      mock_test: [{ displayTitle: "Bihar Current Affairs Specialized Mock Test", fileName: "pdf/bpsc_pt_mock_current.pdf" }],
      syllabus: [{ displayTitle: "BPSC Pre Exam Structure Guidelines", fileName: "pdf/bpsc_pt_syllabus.pdf" }]
    },
    Mains: {
      books: [], pyp: [], solved_pyp: [], mock_test: [], syllabus: []
    }
  },
  bssc: {
    Default: {
      books: [{ displayTitle: "BSSC Math Quick Formulas Guide", fileName: "pdf/bssc_books_math.pdf" }],
      pyp: [{ displayTitle: "BSSC CGL Inter-Level PYP", fileName: "pdf/bssc_pyp_inter.pdf" }],
      solved_pyp: [], mock_test: [], syllabus: []
    }
  },
  "bpsc-teacher": {
    Default: {
      books: [], pyp: [], solved_pyp: [], mock_test: [], syllabus: []
    }
  },
  ssc: {
    Default: {
      books: [], pyp: [], solved_pyp: [], mock_test: [], syllabus: []
    }
  },
  railway: {
    Default: {
      books: [], pyp: [], solved_pyp: [], mock_test: [], syllabus: []
    }
  },
  banking: {
    Default: {
      books: [], pyp: [], solved_pyp: [], mock_test: [], syllabus: []
    }
  }
};

// --- ONLINE VIDEO DATABASE ---
const videoClassesDatabase = {
  upsc: {
    PT: [
      { title: "UPSC Prelims GS Strategy & Core Blueprint Analysis", channel: "Manish Kumar School", duration: "45 mins", url: "https://www.youtube.com/" },
      { title: "CSAT Logical Reasoning & Data Interpretation Tricks", channel: "Reasoning Expert", duration: "1 hr 15 mins", url: "https://www.youtube.com/" }
    ],
    Mains: [
      { title: "GS Answer Writing Frameworks & Structural Layouts", channel: "Civil Services Desk", duration: "2 hrs", url: "https://www.youtube.com/" }
    ]
  },
  bpsc: {
    PT: [
      { title: "Bihar Special History, Geography & Current Affairs", channel: "BPSC Core Academy", duration: "1 hr 30 mins", url: "https://www.youtube.com/" }
    ],
    Mains: [
      { title: "BPSC GS Paper II Polity & Economic Analysis Setup", channel: "Manish Kumar School", duration: "1 hr 40 mins", url: "https://www.youtube.com/" }
    ]
  },
  bssc: {
    Default: [
      { title: "BSSC CGL Math Shortcut Formulas & Calculation Speeds", channel: "Quantitative Aptitude", duration: "1 hr 05 mins", url: "https://www.youtube.com/" }
    ]
  },
  "bpsc-teacher": {
    Default: [
      { title: "Child Development & Pedagogy (CDP) Core Theory Lecture", channel: "Teaching Portal", duration: "1 hr 20 mins", url: "https://www.youtube.com/" }
    ]
  },
  ssc: {
    Default: [
      { title: "SSC English Grammar Complete Revision Rules Course", channel: "English Language Faculty", duration: "2 hrs 15 mins", url: "https://www.youtube.com/" }
    ]
  },
  railway: {
    Default: [
      { title: "RRB NTPC & Group D General Science Bootcamp Series", channel: "Science Desk", duration: "1 hr 12 mins", url: "https://www.youtube.com/" }
    ]
  },
  banking: {
    Default: [
      { title: "SBI & IBPS PO Quantitative Aptitude Speed Calculation Drills", channel: "Banking Focus Academy", duration: "58 mins", url: "https://www.youtube.com/" }
    ]
  }
};

window.showExamOptions = function(examId, structuralTitle) {
    currentExamType = examId;
    currentTier = 'PT'; 
    
    const initialTabTrigger = document.getElementById('notes-tab');
    if (initialTabTrigger) {
        const tabInstance = bootstrap.Tab.getOrCreateInstance(initialTabTrigger);
        tabInstance.show();
    }

    const standardGrid = document.getElementById('exam-cards-container');
    if (standardGrid) standardGrid.classList.add('d-none');
    
    const detailView = document.getElementById('resource-detail-view');
    if (detailView) detailView.classList.remove('d-none');
    
    const contextTitle = document.getElementById('selected-exam-title');
    if (contextTitle) contextTitle.innerText = structuralTitle;

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
    renderVideoLinks();
};

window.closeResourceView = function() {
    const detailView = document.getElementById('resource-detail-view');
    if (detailView) detailView.classList.add('d-none');
    
    const standardGrid = document.getElementById('exam-cards-container');
    if (standardGrid) standardGrid.classList.remove('d-none');
};

window.switchTier = function(tierName) {
    currentTier = tierName;
    renderResourceLinks();
    renderVideoLinks();
};

function renderResourceLinks() {
    const targetGrid = document.getElementById('download-links-grid');
    if (!targetGrid) return;
    
    targetGrid.innerHTML = ''; 

    const catalogShelves = [
        { id: 'books', name: 'Recommended Reference Books', icon: 'fa-book text-warning' },
        { id: 'pyp', name: 'Previous Year Papers', icon: 'fa-folder-open text-info' },
        { id: 'solved_pyp', name: 'Solved Question Papers', icon: 'fa-square-check text-success' },
        { id: 'mock_test', name: 'Mock Test Series Papers', icon: 'fa-pen-to-square text-primary' },
        { id: 'syllabus', name: 'Latest Syllabus & Guides', icon: 'fa-newspaper text-danger' }
    ];

    const examDataset = pdfNotesDatabase[currentExamType];
    let structuredGroup = null;

    if (examDataset) {
        if (currentExamType === 'upsc' || currentExamType === 'bpsc') {
            structuredGroup = examDataset[currentTier];
        } else {
            structuredGroup = examDataset['Default'];
        }
    }

    catalogShelves.forEach(category => {
        const filesArray = (structuredGroup && structuredGroup[category.id]) ? structuredGroup[category.id] : [];

        const categoryCard = document.createElement('div');
        categoryCard.className = 'col-md-6';
        
        let filesListHTML = '';
        if (filesArray.length === 0) {
            filesListHTML = `<li class="list-group-item text-muted small py-2 bg-transparent border-0 italic"><i class="fa-solid fa-ban me-2 text-black-50"></i>No active content documents uploaded yet.</li>`;
        } else {
            filesArray.forEach(fileItem => {
                filesListHTML += `
                    <li class="list-group-item d-flex align-items-center justify-content-between py-2 px-3 border-0 bg-transparent rounded mb-1 bg-white-hover transition-all" style="background: rgba(0,0,0,0.015);">
                        <span class="text-truncate text-dark small font-weight-medium me-2" title="${fileItem.displayTitle}">
                            <i class="fa-solid fa-file-lines me-2 text-secondary"></i>${fileItem.displayTitle}
                        </span>
                        <a href="${fileItem.fileName}" target="_blank" class="btn btn-xs btn-outline-primary py-1 px-2 font-monospace fw-bold flex-shrink-0" style="font-size:0.75rem;">
                            <i class="fa-solid fa-download me-1"></i> Open
                        </a>
                    </li>
                `;
            });
        }

        categoryCard.innerHTML = `
            <div class="card h-100 border rounded shadow-sm bg-light overflow-hidden">
                <div class="card-header bg-white border-bottom-0 pt-3 pb-2 d-flex align-items-center">
                    <i class="fa-solid ${category.icon} fa-lg me-2 flex-shrink-0"></i>
                    <h6 class="mb-0 text-dark fw-bold text-truncate">${category.name}</h6>
                </div>
                <div class="card-body p-2 bg-transparent">
                    <ul class="list-group list-group-flush rounded border-0">
                        ${filesListHTML}
                    </ul>
                </div>
            </div>
        `;
        targetGrid.appendChild(categoryCard);
    });
}

function renderVideoLinks() {
    const videoGrid = document.getElementById('video-links-grid');
    if (!videoGrid) return;

    videoGrid.innerHTML = '';

    const examData = videoClassesDatabase[currentExamType];
    let videosArray = [];

    if (examData) {
        if (currentExamType === 'upsc' || currentExamType === 'bpsc') {
            videosArray = examData[currentTier] || [];
        } else {
            videosArray = examData['Default'] || [];
        }
    }

    if (videosArray.length === 0) {
        videoGrid.innerHTML = `
            <div class="col-12 text-center py-4">
                <p class="text-muted mb-0"><i class="fa-solid fa-video-slash me-2"></i>No online lectures linked for this tier yet.</p>
            </div>`;
        return;
    }

    videosArray.forEach(video => {
        const videoColumn = document.createElement('div');
        videoColumn.className = 'col-md-6';
        videoColumn.innerHTML = `
            <div class="card h-100 border rounded shadow-sm bg-white overflow-hidden">
                <div class="card-body p-3 d-flex align-items-start">
                    <div class="bg-danger text-white rounded p-3 d-flex align-items-center justify-content-center me-3" style="width: 55px; height: 55px;">
                        <i class="fa-solid fa-play fa-xl"></i>
                    </div>
                    <div class="flex-grow-1 overflow-hidden">
                        <h6 class="text-dark mb-1 fw-bold text-truncate" title="${video.title}">${video.title}</h6>
                        <div class="d-flex align-items-center flex-wrap gap-2 text-muted small mt-2">
                            <span><i class="fa-solid fa-circle-user me-1 text-secondary"></i>${video.channel}</span>
                            <span class="badge bg-secondary-subtle text-secondary font-monospace">${video.duration}</span>
                        </div>
                    </div>
                </div>
                <div class="card-footer bg-light border-top p-2 d-flex justify-content-end">
                    <a href="${video.url}" target="_blank" class="btn btn-sm btn-danger px-3 fw-bold">
                        <i class="fa-brands fa-youtube me-1"></i> Watch Video Class
                    </a>
                </div>
            </div>
        `;
        videoGrid.appendChild(videoColumn);
    });
}

// ======================================
// LIVE MOCK SESSION ENGINE
// ======================================

window.startLiveCloudMockSession = function() {
    console.log("Initializing Live Cloud Mock Session...");
    
    // Customize your action here (Alerting user for now):
    alert("Mock Test Session feature is spinning up! Please check back shortly.");
    
    // Note: If you want to redirect them to a test portal layout instead, replace the line above with:
    // window.open("https://your-mocktest-url.com", "_blank");
};

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
document.addEventListener("DOMContentLoaded", animateCardsOnScroll);

console.log("Firebase Ready");
