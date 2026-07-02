const scheduleScreen = document.getElementById("schedule-screen");
const roadmapScreen = document.getElementById("roadmap-screen");
const roadmapContent = document.getElementById("roadmap-content");
const scheduleFooter = document.getElementById("schedule-footer");
const roadmapFooter = document.getElementById("roadmap-footer");
const headerHomeLink = document.getElementById("header-home-link");
const headerLogo = document.getElementById("header-logo");
const headerBackText = document.getElementById("header-back-text");
const floatingContainer = document.querySelector(".floating-container");

// Video Lecture Screen DOM Elements
const lectureScreen = document.getElementById("lecture-screen");
const lectureIframe = document.getElementById("lecture-iframe");
const lectureSubjectTitle = document.getElementById("lecture-subject-title");
const lectureTopicSubtitle = document.getElementById("lecture-topic-subtitle");
const lectureSpeechText = document.getElementById("lecture-speech-text");
const lectureFooter = document.getElementById("lecture-footer");
const lectureLikeBtn = document.getElementById("lecture-like-btn");
const lectureDislikeBtn = document.getElementById("lecture-dislike-btn");
const lectureLikesCount = document.getElementById("lecture-likes-count");
const lectureCommentInput = document.getElementById("lecture-comment-input");
const lectureSubmitBtn = document.getElementById("lecture-submit-btn");
const lectureCommentsContainer = document.getElementById("lecture-comments-container");
const lectureCommentsCounter = document.getElementById("lecture-comments-counter");
const lectureLoadMoreBtn = document.getElementById("lecture-load-more-btn");
const lectureBackToRoadmap = document.getElementById("lecture-back-to-roadmap");
const lectureNextStep = document.getElementById("lecture-next-step");

let activeSubject = 'biology';

// Predefined Comments
const INITIAL_COMMENTS = [
    { name: "FAHEEM ULLAH", comment: "I'm ready sir" },
    { name: "Eman", comment: "Yes sir I with you" },
    { name: "Eman", comment: "Yes I will sir" },
    { name: "Harmain Arif", comment: "Yes I will win InshaAllah" },
    { name: "Harmain Arif", comment: "Yes I m ready" }
];

// Interactive States per Subject
const subjectStates = {
    biology: {
        likes: 714,
        liked: null,
        comments: [...INITIAL_COMMENTS]
    },
    physics: {
        likes: 582,
        liked: null,
        comments: [
            { name: "Ali Khan", comment: "Excellent explanation of displacement and velocity vectors!" },
            { name: "Sana", comment: "Equations of motion are super clear now." },
            ...INITIAL_COMMENTS
        ]
    },
    chemistry: {
        likes: 649,
        liked: null,
        comments: [
            { name: "Zainab", comment: "The mole concept is simplified so well." },
            { name: "Ahmad", comment: "Ready to solve MCQs on stoichiometry!" },
            ...INITIAL_COMMENTS
        ]
    },
    english: {
        likes: 412,
        liked: null,
        comments: [
            { name: "Fatima", comment: "Phrases and sentences structure is perfect." },
            { name: "Hamza", comment: "I am ready for the test sir." },
            ...INITIAL_COMMENTS
        ]
    }
};

// Initialize roadmap on load, checking for query parameters
const urlParams = new URLSearchParams(window.location.search);
const roadmapParam = urlParams.get('roadmap');
if (roadmapParam && window.SUBJECT_DATA[roadmapParam]) {
    activeSubject = roadmapParam;
    // Wait a brief moment for page resources to load before drawing the curvy path
    setTimeout(() => {
        openRoadmap({
            currentTarget: {
                getAttribute: () => roadmapParam
            }
        });
    }, 100);
} else if (roadmapContent && typeof getRoadmapScreenHtml === "function") {
    roadmapContent.innerHTML = getRoadmapScreenHtml(activeSubject);
}

