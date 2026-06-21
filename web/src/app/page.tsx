"use client";

import { useMemo, useState } from "react";

// ── Seed data ─────────────────────────────────────────────────────────────────

type SeedAgent = {
  id: string;
  name: string;
  type: "A2A" | "MCP" | "REST";
  version: string;
  date: string;
  identifier: string;
  description: string;
  tags: string[];
  verified: boolean;
  typeBadge: string;
  status: "Active" | "Inactive";
};

const SEED_AGENTS: SeedAgent[] = [
  {
    id: "flights",
    name: "Flight Booking",
    type: "A2A",
    version: "1.4.2",
    date: "6/18/2026",
    identifier: "agent:travel26/flights",
    description:
      "Search, compare and book commercial flights across major airlines with multi-city itinerary support.",
    tags: ["travel", "booking", "flights"],
    verified: true,
    typeBadge: "A2A",
    status: "Active",
  },
  {
    id: "hotels",
    name: "Hotel Booking",
    type: "A2A",
    version: "1.2.0",
    date: "6/15/2026",
    identifier: "agent:travel26/hotels",
    description:
      "Find and reserve hotels worldwide with live availability, loyalty programs and room-type preferences.",
    tags: ["travel", "booking", "hotels"],
    verified: false,
    typeBadge: "A2A",
    status: "Active",
  },
  {
    id: "car-rental",
    name: "Car Rental",
    type: "A2A",
    version: "0.9.7",
    date: "6/12/2026",
    identifier: "agent:travel26/car-rental",
    description:
      "Reserve rental vehicles across global providers with insurance, driver options and pickup logistics.",
    tags: ["travel", "booking", "cars"],
    verified: false,
    typeBadge: "A2A",
    status: "Active",
  },
  {
    id: "travel-insurance",
    name: "Travel Insurance",
    type: "A2A",
    version: "1.1.0",
    date: "6/10/2026",
    identifier: "agent:travel26/travel-insurance",
    description:
      "Quote and purchase travel insurance policies that match your itinerary, coverage tier and medical needs.",
    tags: ["travel", "finance", "insurance"],
    verified: false,
    typeBadge: "A2A",
    status: "Active",
  },
  {
    id: "visa",
    name: "Visa Assistant",
    type: "A2A",
    version: "1.0.3",
    date: "6/08/2026",
    identifier: "agent:travel26/visa",
    description:
      "Check visa requirements, prefill applications and track issuance status across 190+ destinations.",
    tags: ["travel", "legal", "visa"],
    verified: false,
    typeBadge: "A2A",
    status: "Active",
  },
  {
    id: "airport-transfer",
    name: "Airport Transfers",
    type: "A2A",
    version: "0.8.4",
    date: "6/05/2026",
    identifier: "agent:travel26/airport-transfer",
    description:
      "Schedule ground transportation between airports and your accommodations with live ETA tracking.",
    tags: ["travel", "transport"],
    verified: false,
    typeBadge: "A2A",
    status: "Active",
  },
  {
    id: "tours",
    name: "Tour Packages",
    type: "A2A",
    version: "1.3.1",
    date: "6/01/2026",
    identifier: "agent:travel26/tours",
    description:
      "Browse and book curated tour packages including guides, activities and group experiences.",
    tags: ["travel", "booking", "tours"],
    verified: false,
    typeBadge: "A2A",
    status: "Active",
  },
  {
    id: "cruises",
    name: "Cruise Booking",
    type: "A2A",
    version: "1.0.0",
    date: "5/28/2026",
    identifier: "agent:travel26/cruises",
    description:
      "Compare and reserve cruise itineraries across major lines with cabin selection and excursions.",
    tags: ["travel", "booking", "cruises"],
    verified: false,
    typeBadge: "A2A",
    status: "Inactive",
  },
  {
    id: "code-reviewer",
    name: "Code Reviewer",
    type: "MCP",
    version: "2.1.0",
    date: "6/20/2026",
    identifier: "agent:dev/code-reviewer",
    description:
      "Automated code review across pull requests with style, security and test-coverage feedback.",
    tags: ["dev", "code", "review"],
    verified: true,
    typeBadge: "MCP",
    status: "Active",
  },
  {
    id: "data-analyst",
    name: "Data Analyst",
    type: "MCP",
    version: "1.5.2",
    date: "6/17/2026",
    identifier: "agent:data/data-analyst",
    description:
      "Run ad-hoc analyses across warehouse tables and produce summaries, charts and follow-up questions.",
    tags: ["data", "analytics"],
    verified: false,
    typeBadge: "MCP",
    status: "Active",
  },
  {
    id: "sql-assistant",
    name: "SQL Assistant",
    type: "MCP",
    version: "1.2.4",
    date: "6/14/2026",
    identifier: "agent:data/sql-assistant",
    description:
      "Compose, explain and optimize SQL across Postgres, Snowflake and BigQuery dialects.",
    tags: ["data", "sql", "dev"],
    verified: false,
    typeBadge: "MCP",
    status: "Active",
  },
  {
    id: "document-summarizer",
    name: "Document Summarizer",
    type: "MCP",
    version: "1.0.8",
    date: "6/11/2026",
    identifier: "agent:ai/document-summarizer",
    description:
      "Summarize long PDFs, web pages and meeting transcripts into structured briefs.",
    tags: ["ai", "docs"],
    verified: false,
    typeBadge: "MCP",
    status: "Active",
  },
  {
    id: "api-tester",
    name: "API Tester",
    type: "REST",
    version: "0.7.1",
    date: "6/09/2026",
    identifier: "agent:dev/api-tester",
    description:
      "Generate request fixtures, replay traffic and validate OpenAPI contracts against live services.",
    tags: ["dev", "testing", "api"],
    verified: false,
    typeBadge: "REST",
    status: "Active",
  },
  {
    id: "security-scanner",
    name: "Security Scanner",
    type: "MCP",
    version: "2.0.3",
    date: "6/06/2026",
    identifier: "agent:security/security-scanner",
    description:
      "Continuously scan repositories and runtime environments for vulnerabilities and policy drift.",
    tags: ["security", "scanning"],
    verified: true,
    typeBadge: "MCP",
    status: "Active",
  },
  {
    id: "incident-responder",
    name: "Incident Responder",
    type: "MCP",
    version: "1.4.0",
    date: "6/03/2026",
    identifier: "agent:ops/incident-responder",
    description:
      "Triage on-call alerts, correlate signals and draft postmortems with linked evidence.",
    tags: ["ops", "incident"],
    verified: false,
    typeBadge: "MCP",
    status: "Active",
  },
];

