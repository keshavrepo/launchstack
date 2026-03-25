import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Terms() {
  useEffect(() => {
    document.title = "Terms of Service | LaunchStack";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", "Read the terms of service for LaunchStack, including usage, disclaimers, and user responsibilities.");
    } else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = "Read the terms of service for LaunchStack, including usage, disclaimers, and user responsibilities.";
      document.head.appendChild(m);
    }
  }, []);

  return (
    <div style={{ padding: "80px 24px", maxWidth: 960, margin: "auto", color: "#e8e6ff" }}>
      <Link to="/" style={{ color: "#6c63ff", textDecoration: "underline", marginBottom: 22, display: "inline-block" }}>← Back to Home</Link>
      <h1 style={{ fontSize: 38, marginBottom: 18 }}>Terms of Service</h1>
      <p style={{ color: "#bfc2ff", fontSize: 17, lineHeight: 1.7, marginBottom: 24 }}>
        These terms govern your usage of LaunchStack services provided through this site and related digital offerings.
      </p>
      <section style={{ background: "rgba(255,255,255,0.04)", padding: 18, borderRadius: 12, marginBottom: 20 }}>
        <h2 style={{ color: "white", marginBottom: 12 }}>Accepted Terms</h2>
        <p style={{ color: "#c4c7ff", lineHeight: 1.7 }}>
          By accessing the site, you agree to comply with these terms and all applicable laws and regulations.
        </p>
      </section>
      <section style={{ background: "rgba(255,255,255,0.04)", padding: 18, borderRadius: 12, marginBottom: 20 }}>
        <h2 style={{ color: "white", marginBottom: 12 }}>Service Scope</h2>
        <p style={{ color: "#c4c7ff", lineHeight: 1.7 }}>
          LaunchStack offers website and app development services. Any project details are agreed via written contract.
        </p>
      </section>
      <section style={{ background: "rgba(255,255,255,0.04)", padding: 18, borderRadius: 12 }}>
        <h2 style={{ color: "white", marginBottom: 12 }}>Limitation of Liability</h2>
        <p style={{ color: "#c4c7ff", lineHeight: 1.7 }}>
          We are not liable for indirect or consequential damages and provide no guarantee of specific business outcomes.
        </p>
      </section>
    </div>
  );
}