function updateRoadmapPath() {
    const track = document.querySelector(".roadmap-track");
    const svg = document.querySelector(".roadmap-track-svg");
    const path = document.querySelector(".roadmap-path-line");
    if (!track || !svg || !path) return;

    // Set SVG size to match the track container
    const trackWidth = track.clientWidth;
    const trackHeight = track.clientHeight;
    svg.setAttribute("width", trackWidth);
    svg.setAttribute("height", trackHeight);
    svg.setAttribute("viewBox", `0 0 ${trackWidth} ${trackHeight}`);

    const nodes = document.querySelectorAll(".roadmap-node");
    const coords = [];
    const cardBottoms = [];
    const iconRadii = [];
    const trackRect = track.getBoundingClientRect();

    nodes.forEach((node) => {
        const icon = node.querySelector(".node-icon");
        const card = node.querySelector(".node-card");
        if (icon && card) {
            const iconRect = icon.getBoundingClientRect();
            const cardRect = card.getBoundingClientRect();
            
            // Calculate center of the icon relative to the track container
            const x = iconRect.left - trackRect.left + iconRect.width / 2;
            const y = iconRect.top - trackRect.top + iconRect.height / 2;
            coords.push({ x, y });
            
            iconRadii.push(iconRect.width / 2);
            cardBottoms.push(cardRect.bottom - trackRect.top);
        }
    });

    if (coords.length < 2) return;

    let d = "";
    
    for (let i = 0; i < coords.length - 1; i++) {
        const p1 = coords[i];
        const p2 = coords[i + 1];
        const r1 = iconRadii[i];
        const r2 = iconRadii[i + 1];
        const cardBottom = cardBottoms[i];
        
        const isMobile = window.innerWidth <= 480;
        const y_start = p1.y + r1;
        const y_end = p2.y - r2;
        const Y_bottom = cardBottom + (isMobile ? 10 : 15);
        const direction = p2.x > p1.x ? 1 : -1;
        
        // Define corner radius R
        const R = Math.min(isMobile ? 12 : 20, Math.abs(p2.x - p1.x) / 2);
        
        if (i === 0) {
            d += `M ${p1.x} ${y_start}`;
        } else {
            d += ` L ${p1.x} ${y_start}`;
        }
        
        // Flat-bottomed U-shape path segments
        d += ` L ${p1.x} ${Y_bottom - R}`;
        d += ` Q ${p1.x} ${Y_bottom} ${p1.x + direction * R} ${Y_bottom}`;
        d += ` L ${p2.x - direction * R} ${Y_bottom}`;
        d += ` Q ${p2.x} ${Y_bottom} ${p2.x} ${Y_bottom + R}`;
    }
    
    // Add the final straight line to the last coordinate's y_end
    const lastIdx = coords.length - 1;
    d += ` L ${coords[lastIdx].x} ${coords[lastIdx].y - iconRadii[lastIdx]}`;

    path.setAttribute("d", d);
}

function openRoadmap(event) {
    let subjectKey = 'biology';
    if (event && event.currentTarget) {
        subjectKey = event.currentTarget.getAttribute("data-subject") || 'biology';
    }
    activeSubject = subjectKey;

    roadmapContent.innerHTML = getRoadmapScreenHtml(subjectKey);

    scheduleScreen.classList.remove("active");
    roadmapScreen.classList.add("active");
    lectureScreen.classList.remove("active");
    
    scheduleFooter.classList.add("d-none");
    lectureFooter.style.display = "none";
    roadmapFooter.style.display = "flex";
    document.body.classList.add("roadmap-active");
    
    headerLogo.classList.add("d-none");
    headerBackText.classList.remove("d-none");
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // Attach click listener for Start watch lecture button to load Dashboard.html
    const watchLectureBtn = roadmapContent.querySelector(".btn-watch-lecture");
    if (watchLectureBtn) {
        watchLectureBtn.addEventListener("click", () => {
            window.location.href = `Dashboard.html?subject=${activeSubject}`;
        });
    }

    // Draw the curvy path once the elements are visible
    updateRoadmapPath();
    setTimeout(updateRoadmapPath, 20);
    setTimeout(updateRoadmapPath, 150);
}

