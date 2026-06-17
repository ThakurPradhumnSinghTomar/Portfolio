export type Experience = {
  company: string;
  role: string;
  duration: string;
  description: string;
  achievements: string[];
};

export type Project = {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  image: string;
  featured: boolean;
};

export type Education = {
  degree: string;
  institute: string;
  duration: string;
  cgpa: string;
};

export type PortfolioContent = {
  heroTitle: string;
  heroSummary: string;
  location: string;
  about: string[];
  experiences: Experience[];
  projects: Project[];
  skills: Record<string, string[]>;
  education: Education[];
};

export const portfolioStorageKey = "portfolio-admin-content-v1";

export const defaultPortfolioContent: PortfolioContent = {
  heroTitle:
    "Full Stack Web Developer building scalable platforms and AI-powered product experiences.",
  heroSummary:
    "I design and ship full-stack applications with backend reliability, real-time collaboration, and AI integrations. I focus on building performant products that solve meaningful user problems.",
  location: "Gwalior, MP",
  about: [
    "I am a B.Tech IT student specializing in AI & Robotics, focused on full-stack product engineering, backend systems, and AI-assisted workflows.",
    "My work emphasizes robust APIs, secure authentication, and real-time user experiences powered by practical AI integrations.",
  ],
  experiences: [
    {
      company: "Paleru Technologies Ltd. — Praccel",
      role: "Full Stack Developer Intern",
      duration: "May 2026 — Present",
      description:
        "Contributed across frontend and backend systems to improve platform scalability, reliability, and delivery velocity.",
      achievements: [
        "Optimized Django REST APIs and relational database schemas through indexing and query refinements, reducing response times for core modules.",
        "Built and integrated full-stack features with React.js frontend and Django backend, including real-time WebSocket-driven collaboration.",
        "Resolved production bugs across frontend and backend systems and partnered with senior engineers during code reviews and sprint planning.",
      ],
    },
  ],
  projects: [
    {
      title: "Rebuild — Student Productivity Platform",
      description:
        "Engineered a full-stack productivity platform with secure authentication, robust APIs, and real-time collaboration workflows.",
      tech: [
        "Next.js",
        "Express.js",
        "Prisma",
        "MongoDB",
        "Socket.IO",
        "WebRTC",
        "Turborepo",
        "Firebase Messaging",
      ],
      github: "https://github.com/ThakurPradhumnSinghTomar/Clarity",
      live: "https://rebuild-with-pradhumn.vercel.app/",
      image: "/projects/rebuild.svg",
      featured: true,
    },
    {
      title: "PrepWise — AI Mock Interview Platform",
      description:
        "Built an AI-powered interview simulation platform with automated scoring, interview history, and low-latency voice workflows.",
      tech: [
        "Next.js",
        "React",
        "TypeScript",
        "Firebase",
        "Gemini API",
        "Vapi SDK",
        "Zod",
        "Tailwind CSS",
      ],
      github: "https://github.com/ThakurPradhumnSinghTomar/PrepWise",
      live: "https://prep-wise-phi-gray.vercel.app/",
      image: "/projects/prepwise.svg",
      featured: true,
    },
  ],
  skills: {
    Frontend: [
      "React.js",
      "Next.js",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Framer Motion",
    ],
    Backend: ["Node.js", "Express.js", "Django", "REST APIs", "JWT", "OAuth"],
    Databases: ["MongoDB", "MySQL", "PostgreSQL", "Prisma ORM"],
    "Cloud & DevOps": [
      "Git",
      "GitHub",
      "Docker",
      "Firebase",
      "AWS",
      "Kubernetes",
      "Vercel",
      "CI/CD",
    ],
    "AI & Integrations": [
      "OpenAI API",
      "Gemini Provider SDK",
      "AI SDK",
      "Vapi Web SDK",
    ],
    Tools: [
      "Socket.IO",
      "WebSockets",
      "WebRTC",
      "Redis",
      "Turborepo",
      "Zod",
    ],
  },
  education: [
    {
      degree: "B.Tech in Information Technology (Specialization in AI & Robotics)",
      institute: "Madhav Institute of Technology and Science, Gwalior",
      duration: "2023 — 2027",
      cgpa: "CGPA: 7.9 / 10",
    },
  ],
};

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

export function parsePortfolioContent(rawValue: string | null): PortfolioContent | null {
  if (!rawValue) return null;

  try {
    const parsed = JSON.parse(rawValue) as Partial<PortfolioContent>;

    if (
      typeof parsed.heroTitle !== "string" ||
      typeof parsed.heroSummary !== "string" ||
      typeof parsed.location !== "string" ||
      !isStringArray(parsed.about) ||
      !Array.isArray(parsed.experiences) ||
      !Array.isArray(parsed.projects) ||
      typeof parsed.skills !== "object" ||
      parsed.skills === null ||
      !Array.isArray(parsed.education)
    ) {
      return null;
    }

    return parsed as PortfolioContent;
  } catch {
    return null;
  }
}
