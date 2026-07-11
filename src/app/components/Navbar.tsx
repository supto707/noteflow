import { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { PenLine, Sun, Moon, Menu, X, ArrowRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { dark, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const navLinks = [
    { label: "Features", to: "/features" },
    { label: "Pricing", to: "/pricing" },
    { label: "Docs", to: "/docs" },
    { label: "Roadmap", to: "/roadmap" },
    { label: "Blog", to: "/blog" },
    { label: "Community", to: "/community" },
    { label: "About", to: "/about" },
  ];
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
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map(l => <Link key={l.to} to={l.to} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: fg2, textDecoration: "none" }}>{l.label}</Link>)}
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
          {navLinks.map(l => <Link key={l.to} to={l.to} style={{ fontSize: 16, fontWeight: 500, color: fg, textDecoration: "none" }}>{l.label}</Link>)}
          <Link to="/signup" style={{ borderRadius: 99, background: "#6357E8", color: "white", textAlign: "center", padding: "12px", fontWeight: 500, textDecoration: "none" }}>Get started free</Link>
        </motion.div>
      )}
    </header>
  );
}