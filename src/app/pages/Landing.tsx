import { useState, useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Link } from "react-router";
import {
  PenLine, ArrowRight, Check, Menu, X, ChevronRight,
  Sun, Moon, FileText, Database, BookOpen, Globe,
  Layers, Table2, LayoutGrid, Calendar, Link2, Download
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── Animation helpers ────────────────────────────────────────────────────────

function RevealLine({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-6%" });
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div initial={{ y: "105%", skewY: 1.5 }} animate={inView ? { y: 0, skewY: 0 } : {}}
        transition={{ duration: 1.0, delay, ease: EASE }}>
        {children}
      </motion.div>
    </div>
  );
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-4%" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: EASE }} className={className}>
      {children}
    </motion.div>
  );
}

function SlideIn({ children, delay = 0, from = "left", className = "" }: { children: React.ReactNode; delay?: number; from?: "left" | "right"; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-4%" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: from === "left" ? -60 : 60 }} animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 1.0, delay, ease: EASE }} className={className}>
      {children}
    </motion.div>
  );
}

// ─── App Mockup ───────────────────────────────────────────────────────────────

function AppMockup({ dark = false, scale = 1 }: { dark?: boolean; scale?: number }) {
  const bg = dark ? "#1A1A18" : "#FFFFFF";
  const sidebar = dark ? "#141412" : "#F7F6F2";
  const border = dark ? "rgba(255,255,255,0.08)" : "rgba(14,14,12,0.08)";
  const textColor = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = "#8A8A80";
  const notes = [
    { title: "Q4 Strategy", tag: "Work", preview: "Outline key objectives for the upcoming quarter...", active: true },
    { title: "Book Notes — Deep Work", tag: "Reading", preview: "Cal Newport on deliberate practice and focus..." },
    { title: "Travel: Kyoto 2025", tag: "Personal", preview: "Arashiyama bamboo grove, first thing morning..." },
    { title: "Product Roadmap v3", tag: "Work", preview: "Core features for the March release, sorted by..." },
  ];
  const tagColors: Record<string, string> = { Work: "#6357E8", Reading: "#22C27D", Personal: "#F59E0B" };

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ width: 680 * scale, height: 460 * scale, fontFamily: "'DM Sans', sans-serif", fontSize: 13 * scale, background: bg, border: `1px solid ${border}` }}>
      <div className="flex items-center gap-2 border-b" style={{ height: 38 * scale, padding: `0 ${14 * scale}px`, background: sidebar, borderColor: border }}>
        <div className="flex gap-1.5">
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => <div key={i} className="rounded-full" style={{ width: 11 * scale, height: 11 * scale, background: c }} />)}
        </div>
        <div className="flex-1 flex justify-center"><div style={{ fontSize: 11 * scale, color: sub, fontWeight: 500 }}>NoteFlow</div></div>
      </div>
      <div className="flex" style={{ height: `calc(100% - ${38 * scale}px)` }}>
        <div className="flex flex-col border-r" style={{ width: 180 * scale, padding: `${12 * scale}px ${10 * scale}px`, background: sidebar, borderColor: border }}>
          <div style={{ fontWeight: 600, fontSize: 13 * scale, color: textColor, marginBottom: 12 * scale }}>My Notes</div>
          {["All Notes", "Favorites", "Work", "Reading"].map((item, i) => (
            <div key={item} style={{ padding: `${6 * scale}px ${8 * scale}px`, marginBottom: 2 * scale, fontSize: 12 * scale, borderRadius: 8 * scale, background: i === 0 ? "#6357E8" : "transparent", color: i === 0 ? "white" : sub, display: "flex", alignItems: "center", gap: 6 * scale }}>
              <div style={{ width: 5 * scale, height: 5 * scale, borderRadius: "50%", background: i === 0 ? "rgba(255,255,255,0.6)" : sub, opacity: 0.6 }} />{item}
            </div>
          ))}
        </div>
        <div className="border-r overflow-hidden flex flex-col" style={{ width: 200 * scale, borderColor: border }}>
          {notes.map(note => (
            <div key={note.title} className="border-b" style={{ padding: `${10 * scale}px`, borderColor: border, background: note.active ? "rgba(99,87,232,0.07)" : bg }}>
              <div style={{ fontSize: 12 * scale, fontWeight: 600, color: textColor, lineHeight: 1.3, marginBottom: 4 * scale }}>{note.title}</div>
              <div style={{ fontSize: 11 * scale, color: sub, lineHeight: 1.4, marginBottom: 6 * scale }}>{note.preview}</div>
              <span style={{ fontSize: 10 * scale, borderRadius: 4 * scale, padding: `${2 * scale}px ${6 * scale}px`, background: (tagColors[note.tag] || "#8A8A80") + "18", color: tagColors[note.tag] || "#8A8A80", fontWeight: 500 }}>{note.tag}</span>
            </div>
          ))}
        </div>
        <div className="flex-1 overflow-hidden" style={{ padding: `${20 * scale}px ${22 * scale}px`, background: bg }}>
          <div style={{ fontSize: 18 * scale, fontWeight: 700, color: textColor, marginBottom: 6 * scale, fontFamily: "'Bricolage Grotesque', sans-serif" }}>Q4 Strategy</div>
          {["Outline key objectives for the upcoming quarter. Focus on three core pillars.", "Key Initiatives", "• Launch V2 of the mobile app by end of October", "• Reduce churn by 12% through onboarding improvements"].map((line, i) => (
            <div key={i} style={{ fontSize: i === 1 ? 13 * scale : 12 * scale, fontWeight: i === 1 ? 600 : 400, color: i === 1 ? textColor : (dark ? "#A0A098" : "#3A3A38"), lineHeight: 1.7, marginBottom: i === 1 ? 8 * scale : 4 * scale }}>{line}</div>
          ))}
          <motion.div style={{ display: "inline-block", width: 2 * scale, height: 14 * scale, background: "#6357E8", marginTop: 4 * scale }}
            animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.1, repeat: Infinity }} />
        </div>
      </div>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const { dark, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = ["Features", "Pricing", "Changelog", "Download"];
  const bg = dark ? "rgba(10,10,8,0.92)" : "rgba(247,246,242,0.92)";
  const borderColor = dark ? "rgba(255,255,255,0.07)" : "rgba(14,14,12,0.08)";
  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const fg2 = dark ? "#8A8A80" : "#8A8A80";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{ background: scrolled ? bg : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: `1px solid ${scrolled ? borderColor : "transparent"}` }}>
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between" style={{ height: 68 }}>
        <div className="flex items-center gap-2.5">
          <div className="rounded-lg bg-[#6357E8] flex items-center justify-center" style={{ width: 34, height: 34 }}><PenLine size={16} className="text-white" /></div>
          <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, color: fg }}>NoteFlow</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => <a key={l} href="#" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: fg2 }}>{l}</a>)}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <button onClick={toggle} className="rounded-full border flex items-center justify-center transition-all hover:scale-110"
            style={{ width: 38, height: 38, borderColor: dark ? "rgba(255,255,255,0.1)" : "rgba(14,14,12,0.12)", color: fg2, background: "transparent", cursor: "pointer" }}>
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <Link to="/login" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 500, color: fg2, textDecoration: "none" }}>Sign in</Link>
          <Link to="/signup"
            className="rounded-full flex items-center gap-1.5 group transition-all duration-300"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, padding: "10px 22px", background: "#6357E8", color: "white", textDecoration: "none" }}>
            Get started free <ArrowRight size={13} />
          </Link>
        </div>
        <div className="md:hidden flex items-center gap-2">
          <button onClick={toggle} style={{ color: fg2, background: "transparent", border: "none", cursor: "pointer" }}>{dark ? <Sun size={18} /> : <Moon size={18} />}</button>
          <button onClick={() => setOpen(!open)} style={{ color: fg, background: "transparent", border: "none", cursor: "pointer" }}>{open ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </nav>
      {open && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t px-6 py-6 flex flex-col gap-5"
          style={{ background: dark ? "#0A0A08" : "#F7F6F2", borderColor }}>
          {links.map(l => <a key={l} href="#" style={{ fontSize: 16, fontWeight: 500, color: fg, textDecoration: "none" }}>{l}</a>)}
          <Link to="/signup" style={{ borderRadius: 99, background: "#6357E8", color: "white", textAlign: "center", padding: "12px", fontWeight: 500, textDecoration: "none" }}>Get started free</Link>
        </motion.div>
      )}
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const { dark } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const mockupY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const mockupScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#8A8A80" : "#6E6E68";

  return (
    <section ref={containerRef} className="overflow-hidden" style={{ position: "relative", minHeight: "100vh", paddingTop: 140, paddingBottom: 80 }}>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(${dark ? "rgba(255,255,255,0.03)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px), linear-gradient(90deg, ${dark ? "rgba(255,255,255,0.03)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px)`, backgroundSize: "72px 72px" }} />
      <div className="absolute pointer-events-none" style={{ top: -80, right: -80, width: 700, height: 700, background: "radial-gradient(circle, rgba(99,87,232,0.14) 0%, transparent 65%)", borderRadius: "50%" }} />
      <div className="absolute pointer-events-none" style={{ bottom: 0, left: -100, width: 500, height: 500, background: "radial-gradient(circle, rgba(99,87,232,0.08) 0%, transparent 65%)", borderRadius: "50%" }} />

      <motion.div style={{ opacity }} className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeUp delay={0.05} className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border" style={{ padding: "7px 18px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: "#6357E8", background: "rgba(99,87,232,0.08)", borderColor: "rgba(99,87,232,0.22)" }}>
            <div className="w-1.5 h-1.5 rounded-full bg-[#6357E8]" /> Free forever — no credit card needed <ChevronRight size={13} />
          </div>
        </FadeUp>

        <div className="text-center mb-8" style={{ lineHeight: 0.92 }}>
          <RevealLine delay={0.1}>
            <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 800, letterSpacing: "-0.04em", color: fg, lineHeight: 0.95 }}>Think clearly.</h1>
          </RevealLine>
          <RevealLine delay={0.18}>
            <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#6357E8", lineHeight: 0.95, marginTop: "0.06em" }}>Note freely.</h1>
          </RevealLine>
        </div>

        <FadeUp delay={0.42} className="text-center mb-12">
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(1rem, 2vw, 1.25rem)", color: sub, maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
            A distraction-free workspace for docs, notes, databases, and wikis. One tool. Everything you need. Forever free.
          </p>
        </FadeUp>

        <FadeUp delay={0.54} className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-20">
          <Link to="/signup" className="rounded-full flex items-center gap-2 group transition-all duration-300 hover:gap-3"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "15px 30px", background: "#6357E8", color: "white", textDecoration: "none" }}>
            Get NoteFlow free <ArrowRight size={16} />
          </Link>
          <a href="#" className="rounded-full flex items-center gap-2 transition-all duration-300"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "15px 30px", border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(14,14,12,0.14)"}`, color: fg, textDecoration: "none" }}>
            <Download size={15} /> Download for Mac
          </a>
        </FadeUp>

        <div className="flex justify-center">
          <motion.div style={{ y: mockupY, scale: mockupScale, perspective: 1400 }}>
            <motion.div initial={{ rotateX: 22, rotateY: -10, opacity: 0, scale: 0.93 }} animate={{ rotateX: 7, rotateY: -6, opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, delay: 0.65, ease: EASE }} style={{ transformStyle: "preserve-3d" }}
              whileHover={{ rotateX: 3, rotateY: -3, transition: { duration: 0.5 } }}>
              <div className="relative">
                <div className="absolute pointer-events-none" style={{ bottom: -30, left: "10%", right: "10%", height: 60, background: "radial-gradient(ellipse, rgba(99,87,232,0.3) 0%, transparent 70%)", filter: "blur(16px)" }} />
                <AppMockup dark={dark} scale={0.9} />
              </div>
            </motion.div>
          </motion.div>
        </div>

        <FadeUp delay={0.9} className="flex justify-center mt-12">
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub }}>
            Trusted by teams at{" "}
            {["Figma", "Linear", "Vercel", "Stripe"].map((co, i) => (
              <span key={co}><strong style={{ color: dark ? "#5A5A52" : "#A8A8A0" }}>{co}</strong>{i < 3 ? ", " : ""}</span>
            ))}
          </p>
        </FadeUp>
      </motion.div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────

