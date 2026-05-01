export const portfolio = {
  personal: {
    name: "Homam Al-Masri",
    title: "Backend Web Developer",
    tagline: "Building robust backends & guiding AI to craft stunning frontends",
    email: "Homamalmasri5@gmail.com",
    phone: "+963 962 734 664",
    phone2: "0982246606",
    location: "Damascus, Syria",
    summary:
      "Back-end Developer with 3 years of hands-on experience specializing in PHP and Laravel development. Skilled in designing RESTful APIs and building scalable backend systems such as course management, school management, and CRM platforms. Known for problem solving, clean and maintainable code, and effective collaboration in team-based environments. Solid foundation in statistical logic, with a degree in Mathematical Statistics.",
    socials: {
      github: "https://github.com/homamalmasriinfo-alt",
      linkedin: "https://linkedin.com/in/homam-almasri",
      email: "mailto:Homamalmasri5@gmail.com",
    },
  },

  experience: [
    {
      title: "Back-End Laravel Developer",
      company: "JoyBox Company",
      period: "Apr 2023 — Present",
      duration: "2+ years",
      type: "Full-Time",
      location: "Damascus, Syria",
      highlights: [
        "Spearheaded the development and maintenance of back-end systems using Laravel and PHP",
        "Course Management System — student/teacher modules, course scheduling, certificate issuing, admin dashboards, and API integration",
        "School Management System — grade tracking, attendance, and administrative dashboards",
        "CRM & Accounting Systems — reporting tools, data validation, and user role management",
        "Doctor Appointment System — clinic management tools, multi-role access, and scheduling features",
        "AI-Powered Accessibility Tool — analyzing feature using AI to identify medicine names for visually impaired users",
        "Utilized Git for version control and contributed to CI/CD deployment workflows",
      ],
    },
    {
      title: "Freelance Ruby on Rails Developer",
      company: "Self-Employed / Freelance",
      period: "Jun 2025 — Nov 2025",
      duration: "6 months",
      type: "Freelance",
      location: "Damascus, Syria",
      highlights: [
        "Maintained and optimized legacy Ruby on Rails applications, ensuring stability and compatibility with modern systems",
        "Refactored outdated codebases to improve performance, security, and maintainability",
        "Fixed bugs and implemented incremental improvements to extend the lifecycle of client projects",
        "Collaborated with clients to gather requirements and deliver reliable solutions under tight deadlines",
      ],
    },
    {
      title: "Back-End Laravel Developer (Project-Based)",
      company: "Azzain Company",
      period: "May 2025 — Sep 2025",
      duration: "5 months",
      type: "Freelance / Contract",
      location: "Saudi Arabia (Remote)",
      highlights: [
        "Maintained and refactored legacy PHP code for a Trips Management Application to enhance readability, performance, and scalability",
        "Designed and integrated new RESTful APIs to support expanded features and improve platform flexibility",
        "Deployed updates and fixes to production server via FTP, ensuring smooth transitions and minimal downtime",
        "Collaborated remotely with stakeholders to identify pain points and deliver targeted backend solutions",
      ],
    },
    {
      title: "Software Tester",
      company: "JoyBox Company",
      period: "Jan 2023 — Apr 2023",
      duration: "4 months",
      type: "Full-Time",
      location: "Damascus, Syria",
      highlights: [
        "Designed and executed test plans, test cases, and regression testing for web applications",
        "Collaborated with developers to identify, document, and resolve defects using issue-tracking tools",
        "Verified cross-browser compatibility and responsive design for user-facing modules",
      ],
    },
  ],

  achievements: [
    "Reduced API response time by 30% through query optimization",
    "Refactored legacy PHP code for a trips & booking application",
    "Handled FTP-based deployments for legacy systems with zero downtime",
    "Built n8n automation workflow with AI-powered code review, commit history tracking, and email reporting",
  ],

  education: [
    {
      degree: "BSc in Mathematical Statistics",
      institution: "University of Damascus",
      period: "2019 — 2023",
      gpa: "3.3–3.5 / 4.0",
      percentage: "78.3%",
    },
  ],

  skills: {
    backend: [
      { name: "PHP", level: 95 },
      { name: "Laravel", level: 95 },
      { name: "Ruby on Rails", level: 65 },
      { name: "RESTful APIs", level: 90 },
      { name: "MySQL", level: 88 },
    ],
    frontend: [
      { name: "React (AI-Guided)", level: 70 },
      { name: "Three.js / WebGL (AI-Guided)", level: 60 },
      { name: "JavaScript (AI-Guided)", level: 60 },
      { name: "HTML5 / CSS3", level: 75 },
    ],
    tools: [
      { name: "Git / Webhooks", level: 90 },
      { name: "CI/CD", level: 75 },
      { name: "AWS", level: 65 },
      { name: "FTP / SSH", level: 80 },
      { name: "Postman", level: 88 },
      { name: "AI Tools / MCP", level: 80 },
      { name: "n8n Automation", level: 75 },
    ],
    other: [
      { name: "C++", level: 45 },
      { name: "GoLang", level: 40 },
    ],
    concepts: [
      "Clean Architecture",
      "SOLID Principles",
      "Design Patterns",
      "Test-Driven Development",
      "MCP for AI",
    ],
  },

  projects: [
    {
      name: "JoyBox 3D Platform",
      description:
        "Interactive 3D company website featuring a draggable cube navigation, WebGL particle effects, and floating card interfaces. A showcase of AI-guided frontend development.",
      tech: ["React", "Three.js", "TypeScript", "Framer Motion", "CSS 3D"],
      type: "Frontend (AI-Guided)",
      color: "#00d4ff",
      icon: "🎮",
    },
    {
      name: "Course Management System",
      description:
        "Full-featured LMS with student/teacher modules, course scheduling, certificate generation, and comprehensive admin dashboards with API integration.",
      tech: ["Laravel", "PHP", "MySQL", "REST API", "Filament"],
      type: "Backend",
      color: "#7c3aed",
      icon: "📚",
    },
    {
      name: "Trips Management App",
      description:
        "Refactored legacy PHP codebase for a trips & booking platform. Designed new RESTful APIs and handled FTP-based production deployments with zero downtime.",
      tech: ["Laravel", "PHP", "MySQL", "REST API", "FTP"],
      type: "Backend (Contract)",
      color: "#f59e0b",
      icon: "✈️",
    },
    {
      name: "School Management System",
      description:
        "Complete school administration platform with grade tracking, attendance systems, and multi-role admin dashboards.",
      tech: ["Laravel", "PHP", "MySQL", "Filament"],
      type: "Backend",
      color: "#10b981",
      icon: "🏫",
    },
    {
      name: "CRM & Accounting System",
      description:
        "Customer relationship management platform with financial reporting tools, data validation pipelines, and granular role-based access control.",
      tech: ["Laravel", "PHP", "MySQL", "REST API"],
      type: "Backend",
      color: "#06b6d4",
      icon: "💼",
    },
    {
      name: "Doctor Appointment System",
      description:
        "Healthcare scheduling platform with clinic management tools, patient records, and multi-role support for doctors, nurses, and administrators.",
      tech: ["Laravel", "PHP", "MySQL"],
      type: "Backend",
      color: "#ef4444",
      icon: "🩺",
    },
    {
      name: "AI Medicine Reader",
      description:
        "Innovative AI-powered accessibility tool that identifies medicine names to assist visually impaired users. Combines backend engineering with AI integration.",
      tech: ["Laravel", "AI/ML APIs", "PHP", "REST API"],
      type: "Backend + AI",
      color: "#ec4899",
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
    {
      name: "AI Code Review Pipeline",
      description:
        "n8n automation workflow that captures Git pushes, sends committed code to AI for full logic and quality review, maintains commit history, and delivers detailed email reports per repository. Includes SRS documentation for project context awareness.",
      tech: ["n8n", "Git Webhooks", "AI APIs", "Email API", "Automation"],
      type: "Automation + AI",
      color: "#ea580c",
      icon: "⚡",
    },
  ],

  languages: [
    { name: "Arabic", level: "Native", flag: "🇸🇾" },
    { name: "English", level: "Advanced", flag: "🇬🇧" },
  ],
};
