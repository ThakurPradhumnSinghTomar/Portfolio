"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Download,
  GitFork,
  Mail,
  MapPin,
  Moon,
  Phone,
  Sun,
  UserRound,
} from "lucide-react";
import { useTheme } from "next-themes";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  defaultPortfolioContent,
  parsePortfolioContent,
  portfolioStorageKey,
} from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "home", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

const sectionFade = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
};

function Section({
  id,
  title,
  children,
  className,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      id={id}
      className={cn("scroll-mt-28", className)}
      variants={sectionFade}
      initial="hidden"
      whileInView="show"
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-120px" }}
    >
      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
      {children}
    </motion.section>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [portfolioContent, setPortfolioContent] = useState(defaultPortfolioContent);
  const { theme, setTheme } = useTheme();

  const sectionIds = useMemo(() => navItems.map((item) => item.id), []);

  useEffect(() => {
    setMounted(true);
    const savedContent = parsePortfolioContent(
      window.localStorage.getItem(portfolioStorageKey),
    );
    if (savedContent) {
      setPortfolioContent(savedContent);
    }
  }, []);

  useEffect(() => {
    const updateScrollProgress = () => {
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
      const value = pageHeight > 0 ? (window.scrollY / pageHeight) * 100 : 0;
      setScrollProgress(Math.min(Math.max(value, 0), 100));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0.2, 0.4, 0.6] },
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    updateScrollProgress();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateScrollProgress);
    };
  }, [sectionIds]);

  const socialLinks = [
    {
      label: "GitHub",
      href: "https://github.com/ThakurPradhumnSinghTomar",
      icon: GitFork,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/pradhumn-singh-tomar-601104296/",
      icon: UserRound,
    },
    {
      label: "Email",
      href: "mailto:pradhumntomar18@gmail.com",
      icon: Mail,
    },
    {
      label: "Phone",
      href: "tel:+916264691569",
      icon: Phone,
    },
  ];

  return (
    <div className="relative">
      <motion.div
        className="fixed top-0 z-50 h-1 bg-[var(--accent)]"
        style={{ width: `${scrollProgress}%` }}
      />

      <header className="fixed inset-x-0 top-4 z-40 px-4">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between rounded-full border border-[var(--border)] bg-[color:color-mix(in_oklab,var(--card)_85%,transparent)] px-3 py-2 shadow-[0_12px_24px_rgba(15,23,42,0.08)] backdrop-blur">
          <nav className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  "rounded-full px-3 py-2 text-sm whitespace-nowrap transition-colors",
                  activeSection === item.id
                    ? "bg-[var(--accent)] text-white"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {mounted && theme === "dark" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </Button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-col gap-24 px-4 pb-20 pt-36 md:gap-28">
        <Section id="home" title="Home">
          <div className="mt-8 grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-start">
            <div className="space-y-6">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-[var(--muted-foreground)]">
                Pradhumn Singh Tomar
              </p>
              <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
                {portfolioContent.heroTitle}
              </h1>
              <p className="max-w-2xl text-base leading-8 text-[var(--muted-foreground)] md:text-lg">
                {portfolioContent.heroSummary}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--muted-foreground)]">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="size-4" /> {portfolioContent.location}
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <Button size="lg">
                    <Download className="size-4" /> Resume
                  </Button>
                </Link>
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="secondary" size="lg">
                        <Icon className="size-4" /> {link.label}
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </div>

            <Card className="p-6 md:p-7">
              <h3 className="text-lg font-semibold">About</h3>
              {portfolioContent.about.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]"
                >
                  {paragraph}
                </p>
              ))}
            </Card>
          </div>
        </Section>

        <Section id="experience" title="Experience">
          <div className="mt-8 border-l border-[var(--border)] pl-6">
            {portfolioContent.experiences.map((item) => (
              <motion.div
                key={item.company}
                className="relative mb-10"
                variants={sectionFade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <span className="absolute -left-[31px] top-1 size-3 rounded-full border border-[var(--border)] bg-[var(--card)]" />
                <Card className="p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold">{item.role}</h3>
                      <p className="text-sm text-[var(--muted-foreground)]">
                        {item.company}
                      </p>
                    </div>
                    <Badge>{item.duration}</Badge>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[var(--muted-foreground)]">
                    {item.description}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-[var(--muted-foreground)]">
                    {item.achievements.map((achievement) => (
                      <li key={achievement} className="flex gap-2">
                        <span className="mt-2 size-1.5 rounded-full bg-[var(--accent)]" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section id="projects" title="Projects">
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {portfolioContent.projects.map((project) => (
              <motion.div
                key={project.title}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className={cn(project.featured ? "md:col-span-2" : "")}
              >
                <Card className="h-full overflow-hidden">
                  <div className="relative aspect-[16/9] w-full border-b border-[var(--border)]">
                    <Image
                      src={project.image}
                      alt={`${project.title} preview`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="space-y-4 p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-xl font-semibold tracking-tight">
                        {project.title}
                      </h3>
                      {project.featured ? <Badge>Featured</Badge> : null}
                    </div>
                    <p className="text-sm leading-7 text-[var(--muted-foreground)]">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((item) => (
                        <Badge key={item}>{item}</Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Link href={project.github} target="_blank" rel="noopener noreferrer">
                        <Button variant="secondary">
                          GitHub <ArrowUpRight className="size-4" />
                        </Button>
                      </Link>
                      <Link href={project.live} target="_blank" rel="noopener noreferrer">
                        <Button>
                          Live Demo <ArrowUpRight className="size-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section id="skills" title="Skills">
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {Object.entries(portfolioContent.skills).map(([category, items]) => (
              <Card key={category} className="p-5">
                <h3 className="text-base font-semibold">{category}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {items.map((item) => (
                    <Badge key={item}>{item}</Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="education" title="Education">
          <div className="mt-8 grid gap-5">
            {portfolioContent.education.map((item) => (
              <Card key={item.degree} className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold">{item.degree}</h3>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      {item.institute}
                    </p>
                  </div>
                  <Badge>{item.duration}</Badge>
                </div>
                <p className="mt-4 text-sm text-[var(--muted-foreground)]">
                  {item.cgpa}
                </p>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="contact" title="Contact" className="pb-8">
          <Card className="mt-8 p-8">
            <h3 className="text-2xl font-semibold tracking-tight">
              Let&apos;s build something meaningful together.
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted-foreground)]">
              I&apos;m open to impactful software engineering opportunities where
              product thinking, backend reliability, and modern full-stack
              execution matter.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="secondary" size="lg">
                      <Icon className="size-4" /> {link.label}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </Card>
        </Section>
      </main>
    </div>
  );
}
