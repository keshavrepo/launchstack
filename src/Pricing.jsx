import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Pricing() {
  useEffect(() => {
    document.title = "Pricing | LaunchStack";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", "Explore LaunchStack transparent pricing tiers for startups, growth teams, and enterprise web development projects.");
    } else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = "Explore LaunchStack transparent pricing tiers for startups, growth teams, and enterprise web development projects.";
      document.head.appendChild(m);
    }
  }, []);

  return (
    <div style={{ padding: "80px 24px", maxWidth: 980, margin: "auto", color: "#e8e6ff" }}>
      <Link to="/" style={{ color: "#6c63ff", textDecoration: "underline", marginBottom: 24, display: "inline-block" }}>← Home</Link>
      <h1 style={{ fontSize: 40, marginBottom: 18 }}>Pricing Plans</h1>
      <p style={{ color: "#bfc2ff", lineHeight: 1.7, fontSize: 17, marginBottom: 28 }}>
        Pick a package that fits your business stage. We offer transparent pricing without hidden fees.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 }}>
        <article style={{ background: "rgba(255,255,255,0.08)", padding: 20, borderRadius: 14 }}>
          <h2 style={{ color: "#fff", marginBottom: 10 }}>Startup</h2>
          <p style={{ color: "#c4c7ff", marginBottom: 14 }}>₹25,000 - ₹60,000</p>
          <ul style={{ color: "#c4c7ff", lineHeight: 1.8 }}>
            <li>Landing page</li>
            <li>CMS integration</li>
            <li>Basic SEO</li>
          </ul>
        </article>
        <article style={{ background: "rgba(255,255,255,0.08)", padding: 20, borderRadius: 14 }}>
          <h2 style={{ color: "#fff", marginBottom: 10 }}>Growth</h2>
          <p style={{ color: "#c4c7ff", marginBottom: 14 }}>₹60,000 - ₹1,50,000</p>
          <ul style={{ color: "#c4c7ff", lineHeight: 1.8 }}>
            <li>Multi-page website</li>
            <li>Web app features</li>
            <li>Performance optimization</li>
          </ul>
        </article>
        <article style={{ background: "rgba(255,255,255,0.08)", padding: 20, borderRadius: 14 }}>
          <h2 style={{ color: "#fff", marginBottom: 10 }}>Enterprise</h2>
          <p style={{ color: "#c4c7ff", marginBottom: 14 }}>Custom quote</p>
          <ul style={{ color: "#c4c7ff", lineHeight: 1.8 }}>
            <li>Dedicated team</li>
            <li>Scalable architecture</li>
            <li>Priority support</li>
          </ul>
        </article>
      </div>
    </div>
  );
}
