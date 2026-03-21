import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import emailjs from '@emailjs/browser';
// ── Fonts ──────────────────────────────────────────────────────────────────
const FontLink = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --c-bg: #050508;
      --c-surface: #0c0c14;
      --c-glass: rgba(255,255,255,0.04);
      --c-border: rgba(255,255,255,0.08);
      --c-accent: #6c63ff;
      --c-neon: #00f5d4;
      --c-pink: #ff4ecd;
      --c-text: #e8e6ff;
      --c-muted: rgba(232,230,255,0.45);
      --font-display: 'Syne', sans-serif;
      --font-body: 'DM Sans', sans-serif;
    }
    html { scroll-behavior: smooth; }
    body { background: var(--c-bg); color: var(--c-text); font-family: var(--font-body); overflow-x: hidden; }
    ::selection { background: rgba(108,99,255,0.35); }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--c-bg); }
    ::-webkit-scrollbar-thumb { background: var(--c-accent); border-radius: 2px; }
  `}</style>
);

// ── Helpers ────────────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay } },
});

const RevealBlock = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} variants={fadeUp(delay)} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
};

// ── Noise texture SVG overlay ──────────────────────────────────────────────
const Noise = () => (
  <svg style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 9999, opacity: 0.028 }}>
    <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
    <rect width="100%" height="100%" filter="url(#noise)" />
  </svg>
);

// ── Navigation ─────────────────────────────────────────────────────────────
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["Services", "Work", "Pricing", "Testimonials", "Contact"];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: scrolled ? "14px 0" : "24px 0",
        background: scrolled ? "rgba(5,5,8,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.4s ease",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <a href="#" style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 800, textDecoration: "none", color: "white", letterSpacing: "-0.5px", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ display: "inline-block", width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg, #6c63ff, #00f5d4)", boxShadow: "0 0 16px rgba(108,99,255,0.5)" }} />
          Launch<span style={{ color: "#6c63ff" }}>Stack</span>
        </a>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: 36, alignItems: "center" }} className="desktop-nav">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              style={{ color: "var(--c-muted)", textDecoration: "none", fontSize: 14, fontWeight: 500, letterSpacing: "0.01em", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "white"}
              onMouseLeave={e => e.target.style.color = "var(--c-muted)"}
            >{l}</a>
          ))}
          <motion.a href="#contact" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            style={{ padding: "9px 22px", borderRadius: 10, background: "linear-gradient(135deg, #6c63ff, #9b59b6)", color: "white", textDecoration: "none", fontSize: 14, fontWeight: 600, boxShadow: "0 0 20px rgba(108,99,255,0.3)" }}>
            Get Started
          </motion.a>
        </div>

        {/* Hamburger */}
        <button onClick={() => setOpen(!open)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: "white", fontSize: 22 }} className="hamburger">☰</button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            style={{ background: "rgba(12,12,20,0.97)", backdropFilter: "blur(20px)", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
            {links.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}
                style={{ color: "var(--c-text)", textDecoration: "none", fontSize: 16, fontWeight: 500 }}>{l}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) { .desktop-nav { display: none !important; } .hamburger { display: block !important; } }
      `}</style>
    </motion.nav>
  );
};

// ── Animated background blobs ──────────────────────────────────────────────
const Blob = ({ style }) => (
  <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    style={{ position: "absolute", borderRadius: "50%", filter: "blur(80px)", ...style }} />
);

