/* ==========================================================
   PORTFOLIO DATA — edit content here, never in the HTML.
   Only verified facts are included. Empty/null = not shown.
   ========================================================== */
window.SITE = {
  name: "Aman Pasi",
  email: "amanpasi579@gmail.com",
  github: "https://github.com/amanpasi2005",
  linkedin: null, // TODO: add your real LinkedIn URL, e.g. "https://www.linkedin.com/in/your-handle"
  resume: null,   // TODO: drop your PDF in /assets and set e.g. "assets/Aman_Pasi_Resume.pdf"
  roles: ["Software Developer", "Full-Stack Developer", "AI Builder", "Product Builder"],
};

/* tags drive the filters: personal | live | web | mobile | ai | fullstack */
window.PROJECTS = [
  {
    id: "grab-ur-ticket", name: "Grab Ur Ticket", flagship: true,
    kind: "Personal Project · Flagship", status: "Flagship Build", statusType: "build",
    tags: ["personal", "mobile", "fullstack", "ai"],
    tagline: "A complete movie ticketing platform, from seat to scan.",
    description: "Flutter + Firebase movie ticket booking platform covering the full journey: theatre and showtime selection, live seat locking, payments, QR tickets and an admin side.",
    problem: "Booking a show involves many disconnected steps: finding a theatre, grabbing seats before someone else does, paying, getting to the venue and proving the ticket is valid.",
    solution: "One app that handles the whole flow, with real-time seat locking to avoid double booking, Razorpay payments, QR tickets with verification, and extras like snacks and ride scheduling.",
    features: ["Theatre & showtime selection", "Real-time seat locking", "Razorpay payments", "Snacks ordering", "Ride scheduling", "QR tickets & ticket verification", "Ticket resale / exchange", "Premium pass", "AI recommendations", "Admin features"],
    stack: ["Flutter / Dart", "Firebase", "Firestore", "Razorpay", "AI integrations"],
    image: "assets/grab-ur-ticket.webp", imageAlt: "Grab Ur Ticket home screen showing a trailer carousel, new releases and event categories",
    links: { github: "https://github.com/amanpasi2005/GrabUrTicket" },
  },
  {
    id: "vexora", name: "Vexora", flagship: true,
    kind: "Personal Startup / Product", status: "Building", statusType: "build",
    tags: ["personal", "ai"],
    tagline: "Remember Less. Live More.",
    description: "An AI-powered personal intelligence platform built around intelligent memory, automation and life management, with privacy as a core principle.",
    problem: "People carry too much in their heads: tasks, plans, details and decisions spread across many tools.",
    solution: "A single intelligent layer that remembers for you, automates routine work and keeps your personal data private, so you can focus on living.",
    features: ["Intelligent memory", "Personal productivity", "Automation", "Life management", "Privacy-first approach"],
    stack: ["AI integrations"],
    links: {},
  },
  {
    id: "techedge", name: "TechEdge", live: true,
    kind: "Live College Project", status: "Live / Ongoing", statusType: "live",
    tags: ["live", "web", "fullstack"],
    tagline: "A real event platform, actively used by my college.",
    description: "A live, ongoing technology project for my college: a professional conference / event platform with registration workflows, backend functionality and payment integration.",
    problem: "Running a college event needs reliable registration and payment handling rather than manual coordination.",
    solution: "A working platform that manages registrations end to end and takes payments online, including Cashfree where implemented.",
    features: ["Professional conference / event platform", "Registration workflows", "Backend functionality", "Payment integration (Cashfree where implemented)"],
    stack: ["Cashfree"], // TODO: add the rest of the TechEdge stack
    links: {},
  },
  {
    id: "college-conference", name: "International Conference Website", live: true,
    kind: "Live College Project", status: "Live", statusType: "live",
    tags: ["live", "web"],
    tagline: "The official International Conference 2027 website for IMED, Pune.",
    description: "A live conference website built for the college's International Conference 2027 (26-27 February 2027), hosted by IMED, Bharati Vidyapeeth, Pune.",
    problem: "The conference needs a dependable, professional online presence.",
    solution: "A purpose-built conference website, developed as a live project with the college team.",
    features: [], // TODO: list only features that exist in the project
    stack: [],    // TODO: add the real stack
    links: { demo: "https://conference.imedpune.org/" },
  },
  {
    id: "scanmyresume", name: "ScanMyResume",
    kind: "Personal Project", status: "Personal Project", statusType: "personal",
    tags: ["personal", "web", "fullstack"],
    tagline: "See your resume the way an ATS does.",
    description: "Next.js + TypeScript resume and ATS analysis platform.",
    problem: "Many resumes get filtered out by applicant tracking systems before a person reads them, and candidates rarely know why.",
    solution: "Upload a resume, get it parsed and scored for ATS-friendliness, then receive concrete suggestions and analytics.",
    features: ["Resume upload", "Resume parsing", "ATS scoring", "Improvement suggestions", "Analytics"],
    stack: ["Next.js", "TypeScript"],
    links: {},
  },
  {
    id: "studyforge", name: "StudyForge",
    kind: "Personal Project", status: "Personal Project", statusType: "personal",
    tags: ["personal", "web", "fullstack"],
    tagline: "Turn your notes into a game you want to play.",
    description: "FastAPI + SQLite gamified learning platform that builds quizzes from uploaded notes.",
    problem: "Revising from notes is passive and easy to abandon.",
    solution: "Upload notes, get automatically generated quizzes, and stay motivated with XP, levels, streaks and achievements.",
    features: ["Notes upload", "Automatic quiz generation", "MCQs", "XP & levels", "Streaks", "Achievements", "Quiz history"],
    stack: ["FastAPI", "Python", "SQLite"],
    links: {},
  },
  {
    id: "web-tech-assignments", name: "Web Tech Assignments",
    kind: "Coursework Repository", status: "On GitHub", statusType: "personal",
    tags: ["personal", "web"],
    tagline: "Five assignments and a set of mini projects, all in one repo.",
    description: "A GitHub repository collecting my Web Technologies coursework: five numbered assignments plus a Mini-Projects folder, organised with a README.",
    problem: "Coursework scattered across folders is hard to revisit or show to others.",
    solution: "One organised repository with each assignment in its own folder, plus a separate folder for mini projects.",
    features: ["Assignment-1 to Assignment-5", "Mini-Projects folder", "README and .gitignore"],
    stack: [], // TODO: add the technologies used
    links: { github: "https://github.com/amanpasi2005/Web-Tech-Assignments" },
  },
];