const PROTOCOL_OPTIONS: Array<SeedAgent["type"]> = ["A2A", "MCP", "REST"];
const STATUS_OPTIONS: Array<SeedAgent["status"]> = ["Active", "Inactive"];
const TAG_OPTIONS = [
  "travel",
  "booking",
  "support",
  "data",
  "observability",
  "security",
  "dev",
  "ops",
  "communication",
];

const PAGE_SIZE = 6;

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [protocols, setProtocols] = useState<Set<string>>(new Set());
  const [statuses, setStatuses] = useState<Set<string>>(new Set());
  const [tags, setTags] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return SEED_AGENTS.filter((a) => {
      if (q && !a.name.toLowerCase().includes(q) && !a.identifier.toLowerCase().includes(q)) {
        return false;
      }
      if (protocols.size > 0 && !protocols.has(a.type)) return false;
      if (statuses.size > 0 && !statuses.has(a.status)) return false;
      if (tags.size > 0 && !a.tags.some((t) => tags.has(t))) return false;
      return true;
    });
  }, [search, protocols, statuses, tags]);

  const total = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, total);
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const pages = buildPageList(currentPage, total);

  function toggle(set: Set<string>, value: string, update: (next: Set<string>) => void) {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    update(next);
    setPage(1);
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-ink-strong leading-tight">Explore</h2>
        <p className="mt-1 text-sm text-ink-medium max-w-3xl">
          Browse the secure directory of agents published to this registry.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <FilterSidebar
          search={search}
          onSearch={(v) => {
            setSearch(v);
            setPage(1);
          }}
          protocols={protocols}
          onToggleProtocol={(v) => toggle(protocols, v, setProtocols)}
          statuses={statuses}
          onToggleStatus={(v) => toggle(statuses, v, setStatuses)}
          tags={tags}
          onToggleTag={(v) => toggle(tags, v, setTags)}
        />

        <div className="flex-1 min-w-0">
          {pageItems.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {pageItems.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          ) : (
            <div className="bg-surface-light rounded-card border border-line p-8 text-center">
              <p className="text-sm font-semibold text-ink-strong">No agents match these filters</p>
              <p className="mt-1 text-xs text-ink-weak">Adjust search, protocol, status or tags.</p>
            </div>
          )}

          <Pagination
            page={currentPage}
            total={total}
            pages={pages}
            onChange={(p) => setPage(p)}
          />
        </div>
      </div>
    </main>
  );
}

// ── FilterSidebar ─────────────────────────────────────────────────────────────

