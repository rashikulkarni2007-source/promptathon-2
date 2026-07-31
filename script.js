// DOM Elements
const modal = document.getElementById('plannerModal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const planForm = document.getElementById('planForm');
const planOutput = document.getElementById('planOutput');
const timelineContainer = document.getElementById('timelineContainer');

// Modal Control Functions
openModalBtn.addEventListener('click', () => modal.classList.remove('hidden'));
closeModalBtn.addEventListener('click', () => modal.classList.add('hidden'));

// Close modal when clicking outside content
window.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
});

// Sample Scenarios
const samples = {
    1: {
        examName: "14-Day Physics Midterm Prep",
        examDate: getFutureDate(14),
        dailyHours: 4,
        topics: "Kinematics, Newton's Laws, Work & Energy, Rotational Motion, Gravitation, Oscillations, Waves",
        weakTopics: "Rotational Motion, Oscillations"
    },
    2: {
        examName: "60-Day Full Syllabus Mastery",
        examDate: getFutureDate(60),
        dailyHours: 3,
        topics: "Calculus, Linear Algebra, Probability, Statistics, Differential Equations, Discrete Math",
        weakTopics: "Probability, Differential Equations"
    },
    3: {
        examName: "5-Day Emergency Crash Course",
        examDate: getFutureDate(5),
        dailyHours: 6,
        topics: "Organic Chemistry, Inorganic Reactions, Physical Chemistry, Thermodynamics, Electrochemistry, Kinetics",
        weakTopics: "Thermodynamics, Organic Chemistry"
    }
};

function getFutureDate(daysAhead) {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    return d.toISOString().split('T')[0];
}

// Quick Sample Load Action
function loadSample(id) {
    const data = samples[id];
    document.getElementById('examName').value = data.examName;
    document.getElementById('examDate').value = data.examDate;
    document.getElementById('dailyHours').value = data.dailyHours;
    document.getElementById('topicList').value = data.topics;
    document.getElementById('weakTopics').value = data.weakTopics;
    
    modal.classList.remove('hidden');
}

// Form Submission Event
planForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('examName').value;
    const date = new Date(document.getElementById('examDate').value);
    const dailyHours = parseFloat(document.getElementById('dailyHours').value);
    const topics = document.getElementById('topicList').value.split(',').map(t => t.trim()).filter(Boolean);
    const weakTopics = document.getElementById('weakTopics').value.split(',').map(t => t.trim()).filter(Boolean);

    // Calculate days left
    const today = new Date();
    const timeDiff = date - today;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysLeft <= 0) {
        alert("Please choose a future date for your exam!");
        return;
    }

    generatePlan(name, daysLeft, dailyHours, topics, weakTopics);
    modal.classList.add('hidden');
});

