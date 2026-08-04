import analytics from "@/assets/project-analytics.jpg";
import commerce from "@/assets/project-commerce.jpg";
import ai from "@/assets/project-ai.jpg";
import fitness from "@/assets/project-fitness.jpg";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  category: "Web App" | "Mobile" | "AI" | "Platform";
  year: string;
  image: string;
  featured: boolean;
  role: string;
  duration: string;
  stack: string[];
  overview: string;
  features: { title: string; description: string }[];
  metrics: { label: string; value: string }[];
  demo: string;
  repo: string;
};

export const profile = {
  name: "Mustafa Aldhaifi",
  role: "Full Stack Developer",
  degree: "B.Sc. Information Technology",
  location: "Remote · Sana'a, YE",
  email: "hello@mustafaaldhaifi.dev",
  typing: [
    "Full Stack Developer",
    "React & Node Specialist",
    "Cloud-Native Engineer",
    "IT Graduate, 2025",
  ],
  bio: [
    "I'm an IT graduate who builds production-grade web platforms end to end — from database schema and API design to pixel-tuned interfaces that feel effortless.",
    "My work sits at the intersection of engineering rigour and product craft: typed codebases, measurable performance budgets, and interfaces people actually enjoy using.",
  ],
};

export const stats = [
  { label: "Projects shipped", value: 38, suffix: "+" },
  { label: "Production users", value: 120, suffix: "K" },
  { label: "Lighthouse average", value: 98, suffix: "" },
  { label: "Open source stars", value: 2400, suffix: "+" },
];

export const skills = [
  { group: "Frontend", items: ["React 19", "TypeScript", "Tailwind CSS", "Motion", "Next.js"], level: 95 },
  { group: "Backend", items: ["Node.js", "Fastify", "GraphQL", "PostgreSQL", "Redis"], level: 90 },
  { group: "Cloud & DevOps", items: ["AWS", "Docker", "Terraform", "GitHub Actions", "Cloudflare"], level: 84 },
  { group: "Craft", items: ["Design systems", "a11y", "Testing", "Performance", "DX tooling"], level: 88 },
];

export const techStack = [
  "TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Prisma",
  "GraphQL", "Tailwind CSS", "Docker", "AWS", "Redis", "Vitest",
  "Playwright", "Terraform", "Figma", "Supabase",
];

export const experience = [
  {
    period: "2025 — Present",
    role: "Full Stack Developer",
    company: "Northlight Labs",
    description:
      "Own the platform frontend and public API for a B2B analytics product serving 120K monthly users. Cut p95 dashboard load from 3.4s to 640ms.",
  },
  {
    period: "2024 — 2025",
    role: "Software Engineer Intern",
    company: "Vertex Systems",
    description:
      "Built an internal design system and component library adopted by four product teams, plus a CI pipeline that halved release time.",
  },
  {
    period: "2023 — 2024",
    role: "Freelance Developer",
    company: "Independent",
    description:
      "Delivered twelve client web applications across commerce, health and education, handling scope, architecture and deployment solo.",
  },
  {
    period: "2021 — 2025",
    role: "B.Sc. Information Technology",
    company: "University of Technology",
    description:
      "Graduated with distinction. Thesis on edge-rendered web architectures and their impact on Core Web Vitals.",
  },
];

export const testimonials = [
  {
    quote:
      "Mustafa shipped our analytics rewrite three weeks early and it's the fastest surface we own. He thinks like a product owner, not a ticket taker.",
    name: "Priya Raghavan",
    title: "VP Engineering, Northlight Labs",
  },
  {
    quote:
      "The design system he built is still the backbone of every product we launch. Genuinely rare craft for someone this early in their career.",
    name: "Daniel Okafor",
    title: "Head of Design, Vertex Systems",
  },
  {
    quote:
      "Clear communication, ruthless about performance, and the handover documentation was better than most agencies I've hired.",
    name: "Mira Solberg",
    title: "Founder, Tidal Commerce",
  },
];

