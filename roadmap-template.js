window.ROADMAP_MASCOT_SRC = "assets/roadmap-mascot.png";

window.SUBJECT_DATA = {
    biology: {
        title: "Cell Structure & Function",
        subtitle: "(Introduction to Cell, Plasma Membrane)",
        videoTitle: "Cell Structure & Function",
        videoSubtitle: " - (Introduction to Cell, Plasma Membrane)",
        videoUrl: "https://www.youtube.com/embed/8IlzKri08kk"
    },
    physics: {
        title: "Force And Motion",
        subtitle: "(Displacement, Velocity, Acceleration, Equations of Motion)",
        videoTitle: "Force And Motion",
        videoSubtitle: " - (Displacement, Velocity, Acceleration, Equations of Motion)",
        videoUrl: "https://www.youtube.com/embed/q3ELSPuVDVY"
    },
    chemistry: {
        title: "Fundamentals Concept Of Chemistry",
        subtitle: "(Moles And Avogadro's Number)",
        videoTitle: "Introduction Of Fundamentals Concept Of Chemistry",
        videoSubtitle: " - (Moles And Avogadro's Number)",
        videoUrl: "https://www.youtube.com/embed/VTzViGFqF2k"
    },
    english: {
        title: "English & Logical Reasoning",
        subtitle: "(Parts of sentences, Phrases)",
        videoTitle: "English & Logical Reasoning",
        videoSubtitle: " - (Parts of sentences, Phrases)",
        videoUrl: "https://www.youtube.com/embed/ouYIhN4Kujc"
    }
};

