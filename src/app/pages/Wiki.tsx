import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronRight, ChevronDown, Plus, FileText, Search, Check, Clock, Users, Star } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { getUserWorkspace, getWikiPages, createPage, getPageById } from "../../lib/api";
import type { WikiPage as WikiPageType } from "../../lib/api";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function renderContent(text: string = "", fg: string, dark: boolean) {
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

export default function Wiki() {
  const { dark } = useTheme();
  const { user } = useAuth();
  const [pages, setPages] = useState<WikiPageType[]>([]);
  const [selected, setSelected] = useState<WikiPageType | null>(null);
  const [selectedContent, setSelectedContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    getUserWorkspace(user.id).then(wsId => {
      if (wsId) getWikiPages(wsId).then(data => {
        setPages(data);
        if (data.length > 0) {
          setSelected(data[0]);
          getPageById(data[0].id).then(p => {
            const content = p?.blocks?.map(b => b.content).join("\n") || "";
            setSelectedContent(content);
          });
        }
        setLoading(false);
      });
    });
  }, [user]);

  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#8A8A80" : "#6E6E68";
  const card = dark ? "#141412" : "#FFFFFF";
  const panelBg = dark ? "#111110" : "#FAFAF8";
  const border = dark ? "rgba(255,255,255,0.07)" : "rgba(14,14,12,0.08)";
  const activeBg = dark ? "rgba(99,87,232,0.14)" : "rgba(99,87,232,0.08)";
  const hoverBg = dark ? "rgba(255,255,255,0.04)" : "rgba(14,14,12,0.04)";

  async function handleSelect(page: WikiPageType) {
    setSelected(page);
    const p = await getPageById(page.id);
    setSelectedContent(p?.blocks?.map(b => b.content).join("\n") || "");
  }

  async function handleNewWiki() {
    if (!user) return;
    const wsId = await getUserWorkspace(user.id);
    if (wsId) {
      const id = await createPage(wsId, user.id, "New Wiki Page");
      if (id) {
        const newPage: WikiPageType = { id, workspace_id: wsId, parent_page_id: null, title: "New Wiki Page", icon: null, created_by: user.id, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        setPages(prev => [...prev, newPage]);
        setSelected(newPage);
        setSelectedContent("");
      }
    }
  }

  return (
    <div className="flex h-screen" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="flex flex-col flex-shrink-0 border-r" style={{ width: 240, background: panelBg, borderColor: border, overflow: "hidden" }}>
        <div style={{ padding: "18px 14px 10px" }}>
          <div className="flex items-center justify-between mb-3">
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 15, fontWeight: 700, color: fg }}>Wiki</h2>
            <button onClick={handleNewWiki} style={{ background: "rgba(99,87,232,0.14)", border: "none", borderRadius: 6, color: "#6357E8", cursor: "pointer", padding: "4px 8px", fontSize: 12, fontWeight: 500 }}>
              <Plus size={13} />
            </button>
          </div>
          <div className="flex items-center gap-2 rounded-lg" style={{ padding: "7px 10px", background: dark ? "rgba(255,255,255,0.05)" : "rgba(14,14,12,0.06)", border: `1px solid ${border}` }}>
            <Search size={12} style={{ color: sub }} />
            <span style={{ fontSize: 12, color: sub }}>Search wiki…</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-2" style={{ scrollbarWidth: "none" }}>
          {pages.map(page => (
            <div key={page.id}
              className="flex items-center gap-2 rounded-lg cursor-pointer"
              style={{ padding: "6px 8px", background: selected?.id === page.id ? activeBg : "transparent", marginBottom: 1 }}
              onMouseEnter={e => { if (selected?.id !== page.id) (e.currentTarget as HTMLElement).style.background = hoverBg; }}
              onMouseLeave={e => { if (selected?.id !== page.id) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              onClick={() => handleSelect(page)}>
              <FileText size={11} style={{ color: sub, flexShrink: 0 }} />
              <span style={{ fontSize: 13, fontWeight: 400, color: selected?.id === page.id ? "#6357E8" : sub, flex: 1, lineHeight: 1.3 }}>
                {page.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0 overflow-auto" style={{ background: card, scrollbarWidth: "none" }}>
        {selected ? (
          <motion.div key={selected.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            style={{ padding: "48px 72px 80px", maxWidth: 760, margin: "0 auto", width: "100%" }}>
            <div className="flex items-center gap-1.5 mb-6" style={{ fontSize: 12, color: sub }}>
              <span>Wiki</span>
              <ChevronRight size={12} />
              <span style={{ color: fg, fontWeight: 500 }}>{selected.title}</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-8 pb-6" style={{ borderBottom: `1px solid ${border}` }}>
              <div className="flex items-center gap-2" style={{ fontSize: 12, color: sub }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#6357E8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "white" }}>
                  {selected.created_by[0]}
                </div>
                Created · {new Date(selected.created_at).toLocaleDateString()}
              </div>
              <button className="ml-auto flex items-center gap-1.5"
                style={{ background: "none", border: "none", color: "#6357E8", fontSize: 12, fontWeight: 500, cursor: "pointer" }}>
                <Users size={12} /> Share
              </button>
            </div>

            <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 800, color: fg, letterSpacing: "-0.035em", lineHeight: 1.1, marginBottom: 28 }}>
              {selected.title}
            </h1>

            {renderContent(selectedContent, fg, dark)}
          </motion.div>
        ) : (
          <div className="flex-1 flex items-center justify-center" style={{ color: sub, fontSize: 15 }}>
            No wiki pages yet.
          </div>
        )}
      </div>
    </div>
  );
}
