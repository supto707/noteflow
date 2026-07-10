import { useState } from "react";
import { motion } from "motion/react";
import { ChevronRight, ChevronDown, Plus, FileText, Search, Check, Clock, Users, Star } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface WikiPage { id: number; title: string; children?: WikiPage[]; verified?: boolean; updatedBy?: string; updated?: string; content?: string; }

const wikiTree: WikiPage[] = [
  {
    id: 1, title: "Engineering", children: [
      { id: 11, title: "Architecture Overview", verified: true, updatedBy: "Ada", updated: "2 days ago", content: "## System Architecture\n\nNoteFlow runs on a distributed microservices architecture deployed on Kubernetes. All data is stored in PostgreSQL with a Redis cache layer.\n\n## Services\n\n- **Auth service** — handles OAuth, sessions, and JWTs\n- **Notes service** — CRUD for pages, blocks, and databases\n- **Sync service** — real-time collaboration via WebSockets\n- **Search service** — full-text search powered by Elasticsearch\n\n## Infrastructure\n\nAll services run on AWS in three regions: us-east-1, eu-west-1, ap-southeast-1. We use Terraform for infrastructure-as-code." },
      { id: 12, title: "API Reference", verified: true, updatedBy: "Priya", updated: "1 week ago", content: "## REST API\n\nBase URL: https://api.noteflow.app/v1\n\nAuthentication: Bearer token in Authorization header.\n\n## Endpoints\n\n- GET /notes — list all notes\n- POST /notes — create a note\n- GET /notes/:id — get a note\n- PATCH /notes/:id — update a note\n- DELETE /notes/:id — delete a note\n\n## Rate limits\n\n100 requests per minute per token. Enterprise plans have higher limits." },
      { id: 13, title: "On-call Runbook", verified: false, updatedBy: "Marcus", updated: "3 weeks ago", content: "## On-call Rotation\n\nWeekly rotation, Mon–Mon. PagerDuty manages escalation.\n\n## Severity Levels\n\n- P0: Site down. Page on-call immediately.\n- P1: Core feature broken. Respond within 30 min.\n- P2: Degraded experience. Respond within 4 hrs.\n- P3: Minor issue. Handle during business hours.\n\n## Common incidents\n\nSee the incident log in Linear for historical context." },
    ]
  },
  {
    id: 2, title: "Product", children: [
      { id: 21, title: "Product Principles", verified: true, updatedBy: "Kaito", updated: "1 month ago", content: "## Our Principles\n\n1. **Simplicity over features** — every new feature must remove complexity elsewhere\n2. **Performance is a feature** — if it's slow, it's broken\n3. **Trust the user** — default to transparency and user control\n4. **Design for longevity** — notes from 2025 should be readable in 2035\n\n## Decision framework\n\nWhen in doubt, ask: does this make the product simpler or more complex?" },
      { id: 22, title: "Roadmap", verified: false, updatedBy: "Ada", updated: "1 day ago", content: "## Q4 2025\n\n- Mobile V2 (auth, editor, offline)\n- Database relations and rollups\n- Bulk import from Notion and Bear\n\n## Q1 2026\n\n- Custom domains for published pages\n- Calendar database view\n- Advanced search with filters\n\n## Long term bets\n\n- Desktop app (Tauri)\n- Plugin API\n- NoteFlow for Education" },
    ]
  },
  {
    id: 3, title: "Company", children: [
      { id: 31, title: "Mission & Values", verified: true, updatedBy: "Kaito", updated: "2 months ago", content: "## Mission\n\nHelp people think more clearly by giving them a tool that gets out of the way.\n\n## Values\n\n- **Craft** — we care deeply about the details\n- **Candour** — we say what we mean\n- **Curiosity** — we stay close to users\n- **Courage** — we make hard calls\n\n## Team\n\n12 people across San Francisco, London, and Tokyo." },
      { id: 32, title: "How We Work", verified: true, updatedBy: "Priya", updated: "3 weeks ago", content: "## Async by default\n\nWe document decisions in NoteFlow. Meetings are the exception, not the default.\n\n## Sprint cadence\n\n2-week sprints. Planning Monday, retro Friday.\n\n## Communication\n\n- Slack for async discussion\n- NoteFlow for documents and decisions\n- Linear for task tracking\n\n## Working hours\n\nWe trust each other to get the work done. No core hours required." },
    ]
  },
];

