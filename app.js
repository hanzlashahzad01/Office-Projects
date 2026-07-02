const scheduleScreen = document.getElementById("schedule-screen");
const roadmapScreen = document.getElementById("roadmap-screen");
const roadmapContent = document.getElementById("roadmap-content");
const scheduleFooter = document.getElementById("schedule-footer");
const roadmapFooter = document.getElementById("roadmap-footer");
const headerHomeLink = document.getElementById("header-home-link");
const headerLogo = document.getElementById("header-logo");
const headerBackText = document.getElementById("header-back-text");
const floatingContainer = document.querySelector(".floating-container");

if (roadmapContent && typeof getRoadmapScreenHtml === "function") {
    roadmapContent.innerHTML = getRoadmapScreenHtml();
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

function openRoadmap() {
    scheduleScreen.classList.remove("active");
    roadmapScreen.classList.add("active");
    scheduleFooter.classList.add("d-none");
    roadmapFooter.style.display = "flex";
    headerLogo.classList.add("d-none");
    headerBackText.classList.remove("d-none");
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // Draw the curvy path once the elements are visible
    updateRoadmapPath();
    setTimeout(updateRoadmapPath, 20);
    setTimeout(updateRoadmapPath, 150);
}

function showSchedule() {
    roadmapScreen.classList.remove("active");
    scheduleScreen.classList.add("active");
    roadmapFooter.style.display = "none";
    scheduleFooter.classList.remove("d-none");
    headerBackText.classList.add("d-none");
    headerLogo.classList.remove("d-none");
    window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll(".timeline-container .task-wrapper").forEach((item) => {
    item.addEventListener("click", openRoadmap);
});

headerHomeLink.addEventListener("click", (event) => {
    if (roadmapScreen.classList.contains("active")) {
        event.preventDefault();
        showSchedule();
    }
});

document.querySelectorAll("[data-back-schedule]").forEach((button) => {
    button.addEventListener("click", showSchedule);
});

// Window events to handle path drawing
window.addEventListener("resize", updateRoadmapPath);
window.addEventListener("load", updateRoadmapPath);
