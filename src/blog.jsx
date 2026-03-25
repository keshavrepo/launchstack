import { Link } from "react-router-dom";
import { blogs } from "./blogsData.js";

function Blog() {
  return (
    <div style={{ padding: "80px 20px", maxWidth: "900px", margin: "auto" }}>
      <h1>Our Blogs</h1>

      {blogs.map(blog => (
        <div key={blog.id} style={{ marginBottom: 30 }}>
          <Link
            to={`/blog/${blog.id}`}
            style={{ color: "white", fontSize: 22, textDecoration: "none" }}
          >
            {blog.title}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Blog;


