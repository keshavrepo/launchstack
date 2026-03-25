import { Link, useParams } from "react-router-dom";
import { blogs } from "./blogsData";

function SingleBlog() {
  const { id } = useParams();
  const postId = Number(id);
  const blog = blogs.find(b => b.id === postId);

  if (!blog) {
    return (
      <div style={{ padding: "80px 20px", maxWidth: "900px", margin: "auto", color: "white" }}>
        <h1>Blog post not found</h1>
        <p>The blog post you are looking for does not exist.</p>
        <Link to="/blog" style={{ color: "#6c63ff", textDecoration: "underline" }}>
          Back to all blogs
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "80px 20px", maxWidth: "900px", margin: "auto" }}>
      <Link to="/blog" style={{ color: "#6c63ff", textDecoration: "underline", display: "inline-block", marginBottom: 20 }}>
        ← Back to all blogs
      </Link>
      <h1 style={{ marginBottom: 24 }}>{blog.title}</h1>
      {blog.content.trim().split("\n").filter(Boolean).map((line, idx) => (
        <p key={idx} style={{ marginBottom: 16, lineHeight: 1.7, color: "var(--c-text)" }}>
          {line.trim()}
        </p>
      ))}
    </div>
  );
}

export default SingleBlog;