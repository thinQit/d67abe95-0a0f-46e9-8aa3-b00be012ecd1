import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <a href="/" style={{ color: "#3b82f6" }}>Go Home</a>
    </div>
  );
}
