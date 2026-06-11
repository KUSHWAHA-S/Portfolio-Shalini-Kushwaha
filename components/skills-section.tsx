"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Database, Palette, Sparkles, Zap } from "lucide-react";
import { useRef, useState } from "react";

const ROUTE_ASSET_DARK_SRC = "/new-arrow.svg";
const ROUTE_ASSET_LIGHT_SRC = "/new-arrow-light.svg";

type TechItem = {
  name: string;
  icon: string;
};

type SkillSection = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  technologies: TechItem[];
};

const skillSections: SkillSection[] = [
  {
    title: "Frontend",
    description:
      "The UI technologies I use to build responsive, accessible, and polished product experiences across web and mobile.",
    icon: Palette,
    technologies: [
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "Redux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
      { name: "Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
      { name: "Jest", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" },
    ],
  },
  {
    title: "Backend",
    description:
      "The APIs, data, and service-side tools I connect with to turn frontend interfaces into fully working products.",
    icon: Database,
    technologies: [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "Mongoose", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongoose/mongoose-original.svg" },
      { name: "GraphQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
      { name: "Axios", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/axios/axios-plain.svg" },
      { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
      { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "OAuth", icon: "text:O" },
    ],
  },
  {
    title: "Other",
    description:
      "The supporting tools and workflow systems that help me collaborate, deploy, debug, and ship with confidence.",
    icon: Zap,
    technologies: [
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
      { name: "webpack", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg" },
      { name: "ESLint", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg" },
      { name: "Jira", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg" },
      { name: "Cursor", icon: "https://cdn.simpleicons.org/cursor/00e1cd" },
      { name: "Copilot", icon: "https://cdn.simpleicons.org/githubcopilot/00e1cd" },
      { name: "Claude", icon: "https://cdn.simpleicons.org/anthropic/00e1cd" },
    ],
  },
];

function SkillStopCard({
  section,
  active,
  onActivate,
  className = "",
  revealDelay = 0,
}: {
  section: SkillSection;
  active: boolean;
  onActivate: () => void;
  className?: string;
  revealDelay?: number;
}) {
  const Icon = section.icon;
  const technologies = section.technologies;

  return (
    <motion.button
      type="button"
      onMouseEnter={onActivate}
      onFocus={onActivate}
      className={`group relative mx-auto w-full max-w-sm ${className}`}
      initial={{ opacity: 0, y: 14, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      animate={{ scale: active ? 1.02 : 1 }}
      transition={{ type: "spring", stiffness: 220, damping: 20, delay: revealDelay }}
    >
      <div
        className={`w-72 rounded-[24px] bg-background/92 px-6 py-5 text-left backdrop-blur-md transition-colors sm:w-80 ${
          active
            ? "shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-primary)_26%,transparent),0_14px_38px_rgba(0,0,0,0.22),0_0_26px_color-mix(in_oklab,var(--color-primary)_18%,transparent)]"
            : "shadow-[0_12px_34px_rgba(0,0,0,0.18),0_0_18px_color-mix(in_oklab,var(--color-primary)_10%,transparent)]"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-full border ${
              active ? "border-primary/30 text-primary" : "border-border/60 text-muted-foreground"
            }`}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className={`truncate text-2xl font-semibold ${active ? "text-primary" : "text-foreground"}`}>
              {section.title}
            </div>
          </div>
        </div>

        <div className="mt-3.5 grid grid-cols-4 gap-2.5">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              title={tech.name}
              className={`rounded-xl px-2.5 py-2.5 transition-colors ${
                active ? "bg-background/80" : "bg-background/70"
              }`}
            >
              <div className="flex flex-col items-center gap-1">
                {tech.icon.startsWith("text:") ? (
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-md ${
                      active ? "bg-primary/15 text-primary" : "bg-muted/40 text-muted-foreground"
                    }`}
                    aria-hidden="true"
                  >
                    <span className="text-[11px] font-semibold leading-none">{tech.icon.slice(5)}</span>
                  </div>
                ) : (
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    className="h-5 w-5"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                )}
                <span className="line-clamp-1 text-[11px] font-medium text-muted-foreground">{tech.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.button>
  );
}

export function SkillsSection() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0, 1, 1, 0]);

  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      ref={containerRef}
    >
      <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, type: "spring", bounce: 0.35 }}
          className="mb-6 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>

          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-5xl">
            My Superpowers
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            The tools and technologies I use to bring ideas to life
          </p>

          <div className="mt-6 flex justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="h-1 rounded-full bg-primary"
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: i === 2 ? 50 : 15, opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ delay: 0.6 + i * 0.08, duration: 0.4 }}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="grid items-center gap-3"
        >
          <motion.div
            className="relative mx-auto w-full max-w-6xl py-1"
            style={{ opacity }}
          >
            <div className="relative mx-auto w-full px-2 sm:px-6 min-h-[420px] md:min-h-[520px]">
              <div className="pointer-events-none absolute inset-0 z-0 h-full w-full">
                <svg
                  className="h-full w-full dark:hidden"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <image
                    href={ROUTE_ASSET_LIGHT_SRC}
                    x="0"
                    y="0"
                    width="100"
                    height="100"
                    preserveAspectRatio="xMidYMid meet"
                    opacity="0.72"
                  />
                </svg>

                <svg
                  className="hidden h-full w-full dark:block"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <image
                    href={ROUTE_ASSET_DARK_SRC}
                    x="0"
                    y="0"
                    width="100"
                    height="100"
                    preserveAspectRatio="xMidYMid meet"
                    opacity="0.65"
                  />
                </svg>
              </div>

              <div className="relative z-10 mx-auto grid max-w-5xl grid-cols-1 gap-10 pb-2 pt-6 md:grid-cols-2 md:gap-x-24 md:gap-y-12 md:pb-8 md:pt-8">
                <div className="flex justify-center md:justify-self-end md:pr-2 md:pt-2">
                  <SkillStopCard
                    section={skillSections[0]}
                    active={activeIndex === 0}
                    onActivate={() => setActiveIndex(0)}
                    revealDelay={0.18}
                  />
                </div>
                <div className="flex justify-center md:justify-self-start md:pl-2 md:pt-50">
                  <SkillStopCard
                    section={skillSections[1]}
                    active={activeIndex === 1}
                    onActivate={() => setActiveIndex(1)}
                    revealDelay={0.38}
                  />
                </div>
                <div className="flex justify-center md:col-span-2 md:row-start-2 md:justify-self-center md:pt-2 md:translate-x-18">
                  <SkillStopCard
                    section={skillSections[2]}
                    active={activeIndex === 2}
                    onActivate={() => setActiveIndex(2)}
                    revealDelay={0.58}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