const notionFeatures = [
  { icon: FileText, label: "Docs", color: "#6357E8", title: "Write anything, beautifully", desc: "Rich text with Markdown shortcuts, code blocks, callouts, and toggles. The most powerful editor that stays out of your way." },
  { icon: Database, label: "Databases", color: "#22C27D", title: "Databases with a soul", desc: "Every database is also a page. Add properties, filters, sorts, and formulas. Link between databases. Build the exact system you need." },
  { icon: LayoutGrid, label: "Board view", color: "#F59E0B", title: "Kanban without the chaos", desc: "Drag and drop tasks across columns. Group by any property. Every card is a full page with notes, checklists, and attachments." },
  { icon: Table2, label: "Table view", color: "#EC4899", title: "Spreadsheet meets document", desc: "Inline editing, multi-select, relation fields, rollup calculations. All the power of a spreadsheet without leaving your notes." },
  { icon: Calendar, label: "Calendar", color: "#6357E8", title: "Plan your time visually", desc: "Switch any database to calendar view. Drag events to reschedule. Filter by assignee, tag, or status." },
  { icon: BookOpen, label: "Wiki", color: "#22C27D", title: "One home for team knowledge", desc: "Nested pages with infinite depth. Verification badges so you always know what's current." },
  { icon: Layers, label: "Templates", color: "#F59E0B", title: "Start from a proven structure", desc: "Thousands of community templates — from meeting notes to project trackers. One click, ready to go." },
  { icon: Globe, label: "Publish to web", color: "#EC4899", title: "Share a link, share the world", desc: "Every note and database can become a public webpage in one toggle." },
  { icon: Link2, label: "Relations", color: "#6357E8", title: "Connect everything", desc: "Link any two databases with a relation field. Pull data across with rollups. Build relational systems, no code needed." },
];

