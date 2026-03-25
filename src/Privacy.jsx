import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Privacy() {
  useEffect(() => {
    document.title = "Privacy Policy | LaunchStack";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", "LaunchStack privacy policy describing data collection, usage, and user rights.");
    } else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = "LaunchStack privacy policy describing data collection, usage, and user rights.";
      document.head.appendChild(m);
    }
  }, []);

  return (
    <div style={{ padding: "80px 20px", maxWidth: "900px", margin: "auto" }}>
      <Link to="/" style={{ color: "#6c63ff", textDecoration: "underline", display: "inline-block", marginBottom: 24 }}>
        ← Back to home
      </Link>
      <h1>Privacy Policy</h1>
      <p style={{ marginTop: 20, lineHeight: 1.7 }}>
        At LaunchStack, we respect your privacy. This page explains what information we collect and how we use it.
      </p>
      <h2 style={{ marginTop: 24 }}>Information Collection</h2>
      <p style={{ lineHeight: 1.7 }}>
        We collect information that you provide directly, such as your name and email when contacting us. We may also collect usage data automatically.
      </p>
      <h2 style={{ marginTop: 24 }}>Use of Data</h2>
      <p style={{ lineHeight: 1.7 }}>
        We use data to provide and improve our services, respond to inquiries, and personalize the user experience.
      </p>
      <h2 style={{ marginTop: 24 }}>Contact</h2>
      <p style={{ lineHeight: 1.7 }}>
        If you have questions about this policy, please email us at launchstack.in@gmail.com.
      </p>
    </div>
  );
}