// ── Hero ───────────────────────────────────────────────────────────────────
const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 150]);

  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: "120px 24px 80px" }}>
      {/* Background blobs */}
      <motion.div style={{ position: "absolute", inset: 0, y }}>
        <Blob style={{ width: 600, height: 600, top: "-10%", left: "-10%", background: "radial-gradient(circle, rgba(108,99,255,0.35) 0%, transparent 70%)" }} />
        <Blob style={{ width: 500, height: 500, bottom: "-5%", right: "-5%", background: "radial-gradient(circle, rgba(0,245,212,0.2) 0%, transparent 70%)" }} />
        <Blob style={{ width: 400, height: 400, top: "30%", right: "20%", background: "radial-gradient(circle, rgba(255,78,205,0.15) 0%, transparent 70%)" }} />
      </motion.div>

      {/* Grid overlay */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      {/* Floating orbs */}
      {[...Array(6)].map((_, i) => (
        <motion.div key={i}
          animate={{ y: [0, -20, 0], x: [0, 10, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }}
          style={{
            position: "absolute", borderRadius: "50%",
            width: [8, 12, 6, 10, 8, 14][i], height: [8, 12, 6, 10, 8, 14][i],
            background: ["#6c63ff", "#00f5d4", "#ff4ecd", "#6c63ff", "#00f5d4", "#ff4ecd"][i],
            top: [`${15 + i * 12}%`], left: [`${10 + i * 15}%`],
            boxShadow: `0 0 12px ${["#6c63ff", "#00f5d4", "#ff4ecd", "#6c63ff", "#00f5d4", "#ff4ecd"][i]}`,
          }}
        />
      ))}

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 860 }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
          style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 18px", borderRadius: 100, background: "rgba(108,99,255,0.12)", border: "1px solid rgba(108,99,255,0.3)", marginBottom: 32, fontSize: 13, fontWeight: 500, color: "#a89cff" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#6c63ff", boxShadow: "0 0 8px #6c63ff", animation: "pulse 2s infinite" }} />
          Now accepting client projects — Let's build
          <style>{`@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.6;transform:scale(1.3)} }`}</style>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(44px, 8vw, 90px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-2px", marginBottom: 24 }}>
          The Future of<br />
          <span style={{ background: "linear-gradient(135deg, #6c63ff 0%, #00f5d4 50%, #ff4ecd 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Launch Your digital presence 
          </span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
          style={{ fontSize: "clamp(16px, 2.5vw, 20px)", color: "var(--c-muted)", lineHeight: 1.7, maxWidth: 600, margin: "0 auto 48px", fontWeight: 300 }}>
          We designe high-performance websites and apps that help your business grow faster
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.65 }}
          style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <motion.a href="#pricing" whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(108,99,255,0.6)" }} whileTap={{ scale: 0.97 }}
            style={{ padding: "16px 40px", borderRadius: 14, background: "linear-gradient(135deg, #6c63ff, #9b59b6)", color: "white", textDecoration: "none", fontSize: 16, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 8, boxShadow: "0 0 24px rgba(108,99,255,0.4)", transition: "box-shadow 0.3s" }}>
            Start for Free
            <span style={{ fontSize: 20 }}>→</span>
          </motion.a>
          <motion.a href="#work" whileHover={{ scale: 1.05, background: "rgba(255,255,255,0.08)" }} whileTap={{ scale: 0.97 }}
            style={{ padding: "16px 40px", borderRadius: 14, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "white", textDecoration: "none", fontSize: 16, fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 8, transition: "background 0.3s" }}>
            View Demo ▶
          </motion.a>
        </motion.div>

        {/* Trust bar */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          style={{ marginTop: 60, display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          <span style={{ color: "var(--c-muted)", fontSize: 13 }}>Trusted by teams at</span>
          {["Stripe", "Notion", "Vercel", "Linear", "Figma"].map(name => (
            <span key={name} style={{ padding: "5px 14px", borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.4)", letterSpacing: "0.02em" }}>{name}</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ── Services ───────────────────────────────────────────────────────────────
const services = [
  { icon: "🧠", title: "Website Development", desc: "modern fast and mobile responsive websites.", color: "#6c63ff" },
  { icon: "🔐", title: "App Development", desc: "Costom Andriod apps with premium Ui .", color: "#00f5d4" },
  { icon: "⚡", title: "Fast Delivery", desc: "get your project ready in days ,not weeks.", color: "#ff4ecd" },
  { icon: "📊", title: "Business Solutions", desc: "Complete digital solution for your business.", color: "#ffa726" },
];

const ServiceCard = ({ icon, title, desc, color, delay }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <RevealBlock delay={delay}>
      <motion.div
        onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}
        whileHover={{ y: -8, scale: 1.02 }}
        style={{
          padding: "36px 32px", borderRadius: 20,
          background: hovered ? `linear-gradient(135deg, rgba(${color === "#6c63ff" ? "108,99,255" : color === "#00f5d4" ? "0,245,212" : color === "#ff4ecd" ? "255,78,205" : "255,167,38"},0.12) 0%, rgba(12,12,20,0.8) 100%)` : "var(--c-glass)",
          border: `1px solid ${hovered ? color + "40" : "rgba(255,255,255,0.07)"}`,
          backdropFilter: "blur(16px)",
          boxShadow: hovered ? `0 20px 60px ${color}25, 0 0 0 1px ${color}20` : "0 4px 24px rgba(0,0,0,0.2)",
          transition: "all 0.4s ease", cursor: "default", height: "100%",
        }}>
        <motion.div animate={{ rotate: hovered ? [0, -10, 10, 0] : 0 }} transition={{ duration: 0.5 }}
          style={{ fontSize: 36, marginBottom: 20, display: "inline-block" }}>{icon}</motion.div>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, marginBottom: 12, color: hovered ? "white" : "var(--c-text)" }}>{title}</h3>
        <p style={{ color: "var(--c-muted)", lineHeight: 1.7, fontSize: 15 }}>{desc}</p>
        <motion.div animate={{ width: hovered ? "100%" : "0%" }} transition={{ duration: 0.4 }}
          style={{ height: 2, background: `linear-gradient(90deg, ${color}, transparent)`, borderRadius: 1, marginTop: 24 }} />
      </motion.div>
    </RevealBlock>
  );
};

const Services = () => (
  <section id="services" style={{ padding: "120px 24px", maxWidth: 1200, margin: "0 auto" }}>
    <RevealBlock>
      <div style={{ textAlign: "center", marginBottom: 72 }}>
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6c63ff", marginBottom: 16, display: "block" }}>What We Offer</span>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 54px)", fontWeight: 800, letterSpacing: "-1.5px", lineHeight: 1.1 }}>
          Built different.<br /><span style={{ color: "var(--c-muted)", fontWeight: 400 }}>Engineered to scale.</span>
        </h2>
      </div>
    </RevealBlock>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
      {services.map((s, i) => <ServiceCard key={s.title} {...s} delay={i * 0.1} />)}
    </div>
  </section>
);

// ── Projects / Demo ────────────────────────────────────────────────────────
const projects = [
  { title: "Salon Booking App", tag: "Mobile Ui", gradient: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)", accent: "#6c63ff", link: "https://bookingap.vercel.app/" },
  { title: "E-commerce Store", tag: "Creative website", gradient: "linear-gradient(135deg, #0d0d1a, #1a0533, #2d1b69)", accent: "#ff4ecd", link: "https://e-commers-psi-lyart.vercel.app/" },
  { title: "dashboard website", tag: "Creative Website", gradient: "linear-gradient(135deg, #0a1628, #0d2137, #0a3d62)", accent: "#00f5d4", link: "https://dashboard-eight-sable-27.vercel.app/" },
  { title: "social media app ", tag: "Mobile Ui", gradient: "linear-gradient(135deg, #1a0a0a, #2d1515, #4a1942)", accent: "#ffa726", link: "https://socialapp-taupe.vercel.app/" },
  { title: "ai website", tag: "Productivity", gradient: "linear-gradient(135deg, #0a1a0a, #0d2d1a, #1a4a2e)", accent: "#69f0ae", link: "https://aiwebproject.vercel.app/" },

  // ✅ coming soon (placeholder link)
  { title: "coming soon...", tag: "Next project", gradient: "linear-gradient(135deg, #1a0a1a, #2d0d2d, #1a0033)", accent: "#e040fb", link: "#" },
];


const ProjectCard = ({ title, tag, gradient, accent, delay, link }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <RevealBlock delay={delay}>
      
      {/* ✅ BAS YE ADD KIYA HAI (anchor wrap) */}
      <a href={link} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
        
        <motion.div
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          whileHover={{ y: -6 }}
          style={{ borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", cursor: "pointer", position: "relative" }}
        >

          {/* Visual panel */}
          <div style={{ height: 200, background: gradient, position: "relative", overflow: "hidden" }}>
            
            <motion.div animate={{ rotate: hovered ? 45 : 0, scale: hovered ? 1.2 : 1 }} transition={{ duration: 0.6 }}
              style={{ position: "absolute", top: "20%", left: "15%", width: 60, height: 60, borderRadius: 16, background: accent + "22", border: `1px solid ${accent}44` }} />
            
            <motion.div animate={{ rotate: hovered ? -30 : 0, x: hovered ? 10 : 0 }} transition={{ duration: 0.5, delay: 0.05 }}
              style={{ position: "absolute", bottom: "20%", right: "20%", width: 40, height: 40, borderRadius: "50%", background: accent + "33", border: `1px solid ${accent}55` }} />
            
            <motion.div animate={{ scale: hovered ? [1, 1.5, 1] : 1 }} transition={{ duration: 0.8 }}
              style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: 80, height: 80, borderRadius: "50%", background: `radial-gradient(circle, ${accent}44 0%, transparent 70%)` }} />

            {/* Hover overlay */}
            <motion.div animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.3 }}
              style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              
              <motion.span animate={{ scale: hovered ? 1 : 0.8, opacity: hovered ? 1 : 0 }} transition={{ duration: 0.3 }}
                style={{ padding: "10px 22px", borderRadius: 10, background: accent, color: "#000", fontSize: 13, fontWeight: 700 }}>
                View Project →
              </motion.span>

            </motion.div>
          </div>

          {/* Info */}
          <div style={{ padding: "20px 24px", background: "var(--c-surface)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: accent, marginBottom: 6, display: "block" }}>
              {tag}
            </span>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700 }}>
              {title}
            </h3>
          </div>

        </motion.div>

      </a>
    </RevealBlock>
  );
};
const Projects = () => (
  <section id="work" style={{ padding: "120px 24px", background: "linear-gradient(180deg, transparent 0%, rgba(108,99,255,0.04) 50%, transparent 100%)" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <RevealBlock>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#00f5d4", marginBottom: 16, display: "block" }}>Portfolio</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 54px)", fontWeight: 800, letterSpacing: "-1.5px", lineHeight: 1.1 }}>
            Products that define<br /><span style={{ color: "var(--c-muted)", fontWeight: 400 }}>a new category.</span>
          </h2>
        </div>
      </RevealBlock>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
        {projects.map((p, i) => <ProjectCard key={p.title} {...p} delay={i * 0.08} />)}
      </div>
    </div>
  </section>
);

// ── Pricing ────────────────────────────────────────────────────────────────
const plans = [
     {
    name: "Basic Website",
    price: "$99",
    desc: "Perfect for small businesses & personal brands",
    features: [
      "1 Modern Landing Page",
               "Fully Responsive (Mobile + Desktop)",
"Fast Loading Speed",
      "Clean UI Design",
"Contact Form Integration",
      "Basic SEO Setup",
      "Free Deployment (Live Website)",
      "1 Revision Included"
    ],
    cta: "Get Started", featured: false, accent: "#6c63ff",
  },
    {
    name: "Advanced Website",
    price: "$199 – $499",
    desc: "Best for growing businesses & startups",
    features: [
      "Multi-page Website (3–10 pages)",
      "Premium UI/UX Design",
      "Smooth Animations ",
      "Mobile+Tablet Optimization",
      "ContactForms "," WhatsAppIntegration",
      "Basic Backend Integration ",
      "SEO Optimization",
      "Fast Performance Optimization",
      "Free Deployment "," Domain Setup Help",
      "3 Revisions Included",
      "Priority Support"
    ],
    cta: "Start Now", featured: true, accent: "#00f5d4",
  },
  {
     name: "App Development",
    price: "$299 – $999",
    desc: "Custom Android apps for real business use",
    features: [
      "Custom Android App (React Native / Expo)",
      "Modern Mobile UI (Premium Design)",
      "Login / Signup System",
      "API / Backend Integration",
      "Database Setup (if needed)",
      "Push Notifications (Optional)",
      "Admin Panel (Optional)",
      "App Testing & Optimization",
      "APK Build + Setup Guide",
      "Play Store Ready Code",
      "Unlimited Revisions (within scope)"
    ],
    cta: "Build App", featured: false, accent: "#ff4ecd",
  },
];

const PricingCard = ({ name, price, period, desc, features, cta, featured, accent, delay }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <RevealBlock delay={delay}>
      <motion.div onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}
        whileHover={{ y: featured ? -4 : -8, scale: featured ? 1.01 : 1.02 }}
        style={{
          padding: "40px 32px", borderRadius: 24, position: "relative",
          background: featured ? `linear-gradient(135deg, rgba(0,245,212,0.08), rgba(108,99,255,0.08))` : "var(--c-glass)",
          border: featured ? "1px solid rgba(0,245,212,0.3)" : "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(16px)",
          boxShadow: featured ? "0 0 60px rgba(0,245,212,0.1), 0 20px 60px rgba(0,0,0,0.3)" : hovered ? "0 20px 60px rgba(0,0,0,0.3)" : "0 4px 24px rgba(0,0,0,0.2)",
          transition: "box-shadow 0.4s ease",
        }}>
        {featured && (
          <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", padding: "6px 20px", borderRadius: 100, background: "linear-gradient(135deg, #00f5d4, #6c63ff)", fontSize: 12, fontWeight: 700, color: "#000", whiteSpace: "nowrap" }}>
            Most Popular
          </div>
        )}
        <div style={{ marginBottom: 24 }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: accent }}>{name}</span>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 4, marginTop: 12, marginBottom: 8 }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 48, fontWeight: 800, lineHeight: 1, color: "white" }}>{price}</span>
            <span style={{ color: "var(--c-muted)", marginBottom: 8, fontSize: 15 }}>{period}</span>
          </div>
          <p style={{ color: "var(--c-muted)", fontSize: 14 }}>{desc}</p>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, marginBottom: 32 }}>
          {features.map(f => (
            <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <span style={{ width: 18, height: 18, borderRadius: "50%", background: accent + "22", border: `1px solid ${accent}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: accent, flexShrink: 0 }}>✓</span>
              <span style={{ fontSize: 14, color: "var(--c-text)" }}>{f}</span>
            </div>
          ))}
        </div>

        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          style={{
            width: "100%", padding: "14px", borderRadius: 12, border: featured ? "none" : `1px solid ${accent}60`,
            background: featured ? `linear-gradient(135deg, ${accent}, #6c63ff)` : "transparent",
            color: featured ? "#000" : accent, fontSize: 15, fontWeight: 700, cursor: "pointer",
            boxShadow: featured ? `0 0 24px ${accent}40` : "none",
            transition: "all 0.3s",
          }}>
          {cta} →
        </motion.button>
      </motion.div>
    </RevealBlock>
  );
};

const Pricing = () => (
  <section id="pricing" style={{ padding: "120px 24px", maxWidth: 1100, margin: "0 auto" }}>
    <RevealBlock>
      <div style={{ textAlign: "center", marginBottom: 72 }}>
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#ff4ecd", marginBottom: 16, display: "block" }}>Pricing</span>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 54px)", fontWeight: 800, letterSpacing: "-1.5px", lineHeight: 1.1 }}>
          Simple. Transparent.<br /><span style={{ color: "var(--c-muted)", fontWeight: 400 }}>No surprises.</span>
        </h2>
      </div>
    </RevealBlock>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, alignItems: "start" }}>
      {plans.map((p, i) => <PricingCard key={p.name} {...p} delay={i * 0.1} />)}
    </div>
  </section>
);