function FilterSidebar({
  search,
  onSearch,
  protocols,
  onToggleProtocol,
  statuses,
  onToggleStatus,
  tags,
  onToggleTag,
}: {
  search: string;
  onSearch: (v: string) => void;
  protocols: Set<string>;
  onToggleProtocol: (v: string) => void;
  statuses: Set<string>;
  onToggleStatus: (v: string) => void;
  tags: Set<string>;
  onToggleTag: (v: string) => void;
}) {
  return (
    <aside className="lg:w-64 flex-shrink-0">
      <div className="bg-surface-strong rounded-card border border-line p-4 space-y-5 sticky top-24 max-h-[calc(100vh-7rem)] flex flex-col overflow-hidden">
        {/* SEARCH */}
        <div className="flex-shrink-0">
          <label
            htmlFor="search"
            className="block text-xs font-semibold uppercase tracking-wide text-ink-medium mb-1.5"
          >
            Search
          </label>
          <input
            type="text"
            id="search"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Filter by agent name..."
            className="w-full rounded-control border-2 border-line bg-surface-light px-3 py-2 text-sm text-ink placeholder:text-ink-weak focus:outline-none focus:border-brand-500"
          />
        </div>

        {/* PROTOCOL */}
        <div className="flex-shrink-0">
          <span className="block text-xs font-semibold uppercase tracking-wide text-ink-medium mb-2">
            Protocol
          </span>
          <div className="space-y-1.5">
            {PROTOCOL_OPTIONS.map((opt) => (
              <label
                key={opt}
                className="flex items-center gap-2 text-sm text-ink cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={protocols.has(opt)}
                  onChange={() => onToggleProtocol(opt)}
                  className="rounded border-line-strong text-brand-500 focus:ring-brand-500"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {/* STATUS */}
        <div className="flex-shrink-0">
          <span className="block text-xs font-semibold uppercase tracking-wide text-ink-medium mb-2">
            Status
          </span>
          <div className="space-y-1.5">
            {STATUS_OPTIONS.map((opt) => (
              <label
                key={opt}
                className="flex items-center gap-2 text-sm text-ink cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={statuses.has(opt)}
                  onChange={() => onToggleStatus(opt)}
                  className="rounded border-line-strong text-brand-500 focus:ring-brand-500"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {/* TAGS */}
        <div className="flex-1 min-h-0 flex flex-col">
          <span className="block text-xs font-semibold uppercase tracking-wide text-ink-medium mb-2">
            Tags
          </span>
          <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
            {TAG_OPTIONS.map((t) => (
              <label
                key={t}
                className="flex items-center gap-2 text-sm text-ink cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={tags.has(t)}
                  onChange={() => onToggleTag(t)}
                  className="rounded border-line-strong text-brand-500 focus:ring-brand-500"
                />
                <span className="truncate">{t}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

// ── AgentCard ─────────────────────────────────────────────────────────────────

function AgentCard({ agent }: { agent: SeedAgent }) {
  return (
    <article
      role="button"
      tabIndex={0}
      className="bg-surface-light rounded-card border border-line/70 shadow-card p-4 hover:shadow-card-hover hover:border-line-strong transition cursor-pointer flex flex-col h-full gap-3"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 min-w-0">
            <h3 className="font-semibold text-ink-strong truncate">{agent.name}</h3>
            {agent.verified && (
              <span className="inline-flex flex-shrink-0" title="Verified">
                <svg
                  className="w-4 h-4 text-brand-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            )}
          </div>
          <div className="mt-0.5 text-xs text-ink-weak">
            Version {agent.version} • {agent.date}
          </div>
        </div>
        {agent.typeBadge && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-[#fdeccc] text-[#8a5a06] flex-shrink-0">
            {agent.typeBadge}
          </span>
        )}
      </div>
      <p className="text-sm text-ink line-clamp-2 leading-relaxed">{agent.description}</p>
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {agent.tags.slice(0, 4).map((t) => (
          <span
            key={t}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-surface-tag text-ink"
          >
            {t}
          </span>
        ))}
      </div>
    </article>
  );
}

// ── Pagination ────────────────────────────────────────────────────────────────

function Pagination({
  page,
  total,
  pages,
  onChange,
}: {
  page: number;
  total: number;
  pages: Array<number | "...">;
  onChange: (p: number) => void;
}) {
  return (
    <nav className="flex items-center justify-center gap-2 mt-6 pb-4">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="px-3 py-1.5 text-sm font-medium rounded text-ink border-2 border-line bg-surface-light hover:border-line-strong disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        Previous
      </button>
      <div className="flex items-center gap-1">
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`gap-${i}`} className="px-2 py-1 text-sm text-ink-weak">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onChange(p)}
              className={
                "min-w-9 h-9 px-2 text-sm font-medium rounded-full transition " +
                (p === page ? "bg-brand-500 text-white" : "text-ink hover:bg-surface-strong")
              }
            >
              {p}
            </button>
          ),
        )}
      </div>
      <button
        onClick={() => onChange(Math.min(total, page + 1))}
        disabled={page === total}
        className="px-3 py-1.5 text-sm font-medium rounded text-ink border-2 border-line bg-surface-light hover:border-line-strong disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        Next
      </button>
    </nav>
  );
}

function buildPageList(current: number, total: number): Array<number | "..."> {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const out: Array<number | "..."> = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) out.push("...");
  for (let i = start; i <= end; i++) out.push(i);
  if (end < total - 1) out.push("...");
  out.push(total);
  return out;
}
