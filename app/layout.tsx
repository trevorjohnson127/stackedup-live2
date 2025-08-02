// app/layout.tsx
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif" }}>
        <nav style={{ background: "#f0f0f0", padding: "1rem", borderBottom: "1px solid #ccc" }}>
          <Link href="/" style={{ marginRight: "1rem" }}>Home</Link>
          <Link href="/dashboard" style={{ marginRight: "1rem" }}>Dashboard</Link>
          <Link href="/portfolio" style={{ marginRight: "1rem" }}>Portfolio</Link>
          <Link href="/news" style={{ marginRight: "1rem" }}>News</Link>
          <Link href="/settings">Settings</Link>
        </nav>
        <main style={{ padding: "2rem" }}>
          {children}
        </main>
      </body>
    </html>
  );
}

