import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Contact() {
  useEffect(() => {
    document.title = "Contact | LaunchStack";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", "Contact LaunchStack for project inquiries and partnership opportunities in web and app development.");
    } else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = "Contact LaunchStack for project inquiries and partnership opportunities in web and app development.";
      document.head.appendChild(m);
    }
  }, []);

  return (
    <div style={{ padding: "80px 24px", maxWidth: 980, margin: "auto", color: "#e8e6ff" }}>
      <Link to="/" style={{ color: "#6c63ff", textDecoration: "underline", marginBottom: 24, display: "inline-block" }}>← Home</Link>
      <h1 style={{ fontSize: 40, marginBottom: 18 }}>Contact Us</h1>
      <p style={{ color: "#bfc2ff", lineHeight: 1.7, fontSize: 17, marginBottom: 28 }}>
        Ready to build your next digital product? Send us a message and we’ll respond within 24 hours.
      </p>
      <div style={{ background: "rgba(255,255,255,0.06)", padding: 20, borderRadius: 14 }}>
        <p style={{ color: "#c4c7ff", lineHeight: 1.7 }}><strong>Email:</strong> launchstack.in@gmail.com</p>
        <p style={{ color: "#c4c7ff", lineHeight: 1.7 }}><strong>Phone:</strong> +91 96544 42756</p>
        <p style={{ color: "#c4c7ff", lineHeight: 1.7 }}><strong>Location:</strong> Remote, India</p>
      </div>
    </div>
  );
}