// Scheduling Engine
function generatePlan(name, days, hoursPerDay, topics, weakTopics) {
    planOutput.classList.remove('hidden');
    document.getElementById('planTitle').innerText = name;
    
    const totalAvailableHours = days * hoursPerDay;
    document.getElementById('statTotalHours').innerText = `${totalAvailableHours} hrs`;
    document.getElementById('statDailyHours').innerText = `${hoursPerDay} hrs/d`;
    document.getElementById('statDaysLeft').innerText = `${days} Days`;

    let strategy = "Balanced Schedule";
    if (days <= 5) strategy = "🚨 Emergency Crash Plan";
    else if (days <= 14) strategy = "⚡ Focused Sprint";
    document.getElementById('statStrategy').innerText = strategy;

    timelineContainer.innerHTML = "";

    // Topic Allocation Logic
    let dayCounter = 1;
    let topicIndex = 0;

    for (let i = 1; i <= days; i++) {
        const card = document.createElement('div');
        card.className = "day-card glass-card";

        let currentTopic = topics[topicIndex % topics.length];
        let isWeak = weakTopics.some(w => currentTopic.toLowerCase().includes(w.toLowerCase()));

        // Assign revision or rest logic for longer timelines
        let taskText = `Focus Study: <strong>${currentTopic}</strong>`;
        let tagClass = isWeak ? "topic-tag priority" : "topic-tag";
        let tagLabel = isWeak ? "🔥 High Priority (Weak Area)" : "📖 Core Topic";

        if (days > 7 && i % 7 === 0) {
 // App State
let currentUser = null;
let savedPlans = [];
let currentGeneratedPlan = null;

// Course Databases
const courseSyllabus = {
    Physics: ["Kinematics & Dynamics", "Rotational Mechanics", "Thermodynamics", "Electromagnetism", "Optics & Waves", "Quantum Physics"],
    Maths: ["Differential Calculus", "Integral Calculus", "Linear Algebra", "Vector Geometry", "Probability & Stats", "Complex Numbers"],
    Chemistry: ["Organic Reaction Mechanisms", "Chemical Kinetics", "Electrochemistry", "Periodic Table & Bonding", "Thermodynamics", "Coordination Compounds"],
    English: ["Reading Comprehension", "Essay & Prose Writing", "Grammar & Syntax", "Classic Literature Analysis", "Poetry Interpretation", "Vocabulary Expansion"]
};

// Initialize Application
window.addEventListener('DOMContentLoaded', () => {
    // Check saved user session
    const storedUser = localStorage.getItem('study_user');
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
        updateUserUI();
    } else {
        // Open Sign-Up Modal immediately for unregistered visitors
        openAuthModal();
    }

    // Load History
    const storedHistory = localStorage.getItem('study_history');
    if (storedHistory) {
        savedPlans = JSON.parse(storedHistory);
        renderHistory();
    }
});

// Authentication Popup Controls
function openAuthModal() {
    document.getElementById('authModal').classList.remove('hidden');
}

function closeAuthModal() {
    document.getElementById('authModal').classList.add('hidden');
}

function handleRegistration(e) {
    e.preventDefault();
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;

    currentUser = { name, email };
    localStorage.setItem('study_user', JSON.stringify(currentUser));
    
    updateUserUI();
    closeAuthModal();

    // Trigger Popup Notification
    document.getElementById('successTitle').innerText = `Welcome, ${name}! 🎉`;
    document.getElementById('successMessage').innerText = "Your account is registered. Explore courses and create your study plan!";
    document.getElementById('successModal').classList.remove('hidden');
}

function closeSuccessModal() {
    document.getElementById('successModal').classList.add('hidden');
}

function updateUserUI() {
    if (currentUser) {
        document.getElementById('userBadge').innerText = `👤 ${currentUser.name}`;
        document.getElementById('authNavBtn').innerText = "Account Settings";
    }
}

// Modal Controls for Planner
function openPlanModal() {
    document.getElementById('plannerModal').classList.remove('hidden');
}

function closePlanModal() {
    document.getElementById('plannerModal').classList.add('hidden');
}

// Navigation Tab Switcher
function switchTab(tab) {
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));

    if (tab === 'planner') {
        document.getElementById('plannerTab').classList.remove('hidden');
        event.target.classList.add('active');
    } else if (tab === 'history') {
        document.getElementById('historyTab').classList.remove('hidden');
        event.target.classList.add('active');
        renderHistory();
    }
}

// Preset Sample Loader
function loadPreset(type) {
    const today = new Date();
    
    if (type === 'physics') {
        const targetDate = new Date(today.setDate(today.getDate() + 10)).toISOString().split('T')[0];
        generatePlan("10-Day Physics Intensive", targetDate, 5, ["Physics"], "Rotational Mechanics, Electromagnetism");
    } else if (type === 'maths') {
        const targetDate = new Date(today.setDate(today.getDate() + 14)).toISOString().split('T')[0];
        generatePlan("14-Day Calculus & Algebra Sprint", targetDate, 4, ["Maths"], "Integral Calculus");
    } else if (type === 'combo') {
        const targetDate = new Date(today.setDate(today.getDate() + 30)).toISOString().split('T')[0];
        generatePlan("30-Day Multi-Subject Finals Mastery", targetDate, 6, ["Physics", "Chemistry", "English"], "Organic Reactions, Quantum Physics");
    }
}

// Plan Form Handler
function handlePlanSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('examName').value;
    const date = document.getElementById('examDate').value;
    const dailyHours = parseFloat(document.getElementById('dailyHours').value);
    
    const selectedCourses = Array.from(document.querySelectorAll('input[name="courses"]:checked')).map(cb => cb.value);
    const weakTopics = document.getElementById('weakTopics').value.split(',').map(t => t.trim()).filter(Boolean);

    if (selectedCourses.length === 0) {
        alert("Please select at least one course (Physics, Maths, Chemistry, or English).");
        return;
    }

    generatePlan(name, date, dailyHours, selectedCourses, weakTopics);
    closePlanModal();
}

