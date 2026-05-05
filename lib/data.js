export const profile = {
  name: 'Robbie Boone',
  formalName: 'William "Robbie" Boone',
  location: "Greensboro, NC",
  email: "wrboone12@gmail.com",
  phone: "336-392-9494",
  status: "NCSU Computer Science student, graduating Dec 2026",
  summary:
    "Software engineer focused on full-stack systems, AI evaluation workflows, and practical interfaces for complex data.",
  github: "https://github.com/boonewr",
  linkedin: "https://www.linkedin.com/in/william-boone-914815230/",
};

export const timeline = [
  {
    title: "B.S. Computer Science",
    organization: "North Carolina State University",
    date: "Jan 2024 - Dec 2026",
    meta: "Major GPA: 3.45",
    description:
      "Coursework includes Software Engineering, Artificial Intelligence, and Human-Computer Interaction.",
  },
  {
    title: "AI Evaluator & Developer",
    organization: "DataAnnotation",
    date: "May 2024 - Present",
    meta: "Independent Contractor",
    description:
      "Engineers coding challenges and evaluates AI-generated code across Python, Java, JavaScript, APIs, and command-line environments.",
  },
  {
    title: "Independent AI Systems Work",
    organization: "Local and agentic development workflows",
    date: "2024 - Present",
    meta: "Ollama, Gemini CLI, Claude Code, Codex",
    hidden: true,
    description:
      "Builds and evaluates local AI-assisted workflows, model prompts, and developer tooling patterns for software tasks.",
  },
  {
    title: "Helpdesk Technician",
    organization: "Guilford College IT&S",
    date: "Dec 2021 - May 2023",
    meta: "Campus technology support",
    description:
      "Supported hardware, software, networking setup, and first-response cybersecurity protocols for a campus community of 1400+ members.",
  },
];