export const projects: Project[] = [
  {
    slug: "northlight-analytics",
    title: "Northlight Analytics",
    tagline: "Real-time product analytics for B2B teams",
    category: "Platform",
    year: "2025",
    image: analytics,
    featured: true,
    role: "Lead Full Stack Developer",
    duration: "8 months",
    stack: ["React", "TypeScript", "Node.js", "ClickHouse", "AWS", "Tailwind CSS"],
    overview:
      "A streaming analytics platform that ingests 40M events per day and renders sub-second dashboards. I owned the query layer, the charting runtime and the entire design system.",
    features: [
      { title: "Streaming ingestion", description: "Event pipeline with backpressure handling sustaining 40M events/day." },
      { title: "Sub-second queries", description: "Columnar store plus a caching layer that keeps p95 dashboard load under 700ms." },
      { title: "Composable dashboards", description: "Drag-and-drop widgets persisted per workspace with shareable snapshots." },
      { title: "Role-based access", description: "Granular workspace permissions with audit trails on every data export." },
    ],
    metrics: [
      { label: "p95 load", value: "640ms" },
      { label: "Events / day", value: "40M" },
      { label: "Monthly users", value: "120K" },
    ],
    demo: "https://example.com/northlight",
    repo: "https://github.com/example/northlight",
  },
  {
    slug: "tidal-commerce",
    title: "Tidal Commerce",
    tagline: "Headless storefront with edge-rendered catalogue",
    category: "Web App",
    year: "2025",
    image: commerce,
    featured: true,
    role: "Full Stack Developer",
    duration: "5 months",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Cloudflare"],
    overview:
      "A headless commerce front end serving a 12,000-SKU catalogue from the edge, with an admin surface for merchandising and live inventory sync.",
    features: [
      { title: "Edge catalogue", description: "Incrementally cached product pages rendering in under 200ms worldwide." },
      { title: "One-tap checkout", description: "Stripe payment element with saved wallets and address autofill." },
      { title: "Merchandising studio", description: "Drag-to-rank collections with scheduled publishing." },
      { title: "Live inventory", description: "Webhook-driven stock sync with optimistic cart reconciliation." },
    ],
    metrics: [
      { label: "Conversion lift", value: "+31%" },
      { label: "TTFB", value: "84ms" },
      { label: "SKUs", value: "12K" },
    ],
    demo: "https://example.com/tidal",
    repo: "https://github.com/example/tidal",
  },
  {
    slug: "atlas-assistant",
    title: "Atlas Assistant",
    tagline: "Retrieval-augmented assistant for internal knowledge",
    category: "AI",
    year: "2024",
    image: ai,
    featured: true,
    role: "Full Stack Developer",
    duration: "4 months",
    stack: ["React", "Node.js", "pgvector", "OpenAI", "Redis"],
    overview:
      "A private assistant that answers questions over a company's documents with citations, streaming responses and a permissions-aware retrieval layer.",
    features: [
      { title: "Cited answers", description: "Every response links back to the exact source passage." },
      { title: "Permissions-aware retrieval", description: "Vector search filtered by the requester's document scopes." },
      { title: "Streaming UI", description: "Token streaming with graceful cancellation and retry." },
      { title: "Evaluation harness", description: "Regression suite scoring answer accuracy on each deploy." },
    ],
    metrics: [
      { label: "Answer accuracy", value: "94%" },
      { label: "First token", value: "310ms" },
      { label: "Docs indexed", value: "80K" },
    ],
    demo: "https://example.com/atlas",
    repo: "https://github.com/example/atlas",
  },
  {
    slug: "pulse-fitness",
    title: "Pulse Fitness",
    tagline: "Training tracker with adaptive programming",
    category: "Mobile",
    year: "2024",
    image: fitness,
    featured: false,
    role: "Full Stack Developer",
    duration: "3 months",
    stack: ["React Native", "Expo", "Supabase", "TypeScript"],
    overview:
      "A cross-platform training tracker that adapts weekly volume based on logged performance and recovery signals.",
    features: [
      { title: "Adaptive programming", description: "Weekly volume auto-tuned from logged RPE and completion rate." },
      { title: "Offline-first logging", description: "Local writes queued and reconciled on reconnect." },
      { title: "Progress insights", description: "Strength curves and PR tracking per movement pattern." },
      { title: "Social streaks", description: "Lightweight accountability groups with weekly recaps." },
    ],
    metrics: [
      { label: "Retention D30", value: "48%" },
      { label: "App rating", value: "4.8" },
      { label: "Workouts logged", value: "310K" },
    ],
    demo: "https://example.com/pulse",
    repo: "https://github.com/example/pulse",
  },
  {
    slug: "orbit-scheduler",
    title: "Orbit Scheduler",
    tagline: "Team scheduling with timezone-aware planning",
    category: "Web App",
    year: "2024",
    image: analytics,
    featured: false,
    role: "Full Stack Developer",
    duration: "2 months",
    stack: ["React", "Fastify", "PostgreSQL", "Temporal"],
    overview:
      "A scheduling tool that finds overlap windows for distributed teams and books them across connected calendars.",
    features: [
      { title: "Overlap finder", description: "Ranks meeting windows by fairness across all participant timezones." },
      { title: "Calendar sync", description: "Two-way sync with Google and Microsoft calendars." },
      { title: "Booking pages", description: "Shareable links with buffer rules and availability caps." },
      { title: "Async digests", description: "Daily summaries so nobody needs a standup." },
    ],
    metrics: [
      { label: "Scheduling time", value: "-72%" },
      { label: "Teams", value: "900+" },
      { label: "Uptime", value: "99.98%" },
    ],
    demo: "https://example.com/orbit",
    repo: "https://github.com/example/orbit",
  },
  {
    slug: "lumen-docs",
    title: "Lumen Docs",
    tagline: "Collaborative documentation with live blocks",
    category: "Platform",
    year: "2023",
    image: ai,
    featured: false,
    role: "Frontend Developer",
    duration: "3 months",
    stack: ["React", "TypeScript", "Yjs", "WebSockets", "Redis"],
    overview:
      "A realtime documentation workspace where teams co-edit rich documents with embedded live data blocks.",
    features: [
      { title: "CRDT editing", description: "Conflict-free collaborative editing with presence cursors." },
      { title: "Live data blocks", description: "Embed queries that refresh inline inside a document." },
      { title: "Version history", description: "Time-travel diffs with one-click restore." },
      { title: "Publishing", description: "Public doc sites generated straight from a workspace." },
    ],
    metrics: [
      { label: "Concurrent editors", value: "50" },
      { label: "Sync latency", value: "40ms" },
      { label: "Docs created", value: "45K" },
    ],
    demo: "https://example.com/lumen",
    repo: "https://github.com/example/lumen",
  },
  {
    slug: "verde-carbon",
    title: "Verde Carbon",
    tagline: "Carbon accounting dashboard for supply chains",
    category: "Platform",
    year: "2023",
    image: commerce,
    featured: false,
    role: "Full Stack Developer",
    duration: "4 months",
    stack: ["Next.js", "Python", "PostgreSQL", "AWS"],
    overview:
      "Emissions accounting across multi-tier supplier networks, with audit-ready reporting and scenario modelling.",
    features: [
      { title: "Supplier graph", description: "Multi-tier emissions rollups with data-quality scoring." },
      { title: "Scenario modelling", description: "Compare reduction pathways side by side." },
      { title: "Audit exports", description: "GHG-protocol-aligned reports generated on demand." },
      { title: "Data ingestion", description: "CSV and ERP connectors with validation pipelines." },
    ],
    metrics: [
      { label: "Suppliers tracked", value: "6.2K" },
      { label: "Report time", value: "-85%" },
      { label: "Accuracy", value: "±2%" },
    ],
    demo: "https://example.com/verde",
    repo: "https://github.com/example/verde",
  },
  {
    slug: "signal-inbox",
    title: "Signal Inbox",
    tagline: "AI triage layer for high-volume support queues",
    category: "AI",
    year: "2023",
    image: fitness,
    featured: false,
    role: "Full Stack Developer",
    duration: "2 months",
    stack: ["React", "Node.js", "OpenAI", "Postgres", "BullMQ"],
    overview:
      "An inbox that classifies, prioritises and drafts replies for support teams handling thousands of daily tickets.",
    features: [
      { title: "Smart triage", description: "Intent and urgency classification with confidence thresholds." },
      { title: "Draft replies", description: "Suggested responses grounded in past resolved tickets." },
      { title: "SLA guardrails", description: "Escalation rules that surface at-risk conversations early." },
      { title: "Analytics", description: "Resolution time and deflection dashboards per team." },
    ],
    metrics: [
      { label: "Triage accuracy", value: "91%" },
      { label: "Handle time", value: "-38%" },
      { label: "Tickets / day", value: "9K" },
    ],
    demo: "https://example.com/signal",
    repo: "https://github.com/example/signal",
  },
];

export const categories = ["All", "Platform", "Web App", "AI", "Mobile"] as const;

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
