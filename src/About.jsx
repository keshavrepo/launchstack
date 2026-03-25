import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function About() {
  useEffect(() => {
    document.title = "About | LaunchStack";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", "Learn about LaunchStack, our mission, team, and vision for building digital products.");
    } else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = "Learn about LaunchStack, our mission, team, and vision for building digital products.";
      document.head.appendChild(m);
    }
  }, []);

  return (
    <div style={{ padding: "80px 24px", maxWidth: 960, margin: "auto", color: "#e8e6ff" }}>
      <Link to="/" style={{ color: "#6c63ff", textDecoration: "underline", marginBottom: 22, display: "inline-block" }}>← Back to Home</Link>
      <h1 style={{ fontSize: 38, marginBottom: 18 }}>About LaunchStack</h1>
      <p style={{ color: "#bfc2ff", fontSize: 17, lineHeight: 1.7, marginBottom: 24 }}>
        LaunchStack is a modern startup agency building high-impact websites, web apps, and digital products for growing businesses.
      </p>
      <section style={{ background: "rgba(255,255,255,0.04)", padding: 18, borderRadius: 12, marginBottom: 20 }}>
        <h2 style={{ color: "white", marginBottom: 12 }}>Our Mission</h2>
        <p style={{ color: "#c4c7ff", lineHeight: 1.7 }}>
          To empower founders and teams with premium web experiences that convert users and scale operations.
        </p>
      </section>
      <section style={{ background: "rgba(255,255,255,0.04)", padding: 18, borderRadius: 12, marginBottom: 20 }}>
        <h2 style={{ color: "white", marginBottom: 12 }}>Our Team</h2>
        <p style={{ color: "#c4c7ff", lineHeight: 1.7 }}>
          A compact team of designers, engineers, and strategists with a focus on performance, UX, and measurable growth.
        </p>
      </section>
      <section style={{ background: "rgba(255,255,255,0.04)", padding: 18, borderRadius: 12 }}>
        <h2 style={{ color: "white", marginBottom: 12 }}>Why Work With Us</h2>
        <p style={{ color: "#c4c7ff", lineHeight: 1.7 }}>
          We deliver quality product velocity without sacrificing polish. Our processes are proven and client-backed.
        </p>
      </section>
    </div>
  );
}