function FeatureGrid() {
  const { dark } = useTheme();
  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#8A8A80" : "#6E6E68";
  const cardBg = dark ? "#141412" : "#FFFFFF";
  const borderColor = dark ? "rgba(255,255,255,0.07)" : "rgba(14,14,12,0.08)";

  return (
    <section style={{ padding: "140px 0", background: dark ? "#0A0A08" : "#F7F6F2" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeUp className="flex items-center gap-3 mb-6"><div className="h-px bg-[#6357E8]" style={{ width: 28 }} /><span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6357E8", letterSpacing: "0.1em", textTransform: "uppercase" }}>Features</span></FadeUp>
        <div className="mb-20">
          <RevealLine><h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3rem, 7vw, 6.5rem)", fontWeight: 800, letterSpacing: "-0.04em", color: fg, lineHeight: 0.95 }}>Every tool</h2></RevealLine>
          <RevealLine delay={0.1}><h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3rem, 7vw, 6.5rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#6357E8", lineHeight: 0.95 }}>you actually use.</h2></RevealLine>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden" style={{ border: `1px solid ${borderColor}`, background: borderColor }}>
          {notionFeatures.map((f, i) => (
            <FadeUp key={f.label} delay={i * 0.06}>
              <motion.div whileHover={{ scale: 1.015 }} transition={{ duration: 0.25 }} className="h-full flex flex-col" style={{ padding: 32, background: cardBg, cursor: "default" }}>
                <div className="rounded-xl flex items-center justify-center mb-6" style={{ width: 46, height: 46, background: f.color + "16" }}>
                  <f.icon size={21} style={{ color: f.color }} />
                </div>
                <div className="flex items-center gap-2 mb-2"><span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, color: f.color, letterSpacing: "0.06em", textTransform: "uppercase" }}>{f.label}</span></div>
                <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, color: fg, marginBottom: 8, letterSpacing: "-0.01em" }}>{f.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: sub, lineHeight: 1.7 }}>{f.desc}</p>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Showcase row ─────────────────────────────────────────────────────────────

function ShowcaseRow({ reverse = false, icon: Icon, tag, tagColor, headline, subText, bullets }: {
  reverse?: boolean; icon: React.ElementType; tag: string; tagColor: string; headline: string[]; subText: string; bullets: string[];
}) {
  const { dark } = useTheme();
  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#8A8A80" : "#6E6E68";
  const card = dark ? "#141412" : "#FFFFFF";
  const border = dark ? "rgba(255,255,255,0.07)" : "rgba(14,14,12,0.09)";

  return (
    <div className={`flex flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-16`} style={{ marginBottom: 140 }}>
      <div className="flex-1">
        <FadeUp className="flex items-center gap-2 mb-6">
          <div style={{ width: 36, height: 36, borderRadius: 10, background: tagColor + "18", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon size={17} style={{ color: tagColor }} /></div>
          <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: tagColor, letterSpacing: "0.09em", textTransform: "uppercase" }}>{tag}</span>
        </FadeUp>
        {headline.map((line, i) => (
          <RevealLine key={i} delay={0.08 + i * 0.1}>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(2.2rem, 4.5vw, 4rem)", fontWeight: 800, letterSpacing: "-0.035em", color: i % 2 === 0 ? fg : tagColor, lineHeight: 0.95, marginBottom: "0.05em" }}>{line}</h2>
          </RevealLine>
        ))}
        <FadeUp delay={0.25}><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: sub, lineHeight: 1.75, maxWidth: 440, margin: "20px 0 24px" }}>{subText}</p></FadeUp>
        <FadeUp delay={0.32}>
          <div className="flex flex-col gap-3">
            {bullets.map(b => (
              <div key={b} className="flex items-start gap-3">
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: tagColor + "18", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}><Check size={10} style={{ color: tagColor }} /></div>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: sub, lineHeight: 1.6 }}>{b}</span>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
      <SlideIn from={reverse ? "left" : "right"} delay={0.15} className="flex-1 flex justify-center">
        <div className="relative w-full max-w-lg">
          <div className="rounded-2xl overflow-hidden shadow-xl border" style={{ border: `1px solid ${border}`, background: card, padding: 24, minHeight: 260 }}>
            <div className="flex items-center gap-2 mb-4">
              <Icon size={16} style={{ color: tagColor }} />
              <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 15, fontWeight: 700, color: fg }}>{tag}</span>
              <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
                {["Filter", "Sort"].map(a => <div key={a} className="rounded-md" style={{ padding: "4px 10px", background: dark ? "rgba(255,255,255,0.06)" : "rgba(14,14,12,0.06)", fontSize: 11, color: sub, fontFamily: "'DM Sans', sans-serif" }}>{a}</div>)}
              </div>
            </div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg" style={{ padding: "10px 8px", background: i === 1 ? (dark ? "rgba(99,87,232,0.1)" : "rgba(99,87,232,0.06)") : "transparent", marginBottom: 4 }}>
                <div style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${i < 2 ? tagColor : (dark ? "rgba(255,255,255,0.12)" : "rgba(14,14,12,0.15)")}`, background: i < 2 ? tagColor : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {i < 2 && <Check size={9} style={{ color: "white" }} />}
                </div>
                <div style={{ flex: 1, height: 10, borderRadius: 99, background: dark ? "rgba(255,255,255,0.06)" : "rgba(14,14,12,0.07)", maxWidth: `${60 + i * 8}%` }} />
                <div style={{ width: 48, height: 10, borderRadius: 99, background: tagColor + "30" }} />
              </div>
            ))}
          </div>
        </div>
      </SlideIn>
    </div>
  );
}

function Showcases() {
  const { dark } = useTheme();
  return (
    <section style={{ padding: "140px 0 0", background: dark ? "#0E0E0C" : "#FFFFFF" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <ShowcaseRow icon={Database} tag="Databases" tagColor="#22C27D" headline={["Build any system.", "No code needed."]} subText="Tables, boards, calendars, timelines, galleries — every view is powered by the same database. Switch instantly, keep all your data." bullets={["Relation and rollup fields for cross-database linking", "Formulas for calculated properties", "Filter and sort rules that save and share"]} />
        <ShowcaseRow reverse icon={BookOpen} tag="Wiki" tagColor="#F59E0B" headline={["Team knowledge,", "finally findable."]} subText="Nested pages with a sidebar that mirrors your hierarchy. Verification badges. Breadcrumbs. Full-text search across every page." bullets={["Mark pages as verified — or out of date", "Nested up to any depth, with backlinks", "Import from Confluence, Notion, or Markdown"]} />
        <ShowcaseRow icon={LayoutGrid} tag="Boards" tagColor="#EC4899" headline={["Kanban that feels", "native, not bolted on."]} subText="Every card is a full page. Drag across columns. Group by any property. The board updates in real time across your whole team." bullets={["Subtasks with their own boards", "Custom column colors and limits", "Archive and reopen cards without losing history"]} />
      </div>
    </section>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────

function Stats() {
  const { dark } = useTheme();
  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#8A8A80" : "#6E6E68";
  const borderColor = dark ? "rgba(255,255,255,0.07)" : "rgba(14,14,12,0.08)";
  const stats = [
    { value: "40ms", label: "Median search latency" }, { value: "99.97%", label: "Uptime last 12 months" },
    { value: "2.4M", label: "Notes captured daily" }, { value: "184+", label: "Countries with users" },
  ];
  return (
    <section style={{ borderTop: `1px solid ${borderColor}`, borderBottom: `1px solid ${borderColor}`, padding: "80px 0", background: dark ? "#0E0E0C" : "#F7F6F2" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <FadeUp key={s.label} delay={i * 0.07} className="text-center">
            <RevealLine delay={i * 0.06}>
              <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 800, letterSpacing: "-0.04em", color: fg, lineHeight: 1, marginBottom: 8 }}>{s.value}</div>
            </RevealLine>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub }}>{s.label}</div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

// ─── Pricing ─────────────────────────────────────────────────────────────────

function Pricing() {
  const { dark } = useTheme();
  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#8A8A80" : "#6E6E68";
  const card = dark ? "#141412" : "#FFFFFF";
  const borderColor = dark ? "rgba(255,255,255,0.08)" : "rgba(14,14,12,0.09)";
  const included = ["Unlimited notes and pages", "Unlimited databases", "All views — table, board, calendar, gallery", "Web publishing", "Nested pages (infinite depth)", "Real-time collaboration (up to 10 guests)", "Templates library", "File uploads (up to 5 MB each)", "Desktop and mobile apps", "Markdown import and export", "API access", "Community support"];

  return (
    <section style={{ padding: "140px 0", background: dark ? "#0A0A08" : "#F7F6F2" }}>
      <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
        <FadeUp className="flex items-center justify-center gap-3 mb-6"><div className="h-px bg-[#6357E8]" style={{ width: 28 }} /><span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6357E8", letterSpacing: "0.1em", textTransform: "uppercase" }}>Pricing</span><div className="h-px bg-[#6357E8]" style={{ width: 28 }} /></FadeUp>
        <RevealLine><h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3rem, 8vw, 7rem)", fontWeight: 800, letterSpacing: "-0.045em", color: fg, lineHeight: 0.92, marginBottom: "0.12em" }}>Free.</h2></RevealLine>
        <RevealLine delay={0.1}><h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3rem, 8vw, 7rem)", fontWeight: 800, letterSpacing: "-0.045em", color: "#6357E8", lineHeight: 0.92 }}>Forever.</h2></RevealLine>
        <FadeUp delay={0.25}><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: sub, maxWidth: 480, margin: "24px auto 48px", lineHeight: 1.65 }}>No trials. No paywalls. No credit card. NoteFlow is completely free — now and always.</p></FadeUp>
        <FadeUp delay={0.3}>
          <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3 }} className="rounded-2xl border text-left" style={{ padding: 40, background: card, borderColor, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #6357E8, #22C27D)" }} />
            <div className="flex items-end gap-3 mb-2">
              <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3rem, 6vw, 5rem)", fontWeight: 800, letterSpacing: "-0.04em", color: fg, lineHeight: 1 }}>$0</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: sub, marginBottom: 12 }}>/month, forever</span>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: sub, marginBottom: 32 }}>Everything included. No hidden upgrades.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
              {included.map(item => (
                <div key={item} className="flex items-center gap-2.5">
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(99,87,232,0.14)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}><Check size={10} style={{ color: "#6357E8" }} /></div>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub }}>{item}</span>
                </div>
              ))}
            </div>
            <Link to="/signup" className="inline-flex items-center gap-2 rounded-full group transition-all duration-300"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, padding: "14px 32px", background: "#6357E8", color: "white", textDecoration: "none" }}>
              Create your free account <ArrowRight size={15} />
            </Link>
          </motion.div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── CTA ─────────────────────────────────────────────────────────────────────

function CTABanner() {
  const { dark } = useTheme();
  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#6E6E68" : "#8A8A80";
  const bg = dark ? "#0E0E0C" : "#F7F6F2";
  return (
    <section style={{ padding: "140px 0", background: bg, overflow: "hidden", position: "relative" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(${dark ? "rgba(255,255,255,0.025)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px), linear-gradient(90deg, ${dark ? "rgba(255,255,255,0.025)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px)`, backgroundSize: "64px 64px" }} />
      <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center relative">
        <RevealLine><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3.5rem, 10vw, 9rem)", fontWeight: 800, letterSpacing: "-0.045em", color: fg, lineHeight: 0.92 }}>Start today.</div></RevealLine>
        <RevealLine delay={0.1}><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3.5rem, 10vw, 9rem)", fontWeight: 800, letterSpacing: "-0.045em", color: "#6357E8", lineHeight: 0.92 }}>It&apos;s free.</div></RevealLine>
        <FadeUp delay={0.25}><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: sub, maxWidth: 440, margin: "28px auto 40px", lineHeight: 1.65 }}>No credit card. No trial. Just a better place to think and work.</p></FadeUp>
        <FadeUp delay={0.35} className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/signup" className="rounded-full flex items-center gap-2 group transition-all duration-300"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "16px 34px", background: "#6357E8", color: "white", textDecoration: "none" }}>
            Get NoteFlow free <ArrowRight size={15} />
          </Link>
          <a href="#" className="rounded-full transition-all duration-300"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "16px 34px", border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(14,14,12,0.14)"}`, color: fg, textDecoration: "none" }}>
            Read the docs
          </a>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