// Core Algorithmic Schedule Engine
function generatePlan(title, targetDateStr, dailyHours, courses, weakTopics) {
    const today = new Date();
    const targetDate = new Date(targetDateStr);
    const diffTime = targetDate - today;
    const daysLeft = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    // Aggregate Topics
    let combinedTopics = [];
    courses.forEach(course => {
        if (courseSyllabus[course]) {
            courseSyllabus[course].forEach(topic => {
                combinedTopics.push({ course, topic });
            });
        }
    });

    const totalHours = daysLeft * dailyHours;

    // Render Stats
    document.getElementById('planTitle').innerText = title;
    document.getElementById('planSubtitle').innerText = `Target Date: ${targetDateStr} | Days Allocated: ${daysLeft} Days`;
    document.getElementById('statTotalHours').innerText = `${totalHours} hrs`;
    document.getElementById('statDailyHours').innerText = `${dailyHours} hrs/d`;
    document.getElementById('statDaysLeft').innerText = `${daysLeft} Days`;
    document.getElementById('statCourseCount').innerText = `${courses.length} Active`;

    const timelineContainer = document.getElementById('timelineContainer');
    timelineContainer.innerHTML = "";

    const daysSchedule = [];

    for (let day = 1; day <= daysLeft; day++) {
        const topicObj = combinedTopics[(day - 1) % combinedTopics.length];
        const isWeak = weakTopics.some(w => w.length > 0 && topicObj.topic.toLowerCase().includes(w.toLowerCase()));

        const dayItem = {
            dayNum: day,
            course: topicObj.course,
            topic: topicObj.topic,
            hours: dailyHours,
            isWeak: isWeak
        };
        daysSchedule.push(dayItem);

        // Render Cards
        const card = document.createElement('div');
        card.className = "day-card glass-card";
        
        const courseClass = `tag-${topicObj.course.toLowerCase()}`;

        card.innerHTML = `
            <div class="day-header">
                <h3>Day ${day}</h3>
                <span>${dailyHours} Hours</span>
            </div>
            <p>Study Module: <strong>${topicObj.topic}</strong></p>
            <span class="course-tag ${courseClass}">${topicObj.course}</span>
            ${isWeak ? '<span class="course-tag" style="background:rgba(236,72,153,0.2); color:#f472b6;">🔥 High Priority</span>' : ''}
        `;

        timelineContainer.appendChild(card);
    }

    currentGeneratedPlan = {
        id: Date.now(),
        title,
        date: targetDateStr,
        daysLeft,
        dailyHours,
        courses,
        schedule: daysSchedule
    };

    document.getElementById('planOutput').classList.remove('hidden');
    document.getElementById('planOutput').scrollIntoView({ behavior: 'smooth' });
}

// History & Local Storage Integration
function saveCurrentPlan() {
    if (!currentGeneratedPlan) return;
    
    savedPlans.unshift(currentGeneratedPlan);
    localStorage.setItem('study_history', JSON.stringify(savedPlans));
    
    document.getElementById('historyCount').innerText = savedPlans.length;
    alert("Plan successfully saved to History! 📜");
}

function renderHistory() {
    const container = document.getElementById('historyContainer');
    document.getElementById('historyCount').innerText = savedPlans.length;

    if (savedPlans.length === 0) {
        container.innerHTML = `<div class="glass-card"><p>No saved study plans found. Generate and save one!</p></div>`;
        return;
    }

    container.innerHTML = "";
    savedPlans.forEach(plan => {
        const card = document.createElement('div');
        card.className = "history-card glass-card";
        card.innerHTML = `
            <div class="history-card-header">
                <h3>${plan.title}</h3>
                <span style="color: var(--accent-cyan);">${plan.daysLeft} Days</span>
            </div>
            <p>Courses: ${plan.courses.join(', ')}</p>
            <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 6px;">Target Date: ${plan.date}</p>
        `;
        container.appendChild(card);
    });
}