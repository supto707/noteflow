import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Search, Tag, Clock, Star, MoreHorizontal, Bold, Italic, Code, List, Hash, Link2, Image, ChevronDown } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const allNotes = [
  { id: 1, title: "Q4 Strategy", tag: "Work", tagColor: "#6357E8", updated: "2 min ago", pinned: true, content: `Outline key objectives for the upcoming quarter. Focus on three core pillars: growth, retention, and infrastructure.\n\n## Key Initiatives\n\n- Launch V2 of the mobile app by end of October\n- Reduce churn rate by 12% through onboarding improvements\n- Complete data pipeline migration to new infrastructure\n\n## Success Metrics\n\nTrack weekly via the shared dashboard. All leads aligned on reporting cadence.\n\n## Timeline\n\nWeek 1-2: Planning and alignment\nWeek 3-6: Execution sprint\nWeek 7-8: Review and retrospective` },
  { id: 2, title: "Deep Work — Book Notes", tag: "Reading", tagColor: "#22C27D", updated: "1 hr ago", pinned: false, content: `Cal Newport argues that the ability to focus without distraction is becoming increasingly rare and valuable.\n\n## Core Thesis\n\nDeep work is the ability to focus without distraction on cognitively demanding tasks. This skill allows you to quickly master hard things and produce at an elite level.\n\n## Key Concepts\n\n- Shallow work: Non-cognitively demanding tasks that are often performed while distracted\n- Deep work sessions: 90-minute uninterrupted focus blocks\n- The 4DX framework for execution\n\n## My Takeaways\n\nSchedule every minute of the workday. Embrace boredom. Quit social media.` },
  { id: 3, title: "Kyoto Travel Plan", tag: "Personal", tagColor: "#F59E0B", updated: "Yesterday", pinned: false, content: `Planning a 10-day trip to Kyoto in spring 2025.\n\n## Must-visit\n\n- Arashiyama bamboo grove — arrive before 8am\n- Fushimi Inari — sunset hike\n- Gion district — evening stroll\n- Nishiki Market — morning food tour\n\n## Accommodation\n\nLooking at traditional ryokan stays in Higashiyama district.\n\n## Budget\n\nFlights: ~$800 return\nAccommodation: ~$150/night\nFood + transport: ~$80/day` },
  { id: 4, title: "Product Roadmap v3", tag: "Work", tagColor: "#6357E8", updated: "2 days ago", pinned: false, content: `Core features for the March release. Sorted by user impact and development effort.\n\n## P0 — Ship in March\n\n- Mobile app v2.0\n- Bulk import from Notion\n- New editor toolbar\n\n## P1 — Q2 Target\n\n- AI-assisted templates\n- Calendar integration\n- Custom domains for published pages\n\n## Engineering Notes\n\nAll P0 items have been scoped and assigned. Daily standups at 10am.` },
  { id: 5, title: "Team OKRs — Q4", tag: "Work", tagColor: "#6357E8", updated: "3 days ago", pinned: false, content: `Objective 1: Grow monthly active users by 40%\n\n- KR1: Launch referral programme by Oct 15\n- KR2: Hit 50,000 MAU by Dec 31\n- KR3: Reduce time-to-first-note under 60 seconds\n\nObjective 2: Improve product quality\n\n- KR1: NPS score above 60\n- KR2: Reduce P1 bugs to zero at release\n- KR3: 99.9% uptime` },
  { id: 6, title: "Reading List 2025", tag: "Reading", tagColor: "#22C27D", updated: "1 week ago", pinned: false, content: `Books to read this year, sorted by priority.\n\n## Currently Reading\n\n- Deep Work — Cal Newport ✓\n- Thinking in Systems — Donella Meadows\n\n## Queue\n\n- The Pragmatic Programmer\n- A Philosophy of Software Design\n- Staff Engineer — Will Larson\n- An Elegant Puzzle — Will Larson\n\n## Completed\n\n- The Design of Everyday Things ✓\n- Atomic Habits ✓` },
];