const footerLinks = {
  Product: ["Features", "Changelog", "Roadmap", "Download", "Status"],
  Resources: ["Documentation", "API Reference", "Templates", "Community"],
  Company: ["About", "Blog", "Careers", "Press kit"],
  Legal: ["Privacy", "Terms", "Cookie policy", "Security"],
};

function Footer() {
  const { dark } = useTheme();
  const sub = "#8A8A80";
  const borderColor = "rgba(255,255,255,0.07)";

  return (
    <footer style={{ background: "#0A0A08", padding: "80px 0 40px" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="rounded-lg bg-[#6357E8] flex items-center justify-center" style={{ width: 34, height: 34 }}><PenLine size={16} className="text-white" /></div>
              <span className="font-bold tracking-tight text-white" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18 }}>NoteFlow</span>
            </div>
            <FadeUp><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: sub, lineHeight: 1.75, maxWidth: 240 }}>A free workspace for docs, databases, and wikis. Think clearly. Note freely.</p></FadeUp>
          </div>
          {Object.entries(footerLinks).map(([group, links], gi) => (
            <div key={group}>
              <FadeUp delay={gi * 0.05}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "white", marginBottom: 16 }}>{group}</div>
                <div className="flex flex-col gap-2.5">
                  {links.map((link, li) => (
                    <RevealLine key={link} delay={gi * 0.03 + li * 0.025}>
                      <a href="#" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub, display: "block", textDecoration: "none" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "white")}
                        onMouseLeave={e => (e.currentTarget.style.color = sub)}>
                        {link}
                      </a>
                    </RevealLine>
                  ))}
                </div>
              </FadeUp>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: `1px solid ${borderColor}` }}>
          <RevealLine><span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub }}>© 2025 NoteFlow, Inc. · Free forever · Made with care</span></RevealLine>
          <FadeUp><div className="flex items-center gap-2" style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: sub }}><div className="w-1.5 h-1.5 rounded-full bg-[#22C27D]" />All systems operational</div></FadeUp>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Landing() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />
      <Hero />
      <FeatureGrid />
      <Showcases />
      <Stats />
      <Pricing />
      <CTABanner />
      <Footer />
    </div>
  );
}
