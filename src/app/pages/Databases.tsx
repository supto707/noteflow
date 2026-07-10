import { useState } from "react";
import { motion } from "motion/react";
import { Plus, Table2, LayoutGrid, Calendar, List, Filter, ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Status = "Not started" | "In progress" | "Done" | "Blocked";
type Priority = "Low" | "Medium" | "High" | "Urgent";

interface Row {
  id: number; title: string; status: Status; priority: Priority;
  assignee: string; assigneeColor: string; due: string; tag: string; tagColor: string;
}

const rows: Row[] = [
  { id: 1, title: "Mobile app V2 — auth flow", status: "In progress", priority: "High", assignee: "Ada", assigneeColor: "#6357E8", due: "Oct 15", tag: "Engineering", tagColor: "#6357E8" },
  { id: 2, title: "Redesign onboarding screens", status: "Not started", priority: "Medium", assignee: "Marcus", assigneeColor: "#22C27D", due: "Oct 22", tag: "Design", tagColor: "#F59E0B" },
  { id: 3, title: "Migrate database to Postgres 16", status: "Done", priority: "High", assignee: "Priya", assigneeColor: "#EC4899", due: "Oct 5", tag: "Engineering", tagColor: "#6357E8" },
  { id: 4, title: "Write Q4 release blog post", status: "In progress", priority: "Low", assignee: "Kaito", assigneeColor: "#F59E0B", due: "Oct 30", tag: "Marketing", tagColor: "#22C27D" },
  { id: 5, title: "Set up error monitoring (Sentry)", status: "Not started", priority: "Urgent", assignee: "Ada", assigneeColor: "#6357E8", due: "Oct 10", tag: "Engineering", tagColor: "#6357E8" },
  { id: 6, title: "User interviews — churn cohort", status: "In progress", priority: "High", assignee: "Marcus", assigneeColor: "#22C27D", due: "Oct 18", tag: "Research", tagColor: "#EC4899" },
  { id: 7, title: "Update privacy policy for EU", status: "Done", priority: "Medium", assignee: "Priya", assigneeColor: "#EC4899", due: "Oct 1", tag: "Legal", tagColor: "#8A8A80" },
  { id: 8, title: "Performance audit — editor load time", status: "Not started", priority: "High", assignee: "Kaito", assigneeColor: "#F59E0B", due: "Nov 5", tag: "Engineering", tagColor: "#6357E8" },
];

const STATUS_COLORS: Record<Status, { bg: string; text: string }> = {
  "Not started": { bg: "rgba(138,138,128,0.15)", text: "#8A8A80" },
  "In progress": { bg: "rgba(99,87,232,0.15)", text: "#6357E8" },
  "Done": { bg: "rgba(34,194,125,0.15)", text: "#22C27D" },
  "Blocked": { bg: "rgba(239,68,68,0.15)", text: "#EF4444" },
};

const PRIORITY_COLORS: Record<Priority, string> = {
  "Low": "#8A8A80",
  "Medium": "#F59E0B",
  "High": "#6357E8",
  "Urgent": "#EF4444",
};

const VIEWS = [
  { label: "Table", icon: Table2 },
  { label: "Board", icon: LayoutGrid },
  { label: "Calendar", icon: Calendar },
  { label: "List", icon: List },
];

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: EASE }} className={className}>
      {children}
    </motion.div>
  );
}

