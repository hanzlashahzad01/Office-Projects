window.ROADMAP_MASCOT = "assets/roadmap-mascot.png";

window.getRoadmapScreenHtml = function getRoadmapScreenHtml() {
    return `
        <div class="roadmap-screen">
            <div class="roadmap-topic-header text-center mb-3">
                <h1 class="topic-title">Cell Structure & Function</h1>
                <p class="topic-subtitle">(Introduction to Cell, Plasma Membrane)</p>
            </div>

            <div class="greeting-section roadmap-greeting">
                <img src="${window.ROADMAP_MASCOT}" alt="Roadmap Mascot" class="roadmap-mascot" />
                <div class="speech-bubble shadow-sm">
                    <p class="app-subtitle text-white mb-0">Roadmap follow kro, tum is topic k master ban jao gay.</p>
                </div>
            </div>

            <div class="journey-container">
                <div class="d-flex align-items-start gap-3">
                    <div class="journey-icon-box">
                        <i class="fa-solid fa-road"></i>
                    </div>
                    <div class="flex-grow-1">
                        <h6 class="mb-0 fw-bold roadmap-journey-title">Your Roadmap</h6>
                        <p class="mb-0 roadmap-journey-sub">0/4 Steps Completed</p>
                        <div class="roadmap-progress-row">
                            <div class="progress roadmap-progress-bar">
                                <div class="progress-bar" role="progressbar" style="width: 0%"></div>
                            </div>
                            <span class="roadmap-percent">0%</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="roadmap-track">
                <svg class="roadmap-track-svg" aria-hidden="true">
                    <path class="roadmap-path-line" d="" fill="none"></path>
                </svg>

                <div class="roadmap-node left">
                    <div class="node-card">
                        <div class="node-icon"><i class="fa-solid fa-desktop"></i></div>
                        <h6>Watch Lecture & Build Concepts</h6>
                        <p>1 Video</p>
                        <button type="button" class="btn-start">Start</button>
                    </div>
                </div>

                <div class="roadmap-node right">
                    <div class="node-card">
                        <div class="node-icon"><i class="fa-regular fa-window-restore"></i></div>
                        <h6>Revise Lecture in Minutes</h6>
                        <p>39 Slides</p>
                        <button type="button" class="btn-start">Start</button>
                    </div>
                </div>

                <div class="roadmap-node left">
                    <div class="node-card">
                        <div class="node-icon"><i class="fa-solid fa-clipboard-check"></i></div>
                        <h6>Take the test. Learn through discussion</h6>
                        <p>60 MCQs</p>
                        <button type="button" class="btn-start">Start</button>
                    </div>
                </div>

                <div class="roadmap-node right">
                    <div class="node-card">
                        <div class="node-icon"><i class="fa-solid fa-clipboard-check"></i></div>
                        <h6>Incorrect MCQs Test</h6>
                        <button type="button" class="btn-locked" disabled><i class="fa-solid fa-lock"></i> Locked</button>
                    </div>
                </div>
            </div>
        </div>
    `;
};
