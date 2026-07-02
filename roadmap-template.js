window.ROADMAP_MASCOT = "assets/roadmap-mascot.png";

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
        videoUrl: "https://www.youtube.com/embed/EwY6p-r_hyY"
    },
    chemistry: {
        title: "Fundamentals Concept Of Chemistry",
        subtitle: "(Moles And Avogadro's Number)",
        videoTitle: "Introduction Of Fundamentals Concept Of Chemistry",
        videoSubtitle: " - (Moles And Avogadro's Number)",
        videoUrl: "https://www.youtube.com/embed/O552g-m1Vq4"
    },
    english: {
        title: "English & Logical Reasoning",
        subtitle: "(Parts of sentences, Phrases)",
        videoTitle: "English & Logical Reasoning",
        videoSubtitle: " - (Parts of sentences, Phrases)",
        videoUrl: "https://www.youtube.com/embed/EngW7tLk6r8"
    }
};

window.getRoadmapScreenHtml = function getRoadmapScreenHtml(subjectKey) {
    const data = window.SUBJECT_DATA[subjectKey] || window.SUBJECT_DATA.biology;
    return `
        <div class="roadmap-screen" data-subject="${subjectKey}">
            <div class="roadmap-topic-header text-center mb-3">
                <h1 class="topic-title" style="font-weight: 800; font-size: 22px;">${data.title}</h1>
                <p class="topic-subtitle" style="font-size: 13px;">${data.subtitle}</p>
            </div>

            <div class="greeting-section roadmap-greeting">
                <img src="${window.ROADMAP_MASCOT}" alt="Roadmap Mascot" class="roadmap-mascot" />
                <div class="speech-bubble shadow-sm" style="background-color: #1676dd; border: 1.5px solid rgba(255, 255, 255, 0.4);">
                    <p class="app-subtitle text-white mb-0">Roadmap follow kro, tum is topic k master ban jao gay.</p>
                </div>
            </div>

            <div class="journey-container" style="border-radius: 12px; border: 1.5px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
                <div class="d-flex align-items-start gap-3">
                    <div class="journey-icon-box" style="background-color: #f1f5f9; border: 1.5px solid #e2e8f0; border-radius: 12px; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; color: #64748b; font-size: 18px;">
                        <i class="fa-solid fa-road"></i>
                    </div>
                    <div class="flex-grow-1">
                        <div class="d-flex justify-content-between align-items-center">
                            <h6 class="mb-0 fw-bold roadmap-journey-title" style="color: #1e3a8a; font-size: 15px;">Your Roadmap</h6>
                            <span class="roadmap-percent" style="font-size: 12px; font-weight: 700; color: #1e293b;">50%</span>
                        </div>
                        <p class="mb-0 roadmap-journey-sub" style="font-size: 12px; color: #64748b; margin-top: 1px;">2/4 Steps Completed</p>
                        <div class="roadmap-progress-row" style="margin-top: 6px; gap: 0;">
                            <div class="progress roadmap-progress-bar" style="height: 6px; background-color: #e2e8f0; border-radius: 99px; width: 100%;">
                                <div class="progress-bar" role="progressbar" style="width: 50%; background-color: #22c55e;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="roadmap-track">
                <svg class="roadmap-track-svg" aria-hidden="true">
                    <path class="roadmap-path-line" d="" fill="none"></path>
                </svg>

                <div class="roadmap-node left completed">
                    <div class="node-card" style="border: 1.5px solid #e2e8f0; border-radius: 16px; box-shadow: 0 8px 20px rgba(0,0,0,0.02);">
                        <div class="node-icon">
                            <i class="fa-solid fa-desktop"></i>
                            <span class="badge-check"><i class="bi bi-check-lg"></i></span>
                        </div>
                        <h6 style="color: #12224d; font-weight: 700; font-size: 15px; margin-bottom: 4px;">Watch Lecture & Build Concepts</h6>
                        <p style="font-size: 12px; color: #64748b; margin-bottom: 12px;">1 Video</p>
                        <button type="button" class="btn-start btn-watch-lecture" style="padding: 6px 24px;">Revise</button>
                    </div>
                </div>

                <div class="roadmap-node right completed">
                    <div class="node-card" style="border: 1.5px solid #e2e8f0; border-radius: 16px; box-shadow: 0 8px 20px rgba(0,0,0,0.02);">
                        <div class="node-icon">
                            <i class="fa-regular fa-window-restore"></i>
                            <span class="badge-check"><i class="bi bi-check-lg"></i></span>
                        </div>
                        <h6 style="color: #12224d; font-weight: 700; font-size: 15px; margin-bottom: 4px;">Revise Lecture in Minutes</h6>
                        <p style="font-size: 12px; color: #64748b; margin-bottom: 12px;">39 Slides</p>
                        <button type="button" class="btn-start" style="padding: 6px 24px;">Revise</button>
                    </div>
                </div>

                <div class="roadmap-node left active">
                    <div class="node-card" style="border: 1.5px solid #e2e8f0; border-radius: 16px; box-shadow: 0 8px 20px rgba(0,0,0,0.02);">
                        <div class="node-icon"><i class="fa-solid fa-clipboard-check"></i></div>
                        <h6 style="color: #12224d; font-weight: 700; font-size: 15px; margin-bottom: 4px;">Take the test. Learn through discussion</h6>
                        <p style="font-size: 12px; color: #64748b; margin-bottom: 12px;">60 MCQs</p>
                        <button type="button" class="btn-start" style="padding: 6px 24px;">Resume</button>
                    </div>
                </div>

                <div class="roadmap-node right locked">
                    <div class="node-card" style="border: 1.5px solid #e2e8f0; border-radius: 16px; box-shadow: 0 8px 20px rgba(0,0,0,0.02);">
                        <div class="node-icon"><i class="fa-solid fa-clipboard-check"></i></div>
                        <h6 style="color: #12224d; font-weight: 700; font-size: 15px; margin-bottom: 4px;">Incorrect MCQs Test</h6>
                        <p style="font-size: 12px; color: #64748b; margin-bottom: 12px;">Locked after test completion</p>
                        <button type="button" class="btn-locked" disabled style="padding: 6px 20px; font-size: 12px;"><i class="fa-solid fa-lock" style="font-size: 10px;"></i> Locked</button>
                    </div>
                </div>
            </div>
        </div>
    `;
};