window.getRoadmapScreenHtml = function getRoadmapScreenHtml(subjectKey) {
    const data = window.SUBJECT_DATA[subjectKey] || window.SUBJECT_DATA.biology;
    const mascot = window.ROADMAP_MASCOT_SRC;
    return `
        <div class="roadmap-screen" data-subject="${subjectKey}">

            <!-- ── Topic Header ── -->
            <div class="roadmap-topic-header text-center mb-2">
                <h1 class="topic-title">${data.title}</h1>
                <p class="topic-subtitle">${data.subtitle}</p>
            </div>

            <!-- ── Mascot + Banner Row ── -->
            <div class="roadmap-welcome-row d-flex align-items-start">
                <div class="roadmap-mascot-wrap">
                    <img src="${mascot}" alt="Learning roadmap assistant" class="roadmap-mascot">
                </div>
                <div class="banner-card flex-grow-1">
                    Roadmap follow kro, tum is topic k master ban jao gay.
                </div>
            </div>

            <!-- ── Progress Card ── -->
            <div class="progress-card mb-1">
                <div class="d-flex align-items-center gap-2 w-100">
                    <div style="font-size:24px;">
                        <i class="fa-solid fa-road text-muted"></i>
                    </div>
                    <div>
                        <h5 class="mb-0 fw-bold" style="font-size:16px;color:#1754bb;">Your Roadmap</h5>
                        <p class="mb-0 text-muted" style="font-size:11px;">2/4 Steps Completed</p>
                    </div>
                    <span class="ms-auto fw-bold" style="font-size:12px;color:#1e293b;">50%</span>
                </div>
                <div class="custom-bar w-100">
                    <div class="custom-bar-fill h-100" style="width:50%"></div>
                </div>
            </div>

            <!-- ── Timeline ── -->
            <div class="roadmap-timeline-container">

                <!-- Step 1 – Watch Lecture (icon LEFT) -->
                <div class="d-flex align-items-center step-block">
                    <!-- connector svg to next step -->
                    <svg class="connector-path" viewBox="0 0 476 96" fill="none"
                         xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                        <path d="M 38,0 L 38,40 C 38,58 58,58 80,58 L 396,58 C 418,58 438,58 438,78 L 438,96"
                              stroke="#1d52df" stroke-width="2.5" stroke-dasharray="6 5"
                              stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                    <div class="icon-column" style="cursor:pointer;" id="icon-watch-lecture">
                        <div class="node-circle completed">
                            <i class="bi bi-display"></i>
                            <span class="sub-badge bg-success"><i class="bi bi-check-lg"></i></span>
                        </div>
                    </div>

                    <div class="card-column" style="cursor:pointer;" id="card-watch-lecture">
                        <div class="step-card">
                            <div class="step-title">Watch Lecture &amp; Build Concepts</div>
                            <div class="d-flex gap-2 align-items-center mt-1 mb-1">
                                <span class="step-subtitle fw-normal">1 Video</span>
                            </div>
                            <button class="btn-action btn-revise btn-watch-lecture" type="button">Revise</button>
                        </div>
                    </div>
                </div>

                <!-- Step 2 – Revise Slides (icon RIGHT) -->
                <div class="d-flex align-items-center step-block flex-row-reverse">
                    <!-- connector svg to next step -->
                    <svg class="connector-path" viewBox="0 0 476 96" fill="none"
                         xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                        <path d="M 438,0 L 438,40 C 438,58 418,58 396,58 L 80,58 C 58,58 38,58 38,78 L 38,96"
                              stroke="#1d52df" stroke-width="2.5" stroke-dasharray="6 5"
                              stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                    <div class="icon-column" style="cursor:pointer;" id="icon-revise-slides">
                        <div class="node-circle completed">
                            <i class="bi bi-window-stack"></i>
                            <span class="sub-badge bg-success"><i class="bi bi-check-lg"></i></span>
                        </div>
                    </div>

                    <div class="card-column" style="cursor:pointer;" id="card-revise-slides">
                        <div class="step-card">
                            <div class="step-title">Revise Lecture in Minutes</div>
                            <div class="d-flex gap-2 align-items-center mt-1 mb-1">
                                <span class="step-subtitle fw-normal">39 Slides</span>
                            </div>
                            <button class="btn-action btn-revise btn-revise-slides" type="button">Revise</button>
                        </div>
                    </div>
                </div>

                <!-- Step 3 – Take Test (icon LEFT) -->
                <div class="d-flex align-items-center step-block">
                    <!-- connector svg to next step -->
                    <svg class="connector-path" viewBox="0 0 476 96" fill="none"
                         xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                        <path d="M 38,0 L 38,40 C 38,58 58,58 80,58 L 396,58 C 418,58 438,58 438,78 L 438,96"
                              stroke="#1d52df" stroke-width="2.5" stroke-dasharray="6 5"
                              stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                    <div class="icon-column" style="cursor:pointer;" id="icon-take-test">
                        <div class="node-circle active">
                            <i class="bi bi-clipboard-check"></i>
                        </div>
                    </div>

                    <div class="card-column" style="cursor:pointer;" id="card-take-test">
                        <div class="step-card">
                            <div class="step-title">Take the test. Learn through discussion</div>
                            <div class="d-flex gap-2 align-items-center mt-1 mb-1">
                                <span class="step-subtitle fw-normal">60 MCQs</span>
                            </div>
                            <button class="btn-action btn-resume" type="button">Resume</button>
                        </div>
                    </div>
                </div>

                <!-- Step 4 – Incorrect MCQs (icon RIGHT, locked) -->
                <div class="d-flex align-items-center step-block flex-row-reverse">

                    <div class="icon-column" id="icon-incorrect-mcqs">
                        <div class="node-circle pending">
                            <i class="bi bi-clipboard-check" style="color:var(--orange-alert)"></i>
                        </div>
                    </div>

                    <div class="card-column" id="card-incorrect-mcqs">
                        <div class="step-card">
                            <div class="step-title">Incorrect MCQs Test</div>
                            <div class="d-flex gap-2 align-items-center mt-1 mb-1"></div>
                            <button class="btn-action btn-locked-action" type="button" disabled>
                                <i class="bi bi-lock text-secondary"></i> Locked
                            </button>
                        </div>
                    </div>
                </div>

            </div><!-- /roadmap-timeline-container -->
        </div>
    `;
};
