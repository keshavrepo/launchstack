import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Services() {
  useEffect(() => {
    document.title = "Services | LaunchStack";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", "Discover LaunchStack modern web development services including design, engineering, and growth strategy.");
    } else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = "Discover LaunchStack modern web development services including design, engineering, and growth strategy.";
      document.head.appendChild(m);
    }
  }, []);

  return (
    <div style={{ padding: "80px 24px", maxWidth: 980, margin: "auto", color: "#e8e6ff" }}>
      <Link to="/" style={{ color: "#6c63ff", textDecoration: "underline", marginBottom: 24, display: "inline-block" }}>← Home</Link>
      <h1 style={{ fontSize: 40, marginBottom: 18 }}>Our Services</h1>
      <p style={{ color: "#bfc2ff", lineHeight: 1.7, fontSize: 17, marginBottom: 28 }}>
        LaunchStack provides premium web and mobile development services built for fast growth and long-term reliability.
      </p>
      <section style={{ background: "rgba(255,255,255,0.06)", padding: 20, borderRadius: 14, marginBottom: 20 }}>
        <h2 style={{ color: "white", marginBottom: 12 }}>Product Design</h2>
        <p style={{ color: "#c4c7ff", lineHeight: 1.7 }}>
          UX research, visual design, and interaction strategy to create conversion-focused user experiences.
        </p>
      </section>
      <section style={{ background: "rgba(255,255,255,0.06)", padding: 20, borderRadius: 14, marginBottom: 20 }}>
        <h2 style={{ color: "white", marginBottom: 12 }}>Development</h2>
        <p style={{ color: "#c4c7ff", lineHeight: 1.7 }}>
          End-to-end app development using React, Node, and modern frameworks with performance and accessibility in mind.
        </p>
      </section>
      <section style={{ background: "rgba(255,255,255,0.06)", padding: 20, borderRadius: 14 }}>
        <h2 style={{ color: "white", marginBottom: 12 }}>Growth & Strategy</h2>
        <p style={{ color: "#c4c7ff", lineHeight: 1.7 }}>
          SEO, analytics, and product roadmap alignment to help teams scale with data-driven decisions.
        </p>
      </section>
    </div>
  );
}