const tags = ["All", "Work", "Reading", "Personal"];

export default function Notes() {
  const { dark } = useTheme();
  const [activeTag, setActiveTag] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(allNotes[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(allNotes[0].content);

  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#8A8A80" : "#6E6E68";
  const card = dark ? "#141412" : "#FFFFFF";
  const panelBg = dark ? "#111110" : "#FAFAF8";
  const border = dark ? "rgba(255,255,255,0.07)" : "rgba(14,14,12,0.08)";
  const hoverBg = dark ? "rgba(255,255,255,0.04)" : "rgba(14,14,12,0.03)";
  const activeBg = dark ? "rgba(99,87,232,0.12)" : "rgba(99,87,232,0.07)";

  const filtered = allNotes.filter(n =>
    (activeTag === "All" || n.tag === activeTag) &&
    (n.title.toLowerCase().includes(search.toLowerCase()) || n.content.toLowerCase().includes(search.toLowerCase()))
  );

  function renderContent(text: string) {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("## ")) return <h2 key={i} style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 17, fontWeight: 700, color: fg, letterSpacing: "-0.01em", margin: "20px 0 8px" }}>{line.slice(3)}</h2>;
      if (line.startsWith("- ")) return <div key={i} className="flex items-start gap-2" style={{ marginBottom: 4 }}><span style={{ color: "#6357E8", marginTop: 1, flexShrink: 0 }}>•</span><span style={{ fontSize: 14, color: dark ? "#C0C0B8" : "#3A3A38", lineHeight: 1.7 }}>{line.slice(2)}</span></div>;
      if (line === "") return <div key={i} style={{ height: 8 }} />;
      return <p key={i} style={{ fontSize: 14, color: dark ? "#C0C0B8" : "#3A3A38", lineHeight: 1.8, marginBottom: 2 }}>{line}</p>;
    });
  }

  return (
    <div className="flex h-screen" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Note list panel */}
      <div className="flex flex-col flex-shrink-0 border-r" style={{ width: 280, background: panelBg, borderColor: border }}>
        {/* Header */}
        <div style={{ padding: "20px 16px 12px" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 16, fontWeight: 700, color: fg }}>Notes</h2>
            <button className="rounded-lg flex items-center justify-center transition-colors"
              style={{ width: 28, height: 28, background: "#6357E8", border: "none", cursor: "pointer" }}
              onClick={() => setSelected({ ...allNotes[0], id: 99, title: "Untitled", content: "", updated: "Just now" })}>
              <Plus size={14} className="text-white" />
            </button>
          </div>
          <div className="flex items-center gap-2 rounded-lg" style={{ padding: "8px 12px", background: dark ? "rgba(255,255,255,0.05)" : "rgba(14,14,12,0.06)", border: `1px solid ${border}` }}>
            <Search size={12} style={{ color: sub, flexShrink: 0 }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search notes…"
              style={{ flex: 1, background: "none", border: "none", outline: "none", fontSize: 13, color: fg, fontFamily: "'DM Sans', sans-serif" }} />
          </div>
        </div>

        {/* Tags */}
        <div className="flex gap-1.5 overflow-x-auto px-4 pb-3" style={{ scrollbarWidth: "none" }}>
          {tags.map(t => (
            <button key={t} onClick={() => setActiveTag(t)}
              className="rounded-full flex-shrink-0 transition-all duration-150"
              style={{ padding: "4px 12px", fontSize: 12, fontWeight: 500, border: "none", cursor: "pointer", background: activeTag === t ? "#6357E8" : (dark ? "rgba(255,255,255,0.07)" : "rgba(14,14,12,0.07)"), color: activeTag === t ? "white" : sub }}>
              {t}
            </button>
          ))}
        </div>

        {/* Notes list */}
        <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
          {filtered.map(note => (
            <motion.div key={note.id} whileHover={{ x: 2 }}
              onClick={() => { setSelected(note); setEditContent(note.content); setIsEditing(false); }}
              className="cursor-pointer border-b"
              style={{ padding: "14px 16px", borderColor: border, background: selected.id === note.id ? activeBg : "transparent" }}>
              <div className="flex items-start justify-between gap-1 mb-2">
                <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 14, fontWeight: 600, color: fg, lineHeight: 1.3, flex: 1 }}>
                  {note.title}
                </span>
                {note.pinned && <Star size={10} style={{ color: "#F59E0B", fill: "#F59E0B", flexShrink: 0, marginTop: 3 }} />}
              </div>
              <div className="flex items-center gap-2 mb-1.5">
                <span style={{ fontSize: 10, fontWeight: 500, borderRadius: 4, padding: "1px 6px", background: note.tagColor + "18", color: note.tagColor }}>{note.tag}</span>
                <span style={{ fontSize: 10, color: sub }}>{note.updated}</span>
              </div>
              <p style={{ fontSize: 12, color: sub, lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {note.content.split("\n")[0]}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Editor panel */}
      <div className="flex-1 flex flex-col min-w-0" style={{ background: card }}>
        {/* Toolbar */}
        <div className="flex items-center gap-2 border-b flex-shrink-0" style={{ padding: "12px 28px", borderColor: border }}>
          <div className="flex items-center gap-1 mr-2">
            {[Bold, Italic, Code].map((Icon, i) => (
              <button key={i} className="rounded-md flex items-center justify-center transition-colors"
                style={{ width: 28, height: 28, background: "none", border: "none", color: sub, cursor: "pointer" }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = hoverBg)}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "none")}>
                <Icon size={13} />
              </button>
            ))}
          </div>
          <div style={{ width: 1, height: 18, background: border }} />
          <div className="flex items-center gap-1">
            {[List, Hash, Link2, Image].map((Icon, i) => (
              <button key={i} className="rounded-md flex items-center justify-center transition-colors"
                style={{ width: 28, height: 28, background: "none", border: "none", color: sub, cursor: "pointer" }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = hoverBg)}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "none")}>
                <Icon size={13} />
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span style={{ fontSize: 11, color: sub, fontFamily: "'Geist Mono', monospace" }}>Saved · {selected.updated}</span>
            <button className="rounded-lg flex items-center gap-1.5 transition-colors"
              style={{ padding: "5px 12px", background: "#6357E8", border: "none", color: "white", fontSize: 12, fontWeight: 500, cursor: "pointer" }}>
              Share
            </button>
            <button style={{ background: "none", border: "none", color: sub, cursor: "pointer" }}>
              <MoreHorizontal size={15} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto" style={{ padding: "40px 64px 80px", scrollbarWidth: "none" }}>
          <div className="flex items-center gap-3 mb-4">
            <span style={{ fontSize: 12, fontWeight: 500, borderRadius: 6, padding: "3px 10px", background: selected.tagColor + "18", color: selected.tagColor }}>
              {selected.tag}
            </span>
            <div className="flex items-center gap-1.5" style={{ fontSize: 12, color: sub }}>
              <Clock size={11} /> {selected.updated}
            </div>
          </div>

          {isEditing ? (
            <textarea value={editContent} onChange={e => setEditContent(e.target.value)}
              autoFocus onBlur={() => setIsEditing(false)}
              style={{ width: "100%", minHeight: 500, background: "none", border: "none", outline: "none", fontSize: 14, color: fg, lineHeight: 1.8, fontFamily: "'DM Sans', sans-serif", resize: "none" }} />
          ) : (
            <>
              <h1 onClick={() => setIsEditing(true)}
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800, color: fg, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 24, cursor: "text" }}>
                {selected.title}
              </h1>
              <div onClick={() => setIsEditing(true)} style={{ cursor: "text" }}>
                {renderContent(selected.content)}
              </div>
              {selected.content === "" && (
                <p onClick={() => setIsEditing(true)}
                  style={{ fontSize: 15, color: dark ? "rgba(255,255,255,0.2)" : "rgba(14,14,12,0.25)", cursor: "text", fontStyle: "italic" }}>
                  Start writing…
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
