import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Testimonials() {
  useEffect(() => {
    document.title = "Testimonials | LaunchStack";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", "Read customer testimonials showcasing LaunchStack creations and client success stories.");
    } else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = "Read customer testimonials showcasing LaunchStack creations and client success stories.";
      document.head.appendChild(m);
    }
  }, []);

  return (
    <div style={{ padding: "80px 24px", maxWidth: 980, margin: "auto", color: "#e8e6ff" }}>
      <Link to="/" style={{ color: "#6c63ff", textDecoration: "underline", marginBottom: 24, display: "inline-block" }}>← Home</Link>
      <h1 style={{ fontSize: 40, marginBottom: 18 }}>Client Testimonials</h1>
      <p style={{ color: "#bfc2ff", lineHeight: 1.7, fontSize: 17, marginBottom: 28 }}>
        Trusted by startups and enterprise teams for reliable digital product delivery.
      </p>
      <div style={{ display: "grid", gap: 16 }}>
        <blockquote style={{ background: "rgba(255,255,255,0.06)", padding: 18, borderRadius: 14, color: "#c4c7ff" }}>
          “LaunchStack delivered our product ahead of schedule and with excellent quality. Their communication is top tier." - Riya, Founder
        </blockquote>
        <blockquote style={{ background: "rgba(255,255,255,0.06)", padding: 18, borderRadius: 14, color: "#c4c7ff" }}>
          "The team helped us scale from MVP to a polished enterprise SaaS product with a lean budget." - Akash, Product Lead
        </blockquote>
        <blockquote style={{ background: "rgba(255,255,255,0.06)", padding: 18, borderRadius: 14, color: "#c4c7ff" }}>
          "The process is smooth and professional. We saw a 40% conversion increase after the new site launch." - Priya, Head of Growth
        </blockquote>
      </div>
    </div>
  );
}