export const projects = [
  {
    slug: "metadata-explorer",
    title: "Metadata Explorer",
    role: "Full-Stack Developer & Team Lead",
    organization: "Built for SAS Institute",
    summary:
      "Full-stack metadata architecture with a Python backend, React frontend, PostgreSQL storage, and RESTful data transfer.",
    tags: ["Python", "React", "PostgreSQL", "REST API", "Git"],
    image: {
      src: "/images/projects/metadata-explorer/architecture.png",
      label: "Place architecture.png here",
      alt: "High-level architecture diagram for Metadata Explorer",
    },
    sections: {
      architecture: [
        "Metadata Explorer separates data access and interface concerns so complex metadata relationships can be queried, transformed, and visualized without coupling the React UI to storage logic.",
        "The Python backend owns validation, routing, and database interaction with PostgreSQL. The React client consumes structured API responses for entity views, relationship exploration, and graph-driven navigation.",
      ],
      iteration: [
        "The team worked from stakeholder requirements into feature branches aligned to discrete application areas. Each branch carried a focused implementation target, then merged into an integration branch for testing before release.",
        "Release cadence emphasized stable demos, predictable merge windows, and keeping backend contract changes coordinated with frontend interface work.",
      ],
    },
    responsibilities: [
      "API design and backend implementation",
      "Database schema architecture",
      "React component structuring",
      "Feature branch planning and integration",
      "Stakeholder requirement translation",
    ],
    links: [
      {
        label: "GitHub Repository",
        href: null,
        disabledReason: "Academic IP / Private",
      },
      {
        label: "Live Demo",
        href: null,
        disabledReason: "Academic IP / Private",
      },
    ],
    gallery: [
      {
        src: "/images/projects/metadata-explorer/interface-main.png",
        label: "interface-main.png",
        alt: "Metadata Explorer primary interface screenshot",
      },
      {
        src: "/images/projects/metadata-explorer/interface-detail.png",
        label: "interface-detail.png",
        alt: "Metadata Explorer detail interface screenshot",
      },
      {
        src: "/images/projects/metadata-explorer/database-schema.png",
        label: "database-schema.png",
        alt: "Metadata Explorer database schema diagram",
      },
    ],
    assetNotes: [
      "public/images/projects/metadata-explorer/architecture.png",
      "public/images/projects/metadata-explorer/interface-main.png",
      "public/images/projects/metadata-explorer/interface-detail.png",
      "public/images/projects/metadata-explorer/database-schema.png",
    ],
    snippetTitle: "NetworkGraph.jsx",
    snippet: `import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { categoryColors } from '../../../utils/constants';

const MAX_NODES = 300;
const MAX_LINKS_FOR_PHYSICS = 50;

function nodeRadius(d) {
  if (d.isPrimary) return 25;
  const deg = d.degree || 0;
  return Math.max(8, Math.min(20, 6 + Math.log10(deg + 1) * 7));
}

export default function NetworkGraph({ data, width, height, onNodeClick }) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data || !data.nodes || data.nodes.length === 0) return;

    const sorted = [...data.nodes].sort((a, b) => {
      if (a.isPrimary !== b.isPrimary) return a.isPrimary ? -1 : 1;
      return (b.degree || 0) - (a.degree || 0);
    });

    const displayNodes = sorted.slice(0, MAX_NODES);
    const displayNodeIds = new Set(displayNodes.map((node) => node.id));
    const displayLinks = data.links.filter((link) =>
      displayNodeIds.has(link.source.id || link.source) &&
      displayNodeIds.has(link.target.id || link.target)
    );

    const simulation = d3.forceSimulation(displayNodes)
      .force('link', d3.forceLink(displayLinks).id((node) => node.id))
      .force('charge', d3.forceManyBody().strength(-300).distanceMax(400))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collide', d3.forceCollide().radius((node) => nodeRadius(node) + 5));

    return () => simulation.stop();
  }, [data, width, height]);

  return <svg ref={svgRef} className="block h-full w-full bg-transparent" />;
}`,
  },
  {
    slug: "skyalert",
    title: "SkyAlert",
    role: "Solo Developer",
    organization: "Personal weather dashboard",
    summary:
      "Single-page weather alert dashboard for live NWS alerts, local weather conditions, forecast context, and alert polygons on an interactive map.",
    tags: ["React", "Tailwind CSS", "Leaflet", "NWS API", "Open-Meteo"],
    image: {
      src: "/images/projects/skyalert/hero.png",
      label: "SkyAlert dashboard screenshot",
      alt: "SkyAlert weather dashboard interface",
    },
    sections: {
      architecture: [
        "SkyAlert is a client-side single-page app that combines public weather data sources without a backend or API keys. The interface resolves a location, retrieves active and recent National Weather Service alerts, and overlays alert geometry on a Leaflet map.",
        "The app also pulls current conditions and short-term forecast data from Open-Meteo, while Nominatim handles geocoding and location search. CARTO map tiles provide the base layer for the alert polygon view.",
      ],
      iteration: [
        "This project stayed intentionally small: a directly usable dashboard that can be opened from GitHub Pages and iterated as personal needs change.",
        "The workflow emphasized fast browser testing, clear API boundaries, and practical usability details like snapping back to current location, separating local and statewide alerts, and preserving the last selected location.",
      ],
    },
    responsibilities: [
      "Built the single-page React interface",
      "Integrated NWS, Open-Meteo, Nominatim, and Leaflet",
      "Mapped alert polygons and zone geometries",
      "Designed alert categorization and severity styling",
      "Deployed the app through GitHub Pages",
    ],
    links: [
      {
        label: "GitHub Repository",
        href: "https://github.com/boonewr/WeatherAlerts",
      },
      {
        label: "Live Demo",
        href: "https://boonewr.github.io/WeatherAlerts/index.html",
      },
    ],
    gallery: [
      {
        src: "/images/projects/skyalert/dashboard.png",
        label: "SkyAlert dashboard screenshot",
        alt: "SkyAlert dashboard with alerts and weather conditions",
      },
      {
        src: "/images/projects/skyalert/map.png",
        label: "SkyAlert map screenshot",
        alt: "SkyAlert interactive map with weather alert polygons",
      },
      {
        src: "/images/projects/skyalert/search.png",
        label: "SkyAlert location search screenshot",
        alt: "SkyAlert location search interface",
      },
    ],
    assetNotes: [
      "public/images/projects/skyalert/hero.png",
      "public/images/projects/skyalert/dashboard.png",
      "public/images/projects/skyalert/map.png",
      "public/images/projects/skyalert/search.png",
    ],
    snippetTitle: "alert-loading.jsx",
    snippet: `const fetchAlerts = async () => {
  const startTime = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('.')[0] + 'Z';

  const [activeRes, historyRes] = await Promise.all([
    axios.get('https://api.weather.gov/alerts/active', {
      params: { area: location.stateCode },
    }),
    axios.get('https://api.weather.gov/alerts', {
      params: { area: location.stateCode, start: startTime },
    }),
  ]);

  const active = activeRes.data.features || [];
  const recent = historyRes.data.features
    .filter((alert) => !new Set(active.map((item) => item.id)).has(alert.id));

  const enrichedActive = await enrichAlertsWithZoneGeometries(active, zoneGeometryCacheRef);
  const enrichedRecent = await enrichAlertsWithZoneGeometries(recent, zoneGeometryCacheRef);

  setLocalActiveAlerts(categorizeAlerts(enrichedActive, location.countyName).local);
  setLocalRecentAlerts(categorizeAlerts(enrichedRecent, location.countyName).local);
};`,
  },
  {
    slug: "trees-for-the-triangle",
    title: "Trees for the Triangle",
    role: "UI/UX & Frontend Developer",
    organization: "Nonprofit platform redesign",
    summary:
      "Responsive nonprofit web redesign focused on usability, accessibility, stakeholder requirements, and React component delivery.",
    tags: ["React", "CSS", "UI/UX", "Accessibility"],
    image: {
      src: "/images/projects/trees-for-the-triangle/hero.png",
      label: "Placeholder visual",
      alt: "Trees for the Triangle project visual",
    },
    sections: {
      architecture: [
        "The redesign organized nonprofit content around clear user tasks, reusable React UI components, and responsive page structures that work for public visitors and internal stakeholders.",
        "Placeholder visuals are used here until final project media is available, with the same image-slot system as the Metadata Explorer page.",
      ],
      iteration: [
        "Requirements were gathered from non-technical stakeholders, translated into interface priorities, and refined through iterative usability testing.",
        "The implementation emphasized smaller frontend branches for layout, components, and accessibility adjustments so changes could be reviewed and released predictably.",
      ],
    },
    responsibilities: [
      "Requirements elicitation",
      "Responsive React component development",
      "Accessibility-oriented interface revisions",
      "Usability testing support",
    ],
    links: [],
    gallery: [
      {
        src: "/images/projects/trees-for-the-triangle/home.png",
        label: "Future homepage preview",
        alt: "Trees for the Triangle homepage preview",
      },
      {
        src: "/images/projects/trees-for-the-triangle/mobile.png",
        label: "Future mobile preview",
        alt: "Trees for the Triangle mobile preview",
      },
      {
        src: "/images/projects/trees-for-the-triangle/components.png",
        label: "Future component preview",
        alt: "Trees for the Triangle component preview",
      },
    ],
    snippetTitle: "responsive-card.jsx",
    snippet: `export function ImpactCard({ title, value, description }) {
  return (
    <article className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
      <p className="text-sm text-zinc-500">{title}</p>
      <strong className="mt-2 block text-2xl font-semibold text-white">{value}</strong>
      <p className="mt-3 text-sm leading-6 text-zinc-400">{description}</p>
    </article>
  );
}`,
  },
  {
    slug: "independent-ai-work",
    title: "Independent AI Work",
    role: "AI Workflow Builder",
    organization: "Local and agentic tools",
    hidden: true,
    summary:
      "Independent work with AI developer tools, local model workflows, evaluation rubrics, prompt iteration, and software task automation.",
    tags: ["Python", "LLM Evaluation", "Ollama", "Codex", "CLI Tools"],
    image: {
      src: "/images/projects/independent-ai-work/hero.png",
      label: "AI workflow visual",
      alt: "Independent AI workflow visual",
    },
    sections: {
      architecture: [
        "Independent AI work centers on practical model-assisted development pipelines: task framing, tool selection, local execution, and verification loops.",
        "The work connects evaluation rubrics with implementation environments so generated code can be inspected against concrete behavior, interfaces, and tests.",
      ],
      iteration: [
        "Prompt and workflow changes are treated as versioned experiments. Successful patterns are kept small, repeatable, and tied to measurable task outcomes.",
        "The release rhythm is informal but disciplined: test the workflow, isolate failures, adjust prompts or tool boundaries, and reuse only the patterns that consistently improve output quality.",
      ],
    },
    responsibilities: [
      "LLM coding challenge design",
      "Generated-code debugging and evaluation",
      "Local AI tool experimentation",
      "Prompt workflow iteration",
    ],
    links: [
      {
        label: "GitHub Profile",
        href: "https://github.com/boonewr",
      },
    ],
    gallery: [
      {
        src: "/images/projects/independent-ai-work/evaluation.png",
        label: "Evaluation workflow",
        alt: "AI evaluation workflow visual",
      },
      {
        src: "/images/projects/independent-ai-work/local-tools.png",
        label: "Local tools",
        alt: "Local AI tools visual",
      },
      {
        src: "/images/projects/independent-ai-work/testing.png",
        label: "Testing loop",
        alt: "Testing loop visual",
      },
    ],
    snippetTitle: "evaluation-loop.py",
    snippet: `def evaluate_candidate(task, candidate, rubric):
    checks = run_behavioral_tests(task.fixtures, candidate)
    rubric_score = score_against_rubric(candidate, rubric)

    return {
        "passes_tests": checks.passed,
        "rubric_score": rubric_score,
        "failure_notes": checks.failures,
    }`,
  },
];

export const visibleTimeline = timeline.filter((item) => !item.hidden);
export const visibleProjects = projects.filter((project) => !project.hidden);

export function getProject(slug, { includeHidden = false } = {}) {
  const source = includeHidden ? projects : visibleProjects;
  return source.find((project) => project.slug === slug);
}