// ── Testimonials ───────────────────────────────────────────────────────────
const testimonials = [
  {    name: "Rahul Verma",
    role: "Freelancer (Portfolio Website)",
    text: "He built my portfolio website with a truly premium design. I’ve already started getting better responses from clients. Highly recommended.",
    avatar: "RV",
  },
  {
    name: "Ankit Sharma",
    role: "Real Estate Agent",
    text: "I got a property listing app developed and it works smoothly. Now it's much easier to showcase properties to my clients.",
    avatar: "AS",
  },
  {
    name: "Priya Singh",
    role: "Salon Owner",
    text: "Got a booking website for my salon. Now I receive online bookings regularly. The UI is clean and easy to use.",
    avatar: "PS",
  },
  {
    name: "Mohit Jain",
    role: "E-commerce Seller",
    text: "My online store looks modern and runs fast. Customers find it very easy to use. Great experience overall..",
    avatar: "MJ",
  }];

const TestiCard = ({ name, role, text, avatar, delay }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <RevealBlock delay={delay}>
      <motion.div onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}
        whileHover={{ y: -6 }}
        style={{
          padding: "32px", borderRadius: 20,
          background: hovered ? "rgba(108,99,255,0.08)" : "var(--c-glass)",
          border: `1px solid ${hovered ? "rgba(108,99,255,0.25)" : "rgba(255,255,255,0.07)"}`,
          backdropFilter: "blur(16px)", transition: "all 0.4s ease",
          boxShadow: hovered ? "0 20px 40px rgba(0,0,0,0.3)" : "none",
        }}>
        <div style={{ fontSize: 28, marginBottom: 20, color: "#6c63ff", opacity: 0.6 }}>"</div>
        <p style={{ color: "var(--c-text)", lineHeight: 1.75, fontSize: 15, marginBottom: 28, fontStyle: "italic" }}>{text}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg, #6c63ff, #9b59b6)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, flexShrink: 0 }}>{avatar}</div>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15 }}>{name}</div>
            <div style={{ color: "var(--c-muted)", fontSize: 13 }}>{role}</div>
          </div>
        </div>
      </motion.div>
    </RevealBlock>
  );
};

