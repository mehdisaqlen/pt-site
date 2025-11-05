// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="nf-wrap">
      <div className="nf-card">
        <h1>Page not found</h1>
        <p>The page you’re looking for doesn’t exist or was moved.</p>
        <div className="nf-actions">
          <Link href="/" className="nf-btn">
            Go home
          </Link>
          <Link href="/blog" className="nf-link">
            Browse the blog
          </Link>
        </div>
      </div>
    </main>
  );
}
