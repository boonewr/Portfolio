export const profile = {
    name: 'Robbie Boone',
    formalName: 'William "Robbie" Boone',
    location: "Greensboro, NC",
    email: "wrboone12@gmail.com",
    phone: "336-392-9494",
    status: "NCSU Computer Science student, graduating Dec 2026",
    summary:
        "Software Engineer specializing in full-stack development and AI systems. Currently studying Computer Science at North Carolina State University.",
    github: "https://github.com/boonewr",
    linkedin: "https://www.linkedin.com/in/william-boone-914815230/",
};

export const timeline = [
    {
        title: "B.S. Computer Science",
        organization: "North Carolina State University",
        date: "Jan 2024 - Dec 2026",
        meta: "Major GPA: 3.47",
        description:
            "Coursework includes Software Engineering, Artificial Intelligence, and Human-Computer Interaction.",
    },
    {
        title: "AI Evaluator & Developer",
        organization: "DataAnnotation",
        date: "May 2024 - Present",
        meta: "Independent Contractor",
        description:
            "Engineered adversarial benchmarks and evaluation rubrics to assess LLM computational reasoning and code execution across Python, Java, and JavaScript environments.",
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
        projectType: "team",
        headerDescription: "Metadata relationship explorer for enterprise data discovery",
        summary:
            "Full-stack metadata architecture with a Python backend, React frontend, PostgreSQL storage, and RESTful data transfer.",
        tags: ["Python", "React", "PostgreSQL", "REST API", "Git"],
        image: {
            src: "/images/projects/metadata-explorer/architecture.png",
            label: "Place architecture.png here",
            alt: "High-level architecture diagram for Metadata Explorer",
        },
        caseStudySections: [
            {
                title: "Overview",
                body: [
                    "SAS stakeholders needed a clearer way to inspect metadata relationships that were difficult to reason about through raw tables or disconnected records.",
                    "The business value was faster discovery: a team-facing tool that could make metadata structure legible, support stakeholder demos, and reduce the friction of tracing relationships across systems."
                ],
            },
            {
                title: "Architecture",
                body: [
                    "The application uses a decoupled Python backend and React frontend, with PostgreSQL as the source of structured metadata and relationship records.",
                    "The backend owns validation, routing, and database access while the frontend consumes stable REST responses for entity detail views and graph-driven exploration."
                ],
            },
            {
                title: "Execution",
                body: [
                    "Development was organized around feature branches mapped to application areas, then merged into an integration branch for testing and stakeholder-ready builds.",
                    "I coordinated branch flow, release timing, and API/frontend contract changes so parallel work could move without destabilizing demo environments."
                ],
            },
        ],
        sidebarTitle: "Role & Responsibilities",
        sidebarItems: [
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
        snippetSummary:
            "D3 force layout that prioritizes primary entities, caps graph density, and scales node radius by relationship degree.",
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
        projectType: "independent",
        headerDescription: "Live weather alerts, conditions, and map context in one personal dashboard",
        roleLabel: "Independently Developed",
        summary:
            "Single-page weather alert dashboard for live NWS alerts, local weather conditions, forecast context, and alert polygons on an interactive map.",
        tags: ["React", "Tailwind CSS", "Leaflet", "NWS API", "Open-Meteo"],
        image: {
            src: "/images/projects/skyalert/hero.png",
            label: "SkyAlert dashboard screenshot",
            alt: "SkyAlert weather dashboard interface",
        },
        caseStudySections: [
            {
                title: "Objective",
                body: [
                    "The friction was practical: checking active local weather alerts, recent alert history, and current conditions usually meant jumping between multiple sites and losing the geographic context.",
                    "SkyAlert condenses that into one page I can actually use, with county-level and statewide alerts beside live weather data and an interactive map."
                ],
            },
            {
                title: "Implementation",
                body: [
                    "The app resolves a location, requests active and recent NWS alerts for the state, categorizes alerts by county relevance, and enriches missing geometries through affected-zone lookups.",
                    "Open-Meteo supplies current conditions and short-term forecast data, while Leaflet renders the user marker, CARTO basemap, and alert polygons color-coded by alert type and severity."
                ],
            },
            {
                title: "Key Challenge",
                body: [
                    "Not every NWS alert includes direct polygon geometry, which made map rendering incomplete for some alert types.",
                    "I bypassed that gap by following affected zone URLs, caching zone geometry responses, and merging those fallback geometries into the alert set before drawing map layers."
                ],
            },
        ],
        sidebarTitle: "Key Learnings",
        sidebarItems: [
            "Public APIs can have uneven geometry completeness, so fallback paths need to be first-class.",
            "Client-side caching matters when a map can trigger many zone geometry lookups.",
            "A personally useful app benefits from fewer abstractions and faster end-to-end iteration.",
            "Clear alert grouping is more useful than simply showing every returned record.",
        ],
        secondarySidebarTitle: "Future Optimizations",
        secondarySidebarItems: [
            "Persist alert display preferences",
            "Add offline-tolerant stale data states",
            "Improve mobile map and panel ergonomics",
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
        snippetSummary:
            "Fetches active and recent NWS alerts, removes duplicates, enriches missing zone geometry, and stores county-local results.",
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
        slug: "routeforecaster",
        title: "RouteForecaster",
        role: "Full-Stack Developer",
        organization: "Personal route-weather planning app",
        projectType: "independent",
        headerDescription: "Route planning with timed waypoint weather forecasts",
        roleLabel: "Independently Developed",
        summary:
            "Full-stack route-weather planner that combines Google Routes, Open-Meteo forecasts, saved routes, and a browser navigation HUD.",
        tags: ["FastAPI", "React", "TypeScript", "Google Routes", "Open-Meteo", "PostgreSQL"],
        image: {
            src: "/images/projects/routeforecaster/hero.png",
            label: "RouteForecaster route-weather planner preview",
            alt: "RouteForecaster map and weather timeline preview",
        },
        caseStudySections: [
            {
                title: "Objective",
                body: [
                    "The technical friction was planning drives around weather without manually cross-checking a route, arrival timing, and separate forecast points.",
                    "RouteForecaster turns that into a single workflow: choose an origin, destination, and departure or arrival time, then receive weather forecasts sampled at timed waypoints along the driving route."
                ],
            },
            {
                title: "Implementation",
                body: [
                    "The product is split into a FastAPI backend and a Vite/React frontend. The backend validates route-weather requests, calls Google Routes, decodes route geometry, resolves trip timing, samples waypoints, and fans out Open-Meteo requests for each waypoint/time pair.",
                    "The frontend handles Google Places inputs, map rendering, route timelines, saved-route flows, JWT auth state, React Query mutations, Zustand stores, and a browser geolocation navigation HUD."
                ],
            },
            {
                title: "Key Challenge",
                body: [
                    "The hard part was making weather samples correspond to where the user would be at a specific time, not just drawing straight-line points between origin and destination.",
                    "I handled that by sampling along the decoded route polyline based on route duration, using 15-minute intervals for shorter trips and 30-minute intervals for longer trips, then pairing each sampled coordinate with its expected arrival timestamp."
                ],
            },
        ],
        sidebarTitle: "Key Learnings",
        sidebarItems: [
            "Time-aware route sampling is more useful than endpoint-only weather lookups.",
            "Mocked external API tests and a default no-real-network guard protect quota and keep backend tests deterministic.",
            "A full-stack map product needs clear state boundaries between planner state, navigation state, auth state, and async route-weather requests.",
            "Rate limits need frontend behavior too; 429 cooldown handling is part of the product contract, not only backend protection.",
        ],
        secondarySidebarTitle: "Future Optimizations",
        secondarySidebarItems: [
            "Verify Render deployment end-to-end after each deploy",
            "Add structured logs around Google Routes and Open-Meteo failures",
            "Add production smoke checks for auth, saved routes, and route-weather calculation",
            "Improve navigation behavior with off-route handling and eventual rerouting",
        ],
        links: [
            {
                label: "GitHub Repository",
                href: "https://github.com/boonewr/RouteForecaster",
            },
        ],
        gallery: [
            {
                src: "/images/projects/routeforecaster/planner.png",
                label: "Route planner interface preview",
                alt: "RouteForecaster planner and forecast timeline interface",
            },
            {
                src: "/images/projects/routeforecaster/navigation.png",
                label: "Navigation HUD preview",
                alt: "RouteForecaster browser navigation HUD preview",
            },
            {
                src: "/images/projects/routeforecaster/architecture.png",
                label: "RouteForecaster architecture preview",
                alt: "RouteForecaster frontend backend and external services architecture",
            },
        ],
        assetNotes: [
            "public/images/projects/routeforecaster/hero.png",
            "public/images/projects/routeforecaster/planner.png",
            "public/images/projects/routeforecaster/navigation.png",
            "public/images/projects/routeforecaster/architecture.png",
        ],
        snippetTitle: "routing_engine.py",
        snippetSummary:
            "Samples route geometry by expected travel time, then fetches forecast data for each waypoint and timestamp.",
        snippet: `async def build_route_weather(request: RouteWeatherRequest) -> RouteWeatherResponse:
    route = await google_routes_client.compute_route(
        origin=request.start,
        destination=request.end,
        departure_time=request.departure_time,
        arrival_time=request.arrival_time,
    )

    departure_at, arrival_at = resolve_trip_window(
        duration_seconds=route.duration_seconds,
        departure_time=request.departure_time,
        arrival_time=request.arrival_time,
    )

    interval_minutes = 15 if route.duration_seconds < 3600 else 30
    samples = sample_polyline_by_elapsed_time(
        points=decode_polyline(route.encoded_polyline),
        duration_seconds=route.duration_seconds,
        interval_minutes=interval_minutes,
    )

    forecasts = await asyncio.gather(*[
        open_meteo_client.forecast_at(
            latitude=sample.lat,
            longitude=sample.lng,
            timestamp=departure_at + sample.elapsed,
        )
        for sample in samples
    ])

    return RouteWeatherResponse(
        polyline=route.encoded_polyline,
        departure_time=departure_at,
        arrival_time=arrival_at,
        steps=route.steps,
        waypoints=merge_samples_with_forecasts(samples, forecasts),
    )`,
    },
    {
        slug: "trees-for-the-triangle",
        title: "Trees for the Triangle",
        role: "UI/UX Prototype Designer",
        organization: "Nonprofit platform redesign",
        projectType: "team",
        headerDescription: "Accessible nonprofit web redesign for clearer public engagement",
        summary:
            "Figma-based nonprofit redesign focused on usability, accessibility, stakeholder requirements, and interactive prototype delivery.",
        tags: ["Figma", "Figma Make", "UI/UX", "Prototyping", "Accessibility"],
        image: {
            src: "/images/projects/trees-for-the-triangle/hero.png",
            label: "Placeholder visual",
            alt: "Trees for the Triangle project visual",
        },
        caseStudySections: [
            {
                title: "Overview",
                body: [
                    "The nonprofit platform needed a clearer, more accessible interface for visitors and stakeholders who were not necessarily technical users.",
                    "The value was improving public engagement and making common nonprofit workflows easier to understand before investing in a full implementation."
                ],
            },
            {
                title: "Prototype System",
                body: [
                    "The redesign was built in Figma and Figma Make as an interactive prototype, with component-like sections for repeated content, responsive states, and stakeholder review.",
                    "Figma Make generated React-style structure under the hood, but my work centered on the interface model: layout decisions, content hierarchy, accessibility patterns, and prototype behavior rather than hand-written component code."
                ],
            },
            {
                title: "Execution",
                body: [
                    "Requirements were gathered from non-technical stakeholders and converted into concrete interface priorities.",
                    "Iteration focused on fast prototype revisions, usability feedback, and responsive design adjustments that made the proposed experience easier to evaluate across desktop and mobile contexts."
                ],
            },
        ],
        sidebarTitle: "Role & Responsibilities",
        sidebarItems: [
            "Requirements elicitation",
            "Figma prototype design",
            "Figma Make workflow exploration",
            "Responsive layout planning",
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
        snippetSummary:
            "Reusable impact card component for compact nonprofit metrics with consistent spacing, borders, and responsive text.",
        hideSnippet: true,
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
        caseStudySections: [
            {
                title: "Objective",
                body: [
                    "Independent AI work centers on practical model-assisted development pipelines: task framing, tool selection, local execution, and verification loops.",
                    "The work connects evaluation rubrics with implementation environments so generated code can be inspected against concrete behavior, interfaces, and tests."
                ],
            },
            {
                title: "Iteration & Execution",
                body: [
                    "Prompt and workflow changes are treated as versioned experiments. Successful patterns are kept small, repeatable, and tied to measurable task outcomes.",
                    "The release rhythm is informal but disciplined: test the workflow, isolate failures, adjust prompts or tool boundaries, and reuse only the patterns that consistently improve output quality."
                ],
            },
        ],
        sidebarTitle: "Key Workflows",
        sidebarItems: [
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
