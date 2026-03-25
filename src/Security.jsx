import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Security() {
  useEffect(() => {
    document.title = "Security | LaunchStack";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", "Discover the security practices LaunchStack uses to protect data and keep applications safe.");
    } else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = "Discover the security practices LaunchStack uses to protect data and keep applications safe.";
      document.head.appendChild(m);
    }
  }, []);

  return (
    <div style={{ padding: "80px 24px", maxWidth: 960, margin: "auto", color: "#e8e6ff" }}>
      <Link to="/" style={{ color: "#6c63ff", textDecoration: "underline", marginBottom: 22, display: "inline-block" }}>← Back to Home</Link>
      <h1 style={{ fontSize: 38, marginBottom: 18 }}>Security</h1>
      <p style={{ color: "#bfc2ff", fontSize: 17, lineHeight: 1.7, marginBottom: 24 }}>
        LaunchStack follows industry security standards to keep client projects dependable and data-secure.
      </p>
      <section style={{ background: "rgba(255,255,255,0.04)", padding: 18, borderRadius: 12, marginBottom: 20 }}>
        <h2 style={{ color: "white", marginBottom: 12 }}>Encryption and Protection</h2>
        <p style={{ color: "#c4c7ff", lineHeight: 1.7 }}>
          We use HTTPS and modern encryption practices for data in transit. Deployment storages are protected by access controls.
        </p>
      </section>
      <section style={{ background: "rgba(255,255,255,0.04)", padding: 18, borderRadius: 12, marginBottom: 20 }}>
        <h2 style={{ color: "white", marginBottom: 12 }}>Secure Development</h2>
        <p style={{ color: "#c4c7ff", lineHeight: 1.7 }}>
          Secure development includes dependency audits, code reviews, and vulnerability scans. We follow secure coding best practices.
        </p>
      </section>
      <section style={{ background: "rgba(255,255,255,0.04)", padding: 18, borderRadius: 12 }}>
        <h2 style={{ color: "white", marginBottom: 12 }}>Incident Response</h2>
        <p style={{ color: "#c4c7ff", lineHeight: 1.7 }}>
          In the event of a security incident, we respond quickly, notify affected parties, and apply remediation steps.
        </p>
      </section>
    </div>
  );
}
