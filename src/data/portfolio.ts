export const portfolio = {
  personal: {
    name: "Homam Almasri",
    title: "Technical Project Manager & Backend Engineer",
    tagline: "Leading teams to ship enterprise platforms & building high-concurrency systems",
    email: "Homamalmasri5@gmail.com",
    phone: "+963 982 246 606",
    phone2: "+963 962 734 664",
    location: "Damascus, Syria",
    summary:
      "Technical Project Manager and backend engineer with nearly 4 years in the Laravel ecosystem. I lead development teams at JoyBox and ship production systems hands-on: a fleet payroll platform guarded by 330+ automated tests, ERP accounting modules, multi-tenant applications, and a real-time tracking service in Go. A BSc in Mathematical Statistics backs the financial and reporting work. I use AI-assisted development to deliver production frontends (React, Three.js, Vue.js) and to automate code review.",
    socials: {
      github: "https://github.com/Homam-Almasri",
      linkedin: "https://linkedin.com/in/homam-almasri",
      email: "mailto:Homamalmasri5@gmail.com",
    },
  },

  experience: [
    {
      title: "Technical Project Manager",
      company: "JoyBox Company",
      period: "Sep 2025 — Present",
      duration: "Current",
      type: "Full-Time",
      location: "Damascus, Syria",
      highlights: [
        "Built and operate FleetOps, a fleet and driver-payroll platform for a Kuwait delivery operator (Laravel 13, React 18) — contracts, daily logs, tiered and zone-based driver pay, client billing, contract profitability, and bank/cash salary disbursement",
        "Guarded its payroll with 330+ automated tests and a golden-master gate that recalculates every payroll sheet against frozen production data before each deploy",
        "Rapidly delivered the 'Riad Alsalheen' TV Channel App from scratch in just one month — live streaming, media playlists, video uploads, and interactive gaming modules",
        "Supervise the Zahi ERP (inventory, invoicing, accounting) — audited 34 reports against the database and fixed sales-return pricing, journal-balance and trial-balance errors",
        "Lead cross-functional development teams through the full SDLC, ensuring on-time delivery of enterprise-grade systems",
        "Act as primary technical architect, translating complex business requirements into actionable sprint milestones and technical specs",
        "Standardized CI/CD workflows and implemented rigorous peer-review processes to maintain high code quality",
      ],
    },
    {
      title: "Freelance & Contract Work",
      company: "Self-Employed",
      period: "May 2025 — Mar 2026",
      duration: "11 months",
      type: "Freelance / Contract",
      location: "Remote",
      highlights: [
        "Go developer (Jan — Mar 2026) — engineered a high-concurrency real-time tracking system with Go and WebSocket, using goroutines for low-latency live updates in a microservice that integrates with existing platforms",
        "Laravel developer, Azzain Company, Saudi Arabia (May — Sep 2025) — refactored legacy PHP for a Trips Management Application and ran production deployments over SSH/FTP with 99.9% uptime during critical updates",
        "Ruby on Rails developer (Jun — Nov 2025) — stabilized legacy Rails applications with security patches and database optimization, delivering client features under strict deadlines",
      ],
    },
    {
      title: "Back-End Laravel Developer",
      company: "JoyBox Company",
      period: "Apr 2023 — Aug 2025",
      duration: "2+ years",
      type: "Full-Time",
      location: "Damascus, Syria",
      highlights: [
        "Architected a Multi-Tenant Task Management System using Laravel and Filament PHP with robust data isolation",
        "Refactored core logic for 'Shefaa' medical reservation platform — optimized consultant-patient workflow and doctor booking engine",
        "Spearheaded the Course Management System — automated certificate issuance, teacher/student scheduling, admin dashboards",
        "Developed high-traffic RESTful APIs for School Management Systems and Doctor Appointment portals",
        "Reduced API response time by 30% by refactoring legacy backend logic and optimizing MySQL queries and indexing",
        "Integrated third-party services and webhooks to automate educational workflows and payment notifications",
      ],
    },
    {
      title: "Software Tester & Laravel Developer",
      company: "JoyBox Company",
      period: "Jan 2023 — Apr 2023",
      duration: "4 months",
      type: "Full-Time",
      location: "Damascus, Syria",
      highlights: [
        "Executed comprehensive test plans, test cases, and regression testing for enterprise web applications",
        "Collaborated with developers to identify, document, and resolve defects",
        "Verified cross-browser compatibility and responsive design for user-facing modules",
      ],
    },
  ],

  achievements: [
    "Reduced API response time by 30% through query optimization and indexing",
    "Delivered TV Channel App from scratch in just one month",
    "Managed 99.9% uptime during critical production deployments",
    "Guarded fleet payroll with 330+ automated tests and a golden-master check before every deploy",
    "Audited 34 ERP reports against the database and flagged 27 incorrect columns",
    "Built n8n automation workflow with AI-powered code review, commit history tracking, and email reporting",
  ],

  education: [
    {
      degree: "BSc in Mathematical Statistics",
      institution: "University of Damascus",
      period: "2019 — 2023",
      gpa: "3.5 / 4.0",
      percentage: "",
    },
  ],

  skills: {
    management: [
      { name: "Technical Project Management", level: 88 },
      { name: "Agile / Scrum", level: 85 },
      { name: "ERP Supervision", level: 82 },
      { name: "Team Leadership", level: 90 },
      { name: "SDLC", level: 85 },
    ],
    backend: [
      { name: "PHP / Laravel", level: 95 },
      { name: "Filament PHP", level: 90 },
      { name: "Go (Golang)", level: 65 },
      { name: "Ruby on Rails", level: 60 },
      { name: "RESTful APIs", level: 92 },
      { name: "MySQL", level: 88 },
    ],
    frontend: [
      { name: "Vue.js", level: 65 },
      { name: "JavaScript", level: 70 },
      { name: "Livewire / Alpine.js", level: 75 },
      { name: "HTML5 / CSS3", level: 80 },
      { name: "React (AI-Guided)", level: 70 },
      { name: "Three.js / WebGL (AI-Guided)", level: 60 },
    ],
    tools: [
      { name: "Git / CI/CD", level: 90 },
      { name: "AWS", level: 65 },
      { name: "SSH / FTP", level: 82 },
      { name: "Postman", level: 88 },
      { name: "n8n Automation", level: 75 },
    ],
    concepts: [
      "Multi-Tenant Architecture",
      "Microservices",
      "Real-Time Data Tracking",
      "Clean Architecture",
      "SOLID Principles",
      "MCP for AI",
    ],
  },

  projects: [
    {
      name: "FleetOps — Fleet & Payroll Platform",
      description:
        "Fleet and driver-payroll platform for a Kuwait delivery operator: contracts, daily logs, tiered and zone-based driver pay, client billing, contract profitability, and bank/cash salary disbursement. Guarded by 330+ automated tests and a golden-master payroll check.",
      tech: ["Laravel 13", "PHP 8.4", "MySQL", "React 18", "PHPUnit"],
      type: "Full Build",
      color: "#22c55e",
      icon: "🚚",
    },
    {
      name: "JoyBox Website — The Box",
      description:
        "Framework-free, scroll-driven 3D company site where the logo is a lit WebGL object that opens as the reader scrolls. GPU fluid simulation, eight live interactive cards, a playable 3D mini-game, Arabic/English, and a no-WebGL fallback.",
      tech: ["TypeScript", "Three.js", "WebGL", "GSAP", "Vite"],
      type: "Frontend (AI-Guided)",
      color: "#10b981",
      icon: "📦",
    },
    {
      name: "Zahi ERP — Accounting & Distribution",
      description:
        "Accounting-correctness work on a large modular ERP: server-side sales-return pricing, balanced journal entries, trial balance, and opening/closing balances on reports. Audited 34 reports and built a static-analysis tool that runs in CI.",
      tech: ["Laravel 10", "Angular 15", "MySQL", "Node.js"],
      type: "ERP / Accounting",
      color: "#0ea5e9",
      icon: "🏢",
    },
    {
      name: "Sheikh Anas Al-Dawamneh Platform",
      description:
        "Bilingual Arabic/English academic platform for lectures, sermons, news and events, with in-page live editing, save-and-publish, role-based access, and an image library with cropping. Deployed on a Linux VPS.",
      tech: ["React 18", "Vite", "Express", "SQLite", "Tailwind"],
      type: "Full-Stack (AI-Guided)",
      color: "#d97706",
      icon: "🕌",
    },
    {
      name: "Nour Organization Website",
      description:
        "Bilingual RTL/LTR site for a nonprofit: programs, events, blog, gallery and volunteering, with live content editing, JWT roles, a visitor submissions inbox, rate limiting and honeypot protection.",
      tech: ["React 18", "Vite", "Express", "SQLite", "JWT"],
      type: "Full-Stack (AI-Guided)",
      color: "#f43f5e",
      icon: "🕊️",
    },
    {
      name: "Riad Alsalheen TV App",
      description:
        "Complete TV channel application delivered from scratch in one month. Features live stream sharing, media playlists, video uploads, and interactive gaming modules.",
      tech: ["Laravel", "PHP", "MySQL", "REST API", "Live Streaming"],
      type: "Project Management",
      color: "#7c3aed",
      icon: "📺",
    },
    {
      name: "Real-Time Tracking System",
      description:
        "High-concurrency real-time tracking system built with Go and WebSocket. Uses goroutines for minimal-latency live data updates in a microservice architecture.",
      tech: ["Go", "WebSocket", "Microservices", "REST API"],
      type: "Backend (Go)",
      color: "#00d4ff",
      icon: "📡",
    },
    {
      name: "Multi-Tenant Task Manager",
      description:
        "Task management system built with Laravel and Filament PHP featuring robust multi-tenant data isolation and a highly responsive admin interface.",
      tech: ["Laravel", "Filament PHP", "Multi-Tenancy", "MySQL"],
      type: "Backend",
      color: "#8b5cf6",
      icon: "✅",
    },
    {
      name: "Shefaa Medical Platform",
      description:
        "Comprehensive medical reservation system with optimized consultant-patient workflows, doctor booking engine, and multi-role access control.",
      tech: ["Laravel", "PHP", "MySQL", "REST API"],
      type: "Backend",
      color: "#ef4444",
      icon: "🏥",
    },
    {
      name: "Course Management System",
      description:
        "Full-featured LMS with automated certificate issuance, teacher/student scheduling, admin dashboards, and third-party webhook integrations.",
      tech: ["Laravel", "PHP", "MySQL", "REST API", "Filament"],
      type: "Backend",
      color: "#f59e0b",
      icon: "📚",
    },
    {
      name: "Trips Management App",
      description:
        "Refactored legacy PHP codebase for trips & booking platform. Designed new APIs and managed FTP deployments with 99.9% uptime.",
      tech: ["Laravel", "PHP", "MySQL", "FTP/SSH"],
      type: "Backend (Contract)",
      color: "#06b6d4",
      icon: "✈️",
    },
    {
      name: "AI Code Review Pipeline",
      description:
        "n8n automation workflow that captures Git pushes, sends committed code to AI for full logic and quality review, maintains commit history, and delivers detailed email reports per repository. Includes SRS documentation for project context awareness.",
      tech: ["n8n", "Git Webhooks", "AI APIs", "Email API", "Automation"],
      type: "Automation + AI",
      color: "#ea580c",
      icon: "⚡",
    },
    {
      name: "School Management System",
      description:
        "Complete school administration platform with grade tracking, attendance systems, and multi-role admin dashboards.",
      tech: ["Laravel", "PHP", "MySQL", "Filament"],
      type: "Backend",
      color: "#14b8a6",
      icon: "🏫",
    },
    {
      name: "CRM & Accounting System",
      description:
        "Customer relationship management platform with financial reporting tools, data validation pipelines, and granular role-based access control.",
      tech: ["Laravel", "PHP", "MySQL", "REST API"],
      type: "Backend",
      color: "#6366f1",
      icon: "💼",
    },
    {
      name: "Doctor Appointment System",
      description:
        "Healthcare scheduling platform with clinic management tools, patient records, and multi-role support for doctors, nurses, and administrators.",
      tech: ["Laravel", "PHP", "MySQL"],
      type: "Backend",
      color: "#ec4899",
      icon: "🩺",
    },
    {
      name: "AI Medicine Reader",
      description:
        "Innovative AI-powered accessibility tool that identifies medicine names to assist visually impaired users. Combines backend engineering with AI integration.",
      tech: ["Laravel", "AI/ML APIs", "PHP", "REST API"],
      type: "Backend + AI",
      color: "#a855f7",
      icon: "🤖",
    },
    {
      name: "Legacy Rails Maintenance",
      description:
        "Maintained and optimized legacy Ruby on Rails applications for freelance clients. Refactored codebases for performance, security, and extended lifecycle.",
      tech: ["Ruby on Rails", "Ruby", "PostgreSQL"],
      type: "Freelance",
      color: "#dc2626",
      icon: "💎",
    },
  ],

  languages: [
    { name: "Arabic", level: "Native", flag: "🇸🇾" },
    { name: "English", level: "Advanced", flag: "🇬🇧" },
  ],
};