export default function Databases() {
  const { dark } = useTheme();
  const [view, setView] = useState("Table");
  const [data, setData] = useState(rows);

  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#8A8A80" : "#6E6E68";
  const card = dark ? "#141412" : "#FFFFFF";
  const border = dark ? "rgba(255,255,255,0.07)" : "rgba(14,14,12,0.08)";
  const hoverBg = dark ? "rgba(255,255,255,0.035)" : "rgba(14,14,12,0.025)";
  const headBg = dark ? "#0E0E0C" : "#F7F6F2";

  const boardCols: Status[] = ["Not started", "In progress", "Done", "Blocked"];

  return (
    <div style={{ padding: "32px 40px", fontFamily: "'DM Sans', sans-serif", minHeight: "100%", background: dark ? "#0A0A08" : "#F7F6F2" }}>
      {/* Header */}
      <FadeUp delay={0.05}>
        <div className="flex items-end justify-between mb-6">
          <div>
            <p style={{ fontSize: 11, color: sub, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'Geist Mono', monospace", marginBottom: 6 }}>Database</p>
            <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, color: fg, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              Product Tasks
            </h1>
          </div>
          <button className="flex items-center gap-2 rounded-xl transition-all"
            style={{ padding: "10px 18px", background: "#6357E8", border: "none", color: "white", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
            <Plus size={14} /> New row
          </button>
        </div>
      </FadeUp>

      {/* View switcher + filters */}
      <FadeUp delay={0.1}>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-1 rounded-xl p-1" style={{ background: card, border: `1px solid ${border}` }}>
            {VIEWS.map(({ label, icon: Icon }) => (
              <button key={label} onClick={() => setView(label)}
                className="flex items-center gap-1.5 rounded-lg transition-all duration-150"
                style={{ padding: "6px 14px", fontSize: 13, fontWeight: 500, border: "none", cursor: "pointer", background: view === label ? (dark ? "rgba(99,87,232,0.2)" : "#6357E8") : "transparent", color: view === label ? (dark ? "#A09CF0" : "white") : sub }}>
                <Icon size={13} /> {label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {[{ icon: Filter, label: "Filter" }, { icon: ArrowUpDown, label: "Sort" }].map(({ icon: Icon, label }) => (
              <button key={label} className="flex items-center gap-1.5 rounded-lg transition-colors"
                style={{ padding: "7px 14px", background: card, border: `1px solid ${border}`, color: sub, fontSize: 12, fontWeight: 500, cursor: "pointer" }}>
                <Icon size={12} /> {label}
              </button>
            ))}
          </div>
        </div>
      </FadeUp>

      {/* Table view */}
      {view === "Table" && (
        <FadeUp delay={0.15}>
          <div className="rounded-2xl overflow-hidden border" style={{ background: card, borderColor: border }}>
            {/* Header row */}
            <div className="grid border-b" style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 40px", borderColor: border, background: headBg }}>
              {["Title", "Status", "Priority", "Assignee", "Due", "Tag", ""].map((h, i) => (
                <div key={i} className="flex items-center gap-1" style={{ padding: "10px 16px", fontSize: 11, fontWeight: 600, color: sub, letterSpacing: "0.04em", textTransform: "uppercase", fontFamily: "'Geist Mono', monospace", cursor: h ? "pointer" : "default" }}>
                  {h} {h && <ChevronDown size={10} style={{ opacity: 0.5 }} />}
                </div>
              ))}
            </div>
            {data.map((row, i) => (
              <motion.div key={row.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.04, ease: EASE }}
                className="grid border-b group transition-colors cursor-pointer"
                style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 40px", borderColor: border }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = hoverBg)}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "transparent")}>
                <div style={{ padding: "12px 16px" }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: fg }}>{row.title}</span>
                </div>
                <div style={{ padding: "12px 16px", display: "flex", alignItems: "center" }}>
                  <span className="rounded-full" style={{ fontSize: 11, fontWeight: 500, padding: "3px 10px", background: STATUS_COLORS[row.status].bg, color: STATUS_COLORS[row.status].text }}>
                    {row.status}
                  </span>
                </div>
                <div style={{ padding: "12px 16px", display: "flex", alignItems: "center" }}>
                  <span style={{ fontSize: 12, fontWeight: 500, color: PRIORITY_COLORS[row.priority] }}>
                    {row.priority === "Urgent" ? "🔴" : row.priority === "High" ? "🟠" : row.priority === "Medium" ? "🟡" : "⚪"} {row.priority}
                  </span>
                </div>
                <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: row.assigneeColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "white" }}>
                    {row.assignee[0]}
                  </div>
                  <span style={{ fontSize: 12, color: fg }}>{row.assignee}</span>
                </div>
                <div style={{ padding: "12px 16px", display: "flex", alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: row.status === "Done" ? sub : fg, textDecoration: row.status === "Done" ? "line-through" : "none", fontFamily: "'Geist Mono', monospace" }}>
                    {row.due}
                  </span>
                </div>
                <div style={{ padding: "12px 16px", display: "flex", alignItems: "center" }}>
                  <span className="rounded" style={{ fontSize: 11, fontWeight: 500, padding: "2px 8px", background: row.tagColor + "18", color: row.tagColor }}>
                    {row.tag}
                  </span>
                </div>
                <div style={{ padding: "12px 8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <MoreHorizontal size={14} style={{ color: sub, opacity: 0 }} className="group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            ))}
            {/* Add row */}
            <button className="flex items-center gap-2 w-full transition-colors"
              style={{ padding: "10px 16px", background: "none", border: "none", color: sub, fontSize: 13, cursor: "pointer", textAlign: "left" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = hoverBg)}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "none")}>
              <Plus size={13} /> New row
            </button>
          </div>
        </FadeUp>
      )}

      {/* Board view */}
      {view === "Board" && (
        <FadeUp delay={0.15}>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {boardCols.map(col => {
              const colRows = data.filter(r => r.status === col);
              return (
                <div key={col} className="flex-shrink-0 rounded-2xl border" style={{ width: 280, background: card, borderColor: border, overflow: "hidden" }}>
                  <div className="flex items-center justify-between" style={{ padding: "14px 16px", borderBottom: `1px solid ${border}` }}>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full" style={{ width: 8, height: 8, display: "inline-block", background: STATUS_COLORS[col].text }} />
                      <span style={{ fontSize: 13, fontWeight: 600, color: fg }}>{col}</span>
                      <span className="rounded-full" style={{ fontSize: 10, fontWeight: 600, padding: "1px 7px", background: dark ? "rgba(255,255,255,0.08)" : "rgba(14,14,12,0.08)", color: sub }}>{colRows.length}</span>
                    </div>
                    <Plus size={14} style={{ color: sub, cursor: "pointer" }} />
                  </div>
                  <div className="flex flex-col gap-2" style={{ padding: 12 }}>
                    {colRows.map(row => (
                      <motion.div key={row.id} whileHover={{ y: -1 }}
                        className="rounded-xl border cursor-pointer"
                        style={{ padding: "14px", background: dark ? "#1A1A18" : "#FAFAF8", borderColor: border }}>
                        <div style={{ fontSize: 13, fontWeight: 500, color: fg, marginBottom: 8, lineHeight: 1.4 }}>{row.title}</div>
                        <div className="flex items-center justify-between">
                          <span style={{ fontSize: 10, fontWeight: 500, padding: "2px 7px", borderRadius: 4, background: row.tagColor + "18", color: row.tagColor }}>{row.tag}</span>
                          <div style={{ width: 20, height: 20, borderRadius: "50%", background: row.assigneeColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "white" }}>
                            {row.assignee[0]}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    <button className="flex items-center gap-1.5 rounded-lg transition-colors w-full"
                      style={{ padding: "8px 10px", background: "none", border: "none", color: sub, fontSize: 12, cursor: "pointer", textAlign: "left" }}
                      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = hoverBg)}
                      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "none")}>
                      <Plus size={12} /> Add item
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeUp>
      )}

      {/* Calendar / List placeholder */}
      {(view === "Calendar" || view === "List") && (
        <FadeUp delay={0.15}>
          <div className="rounded-2xl border flex items-center justify-center" style={{ background: card, borderColor: border, height: 400 }}>
            <div className="text-center">
              <div style={{ fontSize: 40, marginBottom: 12 }}>{view === "Calendar" ? "📅" : "📋"}</div>
              <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, color: fg, marginBottom: 6 }}>{view} view</div>
              <div style={{ fontSize: 14, color: sub }}>Coming soon to NoteFlow</div>
            </div>
          </div>
        </FadeUp>
      )}
    </div>
  );
}