window.SKILLS = [
  { group: "Languages", items: ["HTML", "CSS", "JavaScript", "TypeScript", "Python", "Java", "PHP", "Flutter / Dart"] },
  { group: "Frameworks", items: ["Next.js", "Node.js", "FastAPI", "NestJS"] },
  { group: "Data & Backend", items: ["Firebase", "Firestore", "MySQL", "SQLite", "REST APIs"] },
  { group: "Payments & AI", items: ["Razorpay", "Cashfree", "AI integrations"] },
  { group: "Tooling", items: ["Git / GitHub"] },
];

/* Journey: ordered milestones, intentionally undated. */
window.JOURNEY = [
  { t: "Web foundations", d: "Started with HTML, CSS, JavaScript and PHP + MySQL while studying BSc IT, including an early movie ticket website." },
  { t: "Mobile & real-time apps", d: "Moved to Flutter and Firebase, which led to Grab Ur Ticket: seat locking, payments, QR tickets and more." },
  { t: "Modern full-stack", d: "Built ScanMyResume with Next.js + TypeScript and StudyForge with FastAPI + SQLite." },
  { t: "Real-world delivery", d: "Now building live projects for my college, TechEdge and the conference website, where real users depend on the result." },
  { t: "Product thinking", d: "Pursuing MCA while building Vexora, an AI personal intelligence product." },
];

window.EDUCATION = [
  { t: "Master of Computer Applications (MCA)", s: "Bharati Vidyapeeth IMED, Pune", n: "Currently pursuing" },
  { t: "Bachelor of Science in Information Technology (BSc IT)", s: "Completed before MCA", n: "" },
];