function openVideoLecture(subjectKey) {
    activeSubject = subjectKey;
    const data = window.SUBJECT_DATA[subjectKey] || window.SUBJECT_DATA.biology;

    scheduleScreen.classList.remove("active");
    roadmapScreen.classList.remove("active");
    lectureScreen.classList.add("active");

    scheduleFooter.classList.add("d-none");
    roadmapFooter.style.display = "none";
    lectureFooter.style.display = "flex";
    document.body.classList.remove("roadmap-active");

    headerLogo.classList.add("d-none");
    headerBackText.classList.remove("d-none");

    // Populate data
    lectureIframe.src = data.videoUrl;
    lectureSubjectTitle.textContent = data.videoTitle;
    lectureTopicSubtitle.textContent = data.videoSubtitle;
    
    // Adjust mascot text
    if (subjectKey === 'biology') {
        lectureSpeechText.textContent = "Aakhir tak dekho… End pe tum khud bologe: “Yaar, yeh itna easy tha?”.";
    } else if (subjectKey === 'physics') {
        lectureSpeechText.textContent = "Force & Motion is full of concepts. Pay attention to velocity-time graphs!";
    } else if (subjectKey === 'chemistry') {
        lectureSpeechText.textContent = "Moles and stoichiometry calculations are simple if you follow this approach.";
    } else {
        lectureSpeechText.textContent = "English grammar rules and sentence structures made crystal clear.";
    }

    // Likes/dislikes interactive states
    updateLikesUI();

    // Render comments
    renderCommentsList();

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function showRoadmapFromLecture() {
    // Stop YouTube video playback
    lectureIframe.src = "";

    lectureScreen.classList.remove("active");
    roadmapScreen.classList.add("active");
    
    lectureFooter.style.display = "none";
    roadmapFooter.style.display = "flex";
    document.body.classList.add("roadmap-active");
    
    // Redraw curvy path
    updateRoadmapPath();
    setTimeout(updateRoadmapPath, 20);
    setTimeout(updateRoadmapPath, 150);
}

function showSchedule() {
    // Stop YouTube video playback if going back from video
    lectureIframe.src = "";

    roadmapScreen.classList.remove("active");
    lectureScreen.classList.remove("active");
    scheduleScreen.classList.add("active");
    
    roadmapFooter.style.display = "none";
    lectureFooter.style.display = "none";
    scheduleFooter.classList.remove("d-none");
    document.body.classList.remove("roadmap-active");
    
    headerBackText.classList.add("d-none");
    headerLogo.classList.remove("d-none");
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateLikesUI() {
    const state = subjectStates[activeSubject];
    lectureLikesCount.textContent = state.likes;

    const fillUp = document.getElementById("lecture-up-fill");
    const emptyUp = document.getElementById("lecture-up-empty");
    const fillDown = document.getElementById("lecture-down-fill");
    const emptyDown = document.getElementById("lecture-down-empty");

    if (state.liked === true) {
        fillUp.classList.remove("d-none");
        emptyUp.classList.add("d-none");
        fillDown.classList.add("d-none");
        emptyDown.classList.remove("d-none");
    } else if (state.liked === false) {
        fillUp.classList.add("d-none");
        emptyUp.classList.remove("d-none");
        fillDown.classList.remove("d-none");
        emptyDown.classList.add("d-none");
    } else {
        fillUp.classList.add("d-none");
        emptyUp.classList.remove("d-none");
        fillDown.classList.add("d-none");
        emptyDown.classList.remove("d-none");
    }
}

function renderCommentsList() {
    const state = subjectStates[activeSubject];
    lectureCommentsCounter.textContent = `(${state.comments.length})`;
    
    lectureCommentsContainer.innerHTML = "";
    state.comments.forEach((comment) => {
        const commentHtml = `
            <div class="d-flex mt-3 align-items-start">
                <div class="flex-shrink-0">
                    <div class="bg-light rounded-circle border d-flex align-items-center justify-content-center" style="width: 32px; height: 32px;">
                        <i class="bi bi-person text-secondary"></i>
                    </div>
                </div>
                <div class="flex-grow-1 ms-2">
                    <div>
                        <strong style="font-size: 0.9rem; text-transform: capitalize; color: #12224d;">${comment.name}</strong>
                        <p class="mb-0 text-muted" style="font-size: 0.85rem; word-break: break-word;">${comment.comment}</p>
                    </div>
                </div>
            </div>
        `;
        lectureCommentsContainer.insertAdjacentHTML("beforeend", commentHtml);
    });
}

// Attach Events for timeline items
document.querySelectorAll(".timeline-container .task-wrapper").forEach((item) => {
    item.addEventListener("click", openRoadmap);
});

// Header Back Link Event
headerHomeLink.addEventListener("click", (event) => {
    if (roadmapScreen.classList.contains("active")) {
        event.preventDefault();
        showSchedule();
    } else if (lectureScreen.classList.contains("active")) {
        event.preventDefault();
        showRoadmapFromLecture();
    }
});

// Footer Roadmap / Back to Schedule Events
document.querySelectorAll("[data-back-schedule]").forEach((button) => {
    button.addEventListener("click", showSchedule);
});

lectureBackToRoadmap.addEventListener("click", showRoadmapFromLecture);

lectureNextStep.addEventListener("click", () => {
    alert("Moving to next step: Revise Lecture in Minutes!");
    showRoadmapFromLecture();
});

// Comment Input & Posting Interactivity
lectureCommentInput.addEventListener("focus", () => {
    lectureSubmitBtn.disabled = lectureCommentInput.value.trim() === "";
});

lectureCommentInput.addEventListener("input", () => {
    lectureSubmitBtn.disabled = lectureCommentInput.value.trim() === "";
});

lectureSubmitBtn.addEventListener("click", () => {
    const text = lectureCommentInput.value.trim();
    if (text === "") return;

    const state = subjectStates[activeSubject];
    state.comments.unshift({
        name: "Testing User",
        comment: text
    });

    lectureCommentInput.value = "";
    lectureSubmitBtn.disabled = true;
    
    renderCommentsList();
});

// Likes/Dislikes Toggles
lectureLikeBtn.addEventListener("click", () => {
    const state = subjectStates[activeSubject];
    if (state.liked === true) {
        state.liked = null;
        state.likes--;
    } else {
        if (state.liked === false) {
            state.liked = null;
        }
        state.liked = true;
        state.likes++;
    }
    updateLikesUI();
});

// Dislikes click
lectureDislikeBtn.addEventListener("click", () => {
    const state = subjectStates[activeSubject];
    if (state.liked === false) {
        state.liked = null;
    } else {
        if (state.liked === true) {
            state.likes--;
        }
        state.liked = false;
    }
    updateLikesUI();
});

// Show more comments action
lectureLoadMoreBtn.addEventListener("click", () => {
    const state = subjectStates[activeSubject];
    state.comments.push(
        { name: "Kashif Ali", comment: "Really nice explanations, sir." },
        { name: "Areeba", comment: "Very helpful video lectures for entry test preparations." }
    );
    renderCommentsList();
    lectureLoadMoreBtn.style.display = "none";
});

// Window events to handle path drawing
window.addEventListener("resize", updateRoadmapPath);
window.addEventListener("load", updateRoadmapPath);