const Testimonials = () => (
  <section id="testimonials" style={{ padding: "120px 24px", background: "linear-gradient(180deg, transparent 0%, rgba(0,245,212,0.03) 50%, transparent 100%)" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <RevealBlock>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6c63ff", marginBottom: 16, display: "block" }}>Social Proof</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 54px)", fontWeight: 800, letterSpacing: "-1.5px" }}>
            Loved by builders<br /><span style={{ color: "var(--c-muted)", fontWeight: 400 }}>around the world.</span>
          </h2>
        </div>
      </RevealBlock>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
        {testimonials.map((t, i) => <TestiCard key={t.name} {...t} delay={i * 0.1} />)}
      </div>

      {/* Stats bar */}
      <RevealBlock delay={0.2}>
        <div style={{ marginTop: 72, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 24 }}>
          {[["quality", "premium work"], ["Fast", "2-7 Days"], ["mobile", "all devices"], ["support", "24/7 Help"]].map(([stat, label]) => (
            <div key={label} style={{ textAlign: "center", padding: "32px 24px", borderRadius: 18, background: "var(--c-glass)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 33, fontWeight: 800, letterSpacing: "-1px", background: "linear-gradient(135deg, #6c63ff, #00f5d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{stat}</div>
              <div style={{ color: "var(--c-muted)", fontSize: 14, marginTop: 6 }}>{label}</div>
            </div>
          ))}
        </div>
      </RevealBlock>
    </div>
  </section>
);

// ── Contact ────────────────────────────────────────────────────────────────
const Contact = () => {

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_pi8za4d',
      'template_em01035',
      e.target,
      'Pf_2YtDZBVXINKMv5'
    ).then(
      () => {
        alert("Message Sent ✅");
        setSent(true);
      },
      () => alert("Error ❌")
    );
  };

  const inputStyle = { width: "100%", padding: "14px 18px", borderRadius: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white", fontSize: 15, fontFamily: "var(--font-body)", outline: "none", transition: "border-color 0.3s", boxSizing: "border-box" };

  return (
    <section id="contact" style={{ padding: "120px 24px", maxWidth: 700, margin: "0 auto" }}>
      <RevealBlock>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#00f5d4", marginBottom: 16, display: "block" }}>Get In Touch</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 54px)", fontWeight: 800, letterSpacing: "-1.5px" }}>
            Let's build something<br /><span style={{ color: "var(--c-muted)", fontWeight: 400 }}>extraordinary.</span>
          </h2>
        </div>
      </RevealBlock>

      <RevealBlock delay={0.15}>
        <div style={{ padding: "48px", borderRadius: 28, background: "var(--c-glass)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}>
          {sent ? (
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>✨</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 800, marginBottom: 10 }}>Message Received!</h3>
              <p style={{ color: "var(--c-muted)" }}>We'll get back to you within 24 hours.</p>
            </motion.div>
          ) : (

            // ✅ FIXED FORM
            <form onSubmit={sendEmail} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "var(--c-muted)", display: "block", marginBottom: 8 }}>Name</label>
                  <input
                    name="name"
                    style={inputStyle}
                    placeholder="Alex Johnson"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    onFocus={e => e.target.style.borderColor = "#6c63ff"}
                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "var(--c-muted)", display: "block", marginBottom: 8 }}>Email</label>
                  <input
                    name="email"
                    style={inputStyle}
                    placeholder="alex@company.com"
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    onFocus={e => e.target.style.borderColor = "#6c63ff"}
                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "var(--c-muted)", display: "block", marginBottom: 8 }}>Message</label>
                <textarea
                  name="message"
                  style={{ ...inputStyle, minHeight: 130, resize: "vertical" }}
                  placeholder="Tell us about your project..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  onFocus={e => e.target.style.borderColor = "#6c63ff"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                />
              </div>

              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.04, boxShadow: "0 0 32px rgba(108,99,255,0.5)" }}
                  whileTap={{ scale: 0.97 }}
                  style={{ flex: 1, minWidth: 140, padding: "15px", borderRadius: 12, border: "none", background: "linear-gradient(135deg, #6c63ff, #9b59b6)", color: "white", fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 0 20px rgba(108,99,255,0.3)", fontFamily: "var(--font-body)" }}>
                  Send Message →
                </motion.button>

                <motion.a href="https://wa.me/919654442756" target="_blank" rel="noreferrer"
                  whileHover={{ scale: 1.04, boxShadow: "0 0 32px rgba(37,211,102,0.4)" }} whileTap={{ scale: 0.97 }}
                  style={{ flex: 1, minWidth: 140, padding: "15px", borderRadius: 12, border: "1px solid rgba(37,211,102,0.4)", background: "rgba(37,211,102,0.08)", color: "#25d366", fontSize: 15, fontWeight: 700, cursor: "pointer", textDecoration: "none", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  WhatsApp
                </motion.a>
              </div>

            </form>

          )}
        </div>
      </RevealBlock>
    </section>
  );
};

