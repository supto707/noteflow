import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Link } from "react-router";
import {
  PenLine, ArrowRight, Sparkles, Zap, Palette, FileText, Database, BookOpen, Globe,
  Layers, Table2, LayoutGrid, Calendar, Link2, Users, Heart, Coffee, Code, GitBranch,
  MessageSquare, Mail, Twitter, Linkedin, Github, MapPin, Briefcase, Star
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import Navbar from "../components/Navbar";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

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

const team = [
  { name: "Ada Chen", role: "Founder & CEO", bio: "Former Notion PM. Obsessed with tools that think like we do. Writes fancy TypeScript on weekends.", team: "Leadership", twitter: "adachen", github: "adachen", linkedin: "adachen", emoji: "🧠" },
  { name: "Linus Torres", role: "Co-founder & CTO", bio: "Built databases at Snowflake. Believes local-first is the future. Probably refactoring something right now.", team: "Leadership", twitter: "linustorres", github: "linustorres", linkedin: "linustorres", emoji: "⚡" },
  { name: "Maya Patel", role: "Head of Design", bio: "Ex-Figma. Thinks in systems, speaks in pixels. Her Figma files are weirdly organized.", team: "Design", twitter: "mayapatel", github: "mayapatel", linkedin: "mayapatel", emoji: "🎨" },
  { name: "Jordan Kim", role: "Design Engineer", bio: "Makes buttons feel alive. CSS animations are a personality trait. Owns 47 mechanical keyboards.", team: "Design", twitter: "jordankim", github: "jordankim", linkedin: "jordankim", emoji: "⌨️" },
  { name: "Sam Rivera", role: "Senior Engineer", bio: "Distributed systems nerd. Writes Rust for fun. Once optimized a query by 400x before coffee.", team: "Engineering", twitter: "samrivera", github: "samrivera", linkedin: "samrivera", emoji: "🦀" },
  { name: "Priya Shah", role: "Engineer", bio: "Full-stack with a soft spot for DX. Built the real-time sync. Cat appears in 73% of standups.", team: "Engineering", twitter: "priyashah", github: "priyashah", linkedin: "priyashah", emoji: "🐱" },
  { name: "Alex Novak", role: "Engineer", bio: "Mobile & offline-first. Made the app work on a plane. Prefers tabs over spaces (fight me).", team: "Engineering", twitter: "alexnovak", github: "alexnovak", linkedin: "alexnovak", emoji: "📱" },
  { name: "Ravi Desai", role: "Developer Advocate", bio: "Teaches developers to love their tools. Streams coding sessions. Has strong opinions on markdown.", team: "Community", twitter: "ravidesai", github: "ravidesai", linkedin: "ravidesai", emoji: "🎤" },
  { name: "Sofia Andersson", role: "Community Lead", bio: "Builds spaces where makers help makers. Runs the template gallery. Knows every power user by name.", team: "Community", twitter: "sofiaandersson", github: "sofiaandersson", linkedin: "sofiaandersson", emoji: "🤝" },
  { name: "Chris Morgan", role: "Support Engineer", bio: "Turns 'it broke' into 'here's why & fixed'. Writes docs people actually read. Coffee: black, infinite.", team: "Community", twitter: "chrismorgan", github: "chrismorgan", linkedin: "chrismorgan", emoji: "☕" },
];

const teams = [
  { name: "Leadership", icon: Sparkles, color: "#6357E8", description: "Setting the vision, keeping the ship pointed toward 'free forever'" },
  { name: "Design", icon: Palette, color: "#EC4899", description: "Making complex things feel simple. Every pixel has a purpose" },
  { name: "Engineering", icon: Code, color: "#22C27D", description: "Local-first, real-time, offline-ready. Hard problems, clean solutions" },
  { name: "Community", icon: Users, color: "#F59E0B", description: "Templates, support, advocacy. You build cool stuff, we amplify it" },
];

const values = [
  { icon: Heart, title: "Users first, always", desc: "No dark patterns. No lock-in. Your data is yours. We build what you need, not what sells." },
  { icon: Zap, title: "Speed as a feature", desc: "Instant search. Sub-100ms sync. Keyboard shortcuts for everything. Fast tools stay out of your way." },
  { icon: Sparkles, title: "Craft in the details", desc: "Spring animations. Thoughtful empty states. Command palette everywhere. The little things compound." },
  { icon: GitBranch, title: "Open by default", desc: "Open source core. Public roadmap. Community templates. We win when the ecosystem wins." },
  { icon: Coffee, title: "Sustainable pace", desc: "No crunch. Async-first. 4-day workweeks in summer. Rested humans build better software." },
  { icon: Star, title: "Free forever, for real", desc: "Not a trial. Not freemium bait. The core product is free. We make money on team features, not your notes." },
];

export default function About() {
  const { dark } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#8A8A80" : "#6E6E68";
  const cardBg = dark ? "#141412" : "#FFFFFF";
  const borderColor = dark ? "rgba(255,255,255,0.08)" : "rgba(14,14,12,0.09)";
  const bg = dark ? "#0A0A08" : "#F7F6F2";

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />
      <section ref={containerRef} className="overflow-hidden" style={{ position: "relative", minHeight: "100vh", paddingTop: 140, paddingBottom: 80 }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(${dark ? "rgba(255,255,255,0.03)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px), linear-gradient(90deg, ${dark ? "rgba(255,255,255,0.03)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px)`, backgroundSize: "72px 72px" }} />
        <div className="absolute pointer-events-none" style={{ top: -80, right: -80, width: 700, height: 700, background: "radial-gradient(circle, rgba(99,87,232,0.14) 0%, transparent 65%)", borderRadius: "50%" }} />
        <div className="absolute pointer-events-none" style={{ bottom: 0, left: -100, width: 500, height: 500, background: "radial-gradient(circle, rgba(99,87,232,0.08) 0%, transparent 65%)", borderRadius: "50%" }} />

        <motion.div style={{ opacity }} className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <FadeUp delay={0.05} className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border" style={{ padding: "7px 18px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: "#6357E8", background: "rgba(99,87,232,0.08)", borderColor: "rgba(99,87,232,0.22)" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-[#6357E8]" /> Small team. Big opinions. <ArrowRight size={13} />
            </div>
          </FadeUp>

          <div className="mb-8" style={{ lineHeight: 0.92 }}>
            <RevealLine delay={0.1}>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 800, letterSpacing: "-0.04em", color: fg, lineHeight: 0.95 }}>Meet the</h1>
            </RevealLine>
            <RevealLine delay={0.18}>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#6357E8", lineHeight: 0.95, marginTop: "0.06em" }}>humans</h1>
            </RevealLine>
            <RevealLine delay={0.26}>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3rem, 8vw, 7rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#22C27D", lineHeight: 0.95, marginTop: "0.06em" }}>behind NoteFlow</h1>
            </RevealLine>
          </div>

          <FadeUp delay={0.42}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(1rem, 2vw, 1.25rem)", color: sub, maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
              Ten people. Zero investors. One mission: build the tool we wanted to use.
            </p>
          </FadeUp>
        </motion.div>
      </section>

      <section style={{ padding: "100px 0", background: bg }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeUp className="flex items-center justify-center gap-3 mb-16">
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6357E8", letterSpacing: "0.1em", textTransform: "uppercase" }}>What we believe</span>
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((v, i) => (
                <FadeUp key={v.title} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3 }}
                    style={{ padding: 32, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 20 }}
                  >
                    <div style={{ width: 56, height: 56, borderRadius: 14, background: "#6357E818", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                      <v.icon size={24} style={{ color: "#6357E8" }} />
                    </div>
                    <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 20, fontWeight: 700, color: fg, marginBottom: 10 }}>{v.title}</h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: sub, lineHeight: 1.7 }}>{v.desc}</p>
                  </motion.div>
                </FadeUp>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      <section style={{ padding: "100px 0", background: dark ? "#0E0E0C" : "#F7F6F2" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeUp className="flex items-center justify-center gap-3 mb-16">
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6357E8", letterSpacing: "0.1em", textTransform: "uppercase" }}>The team</span>
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
          </FadeUp>
          <RevealLine>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3rem, 7vw, 6.5rem)", fontWeight: 800, letterSpacing: "-0.04em", color: fg, lineHeight: 0.95, marginBottom: "0.12em", textAlign: "center" }}>Small team. Zero bureaucracy.</h2>
          </RevealLine>

          {teams.map((t, ti) => (
            <FadeUp key={t.name} delay={ti * 0.1}>
              <div style={{ marginTop: 60 }}>
                <div className="flex items-center gap-3 mb-8">
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: `${t.color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <t.icon size={22} style={{ color: t.color }} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 28, fontWeight: 800, color: fg }}>{t.name}</h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: sub, marginTop: 4 }}>{t.description}</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {team.filter(m => m.team === t.name).map((member, mi) => (
                    <FadeUp key={member.name} delay={mi * 0.06}>
                      <motion.div
                        whileHover={{ y: -8, scale: 1.01 }}
                        transition={{ duration: 0.3 }}
                        style={{ padding: 24, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16 }}
                      >
                        <div className="flex items-start gap-4">
                          <div style={{ width: 64, height: 64, borderRadius: 16, background: `${t.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0 }}>
                            {member.emoji}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, color: fg }}>{member.name}</h4>
                              <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, color: t.color, background: `${t.color}18`, padding: "2px 8px", borderRadius: 9999, textTransform: "uppercase" }}>{member.role.split(" & ")[0].split(" ")[0]}</span>
                            </div>
                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub, marginBottom: 2 }}>Role: {member.role}</p>
                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub, lineHeight: 1.6 }}>{member.bio}</p>
                            <div className="flex items-center gap-3 mt-4">
                              <a href={`https://twitter.com/${member.twitter}`} target="_blank" rel="noopener noreferrer" style={{ color: sub, transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#1DA1F2"} onMouseLeave={e => e.currentTarget.style.color = sub}><Twitter size={16} /></a>
                              <a href={`https://github.com/${member.github}`} target="_blank" rel="noopener noreferrer" style={{ color: sub, transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = fg} onMouseLeave={e => e.currentTarget.style.color = sub}><Github size={16} /></a>
                              <a href={`https://linkedin.com/in/${member.linkedin}`} target="_blank" rel="noopener noreferrer" style={{ color: sub, transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#0A66C2"} onMouseLeave={e => e.currentTarget.style.color = sub}><Linkedin size={16} /></a>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </FadeUp>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <section style={{ padding: "100px 0", background: bg }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeUp className="flex items-center justify-center gap-3 mb-16">
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6357E8", letterSpacing: "0.1em", textTransform: "uppercase" }}>Culture</span>
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              { icon: Coffee, title: "Async by default", desc: "No mandatory meetings. Write it down, share a Loom, move on. Deep work > shallow sync." },
              { icon: MapPin, title: "Distributed across 6 timezones", desc: "SF, NYC, London, Berlin, Bangalore, Sydney. We follow the sun." },
              { icon: Heart, title: "Dogfooding is mandatory", desc: "Every feature ships to our workspace first. If we don't love it, you won't either." },
              { icon: BookOpen, title: "Learning budget: $2k/year", desc: "Courses, conferences, books, mechanical keyboards. No approval needed." },
              { icon: Zap, title: "Ship Fridays (optional)", desc: "Deploy something small every Friday. Celebrate in #ships channel. No pressure." },
              { icon: Star, title: "Quarterly offsites", desc: "Real life > Zoom. Last one was a cabin in the Alps. Next: Japan." },
            ].map((c, i) => (
              <FadeUp key={c.title} delay={i * 0.06}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  style={{ padding: 28, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16 }}
                >
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: "#6357E818", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <c.icon size={22} style={{ color: "#6357E8" }} />
                  </div>
                  <h4 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, color: fg, marginBottom: 8 }}>{c.title}</h4>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: sub, lineHeight: 1.6 }}>{c.desc}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>

          <FadeUp>
            <div style={{ padding: 48, background: "#6357E8", borderRadius: 24, textAlign: "center" }}>
              <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "white", marginBottom: 16 }}>Want to join us?</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.8)", maxWidth: 500, margin: "0 auto 24px", lineHeight: 1.7 }}>
                We're always looking for kind, curious builders who care about craft.
                No open roles right now? Pitch us anyway.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link to="/careers" className="inline-flex items-center gap-2 rounded-full transition-all duration-300"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600, padding: "14px 32px", background: "white", color: "#6357E8", textDecoration: "none" }}>
                  View open roles <ArrowRight size={15} />
                </Link>
                <a href="mailto:jobs@noteflow.io" className="inline-flex items-center gap-2 rounded-full transition-all duration-300"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600, padding: "14px 32px", border: "1px solid rgba(255,255,255,0.3)", color: "white", textDecoration: "none" }}>
                  <Mail size={16} /> Email us
                </a>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <section style={{ padding: "140px 0", background: dark ? "#0E0E0C" : "#F7F6F2", overflow: "hidden", position: "relative" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(${dark ? "rgba(255,255,255,0.025)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px), linear-gradient(90deg, ${dark ? "rgba(255,255,255,0.025)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px)`, backgroundSize: "64px 64px" }} />
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center relative">
          <RevealLine><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3.5rem, 10vw, 9rem)", fontWeight: 800, letterSpacing: "-0.045em", color: fg, lineHeight: 0.92 }}>Build with us.</div></RevealLine>
          <RevealLine delay={0.1}><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3.5rem, 10vw, 9rem)", fontWeight: 800, letterSpacing: "-0.045em", color: "#6357E8", lineHeight: 0.92 }}>It&apos;s free.</div></RevealLine>
          <FadeUp delay={0.25}><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: sub, maxWidth: 440, margin: "28px auto 40px", lineHeight: 1.65 }}>No credit card. No trial. Just a better place to think and work.</p></FadeUp>
          <FadeUp delay={0.35} className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/signup" className="rounded-full flex items-center gap-2 group transition-all duration-300"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "16px 34px", background: "#6357E8", color: "white", textDecoration: "none" }}>
              Create your free account <ArrowRight size={15} />
            </Link>
            <Link to="/docs" className="rounded-full transition-all duration-300"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "16px 34px", border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(14,14,12,0.14)"}`, color: fg, textDecoration: "none" }}>
              Read the docs
            </Link>
          </FadeUp>
        </div>
      </section>

      <footer style={{ background: "#0A0A08", padding: "80px 0 40px" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="rounded-lg bg-[#6357E8] flex items-center justify-center" style={{ width: 34, height: 34 }}><PenLine size={16} className="text-white" /></div>
                <span className="font-bold tracking-tight text-white" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18 }}>NoteFlow</span>
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: sub, lineHeight: 1.75, maxWidth: 240 }}>A free workspace for docs, databases, and wikis. Think clearly. Note freely.</p>
            </div>
            {Object.entries({
              Product: ["Features", "Pricing", "Changelog", "Roadmap", "Status"],
              Resources: ["Documentation", "API Reference", "Templates", "Community"],
              Company: ["About", "Blog", "Careers", "Press kit"],
              Legal: ["Privacy", "Terms", "Cookie policy", "Security"],
            }).map(([group, links], gi) => (
              <div key={group}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "white", marginBottom: 16 }}>{group}</div>
                <div className="flex flex-col gap-2.5">
                    {links.map((link, li) => (
                      <Link key={link} to={link === "Documentation" ? "/docs" : link === "API Reference" ? "/api-reference" : link === "Press kit" ? "/press-kit" : link === "Cookie policy" ? "/cookie-policy" : `/${link.toLowerCase().replace(/ /g, "-")}`} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub, display: "block", textDecoration: "none" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "white")}
                        onMouseLeave={e => (e.currentTarget.style.color = sub)}>
                        {link}
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: `1px solid ${borderColor}` }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub }}>© 2025 NoteFlow, Inc. · Free forever · Made with care</span>
            <div className="flex items-center gap-2" style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: sub }}><div className="w-1.5 h-1.5 rounded-full bg-[#22C27D]" />All systems operational</div>
          </div>
        </div>
      </footer>
    </div>
  );
}