function PageTree({ pages, depth = 0, selected, onSelect }: { pages: WikiPage[]; depth?: number; selected: WikiPage; onSelect: (p: WikiPage) => void }) {
  const [open, setOpen] = useState<Record<number, boolean>>({ 1: true, 2: true, 3: true });
  const { dark } = useTheme();
  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#8A8A80" : "#6E6E68";
  const activeBg = dark ? "rgba(99,87,232,0.14)" : "rgba(99,87,232,0.08)";
  const hoverBg = dark ? "rgba(255,255,255,0.04)" : "rgba(14,14,12,0.04)";

  return (
    <>
      {pages.map(page => (
        <div key={page.id}>
          <div
            className="flex items-center gap-1 rounded-lg cursor-pointer group"
            style={{ padding: `6px ${8 + depth * 16}px 6px 8px`, background: selected.id === page.id ? activeBg : "transparent", marginBottom: 1 }}
            onMouseEnter={e => { if (selected.id !== page.id) (e.currentTarget as HTMLElement).style.background = hoverBg; }}
            onMouseLeave={e => { if (selected.id !== page.id) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            onClick={() => { if (page.children) setOpen(o => ({ ...o, [page.id]: !o[page.id] })); else onSelect(page); }}
          >
            <span style={{ display: "flex", alignItems: "center", flexShrink: 0, color: sub, width: 16 }}>
              {page.children ? (open[page.id] ? <ChevronDown size={12} /> : <ChevronRight size={12} />) : <FileText size={11} />}
            </span>
            <span style={{ fontSize: 13, fontWeight: page.children ? 600 : 400, color: selected.id === page.id ? "#6357E8" : (page.children ? fg : sub), flex: 1, lineHeight: 1.3 }}>
              {page.title}
            </span>
            {page.verified && <Check size={10} style={{ color: "#22C27D", flexShrink: 0 }} />}
          </div>
          {page.children && open[page.id] && (
            <PageTree pages={page.children} depth={depth + 1} selected={selected} onSelect={onSelect} />
          )}
        </div>
      ))}
    </>
  );
}

export default function Wiki() {
  const { dark } = useTheme();
  const flatPages = wikiTree.flatMap(g => g.children || []);
  const [selected, setSelected] = useState<WikiPage>(flatPages[0]);

  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#8A8A80" : "#6E6E68";
  const card = dark ? "#141412" : "#FFFFFF";
  const panelBg = dark ? "#111110" : "#FAFAF8";
  const border = dark ? "rgba(255,255,255,0.07)" : "rgba(14,14,12,0.08)";

  function renderContent(text: string = "") {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("## ")) return <h2 key={i} style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, color: fg, letterSpacing: "-0.01em", margin: "24px 0 10px" }}>{line.slice(3)}</h2>;
      if (line.startsWith("- ") || line.startsWith("- **")) {
        const formatted = line.slice(2).replace(/\*\*(.+?)\*\*/g, (_, t) => `<strong>${t}</strong>`);
        return <div key={i} className="flex items-start gap-2" style={{ marginBottom: 6 }}>
          <span style={{ color: "#6357E8", marginTop: 2, flexShrink: 0 }}>•</span>
          <span style={{ fontSize: 14, color: dark ? "#C0C0B8" : "#3A3A38", lineHeight: 1.75 }} dangerouslySetInnerHTML={{ __html: formatted }} />
        </div>;
      }
      if (/^\d+\./.test(line)) {
        const formatted = line.replace(/\*\*(.+?)\*\*/g, (_, t) => `<strong>${t}</strong>`);
        return <div key={i} style={{ fontSize: 14, color: dark ? "#C0C0B8" : "#3A3A38", lineHeight: 1.75, marginBottom: 6 }} dangerouslySetInnerHTML={{ __html: formatted }} />;
      }
      if (line === "") return <div key={i} style={{ height: 10 }} />;
      const formatted = line.replace(/\*\*(.+?)\*\*/g, (_, t) => `<strong>${t}</strong>`);
      return <p key={i} style={{ fontSize: 14, color: dark ? "#C0C0B8" : "#3A3A38", lineHeight: 1.8, marginBottom: 2 }} dangerouslySetInnerHTML={{ __html: formatted }} />;
    });
  }

  return (
    <div className="flex h-screen" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Tree sidebar */}
      <div className="flex flex-col flex-shrink-0 border-r" style={{ width: 240, background: panelBg, borderColor: border, overflow: "hidden" }}>
        <div style={{ padding: "18px 14px 10px" }}>
          <div className="flex items-center justify-between mb-3">
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 15, fontWeight: 700, color: fg }}>Wiki</h2>
            <button style={{ background: "rgba(99,87,232,0.14)", border: "none", borderRadius: 6, color: "#6357E8", cursor: "pointer", padding: "4px 8px", fontSize: 12, fontWeight: 500 }}>
              <Plus size={13} />
            </button>
          </div>
          <div className="flex items-center gap-2 rounded-lg" style={{ padding: "7px 10px", background: dark ? "rgba(255,255,255,0.05)" : "rgba(14,14,12,0.06)", border: `1px solid ${border}` }}>
            <Search size={12} style={{ color: sub }} />
            <span style={{ fontSize: 12, color: sub }}>Search wiki…</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-2" style={{ scrollbarWidth: "none" }}>
          <PageTree pages={wikiTree} selected={selected} onSelect={setSelected} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-auto" style={{ background: card, scrollbarWidth: "none" }}>
        <motion.div key={selected.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          style={{ padding: "48px 72px 80px", maxWidth: 760, margin: "0 auto", width: "100%" }}>

          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 mb-6" style={{ fontSize: 12, color: sub }}>
            <span>Wiki</span>
            <ChevronRight size={12} />
            <span style={{ color: fg, fontWeight: 500 }}>{selected.title}</span>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-8 pb-6" style={{ borderBottom: `1px solid ${border}` }}>
            {selected.verified !== undefined && (
              <div className="flex items-center gap-1.5 rounded-full"
                style={{ padding: "4px 12px", background: selected.verified ? "rgba(34,194,125,0.12)" : "rgba(245,158,11,0.12)", fontSize: 12, fontWeight: 500, color: selected.verified ? "#22C27D" : "#F59E0B" }}>
                {selected.verified ? <><Check size={11} /> Verified</> : <><Clock size={11} /> Needs review</>}
              </div>
            )}
            {selected.updatedBy && (
              <div className="flex items-center gap-2" style={{ fontSize: 12, color: sub }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#6357E8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "white" }}>
                  {selected.updatedBy[0]}
                </div>
                Updated by {selected.updatedBy} · {selected.updated}
              </div>
            )}
            <button className="ml-auto flex items-center gap-1.5"
              style={{ background: "none", border: "none", color: "#6357E8", fontSize: 12, fontWeight: 500, cursor: "pointer" }}>
              <Users size={12} /> Share
            </button>
          </div>

          {/* Title */}
          <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 800, color: fg, letterSpacing: "-0.035em", lineHeight: 1.1, marginBottom: 28 }}>
            {selected.title}
          </h1>

          {/* Content */}
          {renderContent(selected.content)}
        </motion.div>
      </div>
    </div>
  );
}
