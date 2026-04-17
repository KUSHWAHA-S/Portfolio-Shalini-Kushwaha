"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Database, Palette, Sparkles, Zap } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

// Route overlay asset (SVG preferred for crispness).
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
            {/* <div className="text-sm font-mono uppercase tracking-[0.22em] text-muted-foreground">Stop</div> */}
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

  // Keeping these for future if you switch back to "generated route".
  const routeContainerRef = useRef<HTMLDivElement | null>(null);
  const frontendRef = useRef<HTMLDivElement | null>(null);
  const backendRef = useRef<HTMLDivElement | null>(null);
  const otherRef = useRef<HTMLDivElement | null>(null);
  const [routeD, setRouteD] = useState<string>("");
  const [routeStart, setRouteStart] = useState<{ x: number; y: number } | null>(null);
  const [routeSize, setRouteSize] = useState<{ w: number; h: number }>({ w: 100, h: 100 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0, 1, 1, 0]);

  const useGeneratedRoute = false;

  const computeRoute = useMemo(() => {
    const getAnchor = (rect: DOMRect, side: "left" | "right" | "top" | "bottom", t = 0.5) => {
      switch (side) {
        case "left":
          return { x: rect.left, y: rect.top + rect.height * t };
        case "right":
          return { x: rect.right, y: rect.top + rect.height * t };
        case "top":
          return { x: rect.left + rect.width * t, y: rect.top };
        case "bottom":
          return { x: rect.left + rect.width * t, y: rect.bottom };
      }
    };

    return () => {
      const root = routeContainerRef.current;
      const f = frontendRef.current;
      const b = backendRef.current;
      const o = otherRef.current;
      if (!root || !f || !b || !o) return;

      const rootRect = root.getBoundingClientRect();
      const fr = f.getBoundingClientRect();
      const br = b.getBoundingClientRect();
      const or = o.getBoundingClientRect();

      const toLocal = (p: { x: number; y: number }) => ({ x: p.x - rootRect.left, y: p.y - rootRect.top });
      const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
      const within = (p: { x: number; y: number }) => ({
        x: clamp(p.x, 0, rootRect.width),
        y: clamp(p.y, 0, rootRect.height),
      });

      const start = within(toLocal({ x: fr.left - Math.min(120, rootRect.width * 0.12), y: fr.top + fr.height * 0.55 }));
      const inFrontend = within(toLocal(getAnchor(fr, "left", 0.55)));
      const outFrontend = within(toLocal(getAnchor(fr, "right", 0.55)));
      const inOther = within(toLocal(getAnchor(or, "top", 0.4)));
      const outOther = within(toLocal(getAnchor(or, "right", 0.55)));
      const inBackend = within(toLocal(getAnchor(br, "left", 0.55)));
      const outBackend = within(toLocal(getAnchor(br, "right", 0.55)));

      // A gentle right-side loop, then arrow goes up.
      const loopX = clamp(Math.max(outBackend.x + 140, rootRect.width - 110), 0, rootRect.width);
      const loopY1 = clamp(outBackend.y + 120, 0, rootRect.height);
      const loopY2 = clamp(outBackend.y + 260, 0, rootRect.height);
      const end = within({
        x: clamp(loopX, 0, rootRect.width - 18),
        y: clamp(Math.min(outBackend.y - 140, rootRect.height * 0.12), 12, rootRect.height),
      });

      const pts = [
        start,
        inFrontend,
        outFrontend,
        inOther,
        outOther,
        inBackend,
        outBackend,
        { x: loopX, y: loopY1 },
        { x: loopX, y: loopY2 },
        end,
      ].map(within);

      // Catmull–Rom → cubic Bezier (smooth, continuous)
      const crToBezier = (points: { x: number; y: number }[]) => {
        if (points.length < 2) return "";
        let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
        const tension = 1;
        for (let i = 0; i < points.length - 1; i++) {
          const p0 = points[i - 1] ?? points[i];
          const p1 = points[i];
          const p2 = points[i + 1];
          const p3 = points[i + 2] ?? p2;

          const cp1 = {
            x: p1.x + ((p2.x - p0.x) / 6) * tension,
            y: p1.y + ((p2.y - p0.y) / 6) * tension,
          };
          const cp2 = {
            x: p2.x - ((p3.x - p1.x) / 6) * tension,
            y: p2.y - ((p3.y - p1.y) / 6) * tension,
          };

          d += ` C ${cp1.x.toFixed(1)} ${cp1.y.toFixed(1)}, ${cp2.x.toFixed(1)} ${cp2.y.toFixed(1)}, ${p2.x.toFixed(
            1,
          )} ${p2.y.toFixed(1)}`;
        }
        return d;
      };

      setRouteD(crToBezier(pts));
      setRouteStart(start);
      setRouteSize({ w: Math.max(1, rootRect.width), h: Math.max(1, rootRect.height) });
    };
  }, []);

  useEffect(() => {
    if (!useGeneratedRoute) return;
    let raf = 0;
    const schedule = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        computeRoute();
      });
    };

    schedule();
    window.addEventListener("resize", schedule, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true });

    const ro = new ResizeObserver(schedule);
    if (routeContainerRef.current) ro.observe(routeContainerRef.current);
    if (frontendRef.current) ro.observe(frontendRef.current);
    if (backendRef.current) ro.observe(backendRef.current);
    if (otherRef.current) ro.observe(otherRef.current);

    return () => {
      window.removeEventListener("resize", schedule);
      window.removeEventListener("scroll", schedule);
      ro.disconnect();
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [computeRoute, useGeneratedRoute]);

  return (
    <section
      id="skills"
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
            <Sparkles className="h-5 w-5 text-primary" />
          </div>

          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-5xl">
            My Superpowers
            {/* <span className="text-primary">🦸</span> */}
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
          <motion.div className="relative mx-auto w-full max-w-6xl py-1" style={{ opacity }}>
            {/* V layout: two stops on row 1, third centered on row 2 — matches sketch reading order */}
            <div className="relative mx-auto w-full px-2 sm:px-6 min-h-[420px] md:min-h-[520px]" ref={routeContainerRef}>

              {/* Exact route asset (put your brush-stroke arrow into /public/skills-route.png or .svg) */}
              <div className="pointer-events-none absolute inset-0 z-0 h-full w-full">
                {/* Light theme */}
                <svg className="h-full w-full dark:hidden" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <image
                    href={ROUTE_ASSET_LIGHT_SRC}
                    x="0"
                    y="0"
                    width="100"
                    height="100"
                    preserveAspectRatio="xMidYMid meet"
                    opacity="0.72"
                    className=""
                  />
                </svg>

                {/* Dark theme */}
                <svg className="hidden h-full w-full dark:block" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <image
                    href={ROUTE_ASSET_DARK_SRC}
                    x="0"
                    y="0"
                    width="100"
                    height="100"
                    preserveAspectRatio="xMidYMid meet"
                    opacity="0.65"
                    className=""
                  />
                </svg>
              </div>

              {/* Optional: generated route mode (disabled by default) */}
              {useGeneratedRoute ? (
                <motion.svg
                  viewBox={`0 0 ${routeSize.w} ${routeSize.h}`}
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute inset-0 z-0 h-full w-full"
                  aria-hidden="true"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.35 }}
                >
                  <defs>
                    <linearGradient id="skillsRouteGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.12" />
                      <stop offset="45%" stopColor="var(--color-primary)" stopOpacity="0.55" />
                      <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.22" />
                    </linearGradient>
                    <filter id="skillsRouteGlow" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="1.9" result="blur" />
                      <feColorMatrix
                        in="blur"
                        type="matrix"
                        values="
                          1 0 0 0 0
                          0 1 0 0 0
                          0 0 1 0 0
                          0 0 0 0.9 0
                        "
                        result="glow"
                      />
                      <feMerge>
                        <feMergeNode in="glow" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <marker
                      id="skillsRouteArrow"
                      viewBox="0 0 1200 1200"
                      refX="1120"
                      refY="600"
                      markerWidth="10"
                      markerHeight="10"
                      orient="auto"
                      markerUnits="strokeWidth"
                    >
                      <path
                        d="M1132.28,587.4l2.24,3.78,1.46-4.96c-.31-1.5-2.57-1.92-3.7,1.18Z"
                        fill="var(--color-primary)"
                        fillOpacity="0.65"
                      />
                      <path
                        d="M1129.39,590.63c-4.52,2.44-7.12,7.17-7.61,13.26-1.29.69-1.61-.8-2.09-1.36-.18,4.24.58,9.65,4.77,9.03-1.41-5.04.35-5.16-1.54-10.77,1.13-3.1,3.7-4.51,4.66-3.39-.31-1.47,3.08-4.13,1.81-6.77Z"
                        fill="var(--color-primary)"
                        fillOpacity="0.65"
                      />
                    </marker>
                  </defs>

                  <motion.circle
                    cx={routeStart?.x ?? 0}
                    cy={routeStart?.y ?? 0}
                    r="1.1"
                    fill="var(--color-primary)"
                    fillOpacity="0.45"
                    variants={{
                      hidden: { opacity: 0 },
                      show: { opacity: 1 },
                    }}
                    transition={{ duration: 0.25, delay: 0.15 }}
                  />
                  <motion.path
                    d={routeD || "M 0 0"}
                    fill="none"
                    stroke="url(#skillsRouteGradient)"
                    strokeOpacity="0.85"
                    strokeWidth="3.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    filter="url(#skillsRouteGlow)"
                    variants={{
                      hidden: { pathLength: 0, opacity: 0 },
                      show: { pathLength: 1, opacity: 1 },
                    }}
                    transition={{ duration: 1.1, ease: "easeInOut", delay: 0.03 }}
                  />
                  <motion.path
                    d={routeD || "M 0 0"}
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeOpacity="0.38"
                    strokeWidth="1.55"
                    strokeDasharray="1.4 6.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    markerEnd="url(#skillsRouteArrow)"
                    variants={{
                      hidden: { pathLength: 0, opacity: 0 },
                      show: { pathLength: 1, opacity: 1 },
                    }}
                    animate={{ strokeDashoffset: [0, -28] }}
                    transition={{
                      pathLength: { duration: 1.1, ease: "easeInOut", delay: 0.03 },
                      opacity: { duration: 0.25, delay: 0.12 },
                      strokeDashoffset: { duration: 3.2, ease: "linear", repeat: Infinity },
                    }}
                  />
                </motion.svg>
              ) : null}

              <div className="relative z-10 mx-auto grid max-w-5xl grid-cols-1 gap-10 pb-2 pt-6 md:grid-cols-2 md:gap-x-24 md:gap-y-12 md:pb-8 md:pt-8">
                {/* Top-left */}
                <div className="flex justify-center md:justify-self-end md:pr-2 md:pt-2" ref={frontendRef}>
                  <SkillStopCard
                    section={skillSections[0]}
                    active={activeIndex === 0}
                    onActivate={() => setActiveIndex(0)}
                    revealDelay={0.18}
                  />
                </div>
                {/* Top-right (slightly lower than left, like sketch) */}
                <div className="flex justify-center md:justify-self-start md:pl-2 md:pt-50" ref={backendRef}>
                  <SkillStopCard
                    section={skillSections[1]}
                    active={activeIndex === 1}
                    onActivate={() => setActiveIndex(1)}
                    revealDelay={0.38}
                  />
                </div>
                {/* Bottom-middle (a touch left) */}
                <div
                  className="flex justify-center md:col-span-2 md:row-start-2 md:justify-self-center md:pt-2 md:translate-x-18"
                  ref={otherRef}
                >
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
