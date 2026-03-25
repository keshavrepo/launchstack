import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Process() {
  useEffect(() => {
    document.title = "Process | LaunchStack";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", "Learn how LaunchStack builds modern web products through collaborative research, development, and iteration.");
    } else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = "Learn how LaunchStack builds modern web products through collaborative research, development, and iteration.";
      document.head.appendChild(m);
    }
  }, []);

  return (
    <div style={{ padding: "80px 24px", maxWidth: 980, margin: "auto", color: "#e8e6ff" }}>
      <Link to="/" style={{ color: "#6c63ff", textDecoration: "underline", marginBottom: 24, display: "inline-block" }}>← Home</Link>
      <h1 style={{ fontSize: 40, marginBottom: 18 }}>Our Process</h1>
      <p style={{ color: "#bfc2ff", lineHeight: 1.7, fontSize: 17, marginBottom: 28 }}>
        We follow a clear process so projects launch on time, on budget, and with measurable impact.
      </p>
      <div style={{ display: "grid", gap: 18 }}>
        <article style={{ background: "rgba(255,255,255,0.06)", padding: 18, borderRadius: 12 }}>
          <h2 style={{ color: "white", marginBottom: 10 }}>Discovery</h2>
          <p style={{ color: "#c4c7ff", lineHeight: 1.7 }}>
            In-depth stakeholder workshops, competitive audit, and success metric planning.
          </p>
        </article>
        <article style={{ background: "rgba(255,255,255,0.06)", padding: 18, borderRadius: 12 }}>
          <h2 style={{ color: "white", marginBottom: 10 }}>Design & Prototyping</h2>
          <p style={{ color: "#c4c7ff", lineHeight: 1.7 }}>
            UI mockups, interactive prototypes, and rapid feedback cycles to align product vision.
          </p>
        </article>
        <article style={{ background: "rgba(255,255,255,0.06)", padding: 18, borderRadius: 12 }}>
          <h2 style={{ color: "white", marginBottom: 10 }}>Development & QA</h2>
          <p style={{ color: "#c4c7ff", lineHeight: 1.7 }}>
            Modular engineering, CI/CD, and test-driven practices for robust releases.
          </p>
        </article>
        <article style={{ background: "rgba(255,255,255,0.06)", padding: 18, borderRadius: 12 }}>
          <h2 style={{ color: "white", marginBottom: 10 }}>Launch & Growth</h2>
          <p style={{ color: "#c4c7ff", lineHeight: 1.7 }}>
            Launch rollout, performance monitoring, and growth optimization post-launch.
          </p>
        </article>
      </div>
    </div>
  );
}