// ── Footer ─────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "48px 24px 36px" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 32, marginBottom: 48 }}>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ display: "inline-block", width: 24, height: 24, borderRadius: 7, background: "linear-gradient(135deg, #6c63ff, #00f5d4)" }} />
            Launch<span style={{ color: "#6c63ff" }}>Stack</span>
          </div>
          <p style={{ color: "var(--c-muted)", fontSize: 14, maxWidth: 260, lineHeight: 1.7 }}>we build Modern & premium websites and mobile apps to help business grow faster.</p>
        </div>
        {[
          ["Product", ["Features", "Pricing", "Changelog", "Roadmap"]],
          ["Company", ["About", "Blog", "Careers", "Press"]],
          ["Legal", ["Privacy", "Terms", "Security", "GDPR"]],
        ].map(([group, items]) => (
          <div key={group}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, letterSpacing: "0.05em", marginBottom: 16 }}>{group}</div>
            {items.map(item => (
              <a key={item} href="#" style={{ display: "block", color: "var(--c-muted)", textDecoration: "none", fontSize: 14, marginBottom: 10, transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "white"} onMouseLeave={e => e.target.style.color = "var(--c-muted)"}>{item}</a>
            ))}
          </div>
        ))}
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <span style={{ color: "var(--c-muted)", fontSize: 13 }}>© 2026 LaunchStack. All rights reserved.</span>
        <div style={{ display: "flex", gap: 20 }}>
       {[
  { name: "Instagram", link: "https://instagram.com/launchstack.in" },
  { name: "Email", link: "https://mail.google.com/mail/?view=cm&fs=1&to=launchstack.in@gmail.com&su=Project%20Inquiry" }
].map(s => (
  <a
    key={s.name}
    href={s.link}
    style={{ color: "var(--c-muted)", textDecoration: "none", fontSize: 13 }}
    onMouseEnter={e => e.target.style.color = "white"}
    onMouseLeave={e => e.target.style.color = "var(--c-muted)"}
  >
    {s.name}
  </a>

          ))}
        </div>
      </div>
    </div>
  </footer>
);

// ── App ────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <FontLink />
      <Noise />
      <Nav />
      <main>
        <Hero />
        <Services />
        <Projects />
        <Pricing />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
